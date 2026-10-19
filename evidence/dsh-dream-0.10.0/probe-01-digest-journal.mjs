#!/usr/bin/env node
/**
 * 探针 01 · 回顾会话（dream_digest）+ 保存反思（dream_save / dream_journal / dream_recall）。
 *
 * 全部离线：自带会话夹具（v4 多帧 zstd / v0 纯文本 / 子代理 / 旧代文件并存），
 * 临时 journalDir；不接触任何真实 DSH profile、不写 live 数据。
 *
 * 用法：node probe-01-digest-journal.mjs --plugin <已构建仓库副本>
 */
import { createHash } from 'node:crypto'
import { existsSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync, mkdirSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'
import { zstdCompressSync } from 'node:zlib'

const argv = process.argv.slice(2)
const opt = {}
for (let i = 0; i < argv.length; i += 1) {
  if (argv[i] === '--plugin') { opt.plugin = argv[i + 1]; i += 1 }
  if (argv[i] === '--keep') { opt.keep = true }
}
if (!opt.plugin) {
  console.error('usage: node probe-01-digest-journal.mjs --plugin <built-repo-copy>')
  process.exit(2)
}

const out = []
const say = (...parts) => { const line = parts.join(' '); out.push(line); console.log(line) }
const sha = (buf) => createHash('sha256').update(buf).digest('hex').slice(0, 16)

const lib = await import(pathToFileURL(join(opt.plugin, 'lib', 'index.js')).href)
const { buildDreamTools, resolveConfig } = lib

const root = mkdtempSync(join(tmpdir(), 'dsh-dream-probe01-'))
const sessionsRoot = join(root, 'sessions')
const journalDir = join(root, 'dreams')
const cfg = resolveConfig({ sessionsRoot, journalDir })
const tools = buildDreamTools(cfg)
const tool = (name) => {
  const found = tools.find((entry) => entry.name === name)
  if (!found) throw new Error('missing tool ' + name)
  return found
}

// ---- 夹具：会话日志（只有本探针自建数据） ----
function zstdFrames(lines) {
  return Buffer.concat(lines.map((line) => zstdCompressSync(Buffer.from(line + '\n', 'utf8'))))
}
function writeSession(projectId, sessionId, fileName, bytes) {
  const dir = join(sessionsRoot, projectId, sessionId)
  mkdirSync(dir, { recursive: true })
  writeFileSync(join(dir, fileName), bytes)
}
const ev = (type, seq, data, time) => JSON.stringify({ type, seq, time: time ?? 1786646800000 + seq * 1000, data })
const v4Header = (id, cwd, extra = {}) => JSON.stringify({ type: 'session', version: 4, id, createdAt: 1786646700000, cwd, delegationDepth: 0, agentPreset: 'code', ...extra })

// 主会话 A：v4 多帧 zstd；含标题、2 轮、用户原话（source.kind=user）、一条注入消息（非 user 应被跳过）、
// 助手结论、工具足迹、内嵌流式 text-chunks 兜底。
writeSession('proj-alpha', 'sess-a', 'session.v4.jsonl.zstd', zstdFrames([
  v4Header('sess-a', 'D:\\demo\\alpha'),
  ev('session/title', 0, { text: 'SMTP 取消投递会话' }),
  ev('turn/start', 1, {}),
  ev('user/message', 2, { source: { kind: 'user' }, content: [{ type: 'text', text: '取消发送后 SMTP 还在投递' }] }),
  ev('tool/call', 3, { name: 'bash' }),
  ev('assistant/message', 4, { content: [{ type: 'text', text: '已抓包确认取消后服务器仍收到正文' }] }),
  ev('turn/end', 5, {}),
  ev('turn/start', 6, {}),
  ev('user/message', 7, { source: { kind: 'user' }, content: [{ type: 'text', text: '那就把连接确实关掉再返回' }] }),
  ev('user/message', 8, { source: { kind: 'system' }, content: [{ type: 'text', text: '【注入上下文】这段不应算用户原话' }] }),
  ev('assistant/attempt', 9, { stream: [{ type: 'text-chunks', texts: ['复述流式文本兜底'] }] }),
  ev('assistant/message', 10, { content: [{ type: 'text', text: '改用 close() 后验证连接关闭' }] }),
  ev('turn/end', 11, {}),
]))
// 同会话旧代文件并存：v0 纯文本（应被 v4 取代，不重复计入）
writeSession('proj-alpha', 'sess-a', 'session.jsonl', Buffer.from([
  JSON.stringify({ type: 'session', version: 0, id: 'sess-a', createdAt: 1, cwd: 'D:\\demo\\alpha' }),
  ev('session/title', 0, '旧代标题（不应被读到）'),
  ev('turn/start', 1, {}),
  ev('user/message', 2, '旧代用户原话（应当被忽略）'),
  ev('turn/end', 3, {}),
].join('\n') + '\n', 'utf8'))
// 旧格式会话 B：v0 纯文本 + 独立打包行（text-chunks / tool-call-chunks）
writeSession('proj-alpha', 'sess-b', 'session.jsonl', Buffer.from([
  JSON.stringify({ type: 'session', version: 0, id: 'sess-b', createdAt: 1786646600000, cwd: 'D:\\demo\\alpha' }),
  ev('session/title', 0, '输入法问题排查'),
  ev('turn/start', 1, {}),
  ev('user/message', 2, '打不出中文了'),
  ev('tool/call', 3, { name: 'pwsh' }),
  ev('text-chunks', 4, { turn: 1, step: 1, index: 0, dt: [], texts: ['先重启输入法进程', '，再开兼容模式'] }),
  ev('tool-call-chunks', 5, { turn: 1, step: 1, index: 1, id: 'call_x', name: 'pwsh', args: ['{}'] }),
  ev('turn/end', 6, {}),
].join('\n') + '\n', 'utf8'))
// 子代理会话：应被 dream_digest 过滤
writeSession('proj-alpha', 'sess-sub', 'session.v4.jsonl.zstd', zstdFrames([
  v4Header('sess-sub', 'D:\\demo\\alpha', { origin: 'subagent', delegationDepth: 1 }),
  ev('session/title', 0, { text: '子代理会话（不应出现）' }),
  ev('turn/start', 1, {}),
  ev('user/message', 2, { source: { kind: 'user' }, content: [{ type: 'text', text: '子代理任务' }] }),
  ev('turn/end', 3, {}),
]))
// 含密钥的会话 C：验证梦原料脱敏
writeSession('proj-alpha', 'sess-c', 'session.v4.jsonl.zstd', zstdFrames([
  v4Header('sess-c', 'D:\\demo\\alpha'),
  ev('session/title', 0, { text: '带凭据的会话' }),
  ev('turn/start', 1, {}),
  ev('user/message', 2, { source: { kind: 'user' }, content: [{ type: 'text', text: '我的 token=sk-probeABCDEFGHIJKLMNOP1234567890 泄露了' }] }),
  ev('turn/end', 3, {}),
]))

say('== probe-01：回顾会话 / 保存反思 / 检索 ==')
say('plugin      =', opt.plugin)
say('tmpRoot     =', root)
say('sessionsRoot=', sessionsRoot)
say('journalDir  =', journalDir)
say('fixtures    = sess-a(v4 zstd + v0 旧代并存), sess-b(v0 纯文本+打包行), sess-sub(subagent), sess-c(含 token)')
say('')

// ---- 1. dream_digest ----
const { listSessionFiles, digestSessionFile } = lib
const scanned = listSessionFiles(sessionsRoot, 30)
say('[1a] listSessionFiles scanned=' + scanned.length)
for (const file of scanned) {
  const d = digestSessionFile(file, 5)
  say('  file=' + file.slice(sessionsRoot.length + 1) + ' digest=' + (d === null ? 'null' : `id=${d.id} versionlessOrigin=${d.origin} turns=${d.turns} users=${d.userMessages.length}`))
}
const digest = await tool('dream_digest').execute({ maxSessions: 10, mode: 'full' })
say('[1] dream_digest  count=' + digest.count + ' mode=' + digest.mode)
for (const session of digest.sessions) {
  say(`  - id=${session.id} title=${JSON.stringify(session.title)} turns=${session.turns} tools=${JSON.stringify(session.toolCalls)}`)
  say(`    userMessages=${JSON.stringify(session.userMessages)}`)
  say(`    assistantTail=${JSON.stringify(session.assistantTail)}`)
  say(`    digestText(${session.digestText.length}B)=${JSON.stringify(session.digestText.slice(0, 160))}...`)
}
const digestIds = digest.sessions.map((item) => item.id)
say('  subagentIncluded =', digestIds.includes('sess-sub'))
say('  sessA_reads_v4_not_legacy =', digest.sessions.find((item) => item.id === 'sess-a')?.title === 'SMTP 取消投递会话')
const secretSession = digest.sessions.find((item) => item.id === 'sess-c')
say('  maskSecretsApplied(c):', secretSession !== undefined && !secretSession.userMessages.join(' ').includes('sk-probeABCDEFGHIJKLMNOP1234567890'))
say('  digestJsonSha256 =', sha(Buffer.from(JSON.stringify(digest))))

// ---- 2. dream_save / dream_journal / dream_recall ----
const save1 = await tool('dream_save').execute({
  reflection: '取消投递不能只看返回码，要确认底层连接确实关闭。',
  lessons: ['取消后验证连接已关闭', '用抓包确认服务器不再收到正文'],
  mood: '平静',
})
const save2 = await tool('dream_save').execute({
  reflection: '输入法故障先重启进程，再考虑兼容模式。',
  lessons: ['先重启输入法进程', '再开启兼容模式'],
  mood: '坚定',
})
say('')
say('[2] dream_save #1', JSON.stringify({ id: save1.id, mood: save1.mood, lessons: save1.lessons }))
say('[2] dream_save #2', JSON.stringify({ id: save2.id, mood: save2.mood, lessons: save2.lessons }))
const journal = await tool('dream_journal').execute({ limit: 10 })
say('[2] dream_journal count=' + journal.count + ' stats.total=' + journal.stats.total + ' moods=' + JSON.stringify(journal.stats.moods) + ' skippedLines=' + journal.stats.skippedLines)
say('    topLessons=' + JSON.stringify(journal.stats.topLessons))
const recall = await tool('dream_recall').execute({ query: '输入法', limit: 5 })
say('[2] dream_recall query=输入法 count=' + recall.count + ' reflections=' + JSON.stringify(recall.dreams.map((item) => item.reflection)))
const disk = join(journalDir, 'dreams.jsonl')
say('    dreams.jsonl exists=' + existsSync(disk) + ' lines=' + readFileSync(disk, 'utf8').trim().split('\n').length + ' sha256=' + sha(readFileSync(disk)))
// [2b] dream_save 路径是否脱敏：写一条带 sk 密钥的反思，看落盘字节
const saveSecret = await tool('dream_save').execute({ reflection: '测试脱敏：口令 token=sk-probeZZZZYYYYXXXX1234567890 不应出现在梦原料里。', lessons: ['检查落盘脱敏'], mood: '存疑' })
const diskAfter = readFileSync(disk, 'utf8')
say('[2b] dream_save(带密钥) id=' + saveSecret.id + ' 落盘含原始密钥=' + diskAfter.includes('sk-probeZZZZYYYYXXXX1234567890') + ' 落盘含脱敏占位=' + diskAfter.includes('[已脱敏'))
say('     （对照：dream_digest 的会话文本已脱敏；dream_save 写盘为工具入参原文）')
try {
  const bad = await tool('dream_save').execute({ reflection: '   ', lessons: [] })
  say('[2] empty reflection unexpectedly accepted:', JSON.stringify(bad))
} catch (error) {
  say('[2] empty reflection rejected: ' + (error instanceof Error ? error.message : String(error)))
}

// ---- 3. 旧格式兼容：手写一条旧梦（缺 mood/lessons，多余字段）+ 一条坏行 ----
const legacyDir = join(root, 'legacy-dreams')
mkdirSync(legacyDir, { recursive: true })
writeFileSync(join(legacyDir, 'dreams.jsonl'), '\uFEFF' + JSON.stringify({ id: 'dream-legacy-1', at: '2025-01-01T00:00:00.000Z', reflection: '旧格式梦：只有 reflection' }) + '\n' +
  '{ this is not json }\n' + '\n', 'utf8')
const legacyJournal = await tool('dream_journal').execute({ limit: 5 })
// 工具用 cfg.journalDir；旧格式验证改用纯函数读取（同一 journal 模块）
const { readDreamsDetailed, dreamStats } = lib
const legacyRead = readDreamsDetailed(legacyDir, 10)
say('')
say('[3] legacy dreams.jsonl（BOM 开头 + 缺字段 + 坏行）')
say('    readDreamsDetailed: dreams=' + JSON.stringify(legacyRead.dreams) + ' skippedLines=' + legacyRead.skippedLines)
say('    dreamStats: total=' + dreamStats(legacyDir).total + ' moods=' + JSON.stringify(dreamStats(legacyDir).moods))
say('    current journal count=' + legacyJournal.count)

say('')
say('== probe-01 done ==')
if (opt.keep) say('kept tmpRoot =', root)
else rmSync(root, { recursive: true, force: true })
