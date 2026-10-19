// dsh-rss 标准测评：订阅状态任务（装=插件工具 / 不装=裸模型）
// 预注册：8 场景 × 3 seed × 2 组；D=Σ(装正确-不装正确) ∈ [-24,24]；a=12,b=6；bootstrap B=10000 seed=20261019；半宽≤6
import { addFeed, removeFeed, parseFeedsYaml, serializeFeeds, findFeedsByName } from 'file:///D:/natnat/lingshu/外部插件/dsh-rss/dsh-rss-master/lib/feeds.js'
import { parseOpml, importOpmlFeeds } from 'file:///D:/natnat/lingshu/外部插件/dsh-rss/dsh-rss-master/lib/opml.js'
import { readFileSync, writeFileSync, appendFileSync, mkdirSync } from 'node:fs'

const OUT = 'D:/natnat/lingshu/测试/dsh-rss/raw/12-eval'
mkdirSync(OUT, { recursive: true })
const LOG = OUT + '/calls.jsonl'
function findKey() {
  const home = process.env.USERPROFILE || ''
  for (const p of [home + '/.dsh/.env/key.txt', home + '/.dsh/.env']) {
    try { const t = readFileSync(p, 'utf8'); for (const l of t.split(/\r?\n/)) { if (l.includes('DEEPSEEK_API_KEY=')) return l.split('DEEPSEEK_API_KEY=')[1].trim(); if (l.trim().startsWith('sk-')) return l.trim() } } catch {}
  }
  return process.env.DEEPSEEK_API_KEY
}
const KEY = findKey(); if (!KEY) { console.log('NO_KEY'); process.exit(2) }

const OPML = '<?xml version="1.0"?><opml version="2.0"><body><outline text="Tech"><outline type="rss" text="A" xmlUrl="https://a.example/feed"/></outline><outline type="rss" text="B" xmlUrl="https://b.example/feed"/><outline type="rss" text="Bad" xmlUrl="ftp://bad/feed"/></body></opml>'

const scenarios = [
  { id: 'S1', prompt: '添加订阅：https://a.example/feed 名称 A；https://b.example/feed 名称 B；https://c.example/feed 名称 C。完成后回答订阅总数。', check: st => st.length === 3 },
  { id: 'S2', prompt: '添加 https://A.Example/feed（名称 A），再添加 https://a.example/feed（名称 A2）。完成后回答订阅总数（应按 URL 归一去重）。', check: st => st.length === 1 },
  { id: 'S3', prompt: '添加 https://a.example/feed 名称 A 分类 Tech。完成后回答该订阅的 category。', check: st => st.length === 1 && st[0].category === 'Tech' },
  { id: 'S4', prompt: '用 import 工具导入这份 OPML（含 2 条 http(s) 与 1 条 ftp）：' + OPML + '\n完成后回答成功导入条数。', check: st => st.length === 2 },
  { id: 'S5', prompt: '添加 https://a.example/feed（A）与 https://b.example/feed（B），然后删除 A。完成后回答剩余条数。', check: st => st.length === 1 && st[0].url.includes('b.example') },
  { id: 'S6', prompt: '添加 https://a.example/feed 名称 A 与 https://b.example/feed 名称 A（同名）。完成后回答名称为 A 的订阅条数。', check: st => findFeedsByName(st, 'A').length === 2 },
  { id: 'S7', prompt: '添加 https://a.example/feed 与 https://a.example/feed/（尾部斜杠不同）。完成后回答订阅条数。', check: st => st.length === 2 },
  { id: 'S8', prompt: '添加 https://a.example/feed（A）与 https://b.example/feed（B），导出 YAML 后再导入。完成后回答最终条数。', check: st => st.length === 2 },
]

