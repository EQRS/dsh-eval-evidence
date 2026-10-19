[intake 输入] 【测评报告】dsh-files 0.6.0 体验快测（文件 / 文档读取 · 方法试验）

<!-- intake:v1 {"project":"bench","difficulty":"medium","impact":"B","target":"taxueseek/dsh-files","form":"intake"} -->

<!-- 协议对齐：工程协议手册 v1.1（r2）§6 体验快测档；协议文件 sha256 8dd51cbf75b259c5dabfdb928eb112364231b5d8f9f580759534e5d78a34d849 -->
> **协议对齐（v1.1 · r2 · 体验快测档）**：本件是**体验快测**（手册 §6），只记录安装/功能点/卸载残留类检查结果；
> **不生成五种能力状态标签、不进入能力榜、不以「通过/合格」作为插件结论**；未覆盖项见「诚实边界」。
> - **协议绑定**：`工程协议手册-v1.1`（修订标识 r2），文件 sha256 `8dd51cbf75b259c5dabfdb928eb112364231b5d8f9f580759534e5d78a34d849`（快照 `测试/协议/`）。
> - **插件身份**：源码版（commit + 逐文件树指纹）或发布包版（版本 + 哈希），见「锚定提交」。
> - **环境配置 ID**：dsh 0.2.1-rc.2 / win32-x64 / Windows 10.0.26200 / node v24.21.0 / model=n/a（本快测未调用模型）/ 依赖与外部服务见「环境与基线」。
> - **安全口径（§4 三分法）**：本件**未做**六威胁安全审计 ⇒ 安全结论 = **未测**（不是「未发现问题」，也不是「已验证通过」）。
> - **时效（§13.7）**：测评完成后 90 个自然日内有效；版本/权限/数据流/依赖/宿主变化触发复核，旧报告不自动适用于新版本。


## 性质声明

本件是 **intake 输入**（外部贡献申报），不是悬赏：**不 /claim、不自行加 bounty 标签**。
计分由维护者裁定。本件**不把插件装进任何正在使用的 DSH profile**，全部读数来自
「源码快照 + 本机 Node 直接调用插件自己的模块 / 它自己的 HTTP 路由注册函数」。

## 锚定提交

- 被测仓：`taxueseek/dsh-files`，声明版本 **0.6.0**（`package.json`）
- 本机快照目录：`D:\natnat\lingshu\dsh-files-main`（**无 `.git`**；本轮无网络，无法取 commit）
- 快照锚定（替代 commit hash，逐字节可复算）：
  - `package.json` sha256 = `c8eee96f4cadb8e286af6621b9964e5ee6370a587668eaa78e2820e0e5419962`
  - `src/` 20 个文件、129989 字节；树指纹（每行 `相对路径\0文件sha256`，按路径排序后整体 sha256）
    = `cb6286283c6d5ec282d8d74b3a80a70c3478fb42bffdd813a7f8a6a342579a84`
  - 完整逐文件清单见 `raw/20-anchor-manifest.txt`
- 版本面不一致（P3-3）：`src/attachment-loop.ts` 与 `src/attachments/ref.ts` 文件头注释写
  `dsh-files 0.6.1`，而 `package.json` 与 `CHANGELOG.md` 最新条目均为 **0.6.0**。

## 环境与基线

| 项 | 读数 |
|---|---|
| 宿主 | DeepSeek Harness **0.2.1-rc.2**（desktop + runtime 两处 `package.json` 同值；`dshBuildCommit` `332895e0f7c9d4dbfb29729f5eb367fa263ff986`；Electron 44.7.0） |
| 平台 | **仅 Windows** 10.0.26200（x64），机器名 `BBS`；**WSL/Linux 未跑**（本机无 WSL、无网，如实声明单平台） |
| Node | v24.21.0（DSH 自带：`resources\runtime\primary-runtime\dependencies\node\bin\node.exe`） |
| pnpm | 11.28.5（DSH 自带，未在 PATH） |
| dsh CLI / npm / git | **均不在 PATH**；无外网（GitHub 域名解析被拦，`web_fetch` 报 non-public IP） |
| 基线（无插件） | 宿主内建 read 对同一批 fixture：`read(pdf-two-pages.pdf)` → `Error: cannot read "...": binary file`；`read(docx-sample.docx)` → 同样 `binary file` |

