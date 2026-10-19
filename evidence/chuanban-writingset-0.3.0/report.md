[intake 输入] 【测评报告】chuanban-dsh-writingset 0.3.0 体验快测（写作套装 / 工作流 · 方法试验）

<!-- intake:v1 {"project":"bench","difficulty":"medium","impact":"B","target":"Anarcadia/chuanban-dsh-writingset","form":"intake"} -->

<!-- 协议对齐：工程协议手册 v1.1（r2）§6 体验快测档；协议文件 sha256 8dd51cbf75b259c5dabfdb928eb112364231b5d8f9f580759534e5d78a34d849 -->
> **协议对齐（v1.1 · r2 · 体验快测档）**：本件是**体验快测**（手册 §6），只记录安装/功能点/卸载残留类检查结果；
> **不生成五种能力状态标签、不进入能力榜、不以「通过/合格」作为插件结论**；未覆盖项见「诚实边界」。
> - **协议绑定**：`工程协议手册-v1.1`（修订标识 r2），文件 sha256 `8dd51cbf75b259c5dabfdb928eb112364231b5d8f9f580759534e5d78a34d849`（快照 `测试/协议/`）。
> - **插件身份**：源码版（commit + 逐文件树指纹）或发布包版（版本 + 哈希），见「锚定提交」。
> - **环境配置 ID**：dsh 0.2.1-rc.2 / win32-x64 / Windows 10.0.26200 / node v24.21.0 / model=n/a（本快测未调用模型）/ 依赖与外部服务见「环境与基线」。
> - **安全口径（§4 三分法）**：本件**未做**六威胁安全审计 ⇒ 安全结论 = **未测**（不是「未发现问题」，也不是「已验证通过」）。
> - **时效（§13.7）**：测评完成后 90 个自然日内有效；版本/权限/数据流/依赖/宿主变化触发复核，旧报告不自动适用于新版本。


## 性质声明

本件是 **intake 输入**（外部贡献申报），不是悬赏：**不执行 claim、不自行加 bounty 标签**。本件为
**review.lingshulab.com 主创测评站投稿**——站点当前对 `chuanban-dsh-writingset` 显示「暂无评测」
（清单版本 **0.3.0**，本站评测数 0，2026-10-18 读数，见 `raw/10-probe06-version.txt`）。计分与档位由维护者裁定。

- **四态边界**：下文每条面向声明均落在「已验 / 未验 / 不确定 / 不做」四态之一；未跑的项目如实写「未验」，不把未验写成已验。
- **只跑 Windows**：本机 Windows 11 Home China（`10.0.26200`）x64 单平台；**WSL / Linux / macOS 未跑**，不对这些平台下结论（README 与测试里出现 macOS 专属命令，见 P2-1）。
- **不排名、不给总分、不用星级**：只给逐项读数与 P 级发现；P 级按「不做会怎样」分级，不代表总体评分。
- **不装 live profile**：插件**没有**装进任何正在使用的 DSH profile（live profile 只读核对：`chuanban` 命中 **0**，见 `raw/02-env-baseline.txt`）。全部读数来自**仓库副本**（构建/测试在 `%TEMP%` 的副本里跑）+ **独立探针**（临时目录夹具）+ **本机 DSH 安装目录 `app.asar` 的只读静态解析**。
- **不可复现的 README 声明如实标注**：`1,196 tokens`、`比官方标准预设节省逾 80%`、`与 Storydesk 工作台内核等效` 三项本机无法复现，列入「未验」（见「诚实边界」）。

## 锚定提交

- 被测包：`chuanban-dsh-writingset`，声明版本 **0.3.0**（`package.json`）。
- 上游仓：`Anarcadia/chuanban-dsh-writingset`，锚定 commit **`aa34ea9daa937d09c1f26520bf0a82eb9d2b7209`**（提交时间 **2026-10-18T03:05:29Z**，提交信息 `chore: release v0.3.0`，GitHub tree sha `3f3563bc0d1d43c67cd48f724797cdb0fed6d610`，父提交 `ecc9898e…`）。经 `gh-proxy.com` 复核 commit API、releases API 与两种 tarball，落盘 `raw/00-anchor-upstream.txt`、`raw/00-upstream-commit.json`、`raw/00b-upstream-repo.json`、`raw/00c-upstream-releases.json`。
- **tarball 双路锚定**（`raw/00-anchor-upstream.txt`）：
  - 任务给定 sha256 **`63e2a435cbc5636def22e2dadf2e9814a0da189792d8fc1de4879715cdf057be`** 实际对应 **`main` 分支 tarball**（1,321,721 B，本机重取一致）；解包后 20 个文件、树指纹与本地源码**完全一致**（`raw/01b-anchor-main-tarball.txt`）。
  - **commit** tarball 为 1,321,764 B / sha256 `18ea24d24f9b08786ba63a61d577118fb0faba2c77de32a4e31994401e09b7e1`，与 main tarball 仅顶层目录名不同（`chuanban-dsh-writingset-main` vs `chuanban-dsh-writingset-aa34ea9…`）；解包后同样 **20/20 文件逐字节等于本地源码**（`raw/01-anchor.txt`）。
  - ⇒ 本地解包源码可视为该 commit 的精确快照。
- **本地源码树（无 `.git`）逐字节锚**（`raw/01-anchor.txt`）：

| 范围 | 文件数 | 字节 | 树指纹（sha256） |
|---|---:|---:|---|
| 整棵树 | 20 | 1,553,395 | `26c4b36b4b693c626bfb4033500b5d31aafaf116b16df41bc100b0da9fb3fce8` |
| `src/` | 5 | 57,614 | `3bb163ace2e78a403d0857ba55a3d200f1a67aa6f6c1e5de8810e0980391be69` |
| `dist/` | 5 | 61,051 | `373b616247268d7fe6a553c8586441209178dc20403228e4c4260e21331198c1` |
| `scripts/` | 3 | 6,090 | `06938ef8355debda7bd18c8de1131895324ec7b9545bd032554d3b50e5ec04cf` |
| `tests/` | 1 | 40,803 | `9e649a3625a6ed997411048bea7e1f81aa6ecf03b68c7be70619098b69520988` |
| `docs/`（仅 2 张截图） | 2 | 1,355,138 | `056b8e4ca79246c78b5ddf35969534fdb64183459bc7fa2af9d464712793c200` |

