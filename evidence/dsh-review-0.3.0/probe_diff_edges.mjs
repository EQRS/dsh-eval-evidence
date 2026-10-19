#!/usr/bin/env node
// probe_diff_edges.mjs — 独立探针 B：统一 diff 解析的边界（不依赖被测仓任何 test/fixture）。
//
// 覆盖 diff.ts 里可机械判定的声明（该模块无 I/O，纯字符串解析）：
//   D1 多文件 / hunk 行号 / 增删计数 / 状态识别
//   D2 二进制变更被标记（README：文字审查不认证二进制内容 → 靠这个标记在把关处拒放）
//   D3 重命名与复制保留 oldPath
//   D4 Git 引号路径（八进制 UTF-8 / 转义）被正确解码；非法转义要报错而不是猜
//   D5 `\ No newline at end of file` 被跳过；CRLF 输入同样可解析
//   D6 不认识的 `diff --git` 头把 complete 置 false（上层据此报「审查未完成」）
//   D7 空上下文行（单空格）不被当成空行；contextAround 按行号取回
//
// 用法：node probes/probe_diff_edges.mjs --pkg worktree/pkg --out raw/41-probe-diff-edges.txt
import { mkdirSync, writeFileSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

const argv = process.argv.slice(2)
const opt = (name, fallback) => { const i = argv.indexOf(name); return i >= 0 ? argv[i + 1] : fallback }
const out = opt('--out', '')
const pkg = resolve(opt('--pkg', '.'))
const { parseDiff, gitPath, contextAround } = await import(pathToFileURL(join(pkg, 'lib', 'diff.js')).href)

const lines = []
const results = []
const say = (t = '') => { lines.push(t); console.log(t) }
const reading = (t) => say(`      ${t}`)
const ok = (cond, label, detail = '') => {
  results.push([Boolean(cond), label, detail])
  say(`${cond ? 'PASS' : 'FAIL'}  ${label}${cond || !detail ? '' : `  -- ${detail}`}`)
}

say('== probe_diff_edges.mjs ==')
say(`pkg  = ${pkg}`)
say(`node = ${process.version}`)
say()

// ── D1: 两个文件、三个 hunk，行号与计数 ──────────────────────────────────
say('---- D1. multi-file diff, hunk line numbers and counts ----')
const multi = [
  'diff --git a/src/a.js b/src/a.js',
  'index 1111111..2222222 100644',
  '--- a/src/a.js',
  '+++ b/src/a.js',
  '@@ -1,4 +1,5 @@',
  ' const keep = 42',
  '-const old = 1',
  '+const added1 = 2',
  '+const added2 = 3',
  ' const tail = 4',
  ' const tail2 = 5',
  'diff --git a/docs/b.md b/docs/b.md',
  'index 3333333..4444444 100644',
  '--- a/docs/b.md',
  '+++ b/docs/b.md',
  '@@ -10,2 +10,1 @@',
  '-removed line',
  ' kept line',
  '',
].join('\n')
const parsedMulti = parseDiff(multi)
reading(`files=${parsedMulti.files.length} added=${parsedMulti.added} removed=${parsedMulti.removed} complete=${parsedMulti.complete}`)
ok(parsedMulti.files.length === 2, 'D1 both file sections are parsed')
ok(parsedMulti.complete === true, 'D1 a well-formed git diff is marked complete')
ok(parsedMulti.added === 2 && parsedMulti.removed === 2, 'D1 add/remove counts aggregate across files', `added=${parsedMulti.added} removed=${parsedMulti.removed}`)
const a = parsedMulti.files[0]
ok(a.path === 'src/a.js' && a.status === 'modified', 'D1 first file path + modified status')
const hunk = a.hunks[0]
reading(`hunk header=${JSON.stringify(hunk.header)} oldStart=${hunk.oldStart} newStart=${hunk.newStart}`)
ok(hunk.oldStart === 1 && hunk.newStart === 1, 'D1 hunk start lines come from the @@ header')
const addLine = hunk.lines.find(l => l.type === 'add')
const delLine = hunk.lines.find(l => l.type === 'del')
const ctxLine = hunk.lines.find(l => l.type === 'ctx')
reading(`add: oldNo=${addLine.oldNo} newNo=${addLine.newNo}; del: oldNo=${delLine.oldNo} newNo=${delLine.newNo}; ctx: oldNo=${ctxLine.oldNo} newNo=${ctxLine.newNo}`)
ok(addLine.newNo === 2 && addLine.oldNo === null, 'D1 an added line gets the new line number and no old number (newNo=2)')
ok(delLine.oldNo === 2 && delLine.newNo === null, 'D1 a deleted line keeps the old line number only (oldNo=2)')
ok(ctxLine.oldNo === 1 && ctxLine.newNo === 1, 'D1 a context line carries both numbers')
const b = parsedMulti.files[1]
reading(`second file: path=${b.path} added=${b.added} removed=${b.removed}`)
ok(b.path === 'docs/b.md' && b.removed === 1, 'D1 second file is attributed its own counts')

// ── D2: 二进制 ─────────────────────────────────────────────────────────
say('')
say('---- D2. binary changes ----')
const binary = parseDiff(['diff --git a/img.png b/img.png', 'index 1..2 100644', 'Binary files a/img.png and b/img.png differ', ''].join('\n'))
reading(`binary files=${binary.files.length} binary=${binary.files[0]?.binary}`)
ok(binary.files[0]?.binary === true, 'D2 "Binary files ... differ" marks the file as binary')
const binaryPatch = parseDiff(['diff --git a/x.bin b/x.bin', 'GIT binary patch', 'literal 12', 'zcmZ?wbhEHb', ''].join('\n'))
reading(`GIT binary patch -> binary=${binaryPatch.files[0]?.binary}`)
ok(binaryPatch.files[0]?.binary === true, 'D2 a GIT binary patch section is marked binary too')

// ── D3: 重命名 / 复制 / 新增 / 删除 ─────────────────────────────────────
say('')
say('---- D3. rename / copy / add / delete status ----')
const statuses = [
  ['added', ['diff --git a/n.txt b/n.txt', 'new file mode 100644', 'index 0000000..1111111', '--- /dev/null', '+++ b/n.txt', '@@ -0,0 +1 @@', '+hello', '']],
  ['deleted', ['diff --git a/d.txt b/d.txt', 'deleted file mode 100644', 'index 1111111..0000000', '--- a/d.txt', '+++ /dev/null', '@@ -1 +0,0 @@', '-bye', '']],
  ['renamed', ['diff --git a/old.txt b/new.txt', 'similarity index 100%', 'rename from old.txt', 'rename to new.txt', '']],
  ['copied', ['diff --git a/src.txt b/copy.txt', 'similarity index 100%', 'copy from src.txt', 'copy to copy.txt', '']],
]
for (const [expected, rawLines] of statuses) {
  const parsed = parseDiff(rawLines.join('\n'))
  const file = parsed.files[0]
  reading(`${expected}: status=${file?.status} path=${file?.path} oldPath=${file?.oldPath}`)
  ok(file?.status === expected, `D3 ${expected} status detected`)
}
{
  const renamed = parseDiff(statuses[2][1].join('\n')).files[0]
  ok(renamed.oldPath === 'old.txt' && renamed.path === 'new.txt', 'D3 rename keeps both the old and the new path')
}

// ── D4: 引号路径（八进制 UTF-8、转义、非法） ─────────────────────────────
say('')
say('---- D4. quoted Git paths ----')
const utf8Quoted = 'diff --git "a/\\346\\226\\207.md" "b/\\346\\226\\207.md"'
reading(`quoted octal header -> ${JSON.stringify(parseDiff(utf8Quoted + '\n').files[0]?.path)}`)
ok(parseDiff(utf8Quoted + '\n').files[0]?.path === '文.md', 'D4 octal-escaped UTF-8 path decodes to 文.md')
reading(`gitPath("\\"a/tab\\\\tname\\"") -> ${JSON.stringify(gitPath('"a/tab\\tname"'))}`)
ok(gitPath('"a/tab\\tname"') === 'a/tab\tname', 'D4 the \\t escape becomes a real tab')
let badEscape = null
try { gitPath('"a/x\\q"') } catch (error) { badEscape = String(error.message) }
reading(`invalid escape -> ${badEscape}`)
ok(/Invalid Git path escape/.test(String(badEscape)), 'D4 an invalid escape throws instead of guessing')
let unterminated = null
try { gitPath('"a/unterminated') } catch (error) { unterminated = String(error.message) }
ok(/Incomplete quoted Git path/.test(String(unterminated)), 'D4 an unterminated quoted path throws')
ok(gitPath('a/plain path.txt') === 'a/plain path.txt', 'D4 an unquoted path is returned untouched')

// ── D5: 无换行标记 / CRLF ──────────────────────────────────────────────
say('')
say('---- D5. no-newline marker and CRLF input ----')
const noNewline = ['diff --git a/x.txt b/x.txt', '--- a/x.txt', '+++ b/x.txt', '@@ -1 +1 @@', '-old', '\\ No newline at end of file', '+new', '\\ No newline at end of file', ''].join('\n')
const parsedNoNewline = parseDiff(noNewline)
reading(`no-newline markers: lines=${parsedNoNewline.files[0]?.hunks[0]?.lines.length} added=${parsedNoNewline.files[0]?.added} removed=${parsedNoNewline.files[0]?.removed}`)
ok(parsedNoNewline.files[0]?.hunks[0]?.lines.length === 2, 'D5 the "\\ No newline" markers are not counted as diff lines')
ok(parsedNoNewline.files[0]?.added === 1 && parsedNoNewline.files[0]?.removed === 1, 'D5 add/remove counts unaffected by the markers')
const crlf = ['diff --git a/x.txt b/x.txt', '--- a/x.txt', '+++ b/x.txt', '@@ -1 +1 @@', '-old', '+new', ''].join('\r\n')
const parsedCrlf = parseDiff(crlf)
reading(`CRLF input: files=${parsedCrlf.files.length} added=${parsedCrlf.added} text=${JSON.stringify(parsedCrlf.files[0]?.hunks[0]?.lines.map(l => l.text))}`)
ok(parsedCrlf.files.length === 1 && parsedCrlf.added === 1 && parsedCrlf.files[0].hunks[0].lines[1].text === 'new',
   'D5 CRLF diff input parses with no stray \\r left in line text')

// ── D6: 未知头 → complete=false ────────────────────────────────────────
say('')
say('---- D6. unknown diff header => complete=false ----')
const unknownHeader = parseDiff(['diff --git weird-header-without-ab', 'index 1..2', ''].join('\n'))
reading(`complete=${unknownHeader.complete} files=${unknownHeader.files.length}`)
ok(unknownHeader.complete === false, 'D6 an unrecognised "diff --git" header marks the parse incomplete (caller must report 未完成)')

// ── D7: 空上下行 / contextAround ───────────────────────────────────────
say('')
say('---- D7. empty context line and contextAround ----')
const withEmptyCtx = ['diff --git a/x.txt b/x.txt', '--- a/x.txt', '+++ b/x.txt', '@@ -1,3 +1,3 @@', ' first', ' ', '-old', '+new', ' last', ''].join('\n')
const parsedEmpty = parseDiff(withEmptyCtx)
const emptyCtx = parsedEmpty.files[0].hunks[0].lines.find(l => l.type === 'ctx' && l.text === '')
reading(`an empty context line is kept as ctx with text "" -> ${emptyCtx !== undefined}`)
ok(emptyCtx !== undefined && emptyCtx.oldNo === 2, 'D7 a single-space context line is a real ctx line (oldNo=2), not dropped')
const around = contextAround(parsedMulti.files[0], 3, 1)
reading(`contextAround(a.js, line=3, radius=1) -> ${around.length} 行: ${JSON.stringify(around.map(l => `${l.type}:${l.newNo ?? l.oldNo}:${l.text}`))}`)
ok(around.length === 3, 'D7 contextAround returns the requested window around the line')
ok(contextAround(parsedMulti.files[0], 999, 1).length === 0, 'D7 a line outside the hunks returns no context')

// ── 汇总 ───────────────────────────────────────────────────────────────
const failed = results.filter(([good]) => !good)
say('')
say(`== ${results.length - failed.length}/${results.length} assertions passed ==`)
for (const [, label, detail] of failed) say(`   FAILED: ${label}${detail ? '  -- ' + detail : ''}`)
if (out) {
  const text = lines.join('\n') + '\n\n== assertions ==\n'
    + results.map(([good, label, detail]) => `${good ? 'PASS' : 'FAIL'}  ${label}${good || !detail ? '' : '  -- ' + detail}`).join('\n')
    + `\n\n${results.length - failed.length}/${results.length} assertions passed\n`
  mkdirSync(resolve(out, '..'), { recursive: true })
  writeFileSync(out, text, 'utf8')
  console.log(`\nwritten: ${out}`)
}
process.exit(failed.length === 0 ? 0 : 1)
