#!/usr/bin/env node
// 网络锚定探针：核对上游 commit / 仓库 tarball / raw 文件 / npm 发布包，与给定锚定是否一致。
//
// 用法：
//   node probes/probe-anchor-network.mjs --out raw \
//     [--commit 7363332f…] [--expect-tarball-sha 83211d61…]
//
// 本机 hosts 把 github.com / api.github.com / codeload.github.com / raw.githubusercontent.com
// 指向 127.0.0.1（Steam++ 接管），GitHub 侧一律走镜像（gh-proxy.com → gh-proxy.org → ghfast.top）；
// npm registry.npmjs.org 本机可直达，不用镜像。
//
// 输出：stdout 打印逐项读数；下载物落盘到 --out 目录供 sha256 复核。

import { writeFile } from 'node:fs/promises'
import { createHash } from 'node:crypto'
import { gunzipSync } from 'node:zlib'
import { resolve, join } from 'node:path'

const argv = process.argv.slice(2)
let outDir = 'raw'
let commit = '7363332f595b8112cb4b601f8723e6453043eb62'
let expectedTarballSha = ''
for (let i = 0; i < argv.length; i++) {
  if (argv[i] === '--out') outDir = argv[++i]
  else if (argv[i] === '--commit') commit = argv[++i]
  else if (argv[i] === '--expect-tarball-sha') expectedTarballSha = argv[++i]
  else { console.error('unknown argument: ' + argv[i]); process.exit(2) }
}
const out = resolve(outDir)
const sha256 = (buf) => createHash('sha256').update(buf).digest('hex')

const MIRRORS = ['gh-proxy.com', 'gh-proxy.org', 'ghfast.top']

async function fetchWithMirror(origin) {
  const attempts = []
  for (const mirror of MIRRORS) {
    const target = 'https://' + mirror + '/' + origin
    const started = Date.now()
    try {
      const res = await fetch(target, { redirect: 'follow', headers: { 'user-agent': 'dsh-env-review/1.0' } })
      const buf = Buffer.from(await res.arrayBuffer())
      attempts.push({ mirror, status: res.status, bytes: buf.length, ms: Date.now() - started })
      if (!res.ok || buf.length === 0) {
        attempts[attempts.length - 1].body = buf.subarray(0, 400).toString('utf8').replace(/\s+/g, ' ')
        continue
      }
      return { buf, mirror, status: res.status, attempts }
    } catch (error) {
      attempts.push({ mirror, ms: Date.now() - started, error: String(error?.message ?? error) })
    }
  }
  return { attempts }
}

const result = { generated_at: new Date().toISOString(), commit, checks: [] }
const push = (row) => result.checks.push(row)

// 1) GitHub API：commit 元数据（限流时记录响应体）
{
  const r = await fetchWithMirror('https://api.github.com/repos/hyzyn/dsh-plugin-kit/commits/' + commit)
  const row = { check: 'github_api_commit', attempts: r.attempts }
  if (r.buf) {
    try {
      const json = JSON.parse(r.buf.toString('utf8'))
      row.status = r.status
      row.mirror = r.mirror
      row.sha = json.sha
      row.commit_date = json.commit?.committer?.date
      row.commit_message = (json.commit?.message ?? '').split('\n')[0]
      row.tarball_url = json.tarball_url
      await writeFile(join(out, '10-github-commit.json'), JSON.stringify(json, null, 2), 'utf8')
    } catch (e) {
      row.parse_error = String(e)
    }
  }
  push(row)
}