// 工具（装组）
let state = []
const tools = [
  { name: 'rss_add', description: '添加订阅', parameters: { type: 'object', properties: { url: { type: 'string' }, name: { type: 'string' }, category: { type: 'string' } }, required: ['url'] }, exec: (a) => { const r = addFeed(state, a.url, a.name || '', a.category || ''); state = r.feeds; return JSON.stringify(r) } },
  { name: 'rss_remove', description: '删除订阅', parameters: { type: 'object', properties: { url: { type: 'string' }, name: { type: 'string' } }, required: ['url'] }, exec: (a) => { const r = removeFeed(state, a.url, a.name || ''); state = r.feeds; return JSON.stringify(r) } },
  { name: 'rss_list', description: '列出当前订阅', parameters: { type: 'object', properties: {} }, exec: () => JSON.stringify(state) },
  { name: 'rss_import_opml', description: '导入 OPML 文本', parameters: { type: 'object', properties: { text: { type: 'string' } }, required: ['text'] }, exec: (a) => { const doc = parseOpml(a.text); const r = importOpmlFeeds(state, doc); state = r.feeds; return JSON.stringify({ added: r.addedCount, skipped: r.skipped.length }) } },
  { name: 'rss_export_yaml', description: '导出订阅 YAML', parameters: { type: 'object', properties: {} }, exec: () => serializeFeeds(state) },
]
const schema = tools.map(t => ({ type: 'function', function: { name: t.name, description: t.description, parameters: t.parameters } }))

async function call(messages, withTools, seed) {
  const body = { model: 'deepseek-flash', messages, temperature: 0.7, max_tokens: 700, seed }
  if (withTools) body.tools = schema
  const r = await fetch('https://api.deepseek.com/chat/completions', { method: 'POST', headers: { Authorization: 'Bearer ' + KEY, 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
  const j = await r.json()
  if (r.status !== 200) throw new Error('HTTP ' + r.status + ' ' + JSON.stringify(j).slice(0, 160))
  appendFileSync(LOG, JSON.stringify({ seed, withTools, total_tokens: j.usage?.total_tokens }) + '\n')
  return j.choices[0].message
}

async function run(sc, withTools, seed) {
  state = []
  const sys = withTools ? '你可以使用订阅管理工具（rss_add / rss_remove / rss_list / rss_import_opml / rss_export_yaml）。必须用工具完成任务，不要臆造。最后一行写 "ANSWER: <答案>"。'
    : '你没有文件系统或订阅管理工具，只能凭对话推测。最后一行写 "ANSWER: <答案>"。'
  const messages = [{ role: 'system', content: sys }, { role: 'user', content: sc.prompt }]
  for (let round = 0; round < 6; round++) {
    const m = await call(messages, withTools, seed)
    messages.push(m)
    if (!m.tool_calls || m.tool_calls.length === 0) break
    for (const c of m.tool_calls) {
      const t = tools.find(x => x.name === c.function.name)
      let out
      try { out = t ? String(t.exec(JSON.parse(c.function.arguments || '{}'))) : 'NO_TOOL' } catch (e) { out = 'ERROR ' + String(e).slice(0, 120) }
      messages.push({ role: 'tool', tool_call_id: c.id, content: out })
    }
  }
  return { st: state.map(x => ({ ...x })), answer: (messages.filter(m => m.role === 'assistant' && m.content).pop()?.content || '').slice(-200) }
}

const seeds = [101, 202, 303]
const rows = []
for (const sc of scenarios) {
  let w = 0, wo = 0
  for (const seed of seeds) {
    const r1 = await run(sc, true, seed); w += sc.check(r1.st) ? 1 : 0
    const r2 = await run(sc, false, seed); wo += sc.check(r2.st) ? 1 : 0
  }
  rows.push({ id: sc.id, with: w, without: wo })
  console.log(sc.id, 'with', w, '/3 | without', wo, '/3')
}
function mulberry32(a){return function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
const diffs = rows.map(r => r.with - r.without)
const D = diffs.reduce((a, b) => a + b, 0)
const rnd = mulberry32(20261019); const bs = []
for (let b = 0; b < 10000; b++) { let s = 0; for (let i = 0; i < diffs.length; i++) s += diffs[Math.floor(rnd() * diffs.length)]; bs.push(s) }
bs.sort((x, y) => x - y)
const lo = bs[250], hi = bs[9750], half = (hi - lo) / 2
const a = 12, b6 = 6
const verdict = half > 6 ? '还说不准（精度不足）' : lo > a ? '真有用' : hi < -b6 ? '帮倒忙' : (lo > -b6 && hi < a) ? '没啥差别' : '还说不准'
writeFileSync(OUT + '/result.json', JSON.stringify({ perScenario: rows, D, ci95: [lo, hi], halfWidth: half, prereg: { a, b: b6, B: 10000, seed: 20261019 }, verdict }, null, 2))
console.log('\nD =', D, '| CI =', [lo, hi], '| half =', half, '| 判定 =', verdict)
