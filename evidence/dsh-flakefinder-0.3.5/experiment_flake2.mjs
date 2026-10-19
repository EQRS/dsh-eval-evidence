// dsh-flakefinder 标准测评实验 v0.2（预注册见 probes/PREREG_标准测评_v0.2.md）
// 装组：插件真实 6 工具；场景为真实 node:test 项目（plan.json 控制每轮 P/F）。8 场景 × 3 seed × 2 组
import { readFileSync, writeFileSync, appendFileSync, mkdirSync, rmSync } from 'node:fs'
import { spawn, spawnSync } from 'node:child_process'

const ROOT = 'D:/natnat/lingshu/测试/dsh-flakefinder/raw/13-eval'
const RUNS = ROOT + '/runs'
const DATA = ROOT + '/data'
mkdirSync(RUNS, { recursive: true }); mkdirSync(DATA, { recursive: true })

function findKey() {
  const h = process.env.USERPROFILE || ''
  for (const p of [h + '/.dsh/.env/key.txt', h + '/.dsh/.env']) {
    try {
      const t = readFileSync(p, 'utf8')
      for (const l of t.split(/\r?\n/)) {
        if (l.includes('DEEPSEEK_API_KEY=')) return l.split('DEEPSEEK_API_KEY=')[1].trim()
        if (l.trim().startsWith('sk-')) return l.trim()
      }
    } catch {}
  }
  return process.env.DEEPSEEK_API_KEY
}
const KEY = findKey(); if (!KEY) { console.log('NO_KEY'); process.exit(2) }

const T = await import('file:///D:/natnat/lingshu/外部插件/dsh-flakefinder/dsh-flakefinder-master/lib/tools.js')
const C = await import('file:///D:/natnat/lingshu/外部插件/dsh-flakefinder/dsh-flakefinder-master/lib/config.js')
const S = await import('file:///D:/natnat/lingshu/外部插件/dsh-flakefinder/dsh-flakefinder-master/lib/store.js')
const R = await import('file:///D:/natnat/lingshu/外部插件/dsh-flakefinder/dsh-flakefinder-master/lib/runner.js')

const MODEL = 'deepseek-flash', TEMP = 0.7, SEEDS = [101, 202, 303], MAX_ROUNDS = 8
const LOG = ROOT + '/calls.jsonl'

const SRC = [
  "import test from 'node:test'",
  "import assert from 'node:assert/strict'",
  "import { readFileSync, writeFileSync } from 'node:fs'",
  "const plan = JSON.parse(readFileSync(new URL('plan.json', import.meta.url), 'utf8'))",
  "const st = JSON.parse(readFileSync(new URL('state.json', import.meta.url), 'utf8'))",
  "const run = st.run",
  "st.run = run + 1",
  "writeFileSync(new URL('state.json', import.meta.url), JSON.stringify(st))",
  "for (const [name, seq] of Object.entries(plan)) {",
  "  const want = seq[Math.min(run, seq.length - 1)]",
  "  test(name, () => {",
  "    if (want === 'S') return",
  "    assert.equal(want, 'P', name + ' 第 ' + (run + 1) + ' 轮失败')",
  "  })",
  "}",
].join('\n')

const P = (a, b, c) => [a, b, c]
const SCENARIOS = [
  { id: 'S1', plan: { alpha: P('P','P','P'), beta: P('P','P','F'), gamma: P('P','P','P') }, exp: ['beta'], q: '哪些测试不稳定（flaky）？' },
  { id: 'S2', plan: { alpha: P('P','F','P'), beta: P('F','P','P'), gamma: P('P','P','P') }, exp: ['alpha','beta'], q: '哪些测试不稳定？' },
  { id: 'S3', plan: { alpha: P('F','F','F'), beta: P('F','F','F'), gamma: P('P','P','P') }, exp: [], q: '有没有 flaky 测试？' },
  { id: 'S4', plan: { alpha: P('P','P','P'), beta: P('P','P','P'), gamma: P('P','P','P') }, exp: [], q: '有没有 flaky 测试？' },
  { id: 'S5', plan: { alpha: P('P','F','P'), beta: P('P','P','P'), gamma: P('P','P','P') }, exp: ['alpha'], q: '哪些测试不稳定？' },
  { id: 'S6', plan: { alpha: P('F','P','P'), beta: P('P','P','P'), gamma: P('P','P','F') }, exp: ['alpha','gamma'], q: '哪些测试不稳定？' },
  { id: 'S7', plan: { alpha: P('F','P','P'), beta: P('P','F','P'), gamma: P('P','P','P') }, exp: ['alpha','beta'], q: '哪些测试不稳定？' },
  { id: 'S8', plan: { alpha: P('P','P','P'), beta: P('F','F','F'), gamma: P('P','P','P') }, exp: [], q: '哪些测试稳定通过、哪些稳定失败、有没有 flaky？' },
]

