// dsh-ppt 标准测评实验 v0.1（预注册见 probes/PREREG_标准测评_v0.1.md，跑前冻结）
// 装组：dsh-ppt 真实 7 工具；不装组：无工具。8 场景 × 3 seed × 2 组；D∈[-24,24]；a=12,b=6；半宽≤6；B=10000,seed=20261019
import { readFileSync, writeFileSync, appendFileSync, mkdirSync, rmSync, readdirSync, statSync, existsSync } from 'node:fs'
import { join } from 'node:path'

const ROOT = 'D:/natnat/lingshu/测试/dsh-ppt/raw/12-eval'
const RUNS = ROOT + '/runs'

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
const KEY = findKey()
if (!KEY) { console.log('NO_KEY'); process.exit(2) }

const MOD = await import('file:///D:/natnat/lingshu/外部插件/dsh-ppt/dsh-ppt-master/lib/tools.js')
const CFG = await import('file:///D:/natnat/lingshu/外部插件/dsh-ppt/dsh-ppt-master/lib/config.js')

const MODEL = 'deepseek-flash', TEMP = 0.7, SEEDS = [101, 202, 303], MAX_ROUNDS = 12, MAX_TOKENS = 4096
const LOG = ROOT + '/calls.jsonl'
mkdirSync(ROOT, { recursive: true })
mkdirSync(RUNS, { recursive: true })

const T6_MATERIAL = [
  '# 2026 年第三季度研发复盘',
  '## 1 目标回顾', '- 交付 3 个版本', '- 事故数下降 30%',
  '## 2 关键结果', '- 版本按时率 92%', '- 平均恢复时间 18 分钟',
  '## 3 资源投入', '- 人力 5.5 人月', '- 测试环境 2 套',
  '## 4 主要问题', '- 联调排队', '- 依赖升级滞后',
  '## 5 改进措施', '- 引入预发环境', '- 依赖bot',
  '## 6 下季计划', '- 交付 4 个版本', '- 灰度发布',
  '## 7 风险', '- 上游接口变更', '- 人力缺口',
  '## 8 需要的支持', '- 采购 GPU 机器', '- 增加 1 名测试',
  '## 9 数据看板', '- 缺陷密度 0.8/千行', '- 覆盖率 76%',
  '## 10 团队建设', '- 技术分享 4 次', '- 新人 onboarding 2 人',
  '## 11 客户反馈', '- NPS 41', '- 重点诉求：导出',
  '## 12 结论与行动', '- 保持节奏', '- 9 月 30 日前完成预发上线',
].join('\n')