- 关键文件 sha256：`package.json` = `083fa74ffa904740adc15fe2cb301450ab3050de0889922ba8c6d7ddd1aecbbb`；`cordis.patch.yml` = `fcbf7dd2045c39c565bd4e28c54c82932cb3c113a16dbfc4d88e9da8f63ae642`（16,109 B）；`README.md` = `a62c0f0fc843d29239b5783d71af7cab2749abeb26c73bd810fff85e6020d121`（14,936 B）。**无 tsconfig / lockfile / CHANGELOG / LICENSE**（`raw/01-anchor.txt`）。全部操作结束后复算被测源码树：20 文件 / 1,553,395 B / `26c4b36b…` **不变**（`raw/01c-anchor-post.txt`）——本轮没有改动被测源码。
- **发布包锚定**（`raw/03b-probe-build.txt`、`raw/10-probe06-version.txt`）：GitHub Release **v0.3.0** 资产 `chuanban-dsh-writingset.tgz` = **47,287 B**，sha256 **`243b494f628fced563643f7d29bc479b1cccc7c22ad29764afcf84695ca5b70d`**（`raw/artifacts/` 已存一件）；解包 13 个文件（`README.md`、`package.json`、`cordis.patch.yml`、`dist/`×5、`src/`×5），其 `dist/*.js`、`package.json`、`cordis.patch.yml`、`README.md`、`src/*` 与仓库副本**逐字节相同**（13/13 `equal=true`）。README 的安装 URL（`releases/latest/download/...tgz`）经 `gh-proxy.com` 只读下载 **HTTP 200 / 47,287 B / sha256 相同**。
- **版本面一致**：`package.json` 0.3.0 = Release tag `v0.3.0` = 站点清单版本 0.3.0（站点「资料同步 2026/10/18 22:44 / 仓库更新 2026/10/18 16:45 / 上游状态 可访问」）。本件结论只覆盖上述树指纹的 **0.3.0 快照**。

## 环境与基线

| 项 | 读数 | 证据 |
|---|---|---|
| 操作系统 | Windows 11 Home China，`10.0.26200`，x64；机器名 `bbs` | `raw/02-env-baseline.txt` |
| 宿主 | DeepSeek Harness **0.2.1-rc.2**（只读解析 `app.asar` 归档头：`@deepseek-ai/dsh-desktop@0.2.1-rc.2`，`dshBuildCommit=332895e0f7c9d4dbfb29729f5eb367fa263ff986`） | 同上 |
| Node | **v24.21.0**（DSH 自带：`…\.dsh\dsh-runtimes\dsh-primary-runtime\dependencies\node\bin\node.exe`） | 同上 |
| pnpm | `pnpm --version` = **11.28.5**（用 node 跑 `…\pnpm\bin\pnpm.mjs`；本轮被测件**不需要 install**——零依赖、无 lockfile） | 同上 |
| Python | **3.12.10**（DSH 自带运行时，含 `python-docx 1.2.0`，用于 Word 产物第三方校验） | 同上 |
| 其他工具 | 有 `tar` / `curl` / `wsl`；**`git` / `npm` / `pnpm` / `bash` 不在 PATH** | 同上 |
| 网络 | `review.lingshulab.com` HTTP 200；`gh-proxy.com` HTTP 200；`registry.npmjs.org/chuanban-dsh-writingset` **404**（该件不发 npm，只发 GitHub Release） | 同上 |
| 宿主包契约 | `app.asar` 内 **320 个 `@deepseek-ai/*` 包**；`cordis.patch.yml` 引用的 9 个包（含 `dsh-tool-fs-search` 0.2.1-rc.2）**全部 present**；persona 的 `prefix/complete/includeRuntimeContext`、tool-fs 的 read/write/edit 与 read_image 门控、fs-search 的 glob/grep、agent-preset 的 id/name/description/order/plugins、preset-registry 的 default、cordis core 的 isolate、loader 的 insert/disabled **均在宿主产物中命中** | `raw/09-probe05-host-contract.txt` |
| live profile 插件面 | profile `desktop`：7 个 bundle + `@dsh-external/dsh-vibe-island`；**`chuanban` 在 profile 文本中命中 0**（未安装） | `raw/02-env-baseline.txt` |
| 被测件基线 | 仓库副本（非 live）：`src/ dist/ scripts/ tests/ docs/` + 4 个根文件，共 20 文件 / 1,553,395 B；无 `node_modules` | `raw/01-anchor.txt` |

> **基线口径**：本件是「**源码快照 + 自带测试门 + 纯函数/工具层探针 + 宿主契约静态核对 + 发布包解包比对**」，**不是**「装进 DSH 后的端到端体验」，也不是真实模型写作效果评估；后两者全部列入「未验」。

## 结果速览

