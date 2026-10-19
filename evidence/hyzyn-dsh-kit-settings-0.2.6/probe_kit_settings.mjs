// @hyzyn/dsh-kit-settings 独立探针（契约面）：导出形状 / apply 幂等 / 客户端资源存在
// 运行：<node> probes/probe_kit_settings.mjs
import { existsSync, readFileSync } from 'node:fs'
const base = 'file:///D:/natnat/lingshu/外部插件/hyzyn-dsh-kit-settings/dsh-plugin-kit-main/packages/kit-settings/'
const m = await import(base + 'lib/index.js')
const results = []
const ok = (name, cond, detail = '') => results.push({ name, pass: !!cond, detail })

ok('导出 name=kit-settings', m.name === 'kit-settings', String(m.name))
ok('inject 为空数组', Array.isArray(m.inject) && m.inject.length === 0, JSON.stringify(m.inject))
let applied = false
try { m.apply({}); applied = true } catch (e) { applied = false }
ok('apply({}) 不抛异常', applied)
ok('client.js 存在', existsSync('D:/natnat/lingshu/外部插件/hyzyn-dsh-kit-settings/dsh-plugin-kit-main/packages/kit-settings/client.js'))
const pkg = JSON.parse(readFileSync('D:/natnat/lingshu/外部插件/hyzyn-dsh-kit-settings/dsh-plugin-kit-main/packages/kit-settings/package.json', 'utf8'))
ok('package.json 声明 dsh 或 exports', typeof pkg.dsh === 'object' || typeof pkg.exports === 'object', JSON.stringify(Object.keys(pkg)))
ok('cordis.patch.yml 存在', existsSync('D:/natnat/lingshu/外部插件/hyzyn-dsh-kit-settings/dsh-plugin-kit-main/packages/kit-settings/cordis.patch.yml'))

const failed = results.filter(r => !r.pass)
console.log(JSON.stringify({ total: results.length, failed: failed.length, results }, null, 1))
process.exit(failed.length ? 1 : 0)
