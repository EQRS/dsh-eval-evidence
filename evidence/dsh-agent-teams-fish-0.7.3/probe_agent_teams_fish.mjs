// dsh-agent-teams-fish 独立探针：团队状态往返 / 信箱顺序与并发 / 状态机 / 归档
// 运行：<node> probes/probe_agent_teams_fish.mjs（内部模块探针，非插件公开 API）
import { mkdtempSync, rmSync, readFileSync, existsSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const lib = 'file:///D:/natnat/lingshu/外部插件/dsh-agent-teams-fish/dsh-agent-teams-fish-main/lib/'
const S = await import(lib + 'state.js')
const results = []
const ok = (name, cond, detail = '') => results.push({ name, pass: !!cond, detail })

// 1. sanitizeKey
ok('sanitizeKey: 空格/大写归一', S.sanitizeKey('  Captain A ') === 'captain-a', S.sanitizeKey('  Captain A '))
ok('sanitizeKey: 中文保留', S.sanitizeKey('阿江') === '阿江', S.sanitizeKey('阿江'))
ok('sanitizeKey: 纯符号回落哈希', /^k-[0-9a-f]+$/.test(S.sanitizeKey('***')), S.sanitizeKey('***'))

// 2. createTeamDir / readTeam 往返
const root = mkdtempSync(join(tmpdir(), 'teams-probe-'))
const state = { id: 't1', name: 'probe-team', captainSessionId: 'sess-1', createdAt: Date.now(), members: [], tasks: [], taskSeq: 0 }
await S.createTeamDir(root, state)
const back = await S.readTeam(root, 't1')
ok('createTeamDir/readTeam 往返 id 一致', back?.id === 't1', JSON.stringify(back)?.slice(0, 120))
ok('readTeam 缺失返回 undefined', (await S.readTeam(root, 'nope')) === undefined)

// 3. 信箱串行顺序
for (const text of ['m1', 'm2', 'm3']) await S.appendMailbox(root, 't1', 'captain', S.createMessage('a', 'captain', text))
const box = await S.readMailbox(root, 't1', 'captain')
ok('appendMailbox 串行 3 条且顺序正确', box.length === 3 && box.map(m => m.content).join(',') === 'm1,m2,m3', JSON.stringify(box.map(m => m.content)))

// 4. 并发写同一信箱（检查是否丢消息）
const root2 = mkdtempSync(join(tmpdir(), 'teams-probe2-'))
await S.createTeamDir(root2, { ...state, id: 't2' })
await Promise.all(Array.from({ length: 10 }, (_, i) => S.withTeamLock(`team:${root2}:t2`, () => S.appendMailbox(root2, 't2', 'worker', S.createMessage('c', 'worker', 'c' + i)))))
const box2 = await S.readMailbox(root2, 't2', 'worker')
ok('withTeamLock 下并发 10 条 appendMailbox 全部保留', box2.length === 10, 'actually=' + box2.length)
// 契约外：直接并发调用（无锁）会丢消息，记录内部函数契约
const root3 = mkdtempSync(join(tmpdir(), 'teams-probe3-'))
await S.createTeamDir(root3, { ...state, id: 't3' })
await Promise.all(Array.from({ length: 10 }, (_, i) => S.appendMailbox(root3, 't3', 'raw', S.createMessage('c', 'raw', 'r' + i))))
const box3 = await S.readMailbox(root3, 't3', 'raw')
ok('无锁直接并发会丢消息（内部函数契约：调用方须持 withTeamLock）', box3.length < 10, 'kept=' + box3.length)
rmSync(root3, { recursive: true, force: true })

// 5. 状态机
ok('transitionError: 同态无错', S.transitionError('pending', 'pending') === undefined)
ok('transitionError: 终态 completed 不可回退（返回错误串）', typeof S.transitionError('completed', 'claimed') === 'string', String(S.transitionError('completed', 'claimed')))
let unknownStatusThrew = false
try { S.transitionError('done', 'claimed') } catch { unknownStatusThrew = true }
ok('transitionError: 未知状态会抛 TypeError（内部函数，调用方类型约束）', unknownStatusThrew)
const tasks = [{ id: 'a', status: 'completed' }, { id: 'b', status: 'in_progress' }]
ok('unsatisfiedDependencies 指出未完成项', JSON.stringify(S.unsatisfiedDependencies(tasks, ['a', 'b', 'x'])) === JSON.stringify(['b', 'x']), JSON.stringify(S.unsatisfiedDependencies(tasks, ['a', 'b', 'x'])))

// 6. describeTeamStateDefect 对坏状态给诊断
const defect = S.describeTeamStateDefect({ id: 'other' }, 't3')
ok('describeTeamStateDefect 能指出 id 不符', typeof defect === 'string' && defect.length > 0, String(defect).slice(0, 120))

// 7. 归档
await S.archiveTeamDir(root, 't1')
ok('archiveTeamDir 后原目录消失', !existsSync(join(root, 't1')))
ok('readArchivedTeam 可读回', (await S.readArchivedTeam(root, 't1'))?.id === 't1')

rmSync(root, { recursive: true, force: true })
rmSync(root2, { recursive: true, force: true })
const failed = results.filter(x => !x.pass)
console.log(JSON.stringify({ total: results.length, failed: failed.length, results }, null, 1))
process.exit(failed.length ? 1 : 0)