| 面 | 结果 | 证据 |
|---|---|---|
| 锚定 | 本地源码 20/20 文件逐字节等于 **commit tarball** 与 **main tarball**；整树指纹 `26c4b36b…` | `raw/01-anchor.txt`、`raw/01b-anchor-main-tarball.txt` |
| 发布包 | Release v0.3.0 47,287 B / sha `243b494f…`；13 个文件与仓库 dist/src/package.json **逐字节相同**；无需依赖 | `raw/03b-probe-build.txt`、`raw/10-probe06-version.txt` |
| `npm run build` | **exit 0**，180 ms，`built dist/client.js (12856 bytes)`；`dist/` **零变化**（重建产物与提交产物逐字节相同），二次构建幂等 | `raw/03-build.txt`、`raw/03b-probe-build.txt` |
| 构建覆盖 | ⚠ 只重建 `dist/client.js`；`dist/index.js` / `presets.js` / `file-butler.js` / `doc-bridge.js` **无任何构建脚本生成**（无 tsconfig/tsc） | `raw/03b-probe-build.txt` |
| 自带测试门（7 项） | **6/7 通过**：默认 PATH（无 `node`）时在 Test 4 失败；补 `node` 到 PATH 后 Test 1–6 通过，**Test 7 因 `textutil`（macOS 专属）缺失失败**，runner exit 1 | `raw/04-self-test.txt`、`raw/04b-self-test-node-on-path.txt` |
| 探针 01：预设组装 | 5 预设 × base 开/关矩阵、custom append/replace、off 忽略、workspace 降级、Volatile 解包、未知预设兜底**全部符合声明**；pro+base = 662 chars / 1,690 B / 490 CJK | `raw/05-probe01-presets.txt` |
| 探针 02：工作区扫描 | 顺序 `AGENTS→CLAUDE(去重)→memory.md→memory/*.md→rules.md→rules/*.md`、只读 `.md`、缺失静音、**64KB 截断**（65,596 B 含 60 B 说明、50 ms、无 U+FFFD、截断后不再拼后续文件）、cwd 注入与 off 不读盘**均符合声明** | `raw/06-probe02-workspace.txt` |
| 探针 03：file-butler | 4 工具注册与契约；copy 逐字保真/默认防覆盖/overwrite/目录树；move 防覆盖/目录目标/自身子目录防御；stat 字段；trash 同毫秒防碰撞、内容可恢复、落在 `%USERPROFILE%\.Trash`；产物无 shell 通道 | `raw/07-probe03-file-butler.txt` |
| 探针 04：doc-bridge | md→docx **被第三方 python-docx 成功解析**（5 zip 条目、19 段、Heading 1–6、List Paragraph 列表）；双向防覆盖；docx→md 往返；第三方 python-docx docx 可转；非法输入报错；OOXML 边缘 OK | `raw/08-probe04-doc-bridge.txt`、`raw/docx-artifacts/` |
| 探针 05：宿主契约 | 9 个引用包全 present；配置键/工具名/isolate/insert/disabled 全部在宿主产物命中 | `raw/09-probe05-host-contract.txt` |
| 探针 06：版本/站点/安装 | 站点清单 0.3.0、**暂无评测**、上游可访问；Release 下载 200 且 sha 相同 | `raw/10-probe06-version.txt` |
| 探针 07：客户端面板 | lazy-CJS 加载、5 预设选项、`settings.section`(order 25) 与 `plugins.item`(order 50) 双注册、完整视图 8 按钮、custom 才渲染 textarea、预览含底座准则 | `raw/11-probe07-client.txt` |
| 查重 | 账本 **595** 事件命中 0；review 子站数据 0 entry；dsh-bounty 全仓 378 文本文件命中 0；站点 0 篇评测 | `raw/20-dedupe.txt` |
| 发现 | **2 × P2 + 4 × P3，无 P0/P1** | 见下节 |

## 逐项读数

### 1. 锚定、发布包与上游（`raw/00`、`raw/01`、`raw/01b`、`raw/03b`）

```text
local tree   : 20 files / 1,553,395 B / 26c4b36b4b693c626bfb4033500b5d31aafaf116b16df41bc100b0da9fb3fce8
commit tarball: 1,321,764 B / 18ea24d2… / 解包 20 files / fingerprint 相同 / contentDiff=[]
main   tarball: 1,321,721 B / 63e2a435…（= 任务给定 sha）/ 解包 20 files / fingerprint 相同
release v0.3.0: 47,287 B / 243b494f628fced563643f7d29bc479b1cccc7c22ad29764afcf84695ca5b70d
  package.json 0.3.0 | tag v0.3.0 | 站点清单 0.3.0 | 站点「暂无评测」
  release 内 13 文件：README/package.json/cordis.patch.yml + dist×5 + src×5；dist/src/package.json 13/13 与仓库逐字节相同
  release 内不含 scripts/、tests/（package.json "files" = ["dist","cordis.patch.yml","src"]）
```

### 2. 构建（`raw/03`、`raw/03b`）

```text
build #1 : exit 0, 180 ms, "built dist/client.js (12856 bytes)"
dist 变化: (none — 构建前后 dist/ 逐字节相同)
client.js: built=f43b4b3505831d26… committed=f43b4b3505831d26… identical=true
build #2 : (none — 幂等)
scripts/ : ["build-client.mjs","install-desktop.sh","switch-preset.mjs"]
dist/    : ["client.js","doc-bridge.js","file-butler.js","index.js","presets.js"]
tsconfig / tsup / rollup / esbuild / vite 配置: 全部 missing
只有 dist/client.js 由构建脚本写出；index/presets/file-butler/doc-bridge 无生成脚本
```

### 3. 自带测试门（`raw/04`、`raw/04b`）

```text
# 默认环境（node 不在 PATH）
[Test 1..3] 通过 → [Test 4] 失败：execSync(`node .../switch-preset.mjs --list`) → "'node' 不是内部或外部命令"；runner exit 1

# 把 DSH 自带 node 加进 PATH 后重跑
Test 1 通过 / Test 2 通过 / Test 3 通过 / Test 4 通过 / Test 5 通过 / Test 6 通过
Test 7 失败：execSync(`textutil -convert txt -stdout "...story.docx"`) → "'textutil' 不是内部或外部命令"
runner exit 1（Test 7 共 2 处 textutil 调用，:641 与 :662；Test 4/5/6 共 4 处 execSync(`node …`)）
```

### 4. 探针 01：预设提示词组装（`raw/05`）

```text
BASE_TOOL_PROTOCOL = 426 chars / 992 B / 268 CJK
预设矩阵（chars/bytes）：
  pro+base 662/1690 | pro 234/696 | play+base 558/1382 | play 130/388
  rp+base 644/1548  | rp 216/554  | pure+base 426/992 | pure(无底座) 0/0
  pro-v1+base 627/1589 | pro-v1 199/595
默认配置=pro+base（662 chars）；三层顺序 role(0) → base(218) → workspace(646) ordered=true
custom: off 忽略自定义；append=680 chars 且 endsWith 自定义；replace=16 chars（整段替换）
workspace 空/全空白 docs → 无「工作区上下文规则」段（静音降级）；custom 模式忽略 workspaceDocs
Volatile .get() 解包=true；未知预设 key → 兜底 pro
「1,196 tokens」：pro+base 662 chars / 1,690 B / 490 CJK——本机无官方 tokenizer，不判定 token 数
```