> 基线证明「内建 read 只收文本、拒二进制」这一缺口真实存在；本插件正是补这个缺口。
> 环境原始读数见 `raw/22-env-baseline.txt`。

## 结果速览

| 面 | 结果 | 证据 |
|---|---|---|
| 自带测试 | **105/105 通过**，rc=0，4.06 s | `raw/01-self-test.txt` |
| 类型检查 | 2/2 配置 rc=0（主 + client） | `raw/02-tsc-main.txt`、`raw/03-tsc-client.txt` |
| 文档读取（parse + tool 面） | 18 个 parse 用例中 16 个结果符合预期（含 2 个按设计拒绝），**2 个暴露 P2-1**（GBK/GB18030 嗅探 null） | `raw/13-read-document.txt` |
| 附件 HTTP 路由 | 20/20 场景状态码与失败契约符合文档；**1 处契约不一致**（download 路由不校验方法） | `raw/11-routes.txt` |
| Host 信任围栏 | 14/14 矩阵符合语义（回环 / trustedHosts / 伪回环 / 缺 Host） | `raw/11-routes.txt` |
| 导出到工作区（Windows 文件名） | 14 个名称用例中 11 个正常；**3 类 Windows 名称处理缺陷** | `raw/10-export-names.txt`、`raw/14`、`raw/15` |
| 官方安装通道 | **未验**（无 dsh CLI、无网络；未动用户 live profile） | 见「诚实边界」 |

## 逐项读数

### 1. 自带测试与类型检查（已验）

```bash
# 等价于 package.json 的 "test": "npm run typecheck && node --test"（本机无 npm，拆成两步手工跑）
node --test test/attachment.test.ts test/attachment-loop.test.ts test/detect.test.ts \
  test/doc.test.ts test/format.test.ts test/junk.test.ts test/parse.test.ts \
  test/regression-0.4.3.test.ts test/rows.test.ts test/tool.test.ts
# 末行读数：tests 105 / pass 105 / fail 0，exit=0，elapsed_ms=4063

node node_modules/typescript/bin/tsc --noEmit                       # exit=0
node node_modules/typescript/bin/tsc -p tsconfig.client.json --noEmit # exit=0
```

### 2. 文档读取：格式嗅探 + 解析 + tool 面（已验）

fixture 生成：`python probes/make-fixtures.py raw/fixtures`（纯标准库，逐文件 sha256 见 `raw/12-fixtures.txt`；
PDF/DOCX/XLSX 用插件自己的依赖 `pdf-lib`、`jszip` 生成）。

| 用例 | 读数 |
|---|---|
| UTF-8 中文 / UTF-16LE·BE BOM / 无 BOM UTF-16 / 空文件 | 均嗅探为 `text`，内容逐字正确 |
| **GBK 短行文本（57 B，4 行）** | `sniffFormat → null`；tool 面 auto 直接 `FS_NOT_TEXT`；**显式 `format:"text"` 可正常读出**（4 行逐字正确） |
| GBK 长行文本（对照） | `sniffFormat → text`，2 行正确 |
| GBK 超集 GB18030 四字节（emoji） | `sniffFormat → null`（同上失败） |
| PDF 两页（pdf-lib 生成） | `pdf`，5 行，107.2 ms；页间空行保留 |
| 空白/扫描件 PDF | `pdf`，返回显式提示「此 PDF 没有文本层…」而非空串 |
| DOCX（jszip 生成） | `docx`，4 行，14.0 ms |
| 扩展名欺骗：MZ 头改名为 `.pdf` | `sniffFormat → null`；tool 面 `FS_NOT_TEXT`（未被扩展名带进 PDF 解析器） |
| XLSX 双 sheet | 默认读前 2 行/表并带「已截断」标记；`list_sheets` → `1. Sheet1 / 2. 数据表`；`sheet:2` 全量 1 行；`sheet:9` 点名越界并列出可用 sheet |
| tool 面 `offset/limit` | 100 行文件 `offset=41, limit=5` → 行号 41..45，`totalLines=100` |
| tool 面 `maxFileBytes` | 792 B 文件、上限 10 B → `FS_TOO_LARGE`，消息含实际大小 |
| sheet 参数用于 PDF/DOCX | 明确拒绝并提示「only supported for XLSX」 |

