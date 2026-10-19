// dsh-flakefinder 标准测评：多轮报告 → flaky 判定
// 预注册：8 场景 × 3 seed × 2 组；D∈[-24,24]；a=12,b=6；B=10000 seed=20261019；半宽≤6
import { aggregate, flakyTests } from 'file:///D:/natnat/lingshu/外部插件/dsh-flakefinder/dsh-flakefinder-master/lib/classify.js'
import { readFileSync, writeFileSync, appendFileSync, mkdirSync } from 'node:fs'
const OUT = 'D:/natnat/lingshu/测试/dsh-flakefinder/raw/12-eval'; mkdirSync(OUT, { recursive: true })
function findKey() { const h = process.env.USERPROFILE || ''; for (const p of [h + '/.dsh/.env/key.txt', h + '/.dsh/.env']) { try { const t = readFileSync(p, 'utf8'); for (const l of t.split(/\r?\n/)) { if (l.includes('DEEPSEEK_API_KEY=')) return l.split('DEEPSEEK_API_KEY=')[1].trim(); if (l.trim().startsWith('sk-')) return l.trim() } } catch {} } return process.env.DEEPSEEK_API_KEY }
const KEY = findKey(); if (!KEY) { console.log('NO_KEY'); process.exit(2) }

const T = (id, name, status) => ({ id: 'f > ' + name, file: 'f', name, status })
function runs(patterns) {
  // patterns: 每个测试在 3 轮中的状态数组
  return patterns.map((p, i) => ({ index: i + 1, durationMs: 5, report: { success: p.every(s => s === 'passed'), passed: p.filter(s => s === 'passed').length, failed: p.filter(s => s === 'failed').length, skipped: 0, tests: p.map((s, j) => T('t' + j, ['alpha', 'beta', 'gamma', 'delta'][j], s)) } }))
}
const scenarios = [
  { id: 'S1', p: [['passed','passed','passed'],['passed','passed','failed']], q: '哪些测试不稳定（flaky）？', exp: ['beta'] },
  { id: 'S2', p: [['passed','failed','passed'],['failed','passed','passed']], q: '哪些测试不稳定？', exp: ['alpha','beta'] },
  { id: 'S3', p: [['failed','failed','failed'],['failed','failed','failed']], q: '有没有 flaky 测试？', exp: [] },
  { id: 'S4', p: [['passed','passed','passed'],['passed','passed','passed']], q: '有没有 flaky 测试？', exp: [] },
  { id: 'S5', p: [['passed','failed','skipped'],['passed','passed','passed']], q: '哪些测试不稳定？', exp: ['alpha'] },
  { id: 'S6', p: [['passed','passed','failed'],['failed','passed','passed'],['passed','passed','passed']], q: '哪些测试不稳定？', exp: ['gamma','alpha'] },
  { id: 'S7', p: [['failed','passed','passed'],['passed','failed','passed']], q: '哪些测试不稳定？', exp: ['alpha','beta'] },
  { id: 'S8', p: [['skipped','passed','passed'],['passed','passed','passed']], q: '哪些测试不稳定？', exp: [] },
]
const tools = [
  { name: 'flake_aggregate', description: '聚合多轮报告', parameters: { type: 'object', properties: { runs: { type: 'array' } }, required: ['runs'] }, exec: (a) => JSON.stringify(aggregate(a.runs)) },
  { name: 'flake_flaky', description: '提取 flaky 用例', parameters: { type: 'object', properties: { result: { type: 'object' } }, required: ['result'] }, exec: (a) => JSON.stringify(flakyTests(a.result)) },
]
const schema = tools.map(t => ({ type: 'function', function: { name: t.name, description: t.description, parameters: t.parameters } }))
async function call(messages, withTools, seed) {
  const body = { model: 'deepseek-flash', messages, temperature: 0.7, max_tokens: 600, seed }
  if (withTools) body.tools = schema
  const r = await fetch('https://api.deepseek.com/chat/completions', { method: 'POST', headers: { Authorization: 'Bearer ' + KEY, 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
  const j = await r.json(); if (r.status !== 200) throw new Error('HTTP ' + r.status)
  appendFileSync(OUT + '/calls.jsonl', JSON.stringify({ seed, withTools, total: j.usage?.total_tokens }) + '\n')
  return j.choices[0].message
}
function judge(ans, exp) { const s = String(ans).toLowerCase(); const names = ['alpha','beta','gamma','delta'].filter(n => s.includes(n)); return names.length === exp.length && exp.every(e => names.includes(e)) }
async function run(sc, withTools, seed) {
  state = null
  const data = JSON.stringify(runs(sc.p), null, 1)
  const sys = withTools ? '你可以用 flake_aggregate / flake_flaky 工具分析多轮报告。最后一行写 "ANSWER: <逗号分隔的 flaky 用例名，无则 NONE>"。' : '你只能依据多轮报告文本推断。最后一行写 "ANSWER: <逗号分隔的 flaky 用例名，无则 NONE>"。'
  const messages = [{ role: 'system', content: sys }, { role: 'user', content: (withTools ? '' : '多轮报告：\n' + data + '\n') + sc.q }]
  for (let round = 0; round < 6; round++) {
    const m = await call(messages, withTools, seed); messages.push(m)
    if (!m.tool_calls || m.tool_calls.length === 0) break
    for (const c of m.tool_calls) {
      const t = tools.find(x => x.name === c.function.name); let out
      try { out = t ? String(t.exec(JSON.parse(c.function.arguments || '{}'))) : 'NO_TOOL' } catch (e) { out = 'ERROR' }
      messages.push({ role: 'tool', tool_call_id: c.id, content: out })
    }
  }
  const txt = messages.filter(m => m.role === 'assistant' && m.content).pop()?.content || ''
  return (txt.match(/ANSWER:\s*(.+)/i)?.[1] || txt.split(/\r?\n/).pop() || '').trim()
}
let state = null
const seeds = [101, 202, 303]; const rows = []
for (const sc of scenarios) {
  let w = 0, wo = 0
  for (const seed of seeds) {
    const a1 = await run(sc, true, seed); if (judge(a1, sc.exp)) w++
    const a2 = await run(sc, false, seed); if (judge(a2, sc.exp)) wo++
  }
  rows.push({ id: sc.id, with: w, without: wo }); console.log(sc.id, 'with', w, '/3 | without', wo, '/3')
}
function m32(a){return function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
const diffs = rows.map(r => r.with - r.without), D = diffs.reduce((a,b)=>a+b,0)
const rnd = m32(20261019), bs = []
for (let b = 0; b < 10000; b++) { let s = 0; for (let i = 0; i < diffs.length; i++) s += diffs[Math.floor(rnd()*diffs.length)]; bs.push(s) }
bs.sort((x,y)=>x-y); const lo = bs[250], hi = bs[9750], half = (hi-lo)/2
const a = 12, b6 = 6
const verdict = half > 6 ? '还说不准（精度不足）' : lo > a ? '真有用' : hi < -b6 ? '帮倒忙' : (lo > -b6 && hi < a) ? '没啥差别' : '还说不准'
writeFileSync(OUT + '/result.json', JSON.stringify({ perScenario: rows, D, ci95: [lo,hi], halfWidth: half, verdict }, null, 2))
console.log('\nD =', D, '| CI =', [lo,hi], '| half =', half, '| 判定 =', verdict)
