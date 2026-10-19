#!/usr/bin/env node
// 探针 0：锚定指纹（纯离线、无依赖）。
// 用法：node probes/anchor-fingerprint.mjs [repoRoot]
// 默认 repoRoot = 环境变量 DSH_CS_REPO，或 ../.work/repo，或解包源目录。
// 输出：package.json sha256、逐目录树指纹（src/test/rules/lib）、全仓树指纹、文件数。
//
// 树指纹定义（第三方可逐字节复算）：
//   对目录内每个文件取相对路径（'/' 分隔）<TAB> sha256(文件字节) <TAB> 字节数，
//   按相对路径做字节序排序（sort 按字符串升序），用 '\n' 连接（无尾换行），
//   再对该 UTF-8 字节串取 sha256。
import { createHash } from 'node:crypto'
import { readFile, readdir, stat } from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'

const here = path.dirname(fileURLToPath(import.meta.url))
const candidates = [
  process.env.DSH_CS_REPO,
  path.resolve(here, '..', '.work', 'repo'),
  path.resolve(here, '..', '..', '..', '外部插件', 'dsh-code-security', 'dsh-code-security-master'),
].filter(Boolean)

async function sha256File(file) {
  const buf = await readFile(file)
  return createHash('sha256').update(buf).digest('hex')
}

async function walk(root, rel, out) {
  const entries = await readdir(path.join(root, rel), { withFileTypes: true })
  for (const entry of entries.sort((a, b) => a.name.localeCompare(b.name))) {
    const next = rel === '' ? entry.name : rel + '/' + entry.name
    if (entry.isDirectory()) {
      if (entry.name === '.git' || entry.name === 'node_modules') continue
      await walk(root, next, out)
    } else if (entry.isFile()) {
      const abs = path.join(root, next)
      const info = await stat(abs)
      out.push({ rel: next, sha256: await sha256File(abs), size: info.size })
    }
  }
}

function fingerprint(rows) {
  const sorted = [...rows].sort((a, b) => (a.rel < b.rel ? -1 : a.rel > b.rel ? 1 : 0))
  const text = sorted.map(r => `${r.rel}\t${r.sha256}\t${r.size}`).join('\n')
  return createHash('sha256').update(text, 'utf8').digest('hex')
}

const root = candidates.find(c => c)
if (!root) {
  console.error('未找到仓库目录；请传参或设置 DSH_CS_REPO')
  process.exit(2)
}
console.log('repoRoot =', root)
console.log('node =', process.version)
console.log('platform =', process.platform, process.arch)

const all = []
await walk(root, '', all)
console.log('package.json sha256 =', await sha256File(path.join(root, 'package.json')))
console.log('pnpm-lock.yaml sha256 =', await sha256File(path.join(root, 'pnpm-lock.yaml')))
for (const dir of ['src', 'test', 'rules', 'lib', 'docs']) {
  const rows = all.filter(r => r.rel === dir || r.rel.startsWith(dir + '/'))
  if (rows.length === 0) continue
  console.log(`${dir}/ = files ${rows.length} bytes ${rows.reduce((a, r) => a + r.size, 0)} fingerprint ${fingerprint(rows)}`)
}
console.log(`repo = files ${all.length} bytes ${all.reduce((a, r) => a + r.size, 0)} fingerprint ${fingerprint(all)}`)