### 5. 探针 02：工作区文档扫描（`raw/06`）

```text
[A] 6 段顺序：AGENTS.md(0) → memory.md(33) → memory/a.md(61) → memory/b.md(98) → rules.md(130) → rules/z.md(157)
    CLAUDE.md 同内容去重=true；rules/ignored.txt 不被读取；不同内容时 AGENTS 与 CLAUDE 都在且顺序正确
[B] 空目录/无 cwd/空串 cwd/不存在目录 → 均返回 ""（静音降级）
[C] 2 MB 多字节+emoji → 注入 65,596 B（上限 65,536 + 60 B 截断说明）/ 50 ms / 无 U+FFFD / 不含截断后的后续文件
[D] provider({agent.session.header.cwd}) → 含工作区段（864 chars）；无 cwd → 静音降级；off 模式即使有 cwd 也不读盘
[E] loader/volatile-update → system-prompt/change 触发 1 次
```

### 6. 探针 03：file-butler（`raw/07`）

```text
注册：copy_file / move_file / stat_file / trash_file；parameters.type=object、output.schema.type=object、render→[{type:'text'}]
copy  : 内容逐字保真（sha 相同）；未传 overwrite → EEXIST 报错；overwrite:true 覆盖成功；目录树复制含 nested
copy  : 目录复制进自身子目录 → 明确报错
move  : 源消失/内容保真；目标已存在未传 overwrite → EEXIST；目标是已存在目录 → 自动拼成 archive/c.md
move  : 移入自身子目录 → 明确报错
stat  : size_bytes/created/modified ISO/is_directory 均正确（文件与目录）
trash : 两次同毫秒同名 → 路径不同（…c.md.2026-10-18T14-59-18-325 / …-327），均在 %USERPROFILE%\.Trash 下，内容仍可读
trash : 不存在文件 → ENOENT；空路径 → "file_path must be a non-empty string"
dist/file-butler.js 中 child_process / spawn( / execSync / exec( / shell: / cmd.exe / powershell 全部 = false
```

### 7. 探针 04：doc-bridge（`raw/08`、`raw/docx-artifacts/`）

```text
export  : story.md → story.docx，5,989 B；zip 5 条目 / testzip=None
          第三方 python-docx：19 段，Heading 1–6 各 1 段，List Paragraph×3、Normal、表格 0
          document.xml：控制符 U+000B/U+000C 被剥除；非法控制符检测=false
          防覆盖：第二次 → story.exported.docx（6,109 B），原 story.docx 一字节未动；第三次 → story.exported-2.docx
convert : story.docx → story.converted.md（characters=231）；原 story.md 未被覆盖；第二次 → .converted-2.md
          长文档（>600 chars）preview 触发「…（已截断，全文见输出文件）」
第三方 docx → 插件 convert：python-docx 生成的 37,087 B docx 可转，H1/H2 识别、4 个表格单元格拍平为 4 行正文
          但 List Bullet（样式层编号）列表转换后 "- " 行数 = 0（文本仍在正文）→ 见 P3-3
非法输入：纯文本冒充 .docx → "not a valid zip/docx container (missing EOCD)"；空 zip → "no word/document.xml"
边缘：大写 Heading 2 样式 → level 2；w:br 软回车合并 + &#x2014; 解码；numId=0 不误判列表；孤立代理实体不产生非法码点
静态：dist/doc-bridge.js 仅用 node:zlib / node:fs / node:path 等内置模块，无 child_process
```

### 8. 探针 05：宿主契约静态核对（`raw/09`）

```text
宿主包（全部 0.2.1-rc.2，cordis-plugin-group 1.0.5，cordis 4.0.5）：
  dsh-persona / dsh-tool-fs / dsh-fs-local / dsh-tool-fs-search / dsh-agent-preset /
  dsh-agent-preset-registry / dsh-compaction-basic / dsh-command-compact
persona：prefix / complete / includeRuntimeContext 命中
tool-fs：read/write/edit 工具名命中；read_image 与 attachments 命中（read_image 由 attachments 门控）
tool-fs Config 键：readLimit / readMaxLineLength / readMaxBytes / readStreamMinSize
fs-search：glob / grep / sampleOverCapGlobResults 命中
agent-preset：id/name/description/order/plugins 命中；preset-registry：default 命中
cordis core：isolate 命中（cordis-plugin-group 本体只是 re-export）
loader/patch：cordis-plugin-loader 命中 disabled/patch；dsh-app-boot 与 dsh 命中 insert/disabled
```

### 9. 探针 06：版本面 / 站点 / 安装通道（`raw/10`）

```text
package.json 0.3.0 / license MIT / author 船板；repository=Anarcadia/chuanban-dsh-writingset
README 14,936 B；含「7 项」true、「1,196 tokens」true、「节省逾 80%」true；引用两张截图均存在
docs/ 仅 2 张截图；CHANGELOG.md / LICENSE / docs/USAGE.md 均 missing
tests/verify-bundle.mjs Test 标号 [1..7]、通过标号 [1..7]（声明「7 项」对得上）；textutil 出现 5 次、execSync(`node …`) 4 次
dist 注册的插件工具 = copy_file/move_file/trash_file/stat_file/convert_document/export_document（read/write/edit/glob/grep 是宿主工具）
cordis.patch.yml 不含 dsh-bash/dsh-tool-shell/dsh-shell/dsh-tool-bash/terminal/bash-local（无 shell 通道）
安装 URL：gh-proxy.com 下载 HTTP 200 / 47,287 B / sha256 243b494f…（与 raw/artifacts 相同）
站点详情页：0.3.0、暂无评测、上游状态 可访问、本站评测（0）
站点 /reviews：chuanban 命中 0
```

### 10. 探针 07：客户端面板 bundle（`raw/11`）

```text
dist/client.js 16,229 B / 304 行；window.__ModuleLoader__.load；id=chuanban-dsh-writingset
exports: apply/inject/PRESET_OPTIONS；inject=["slots","locale","configForms"]；PRESET_OPTIONS=5（pro/play/rp/pure/pro-v1）
whileServed 命名空间=["writing-brick-injector"]
注册：settings.section(id=writing-preset, order=25, label=写作协作配置) + plugins.item(order=50, 同 label)
summary 视图字符串含当前预设名与工作区模式名；完整视图 8 个 button（5 预设 + 3 模式）、无 textarea
custom 模式渲染 1 个 textarea；replace 模式预览只含自定义文本；只读/未就绪提示存在；预览含「【文档与工具协作准则】」
```