function writeFixture(dir, plan) {
  rmSync(dir, { recursive: true, force: true }); mkdirSync(dir, { recursive: true })
  writeFileSync(dir + '/plan.json', JSON.stringify(plan), 'utf8')
  writeFileSync(dir + '/state.json', JSON.stringify({ run: 0 }), 'utf8')
  writeFileSync(dir + '/test.stability.test.mjs', SRC, 'utf8')
}

function spawnImpl(spec) {
  const child = spawn(spec.argv[0], spec.argv.slice(1), { cwd: spec.cwd, stdio: ['ignore', 'pipe', 'pipe'] })
  let so = '', se = ''
  child.stdout.on('data', d => { so += d.toString('utf8') })
  child.stderr.on('data', d => { se += d.toString('utf8') })
  const done = new Promise(res => child.on('close', (code, signal) => res({ exitCode: code, signal })))
  return { done, collected: { stdout: { readFrom: () => ({ text: so }) }, stderr: { readFrom: () => ({ text: se }) } }, terminate: () => child.kill() }
}

function logCall(rec) { appendFileSync(LOG, JSON.stringify(rec) + '\n', 'utf8') }

async function callModel(messages, toolsSchema, seed) {
  const body = { model: MODEL, messages, temperature: TEMP, max_tokens: 1200, seed }
  if (toolsSchema && toolsSchema.length) body.tools = toolsSchema
  const r = await fetch('https://api.deepseek.com/chat/completions', {
    method: 'POST', headers: { Authorization: 'Bearer ' + KEY, 'Content-Type': 'application/json' }, body: JSON.stringify(body),
  })
  const j = await r.json()
  if (r.status !== 200) throw new Error('HTTP ' + r.status + ' ' + JSON.stringify(j).slice(0, 300))
  logCall({ ts: new Date().toISOString(), model: MODEL, temperature: TEMP, seed, prompt_tokens: j.usage?.prompt_tokens, completion_tokens: j.usage?.completion_tokens, total_tokens: j.usage?.total_tokens })
  return j.choices[0].message
}

const NAMES = ['alpha', 'beta', 'gamma']
function judge(answer, exp) {
  const s = String(answer || '').toLowerCase()
  const got = NAMES.filter(n => s.includes(n))
  const want = exp.filter(n => NAMES.includes(n))
  return got.length === want.length && want.every(n => got.includes(n))
}
function extractAnswer(text) {
  const lines = String(text || '').split(/\r?\n/).filter(l => l.trim() !== '')
  const last = lines.length ? lines[lines.length - 1] : ''
  const m = last.match(/ANSWER:\s*(.+)/i) || String(text).match(/ANSWER:\s*(.+)/i)
  return (m ? m[1] : last).trim()
}

