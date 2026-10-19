#!/usr/bin/env node
/**
 * probe-anchor.mjs · @hyzyn/dsh-prompt 0.2.9 锚定与环境基线（只读）。
 *
 * 被测对象是 monorepo `hyzyn/dsh-plugin-kit` 的子包 `packages/prompt`；
 * 根包是 0.1.57（全家桶），不是被评对象。锚定必须同时给：
 *   - 根 package.json / pnpm-lock.yaml / 子包 package.json 的 sha256
 *   - 子包 src/test/lib/client.js 的逐文件 sha256 与树指纹（排除 node_modules）
 *   - 根仓树指纹（排除 node_modules/.codegraph/.git，保证可复算）
 *   - 既有依赖态（上一件 dsh-env 测评已装，本件不重装）
 *
 * 用法：
 *   node probes/probe-anchor.mjs --repo <repo> [--commit <hash>] [--node <node>] [--pnpm <pnpm.cjs>]
 */
import { createHash } from 'node:crypto'
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative, resolve, sep } from 'node:path'
import { spawnSync } from 'node:child_process'

const argv = process.argv.slice(2)
function opt(name, dflt) {
  const i = argv.indexOf('--' + name)
  return i >= 0 && i + 1 < argv.length ? argv[i + 1] : dflt
}
const repo = resolve(opt('repo', '.'))
const COMMIT = opt('commit', '(not provided)')
const NODE = opt('node', process.execPath)
const PNPM = opt('pnpm', '')

const SKIP = new Set(['node_modules', '.git', '.codegraph', '__pycache__'])
const sha256 = (p) => createHash('sha256').update(readFileSync(p)).digest('hex')

function walk(root, rel = '') {
  const out = []
  for (const name of readdirSync(root).sort()) {
    if (SKIP.has(name)) continue
    const abs = join(root, name)
    const r = rel === '' ? name : rel + '/' + name
    const st = statSync(abs)
    if (st.isDirectory()) out.push(...walk(abs, r))
    else out.push({ rel: r.replaceAll(sep, '/'), abs, size: st.size, mtime: st.mtimeMs })
  }
  return out
}
function treeFingerprint(relDir) {
  const abs = join(repo, ...relDir.split('/'))
  if (!existsSync(abs)) return { exists: false }
  const files = walk(abs)
  const agg = createHash('sha256')
  for (const f of files) agg.update(`${f.rel}\t${sha256(f.abs)}\n`)
  return {
    exists: true, files: files.length,
    bytes: files.reduce((a, f) => a + f.size, 0),
    sha256: agg.digest('hex'),
  }
}
function run(cmd, args) {
  const r = spawnSync(cmd, args, { encoding: 'utf8', timeout: 30000, shell: false })
  return r.status === 0 ? (r.stdout || '').trim() : `ERR(rc=${r.status}) ${(r.stderr || '').trim().slice(0, 200)}`
}

console.log('# probe-anchor · @hyzyn/dsh-prompt 0.2.9（monorepo packages/prompt）')
console.log('measured_at=' + new Date().toISOString())
console.log('repo=' + repo)
console.log('commit_given=' + COMMIT)
console.log('git_dir_exists=' + existsSync(join(repo, '.git')))
console.log('git_in_path=' + (run('git', ['--version']).startsWith('ERR(') ? 'NO' : 'YES'))
console.log('npm_in_path=' + (run('npm', ['--version']).startsWith('ERR(') ? 'NO' : 'YES'))

console.log('\n## 包版本')
const rootPkgP = join(repo, 'package.json')
const promptPkgP = join(repo, 'packages', 'prompt', 'package.json')
const rootPkg = JSON.parse(readFileSync(rootPkgP, 'utf8'))
const promptPkg = JSON.parse(readFileSync(promptPkgP, 'utf8'))
console.log('root_package_name=' + rootPkg.name)
console.log('root_package_version=' + rootPkg.version)
console.log('root_package_sha256=' + sha256(rootPkgP))
console.log('root_package_bytes=' + statSync(rootPkgP).size)
console.log('prompt_package_name=' + promptPkg.name)
console.log('prompt_package_version=' + promptPkg.version)
console.log('prompt_package_sha256=' + sha256(promptPkgP))
console.log('prompt_package_bytes=' + statSync(promptPkgP).size)
console.log('prompt_main=' + promptPkg.main)
console.log('prompt_bundle_patch=' + JSON.stringify(promptPkg.dsh?.bundle?.patch))
console.log('prompt_peer_dsh=' + JSON.stringify(promptPkg.peerDependencies?.['@deepseek-ai/dsh']))
console.log('prompt_dependencies=' + JSON.stringify(promptPkg.dependencies))

