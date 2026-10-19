
// dsh-codex-port 标准测评实验 v0.2（预注册见 probes/PREREG_标准测评_v0.2.md；v0.1 判分器缺陷作废）
import { readFileSync, writeFileSync, appendFileSync, mkdirSync, rmSync, readdirSync, existsSync, statSync } from 'node:fs'
import { spawnSync } from 'node:child_process'

const NL = String.fromCharCode(10)
const ROOT = 'D:/natnat/lingshu/测试/dsh-codex-port/raw/50-eval-v02'
const RUNS = ROOT + '/runs'
mkdirSync(RUNS, { recursive: true })

function findKey() {
  const h = process.env.USERPROFILE || ''
  for (const p of [h + '/.dsh/.env/key.txt', h + '/.dsh/.env']) {
    try {
      const t = readFileSync(p, 'utf8')
      for (const l of t.split(NL)) {
        if (l.includes('DEEPSEEK_API_KEY=')) return l.split('DEEPSEEK_API_KEY=')[1].trim()
        if (l.trim().startsWith('sk-')) return l.trim()
      }
    } catch {}
  }
  return process.env.DEEPSEEK_API_KEY
}
const KEY = findKey(); if (!KEY) { console.log('NO_KEY'); process.exit(2) }

// 运行副本：源码树逐字节复制 + yaml 2.9.0 依赖（pnpm 结构中的 yaml 不在插件 node_modules 顶层）
const MOD = await import('file:///C:/Users/30951/AppData/Local/Temp/cp-runtime/lib/tools.js')
const CFG = await import('file:///C:/Users/30951/AppData/Local/Temp/cp-runtime/lib/config.js')

const MODEL = 'deepseek-flash', TEMP = 0.7, SEEDS = [101, 202, 303], MAX_ROUNDS = 6, MAX_TOKENS = 2048
const LOG = ROOT + '/calls.jsonl'

const skillMd = (name, desc) => ['---', 'name: ' + name, 'description: ' + desc, '---', '', '正文：' + name].join(NL)
const skillMdNoFm = (body) => ['# ' + body, '', '无 frontmatter 的技能正文。'].join(NL)

function plugin(codexHome, name, version, skills) {
  const dir = codexHome + '/.tmp/plugins/plugins/' + name
  mkdirSync(dir + '/.codex-plugin', { recursive: true })
  writeFileSync(dir + '/.codex-plugin/plugin.json', JSON.stringify({ name, version, description: name + ' plugin', homepage: 'https://example.invalid/' + name, license: 'MIT' }), 'utf8')
  for (const s of skills) {
    mkdirSync(dir + '/skills/' + s.dir, { recursive: true })
    writeFileSync(dir + '/skills/' + s.dir + '/SKILL.md', s.content, 'utf8')
  }
}

function skillDirs(target) {
  if (!existsSync(target)) return []
  return readdirSync(target).filter(n => { try { return statSync(target + '/' + n).isDirectory() } catch { return false } })
}
function skillText(target, name) {
  try { return readFileSync(target + '/' + name + '/SKILL.md', 'utf8') } catch { return null }
}
function anySkillText(target, needle) {
  return skillDirs(target).some(d => { const t = skillText(target, d); return t !== null && t.includes(needle) })
}