### 3. 附件 HTTP 路由（已验）

用插件自己的 `registerAttachmentRoutes()` 注册到**真实 node:http 服务**，真实宿主式请求：

```bash
node probes/probe-routes.mjs
```

- `GET /attachments`（回环 Host）→ 200 + rows/total/totalBytes；
- 公网 Host → **403 `host-not-trusted`**，`hint` 原样带出被拒 authority 与 `trustedHosts: ["dsh.example.com:8443"]`；
- download：合法 ref → 200，`content-length` 与字节一致、`Content-Disposition` 中文名走 RFC 5987 `filename*`；非法 ref → 400；不存在 → 404；超上限 → 413（含 size/cap/detail）；
- export：POST 合法 → 200 + `relativePath`；GET → 405 `Allow: POST`；缺参 → 400；会话无工作区 → 400；超上限 → 413；
- list/DELETE：PUT → 405 `Allow: GET, DELETE`；DELETE 合法 → 200（删盘）、重复 → 404、非法 ref → 400、非回环 Host → 403；
- **不一致（P3-1）**：`POST /attachments/download` 仍返回 200（download 处理器未校验方法，与 list/export 的方法契约不一致）。

### 4. 导出到工作区的文件名处理（已验，见「发现」）

`exportToWorkspace()` 直接调用 + 真磁盘检查 + Win32 API 交叉检查：

```bash
node probes/probe-export.mjs     # 见 raw/10-export-names.txt
# Win32 交叉检查：raw/14-win32-name-check.txt、raw/15-win32-reserved-names.txt
```

## 发现

> 所有缺陷均为**行为级复现**，不是代码审读推断；复现命令与原始读数见 `raw/`。分级按「不做会怎样」判：
> 均未达到「量具失效 / 提权 / 数据不可恢复」的 A 档；两条为条件性 P2，其余 P3。

### P2-1 · GBK 文本「短行」时自动识别失败，与 README 声明不符

**声明**（README「Content sniffing / Encoding chain」原文）：
「**Encoding chain**: UTF-16 BOM → UTF-8 (fatal, NUL rejected) → GB18030 (fatal) → UTF-16 without BOM
(high-confidence guard); **GBK Chinese and BOM-less UTF-16 both read**」。

**实测**：57 字节、4 行短句的 GBK 文件 → `sniffFormat → null`、tool 面 auto 报 `FS_NOT_TEXT`；
同一份字节显式 `format:"text"` 能读出（`raw/13-read-document.txt`）。

**根因（本机可复算，非猜测）**：`src/detect.ts::looksLikeGb18030` 的可打印比例门槛
`printable / dec.length > 0.9`，而换行符（U+000A < 0x20）计入分母不计入分子。
本用例 GB18030 解码结果 39 字符、可打印 35 个 → **35/39 = 0.8974 < 0.9**，判定失败；
长行对照（104 B、2 行、54 字符）比例 **52/54 = 0.9630** → 识别成功；GB18030 四字节样本
（17 字符、1 换行）比例 15/17 = 0.8824 → 同样失败。三个样本的比值与门槛判定见
`raw/16-gbk-ratios.txt`（`node probes/probe-gbk-ratio.mjs` 可复算）。