const TASKS = [
  {
    id: 'T1',
    prompt: '请生成一份演示文稿：主题是「2026 年第三季度复盘」。第一页是封面（标题含「季度复盘」），第二页是目录页（layout 用 section，标题「目录」），再至少一页正文（内容自拟）。',
    judge: d => !!d && d.slideCount >= 3 && d.slides?.[0]?.layout === 'cover' && /季度复盘/.test(d.slides[0].title || '') && (d.slides || []).some(s => s.layout === 'section' && /目录/.test(s.title || '')),
  },
  {
    id: 'T2',
    prompt: '做一份演示：必须包含三页正文，页标题分别是「问题」「方案」「收益」，每页至少 2 条要点。其余页（封面/结束页）自定。',
    judge: d => {
      if (!d || !Array.isArray(d.slides)) return false
      const need = ['问题', '方案', '收益']
      return need.every(n => d.slides.some(s => (s.title || '').includes(n) && Array.isArray(s.bullets) && s.bullets.length >= 2))
    },
  },
  {
    id: 'T3',
    prompt: '做一份演示，其中一页是柱状图页（layout=chart）比较 Q1–Q4 销售额：今年 120/98/145/160（万元），去年 100/110/130/150（万元），两条系列分别名为「去年」「今年」。另加封面页与结束页。',
    judge: d => {
      if (!d || !Array.isArray(d.slides)) return false
      const s = d.slides.find(x => x.chart && Array.isArray(x.chart.series))
      if (!s) return false
      const c = s.chart
      const eq = (a, b) => Array.isArray(a) && a.length === b.length && a.every((v, i) => Math.abs(Number(v) - b[i]) < 0.01)
      return c.kind === 'column' && JSON.stringify(c.categories.map(String)) === JSON.stringify(['Q1', 'Q2', 'Q3', 'Q4']) && c.series.length === 2 && eq(c.series[0].values, [100, 110, 130, 150]) && eq(c.series[1].values, [120, 98, 145, 160])
    },
  },
  {
    id: 'T4',
    prompt: '做一份演示，其中一页是表格页（layout=table），表头三列依次是「指标」「目标」「实际」，并填写 8 行数据（数值自拟，必须完整）。',
    judge: d => {
      if (!d || !Array.isArray(d.slides)) return false
      const s = d.slides.find(x => x.layout === 'table' && Array.isArray(x.rows))
      if (!s) return false
      return JSON.stringify(s.rows[0].map(String)) === JSON.stringify(['指标', '目标', '实际']) && s.rows.length === 9
    },
  },
  {
    id: 'T5',
    prompt: '请用 velvet 主题做 4 页演示：封面 + 3 页正文（标题自拟，每页至少 2 条要点）。',
    judge: d => !!d && d.theme === 'velvet' && d.slideCount >= 4 && (d.slides || []).filter(s => s.layout === 'bullets').length >= 3 && (!d.quality || d.quality.errorCount === 0),
  },
  {
    id: 'T6',
    maxSlides: 6,
    prompt: '用下面这份材料做一份演示，要求成品不超过 6 页（保留封面）：\n\n' + T6_MATERIAL,
    judge: d => !!d && d.slideCount >= 3 && d.slideCount <= 6 && d.slides?.[0]?.layout === 'cover' && (!d.quality || d.quality.errorCount === 0),
  },
  {
    id: 'T7',
    prompt: '先做一份 3 页演示，第 2 页标题必须是「背景」。然后把第 2 页的标题改成「关键结论」，最后调用检查工具确认一次。',
    judge: d => !!d && d.slides?.[1]?.title === '关键结论' && d.revision === 1 && Array.isArray(d.history) && d.history.length === 1,
  },
  {
    id: 'T8',
    prompt: '先做一份 3 页演示，第 2 页标题必须是「背景」；然后把第 2 页标题改成「临时修改」；再撤销这次修改。撤销后第 2 页标题应恢复为「背景」。',
    judge: d => !!d && d.slides?.[1]?.title === '背景' && d.revision === 2 && Array.isArray(d.history) && d.history.length === 0,
  },
]

function logCall(rec) { appendFileSync(LOG, JSON.stringify(rec) + '\n', 'utf8') }

async function callModel(messages, toolsSchema, seed) {
  const body = { model: MODEL, messages, temperature: TEMP, max_tokens: MAX_TOKENS, seed }
  if (toolsSchema && toolsSchema.length) body.tools = toolsSchema
  const r = await fetch('https://api.deepseek.com/chat/completions', {
    method: 'POST', headers: { Authorization: 'Bearer ' + KEY, 'Content-Type': 'application/json' }, body: JSON.stringify(body),
  })
  const j = await r.json()
  if (r.status !== 200) throw new Error('HTTP ' + r.status + ' ' + JSON.stringify(j).slice(0, 300))
  const choice = j.choices[0]
  logCall({ ts: new Date().toISOString(), model: MODEL, temperature: TEMP, seed, finish: choice.finish_reason, prompt_tokens: j.usage?.prompt_tokens, completion_tokens: j.usage?.completion_tokens, total_tokens: j.usage?.total_tokens })
  return { message: choice.message, finish: choice.finish_reason }
}

function latestDeck(dir) {
  try {
    const files = readdirSync(dir).filter(f => f.endsWith('.json')).map(f => join(dir, f))
    if (files.length === 0) return null
    files.sort((a, b) => statSync(b).mtimeMs - statSync(a).mtimeMs)
    return JSON.parse(readFileSync(files[0], 'utf8'))
  } catch { return null }
}

