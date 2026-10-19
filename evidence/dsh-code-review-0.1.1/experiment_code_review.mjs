
// dsh-code-review 标准测评实验 v0.1（预注册见 probes/PREREG_标准测评_v0.1.md）
import { readFileSync, writeFileSync, appendFileSync, mkdirSync, rmSync } from 'node:fs'
import { spawnSync } from 'node:child_process'

const NL = String.fromCharCode(10)
const ROOT = 'D:/natnat/lingshu/测试/dsh-code-review/raw/21-eval'
const RUNS = ROOT + '/runs'
const TOOLS = 'C:/Users/30951/tools'
const GIT = TOOLS + '/git/cmd/git.exe'
const ENGINE = 'D:/natnat/lingshu/测试/dsh-code-review/.work/codecheck-v011.exe'
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

const MODEL = 'deepseek-flash', TEMP = 0.7, SEEDS = [101, 202, 303], MAX_ROUNDS = 6, MAX_TOKENS = 2048
const LOG = ROOT + '/calls.jsonl'

const j = (arr) => arr.join(NL)
const GOOD_DB = j(['export function getUser(db, id) {', '  return db.prepare("SELECT * FROM users WHERE id = ?").get(id)', '}', ''])
const BAD_DB_SECRET = j(['const API_KEY = "sk-live-prod-9f8e7d6c5b4a"', 'const SQL = "SELECT * FROM users WHERE name = "', 'export function findUser(db, name) {', '  return db.query(SQL + name)', '}', ''])
const BAD_DB_SQLI = j(['export function findUser(db, name) {', '  return db.query("SELECT * FROM users WHERE name = " + name)', '}', ''])
const GOOD_FS = j(['import { readFile } from "node:fs/promises"', 'import path from "node:path"', 'export async function loadDoc(root, name) {', '  const safe = path.basename(name)', '  return readFile(path.join(root, safe), "utf8")', '}', ''])
const BAD_FS_TRAVERSAL = j(['import { readFile } from "node:fs/promises"', 'import path from "node:path"', 'export async function loadDoc(root, name) {', '  return readFile(path.join(root, name), "utf8")', '}', ''])
const GOOD_NET = j(['import { execFile } from "node:child_process"', 'export function ping(host) {', '  return execFile("ping", ["-n", "1", host])', '}', ''])
const BAD_NET_CMD = j(['import { exec } from "node:child_process"', 'export function ping(host) {', '  return exec("ping -n 1 " + host)', '}', ''])
const GOOD_USER = j(['export function displayName(user) {', '  if (!user || !user.profile) return "匿名"', '  return user.profile.name ?? "匿名"', '}', ''])
const BAD_USER_NULL = j(['export function displayName(user) {', '  return user.profile.name', '}', ''])
const GOOD_LOOP = j(['export function avg(nums) {', '  let sum = 0', '  for (let i = 0; i < nums.length; i++) sum += nums[i]', '  return sum / nums.length', '}', ''])
const BAD_LOOP_OBO = j(['export function avg(nums) {', '  let sum = 0', '  for (let i = 0; i <= nums.length; i++) sum += nums[i]', '  return sum / nums.length', '}', ''])
const GOOD_RACE = j(['export async function bump(counter) {', '  counter.value = counter.value + 1', '  return counter.value', '}', ''])
const BAD_RACE = j(['export async function bumpAll(counter, items) {', '  const tasks = items.map(async () => {', '    const next = counter.value + 1', '    await new Promise(r => setTimeout(r, 10))', '    counter.value = next', '  })', '  await Promise.all(tasks)', '  return counter.value', '}', ''])
const GOOD_REFACTOR = j(['export function total(rows) {', '  return rows.reduce((s, r) => s + r.amount, 0)', '}', ''])
const BAD_REFACTOR = j(['export function total(rows) {', '  let sum = 0', '  for (const r of rows) sum += r.amount', '  return sum', '}', ''])

const SCENES = [
  { id: 'S1', file: 'db.js', good: GOOD_DB, bad: BAD_DB_SECRET, expect: ['secret'] },
  { id: 'S2', file: 'db.js', good: GOOD_DB, bad: BAD_DB_SQLI, expect: ['sqli'] },
  { id: 'S3', file: 'fs.js', good: GOOD_FS, bad: BAD_FS_TRAVERSAL, expect: ['traversal'] },
  { id: 'S4', file: 'net.js', good: GOOD_NET, bad: BAD_NET_CMD, expect: ['cmdi'] },
  { id: 'S5', file: 'user.js', good: GOOD_USER, bad: BAD_USER_NULL, expect: ['nullref'] },
  { id: 'S6', file: 'stats.js', good: GOOD_LOOP, bad: BAD_LOOP_OBO, expect: ['offbyone'] },
  { id: 'S7', file: 'counter.js', good: GOOD_RACE, bad: BAD_RACE, expect: ['race'] },
  { id: 'S8', file: 'sum.js', good: GOOD_REFACTOR, bad: BAD_REFACTOR, expect: [] },
]

const KW = {
  secret: ['硬编码', 'hardcoded', 'hard-coded', '密钥', 'secret', 'api key', 'apikey', '泄露'],
  sqli: ['sql 注入', 'sql注入', 'sql injection', 'injection', '拼接', '参数化', 'parameterized'],
  traversal: ['路径遍历', 'traversal', '目录穿越', '..', '越权'],
  cmdi: ['命令注入', 'command injection', 'os.system', 'shell', 'exec'],
  nullref: ['判空', '未判空', 'null', 'undefined', '空指针', '可选链'],
  offbyone: ['越界', 'off-by-one', 'off by one', '边界', '索引', '<='],
  race: ['竞态', 'race', '并发', '锁', '原子'],
}
const ALL_KW = Object.values(KW).flat()
const CLEAN_WORDS = ['无关键问题', '没有问题', '无缺陷', 'none', 'no issues', 'looks good', '可以合入', '无需修改']