**影响**：任何「行短、换行占比 >10%」的 GBK/GB18030 中文文本（短行清单、诗词、配置、
按句断行的字幕等）在 `auto` 下都读不了；README 的「GBK 都能读」声明不覆盖这一边界。
**触发条件**：仅 `auto`；显式 `format:"text"` 可绕过。
**建议**：门槛只统计非换行/非空白字符，或把 `\r\n\t` 计入可打印集合。

### P2-2 · 自动模式下的「扩展名兜底」不可达（注释声称可用）

`src/tool.ts` 先做：

```
const headFormat = sniffHead(head)
if (headFormat === null && input.format === 'auto') throw FS_NOT_TEXT   // ← 先抛
...
const hint = input.format === 'auto' ? (formatFromExtension(filePath) ?? undefined) : input.format
const format = headFormat === 'zip' || headFormat === null ? sniffFormat(bytes, hint) : headFormat
```

`headFormat === null` 时 auto 已在上一行抛出，故 `sniffFormat(bytes, hint)` 在 auto 下**永远到不了**；
第 247–248 行注释「auto 模式下的 hint 取扩展名：字节完全未知时允许按扩展名兜底解析」与实现不符。
**实测佐证**：GBK 短行 `.txt` 的 tool 面 auto 直接 `FS_NOT_TEXT`，未走 `.txt` 兜底（`raw/13-read-document.txt`）。
**影响**：`sniffHead` 判 null 但扩展名可用的文件，永远拿不到兜底；显式 `format` 才可达。
**建议**：把兜底判定前移到该 throw 之前，或删除注释以避免「声明 ≠ 实现」。

### P2-3 · 导出到工作区的 Windows 文件名清洗不足（条件性）

`src/attachments/ref.ts::sanitizeFileNameForPath` 只清洗控制字符、`\` `/`、首部 `.`，
**不处理 Windows 名称约束**（`:` `<` `>` `|` `?` `*`、结尾点/空格、保留设备名）。
实测（`raw/10`、`raw/14`、`raw/15`）：

| 存储中的原名 | 插件返回 | 真磁盘结果 |
|---|---|---|
| `report.txt.`（结尾点） | `attachments/report.txt.` | Node 能 stat/read；**Win32 全工具不可达**：`Test-Path` False、`Get-Item` ItemNotFound、`cmd type` “cannot find the file specified”；`readdir`/`dir` 却列得出来 |
| `normal.txt:hidden`（冒号） | `attachments/normal.txt:hidden` | 生成 **0 字节的 `normal.txt`** + 内容写进 NTFS **备用数据流 `hidden`**；普通读取 `normal.txt` 得到 0 字节，内容在资源管理器/普通工具中不可见 |
| `a\|b.txt`、`x<y>.txt` | 抛 `ENOENT` | 函数级已实测抛 `ENOENT`；**路由层 500 为源码推断**（`export` 路由的 catch 分支），因本机 store 无法构造该名，未在 HTTP 层复现；hint 只说「检查工作区可写」，不指向文件名 |
| `NUL.doc`/`CON.txt`/`COM1`/`LPT1.txt` | 正常返回 | 本机 Node 确实建了真实文件，`.NET File.ReadAllText` 与 `cmd type` 可读，**但 PowerShell provider 拒绝**（Test-Path False / Get-Content ItemNotFound）——工具间行为分裂，见 `raw/15` |

**触发条件（如实写明）**：Windows 本地上传 UI 产不出这些名字；但附件库是跨平台的
内容寻址目录，**Linux/macOS 客户端经 LAN 上传**（或从异构机器迁移/预置的附件库）
可以落入这些原名，之后在 Windows 宿主上导出即复现。单机 Windows 上传→导出路径几乎不触发。
**影响**：(a) 面板报成功、返回的路径在普通 Windows 工具里打不开；(b) 冒号名把内容藏进 ADS，
普通读取看到 0 字节 = 语义上的数据不可见；(c) 非法字符名导出必失败。
**建议**：按 Windows 规则补齐（替换 `<>:"|?*`、去结尾点/空格、保留名加前缀），
并在失败 hint 里点名「文件名含系统不允许字符」。

