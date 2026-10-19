// 锚定探针：对被测快照计算可复算指纹，并把「构建前」的预置产物复制到 raw/artifacts/anchor/。
// 用法（在测评工作目录）：
//   node probes/anchor.mjs [--repo <快照目录>] [--out raw/00-anchor.txt] [--snapshot-copy]
//
// 口径：目录树指纹 = sha256( 逐行 "<相对路径>\t<字节数>\t<文件 sha256>" 排序后以 LF 连接 )。
// 只统计普通文件；不跟随符号链接。node_modules / .test-data 若存在则单独标注并排除在树指纹外。

import { createHash } from 'node:crypto'
import { copyFile, mkdir, readdir, readFile, stat, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { dirname, join, relative, resolve, sep } from 'node:path'

const argv = process.argv.slice(2)
let repo = 'D:\\natnat\\lingshu\\外部插件\\dsh-cite\\dsh-cite-master'
let out = ''
let snapshotCopy = false
for (let i = 0; i < argv.length; i++) {
  if (argv[i] === '--repo') repo = argv[++i]
  else if (argv[i] === '--out') out = argv[++i]
  else if (argv[i] === '--snapshot-copy') snapshotCopy = true
  else { console.error('usage: node probes/anchor.mjs [--repo <dir>] [--out <file>] [--snapshot-copy]'); process.exit(2) }
}
repo = resolve(repo)
const lines = []
const say = (text = '') => { lines.push(text); console.log(text) }

const sha256 = (buf) => createHash('sha256').update(buf).digest('hex')

async function walk(dir) {
  const outList = []
  for (const name of (await readdir(dir)).sort()) {
    const p = join(dir, name)
    const st = await stat(p)
    if (st.isDirectory()) outList.push(...await walk(p))
    else if (st.isFile()) outList.push(p)
  }
  return outList
}

async function tree(dir) {
  if (!existsSync(dir)) return null
  const files = await walk(dir)
  const rows = []
  let bytes = 0
  for (const p of files) {
    const buf = await readFile(p)
    bytes += buf.length
    rows.push(`${relative(dir, p).split(sep).join('/')}\t${buf.length}\t${sha256(buf)}`)
  }
  rows.sort()
  return { files: files.length, bytes, fingerprint: sha256(Buffer.from(rows.join('\n') + '\n', 'utf8')), rows }
}

const tarball = 'D:\\natnat\\lingshu\\外部插件\\dsh-cite.tgz'
say('# dsh-cite 锚定指纹（构建前）')
say(`generated_at = ${new Date().toISOString()}`)
say(`repo = ${repo}`)
say(`git_dir_present = ${existsSync(join(repo, '.git'))}`)
say(`tarball = ${tarball}`)
if (existsSync(tarball)) say(`tarball_sha256 = ${sha256(await readFile(tarball))}`)
say(`tarball_bytes = ${existsSync(tarball) ? (await stat(tarball)).size : 'MISSING'}`)
say('')

const pkgPath = join(repo, 'package.json')
const pkgBuf = await readFile(pkgPath)
const pkg = JSON.parse(pkgBuf.toString('utf8'))
say('## package.json')
say(`package.json_sha256 = ${sha256(pkgBuf)}`)
say(`package.json_bytes = ${pkgBuf.length}`)
say(`name = ${pkg.name}`)
say(`version = ${pkg.version}`)
say(`main = ${pkg.main}`)
say(`scripts.build = ${pkg.scripts?.build}`)
say(`scripts.typecheck = ${pkg.scripts?.typecheck}`)
say(`scripts.test = ${pkg.scripts?.test}`)
say(`devDependencies = ${JSON.stringify(pkg.devDependencies)}`)
say(`dependencies = ${JSON.stringify(pkg.dependencies)}`)
say('')

say('## 目录树指纹（构建前）')
const dirs = ['src', 'test', 'scripts', 'lib', 'templates', 'docs']
const treeResults = {}
for (const d of dirs) {
  const t = await tree(join(repo, d))
  treeResults[d] = t
  if (t === null) { say(`${d}: MISSING`); continue }
  say(`${d}: files=${t.files} bytes=${t.bytes} tree_sha256=${t.fingerprint}`)
}
say('')

say('## 顶层文件 sha256')
const top = ['README.md', 'README.en.md', 'CHANGELOG.md', 'cordis.patch.yml', 'tsconfig.json', 'pnpm-lock.yaml', 'LICENSE', '.gitignore']
for (const name of top) {
  const p = join(repo, name)
  if (!existsSync(p)) { say(`${name}: MISSING`); continue }
  const buf = await readFile(p)
  say(`${name}: bytes=${buf.length} sha256=${sha256(buf)}`)
}
say('')

// 预置产物（构建前）单独列出；它们是判断「构建是否可复现」的基准。
for (const rel of ['lib/client.js', 'lib/index.js', 'lib/client.d.ts']) {
  const p = join(repo, rel)
  if (!existsSync(p)) { say(`${rel}: MISSING`); continue }
  const buf = await readFile(p)
  say(`prebuilt ${rel}: bytes=${buf.length} sha256=${sha256(buf)}`)
}
say('')

say('## 排除项')
for (const rel of ['node_modules', '.test-data']) say(`${rel} = ${existsSync(join(repo, rel))}`)
say('')

if (snapshotCopy) {
  const dest = resolve('raw/artifacts/anchor')
  await mkdir(dest, { recursive: true })
  for (const rel of ['package.json', 'lib/client.js', 'lib/index.js', 'templates/client.js', 'scripts/build-client.mjs']) {
    const src = join(repo, rel)
    if (!existsSync(src)) continue
    const target = join(dest, rel.split('/').join('__'))
    await copyFile(src, target)
    say(`copied ${rel} -> ${relative(resolve('.'), target).split(sep).join('/')}`)
  }
  say('')
}

const text = lines.join('\n') + '\n'
if (out) {
  await mkdir(dirname(resolve(out)), { recursive: true })
  await writeFile(resolve(out), text, 'utf8')
  console.log(`wrote ${out}`)
}
