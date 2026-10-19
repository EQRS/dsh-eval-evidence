#!/usr/bin/env node
/**
 * 独立探针 01：预设提示词组装矩阵（纯离线，只读 dist 产物）。
 *
 * 覆盖 README 的声明面：
 *   - 5 个预设（pro/play/rp/pure/pro-v1）与 base 准则的开/关组合，逐项落字数/字节/摘要；
 *   - 三层提示词：base 准则、人设积木、工作区上下文规则；
 *   - custom 模式 append / replace；off 模式忽略 custom；workspace 空文档静音降级；
 *   - Cordis Volatile .get() 解包；未知预设 key 的兜底；
 *   - README「首轮仅 1,196 tokens」的字符/字节量级读数（tokenizer 不可得 → 逐字读数，不判定）。
 *
 * 用法：node probe-01-presets.mjs --plugin <repoRoot>
 */
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'

const argv = process.argv.slice(2)
const pluginIdx = argv.indexOf('--plugin')
const plugin = pluginIdx >= 0 ? argv[pluginIdx + 1] : undefined
if (!plugin) {
  console.error('usage: node probe-01-presets.mjs --plugin <repoRoot>')
  process.exit(2)
}
const say = (...parts) => console.log(parts.join(' '))
const presets = await import(pathToFileURL(join(plugin, 'dist', 'presets.js')).href)

function metrics(text) {
  const buf = Buffer.from(text, 'utf8')
  const cjk = (text.match(/[\u3400-\u9fff\u3000-\u303f]/g) ?? []).length
  return {
    chars: text.length,
    bytes: buf.length,
    cjk,
    sha: createHash('sha256').update(buf).digest('hex').slice(0, 16),
  }
}
function brief(text, n = 40) {
  return JSON.stringify(text.replace(/\s+/g, ' ').slice(0, n))
}

say('== 探针 01：预设提示词组装（纯离线） ==')
say('plugin =', plugin)
say('exported =', JSON.stringify(Object.keys(presets)))
say('BASE_TOOL_PROTOCOL chars =', presets.BASE_TOOL_PROTOCOL.length,
  '| bytes =', Buffer.byteLength(presets.BASE_TOOL_PROTOCOL), '| cjk =', metrics(presets.BASE_TOOL_PROTOCOL).cjk)
say('WRITING_PRESET_BRICKS ids =', JSON.stringify(Object.keys(presets.WRITING_PRESET_BRICKS)))
say('WORKSPACE_RULES_HEADER =', JSON.stringify(presets.WORKSPACE_RULES_HEADER))

say('')
say('-- 1) 5 预设 × base 开/关 --')
say('preset      base  chars  bytes  cjk   sha16            声明人设段                 底座段')
for (const id of ['pro', 'play', 'rp', 'pure', 'pro-v1']) {
  for (const includeBaseProtocol of [true, false]) {
    const out = presets.assembleWritingPrompt({ activePreset: id, includeBaseProtocol })
    const m = metrics(out)
    const hasRole = out.includes('【当前职能：')
    const hasBase = out.includes('【文档与工具协作准则】')
    say(`${id.padEnd(11)} ${String(includeBaseProtocol).padEnd(5)} ${String(m.chars).padStart(6)} ${String(m.bytes).padStart(6)} ${String(m.cjk).padStart(5)}  ${m.sha}  role=${String(hasRole).padEnd(5)} base=${hasBase}`)
  }
}

say('')
say('-- 2) 默认配置（不传参数） --')
{
  const out = presets.assembleWritingPrompt()
  const m = metrics(out)
  say(`default chars=${m.chars} bytes=${m.bytes} cjk=${m.cjk} sha16=${m.sha}`)
  say('default startsWith pro role =', out.startsWith('【当前职能：职业写手】'))
  say('default includes base      =', out.includes('【文档与工具协作准则】'))
}

say('')
say('-- 3) 三层结构（人设 → 底座 → 工作区）顺序 --')
{
  const out = presets.assembleWritingPrompt({
    activePreset: 'rp', includeBaseProtocol: true, workspacePromptMode: 'workspace',
    workspaceDocs: '## AGENTS.md\n本工作区：民国上海背景',
  })
  const iRole = out.indexOf('【当前职能：全浸入式叙事与 RP 演绎】')
  const iBase = out.indexOf('【文档与工具协作准则】')
  const iWs = out.indexOf('【工作区上下文规则】')
  say('index role/base/workspace =', iRole, iBase, iWs, '| ordered =', iRole >= 0 && iRole < iBase && iBase < iWs)
  say('workspace section tail   =', brief(out.slice(iWs), 80))
}