function judge(answer, expect) {
  const a = String(answer || '').toLowerCase()
  if (expect.length === 0) {
    const saysClean = CLEAN_WORDS.some(w => a.includes(w.toLowerCase()))
    const noDefect = !ALL_KW.some(w => a.includes(w.toLowerCase()))
    return saysClean && noDefect
  }
  return expect.some(k => KW[k].some(w => a.includes(w.toLowerCase())))
}
function extractAnswer(text) {
  const m = String(text || '').match(/ANSWER:([\s\S]*)/i)
  if (m) return m[1].trim().slice(0, 200)
  const lines = String(text || '').split(NL).filter(l => l.trim() !== '')
  return lines.length ? lines[lines.length - 1].trim() : ''
}

function git(dir, args) {
  const r = spawnSync(GIT, args, { cwd: dir, encoding: 'utf8', windowsHide: true })
  if (r.status !== 0) throw new Error('git ' + args[0] + ': ' + String(r.stderr || '').slice(0, 300))
  return r.stdout || ''
}
function prepareRepo(dir, sc) {
  rmSync(dir, { recursive: true, force: true }); mkdirSync(dir, { recursive: true })
  git(dir, ['init', '-q', '--initial-branch=main'])
  git(dir, ['config', 'user.name', 'eval']); git(dir, ['config', 'user.email', 'eval@example.invalid'])
  writeFileSync(dir + '/' + sc.file, sc.good, 'utf8')
  git(dir, ['add', '-A']); git(dir, ['commit', '-q', '-m', 'init'])
  writeFileSync(dir + '/' + sc.file, sc.bad, 'utf8')
  return git(dir, ['diff'])
}

const PATH_ENV = [TOOLS + '/bin', TOOLS + '/git/cmd', TOOLS + '/git/usr/bin', process.env.PATH || ''].join(';')
function reviewRepo(dir) {
  const t0 = Date.now()
  const r = spawnSync(ENGINE, ['review', '--repo', dir, '--concurrency', '1', '--audience', 'agent'], {
    cwd: dir, env: { ...process.env, PATH: PATH_ENV, OCR_LLM_URL: 'https://api.deepseek.com/v1', OCR_LLM_TOKEN: KEY, OCR_LLM_MODEL: MODEL, OCR_LLM_PROTOCOL: 'openai', OCR_LLM_TIMEOUT: '120' },
    encoding: 'utf8', timeout: 300000, windowsHide: true, maxBuffer: 32 * 1024 * 1024,
  })
  const text = ((r.stdout || '') + (r.stderr ? NL + '[stderr]' + NL + r.stderr : '')).trim()
  return { text: text.slice(0, 8000), exit: r.status, elapsed: Math.round((Date.now() - t0) / 1000) }
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

const TOOL_SCHEMA = [{ type: 'function', function: {
  name: 'code_review',
  description: '对本地 git 仓库的未提交改动做代码评审，返回引擎 findings（问题清单）。参数 repo_path 为仓库绝对路径。',
  parameters: { type: 'object', properties: { repo_path: { type: 'string', description: '仓库绝对路径' }, mode: { type: 'string', enum: ['uncommitted', 'branch', 'commit'] }, focus: { type: 'string' } }, required: ['repo_path'] },
} }]

async function runWith(sc, dir, seed) {
  const messages = [
    { role: 'system', content: '你可以调用 code_review 工具对 git 仓库的未提交改动做代码评审（工具会调用评审引擎并返回 findings）。任务：判断这次改动是否存在安全隐患或缺陷，并说明类型。最后一行只写 "ANSWER: <逗号分隔的问题类型，例如 sql injection / hardcoded secret；没有则 NONE>"。' },
    { role: 'user', content: '仓库目录：' + dir + NL + '请评审该仓库工作区里未提交的改动。' },
  ]
  let lastText = ''
  for (let round = 0; round < MAX_ROUNDS; round++) {
    let msg, finish
    for (let attempt = 0; attempt < 2; attempt++) {
      const res = await callModel(messages, TOOL_SCHEMA, seed)
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
        const target = typeof args.repo_path === 'string' && args.repo_path ? args.repo_path : dir
        result = JSON.stringify(reviewRepo(target)).slice(0, 8000)
      } catch (e) { result = 'ERROR: ' + String(e).slice(0, 300) }
      messages.push({ role: 'tool', tool_call_id: c.id, content: result })
    }
  }
  const ans = extractAnswer(lastText)
  return { ok: judge(ans, sc.expect), answer: ans }
}

async function runWithout(sc, diff, seed) {
  const messages = [
    { role: 'system', content: '你没有代码评审工具，只能阅读文本。下面是某仓库一次未提交改动的 unified diff，请判断这次改动是否存在安全隐患或缺陷。最后一行只写 "ANSWER: <逗号分隔的问题类型，例如 sql injection / hardcoded secret；没有则 NONE>"。' },
    { role: 'user', content: '--- unified diff begin ---' + NL + diff.slice(0, 12000) + NL + '--- unified diff end ---' },
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
    const diff = prepareRepo(dir, sc)
    const w = await runWith(sc, dir, seed)
    const wo = await runWithout(sc, diff, seed)
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
