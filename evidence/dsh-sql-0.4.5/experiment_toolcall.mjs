// dsh-sql 标准测评实验：装（工具）vs 不装（裸模型），8 场景 × 3 轮配对
// 预注册（跑前冻结，不得中途改）：
//   主要指标：配对正确差 D = Σ(场景内装组正确数 - 不装组正确数)，范围 [-24, 24]
//   a = 12（8 场景每题 3 轮全对才够 24；多对 4 题=12）、b = 6
//   精度门槛：bootstrap 95% 区间半宽 ≤ 6
//   判定：L > a 真有用；U < -b 帮倒忙；L > -b 且 U < a 没啥差别；其余还说不准
//   bootstrap：按场景重采样 10000 次，种子 20261019
import { DatabaseSync } from 'node:sqlite'
import { buildSqlTools } from 'file:///D:/natnat/lingshu/外部插件/dsh-sql/dsh-sql-master/lib/tools.js'
import { readFileSync, writeFileSync, appendFileSync, mkdirSync } from 'node:fs'
import { createHash } from 'node:crypto'

const OUT = 'D:/natnat/lingshu/测试/dsh-sql/raw/11-eval'
mkdirSync(OUT, { recursive: true })
const DB = OUT + '/eval.db'
try { (await import('node:fs')).unlinkSync(DB) } catch {}
const db = new DatabaseSync(DB)
db.exec('CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT, city TEXT)')
db.exec('CREATE TABLE orders (id INTEGER PRIMARY KEY, user_id INTEGER, amount REAL, created_at TEXT)')
db.exec("INSERT INTO users VALUES (1,'Alice','Shanghai'),(2,'Bob','Beijing'),(3,'Cara','Shenzhen'),(4,'Dan','Beijing'),(5,'Eve','Shanghai')")
db.exec("INSERT INTO orders VALUES (1,1,100,'2026-10-01'),(2,1,50,'2026-10-02'),(3,2,300,'2026-10-03'),(4,3,80,'2026-10-04'),(5,4,120,'2026-10-05'),(6,5,200,'2026-10-06'),(7,2,30,'2026-10-07'),(8,1,70,'2026-10-08')")
db.close()

const TASKS = [
  { id: 'T1', q: '数据库里一共有几张用户表（不含 sqlite_ 内部表）？', type: 'num', expect: 2 },
  { id: 'T2', q: 'users 表一共有多少行？', type: 'num', expect: 5 },
  { id: 'T3', q: '订单总金额最高的用户姓名是什么？', type: 'text', expect: ['bob'] },
  { id: 'T4', q: '金额大于 100 的订单一共有几条？', type: 'num', expect: 3 },
  { id: 'T5', q: '所有订单金额的总和是多少？', type: 'num', expect: 950 },
  { id: 'T6', q: "city 为 Beijing 的用户 id 有哪些？（列出全部）", type: 'set', expect: [2, 4] },
  { id: 'T7', q: 'orders 表有哪些列？按定义顺序列出列名。', type: 'cols', expect: ['id', 'user_id', 'amount', 'created_at'] },
  { id: 'T8', q: '订单金额的平均值是多少？（保留一位小数）', type: 'num', expect: 118.8, tol: 0.06 },
]

function findKey() {
  const home = process.env.USERPROFILE || ''
  const cands = [home + '/.dsh/.env/key.txt', home + '/.dsh/.env']
  for (const p of cands) {
    try {
      const t = readFileSync(p, 'utf8')
      for (const line of t.split(/\r?\n/)) {
        if (line.includes('DEEPSEEK_API_KEY=')) return line.split('DEEPSEEK_API_KEY=')[1].trim()
        if (line.trim().startsWith('sk-')) return line.trim()
      }
    } catch {}
  }
  return process.env.DEEPSEEK_API_KEY
}
const KEY = findKey()
if (!KEY) { console.log('NO_KEY'); process.exit(2) }

const cfg = { connections: [{ name: 'default', engine: 'sqlite', file: DB }], maxRows: 1000, readOnly: false }
const { tools: sqlTools } = buildSqlTools(cfg)
const use = sqlTools.filter(t => ['sql_list', 'sql_query', 'sql_schema'].includes(t.name))
const toolsSchema = use.map(t => ({ type: 'function', function: { name: t.name, description: t.description, parameters: t.parameters } }))

const LOG = OUT + '/calls.jsonl'
function logCall(rec) { appendFileSync(LOG, JSON.stringify(rec) + '\n', 'utf8') }

async function callModel(messages, withTools, seed) {
  const body = { model: 'deepseek-flash', messages, temperature: 0.7, max_tokens: 900, seed }
  if (withTools && toolsSchema.length) body.tools = toolsSchema
  const r = await fetch('https://api.deepseek.com/chat/completions', {
    method: 'POST', headers: { Authorization: 'Bearer ' + KEY, 'Content-Type': 'application/json' }, body: JSON.stringify(body)
  })
  const j = await r.json()
  if (r.status !== 200) throw new Error('HTTP ' + r.status + ' ' + JSON.stringify(j).slice(0, 200))
  const m = j.choices[0].message
  logCall({ model: body.model, seed, withTools, prompt_tokens: j.usage?.prompt_tokens, completion_tokens: j.usage?.completion_tokens, total_tokens: j.usage?.total_tokens })
  return m
}