say('')
say('-- 4) custom 模式矩阵 --')
{
  const custom = '【特别规定】严格遵守三幕剧结构。'
  const off = presets.assembleWritingPrompt({ activePreset: 'pro', includeBaseProtocol: true, workspacePromptMode: 'off', customPromptOverride: custom })
  const app = presets.assembleWritingPrompt({ activePreset: 'pro', includeBaseProtocol: true, workspacePromptMode: 'custom', customPromptBehavior: 'append', customPromptOverride: custom })
  const rep = presets.assembleWritingPrompt({ activePreset: 'pro', includeBaseProtocol: true, workspacePromptMode: 'custom', customPromptBehavior: 'replace', customPromptOverride: custom })
  say('off    includes custom =', off.includes(custom), '| chars =', off.length)
  say('append startsWith base =', app.startsWith(presets.assembleWritingPrompt({ activePreset: 'pro', includeBaseProtocol: true })), '| endsWith custom =', app.endsWith(custom), '| chars =', app.length)
  say('replace equals custom  =', rep === custom, '| chars =', rep.length)
  const offCustomEmpty = presets.assembleWritingPrompt({ activePreset: 'pro', includeBaseProtocol: true, workspacePromptMode: 'custom', customPromptOverride: '   ' })
  say('custom empty fallback  =', offCustomEmpty === presets.assembleWritingPrompt({ activePreset: 'pro', includeBaseProtocol: true }), '(custom 全空白时静默退回双层积木)')
}

say('')
say('-- 5) workspace 空文档静音降级 / 非 workspace 模式不注入 --')
{
  const empty = presets.assembleWritingPrompt({ activePreset: 'pro', includeBaseProtocol: true, workspacePromptMode: 'workspace', workspaceDocs: '' })
  say('workspace empty docs → has 工作区段 =', empty.includes('【工作区上下文规则】'), '| chars =', empty.length)
  const weird = presets.assembleWritingPrompt({ activePreset: 'pro', includeBaseProtocol: true, workspacePromptMode: 'workspace', workspaceDocs: '   ' })
  say('workspace whitespace docs → has 工作区段 =', weird.includes('【工作区上下文规则】'))
  const notWs = presets.assembleWritingPrompt({ activePreset: 'pro', includeBaseProtocol: true, workspacePromptMode: 'custom', workspaceDocs: '## AGENTS.md\n不应注入' })
  say('custom mode ignores workspaceDocs =', !notWs.includes('不应注入'))
}

say('')
say('-- 6) Cordis Volatile .get() 解包 / 未知预设兜底 --')
{
  const out = presets.assembleWritingPrompt({
    activePreset: { get: () => 'play' },
    includeBaseProtocol: { get: () => false },
    customPromptOverride: { get: () => '【volatile-custom】' },
    workspacePromptMode: { get: () => 'custom' },
    customPromptBehavior: { get: () => 'append' },
  })
  say('volatile unwrap =', out.includes('【当前职能：纯粹娱乐与灵感共谋】') && out.endsWith('【volatile-custom】') && !out.includes('【文档与工具协作准则】'), '| out tail =', brief(out.slice(-60), 60))
  say('resolveWorkspacePromptMode({workspace}) =', presets.resolveWorkspacePromptMode({ workspacePromptMode: 'workspace' }))
  say('resolveWorkspacePromptMode(volatile) =', presets.resolveWorkspacePromptMode({ workspacePromptMode: { get: () => 'custom' } }))
  const unknown = presets.assembleWritingPrompt({ activePreset: 'no-such-preset', includeBaseProtocol: false })
  say('unknown preset falls back to pro =', unknown.startsWith('【当前职能：职业写手】'))
}

say('')
say('-- 7) 五预设人设段全文摘要（各段首句） --')
for (const [id, brick] of Object.entries(presets.WRITING_PRESET_BRICKS)) {
  say(`${id.padEnd(7)} name=${JSON.stringify(brick.name)} roleChars=${brick.rolePrompt.length} first=${brief(brick.rolePrompt.split('\n')[0] ?? '', 50)}`)
  say(`         summary=${brief(brick.summary, 60)}`)
}

say('')
say('-- 8) 「首轮 1,196 tokens」量级读数（无 tokenizer，不判定 token 数） --')
{
  const out = presets.assembleWritingPrompt({ activePreset: 'pro', includeBaseProtocol: true, workspacePromptMode: 'off' })
  const m = metrics(out)
  say('pro+base chars =', m.chars, '| bytes =', m.bytes, '| cjk chars =', m.cjk, '| ascii chars =', m.chars - m.cjk)
  say('说明：本机无 DeepSeek 官方 tokenizer，无法把上述字符数换算成 token；1,196 tokens 声明未验（见报告诚实边界）。')
  say('参考：README 同段还声明「比官方标准预设节省逾 80%」——官方标准预设原文不在本机，未验。')
}

say('')
say('== probe-01 done ==')
