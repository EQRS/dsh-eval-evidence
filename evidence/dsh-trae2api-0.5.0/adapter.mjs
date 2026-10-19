// 独立探针 3：LLM provider 适配器 / 流式 / 失败契约（全离线，fetch 与 auth 用桩）。
// 覆盖：请求体与身份头、正文/思考/工具调用流、文本工具调用恢复、重复守卫、输出预算、
//       空回合与 3003 重试、4023/HTTP 错误映射、401 换 JWT 重试、读超时、用户取消、
//       流中途错误、main-loop 回调、图片内联/降级、resolveModel/listModels/complete。
//
// 用法（在测评工作目录）：
//   node probes/adapter.mjs [--repo <快照目录>] [--out raw/12-probe-adapter.txt]

import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

const argv = process.argv.slice(2)
let repo = 'D:\\natnat\\lingshu\\外部插件\\dsh-trae2api\\deepseek-harness-trae-main'
let out = ''
for (let i = 0; i < argv.length; i++) {
  if (argv[i] === '--repo') repo = argv[++i]
  else if (argv[i] === '--out') out = argv[++i]
  else { console.error('usage: node probes/adapter.mjs [--repo <dir>] [--out <file>]'); process.exit(2) }
}
repo = resolve(repo)
const m = await import(pathToFileURL(resolve(repo, 'lib/testing.mjs')).href)
const { TraeAdapter, BUILTIN_SNAPSHOT } = m

const lines = []
const results = []
const say = (t = '') => { lines.push(t); console.log(t) }
function record(name, dim, observed, expected, ok, note = '') {
  results.push({ name, ok })
  const tag = ok ? 'PASS' : (note.startsWith('FINDING') ? 'FAIL(FINDING)' : 'FAIL')
  say(`CASE ${name} | ${dim} | observed=${JSON.stringify(observed)} | expected=${JSON.stringify(expected)} | ${tag}${note ? ' | ' + note : ''}`)
}
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

const identity = {
  appId: 'app-test', ideFunction: 'chat', ideVersion: '99.99.99', ideVersionCode: '20260908',
  clientVersion: '0.206.1-tob', originator: 'codex_exec', userAgent: 'ua-test',
}
const tools = [{ name: 'bash', description: 'run shell', parameters: { type: 'object', properties: { cmd: { type: 'string' } } } }]
const userMsg = { role: 'user', content: [{ type: 'text', text: 'hello' }] }
const baseOptions = () => ({ model: 'GLM-5.3', sessionId: 's1', messages: [userMsg], tools })
const baseAdapter = (extra = {}) => new TraeAdapter({
  displayName: 'Trae', host: 'https://api.example', identity,
  auth: extra.auth ?? { get: async () => ({ token: 'tok1', expiresAt: Date.now() + 3600_000 }) },
  readTimeoutMs: extra.readTimeoutMs ?? 300_000,
  emptyRetries: extra.emptyRetries ?? 1,
  loopGuardChars: extra.loopGuardChars ?? 600,
  logger: extra.logger ?? { info() {}, warn() {} },
  ...extra.opts ?? {},
})

const realFetch = globalThis.fetch
function installFetch(handler) {
  const calls = []
  globalThis.fetch = async (url, init) => {
    const call = { url: String(url), headers: init?.headers ?? {}, body: init?.body ? JSON.parse(String(init.body)) : undefined, signal: init?.signal }
    calls.push(call)
    return handler(call, calls.length)
  }
  return calls
}
const sseResponse = (chunks, status = 200) => new Response(new ReadableStream({
  start(c) { for (const ch of chunks) c.enqueue(new TextEncoder().encode(ch)); c.close() },
}), { status, headers: { 'content-type': 'text/event-stream' } })
const ev = (event, data) => `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`
async function collect(adapter, options = baseOptions()) {
  const chunks = []
  for await (const ch of adapter.stream(options)) chunks.push(ch)
  return chunks
}
const kinds = (chunks) => chunks.map((c) => c.type)
const textOf = (chunks) => chunks.filter((c) => c.type === 'text-delta').map((c) => c.text).join('')
const reasoningOf = (chunks) => chunks.filter((c) => c.type === 'reasoning-delta').map((c) => c.text).join('')