const SYSTEM_WITH = '你可以使用数据库工具（sql_list / sql_schema / sql_query）查询 SQLite 数据库。必须先用工具查清事实再回答，不要猜。最后一行只写 "ANSWER: <答案>"。'
const SYSTEM_WITHOUT = '你无法访问数据库文件（它是二进制 SQLite，不能直接读取）。只能依据常识作答。最后一行只写 "ANSWER: <答案>"。'

async function runTask(task, withTools, seed) {
  const messages = [
    { role: 'system', content: withTools ? SYSTEM_WITH : SYSTEM_WITHOUT },
    { role: 'user', content: (withTools ? '' : '（提示：数据库在 ' + DB + '，但你没有工具读取它。）\n') + task.q }
  ]
  for (let round = 0; round < 8; round++) {
    const msg = await callModel(messages, withTools, seed)
    messages.push(msg)
    if (!msg.tool_calls || msg.tool_calls.length === 0) break
    for (const call of msg.tool_calls) {
      const tool = use.find(t => t.name === call.function.name)
      let result
      try {
        const args = JSON.parse(call.function.arguments || '{}')
        const out = await tool.execute(args, {})
        result = JSON.stringify(out).slice(0, 3000)
      } catch (e) { result = 'ERROR: ' + String(e).slice(0, 200) }
      messages.push({ role: 'tool', tool_call_id: call.id, content: result })
    }
  }
  const assistants = messages.filter(m => m.role === 'assistant' && m.content)
  const finalText = assistants.length ? assistants[assistants.length - 1].content : ''
  const answer = (finalText.match(/ANSWER:\s*(.+)/i)?.[1] || finalText.split(/\r?\n/).pop() || '').trim()
  return { answer, raw: finalText.slice(0, 500) }
}

function normNum(s) { const m = String(s).replace(/,/g, '').match(/-?\d+(\.\d+)?/g); return m ? m.map(Number) : [] }
function judge(task, answer) {
  const a = String(answer || '').toLowerCase()
  if (task.type === 'num') {
    const nums = normNum(a)
    return nums.some(n => Math.abs(n - task.expect) <= (task.tol || 0.001))
  }
  if (task.type === 'text') return task.expect.some(e => a.includes(e))
  if (task.type === 'set') { const nums = normNum(a); return task.expect.every(e => nums.includes(e)) }
  if (task.type === 'cols') { return task.expect.every(c => a.includes(c)) }
  return false
}

const SEEDS = [101, 202, 303]
const results = []
let calls = 0
for (const task of TASKS) {
  const row = { id: task.id, with: 0, without: 0, samples: [] }
  for (const seed of SEEDS) {
    const w = await runTask(task, true, seed)
    const wo = await runTask(task, false, seed)
    const wOk = judge(task, w.answer), woOk = judge(task, wo.answer)
    row.with += wOk ? 1 : 0
    row.without += woOk ? 1 : 0
    row.samples.push({ seed, with: { answer: w.answer, ok: wOk }, without: { answer: wo.answer, ok: woOk } })
  }
  results.push(row)
  console.log(task.id, 'with', row.with, '/3', '| without', row.without, '/3')
}

function mulberry32(a) { return function () { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296 } }
function bootstrap(diffs, B = 10000, seed = 20261019) {
  const rnd = mulberry32(seed)
  const out = []
  for (let b = 0; b < B; b++) {
    let s = 0
    for (let i = 0; i < diffs.length; i++) s += diffs[Math.floor(rnd() * diffs.length)]
    out.push(s)
  }
  out.sort((x, y) => x - y)
  return { lo: out[Math.floor(B * 0.025)], hi: out[Math.floor(B * 0.975)] }
}

const diffs = results.map(r => r.with - r.without)
const D = diffs.reduce((a, b) => a + b, 0)
const { lo, hi } = bootstrap(diffs)
const a = 12, b = 6
const halfWidth = (hi - lo) / 2
let verdict
if (halfWidth > 6) verdict = '还说不准（精度不足）'
else if (lo > a) verdict = '真有用'
else if (hi < -b) verdict = '帮倒忙'
else if (lo > -b && hi < a) verdict = '没啥差别'
else verdict = '还说不准'

const summary = { model: 'deepseek-flash', temperature: 0.7, seeds: SEEDS, tasks: results.length, perScenario: results, D, ci95: [lo, hi], halfWidth, prereg: { a, b, precision: 6, B: 10000, seed: 20261019 }, verdict }
writeFileSync(OUT + '/result.json', JSON.stringify(summary, null, 2), 'utf8')
console.log('\nD =', D, '| 95% CI =', [lo, hi], '| halfWidth =', halfWidth, '| 判定 =', verdict)
