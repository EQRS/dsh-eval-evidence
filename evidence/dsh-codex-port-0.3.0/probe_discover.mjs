#!/usr/bin/env node
// probe_discover.mjs — 独立探针 B：Codex 技能「源格式 / 路径发现」。
//
// 自己搭一个临时 CODEX_HOME（解包目录 + 插件缓存 + 版本目录），验证 README「发现本机 Codex 技能，
// 支持自定义 CODEX_HOME」与 src/discover.ts 的公开契约：优先级、去重、版本比较、技能枚举、排序。
// 不读被测仓自带 test/fixture，不碰真实 ~/.codex。
//
// 用法：node probes/probe_discover.mjs --pkg worktree/pkg --out raw/41-probe-discover.txt
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

const argv = process.argv.slice(2)
const opt = (name, fallback) => { const i = argv.indexOf(name); return i >= 0 ? argv[i + 1] : fallback }
const out = opt('--out', '')
const pkg = resolve(opt('--pkg', '.'))
const { discoverPlugins } = await import(pathToFileURL(join(pkg, 'lib', 'discover.js')).href)

const lines = []
const results = []
const say = (t = '') => { lines.push(t); console.log(t) }
const reading = (t) => say(`      ${t}`)
const ok = (cond, label, detail = '') => {
  results.push([Boolean(cond), label, detail])
  say(`${cond ? 'PASS' : 'FAIL'}  ${label}${cond || !detail ? '' : `  -- ${detail}`}`)
}

say('== probe_discover.mjs ==')
say(`pkg  = ${pkg}`)
say(`node = ${process.version}`)
say()

const base = mkdtempSync(join(tmpdir(), 'dsh-codex-port-probe-'))
const codexHome = join(base, '.codex')
const write = (rel, content) => { const p = join(codexHome, rel); mkdirSync(join(p, '..'), { recursive: true }); writeFileSync(p, content) }
const pluginJson = (name, version, extra = {}) => JSON.stringify({ name, version, description: name + ' plugin', homepage: 'https://example.invalid/' + name, license: 'MIT', ...extra })
const skillMd = (name, description) => `---\nname: ${name}\ndescription: ${description}\n---\n\n# ${name}\n\nbody\n`

// 1) 解包目录（priority 2）：alpha v1.0.0，含两个技能 + 干扰项
write('.tmp/plugins/plugins/alpha/.codex-plugin/plugin.json', pluginJson('alpha', '1.0.0'))
write('.tmp/plugins/plugins/alpha/skills/skill-a/SKILL.md', skillMd('skill-a', 'first skill'))
write('.tmp/plugins/plugins/alpha/skills/skill-b/SKILL.md', '# no frontmatter\n\nbody\n')
write('.tmp/plugins/plugins/alpha/skills/not-a-skill/readme.txt', 'no SKILL.md here')
write('.tmp/plugins/plugins/alpha/skills/loose.txt', 'a plain file, not a skill dir')
// 2) 缓存目录（priority 1）：beta
write('plugins/cache/official/beta/.codex-plugin/plugin.json', pluginJson('beta', '2.0.0'))
write('plugins/cache/official/beta/skills/beta-skill/SKILL.md', skillMd('beta-skill', 'beta skill'))
// 3) 缓存里的版本目录（priority 0）+ 两个版本：gamma 应取 2.0.0
write('plugins/cache/official/gamma/1.0.0/.codex-plugin/plugin.json', pluginJson('gamma', '1.0.0'))
write('plugins/cache/official/gamma/1.0.0/skills/gamma-old/SKILL.md', skillMd('gamma-old', 'old gamma'))
write('plugins/cache/official/gamma/2.0.0/.codex-plugin/plugin.json', pluginJson('gamma', '2.0.0'))
write('plugins/cache/official/gamma/2.0.0/skills/gamma-new/SKILL.md', skillMd('gamma-new', 'new gamma'))
// 4) 缓存版本比解包目录新 → 缓存赢
write('.tmp/plugins/plugins/delta/.codex-plugin/plugin.json', pluginJson('delta', '1.0.0'))
write('.tmp/plugins/plugins/delta/skills/delta-old/SKILL.md', skillMd('delta-old', 'old delta'))
write('plugins/cache/official/delta/9.9.9/.codex-plugin/plugin.json', pluginJson('delta', '9.9.9'))
write('plugins/cache/official/delta/9.9.9/skills/delta-new/SKILL.md', skillMd('delta-new', 'new delta'))
// 5) 缓存版本更旧 → 解包目录赢
write('.tmp/plugins/plugins/epsilon/.codex-plugin/plugin.json', pluginJson('epsilon', '1.0.0'))
write('.tmp/plugins/plugins/epsilon/skills/eps/SKILL.md', skillMd('eps', 'eps'))
write('plugins/cache/official/epsilon/0.5.0/.codex-plugin/plugin.json', pluginJson('epsilon', '0.5.0'))
write('plugins/cache/official/epsilon/0.5.0/skills/eps-old/SKILL.md', skillMd('eps-old', 'old eps'))
// 6) 没有 plugin.json 的解包目录 / 非法 JSON / 空 name → 全部忽略
write('.tmp/plugins/plugins/no-manifest/skills/x/SKILL.md', skillMd('x', 'x'))
write('.tmp/plugins/plugins/bad-json/.codex-plugin/plugin.json', '{ not json')
write('.tmp/plugins/plugins/empty-name/.codex-plugin/plugin.json', JSON.stringify({ name: '', version: '1.0.0' }))
// 7) 超长描述（应截断到 160）
const longDescription = 'D'.repeat(300)
write('.tmp/plugins/plugins/zeta/.codex-plugin/plugin.json', pluginJson('zeta', '1.0.0'))
write('.tmp/plugins/plugins/zeta/skills/zeta-skill/SKILL.md', skillMd('zeta-skill', longDescription))