say('# 独立探针：provider 适配 / 流式 / 失败契约（离线桩）')
say(`generated_at = ${new Date().toISOString()}`)
say(`repo = ${repo}`)
say('')
try {
  // 1. 请求体 + 身份头 + 正文/思考/用量
  {
    const calls = installFetch((_c, n) => sseResponse([
      ev('output', { reasoning_content: 'think ' }),
      ev('output', { reasoning_content: 'more' }),
      ev('output', { response: 'Hel' }),
      ev('output', { response: 'lo' }),
      ev('token_usage', { prompt_tokens: 100, completion_tokens: 5, total_tokens: 105, cache_read_input_tokens: 20, cache_creation_input_tokens: 10, reasoning_tokens: 2 }),
      ev('done', { finish_reason: 'stop' }),
    ]))
    const chunks = await collect(baseAdapter())
    const req = calls[0]
    record('request_url', 'POST 目标', req.url, 'https://api.example/api/ide/v2/llm_raw_chat', req.url === 'https://api.example/api/ide/v2/llm_raw_chat')
    const body = req.body
    record('body_route', 'function/config/model/access', [body.function, body.config_name, body.model_name, body.access_type, body.mode_type], ['chat', 'glm-5.3', 'glm-5.3__max', 4, 0], body.function === 'chat' && body.config_name === 'glm-5.3' && body.model_name === 'glm-5.3__max' && body.access_type === 4 && body.mode_type === 0)
    record('body_session', 'session_id/conversation_id 一致且为 UUID', [body.session_id, body.conversation_id, /^[0-9a-f-]{36}$/.test(body.session_id)], [/^[0-9a-f-]{36}$/.test(body.session_id), new RegExp('^' + body.session_id + '$')], /^[0-9a-f-]{36}$/.test(body.session_id) && body.conversation_id === body.session_id)
    record('body_metadata', 'metadata.agent_type/use_prompt_cache_pool', body.metadata, { agent_type: 'chat', use_prompt_cache_pool: true }, JSON.stringify(body.metadata) === JSON.stringify({ agent_type: 'chat', use_prompt_cache_pool: true }))
    record('body_tools', 'tools 嵌套函数 + parameters JSON 字符串', body.tools, [{ type: 'function', function: { name: 'bash', description: 'run shell', parameters: '{"type":"object","properties":{"cmd":{"type":"string"}}}' } }], JSON.stringify(body.tools) === JSON.stringify([{ type: 'function', function: { name: 'bash', description: 'run shell', parameters: '{"type":"object","properties":{"cmd":{"type":"string"}}}' } }]))
    record('body_messages', 'messages 序列', body.messages, [{ role: 'user', content: [{ type: 'text', text: 'hello' }] }], JSON.stringify(body.messages) === JSON.stringify([{ role: 'user', content: [{ type: 'text', text: 'hello' }] }]))
    record('headers_auth', 'authorization / 身份头', [req.headers.authorization, req.headers['x-app-id'], req.headers['x-ide-version-code'], req.headers.originator, req.headers.version], ['Cloud-IDE-JWT tok1', 'app-test', '20260908', 'codex_exec', '0.206.1-tob'], req.headers.authorization === 'Cloud-IDE-JWT tok1' && req.headers['x-app-id'] === 'app-test' && req.headers['x-ide-version-code'] === '20260908' && req.headers.originator === 'codex_exec' && req.headers.version === '0.206.1-tob')
    record('headers_request_id', 'x-request-id 是 UUID', /^[0-9a-f-]{36}$/.test(req.headers['x-request-id']), true, /^[0-9a-f-]{36}$/.test(req.headers['x-request-id']))
    record('stream_reasoning', 'reasoning 块与增量', [reasoningOf(chunks), chunks.find((c) => c.type === 'block-end' && c.block.type === 'reasoning')?.block.text], ['think more', 'think more'], reasoningOf(chunks) === 'think more')
    record('stream_text', 'text 块与增量', [textOf(chunks), chunks.find((c) => c.type === 'block-end' && c.block.type === 'text')?.block.text], ['Hello', 'Hello'], textOf(chunks) === 'Hello')
    const usage = chunks.find((c) => c.type === 'usage')?.usage
    record('stream_usage', '缓存扣除后的 inputTokens 等', usage, { inputTokens: 70, outputTokens: 5, totalTokens: 105, cacheReadTokens: 20, cacheWriteTokens: 10, reasoningTokens: 2 }, JSON.stringify(usage) === JSON.stringify({ inputTokens: 70, outputTokens: 5, totalTokens: 105, cacheReadTokens: 20, cacheWriteTokens: 10, reasoningTokens: 2 }))
    record('stream_finish', 'finish stop', chunks.at(-1), { type: 'finish', reason: { kind: 'stop' } }, JSON.stringify(chunks.at(-1)) === JSON.stringify({ type: 'finish', reason: { kind: 'stop' } }))
    record('stream_block_order', '块 index 顺序 0=reasoning,1=text', chunks.filter((c) => c.type === 'block-start').map((c) => c.index), [0, 1], JSON.stringify(chunks.filter((c) => c.type === 'block-start').map((c) => c.index)) === JSON.stringify([0, 1]))
  }

  // 2. 工具调用增量
  {
    installFetch(() => sseResponse([
      ev('output', { tool_calls: [{ index: 0, id: 'call_a', function_call: { name: 'bash', arguments: '{"cmd"' } }] }),
      ev('output', { tool_calls: [{ index: 0, function_call: { arguments: ':"ls"}' } }] }),
      ev('done', { finish_reason: 'tool_calls' }),
    ]))
    const chunks = await collect(baseAdapter())
    const end = chunks.find((c) => c.type === 'block-end' && c.block.type === 'tool-call')
    record('tool_end', '合并后的工具调用', end?.block, { type: 'tool-call', id: 'call_a', name: 'bash', arguments: '{"cmd":"ls"}' }, JSON.stringify(end?.block) === JSON.stringify({ type: 'tool-call', id: 'call_a', name: 'bash', arguments: '{"cmd":"ls"}' }))
    record('tool_finish', 'finish tool-calls', chunks.at(-1)?.reason, { kind: 'tool-calls' }, JSON.stringify(chunks.at(-1)?.reason) === JSON.stringify({ kind: 'tool-calls' }))
  }

  // 3. 文本工具调用恢复
  {
    installFetch(() => sseResponse([
      ev('output', { response: '先执行：<tool_calls><invoke name="bash"><parameter name="cmd">pwd</parameter></invoke></tool_calls>完成' }),
      ev('done', { finish_reason: 'stop' }),
    ]))
    const chunks = await collect(baseAdapter())
    const call = chunks.find((c) => c.type === 'block-end' && c.block.type === 'tool-call')?.block
    record('recover_call', '从正文恢复工具调用', call, { type: 'tool-call', name: 'bash', arguments: '{"cmd":"pwd"}' }, call?.name === 'bash' && call?.arguments === '{"cmd":"pwd"}')
    record('recover_text_kept', '标记外的文本保留', textOf(chunks), '先执行：完成', textOf(chunks) === '先执行：完成')
    record('recover_finish', 'finish tool-calls', chunks.at(-1)?.reason, { kind: 'tool-calls' }, JSON.stringify(chunks.at(-1)?.reason) === JSON.stringify({ kind: 'tool-calls' }))
  }

  // 4. 重复守卫 + 输出预算
  {
    const warns = []
    installFetch(() => sseResponse(Array.from({ length: 30 }, () => ev('output', { response: 'abcdefghij'.repeat(6) }))))
    const chunks = await collect(baseAdapter({ loopGuardChars: 600, logger: { info() {}, warn: (...a) => warns.push(a.join(' ')) } }))
    record('loop_cut_finish', '重复塌缩 → max-tokens', chunks.at(-1)?.reason, { kind: 'max-tokens' }, JSON.stringify(chunks.at(-1)?.reason) === JSON.stringify({ kind: 'max-tokens' }))
    record('loop_cut_warn', '记录 warning', warns.some((w) => w.includes('repetition collapse')), true, warns.some((w) => w.includes('repetition collapse')))
    record('loop_cut_usage', '被切时输出估算 usage', chunks.find((c) => c.type === 'usage')?.usage?.outputTokens > 0, true, true)
  }
  {
    installFetch(() => sseResponse([ev('output', { response: 'a'.repeat(400) })]))
    const chunks = await collect(baseAdapter({ opts: { } }))
    void chunks
    installFetch(() => sseResponse([ev('output', { response: 'a'.repeat(400) })]))
    const options = { ...baseOptions(), maxTokens: 50 }
    const limited = await collect(baseAdapter(), options)
    record('budget_cut', 'maxTokens=50（≈50 token）截断', limited.at(-1)?.reason, { kind: 'max-tokens' }, JSON.stringify(limited.at(-1)?.reason) === JSON.stringify({ kind: 'max-tokens' }))
  }

  // 5. 空回合重试 / 3003 重试
  {
    const calls = installFetch((_c, n) => n === 1 ? sseResponse([ev('done', { finish_reason: 'stop' })]) : sseResponse([ev('output', { response: 'second try ok' })]))
    const chunks = await collect(baseAdapter())
    record('empty_retry_calls', '空回合重试了一次', calls.length, 2, calls.length === 2)
    record('empty_retry_text', '第二次输出成功', textOf(chunks), 'second try ok', textOf(chunks) === 'second try ok')
  }
  {
    const calls = installFetch((_c, n) => n === 1 ? sseResponse([ev('error', { code: 3003, message: 'temporarily unavailable' })]) : sseResponse([ev('output', { response: 'recovered' })]))
    const chunks = await collect(baseAdapter())
    record('transient_retry', '3003 重试后成功', [calls.length, textOf(chunks)], [2, 'recovered'], calls.length === 2 && textOf(chunks) === 'recovered')
  }

  // 6. 错误映射
  {
    installFetch(() => sseResponse([ev('error', { code: 4023, message: 'the model is unknown' })]))
    let err
    try { await collect(baseAdapter()) } catch (e) { err = e }
    record('error_4023_code', 'MODEL_NOT_FOUND', err?.code, 'MODEL_NOT_FOUND', err?.code === 'MODEL_NOT_FOUND')
    record('error_4023_hint', '错误文本带 4023 说明', /上游不认识这个模型名/.test(String(err?.message)), true, /上游不认识这个模型名/.test(String(err?.message)))
  }
  {
    installFetch(() => new Response('boom', { status: 500 }))
    let err
    try { await collect(baseAdapter()) } catch (e) { err = e }
    record('error_http500', 'PROVIDER_UNAVAILABLE + status（failure.status）', [err?.code, err?.failure?.status, /HTTP 500/.test(String(err?.message))], ['PROVIDER_UNAVAILABLE', 500, true], err?.code === 'PROVIDER_UNAVAILABLE' && err?.failure?.status === 500 && /HTTP 500/.test(String(err?.message)))
  }
  {
    const authCalls = []
    const auth = { get: async (force = false) => { authCalls.push(force); return { token: force ? 'fresh' : 'tok1', expiresAt: Date.now() + 3600_000 } } }
    const calls = installFetch((_c, n) => n === 1 ? new Response('unauthorized', { status: 401 }) : sseResponse([ev('output', { response: 'after refresh' })]))
    const chunks = await collect(baseAdapter({ auth }))
    record('auth_retry', '401 换 JWT 重试', [calls.length, authCalls, calls[1]?.headers.authorization, textOf(chunks)], [2, [false, true], 'Cloud-IDE-JWT fresh', 'after refresh'], calls.length === 2 && JSON.stringify(authCalls) === JSON.stringify([false, true]) && calls[1].headers.authorization === 'Cloud-IDE-JWT fresh')
  }

  // 7. 读超时 / 用户取消 / 流中途错误
  {
    const hanging = (signal) => new Response(new ReadableStream({
      start(c) { signal?.addEventListener('abort', () => c.error(signal.reason), { once: true }) },
    }), { status: 200, headers: { 'content-type': 'text/event-stream' } })
    installFetch((call) => hanging(call.signal))
    const t0 = Date.now()
    let err
    try { await collect(baseAdapter({ readTimeoutMs: 100 })) } catch (e) { err = e }
    record('read_timeout', 'PROVIDER_TIMEOUT', [err?.code, Date.now() - t0 < 3000], ['PROVIDER_TIMEOUT', true], err?.code === 'PROVIDER_TIMEOUT' && Date.now() - t0 < 3000)
  }
  {
    const hanging = (signal) => new Response(new ReadableStream({
      start(c) { signal?.addEventListener('abort', () => c.error(signal.reason), { once: true }) },
    }), { status: 200, headers: { 'content-type': 'text/event-stream' } })
    installFetch((call) => hanging(call.signal))
    const controller = new AbortController()
    const reason = new Error('user stop')
    setTimeout(() => controller.abort(reason), 50)
    let err
    try {
      const adapter = baseAdapter()
      for await (const _ of adapter.stream({ ...baseOptions(), signal: controller.signal })) { /* consume */ }
    } catch (e) { err = e }
    record('user_abort', '保留调用方 reason（非 PROVIDER_TIMEOUT）', [err === reason, String(err?.message)], [true, 'user stop'], err === reason)
  }
  {
    const warns = []
    installFetch(() => sseResponse([
      ev('output', { response: 'partial ' }),
      ev('error', { code: 5001, message: 'stream died halfway' }),
    ]))
    const chunks = await collect(baseAdapter({ logger: { info() {}, warn: (...a) => warns.push(a.join(' ')) } }))
    record('miderror_swallowed', '流中途错误：输出保留、finish=stop、仅日志', [textOf(chunks), chunks.at(-1)?.reason?.kind, warns.some((w) => w.includes('upstream error after output'))], ['partial ', 'stop', true], textOf(chunks) === 'partial ' && chunks.at(-1)?.reason?.kind === 'stop' && warns.some((w) => w.includes('upstream error after output')), 'FINDING: 中途错误不向调用方抛错，调用方拿到截断的 stop 回答')
  }

  // 8. main-loop 回调
  {
    const events = []
    installFetch(() => sseResponse([ev('output', { response: 'answer' }), ev('done', { finish_reason: 'stop' })]))
    await collect(baseAdapter({ opts: { onTurnStart: (id) => events.push('start:' + id), onTurnEnd: (t) => events.push('end:' + t.sessionId + ':' + t.model + ':' + t.answer) } }), { ...baseOptions() })
    record('mainloop_callbacks', '主循环开始/结束回调', events, ['start:s1', 'end:s1:GLM-5.3:answer'], JSON.stringify(events) === JSON.stringify(['start:s1', 'end:s1:GLM-5.3:answer']))
    const ev2 = []
    installFetch(() => sseResponse([ev('output', { response: 'side' }), ev('done', { finish_reason: 'stop' })]))
    await collect(baseAdapter({ opts: { onTurnStart: () => ev2.push('start'), onTurnEnd: () => ev2.push('end') } }), { ...baseOptions(), purpose: 'title' })
    record('mainloop_purpose_skipped', 'purpose 请求不触发', ev2, [], ev2.length === 0)
    const ev3 = []
    installFetch(() => sseResponse([ev('output', { response: 'no tools' }), ev('done', { finish_reason: 'stop' })]))
    await collect(baseAdapter({ opts: { onTurnStart: () => ev3.push('start'), onTurnEnd: () => ev3.push('end') } }), { ...baseOptions(), tools: [] })
    record('mainloop_no_tools_skipped', '无工具请求不触发', ev3, [], ev3.length === 0)
    const ev4 = []
    installFetch(() => sseResponse([ev('output', { tool_calls: [{ index: 0, id: 'c1', function_call: { name: 'bash', arguments: '{}' } }] }), ev('done', { finish_reason: 'tool_calls' })]))
    await collect(baseAdapter({ opts: { onTurnStart: () => ev4.push('start'), onTurnEnd: () => ev4.push('end') } }), { ...baseOptions() })
    record('mainloop_tool_turn', '工具回合只 start 不 end', ev4, ['start'], JSON.stringify(ev4) === JSON.stringify(['start']))
  }

  // 9. 图片
  {
    const multimodal = { ready: async () => ({ routes: [{ id: 'M', configName: 'm', key: 'm__max', contextWindow: 1000000, efforts: [], maxMode: true, maxMarker: false, multimodal: true }], origin: 'builtin', at: 0, find: (id) => id === 'M' ? { id: 'M', configName: 'm', key: 'm__max', contextWindow: 1000000, efforts: [], maxMode: true, maxMarker: false, multimodal: true } : undefined }) }
    const store = { readImageRequest: async () => ({ data: new Uint8Array([1, 2, 3]), mediaType: 'image/png', bytes: 3, width: 64, height: 64 }) }
    const calls = installFetch(() => sseResponse([ev('output', { response: 'seen' }), ev('done', { finish_reason: 'stop' })]))
    const opts = { ...baseOptions(), model: 'M', messages: [{ role: 'user', content: [{ type: 'text', text: 'look' }, { type: 'image', attachment: { attachmentId: 'a1' } }] }] }
    await collect(baseAdapter({ opts: { catalog: multimodal, resolveAttachments: () => store } }), opts)
    const body = calls[0].body
    record('image_inline', '多模态路由内联 data URI', body.messages[0].content, [{ type: 'text', text: 'look' }, { type: 'image_url', image_url: { url: 'data:image/png;base64,AQID' } }], JSON.stringify(body.messages[0].content) === JSON.stringify([{ type: 'text', text: 'look' }, { type: 'image_url', image_url: { url: 'data:image/png;base64,AQID' } }]))
    installFetch(() => sseResponse([ev('output', { response: 'x' }), ev('done', {})]))
    const calls2 = installFetch(() => sseResponse([ev('output', { response: 'x' }), ev('done', {})]))
    await collect(baseAdapter({ opts: { catalog: multimodal, resolveAttachments: () => ({ readImageRequest: async () => { throw new Error('decode failed') } }) } }), opts)
    const body2 = calls2[0].body
    record('image_failure_placeholder', '取图失败降级为占位文本', body2.messages[0].content, [{ type: 'text', text: 'look\n\n[image omitted]' }], JSON.stringify(body2.messages[0].content) === JSON.stringify([{ type: 'text', text: 'look\n\n[image omitted]' }]))
  }

  // 10. resolveModel / listModels / complete
  {
    const adapter = baseAdapter()
    const glm = await adapter.resolveModel('trae', 'GLM-5.3')
    record('resolve_glm', 'GLM-5.3 窗口/输出/思考', [glm.context.contextWindow, glm.defaultMaxTokens, glm.reasoning?.efforts.map((e) => e.id), glm.reasoning?.defaultEffort], [1000000, 64000, ['light', 'high', 'extra_high'], 'high'], glm.context.contextWindow === 1000000 && glm.defaultMaxTokens === 64000 && JSON.stringify(glm.reasoning.efforts.map((e) => e.id)) === JSON.stringify(['light', 'high', 'extra_high']) && glm.reasoning.defaultEffort === 'high')
    const doubao = await adapter.resolveModel('trae', 'Doubao-Seed-Evolving')
    record('resolve_doubao', 'Doubao 窗口/输出', [doubao.context.contextWindow, doubao.defaultMaxTokens], [184000, 16000], doubao.context.contextWindow === 184000 && doubao.defaultMaxTokens === 16000)
    const unknown = await adapter.resolveModel('trae', 'Not-In-Catalog')
    record('resolve_unknown', '未知模型默认 200K/32K/无 reasoning', [unknown.context.contextWindow, unknown.defaultMaxTokens, unknown.reasoning], [200000, 32000, undefined], unknown.context.contextWindow === 200000 && unknown.defaultMaxTokens === 32000 && unknown.reasoning === undefined)
    const models = await adapter.listModels('trae')
    record('list_models', '模型数 + 描述 + 模态', [models.length, models.find((x) => x.id === 'GLM-5.3')?.description, models.find((x) => x.id === 'Doubao-Seed-Evolving')?.description, models.find((x) => x.id === 'Doubao-Seed-Evolving')?.inputModalities], [20, '1M 上下文（Max）', '184K 上下文', ['text', 'image']], models.length === 20 && models.find((x) => x.id === 'GLM-5.3')?.description === '1M 上下文（Max）' && models.find((x) => x.id === 'Doubao-Seed-Evolving')?.description === '184K 上下文' && JSON.stringify(models.find((x) => x.id === 'Doubao-Seed-Evolving')?.inputModalities) === JSON.stringify(['text', 'image']))
    const calls = installFetch(() => sseResponse([ev('output', { response: 'side answer' }), ev('done', {})]))
    const text = await (async () => {
      const a = baseAdapter()
      return a.complete('GLM-5.3', 'sys', 'usr', new AbortController().signal)
    })()
    record('complete_text', 'complete() 汇总文本', text, 'side answer', text === 'side answer')
    const body = calls[0].body
    record('complete_body', 'complete 无工具、最低档、独立 session', [body.tools.length, body.custom_model?.reasoning_effort, body.model_name, body.messages.length], [0, 'light', 'glm-5.3__max', 2], body.tools.length === 0 && body.custom_model?.reasoning_effort === 'light' && body.model_name === 'glm-5.3__max' && body.messages.length === 2)
    let err
    try { await baseAdapter().complete('Nope', 's', 'u', new AbortController().signal) } catch (e) { err = e }
    record('complete_unknown_model', 'MODEL_NOT_FOUND', err?.code, 'MODEL_NOT_FOUND', err?.code === 'MODEL_NOT_FOUND')
  }

  // 11. reasoningEffort 词表映射
  {
    const cases = [
      ['effort_same', 'GLM-5.3', 'extra_high', 'extra_high'],
      ['effort_xhigh', 'GLM-5.3', 'xhigh', 'extra_high'],
      ['effort_medium', 'Doubao-Seed-Evolving', 'medium', 'high'],
      ['effort_none', 'Doubao-Seed-Evolving', 'none', 'light'],
      ['effort_bogus', 'GLM-5.3', 'bogus', undefined],
    ]
    for (const [name, model, requested, expected] of cases) {
      const calls = installFetch(() => sseResponse([ev('output', { response: 'x' }), ev('done', {})]))
      await collect(baseAdapter(), { ...baseOptions(), model, reasoningEffort: requested })
      const got = calls[0].body.custom_model?.reasoning_effort
      record(name, `effort ${model}/${requested}`, got, expected, got === expected)
    }
  }

  // 12. 未知模型 / 非 UUID session
  {
    let err
    try { await collect(baseAdapter(), { ...baseOptions(), model: 'Nope' }) } catch (e) { err = e }
    record('stream_unknown_model', 'MODEL_NOT_FOUND 且列出可用', [err?.code, /可用：/.test(String(err?.message))], ['MODEL_NOT_FOUND', true], err?.code === 'MODEL_NOT_FOUND' && /可用：/.test(String(err?.message)))
    const calls = installFetch(() => sseResponse([ev('output', { response: 'x' }), ev('done', {})]))
    await collect(baseAdapter(), { ...baseOptions(), sessionId: 'not-a-uuid' })
    record('session_hashed', '非 UUID session 被哈希成 UUID', /^[0-9a-f]{8}-[0-9a-f]{4}-5[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/.test(calls[0].body.session_id), true, /^[0-9a-f]{8}-[0-9a-f]{4}-5[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/.test(calls[0].body.session_id))
  }
} finally {
  globalThis.fetch = realFetch
}

say('')
const pass = results.filter((r) => r.ok).length
const fail = results.length - pass
say(`## 汇总：${pass}/${results.length} 通过，${fail} 不符`)
say('')
say('## 边界')
say('- 全部请求为本地桩，未访问 Trae；真实 PAT 兑换与真实模型调用见报告「未验」。')
say('- LlmError 的 code/status 由 @deepseek-ai/dsh-llm 0.2.0-rc.2 提供（devDependency，与本快照声明一致）。')

const text = lines.join('\n') + '\n'
if (out) { await mkdir(dirname(resolve(out)), { recursive: true }); await writeFile(resolve(out), text, 'utf8'); console.log(`wrote ${out}`) }
process.exit(fail === 0 ? 0 : 1)