### 11. 查重读数（`raw/20`）

```text
dsh-bounty 账本 docs/bounty/ledger.json：events=595；chuanban=0 / writingset=0 / Anarcadia=0（raw 文本与事件体均 0）
review 子站数据 review/data/plugins.json：0 entries；三个关键词命中 0
dsh-bounty 全仓文本扫描：378 个 md/json/yml/html/py/mjs/js/ts/txt 文件，命中 0
工作区其它文件（排除本轮交付目录）：22 处引用，全部是「被测源码本身」或「主创站筛选的站点条目快照 / 其它插件的站点页面快照」，无既有评测
公开站：/plugins 出现 4 次、相邻「暂无评测」；/reviews 命中 0；详情页「本站评测（0）」
```

## 发现

> 分级按「不做会怎样」；本轮**无 P0/P1**，2 条 P2 都在**构建/发布闸门与测试可移植性**，4 条 P3 为文档/平台语义/内容格式保真级别，**不改变「装进 DSH 后写作」的主路径**（主路径本身未做端到端验证，见诚实边界）。
> 每条都在 `raw/` 有原始读数；被测源码未改动（构建/测试均在临时副本里跑）。

### P2-1 · 自带「7 项全链路自检」在 Windows 上必红：Test 7 硬编码 macOS `textutil`，Test 4 还依赖 `node` 在 PATH

**读数**（`raw/04-self-test.txt`、`raw/04b-self-test-node-on-path.txt`）：

```text
# 默认环境：node 不在 PATH（本机 DSH 自带 node 不进 PATH）
[Test 4] 失败：Command failed: node …\scripts\switch-preset.mjs --list
         "'node' 不是内部或外部命令"；runner exit 1
# 把 node 加进 PATH 重跑：Test 1–6 通过
[Test 7] 失败：Command failed: textutil -convert txt -stdout "…\story.docx"
         "'textutil' 不是内部或外部命令"；runner exit 1
```

**机制**（静态定位）：`tests/verify-bundle.mjs:641` 与 `:662` 用 `execSync('textutil …')` 校验导出的 docx——`textutil` 是 macOS 命令，Windows/Linux 都没有；Test 4 的 `:384 / :390 / :395 / :399` 又用 `execSync('node …')` 调用子脚本，依赖 `node` 在 PATH（本机只有 DSH 内置 node，不在 PATH）。

**影响**：README 写「运行内置 7 项全链路自检测试套件 `npm test`」，`package.json` 的 `prepublishOnly = build && test`。在 Windows 上这条发布闸门**恒失败**（作者若在 macOS 发布则不受影响，未验）；Windows 贡献者/第三方无法用它做回归门。插件运行时不依赖 `textutil`（doc-bridge 是零依赖实现，见探针 04），所以这不是用户侧功能缺陷。

**建议**：把 Test 7 的第三方校验改为零依赖方式（用 node 的 unzip/`zipRead` + XML 解析，或按 `process.platform` 跳过并在输出里显式标注），子进程一律用 `process.execPath` 而不是字面 `node`；或在 README 明写「自检套件需 macOS + node 在 PATH」。

### P2-2 · `npm run build` 只重建 `dist/client.js`；改 `src/*.ts` 后 build 退出 0 但运行时产物零变化（发布闸门无法防源码-产物漂移）

**读数**（`raw/03b-probe-build.txt`）：

```text
scripts = {"build":"node ./scripts/build-client.mjs","test":"node ./tests/verify-bundle.mjs",
           "switch":"node ./scripts/switch-preset.mjs","prepublishOnly":"node ./scripts/build-client.mjs && node ./tests/verify-bundle.mjs"}
tsconfig/tsup/rollup/esbuild/vite 配置：全部 missing
只有 dist/client.js 由构建脚本写出；dist/index.js、dist/presets.js、dist/file-butler.js、dist/doc-bridge.js 无生成脚本
build #1: exit 0, "built dist/client.js (12856 bytes)", dist 变化=(none)
drift test: 在 src/presets.ts 追加唯一标记后重跑 build
  drift build output = "built dist/client.js (12856 bytes)"
  dist changes = (none — 源码改动未被任何构建脚本消费)
  drift marker in dist/*.js = []
  source change reflected in runtime artifacts = false
```

**机制**：`scripts/build-client.mjs` 的输入是 `dist/presets.js`（已构建产物）与 `src/client/panel.js`，输出 `dist/client.js`；宿主侧四个 `dist/*.js` 没有对应的 tsc/打包脚本（仓库也没有 tsconfig）。`build-client.mjs` 里还做 `dist/presets.js` 的 `export` 剥离再内联，所以连「presets.ts → presets.js」这一环也不在 build 里。

**影响**：`build` 与 `prepublishOnly` 都能在源码已漂移时**静默通过**——未来改 `src/index.ts`/`presets.ts`/`file-butler.ts`/`doc-bridge.ts` 而忘记手工同步 `dist/*.js`，发布包会带着旧行为；第三方从源码 fork 后跑 `npm run build` 也得不到与源码一致的行为。本轮 0.3.0 的发布包与仓库 `dist/` **逐字节一致**（13/13），所以**当前版本没有实际漂移**，属于流程/可复现性缺口。

**建议**：加一条真正的 TS 构建（`tsc -p tsconfig.json` 或 tsup/esbuild）生成 `dist/index.js`/`presets.js`/`file-butler.js`/`doc-bridge.js`，`build` 串起来；或在 `prepublishOnly` 增加「源码导出契约 vs dist 产物」一致性检查（本轮 `dist/index.js` 的 10 个导出、Config 5 字段可作基线）。

### P3-1 · 发布包不含 `scripts/` 与 `tests/`，但其 `package.json` 保留了指向它们的 `build`/`test`/`switch` 脚本