### P3-1 · `POST /attachments/download` 返回 200

download 处理器未校验 `req.method`，任意方法都流字节；list 与 export 均有方法闸门。
非安全问题（仍需有效 sha256 ref + Host 围栏），但契约面不一致。建议补 405 + `Allow: GET`。

### P3-2 · 超长名截断丢扩展名

`sanitizeFileNameForPath` 在 120 个 UTF-16 单元处硬截断，长名被截后扩展名消失
（实测返回路径长度 132 = `attachments/` + 120，`endsWith('.txt') === false`）。
`read_document` 靠字节嗅探、不靠扩展名，故不致命；但 `attachments/` 目录里会出现
无扩展名文件。建议先截 stem 再拼回扩展名。

### P3-3 · 版本面/兼容面不一致

- 两处源码头注释 `0.6.1` vs `package.json`/`CHANGELOG` `0.6.0`；
- `dsh.compatibility.dshReleases` 只列 `0.2.0-rc.2`、`0.2.1-alpha.3` 为 compatible，
  而本机实际宿主是 **0.2.1-rc.2**（peer 区间 `^0.2.1-alpha.3` 语义上覆盖，但未被显式登记）；
  `dshOperations` 仅 `0.2.0-rc.2` 的 install/start 为 passed，uninstall/rollback 为 unknown。

## 诚实边界

- **已验**（本机跑过、有原始读数）：
  ① 自带测试 105/105、双 tsconfig 类型检查；② `sniffFormat/sniffHead` 14 个 fixture 的判定；
  ③ `parseDocument` 对 text/PDF/DOCX/XLSX 的 18 个用例；④ `read_document` tool 面 11 个用例；
  ⑤ 附件 list/download/export/delete 四路由 20 个 HTTP 场景 + fence 14 项矩阵；
  ⑥ `exportToWorkspace` 14 个名称用例 + 真磁盘 + Win32 交叉检查。
- **未验**（没跑，列原因）：
  ① **官方安装通道**（`dsh plugin add git+https://…`）：本机无 `dsh` CLI、无网络、无 pnpm-on-PATH，
  且我**不把测试插件装进用户正在使用的 profile**；故「装得上 / 装不上」本轮**未测**（不是「跑了失败」）；
  ② 真实 DSH 会话内的面板/胶囊/@ 源/客户端 bundle 与桌面端表现：需真宿主 + 浏览器，未跑；
  ③ macOS `textutil` 的 `.doc` 主路线：平台不符；
  ④ **真实 OLE `.doc` 文件**：仓内 `test/fixtures/sanming-dog-regulation.doc` 实际是 **ZIP 容器**
  （首字节 `50 4b`，`sniffFormat` 判为 `docx`），故走的是 mammoth 而非 `word-extractor`；
  ⑤ 大文件（>64 KiB 的 PDF/DOCX）、超时取消、并发/取消契约：仅自带的 128 KiB 文本回归用例覆盖；
  ⑥ 卸载 / 回滚（upstream 自陈 unknown）；
  ⑦ 跨平台（Linux/macOS 宿主）上的导出行为。
- **不确定**：
  ① GBK 失败的**精确边界**（比例阈值 0.90 附近；本用例 0.8974 只差 0.0026）；
  ② P2-3 在「纯 Windows 单机上传→导出」流程下是否可达（判定为跨平台/LAN 场景可达，未在真实 LAN 上传链路复现）；
  ③ 保留名（NUL.doc 等）是「文件系统允许/工具拒绝」的分裂面，是否算缺陷取决于部署面。
