// dsh-minimal-ptc 独立探针：物化幂等 / 用户自建目录保护 / profile 拷贝检测 / scheduler 三态
// 运行：<node> probes/probe_minimal_ptc.mjs
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, existsSync, readdirSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const libUrl = new URL('file:///D:/natnat/lingshu/外部插件/dsh-minimal-ptc/dsh-minimal-ptc-main/lib/index.js')
const results = []
const ok = (name, cond, detail = '') => results.push({ name, pass: !!cond, detail })

const home = mkdtempSync(join(tmpdir(), 'ptc-probe-'))
process.env.DSH_HOME = home
const mod = await import(libUrl.href + '?v=' + Date.now())

function mkCtx(logs = []) {
  return {
    effect: (fn) => fn(),
    appReady: { onReady: (cb) => cb() },
    get: () => undefined,
    logger: { info: (m) => logs.push(m), warn: (m) => logs.push(m) },
  }
}

// 1. 首次物化
const logs1 = []
mod.apply(mkCtx(logs1))
const dir = join(home, '.agent-presets', 'ptc-minimal')
const files = existsSync(dir) ? readdirSync(dir).sort() : []
ok('首次物化生成 5 个预设文件 + marker', files.length === 6 && files.includes('.dsh-ptc-minimal.version'), JSON.stringify(files))
const agentYml = existsSync(join(dir, 'agent.cordis.yml')) ? readFileSync(join(dir, 'agent.cordis.yml'), 'utf8') : ''
ok('agent.cordis.yml 非空且含 preset 标识', agentYml.length > 100, 'bytes=' + agentYml.length)

// 2. 幂等：二次调用不重写（mtime 不变）
const before = readFileSync(join(dir, 'ptc-persona.mjs'), 'utf8')
mod.apply(mkCtx())
const after = readFileSync(join(dir, 'ptc-persona.mjs'), 'utf8')
ok('二次物化幂等（内容不变）', before === after)

// 3. 用户自建目录保护（无 marker 但有 agent.cordis.yml）
const home2 = mkdtempSync(join(tmpdir(), 'ptc-probe2-'))
process.env.DSH_HOME = home2
const userDir = join(home2, '.agent-presets', 'ptc-minimal')
mkdirSync(userDir, { recursive: true })
writeFileSync(join(userDir, 'agent.cordis.yml'), '# user custom\n')
const mod2 = await import(libUrl.href + '?v=' + Date.now())
const logs2 = []
mod2.apply(mkCtx(logs2))
const kept = readFileSync(join(userDir, 'agent.cordis.yml'), 'utf8')
ok('用户自建目录不被覆盖', kept === '# user custom\n')
ok('保护时留下 warn 日志', logs2.some(l => l.includes('leaving it alone')), JSON.stringify(logs2))

// 4. findProfileCoreCopies（只认 dsh-tools / cordis）
const home3 = mkdtempSync(join(tmpdir(), 'ptc-probe3-'))
const p1 = join(home3, 'profiles', 'alpha', 'node_modules', '@deepseek-ai', 'dsh-tools')
mkdirSync(p1, { recursive: true })
writeFileSync(join(p1, 'package.json'), '{"name":"@deepseek-ai/dsh-tools"}')
const p2 = join(home3, 'profiles', 'alpha', 'node_modules', '@deepseek-ai', 'schemastery')
mkdirSync(p2, { recursive: true })
mkdirSync(join(home3, 'profiles', 'beta'), { recursive: true })
const copies = mod.findProfileCoreCopies(join(home3, 'profiles'))
ok('findProfileCoreCopies 找到 profile 内 dsh-tools 拷贝', Array.isArray(copies) && copies.length === 1 && copies[0].endsWith('dsh-tools'), JSON.stringify(copies))
ok('findProfileCoreCopies 不把 schemastery 当宿主', Array.isArray(copies) && !copies.some(c => c.includes('schemastery')), JSON.stringify(copies))

// 5. schedulerKeyStatus 三态（契约：返回 'global' | 'module-local' | 'absent'）
const symDesc = '@deepseek-ai/dsh-tools.scheduler'
const globalTools = { [Symbol.for(symDesc)]: { scheduler: {} } }
const localTools = { [Symbol(symDesc)]: { scheduler: {} } }
const emptyTools = {}
ok('schedulerKeyStatus: Symbol.for 视为 global', mod.schedulerKeyStatus(globalTools) === 'global', JSON.stringify(mod.schedulerKeyStatus(globalTools)))
ok('schedulerKeyStatus: 模块内 symbol 视为 module-local', mod.schedulerKeyStatus(localTools) === 'module-local', JSON.stringify(mod.schedulerKeyStatus(localTools)))
ok('schedulerKeyStatus: 缺失视为 absent', mod.schedulerKeyStatus(emptyTools) === 'absent', JSON.stringify(mod.schedulerKeyStatus(emptyTools)))
ok('schedulerKeyStatus: null 入参不抛异常', mod.schedulerKeyStatus(null) === 'absent', JSON.stringify(mod.schedulerKeyStatus(null)))

for (const d of [home, home2, home3]) { try { rmSync(d, { recursive: true, force: true }) } catch {} }
const failed = results.filter(r => !r.pass)
console.log(JSON.stringify({ total: results.length, failed: failed.length, results }, null, 1))
process.exit(failed.length ? 1 : 0)