const plugins = discoverPlugins(codexHome)
say('---- discovered plugins ----')
for (const plugin of plugins) {
  reading(`${plugin.name}@${plugin.version} skills=${plugin.skills.map((s) => s.skillName).join(',')} dir=${plugin.sourceDir.slice(codexHome.length + 1)}`)
}
const byName = new Map(plugins.map((p) => [p.name, p]))
ok(plugins.length === 6, 'B1 exactly the six plugins that carry a valid plugin.json are discovered (invalid ones are skipped)', `got=${plugins.map((p) => p.name).join(',')}`)
ok(!byName.has('no-manifest') && !byName.has('bad-json') && !byName.has('empty-name'),
   'B1 a directory without plugin.json, an invalid JSON manifest and an empty name are all ignored')
ok(byName.get('alpha').skills.map((s) => s.skillDirName).join(',') === 'skill-a,skill-b',
   'B1 only directories that contain SKILL.md are enumerated (a stray file and a dir without SKILL.md are ignored)',
   byName.get('alpha').skills.map((s) => s.skillDirName).join(','))
ok(byName.get('alpha').skills[0].skillName === 'skill-a', 'B1 the skill name comes from the frontmatter name')
ok(byName.get('alpha').skills[1].skillName === 'skill-b' && byName.get('alpha').skills[1].description === '',
   'B1 a SKILL.md without frontmatter falls back to the directory name (empty description)',
   JSON.stringify(byName.get('alpha').skills[1]))
ok(byName.get('delta').version === '9.9.9', 'B1 a newer cached version replaces the unpacked copy (version wins over priority)', byName.get('delta').version)
ok(byName.get('epsilon').version === '1.0.0', 'B1 an older cached version does not replace the unpacked copy', byName.get('epsilon').version)
ok(byName.get('gamma').version === '2.0.0', 'B1 among two cached versions the newer one wins', byName.get('gamma').version)
ok(byName.get('zeta').skills[0].description.length === 160, 'B1 the listing description is truncated to 160 chars', String(byName.get('zeta').skills[0].description.length))
ok(plugins.map((p) => p.name).join(',') === [...plugins.map((p) => p.name)].sort((a, b) => a.localeCompare(b)).join(','),
   'B1 the result is sorted by plugin name', plugins.map((p) => p.name).join(','))
ok(byName.get('alpha').homepage === 'https://example.invalid/alpha' && byName.get('alpha').license === 'MIT',
   'B1 manifest attribution (homepage/license) is carried for the compatibility line')
ok(byName.get('alpha').skills[0].skillFile === join(codexHome, '.tmp/plugins/plugins/alpha/skills/skill-a/SKILL.md'),
   'B1 each skill source exposes its SKILL.md path')

// 版本比较的边界：pre-release 后缀被忽略（不构成"更新"）
say('')
say('---- B2. version comparison edges ----')
write('.tmp/plugins/plugins/eta/.codex-plugin/plugin.json', pluginJson('eta', '2.0.0'))
write('.tmp/plugins/plugins/eta/skills/eta/SKILL.md', skillMd('eta', 'eta'))
write('plugins/cache/official/eta/2.0.0-beta.1/.codex-plugin/plugin.json', pluginJson('eta', '2.0.0-beta.1'))
write('plugins/cache/official/eta/2.0.0-beta.1/skills/eta-beta/SKILL.md', skillMd('eta-beta', 'beta eta'))
const eta = discoverPlugins(codexHome).find((p) => p.name === 'eta')
reading(`eta with a 2.0.0-beta.1 cache entry -> version=${eta?.version} skills=${eta?.skills.map((s) => s.skillName).join(',')}`)
ok(eta?.version === '2.0.0', 'B2 a pre-release suffix does not count as a newer version (2.0.0-beta.1 does not replace 2.0.0)')
// 空目录 / 不存在的家目录
const emptyHome = join(base, 'empty-codex')
mkdirSync(emptyHome, { recursive: true })
ok(discoverPlugins(emptyHome).length === 0, 'B2 an existing but empty CODEX_HOME yields no plugins')
ok(discoverPlugins(join(base, 'missing-home')).length === 0, 'B2 a missing CODEX_HOME yields no plugins (the tool layer raises the human-readable error)')

rmSync(base, { recursive: true, force: true })

const failed = results.filter(([good]) => !good)
say('')
say(`== ${results.length - failed.length}/${results.length} assertions passed ==`)
for (const [, label, detail] of failed) say(`   FAILED: ${label}${detail ? '  -- ' + detail : ''}`)
if (out) {
  const text = lines.join('\n') + '\n\n== assertions ==\n'
    + results.map(([good, label, detail]) => `${good ? 'PASS' : 'FAIL'}  ${label}${good || !detail ? '' : '  -- ' + detail}`).join('\n')
    + `\n\n${results.length - failed.length}/${results.length} assertions passed\n`
  mkdirSync(resolve(out, '..'), { recursive: true })
  writeFileSync(out, text, 'utf8')
  console.log(`\nwritten: ${out}`)
}
process.exit(failed.length === 0 ? 0 : 1)