console.log('\n## 关键文件 sha256')
for (const rel of [
  'pnpm-lock.yaml', 'pnpm-workspace.yaml', 'vitest.config.ts',
  'tsconfig.base.json', '.npmrc', 'cordis.patch.yml',
  'packages/prompt/package.json', 'packages/prompt/src/index.ts',
  'packages/prompt/src/js-yaml.d.ts', 'packages/prompt/test/managed-prompt.test.ts',
  'packages/prompt/lib/index.js', 'packages/prompt/lib/index.d.ts',
  'packages/prompt/lib/index.js.map', 'packages/prompt/client.js',
  'packages/prompt/cordis.patch.yml', 'packages/prompt/README.md',
  'packages/prompt/README.en.md', 'packages/prompt/tsconfig.json',
  'packages/prompt/tsconfig.base.json',
]) {
  const p = join(repo, ...rel.split('/'))
  if (!existsSync(p)) { console.log(`file[${rel}]=MISSING`); continue }
  const st = statSync(p)
  console.log(`file[${rel}]=${st.size}B sha256=${sha256(p)} mtime=${st.mtime.toISOString()}`)
}

console.log('\n## 树指纹（排除 node_modules/.git/.codegraph）')
for (const [label, rel] of [
  ['packages/prompt', 'packages/prompt'],
  ['packages/prompt/src', 'packages/prompt/src'],
  ['packages/prompt/test', 'packages/prompt/test'],
  ['packages/prompt/lib', 'packages/prompt/lib'],
  ['packages/kit', 'packages/kit'],
  ['repo-without-node_modules', '.'],
]) {
  const fp = treeFingerprint(rel)
  if (!fp.exists) { console.log(`tree[${label}]=MISSING`); continue }
  console.log(`tree[${label}]=files=${fp.files} bytes=${fp.bytes} sha256=${fp.sha256}`)
}

console.log('\n## 既有依赖态（上一件 dsh-env 测评已装；本件不重装）')
const rootNM = join(repo, 'node_modules')
const pnpmDir = join(rootNM, '.pnpm')
const promptNM = join(repo, 'packages', 'prompt', 'node_modules')
console.log('root_node_modules_exists=' + existsSync(rootNM))
console.log('root_node_modules_top_entries=' + (existsSync(rootNM) ? readdirSync(rootNM).length : 0))
console.log('pnpm_store_packages=' + (existsSync(pnpmDir) ? readdirSync(pnpmDir).filter((n) => !n.startsWith('.')).length : 0))
console.log('prompt_node_modules_exists=' + existsSync(promptNM))
console.log('prompt_node_modules_entries=' + (existsSync(promptNM) ? readdirSync(promptNM).map((n) => (n.startsWith('@') ? n + '/' + readdirSync(join(promptNM, n)).join('+') : n)).join(',') : 'MISSING'))
for (const rel of ['vitest/package.json', 'typescript/package.json', 'js-yaml/package.json']) {
  const p = join(rootNM, ...rel.split('/'))
  if (!existsSync(p)) { console.log(`dep[${rel}]=MISSING`); continue }
  const j = JSON.parse(readFileSync(p, 'utf8'))
  console.log(`dep[${rel}]=${j.version}`)
}
const lockP = join(repo, 'pnpm-lock.yaml')
console.log('pnpm_lock_bytes=' + statSync(lockP).size)
const modulesYaml = join(rootNM, '.modules.yaml')
console.log('modules_yaml_exists=' + existsSync(modulesYaml))

console.log('\n## 工具链')
console.log('node_version=' + run(NODE, ['--version']))
console.log('node_path=' + NODE)
console.log('pnpm_version=' + (PNPM ? run(NODE, [PNPM, '--version']) : 'not-provided'))
console.log('pnpm_path=' + (PNPM || 'not-provided'))
console.log('python_version=' + run('python', ['--version']))
console.log('platform=' + process.platform + ' ' + process.arch)
console.log('os_release=' + run('cmd', ['/c', 'ver']))
console.log('dsh_profile=' + (process.env.DSH_PROFILE || ''))
console.log('dsh_profile_dir=' + (process.env.DSH_PROFILE_DIR || ''))
const dshCli = 'C:\\Users\\30951\\AppData\\Local\\Programs\\DeepSeek Harness\\resources\\runtime\\cli\\bin\\dsh.cmd'
console.log('dsh_cli_exists=' + existsSync(dshCli))
console.log('dsh_cli_version=' + (existsSync(dshCli) ? run(dshCli, ['--version']) : 'MISSING'))
console.log('note=commit hash 由任务下发，本机无 .git 且未联网，无法独立验证该 commit；锚定以文件 sha256/树指纹为准')
