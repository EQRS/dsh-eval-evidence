// @hyzyn/dsh-profile 独立探针：路由挂载 / profile CRUD / loopback 守卫 / 名称校验
// 运行：<node> probes/probe_hyzyn_profile.mjs
import { mkdtempSync, readFileSync, existsSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const home = mkdtempSync(join(tmpdir(), 'profile-probe-'))
process.env.DSH_HOME = home
const mod = await import('file:///D:/natnat/lingshu/外部插件/hyzyn-dsh-profile/dsh-plugin-kit-main/packages/profile/lib/index.js')

const results = []
const ok = (name, cond, detail = '') => results.push({ name, pass: !!cond, detail })

const routes = []
const ctx = {
  inject: (_deps, cb) => cb({
    effect: (fn) => fn(),
    webServer: { register: (route) => { routes.push(route); return () => {} } },
  }),
}
mod.apply(ctx, { announceToAgent: false })
ok('apply 挂载 6 条路由', routes.length === 6, routes.map(r => r.path).join(','))

function mkReq(method, body, remote = '127.0.0.1') {
  const buf = body === undefined ? null : Buffer.from(JSON.stringify(body))
  const req = {
    method,
    socket: { remoteAddress: remote },
    headers: { host: '127.0.0.1:50533', origin: 'http://127.0.0.1:50533', 'sec-fetch-site': 'same-origin' },
  }
  req[Symbol.asyncIterator] = async function* () { if (buf) yield buf }
  return req
}
function mkRes() {
  const r = { status: 0, body: '' }
  r.writeHead = (s) => { r.status = s }
  r.end = (b) => { r.body = b ?? '' }
  r.json = () => { try { return JSON.parse(r.body) } catch { return null } }
  return r
}
const byPath = Object.fromEntries(routes.map(r => [r.path, r.handler]))
async function call(path, method, body, remote) {
  const res = mkRes()
  await byPath[path](mkReq(method, body, remote), res)
  return res
}

// 1. 初始 list
let r = await call('/api/dsh-profile/list', 'GET')
ok('list 初始返回空 profiles', r.status === 200 && Array.isArray(r.json().profiles), JSON.stringify(r.json()).slice(0, 160))

// 2. create
r = await call('/api/dsh-profile/create', 'POST', { name: 'alpha' })
ok('create alpha 返回 200', r.status === 200 && r.json().ok === true, r.body.slice(0, 160))
const manifest = JSON.parse(readFileSync(join(home, 'profiles', 'alpha', 'package.json'), 'utf8'))
ok('create 写出 package.json 且 name 正确', manifest.name === 'dsh-profile-alpha', JSON.stringify(manifest).slice(0, 160))
ok('create 写出 cordis.patch.yml', existsSync(join(home, 'profiles', 'alpha', 'cordis.patch.yml')))

// 3. list 含 alpha
r = await call('/api/dsh-profile/list', 'GET')
ok('list 含 alpha', r.json().profiles.some(p => p.name === 'alpha'), JSON.stringify(r.json().profiles.map(p => p.name)))

// 4. duplicate
r = await call('/api/dsh-profile/duplicate', 'POST', { name: 'beta', from: 'alpha' })
ok('duplicate alpha→beta', r.status === 200, r.body.slice(0, 160))
ok('duplicate 后 beta 存在', existsSync(join(home, 'profiles', 'beta', 'package.json')))

// 5. rename
r = await call('/api/dsh-profile/rename', 'POST', { name: 'beta', newName: 'gamma' })
ok('rename beta→gamma', r.status === 200, r.body.slice(0, 200))
ok('rename 同步目录与 manifest', existsSync(join(home, 'profiles', 'gamma', 'package.json')) && JSON.parse(readFileSync(join(home, 'profiles', 'gamma', 'package.json'), 'utf8')).name === 'dsh-profile-gamma')

// 6. port
r = await call('/api/dsh-profile/port', 'POST', { name: 'gamma', port: 50888 })
ok('port 写入 profile 端口', r.status === 200, r.body.slice(0, 160))

// 7. delete
r = await call('/api/dsh-profile/delete', 'POST', { name: 'gamma' })
ok('delete gamma', r.status === 200 && !existsSync(join(home, 'profiles', 'gamma')))

// 8. 名称校验
r = await call('/api/dsh-profile/create', 'POST', { name: '../evil' })
ok('非法名称被拒（400）', r.status === 400, r.body.slice(0, 120))

// 9. loopback 守卫
r = await call('/api/dsh-profile/list', 'GET', undefined, '10.0.0.7')
ok('非 loopback 请求被拒（403）', r.status === 403, r.body.slice(0, 120))

// 10. 方法守卫
r = await call('/api/dsh-profile/create', 'GET')
ok('方法不匹配被拒（405）', r.status === 405, r.body.slice(0, 120))

// 11. 受保护名称
r = await call('/api/dsh-profile/delete', 'POST', { name: 'web' })
ok('受保护名 web 不可删除（400）', r.status === 400, r.body.slice(0, 160))

rmSync(home, { recursive: true, force: true })
const failed = results.filter(x => !x.pass)
console.log(JSON.stringify({ total: results.length, failed: failed.length, results }, null, 1))
process.exit(failed.length ? 1 : 0)
