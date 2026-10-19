
// dsh-cite 标准测评实验 v0.1（预注册见 probes/PREREG_标准测评_v0.1.md）
import { readFileSync, writeFileSync, appendFileSync, mkdirSync } from 'node:fs'

const NL = String.fromCharCode(10)
const ROOT = 'D:/natnat/lingshu/测试/dsh-cite/raw/60-eval'
mkdirSync(ROOT, { recursive: true })

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

const PLUGIN = 'file:///D:/natnat/lingshu/外部插件/dsh-cite/dsh-cite-master/lib/index.js'
const MODEL = 'deepseek-flash', TEMP = 0.7, SEEDS = [101, 202, 303], MAX_ROUNDS = 6, MAX_TOKENS = 2048
const LOG = ROOT + '/calls.jsonl'

const DOI = '10.1038/nature12345'
const META = [
  '作者: VASWANI, Ashish; SHAZEER, Noam; PARMAR, Niki',
  '标题: Attention is all you need',
  '期刊/会议: Advances in Neural Information Processing Systems',
  '年份: 2017；卷: 30；期: 1；页码: 5998-6008',
  'DOI: ' + DOI,
].join(NL)

const SCENES = [
  { id: 'S1', task: '把 DOI ' + DOI + ' 按 GB/T 7714 格式生成参考文献条目。', expect: (a) => /\[J\]/.test(a) },
  { id: 'S2', task: '把 DOI ' + DOI + ' 按 APA 格式生成参考文献条目。', expect: (a) => /\(20\d{2}\)/.test(a) },
  { id: 'S3', task: '把 DOI ' + DOI + ' 按 MLA 格式生成参考文献条目。', expect: (a) => /vol\./i.test(a) || /"[^"]+"/.test(a) },
  { id: 'S4', task: '把 DOI ' + DOI + ' 按 Chicago 格式生成参考文献条目。', expect: (a) => /no\.\s*\d/i.test(a) },
  { id: 'S5', task: '用题录检索找到论文 Attention is all you need 的 DOI。', expect: (a) => a.includes(DOI) || /attention is all you need/i.test(a) },
  { id: 'S6', task: '为 DOI ' + DOI + ' 生成 BibTeX 条目。', expect: (a) => /@\w+\{/.test(a) },
  { id: 'S7', task: '批量：为 ' + DOI + ' 和 10.1126/science.169.3946.1079 生成两条参考文献。', expect: (a) => (a.match(/DOI|doi/g) || []).length >= 2 || (a.match(/\[J\]/g) || []).length >= 2 },
  { id: 'S8', task: '查询并格式化 DOI 10.9999/invalid-xyz 的文献。', expect: (a) => /错误|未找到|失败|invalid|not found|error/i.test(a) },
]

function extractAnswer(text) {
  const m = String(text || '').match(/ANSWER:([\s\S]*)/i)
  if (m) return m[1].trim().slice(0, 500)
  const lines = String(text || '').split(NL).filter(l => l.trim() !== '')
  return lines.length ? lines.slice(-3).join(NL).trim() : ''
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

async function runWith(sc, seed) {
  const m = await import(PLUGIN)
  const tools = []
  const ctx = { tools: { register: (d) => { tools.push(d); return () => {} } }, on: () => () => {}, inject: () => {} }
  m.apply(ctx, {})
  const schema = tools.map(t => ({ type: 'function', function: { name: t.name, description: t.description, parameters: t.parameters } }))
  const byName = Object.fromEntries(tools.map(t => [t.name, t]))
  const messages = [
    { role: 'system', content: '你可以使用 dsh-cite 的 6 个工具（cite_lookup / cite_format / cite_bibtex / cite_check / cite_health / cite_batch）。必须实际调用工具完成任务，最后一行只写 "ANSWER: <结果或一句话>"。' },
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
        const out = await byName[c.function.name].execute(args, {})
        result = JSON.stringify(out).slice(0, 5000)
      } catch (e) { result = 'ERROR: ' + String(e).slice(0, 300) }
      messages.push({ role: 'tool', tool_call_id: c.id, content: result })
    }
  }
  const ans = extractAnswer(lastText)
  return { ok: sc.expect(ans), answer: ans.slice(0, 300) }
}

async function runWithout(sc, seed) {
  const messages = [
    { role: 'system', content: '你没有文献工具，只能依据给出的元数据自行排版。最后一行只写 "ANSWER: <引文条目或结果>"。' },
    { role: 'user', content: '文献元数据：' + NL + META + NL + NL + '任务：' + sc.task },
  ]
  let msg
  try { msg = (await callModel(messages, null, seed)).message } catch (e) { return { ok: false, error: String(e).slice(0, 200) } }
  const ans = extractAnswer(msg.content)
  return { ok: sc.expect(ans), answer: ans.slice(0, 300) }
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
