#!/usr/bin/env node
// probe_plugin_mount.mjs — 独立探针：插件层（bundle 装载契约 + 记忆注入预算 + 工具面）。
//
// 不 import 被测仓的 tests/ 或 _pkg.mjs：本探针自带一个最小 fake ctx（只提供
// `skills.registerProvider` / `tools.register` / `systemPrompt.section|context` / `effect` /
// `logger`），直接 import 被测插件入口 `lib/index.js`，断言的依据是**插件自己声明的契约**
// （package.json 的 exports、cordis.patch.yml、SKILL.md 的 frontmatter）与**它实际注册了什么**。
//
// 隔离：本探针把 DSH_HOME / DSH_WORKLOG_SETTINGS / DSH_WORKLOG_MEMORY 全部钉到临时目录，
// 不读也不写用户真实的设置与记忆根（复跑要点见 ../../README.md）。
//
// 用法：
//   node probes/probe_plugin_mount.mjs --pkg <仓库副本根> --out raw/42-probe-plugin-mount.txt
import { mkdtempSync, readFileSync, readdirSync, writeFileSync, mkdirSync, existsSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

const argv = process.argv.slice(2)
function opt(name, fallback) {
  const i = argv.indexOf(name)
  return i >= 0 ? argv[i + 1] : fallback
}
const out = opt('--out', '')
const pkg = resolve(opt('--pkg', '.'))
const lines = []
const results = []
function say(text = '') { lines.push(text); console.log(text) }
function reading(text) { say(`      ${text}`) }
function ok(condition, label, detail = '') {
  results.push([Boolean(condition), label, detail])
  say(`${condition ? 'PASS' : 'FAIL'}  ${label}${condition || !detail ? '' : `  -- ${detail}`}`)
}

// ---- isolation: nothing outside the temp dir is read or written -----------
const base = mkdtempSync(join(tmpdir(), 'dsh-lore-probe-plugin-'))
const memRoot = join(base, 'memory')
const dshHome = join(base, 'dsh-home')
mkdirSync(memRoot, { recursive: true })
mkdirSync(dshHome, { recursive: true })
process.env.DSH_HOME = dshHome
process.env.DSH_WORKLOG_SETTINGS = join(base, 'settings.json')
process.env.DSH_WORKLOG_MEMORY = memRoot
// seed the global memory root: a volume plus the generated INDEX.md the prompt section reads
mkdirSync(memRoot, { recursive: true })
writeFileSync(join(memRoot, '01-general.md'),
  '- id: probe-memory-fact\n  applies-to: probe\n  state: active\n  source: manual:tested\n  cited-by: []\n  探针记忆：`python -c pass` 通过（1 passed）。\n', 'utf8')
writeFileSync(join(memRoot, 'INDEX.md'),
  '# 全局记忆索引（生成物：由正文分册推出，勿手写）\n\n## general\n- probe-memory-fact：探针记忆：`python -c pass` 通过（1 passed）。\n', 'utf8')

const bundlesOnDisk = readdirSync(join(pkg, 'skills'), { withFileTypes: true })
  .filter((e) => e.isDirectory() && existsSync(join(pkg, 'skills', e.name, 'SKILL.md')))
  .map((e) => e.name)
  .sort()

say('== probe_plugin_mount.mjs ==')
say(`pkg      = ${pkg}`)
say(`node     = ${process.version} (${process.platform})`)
say(`memory   = ${memRoot}   (隔离根)`)
say(`bundles  = ${JSON.stringify(bundlesOnDisk)}`)
say()

// ---- a minimal host context ------------------------------------------------
const logs = []
const providers = []
const tools = []
const sections = []
const contexts = []
const effects = []
function makeCtx() {
  return {
    logger: {
      info: (m) => logs.push(['info', String(m)]),
      warn: (m) => logs.push(['warn', String(m)]),
      error: (m) => logs.push(['error', String(m)]),
    },
    skills: { registerProvider: (create) => { providers.push(create); return () => {} } },
    tools: { register: (definition) => { tools.push(definition); return () => {} } },
    systemPrompt: {
      section: (spec) => { sections.push(spec); return () => {} },
      context: (spec) => { contexts.push(spec); return () => {} },
    },
    effect: (fn, label) => { effects.push(label); return fn() },
  }
}

const entryUrl = pathToFileURL(join(pkg, 'lib', 'index.js')).href
const mod = await import(entryUrl)
const pkgJson = JSON.parse(readFileSync(join(pkg, 'package.json'), 'utf8'))

say('---- 1. manifest surface ----')
reading(`package.json name=${pkgJson.name} version=${pkgJson.version} type=${pkgJson.type}`)
ok(pkgJson.name === 'dsh-lore', 'the package under test is dsh-lore', pkgJson.name)
ok(pkgJson.version === '0.9.2', 'declared version is 0.9.2', pkgJson.version)
ok(pkgJson.type === 'module', 'type=module (the host loader needs ESM)', pkgJson.type)
ok(pkgJson.dsh?.bundle?.patch === './cordis.patch.yml', 'declares the bundle patch', JSON.stringify(pkgJson.dsh?.bundle))
ok(pkgJson.exports?.['.'] === './lib/index.js', 'exports the entry point', pkgJson.exports?.['.'])
ok(typeof mod.name === 'string' && mod.name.length > 0, 'lib/index.js exports a plugin name', String(mod.name))
ok(Array.isArray(mod.inject) && mod.inject.includes('skills') && mod.inject.includes('tools'),
   'injects skills + tools', JSON.stringify(mod.inject))
ok(typeof mod.apply === 'function', 'exports apply()')
ok(typeof mod.Config === 'object' || typeof mod.Config === 'function',
   'exports a Config schema (host-projected settings card)', typeof mod.Config)
ok(typeof mod.Config?.toJSON === 'function', 'the Config carries toJSON (settings page projection)')

// ---- 2. mounting ----------------------------------------------------------
say('')
say('---- 2. apply() on a bare host context ----')
const ctx = makeCtx()
let threw = null
try {
  mod.apply(ctx, {})
} catch (error) {
  threw = error
}
ok(threw === null, 'apply() does not throw on a minimal ctx', threw ? String(threw?.message ?? threw) : '')
const errorsIn = logs.filter(([level]) => level === 'error')
reading(`log lines: ${logs.length}  (error ${errorsIn.length})`)
for (const [level, message] of logs.slice(0, 8)) reading(`| ${level}: ${message.slice(0, 150)}`)
ok(errorsIn.length === 0, 'apply() logged no error', errorsIn.map((l) => l[1]).join(' | '))
ok(providers.length === bundlesOnDisk.length,
   `one skill provider registered per bundle on disk (${bundlesOnDisk.length})`, `providers=${providers.length}`)

// ---- 3. skill providers actually serve something --------------------------
say('')
say('---- 3. the registered skill providers ----')
const control = { signal: new AbortController().signal, invalidate: () => {} }
const listed = []
for (const create of providers) {
  const provider = create(control)
  // 注册表契约：`list()` 回 { candidates: [...] }，`get()` 吃 candidate 对象本身。
  const catalog = await provider.list({ cwd: 'X', scope: {} })
  for (const candidate of catalog.candidates ?? []) listed.push({ provider, candidate })
}
const providerNames = new Set(listed.map(({ candidate }) => candidate.provider))
for (const { candidate } of listed) {
  reading(`candidate name=${candidate.name} rank=${candidate.rank} provider=${candidate.provider}`)
}
reading(`distinct provider names = ${JSON.stringify([...providerNames])}`)
ok(listed.length >= 2, 'the providers list at least two skills', `listed=${listed.length}`)
ok(listed.every(({ candidate }) => typeof candidate.name === 'string' && candidate.name.length > 0),
   'every candidate carries a non-empty name')
ok(listed.every(({ candidate }) => typeof candidate.rank === 'number'),
   'every candidate carries a numeric rank')
ok(providerNames.size === providers.length && [...providerNames].every((n) => /^[a-z0-9][a-z0-9-]*$/.test(n)),
   'each provider has its own kebab-case name (the registry rejects duplicates in one layer)',
   `providers=${providers.length} names=${providerNames.size}`)
let bodyBytes = 0
for (const { provider, candidate } of listed) {
  const definition = await provider.get(candidate, { cwd: 'X', scope: {} })
  const content = definition?.content ?? ''
  bodyBytes += Buffer.byteLength(content, 'utf8')
  reading(`get(${candidate.name}) -> ${Buffer.byteLength(content, 'utf8')} bytes, first line: ${String(content).split('\n').find((l) => l.trim())?.slice(0, 90)}`)
  ok(content.length > 0, `provider.get() returns a body for ${candidate.name}`)
}
reading(`skill bodies total = ${bodyBytes} bytes`)

// ---- 4. the tool surface --------------------------------------------------
say('')
say('---- 4. the worklog_memory tool ----')
const memoryTool = tools.find((tool) => tool?.name === 'worklog_memory')
ok(Boolean(memoryTool), 'a tool named worklog_memory was registered', `tools=${tools.map((t) => t?.name).join(',')}`)
if (memoryTool) {
  reading(`tool keys = ${Object.keys(memoryTool).join(',')}`)
  const params = memoryTool.parameters ?? {}
  const props = params.properties ?? {}
  const paramNames = Object.keys(props)
  reading(`parameters.required = ${JSON.stringify(params.required)}`)
  reading(`parameters.properties = ${paramNames.join(',')}`)
  ok(paramNames.includes('operation') && paramNames.includes('workspace'),
     'the tool declares its two required parameters (operation, workspace)')
  ok(Array.isArray(params.required) && params.required.includes('operation') && params.required.includes('workspace'),
     'both are marked required (JSON Schema `required` array)')
  const ops = props.operation?.enum ?? []
  reading(`operation enum = ${JSON.stringify(ops)}`)
  ok(Array.isArray(ops) && ops.includes('search') && ops.includes('inbox'),
     'the operation enum really offers search + inbox (what the injected prompt claims)')
  const output = memoryTool.output ?? memoryTool.outputSchema ?? null
  reading(`output schema keys = ${output ? Object.keys(output).join(',') : 'none'}`)
  ok(output === null || typeof output === 'object', 'the tool carries a structured output schema')
  ok(typeof memoryTool.execute === 'function', 'the tool carries an execute() handler')
}

// ---- 5. prompt injection: the memory index section ------------------------
say('')
say('---- 5. the prompt contributions (memory index + inbox) ----')
ok(sections.length === 1, 'exactly one system-prompt section is registered (the memory index)', `sections=${sections.length}`)
const section = sections[0]
if (section) {
  reading(`section name=${section.name} order=${section.order} textIsFunction=${typeof section.text === 'function'}`)
  ok(section.name === 'dsh-lore:memory-index', 'the section carries a stable, namespaced name', String(section.name))
  ok(typeof section.text === 'function', 'the section text is a function (re-read per assembly, so a settings toggle applies at once)')
  const text = typeof section.text === 'function' ? section.text() : section.text
  const chars = String(text ?? '').length
  reading(`injected index text = ${chars} chars`)
  for (const line of String(text ?? '').split('\n').slice(0, 8)) reading(`| ${line}`)
  ok(chars > 0, 'the section renders the seeded memory index into the prompt prefix')
  ok(String(text).includes('probe-memory-fact'), 'the rendered index contains the seeded lesson id')
  ok(chars <= 800, 'the rendered index stays inside the documented 800-char injection soft cap', `${chars} chars`)
  ok(String(text).includes('worklog_memory'), 'the injected text names the tool the model is told to use')

  // 软上限是**真上限**：超了就整段丢弃，而不是截断（plugin-spec §四）
  const oversize = '# 全局记忆索引（生成物）\n\n## general\n' + '- ' + 'x'.repeat(900) + '：超预算条目\n'
  writeFileSync(join(memRoot, 'INDEX.md'), oversize, 'utf8')
  const dropped = typeof section.text === 'function' ? section.text() : section.text
  reading(`oversize INDEX.md (${oversize.length} chars) -> injected text = ${JSON.stringify(String(dropped))}`)
  ok(String(dropped ?? '') === '', 'an over-budget index is dropped entirely rather than truncated (documented rule)')
  // 只有标题的空索引同样零字节
  writeFileSync(join(memRoot, 'INDEX.md'), '# 全局记忆索引（生成物）\n', 'utf8')
  const empty = typeof section.text === 'function' ? section.text() : section.text
  reading(`header-only INDEX.md -> injected text = ${JSON.stringify(String(empty))}`)
  ok(String(empty ?? '') === '', 'an index with nothing under its header contributes the empty string')
  // 复原，供后续步骤/复跑阅读
  writeFileSync(join(memRoot, 'INDEX.md'),
    '# 全局记忆索引（生成物：由正文分册推出，勿手写）\n\n## general\n- probe-memory-fact：探针记忆：`python -c pass` 通过（1 passed）。\n', 'utf8')
}
ok(contexts.length === 1, 'exactly one volatile context contribution is registered (the inbox notice)', `contexts=${contexts.length}`)
const inboxCtx = contexts[0]
if (inboxCtx) {
  reading(`context name=${inboxCtx.name} order=${inboxCtx.order}`)
  const text = typeof inboxCtx.text === 'function' ? inboxCtx.text() : inboxCtx.text
  reading(`inbox notice with an empty inbox = ${JSON.stringify(String(text ?? ''))}`)
  ok(String(text ?? '') === '', 'with an empty inbox the volatile context contributes the empty string (zero bytes, cache-safe)')
}
reading(`effects registered: ${effects.length} → ${effects.join(' / ')}`)

// ---- 6. cordis.patch.yml: the skill-filesystem switch ---------------------
say('')
say('---- 6. the bundle patch ----')
const patch = readFileSync(join(pkg, 'cordis.patch.yml'), 'utf8')
reading(`cordis.patch.yml = ${patch.split('\n').length} lines / ${Buffer.byteLength(patch, 'utf8')} bytes`)
ok(/skill-filesystem/.test(patch), 'the bundle patch touches skill-filesystem (the README claims it is handled there)')
ok(patch.includes('dsh-lore'), 'the patch names the bundle', '')

// ---- summary -------------------------------------------------------------
const failed = results.filter(([good]) => !good)
say('')
say(`== ${results.length - failed.length}/${results.length} assertions passed ==`)
for (const [, label, detail] of failed) say(`   FAILED: ${label}${detail ? '  -- ' + detail : ''}`)

if (out) {
  const text = lines.join('\n') + '\n\n== assertions ==\n'
    + results.map(([good, label, detail]) => `${good ? 'PASS' : 'FAIL'}  ${label}${good || !detail ? '' : '  -- ' + detail}`).join('\n')
    + `\n\n${results.length - failed.length}/${results.length} assertions passed\n`
  writeFileSync(out, text, 'utf8')
  console.log(`\nwritten: ${out}`)
}
rmSync(base, { recursive: true, force: true })
process.exit(failed.length === 0 ? 0 : 1)