**读数**（`raw/03b-probe-build.txt`）：release v0.3.0 解包 13 个文件；`release contains scripts/build-client.mjs = false`、`scripts/switch-preset.mjs = false`、`tests/verify-bundle.mjs = false`；而包内 `package.json` 的 `scripts` 原样保留四个脚本。

**影响**：从 README 的 `releases/.../chuanban-dsh-writingset.tgz` 解包后直接 `npm test` / `npm run build` / `npm run switch` 都会 `MODULE_NOT_FOUND`。用 DSH 插件通道安装不受影响（只读 `dist`）。README 的「克隆本仓库」前提成立时无碍，属打包边界/文档口径问题。

**建议**：要么把 `scripts/`（和最小测试）纳入 `files`，要么在发布包 `package.json` 里移除这些脚本 / 在 README 说明「tgz 仅含运行时，构建与自检需克隆仓库」。

### P3-2 · `trash_file` 在 Windows 上移入 `%USERPROFILE%\.Trash`，不是 Windows 回收站；README/tool 描述只写 `~/.Trash`（macOS 语义）

**读数**（`raw/07-probe03-file-butler.txt`，探针把 `USERPROFILE` 指向临时目录以免污染真实用户目录）：

```text
[trash] result1 trash_path = C:\Users\…\fakehome\.Trash\c.md.2026-10-18T14-59-18-325
[trash] result2 trash_path = C:\Users\…\fakehome\.Trash\c.md.2026-10-18T14-59-18-327
[trash] 内容仍可读（可恢复）= true true
[trash] Windows 语义注记：路径为 USERPROFILE\.Trash（非 Windows 系统回收站 $Recycle.Bin）
```

**机制**：`src/file-butler.ts:69` 固定 `join(homedir(), '.Trash')`（注释与描述写的是 macOS `~/.Trash`）。

**影响**：Windows 用户「移入回收站」后去系统回收站里找不到文件（可在 `%USERPROFILE%\.Trash` 手动恢复，**没有永久删除**，不构成数据丢失）；跨平台语义与 README 的「系统回收站」表述不一致。

**建议**：README 与工具描述写明平台差异（Windows 为 `%USERPROFILE%\.Trash`），或按平台调用系统回收站（Windows 可用 `SHELL`/PowerShell 回收站 API，代价是引入外部命令，与「零依赖」取向冲突）。

### P3-3 · 列表语义在两类输入上丢失：md 有序列表导出为普通段落；docx 样式层编号的列表转换后无 `- ` 标记

**读数**（`raw/08-probe04-doc-bridge.txt`）：

```text
md→docx：md 里 "1. 有序项一 / 2. 有序项二" 导出后 python-docx 读到的是 style=Normal 段落（内容保留、列表语义丢失）
         markdownToDocxBuffer 只识别 /^[-*+]\s+/ 无序列表
docx→md：第三方 python-docx 用 "List Bullet" 样式（编号在样式层，不在段落 <w:numPr>）生成的 docx：
         converted md 的 "- " 行数 = 0；列表文本仍在正文（"列表项一：雨落在青石板上。"）
         documentXmlToMarkdown 的列表判定 = 段落内 <w:numPr> 或 pStyle=ListParagraph
往返自洽：插件自己导出的 docx（ListParagraph + "• " 前缀）再 convert，3 个 "- " 行都在
```

**影响**：插件自身「md→docx→md」闭环保真；但从 Word/WPS/第三方库导入的、把编号放在样式层的 docx 会丢列表结构；md 有序列表进 docx 后不再是有序列表。README 的「保留…列表项」声明在部分输入上不成立。真实 Word 默认把 `numPr` 写在段落层，通常能命中（未验，本机无 Word）。

**建议**：识别列表时同时解析 `pStyle → styles.xml` 的 `numPr`（区分 bullet/number）；导出侧支持 `1.` 有序列表（Word 内置编号或至少保留字面序号）。

### P3-4 · 仓库无 LICENSE 文件：`package.json` 声明 MIT、README「License [MIT](package.json)」，但 GitHub API `license = null`

**读数**（`raw/10-probe06-version.txt`、`raw/00-anchor-upstream.txt`）：`存在 LICENSE = false`、`LICENSE.md = false`；`repo license = (none)`；README 末尾「License [MIT](package.json) © 船板」。

**影响**：再分发/引用时缺少标准许可文本，GitHub 也无法展示 license 徽章；对本机功能无影响，属合规/文档完整性缺口。

**建议**：补一份标准 MIT LICENSE 文件（版权人「船板」/年份），README 链接改指 `LICENSE`。

### 已验的正面结论（同样逐项可复跑）

- **锚定可复跑**：本地源码 20/20 逐字节等于 commit tarball 与 main tarball；给定 sha256 对应 main tarball 且本机重取一致；Release 资产 sha 与站点清单版本 0.3.0 一致。
- **发布包干净**：13 个文件，dist/src/package.json 与仓库逐字节相同；`files` 边界与 README 的安装方式相符；零依赖（无 `dependencies`/`devDependencies`/lockfile）。
- **构建可复现**：`dist/client.js` 重建后与提交产物**逐字节相同**且幂等（16,229 B / 304 行，lazy-CJS + 内联 presets）。
- **提示词组装**：5 预设 × base 开/关、custom append/replace、off 忽略、workspace 静音降级、Volatile `.get()` 解包、未知预设兜底全部符合声明；三层顺序正确。
- **工作区扫描**：顺序/去重/只读 `.md`/缺失静音/64KB UTF-8 截断（不劈多字节、截断即停、50 ms）全部符合声明；宿主 getter 只认 `context.agent.session.header.cwd`，off 模式不读盘。
- **file-butler**：四工具契约与真实文件系统往返（含目录树复制、防覆盖、目录目标自动拼名、自身子目录防御、同毫秒回收站防碰撞）全部符合声明；产物无子进程/shell 通道。
- **doc-bridge**：插件导出的 docx 能被**第三方 python-docx** 独立解析（Heading 1–6、列表、控制符剥除、XML 转义正确）；双向防覆盖成立；第三方 docx 可反向转换；非法输入报错清晰。
- **宿主契约**：`cordis.patch.yml` 引用的 9 个宿主包在本机 DSH 0.2.1-rc.2 全部存在，配置键/工具名/isolate/insert/disabled 在宿主产物中可静态命中。
- **客户端面板**：bundle 可加载、5 预设选项、双槽位注册、custom 模式 textarea、预览与只读提示均符合代码与 README 描述（真实 GUI 渲染未验）。
- **查重**：账本 595 事件、review 子站数据、dsh-bounty 全仓 378 文本文件、公开站三路均无同件。