- **不做**（主动排除，列理由）：
  ① 不排名、不给总分、不用星级——本件只给逐项读数与可复现缺陷；
  ② 不做安全渗透/攻击性利用（只做黑盒行为验证与边界探测）；
  ③ 不评测 LLM/模型效果（本插件不做语义检索，无模型面）；
  ④ 不改动被测源码，不提 PR——本件是测评不是修复交付。

## 查重

对照 `dsh-bounty` 快照（`D:\natnat\lingshu\dsh-bounty-main`，无 `.git`，文件日期 2026-10-17）：

- `review/data/plugins.json`：已有 3 条记录 —— **dsh-memory / dsh-mnemon / dsh-auto-memory**，
  无 `dsh-files`（出现 0 次）；
- `docs/bounty/ledger.json`（**595** 个事件）：`dsh-files` **0 次**、`taxueseek` **0 次**；
  `dsh-ops` 仅 1 次（issue **#598**，0.3.0，2026-10-15 结算 hard/B）——故本件**不选 dsh-ops**；
- 整个快照全文检索 `dsh-files`：**0 个文件命中**。

⇒ **对照 review 子站 3 条记录 + 账本 595 事件 + 全仓检索，未见同件。** 原始读数见 `raw/21-dedupe.txt`。

## 复现步骤（第三方原样可跑）

环境：Windows x64，Node **v24.21.0**（需原生 TS 类型擦除；本机用 DSH 自带 node），插件源码在
`D:\natnat\lingshu\dsh-files-main`（`node_modules` 已就绪；无网络也可跑）。

```bash
# 0. 目录与 fixture
cd D:\natnat\lingshu\测试\dsh-files
python probes/make-fixtures.py raw/fixtures        # 纯 stdlib，约 0.1 s

# 1. 自带测试 + 类型检查（约 5 s）
cd D:\natnat\lingshu\dsh-files-main
node --test test/*.test.ts                          # 期望 tests 105 / pass 105 / fail 0
node node_modules/typescript/bin/tsc --noEmit       # 期望 rc=0
node node_modules/typescript/bin/tsc -p tsconfig.client.json --noEmit   # 期望 rc=0

# 2. 自建探针（四个脚本均可离线跑，约 1–3 s each）
cd D:\natnat\lingshu\测试\dsh-files
node probes/probe-read.mjs        # → raw/13-read-document.txt
node probes/probe-routes.mjs      # → raw/11-routes.txt（真实 node:http）
node probes/probe-export.mjs      # → raw/10-export-names.txt
node probes/probe-gbk-ratio.mjs   # → raw/16-gbk-ratios.txt（P2-1 的门槛读数）

# 3. Win32 交叉检查（对上面探针写出的固定目录）
powershell -Command "Test-Path -LiteralPath 'D:\natnat\lingshu\测试\dsh-files\raw\artifacts\export-cwd\attachments\report.txt.'"
# 期望 False（Node 侧 readdir 列得出来）——即 P2-3 的读数

# 4. 证据清单自检（逐文件 sha256）
node probes/make-manifest.mjs     # → raw/manifest.txt
```

> 机器相关路径（DSH 自带 node 的绝对路径）已在 `raw/22-env-baseline.txt` 写明；
> 只要 Node ≥ 23.6 且 `node_modules` 就绪，命令可整体原样复跑。

## 一句话总结

**dsh-files 0.6.0 的主路径（文本/PDF/DOCX/XLSX 读取、附件库路由、Host 围栏）在本机读数下成立且自带
105/105 全绿；但「GBK 都能读」的声明在短行文本上失效（P2），Windows 导出名清洗不足会把文件写成
不可达/隐藏形态（P2），另有扩展名兜底注释与实现不符、download 方法闸门缺失两处契约缺口（P3）。**