const SCENES = [
  { id: 'S1', task: '本机 Codex 目录里有一个插件 alpha，含技能 greet。请把它移植为目标技能目录下的 DSH 技能。', setup: (ch) => plugin(ch, 'alpha', '1.0.0', [{ dir: 'greet', content: skillMd('greet', '打招呼') }]), judge: (target, ans) => existsSync(target + '/greet/SKILL.md') },
  { id: 'S2', task: '本机 Codex 目录里有一个技能 plain（SKILL.md 没有 frontmatter、没有 description）。请移植它，并确认不会产出不合法的 DSH 技能。', setup: (ch) => plugin(ch, 'alpha', '1.0.0', [{ dir: 'plain', content: skillMdNoFm('plain') }]), judge: (target, ans) => !existsSync(target + '/plain') },
  { id: 'S3', task: '本机 Codex 目录里有一个插件 alpha，技能名是 v1.2-reader（含点和连字符）。请移植它，注意目标目录名要合法。', setup: (ch) => plugin(ch, 'alpha', '1.0.0', [{ dir: 'v1.2-reader', content: skillMd('v1.2-reader', '特殊名技能') }]), judge: (target, ans) => existsSync(target + '/v1.2-reader/SKILL.md') },
  { id: 'S4', task: '本机 Codex 目录里有两个插件 alpha 与 beta，各含 2 个技能。请把它们全部移植。', setup: (ch) => { plugin(ch, 'alpha', '1.0.0', [{ dir: 'a1', content: skillMd('a1', 'A1') }, { dir: 'a2', content: skillMd('a2', 'A2') }]); plugin(ch, 'beta', '1.0.0', [{ dir: 'b1', content: skillMd('b1', 'B1') }, { dir: 'b2', content: skillMd('b2', 'B2') }]) }, judge: (target, ans) => skillDirs(target).length >= 4 },
  { id: 'S5', task: '本机 Codex 目录里有一个技能 greet。目标技能目录里已经存在同名技能 greet（内容含 OLD-KEEP），请移植但不要覆盖它。', setup: (ch) => plugin(ch, 'alpha', '1.0.0', [{ dir: 'greet', content: skillMd('greet', '新版本') }]), prep: (target) => { mkdirSync(target + '/greet', { recursive: true }); writeFileSync(target + '/greet/SKILL.md', 'OLD-KEEP' + NL, 'utf8') }, judge: (target, ans) => { const t = skillText(target, 'greet'); return t !== null && t.includes('OLD-KEEP') } },
  { id: 'S6', task: '本机 Codex 目录里有一个技能 greet 可以移植。请先做一次 dryRun 预览确认计划，然后告诉我计划结果。', setup: (ch) => plugin(ch, 'alpha', '1.0.0', [{ dir: 'greet', content: skillMd('greet', '预览') }]), judge: (target, ans) => skillDirs(target).length === 0 },
  { id: 'S7', task: '本机 Codex 目录里有两个插件 alpha（技能 a1）与 beta（技能 b1）。只移植 beta 插件的技能，不要碰 alpha。', setup: (ch) => { plugin(ch, 'alpha', '1.0.0', [{ dir: 'a1', content: skillMd('a1', 'A1') }]); plugin(ch, 'beta', '1.0.0', [{ dir: 'b1', content: skillMd('b1', 'B1') }]) }, judge: (target, ans) => existsSync(target + '/b1/SKILL.md') && !existsSync(target + '/a1') },
  { id: 'S8', task: '本机 Codex 目录似乎在默认位置但可能没有安装。请检查 Codex 目录并告诉我当前状态。', setup: null, judge: (target, ans) => { const a = String(ans || ''); return a.includes('没有可移植') || a.includes('无任何可移植') || a.includes('未安装') || a.includes('0 个') || a.includes('均为 0') || a.includes('没有插件') } },
]

async function callModel(messages, toolsSchema, seed) {
  const body = { model: MODEL, messages, temperature: TEMP, max_tokens: MAX_TOKENS, seed }
  if (toolsSchema && toolsSchema.length) body.tools = toolsSchema
  const r = await fetch('https://api.deepseek.com/chat/completions', {
    method: 'POST', headers: { Authorization: 'Bearer ' + KEY, 'Content-Type': 'application/json' }, body: JSON.stringify(body),
  })
  const resp = await r.json()
  if (r.status !== 200) throw new Error('HTTP ' + r.status + ' ' + JSON.stringify(resp).slice(0, 300))
  const choice = resp.choices[0]
  appendFileSync(LOG, JSON.stringify({ ts: new Date().toISOString(), model: MODEL, temperature: TEMP, seed, finish: choice.finish_reason, prompt_tokens: resp.usage?.prompt_tokens, completion_tokens: resp.usage?.completion_tokens, total_tokens: resp.usage?.total_tokens }) + NL, 'utf8')
  return { message: choice.message, finish: choice.finish_reason }
}

function extractAnswer(text) {
  const m = String(text || '').match(/ANSWER:([\s\S]*)/i)
  if (m) return m[1].trim().slice(0, 300)
  const lines = String(text || '').split(NL).filter(l => l.trim() !== '')
  return lines.length ? lines[lines.length - 1].trim() : ''
}

function prepare(sc, base) {
  const codexHome = base + '/codex'
  const target = base + '/skills'
  rmSync(base, { recursive: true, force: true })
  mkdirSync(codexHome, { recursive: true })
  if (sc.setup) sc.setup(codexHome)
  if (sc.prep) { mkdirSync(target, { recursive: true }); sc.prep(target) }
  return { codexHome, target }
}