## 诚实边界

- **已验**：锚定（两路 tarball + 本地树指纹 + 发布包）；`npm run build` 与构建可复现/幂等；自带 7 项测试的通过面与失败面（Windows 两种环境）；预设组装矩阵与三层顺序；工作区扫描/去重/64KB 截断/cwd 注入/热更新事件；file-butler 四工具真实 fs 往返与回收站防碰撞；doc-bridge 导出/转换/防覆盖/第三方 python-docx 交叉校验/非法输入/边缘 OOXML；宿主包与配置键的静态存在性；客户端 bundle 的 vm 级加载与注册；版本面（package/release/站点 0.3.0、暂无评测、安装 URL 200 与 sha）；查重四路。
- **未验（没跑，列原因）**：
  1. **官方安装通道**（DSH Desktop「设置 → 插件」粘贴 URL / `dsh plugin --profile web add …` / 重启宿主）：按纪律不把被测插件装进 live profile，也未建独立 profile 做安装回归（安装会写 profile 目录）；
  2. **真实 DSH 会话内的端到端行为**：`complete: true` 是否真的清零官方工程提示词、`isolate fs+attachments` 是否真的不注册 `read_image`、9 个工具在会话中是否按预期可见、`{{writing_active_brick}}` 在真实 prompt 渲染器中的插值结果——都需要真实宿主加载插件；本轮只做静态核对（宿主包存在 + 配置键存在 + bundle 可加载）；
  3. **真实模型写作效果**：五个预设的「人设/风格/破限」效果、写作协作面板的热切换体验，需要真实模型额度与人工主观评估，本件不做；
  4. **设置面板真实渲染**（深浅色/窄窗/中英文/`Cmd + ,` 快捷键）：只做了 vm 渲染树检查，未加载真实 GUI；
  5. **README 的 `1,196 tokens` / `比官方标准预设节省逾 80%` / `与 Storydesk 工作台内核等效`**：无官方 tokenizer、官方标准预设原文与 Storydesk 均不在本机，无法复现；
  6. **真实 Word / WPS 打开插件导出的 docx**：只用 python-docx 做了内容级第三方校验；字体/编号/版式渲染未验；
  7. **WSL / Linux / macOS**：单平台未跑；macOS 的 `textutil`/`~/.Trash` 语义未实测；
  8. **跨平台回收站语义**：Windows `%USERPROFILE%\.Trash` 的恢复体验未做人工验证（只验证内容仍可读）；
  9. **大文件 / 长会话性能**：`readWorkspaceDocs` 2 MB 用时 50 ms 属截断路径；真实长稿（数百 MB）与长会话压缩未压测；
  10. **多会话/并发**：`writing-brick-injector` 的 Volatile 热更新在多会话并发下的一致性未验（仅单 mock ctx 事件触发 1 次）。
- **不确定**：
  1. README 的「首轮 1,196 tokens」口径不明：不含工具 schema 时 pro+base 只有 662 chars / 490 CJK，若 1,196 含工具定义则量级可能成立——无法用本机读数判定；
  2. 「纯预设」`pure` + 关闭底座 = 空系统提示词（0 chars）是否预期：面板允许该组合，插件无兜底（`assembleWritingPrompt` 返回空串），宿主对空 `prefix` 的处理未验；
  3. 真实 Word 生成的列表是否都带段落级 `<w:numPr>`：若部分版本只在样式层给编号，P3-3 的影响会扩大到常规 Word 文档（未验）；
  4. `tests/` 的 `textutil` 是作者 macOS 开发环境的遗留还是有意只支持 macOS：README 未写平台限制，倾向前者但无作者确认；
  5. 发布包保留 `scripts` 字段是否与 DSH 插件市场/安装器的处理有关（安装器只读 `dist` 时无影响），未验。
- **不做**：不排名 / 不给总分 / 不用星级；不把插件装进 live profile；不做安全渗透或漏洞利用（只做了「无 shell 通道」的静态检索）；不改被测源码、不提 PR；不对非 Windows 平台下结论；不评估「写作效果好坏」这种主观项；不重算 0.1.0/0.2.0 历史版本。

## 查重

对照：

- `dsh-bounty` 快照账本 `docs/bounty/ledger.json`（**595** 个事件）——`chuanban` / `writingset` / `Anarcadia` 各出现 **0** 次（raw 文本与事件体均 0）；
- `review/data/plugins.json`（review 子站数据）——**0** 条 entry，三个关键词命中 **0**；
- `dsh-bounty` 全仓文本扫描（**378** 个 md/json/yml/yaml/html/py/mjs/js/ts/txt 文件）——命中 **0**；
- 工作区 `测试/` 其它目录与 `外部插件/`：**22** 处引用，全部是「被测源码本身」或「主创站筛选/其它插件的站点页面快照」，**没有既有测评报告**；`测试/chuanban-writingset/` 为本轮新建；
- 公开站 <https://review.lingshulab.com/plugins>——`chuanban-dsh-writingset` 出现 4 次，全部相邻「暂无评测」；详情页显示「本站评测（0）」「暂无评测」；
- 公开站 <https://review.lingshulab.com/reviews>——`chuanban` 命中 **0**。

⇒ 结论：**对照 dsh-bounty 账本 / review 子站数据 / dsh-bounty 全仓文本 / 公开测评站 / 本工作区，未见同件**。原始读数见 `raw/20-dedupe.txt`；站点读数见 `raw/10-probe06-version.txt`。

## 复现步骤

第三方原样可跑。环境：Windows x64、Node v24.21.0（DSH 自带；本机无 git/npm，pnpm 用 `node pnpm.mjs` 跑）；被测件**零依赖**，无需 `install`。以下命令在本机实测；**只在临时副本里构建/跑测试，不碰 live profile**。

