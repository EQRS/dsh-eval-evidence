// dsh-ppt 独立探针：clampInt / 配置默认与校验 / SKILL.md 解析 / 内置技能目录
// 运行：<node> probes/probe_dsh_ppt.mjs
import { readFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'
const m = await import('file:///D:/natnat/lingshu/外部插件/dsh-ppt/dsh-ppt-master/lib/config.js')
const s = await import('file:///D:/natnat/lingshu/外部插件/dsh-ppt/dsh-ppt-master/lib/skill.js')
const results = []
const ok = (name, cond, detail = '') => results.push({ name, pass: !!cond, detail })

// 1. clampInt
ok('clampInt 越界夹到上限', m.clampInt(99, 10, 1, 60) === 60, String(m.clampInt(99, 10, 1, 60)))
ok('clampInt 越界夹到下限', m.clampInt(0, 10, 1, 60) === 1, String(m.clampInt(0, 10, 1, 60)))
ok('clampInt 非数字回退', m.clampInt('x', 10, 1, 60) === 10, String(m.clampInt('x', 10, 1, 60)))
ok('clampInt NaN 回退', m.clampInt(NaN, 10, 1, 60) === 10, String(m.clampInt(NaN, 10, 1, 60)))
ok('clampInt 小数截断', m.clampInt(3.9, 10, 1, 60) === 3, String(m.clampInt(3.9, 10, 1, 60)))

// 2. 配置
const cfg = m.resolvePptConfig({})
ok('resolvePptConfig 默认 maxSlides=60', cfg.maxSlides === m.DEFAULT_MAX_SLIDES, JSON.stringify(cfg).slice(0, 220))
let badTheme = false
try { m.resolvePptConfig({ defaultTheme: 'neon' }) } catch { badTheme = true }
ok('非法 defaultTheme 抛错', badTheme)
let badType = false
try { m.resolvePptConfig([]) } catch { badType = true }
ok('数组配置抛错', badType)

// 3. SKILL.md 解析
const withFm = '---\nname: dsh-ppt\ndescription: 演示文稿生成\n---\n\n# body\n'
const parsed = s.parseSkillFile(withFm)
ok('parseSkillFile 解析 name/description', parsed.name === 'dsh-ppt' && parsed.description === '演示文稿生成', JSON.stringify(parsed).slice(0, 160))
const noFm = s.parseSkillFile('# no frontmatter\n')
ok('无 frontmatter 时 name 为空且保留正文', noFm.name === '' && noFm.content.includes('no frontmatter'), JSON.stringify(noFm).slice(0, 120))

// 4. 内置技能目录
const dir = s.bundledSkillsDir()
ok('bundledSkillsDir 存在', existsSync(dir), dir)
const skillMd = join(dir, 'dsh-ppt', 'SKILL.md')
ok('内置 SKILL.md 可解析出 name', existsSync(skillMd) && s.parseSkillFile(readFileSync(skillMd, 'utf8')).name !== '', skillMd)
ok('SKILL_NAMES 只含 dsh-ppt', JSON.stringify(s.SKILL_NAMES) === JSON.stringify(['dsh-ppt']), JSON.stringify(s.SKILL_NAMES))

const failed = results.filter(r => !r.pass)
console.log(JSON.stringify({ total: results.length, failed: failed.length, results }, null, 1))
process.exit(failed.length ? 1 : 0)
