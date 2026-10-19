// dsh-flakefinder 独立探针：聚合三态 / 崩溃合成 / 三种报告解析 / 框架检测 / 配置默认
// 运行：<node> probes/probe_dsh_flakefinder.mjs
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const base = 'file:///D:/natnat/lingshu/外部插件/dsh-flakefinder/dsh-flakefinder-master/lib/'
const { aggregate, flakyTests } = await import(base + 'classify.js')
const { parseJsonReport, parseTapReport, parseJunitReport } = await import(base + 'parse.js')
const { detectFramework, buildPlan } = await import(base + 'args.js')
const { resolveConfig } = await import(base + 'config.js')

const results = []
const ok = (name, cond, detail = '') => results.push({ name, pass: !!cond, detail })
const run = (index, tests, success) => ({ index, durationMs: 10, report: { success, passed: tests.filter(t => t.status === 'passed').length, failed: tests.filter(t => t.status === 'failed').length, skipped: 0, tests } })

// 1-3. 聚合三态
const passRuns = [run(1, [{ id: 'a', file: 'f', name: 'a', status: 'passed' }], true), run(2, [{ id: 'a', file: 'f', name: 'a', status: 'passed' }], true)]
const agg1 = aggregate(passRuns)
ok('aggregate: 两轮全过 → stable-pass', agg1.verdict === 'stable-pass' && agg1.stablePassCount === 1, JSON.stringify({ v: agg1.verdict, n: agg1.stablePassCount }))

const flakyRuns = [run(1, [{ id: 'a', file: 'f', name: 'a', status: 'passed' }], true), run(2, [{ id: 'a', file: 'f', name: 'a', status: 'failed' }], false)]
const agg2 = aggregate(flakyRuns)
ok('aggregate: 一过一挂 → flaky 且 failureRate 50', agg2.verdict === 'flaky' && agg2.tests[0].verdict === 'flaky' && agg2.tests[0].failureRate === 50, JSON.stringify(agg2.tests[0]))
ok('flakyTests 提取到 1 条', flakyTests({ tests: agg2.tests }).length === 1, JSON.stringify(flakyTests({ tests: agg2.tests })))

const failRuns = [run(1, [{ id: 'a', file: 'f', name: 'a', status: 'failed' }], false)]
const agg3 = aggregate(failRuns)
ok('aggregate: 全挂 → stable-fail', agg3.verdict === 'stable-fail' && agg3.stableFailCount === 1, JSON.stringify({ v: agg3.verdict }))

// 4. 崩溃 run 合成记录
const crashRuns = [...passRuns, { index: 3, durationMs: 5, report: null, error: 'segfault' }]
const agg4 = aggregate(crashRuns)
ok('崩溃 run 合成 (crash) 记录且 verdict=flaky', agg4.verdict === 'flaky' && agg4.tests.some(t => t.id === '(crash)'), JSON.stringify({ v: agg4.verdict, ids: agg4.tests.map(t => t.id) }))

// 5. 空运行抛错
let emptyThrew = false
try { aggregate([{ index: 1, durationMs: 1, report: null, error: 'x' }]) } catch { emptyThrew = true }
ok('无报告时 aggregate 抛错', emptyThrew)

// 6. JSON 报告（jest/vitest 结构）
const jsonText = JSON.stringify({ success: false, numTotalTests: 2, numPassedTests: 1, numFailedTests: 1, testResults: [{ name: '/p/a.test.js', assertionResults: [
  { fullName: 'suite > ok case', status: 'passed', duration: 3 },
  { fullName: 'suite > bad case', status: 'failed', duration: 4 }
] }] })
const jr = parseJsonReport(jsonText, 'vitest')
ok('parseJsonReport: 2 用例 1 过 1 挂', jr.tests.length === 2 && jr.passed === 1 && jr.failed === 1, JSON.stringify({ t: jr.tests.length, p: jr.passed, f: jr.failed }))
let badJson = false
try { parseJsonReport('{oops', 'jest') } catch { badJson = true }
ok('parseJsonReport: 非法 JSON 抛错', badJson)

// 7. TAP 报告
const tap = 'TAP version 13\nok 1 - first case\nnot ok 2 - second case\nok 3 - third case # SKIP\n1..3\n'
const tr = parseTapReport(tap)
ok('parseTapReport: 3 用例（2 过 1 挂）', tr.tests.length === 3 && tr.failed >= 1, JSON.stringify(tr.tests.map(t => [t.name, t.status])))

// 8. JUnit 报告
const junit = '<?xml version="1.0"?><testsuite tests="2" failures="1" skipped="0"><testcase classname="C" name="good"/><testcase classname="C" name="bad"><failure message="boom"/></testcase></testsuite>'
const ur = parseJunitReport(junit)
ok('parseJunitReport: 2 用例含 failure', ur.tests.length === 2 && ur.failed >= 1, JSON.stringify(ur.tests.map(t => [t.name, t.status])))

// 9. 框架检测（契约：按 node_modules 本地入口 / pytest 配置文件探测）
const dirV = mkdtempSync(join(tmpdir(), 'flake-v-'))
mkdirSync(join(dirV, 'node_modules', 'vitest'), { recursive: true })
writeFileSync(join(dirV, 'node_modules', 'vitest', 'vitest.mjs'), '// stub\n')
const fwV = detectFramework(dirV, 'auto')
ok('detectFramework 按本地入口识别 vitest', fwV === 'vitest', JSON.stringify(fwV))
const dirP = mkdtempSync(join(tmpdir(), 'flake-p-'))
writeFileSync(join(dirP, 'pytest.ini'), '[pytest]\n')
const fwP = detectFramework(dirP, 'auto')
ok('detectFramework 识别 pytest 配置', fwP === 'pytest', JSON.stringify(fwP))
const dirN = mkdtempSync(join(tmpdir(), 'flake-n-'))
const fwN = detectFramework(dirN, 'auto')
ok('无框架时回退 node:test', fwN === 'node', JSON.stringify(fwN))
const plan = buildPlan(dirP, 'tests', 'pytest', 1, 'python')
ok('buildPlan(pytest) 生成 junit 报告参数', plan.framework === 'pytest' && plan.reportKind === 'junit' && plan.argv.includes('-m') && plan.argv.some(a => String(a).startsWith('--junitxml=')), JSON.stringify(plan).slice(0, 240))

// 10. 配置默认（契约字段：defaultRuns / maxRuns / timeoutMs）
const cfg = resolveConfig({}, dirP)
ok('resolveConfig 默认 defaultRuns=5 且 maxRuns=20', cfg.defaultRuns === 5 && cfg.maxRuns === 20, JSON.stringify({ d: cfg.defaultRuns, m: cfg.maxRuns }))
ok('resolveConfig 默认 dataDir 落在 .dsh 下', String(cfg.dataDir).includes('.dsh'), String(cfg.dataDir))

for (const d0 of [dirV, dirP, dirN]) rmSync(d0, { recursive: true, force: true })
const failed = results.filter(r => !r.pass)
console.log(JSON.stringify({ total: results.length, failed: failed.length, results }, null, 1))
process.exit(failed.length ? 1 : 0)