async function runWith(sc, codexHome, target, seed) {
  const cfg = CFG.resolveConfig({ codexHome, targetDir: target })
  const tools = MOD.buildCodexPortTools(cfg)
  const schema = tools.map(t => ({ type: 'function', function: { name: t.name, description: t.description, parameters: t.parameters } }))
  const byName = Object.fromEntries(tools.map(t => [t.name, t]))
  const messages = [
    { role: 'system', content: '你可以使用 dsh-codex-port 的 3 个工具（codex_list / codex_port / codex_status）：列出 ~/.codex 里的插件与技能、把 Codex 技能移植为 DSH 技能、查询移植状态。环境已配置好 codexHome 与目标技能目录，调用时无需传 targetDir。必须实际调用工具完成任务，不要只描述步骤。最后一行只写 "ANSWER: <一句话结果>"。' },
    { role: 'user', content: sc.task },
  ]
  let lastText = ''
  for (let round = 0; round < MAX_ROUNDS; round++) {
    let msg, finish
    for (let attempt = 0; attempt < 2; attempt++) {
      const res = await callModel(messages, schema, seed)
      msg = res.message; finish = res.finish
      if ((msg.content || '') !== '' || (msg.tool_calls || []).length > 0) break
    }
    if (msg.content) lastText = msg.content
    if (finish === 'length') break
    messages.push(msg)
    const calls = msg.tool_calls || []
    if (calls.length === 0) break
    for (const c of calls) {
      let result
      try {
        const args = JSON.parse(c.function?.arguments || '{}')
        const out = await byName[c.function.name].execute(args, { agent: { session: { header: { cwd: target } } } })
        result = JSON.stringify(out).slice(0, 6000)
      } catch (e) { result = 'ERROR: ' + String(e).slice(0, 400) }
      messages.push({ role: 'tool', tool_call_id: c.id, content: result })
    }
  }
  const ans = extractAnswer(lastText)
  return { ok: sc.judge(target, ans), answer: ans }
}

async function runWithout(sc, seed) {
  const messages = [
    { role: 'system', content: '你没有任何工具，也无法写文件系统。只能根据描述进行文本回答。最后一行只写 "ANSWER: <一句话结果>"。' },
    { role: 'user', content: sc.task + NL + '（提示：你无法执行移植，只能描述你会怎么做或可能的结果。）' },
  ]
  try {
    const msg = (await callModel(messages, null, seed)).message
    const ans = extractAnswer(msg.content)
    return { ok: false, answer: ans, note: 'no-filesystem' }
  } catch (e) { return { ok: false, error: String(e).slice(0, 200) } }
}

function m32(a) { return function () { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296 } }
function bootstrap(diffs, B, seed) {
  const rnd = m32(seed), out = []
  for (let b = 0; b < B; b++) { let s = 0; for (let i = 0; i < diffs.length; i++) s += diffs[Math.floor(rnd() * diffs.length)]; out.push(s) }
  out.sort((x, y) => x - y)
  return { lo: out[Math.floor(B * 0.025)], hi: out[Math.floor(B * 0.975)] }
}

const rows = []
for (const sc of SCENES) {
  const row = { id: sc.id, with: 0, without: 0, samples: [] }
  for (const seed of SEEDS) {
    const base = RUNS + '/' + sc.id + '-' + seed
    const { codexHome, target } = prepare(sc, base)
    const w = await runWith(sc, codexHome, target, seed)
    const wo = await runWithout(sc, seed)
    row.with += w.ok ? 1 : 0
    row.without += wo.ok ? 1 : 0
    row.samples.push({ seed, with: { ok: w.ok, answer: w.answer }, without: wo })
    console.log(sc.id, 'seed', seed, 'with', w.ok, '| without', wo.ok, '| ans:', String(w.answer || '').slice(0, 70))
  }
  rows.push(row)
  console.log('==', sc.id, 'with', row.with, '/3 | without', row.without, '/3')
}

const diffs = rows.map(r => r.with - r.without)
const D = diffs.reduce((a, b) => a + b, 0)
const { lo, hi } = bootstrap(diffs, 10000, 20261019)
const halfWidth = (hi - lo) / 2
const a = 12, b = 6
let verdict
if (halfWidth > 6) verdict = '还说不准（精度不足）'
else if (lo > a) verdict = '真有用'
else if (hi < -b) verdict = '帮倒忙'
else if (lo > -b && hi < a) verdict = '没啥差别'
else verdict = '还说不准'

const summary = { model: MODEL, temperature: TEMP, seeds: SEEDS, tasks: rows.length, perScenario: rows, D, ci95: [lo, hi], halfWidth, prereg: { a, b, precision: 6, B: 10000, seed: 20261019 }, verdict, ranAt: new Date().toISOString() }
writeFileSync(ROOT + '/result.json', JSON.stringify(summary, null, 2), 'utf8')
console.log('D =', D, '| 95% CI =', [lo, hi], '| halfWidth =', halfWidth, '| verdict =', verdict)
