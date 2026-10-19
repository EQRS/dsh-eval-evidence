#!/usr/bin/env node
/**
 * fake-mcp-stdio.mjs · 一个最小 MCP stdio 服务器（探针夹具，非被测对象）。
 *
 * 行为：
 *   node fake-mcp-stdio.mjs [--tools N] [--fail]
 *   --tools N    tools/list 返回 N 个工具（默认 2）
 *   --fail       往 stderr 写一行中文后 exit 3（用于验证 stderr 容错解码/提前退出）
 * 读 stdin 的换行分隔 JSON-RPC；initialize 回 init 结果，tools/list 回工具，其它通知忽略。
 */
const args = process.argv.slice(2)
const arg = (name, dflt) => {
  const i = args.indexOf(name)
  return i >= 0 && args[i + 1] !== undefined ? args[i + 1] : dflt
}
const toolCount = Number(arg('--tools', '2'))
if (args.includes('--fail')) {
  process.stderr.write('探针夹具：启动失败（中文 stderr，用于验证容错解码）\n')
  process.exit(3)
}
process.stdin.setEncoding('utf8')
let buffer = ''
process.stdin.on('data', (chunk) => {
  buffer += chunk
  for (;;) {
    const nl = buffer.indexOf('\n')
    if (nl < 0) break
    const line = buffer.slice(0, nl).trim()
    buffer = buffer.slice(nl + 1)
    if (!line) continue
    let msg
    try { msg = JSON.parse(line) } catch { continue }
    if (msg.method === 'initialize') {
      const reply = {
        jsonrpc: '2.0', id: msg.id,
        result: {
          protocolVersion: msg.params?.protocolVersion ?? '2025-03-26',
          capabilities: { tools: {} },
          serverInfo: { name: 'fake-mcp', version: '1.2.3' },
        },
      }
      process.stdout.write(JSON.stringify(reply) + '\n')
    } else if (msg.method === 'tools/list') {
      const tools = Array.from({ length: toolCount }, (_, i) => ({
        name: 'probe_tool_' + String(i),
        description: 'fake tool ' + String(i),
        inputSchema: { type: 'object', properties: {} },
      }))
      process.stdout.write(JSON.stringify({ jsonrpc: '2.0', id: msg.id, result: { tools } }) + '\n')
    }
  }
})
process.stdin.on('end', () => process.exit(0))