// 2) commit.patch：取 commit 日期（API 限流时的替代通道；patch 的 From/Date 头）
{
  const origin = 'https://github.com/hyzyn/dsh-plugin-kit/commit/' + commit + '.patch'
  const r = await fetchWithMirror(origin)
  const row = { check: 'commit_patch', attempts: r.attempts }
  if (r.buf) {
    const text = r.buf.toString('utf8')
    row.status = r.status
    row.mirror = r.mirror
    row.bytes = r.buf.length
    row.from = text.split('\n').find((l) => l.startsWith('From '))
    row.date = text.split('\n').find((l) => l.startsWith('Date:'))
    row.subject = text.split('\n').find((l) => l.startsWith('Subject:'))
    row.files = [...text.matchAll(/^diff --git a\/(\S+) b\//gm)].map((m) => m[1])
    await writeFile(join(out, '14-commit.patch'), r.buf)
  }
  push(row)
}

// 3) commit 处的 raw 文件：确认快照内容 == commit 内容（逐字节 sha256 对账）
{
  const files = ['package.json', 'packages/env/package.json', 'packages/env/src/index.ts', 'pnpm-lock.yaml']
  for (const path of files) {
    const origin = 'https://raw.githubusercontent.com/hyzyn/dsh-plugin-kit/' + commit + '/' + path
    const r = await fetchWithMirror(origin)
    const row = { check: 'raw_at_commit', path, attempts: r.attempts }
    if (r.buf) {
      row.status = r.status
      row.mirror = r.mirror
      row.bytes = r.buf.length
      row.sha256 = sha256(r.buf)
      const safe = path.replace(/[\/]/g, '_')
      await writeFile(join(out, '15-raw-' + safe), r.buf)
    }
    push(row)
  }
}

// 4) codeload 仓库 tarball（commit 形态）：字节与给定 sha256 对账
{
  const origin = 'https://codeload.github.com/hyzyn/dsh-plugin-kit/tar.gz/' + commit
  const r = await fetchWithMirror(origin)
  const row = { check: 'codeload_tarball', expected_sha256: expectedTarballSha || '(not given)' }
  row.attempts = r.attempts
  if (r.buf) {
    const sha = sha256(r.buf)
    row.status = r.status
    row.mirror = r.mirror
    row.bytes = r.buf.length
    row.gzip_sha256 = sha
    row.uncompressed_tar_bytes = null
    try {
      const tar = gunzipSync(r.buf)
      row.uncompressed_tar_bytes = tar.length
      row.uncompressed_tar_sha256 = sha256(tar)
    } catch (e) { row.gunzip_error = String(e) }
    row.sha_match = expectedTarballSha === '' ? null : sha === expectedTarballSha
    row.uncompressed_match = expectedTarballSha === '' ? null : row.uncompressed_tar_sha256 === expectedTarballSha
    await writeFile(join(out, '11-repo-tarball-' + commit.slice(0, 12) + '.tgz'), r.buf)
  }
  push(row)
}

// 5) npm registry：@hyzyn/dsh-env 0.3.10 发布包（逐字节 sha256）与根包 0.1.57
async function npmPackage(name, version) {
  const row = { check: 'npm_package', name, version }
  const started = Date.now()
  const res = await fetch('https://registry.npmjs.org/' + name.replace('/', '%2F'), { headers: { 'user-agent': 'dsh-env-review/1.0' } })
  const buf = Buffer.from(await res.arrayBuffer())
  row.registry_status = res.status
  row.registry_bytes = buf.length
  row.registry_ms = Date.now() - started
  if (!res.ok) { push(row); return }
  const json = JSON.parse(buf.toString('utf8'))
  row.dist_tags = json['dist-tags']
  const v = json.versions?.[version]
  row.version_present = v !== undefined
  row.published_at = v ? json.time?.[version] : undefined
  row.tarball = v?.dist?.tarball
  row.integrity_sha512 = v?.dist?.integrity
  row.shasum = v?.dist?.shasum
  if (v?.dist?.tarball) {
    const tar = await fetch(v.dist.tarball, { headers: { 'user-agent': 'dsh-env-review/1.0' } })
    const tarBuf = Buffer.from(await tar.arrayBuffer())
    row.tarball_status = tar.status
    row.tarball_bytes = tarBuf.length
    row.tarball_sha256 = sha256(tarBuf)
    row.tarball_shasum_sha1 = createHash('sha1').update(tarBuf).digest('hex')
    row.tarball_matches_dist_shasum = row.tarball_shasum_sha1 === v.dist.shasum
    await writeFile(join(out, '16-npm-' + name.replace(/[@\/]/g, '_') + '-' + version + '.tgz'), tarBuf)
  }
  push(row)
}
await npmPackage('@hyzyn/dsh-env', '0.3.10')
await npmPackage('@hyzyn/dsh-plugin-kit', '0.1.57')

console.log(JSON.stringify(result, null, 2))