```bash
# 0) 取件与锚定（需要网络；本机 hosts 把 github 域名指向 127.0.0.1，故走 gh-proxy 镜像）
cd D:\natnat\lingshu
node 测试\tools\gh-fetch.mjs --mode api ^
  --path repos/Anarcadia/chuanban-dsh-writingset/commits/aa34ea9daa937d09c1f26520bf0a82eb9d2b7209 --out commit.json
node 测试\tools\gh-fetch.mjs --mode tarball --repo Anarcadia/chuanban-dsh-writingset --ref main --out main.tgz
# 期望 main.tgz sha256 = 63e2a435cbc5636def22e2dadf2e9814a0da189792d8fc1de4879715cdf057be（1,321,721 B）
node 测试\tools\gh-fetch.mjs --url "https://github.com/Anarcadia/chuanban-dsh-writingset/releases/download/v0.3.0/chuanban-dsh-writingset.tgz" --out release.tgz
# 期望 release.tgz sha256 = 243b494f628fced563643f7d29bc479b1cccc7c22ad29764afcf84695ca5b70d（47,287 B）

# 1) 锚定指纹（只读）
cd D:\natnat\lingshu\测试\chuanban-writingset
node probes\probe-anchor.mjs D:\natnat\lingshu\外部插件\chuanban-writingset\chuanban-dsh-writingset-main ^
  --compare <main.tgz 解包目录>\chuanban-dsh-writingset-main
# 期望 fingerprintEqual=true, onlyInA/onlyInB/contentDiff 均 []
node probes\probe-anchor-upstream.mjs --commit-json raw\00-upstream-commit.json ^
  --repo-json raw\00b-upstream-repo.json --releases-json raw\00c-upstream-releases.json ^
  --main-tgz main.tgz --commit-tgz <commit tarball> --release-tgz raw\artifacts\chuanban-dsh-writingset-v0.3.0-release.tgz

# 2) 构建与自带测试（在临时副本里；测试会改写 cordis.patch.yml，切勿在原仓库跑）
xcopy /E /I D:\natnat\lingshu\外部插件\chuanban-writingset\chuanban-dsh-writingset-main %TEMP%\chuanban-work
cd /d %TEMP%\chuanban-work
set PATH=C:\Users\30951\.dsh\dsh-runtimes\dsh-primary-runtime\dependencies\node\bin;%PATH%
node scripts\build-client.mjs            # 期望 exit 0, "built dist/client.js (12856 bytes)", dist 无变化
node tests\verify-bundle.mjs             # 本机期望 Test 1–6 通过、Test 7 因 textutil 缺失失败（exit 1）

# 3) 独立探针（离线；每个探针自建临时夹具，产物写到 raw/）
cd /d D:\natnat\lingshu\测试\chuanban-writingset
node probes\probe-build.mjs --source D:\natnat\lingshu\外部插件\chuanban-writingset\chuanban-dsh-writingset-main ^
  --release <release.tgz 解包目录>\package
node probes\probe-01-presets.mjs --plugin D:\natnat\lingshu\外部插件\chuanban-writingset\chuanban-dsh-writingset-main
node probes\probe-02-workspace.mjs --plugin D:\natnat\lingshu\外部插件\chuanban-writingset\chuanban-dsh-writingset-main
node probes\probe-03-file-butler.mjs --plugin D:\natnat\lingshu\外部插件\chuanban-writingset\chuanban-dsh-writingset-main
node probes\probe-04-doc-bridge.mjs --plugin D:\natnat\lingshu\外部插件\chuanban-writingset\chuanban-dsh-writingset-main ^
  --outdir raw\docx-artifacts --python "C:\Users\30951\.dsh\dsh-runtimes\dsh-primary-runtime\dependencies\python\python.exe" --probes probes
node probes\probe-05-host-contract.mjs
node probes\probe-07-client.mjs --plugin D:\natnat\lingshu\外部插件\chuanban-writingset\chuanban-dsh-writingset-main
node probes\probe-version.mjs --plugin D:\natnat\lingshu\外部插件\chuanban-writingset\chuanban-dsh-writingset-main ^
  --release-tgz raw\artifacts\chuanban-dsh-writingset-v0.3.0-release.tgz
node probes\probe-dedupe.mjs

# 4) 证据整理（顺序固定：先 normalize，再 manifest，最后 issue）
node ..\tools\normalize_raw.mjs raw
node ..\tools\make_manifest.mjs --raw raw --label "chuanban-dsh-writingset 0.3.0"
node ..\tools\make_issue.mjs --report "chuanban-writingset\测评报告_chuanban-dsh-writingset_v0.1.md"
```

> `run-command.mjs` 是本机的「干净捕获」小工具：Windows PowerShell 5.1 对原生命令的 `2>&1` 会写成
> `NativeCommandError` + UTF-16，直接重定向会污染证据，故用 Node 逐条执行并落 `stdout/stderr/合并文本`
> （`raw/04` 的 stderr 是系统 cmd 的 GBK 提示，保留原始字节；报告只引用其中的退出码与英文片段）。

## 一句话总结

**chuanban-dsh-writingset 0.3.0 在本机（Windows 11 / DSH 0.2.1-rc.2 / Node 24.21.0）源码快照上锚定干净（本地 20/20 文件等于 commit/main 两路 tarball，发布包 13/13 文件等于仓库产物，Release 47,287 B / sha `243b494f…`）；`npm run build` 重建 `dist/client.js` 逐字节可复现且幂等，自带 7 项自检在 Windows 上 6 过 1 败（Test 7 硬编码 macOS `textutil`），独立探针验证了「5 预设 × 三层提示词组装、工作区文档扫描/去重/64KB 截断、Word 双向防覆盖桥、file-butler 四工具真实 fs 往返、客户端面板槽位注册」均按声明工作（导出的 docx 被第三方 python-docx 独立解析通过）；发现 2 条 P2（Windows 自检必红；build 只覆盖 client，改 `src/*.ts` 不改变 dist）与 4 条 P3（发布包 scripts 指向未发布文件、Windows trash 非系统回收站、列表语义在部分输入丢失、无 LICENSE 文件），无 P0/P1；真实宿主安装/会话内工具面/模型写作效果/设置面板渲染与非 Windows 平台未验。**