async function runWith(sc, seed) {
  const dir = RUNS + '/' + sc.id + '-' + seed
  writeFixture(dir, sc.plan)
  const cfg = C.resolveConfig({ dataDir: DATA, timeoutMs: 60000 }, dir)
  const store = S.createStore(cfg.dataDir, cfg.quarantineFile)
  const runner = R.createSubprocessRunner(spawnImpl, 5000, 60000)
  const tools = T.buildFlakeTools(cfg, runner, store)
  const schema = tools.map(t => ({ type: 'function', function: { name: t.name, description: t.description, parameters: t.parameters } }))
  const byName = Object.fromEntries(tools.map(t => [t.name, t]))
  const messages = [
    { role: 'system', content: '你可以使用 dsh-flakefinder 工具（flaky_detect / flaky_history / flaky_quarantine / flaky_clear / flaky_report / flaky_health）。项目目录就是当前工作区。请用 flaky_detect 以 framework=node、runs=3 对 test.stability.test.mjs 实际运行 3 轮，再根据工具结果判断稳定性。最后一行只写 "ANSWER: <逗号分隔的不稳定测试名，没有则 NONE>"。' },
    { role: 'user', content: '项目里有测试文件 test.stability.test.mjs。' + sc.q },
  ]
  let lastText = ''
  try {
    for (let round = 0; round < MAX_ROUNDS; round++) {
      const msg = await callModel(messages, schema, seed)
      messages.push(msg)
      if (msg.content) lastText = msg.content
      const calls = msg.tool_calls || []
      if (calls.length === 0) break
      for (const c of calls) {
        const tool = byName[c.function?.name]
        let result
        try {
          const args = JSON.parse(c.function?.arguments || '{}')
          const out = await tool.execute(args, { agent: { session: { header: { cwd: dir } } } })
          result = JSON.stringify(out).slice(0, 6000)
        } catch (e) { result = 'ERROR: ' + String(e).slice(0, 300) }
        messages.push({ role: 'tool', tool_call_id: c.id, content: result })
      }
    }
  } catch (e) { return { ok: false, error: String(e).slice(0, 300) } }
  const ans = extractAnswer(lastText)
  return { ok: judge(ans, sc.exp), answer: ans.slice(0, 200) }
}

function preRunTap(sc, seed) {
  const dir = RUNS + '/' + sc.id + '-' + seed + '-wo'
  writeFixture(dir, sc.plan)
  const parts = []
  for (let i = 0; i < 3; i++) {
    const r = spawnSync(process.execPath, ['--test', '--test-reporter=tap', 'test.stability.test.mjs'], { cwd: dir, encoding: 'utf8', timeout: 60000 })
    parts.push('===== 第 ' + (i + 1) + ' 轮 TAP 输出 =====\n' + (r.stdout || '') + (r.stderr ? '\n[stderr]\n' + r.stderr : ''))
  }
  return parts.join('\n')
}

async function runWithout(sc, seed) {
  const tap = preRunTap(sc, seed)
  const messages = [
    { role: 'system', content: '你不能运行测试、不能使用任何工具，也没有文件读写能力。下面给出该测试文件连续 3 轮运行的 TAP 原始输出，请自行解析判断哪些测试不稳定（flaky）。最后一行只写 "ANSWER: <逗号分隔的不稳定测试名，没有则 NONE>"。' },
    { role: 'user', content: tap + '\n\n' + sc.q },
  ]
  let msg
  try { msg = await callModel(messages, null, seed) } catch (e) { return { ok: false, error: String(e).slice(0, 300) } }
  const ans = extractAnswer(msg.content)
  return { ok: judge(ans, sc.exp), answer: ans.slice(0, 200) }
}

function m32(a) { return function () { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296 } }
function bootstrap(diffs, B = 10000, seed = 20261019) {
  const rnd = m32(seed), out = []
  for (let b = 0; b < B; b++) { let s = 0; for (let i = 0; i < diffs.length; i++) s += diffs[Math.floor(rnd() * diffs.length)]; out.push(s) }
  out.sort((x, y) => x - y)
  return { lo: out[Math.floor(B * 0.025)], hi: out[Math.floor(B * 0.975)] }
}

const rows = []
for (const sc of SCENARIOS) {
  const row = { id: sc.id, with: 0, without: 0, samples: [] }
  for (const seed of SEEDS) {
    const w = await runWith(sc, seed)
    const wo = await runWithout(sc, seed)
    row.with += w.ok ? 1 : 0
    row.without += wo.ok ? 1 : 0
    row.samples.push({ seed, with: w, without: wo })
    console.log(sc.id, 'seed', seed, 'with', w.ok, '| without', wo.ok)
  }
  rows.push(row)
  console.log('==', sc.id, 'with', row.with, '/3 | without', row.without, '/3')
}

const diffs = rows.map(r => r.with - r.without)
const D = diffs.reduce((a, b) => a + b, 0)
const { lo, hi } = bootstrap(diffs)
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
console.log('\nD =', D, '| 95% CI =', [lo, hi], '| halfWidth =', halfWidth, '| 判定 =', verdict)
