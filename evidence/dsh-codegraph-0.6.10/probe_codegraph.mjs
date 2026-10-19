// @hyzyn/dsh-codegraph 独立探针：工具分桶 / 采纳率 / 索引定位 / CLI 参数 / 配置默认
// 运行：<node> probes/probe_codegraph.mjs
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const m = await import('file:///D:/natnat/lingshu/外部插件/hyzyn-dsh-kit-settings/dsh-plugin-kit-main/packages/codegraph/lib/index.js')
const results = []
const ok = (name, cond, detail = '') => results.push({ name, pass: !!cond, detail })

// 1. 工具分桶
ok('mcp__codegraph__search → codegraph', m.bucketToolCall('mcp__codegraph__search') === 'codegraph', m.bucketToolCall('mcp__codegraph__search'))
ok('grep → file', m.bucketToolCall('grep') === 'file', m.bucketToolCall('grep'))
ok('read_image → other（非探索优先）', m.bucketToolCall('read_image') === 'other', m.bucketToolCall('read_image'))
ok('web_search → other', m.bucketToolCall('web_search') === 'other', m.bucketToolCall('web_search'))
ok('write_file → other', m.bucketToolCall('write_file') === 'other', m.bucketToolCall('write_file'))
ok('空字符串 → other', m.bucketToolCall('') === 'other', m.bucketToolCall(''))

// 2. 累加
let table = new Map()
table = m.foldToolCall(table, 'mcp__codegraph__search', 'p1')
table = m.foldToolCall(table, 'grep', 'p1')
table = m.foldToolCall(table, 'grep', 'p1')
const c = table.get('p1')
ok('foldToolCall 累加（codegraph=1 file=2 discovery=2）', c.codegraph === 1 && c.file === 2 && c.discovery === 2, JSON.stringify(c))

// 3. 采纳率
const s = m.summarizeAdoption('p1', { codegraph: 1, file: 3, discovery: 2, other: 0 }, true)
ok('summarizeAdoption rate=0.25', s.rate === 0.25, JSON.stringify({ rate: s.rate, exploratory: s.exploratory }))
const s0 = m.summarizeAdoption('p1', { codegraph: 0, file: 0, discovery: 0, other: 0 }, false)
ok('summarizeAdoption 分母 0 时 rate 未定义', s0.rate === undefined, String(s0.rate))

// 4. 索引定位
const dirA = mkdtempSync(join(tmpdir(), 'cg-a-'))
mkdirSync(join(dirA, '.codegraph'), { recursive: true })
writeFileSync(join(dirA, '.codegraph', 'index.db'), 'x')
ok('locateIndex 命中 indexed', m.locateIndex(dirA).state === 'indexed' && m.locateIndex(dirA).projectPath === dirA, JSON.stringify(m.locateIndex(dirA)))

const dirB = mkdtempSync(join(tmpdir(), 'cg-b-'))
mkdirSync(join(dirB, '.codegraph'), { recursive: true })
ok('空 .codegraph → not-a-project', m.locateIndex(dirB).state === 'not-a-project', m.locateIndex(dirB).state)

const dirC = mkdtempSync(join(tmpdir(), 'cg-c-'))
ok('无 .codegraph → missing', m.locateIndex(dirC).state === 'missing', m.locateIndex(dirC).state)

const sub = join(dirA, 'src', 'deep')
mkdirSync(sub, { recursive: true })
ok('resolveIndexedRoot 从子目录向上命中根', m.resolveIndexedRoot(sub) === dirA, String(m.resolveIndexedRoot(sub)))

// 5. CLI 参数
ok('syncArgs 用 -- 分隔', JSON.stringify(m.syncArgs('D:/x')) === JSON.stringify(['sync', '--', 'D:/x']), JSON.stringify(m.syncArgs('D:/x')))
ok('indexArgs force 在 -- 之前', JSON.stringify(m.indexArgs('D:/x', true)) === JSON.stringify(['index', '--force', '--', 'D:/x']), JSON.stringify(m.indexArgs('D:/x', true)))
ok('unlockArgs 形状', JSON.stringify(m.unlockArgs('D:/x')) === JSON.stringify(['unlock', '--', 'D:/x']), JSON.stringify(m.unlockArgs('D:/x')))

// 6. 配置默认
const cfg = m.resolveCliConfig(undefined)
ok('resolveCliConfig 默认 command=codegraph / 60s / 600s', cfg.command === 'codegraph' && cfg.cliTimeoutMs === 60000 && cfg.indexTimeoutMs === 600000, JSON.stringify(cfg))
const cfg2 = m.resolveCliConfig({ command: ' cg ', indexForce: true })
ok('resolveCliConfig 去空白与 force 透传', cfg2.command === 'cg' && cfg2.indexForce === true, JSON.stringify(cfg2))

for (const d of [dirA, dirB, dirC]) rmSync(d, { recursive: true, force: true })
const failed = results.filter(r => !r.pass)
console.log(JSON.stringify({ total: results.length, failed: failed.length, results }, null, 1))
process.exit(failed.length ? 1 : 0)
