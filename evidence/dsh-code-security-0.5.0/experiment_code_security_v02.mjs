
// dsh-code-security 标准测评实验 v0.2（预注册见 probes/PREREG_标准测评_v0.2.md；v0.1 判分器与 subprocess 桩缺陷作废）
import { readFileSync, writeFileSync, appendFileSync, mkdirSync, rmSync } from 'node:fs'

const NL = String.fromCharCode(10)
const ROOT = 'D:/natnat/lingshu/测试/dsh-code-security/raw/70-eval-v02'
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

const PLUGIN = 'file:///C:/Users/30951/AppData/Local/Temp/cs-runtime/node_modules/dsh-code-security/lib/index.js'
const MODEL = 'deepseek-flash', TEMP = 0.7, SEEDS = [101, 202, 303], MAX_ROUNDS = 6, MAX_TOKENS = 2048
const LOG = ROOT + '/calls.jsonl'

const j = (arr) => arr.join(NL)
const F = {
  inject: j(['export function find(db, name) {', '  return db.query("SELECT * FROM users WHERE name = " + name)', '}']),
  secrets: j(['const API_KEY = "sk-live-9f8e7d6c5b4a"', 'export const key = API_KEY']),
  exec: j(['import { exec } from "node:child_process"', 'export function ping(host) {', '  return exec("ping -n 1 " + host)', '}']),
  eval: j(['export function run(code) {', '  return eval(code)', '}']),
  hash: j(['import crypto from "node:crypto"', 'export function digest(s) {', '  return crypto.createHash("md5").update(s).digest("hex")', '}']),
  fs: j(['import { readFile } from "node:fs/promises"', 'import path from "node:path"', 'export async function load(root, name) {', '  return readFile(path.join(root, name), "utf8")', '}']),
  good: j(['export function add(a, b) {', '  return a + b', '}', 'export function clamp(x, lo, hi) {', '  return Math.min(hi, Math.max(lo, x))', '}']),
}

const SCENES = [
  { id: 'S1', files: { 'inject.js': F.inject }, expect: { file: 'inject.js', kw: ['注入', 'injection', '拼接'] } },
  { id: 'S2', files: { 'secrets.js': F.secrets }, expect: { file: 'secrets.js', kw: ['硬编码', '密钥', 'secret', 'hardcoded', 'api key'] } },
  { id: 'S3', files: { 'exec.js': F.exec }, expect: { file: 'exec.js', kw: ['命令注入', 'command injection', 'exec', 'shell'] } },
  { id: 'S4', files: { 'eval.js': F.eval }, expect: { file: 'eval.js', kw: ['eval', '代码执行', 'code execution', 'dangerous'] } },
  { id: 'S5', files: { 'hash.js': F.hash }, expect: { file: 'hash.js', kw: ['md5', '弱哈希', 'weak hash', '哈希'] } },
  { id: 'S6', files: { 'fs.js': F.fs }, expect: { file: 'fs.js', kw: ['路径遍历', 'traversal', '目录穿越', 'path'] } },
  { id: 'S7', files: { 'good.js': F.good }, expect: { file: 'good.js', kw: [] } },
  { id: 'S8', files: { 'secrets.js': F.secrets, 'inject.js': F.inject }, expect: { file: 'secrets.js', kw: ['硬编码', '密钥', 'secret'], second: { file: 'inject.js', kw: ['注入', 'injection', '拼接'] } } },
]
const ALL_KW = ['注入', 'injection', '硬编码', '密钥', 'secret', 'hardcoded', '命令注入', 'eval', 'md5', '路径遍历', 'traversal', 'shell', '弱哈希']
const CLEAN = ['无问题', '无发现', '没有发现', 'no findings', 'no issues', 'clean', '未见', 'none']