async function runWithTools(task, seed) {
  const outDir = RUNS + '/' + task.id + '-' + seed
  rmSync(outDir, { recursive: true, force: true })
  mkdirSync(outDir, { recursive: true })
  let tools
  try {
    tools = MOD.buildPptTools(CFG.resolvePptConfig({ outputDir: outDir, maxSlides: task.maxSlides || 60 }))
  } catch (e) { return { ok: false, error: 'build tools: ' + String(e) } }
  const schema = tools.map(t => ({ type: 'function', function: { name: t.name, description: t.description, parameters: t.parameters } }))
  const byName = Object.fromEntries(tools.map(t => [t.name, t]))
  const messages = [
    { role: 'system', content: '你可以使用 dsh-ppt 的 7 个工具生成与编辑演示文稿（ppt_themes / ppt_create / ppt_templates / ppt_edit / ppt_undo / ppt_check / ppt_render）。输出目录已由环境配置好，调用 ppt_create 时不要传 outputDir 参数；deckPath 用 ppt_create 返回的 jsonPath。必须实际调用工具产出文件，不要只用文字描述。全部完成后，最后一行写 "ANSWER: <一句话总结>"。' },
    { role: 'user', content: task.prompt },
  ]
  let lastText = ''
  const finishes = []
  for (let round = 0; round < MAX_ROUNDS; round++) {
    let msg, finish
    for (let attempt = 0; attempt < 2; attempt++) {
      const res = await callModel(messages, schema, seed)
      msg = res.message
      finish = res.finish
      if ((msg.content || '') !== '' || (msg.tool_calls || []).length > 0) break
    }
    finishes.push(finish)
    if (msg.content) lastText = msg.content
    if (finish === 'length') break
    messages.push(msg)
    const calls = msg.tool_calls || []
    if (calls.length === 0) break
    for (const c of calls) {
      const tool = byName[c.function?.name]
      let result
      try {
        const args = JSON.parse(c.function?.arguments || '{}')
        const out = await tool.execute(args, {})
        result = JSON.stringify(out).slice(0, 4000)
      } catch (e) { result = 'ERROR: ' + String(e).slice(0, 300) }
      messages.push({ role: 'tool', tool_call_id: c.id, content: result })
    }
  }
  const deck = latestDeck(outDir)
  return { ok: task.judge(deck), deck: deck ? { title: deck.title, theme: deck.theme, slideCount: deck.slideCount, revision: deck.revision, history: (deck.history || []).length, slides: (deck.slides || []).map(s => ({ l: s.layout, t: s.title })) } : null, finishes, lastText: (lastText || '').slice(0, 300) }
}

async function runWithoutTools(task, seed) {
  const outDir = RUNS + '/' + task.id + '-' + seed + '-wo'
  rmSync(outDir, { recursive: true, force: true })
  mkdirSync(outDir, { recursive: true })
  const messages = [
    { role: 'system', content: '你没有任何文件系统或演示文稿工具，无法生成、保存任何文件。只能输出文本。若任务要求产出文件，请在最后一行写 "ANSWER: 无法生成"。' },
    { role: 'user', content: task.prompt },
  ]
  const res = await callModel(messages, null, seed)
  const msg = res.message
  const deck = latestDeck(outDir)
  return { ok: task.judge(deck), finish: res.finish, lastText: (msg.content || '').slice(0, 300) }
}

function m32(a) { return function () { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296 } }
function bootstrap(diffs, B = 10000, seed = 20261019) {
  const rnd = m32(seed), out = []
  for (let b = 0; b < B; b++) { let s = 0; for (let i = 0; i < diffs.length; i++) s += diffs[Math.floor(rnd() * diffs.length)]; out.push(s) }
  out.sort((x, y) => x - y)
  return { lo: out[Math.floor(B * 0.025)], hi: out[Math.floor(B * 0.975)] }
}

const rows = []
for (const task of TASKS) {
  const row = { id: task.id, with: 0, without: 0, samples: [] }
  for (const seed of SEEDS) {
    const w = await runWithTools(task, seed)
    const wo = await runWithoutTools(task, seed)
    row.with += w.ok ? 1 : 0
    row.without += wo.ok ? 1 : 0
    row.samples.push({ seed, with: { ok: w.ok, deck: w.deck, error: w.error, finishes: w.finishes }, without: { ok: wo.ok, finish: wo.finish, text: wo.lastText } })
    console.log(task.id, 'seed', seed, 'with', w.ok, '| without', wo.ok)
  }
  rows.push(row)
  console.log('==', task.id, 'with', row.with, '/3 | without', row.without, '/3')
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