function judge(answer, expect) {
  const a = String(answer || '').toLowerCase()
  if (expect.kw.length === 0) {
    const saysClean = CLEAN.some(w => a.includes(w.toLowerCase()))
    const noDefect = !ALL_KW.some(w => a.includes(w.toLowerCase()))
    return saysClean && noDefect
  }
  const hitFile = a.includes(expect.file.toLowerCase())
  const hitKw = expect.kw.some(w => a.includes(w.toLowerCase()))
  if (expect.second) {
    return hitFile && hitKw && a.includes(expect.second.file.toLowerCase()) && expect.second.kw.some(w => a.includes(w.toLowerCase()))
  }
  return hitFile && hitKw
}

function extractAnswer(text) {
  const m = String(text || '').match(/ANSWER:([\s\S]*)/i)
  if (m) return m[1].trim().slice(0, 300)
  const lines = String(text || '').split(NL).filter(l => l.trim() !== '')
  return lines.length ? lines[lines.length - 1].trim() : ''
}

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

function prepare(sc, dir) {
  rmSync(dir, { recursive: true, force: true }); mkdirSync(dir, { recursive: true })
  for (const [name, content] of Object.entries(sc.files)) writeFileSync(dir + '/' + name, content, 'utf8')
}

async function runWith(sc, dir, seed) {
  const m = await import(PLUGIN)
  const tools = []
  const ctx = {
    tools: { register: (d) => { tools.push(d); return () => {} } },
    subprocess: { spawn: () => ({ done: Promise.resolve({ exitCode: 1, signal: null }), collected: { stdout: { readFrom: () => ({ text: '' }) }, stderr: { readFrom: () => ({ text: 'disabled' }) } }, terminate: () => {} }) },
    effect: (fn) => { const d = fn(); return typeof d === 'function' ? d : () => {} },
    on: () => () => {},
    get: () => undefined,
  }
  process.chdir(dir)
  m.apply(ctx, {})
  const schema = tools.map(t => ({ type: 'function', function: { name: t.name, description: t.description, parameters: t.parameters } }))
  const byName = Object.fromEntries(tools.map(t => [t.name, t]))
  const messages = [
    { role: 'system', content: '你可以使用 dsh-code-security 的 10 个安全工具（secure_scan / secure_diff / secure_fix_verify / secure_report / secure_export / secure_baseline / secure_deps / secure_policy_show / secure_policy_set / secure_health）。工作区就是当前目录，可用 secure_scan 扫描（target 可选）。必须实际调用工具，最后一行只写 "ANSWER: <文件:行号 问题类型，多条用分号分隔；没有则 NONE>"。' },
    { role: 'user', content: '请对这个工作区做一次安全扫描，列出所有注入、硬编码密钥、危险调用等问题。' },
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
        const out = await byName[c.function.name].execute(args, {})
        result = JSON.stringify(out).slice(0, 6000)
      } catch (e) { result = 'ERROR: ' + String(e).slice(0, 400) }
      messages.push({ role: 'tool', tool_call_id: c.id, content: result })
    }
  }
  const ans = extractAnswer(lastText)
  return { ok: judge(ans, sc.expect), answer: ans }
}

async function runWithout(sc, seed) {
  const parts = Object.entries(sc.files).map(([n, c]) => '=== ' + n + ' ===' + NL + c)
  const messages = [
    { role: 'system', content: '你没有安全扫描工具，只能阅读文本。下面是某个工作区的全部文件内容，请判断其中是否存在注入、硬编码密钥、危险调用等问题。最后一行只写 "ANSWER: <文件:行号 问题类型，多条用分号分隔；没有则 NONE>"。' },
    { role: 'user', content: parts.join(NL + NL) },
  ]
  let msg
  try { msg = (await callModel(messages, null, seed)).message } catch (e) { return { ok: false, error: String(e).slice(0, 200) } }
  const ans = extractAnswer(msg.content)
  return { ok: judge(ans, sc.expect), answer: ans }
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
    const dir = RUNS + '/' + sc.id + '-' + seed
    prepare(sc, dir)
    const w = await runWith(sc, dir, seed)
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
