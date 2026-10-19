[intake 输入] 【测评报告】dsh-codex-port 0.3.0 体验快测（Codex 技能转换 / Skills · 方法试验）

<!-- intake:v1 {"project":"bench","difficulty":"medium","impact":"B","target":"STARDUSTLC666/dsh-codex-port","form":"intake"} -->

<!-- 协议对齐：工程协议手册 v1.1（r2）§6 体验快测档；协议文件 sha256 8dd51cbf75b259c5dabfdb928eb112364231b5d8f9f580759534e5d78a34d849 -->
> **协议对齐（v1.1 · r2 · 体验快测档）**：本件是**体验快测**（手册 §6），只记录安装/功能点/卸载残留类检查结果；
> **不生成五种能力状态标签、不进入能力榜、不以「通过/合格」作为插件结论**；未覆盖项见「诚实边界」。
> - **协议绑定**：`工程协议手册-v1.1`（修订标识 r2），文件 sha256 `8dd51cbf75b259c5dabfdb928eb112364231b5d8f9f580759534e5d78a34d849`（快照 `测试/协议/`）。
> - **插件身份**：源码版（commit + 逐文件树指纹）或发布包版（版本 + 哈希），见「锚定提交」。
> - **环境配置 ID**：dsh 0.2.1-rc.2 / win32-x64 / Windows 10.0.26200 / node v24.21.0 / model=n/a（本快测未调用模型）/ 依赖与外部服务见「环境与基线」。
> - **安全口径（§4 三分法）**：本件**未做**六威胁安全审计 ⇒ 安全结论 = **未测**（不是「未发现问题」，也不是「已验证通过」）。
> - **时效（§13.7）**：测评完成后 90 个自然日内有效；版本/权限/数据流/依赖/宿主变化触发复核，旧报告不自动适用于新版本。


## 性质声明

- 本件是 **intake 输入**（外部贡献申报），不是悬赏：**不 /claim、不自行加 bounty 标签**，计分与归并由维护者裁定。
- 本件是**投给 review.lingshulab.com（灵枢插件测评子站）的测评**，marker 沿用 dsh-bounty 的 `intake:v1` 体例；
  站点记录字段比 marker 多，本件只交付可复跑证据，不代替站点记录。
- **与站点既有评测重叠（主动声明）**：站点 **2026-10-19 00:21** 已有 aroejony-cell 的
  《dsh-codex-port 0.3.0 测评：allowed-tools 被强制改成 Bash + `~` 路径静默错位》
  （review id `01a14fd0-c6aa-712d-bfbd-3c5285bb7a90`，<https://review.lingshulab.com/reviews/01a14fd0-c6aa-712d-bfbd-3c5285bb7a90>）。
  本件完成晚于该评测，**不主张首测**；定位为**独立复测 + 补充证据**，请求维护者按同件合并或按独立验证计分。
- **不排名、不给总分、不用星级**：只给逐条读数与四态边界（已验 / 未验 / 不确定 / 不做）。
- **仅 Windows 单平台**：本机 Windows 10.0.26200 x64；Linux / WSL / macOS **未跑**。
- 测评**未把插件装进任何正在使用的 DSH profile**；全部读数来自**本地源码快照**＋**仓库副本内的构建与测试**＋**三个独立探针**。
- **真实 DSH 技能加载 / 触发 / UI 未验**（本机未装 live profile，也没有真实 Codex CLI 家目录）；
  这一条在「诚实边界」里逐项列出，不拿静态证据冒充运行时验证。
- 每个数字都能在 `raw/` 里逐字找到（文件索引见 `README.md`）；`raw/manifest.txt` 是全部证据的 sha256 清单。

## 锚定提交

| 项 | 读数（证据文件） |
|---|---|
| 被测仓 | `STARDUSTLC666/dsh-codex-port`（npm 包名 **`dsh-codex-port`**；站点 id `01a14f26-e928-71f2-be2d-45d7e9753499`，`subpath: "."`） |
| 声明版本 | **0.3.0**（`package.json`；站点清单版本同值，见「环境与基线」） |
| 锚定提交 | `9b144ccfa69479b6e979aa7adb04179ebbce2056` —— 2026-10-08T12:00:12Z |
| 本地快照 | `D:\natnat\lingshu\外部插件\dsh-codex-port\dsh-codex-port-master`（**无 `.git`**，51 文件 / 2162234 B） |
| `package.json` | size **1472** / sha256 **`521e80de0c6aaf08d9c16015013da768b527f7b4d9b0fffef89162fd15646be3`**（`raw/20`） |
| 树指纹（全树） | **`681a87b36b2bad71a11607f1b4b4f39262aa2d45a9742c525a44b872dd841947`**（`raw/20`） |
| 逐目录树指纹 | src `e32df53e…`（6 文件 / 37923 B）、lib `db8fe01c…`（12 / 42974）、test `1c93c8e5…`（11 / 32468）、docs `14f7cf83…`（4 / 9684）、.github `4f88460b…`（6 / 11318） |
| 上游取件 | `codeload.github.com/…/tar.gz/9b144ccf…` → **2049002 B，sha256 `3f54bbb0bcc2d52e5ae4222a352e2abeb02e59154cb0bc3b6d18e9dde998b3d0`**（gh-proxy.com；含 2 MB 封面图，故字节数大）；`raw/23` |
| 快照≡上游 | 解包后 **51/51 文件、逐文件 sha256 全等**，differing=0、only_in_*=0 → `SAME TREE`（`raw/21`） |
| npm 发布包 | `dsh-codex-port@0.3.0` tarball **19598 B，sha256 `09a0f9ebd4fb7d73e0f49c4bb67d1d6d2a9e2b3521b41062ec61fcb35cb931e5`**；包内 22 文件，同名文件 **20/22 逐字节相同**，**README.md / README.en.md 两份不同**（见 P3-5）；包内 `lib/` **12/12 与本 commit 构建产物逐字节相同**（`raw/24`） |
| 宿主 | DeepSeek Harness **0.2.1-rc.2**（`dsh --version`，`raw/00`）；插件 `docs/VALIDATION.md` 记录的上轮验收宿主是 0.2.0-rc.1 |

> **锚定注记（方法学）**：交办给的 gzip tarball sha256 `d15d82bd…` 本机**不可复现**（本机取到 `3f54bbb0…`，
> npm 包是另一个字节流 `09a0f9eb…`）——交办文字里已注明「gzip sha 不可复现，以 commit+树指纹为准」。
> 本件因此以**逐文件树指纹 + 与上游 commit 树的逐文件比对**作锚（`raw/20`、`raw/21`、`raw/23`）。

## 环境与基线

| 项 | 读数（证据） |
|---|---|
| 宿主 | DeepSeek Harness **0.2.1-rc.2**；`DSH_HOME=C:\Users\30951\.dsh`，profile=`desktop` |
| 平台 | **仅 Windows** 10.0.26200 x64（`raw/00`）；WSL / Linux / macOS **未跑** |
| 工具链（本轮新装，走 `run.cmd` 包装器） | **git 2.56.0.windows.2**、Node **v24.21.0**、pnpm **11.28.5**、npm **12.2.0**、Go 1.27.2、Python 3.12.10；全部**不在系统 PATH**，通过 `cmd /c "C:\Users\30951\tools\run.cmd <cmd>"` 调用（`raw/01-toolchain-smoke.txt`、`测试/工具链.md`） |
| 网络 | `registry.npmjs.org` **HTTP 200**、`review.lingshulab.com` **HTTP 200**；GitHub 域名被 hosts 指向 `127.0.0.1`，取件走 `测试/tools/gh-fetch.mjs` 镜像（`raw/00`） |
| 插件安装面（基线） | desktop profile **没有** `dsh-codex-port`（本轮不安装）；「无插件基线」= 未安装 |
| Codex 家目录 | **本机未安装 Codex CLI**（无 `~/.codex`）；所有 discover/port 读数都在**自建临时 CODEX_HOME** 上取得 |
| 依赖安装（仅仓库副本） | 在 `worktree/pkg`（快照的逐字节副本）里 `pnpm install`：**4 个包，3.1 s，exit 0**（`yaml` 2.9.0、`@types/node` 24.13.3、`typescript` 5.9.3；pnpm 按 `packageManager: pnpm@11.7.0` 切到 11.7.0）；**原始快照未装任何依赖**，副本 51 个文件与快照逐字节相同（`raw/22`） |
| 构建 | `node node_modules/typescript/bin/tsc -p tsconfig.json` → **exit 0，2.0 s，无输出**，产出 `lib/` **12 文件**；**与仓库里已提交的 `lib/` 逐字节相同**（`raw/22`、`raw/32`） |
| 站点清单（外部面） | review.lingshulab.com：`dsh-codex-port` **reviewed=false（暂无评测）**、`manifestVersion=0.3.0`、`upstream=可访问`、`synced=2026/10/18 21:15`、`subpath="."`；站点共 33 条清单（`raw/00` §4） |

## 结果速览

| 面 | 结果 | 证据 |
|---|---|---|
| 锚定（快照 vs 上游 commit） | **51/51 文件逐字节相同**，`SAME TREE` | `raw/21` |
| 构建（`pnpm run build` 的实体） | **exit 0，2.0 s**，产出 12 文件；与仓库已提交的 `lib/` **逐字节相同** | `raw/32`、`raw/22` |
| 自带测试（`pnpm test` 的实体：build + `node --test "test/*.test.mjs"`） | **55/55 通过，0 失败，0 跳过**，2.04 s，exit 0 | `raw/30` |
| 发布包（npm 0.3.0） | 代码面同源：`lib/` **12/12 逐字节相同**；文档面漂移：README 两份不同（P3-5） | `raw/24` |
| 独立探针 A · frontmatter 转换 | **37/37 断言通过** | `raw/40` |
| 独立探针 B · 源发现（路径/优先级/版本） | **15/15 断言通过** | `raw/41` |
| 独立探针 C · 移植事务与四个工具面 | **50/50 断言通过** | `raw/42` |
| 真实 DSH 技能加载 / 触发 / UI | **未验**（未装 live profile；见「诚实边界」） | — |
| 官方安装通道（`dsh plugin add` / 面板安装） | **未验** | — |

**一句话读数**：自带门禁 **55/55 全绿**，三个独立探针 **102 条断言全绿**（frontmatter 源→目标格式、Codex 家目录发现与版本去重、
移植事务/回滚/目录边界、四个工具面）；**未发现 P0 / P1 / P2**，发现的 5 条都是 **P3**（拒绝信息不明、成功移植也留恢复目录、
文档少列一个工具、`allowed-tools` 恒为 Bash、npm README 与仓库不同步）。

## 逐项读数

### 1. 构建与自带测试（`raw/32`、`raw/30`）

```bash
# package.json: "test": "pnpm run build && node --test \"test/*.test.mjs\""
cmd /c "C:\Users\30951\tools\run.cmd pnpm install --no-frozen-lockfile"   # 4 包 / 3.1 s
node node_modules/typescript/bin/tsc -p tsconfig.json                     # exit 0 / 2.0 s / lib 12 文件
node --test "test/*.test.mjs"                                             # exit 0
```

```
ℹ tests 55   ℹ pass 55   ℹ fail 0   ℹ cancelled 0   ℹ skipped 0   ℹ todo 0
ℹ duration_ms 2036.2672
```

- 自带测试里与本件重点直接相关的用例名（原文）：`危险名称与 Windows 设备名称不产生安装目录`、
  `不改变公开名称清洗行为，但不能用 Harness 无法加载的名称覆盖旧版`、`按 Harness 解析要求拒绝空描述，允许有名称和描述的空正文`、
  `目标根位于源内、源与旧技能重叠时拒绝递归复制`。⇒ 本件探针所验的边界，仓库自己也钉了守卫。
- 构建产物与已提交 `lib/` **逐字节相同**（`raw/22` 的 51/51 identical），说明仓库里的 `lib/` 不是过期构建。

### 2. 独立探针 A：frontmatter 转换（`probes/probe_frontmatter.mjs` → `raw/40`，37/37）

| 声明（README「转换 frontmatter，清洗技能名称」/ `docs/USAGE.md`「移植规则」） | 读数 |
|---|---|
| 源格式解析（Codex `SKILL.md` 的 YAML frontmatter） | 标准块被识别；`name`/折叠多行 `description`/嵌套 `metadata` 都解析出来；正文与 frontmatter 分离；**无 frontmatter / YAML 损坏都记 `hasFrontmatter=false` 而不抛异常**；CRLF 可解析；**UTF-8 BOM 开头时 `---` 不被识别**（见「不确定」） |
| 目标格式（DSH frontmatter） | 生成 `name` / `description` / `compatibility` / `allowed-tools: Bash`；**可再被解析（round-trip）**；多行描述**逐字保留**；`compatibility` 含源插件名与 license（homepage 为空、license 为 `unknown` 时**不写空括号/不写 unknown**）；`metadata` 等 Codex 专属字段被丢弃；`title` 可兜底当 `name` |
| 整体转换 | 正文保留（仅去首部空白）；无 frontmatter 的源会得到「目录名 + **空描述**」——这种技能会在移植阶段被拒（与自带用例一致） |
| 名称清洗 | `video-best` / `Video_Best` / `video.best` 原样通过；空格、`/` → `_`；首尾空白裁剪；**`中文技能` → null（拒绝）**；`..`、`a..b`、空、纯空白、`-leading`、`.dotted` → 全部 null 拒绝 |
| 名称的**两套规则** | `sanitizeSkillName` 允许大写/下划线/点号（`SKILL_NAME_PATTERN=/^[A-Za-z0-9][A-Za-z0-9._-]*$/`），但移植时的宿主可加载性校验要求 **小写短横线**；`Video_Best` 能过清洗、过不了装载校验（P3-1 的证据） |

### 3. 独立探针 B：Codex 源发现（`probes/probe_discover.mjs` → `raw/41`，15/15）

自建 CODEX_HOME：解包目录（`.tmp/plugins/plugins/*`）+ 插件缓存（`plugins/cache/<分类>/<名>/` 与 `<分类>/<名>/<版本>/`）。

| 声明（README「发现本机 Codex 技能，支持自定义 CODEX_HOME」） | 读数 |
|---|---|
| 发现范围 | 六个带合法 `plugin.json` 的插件被发现（alpha/beta/delta/epsilon/gamma/zeta）；**没有 plugin.json、JSON 非法、name 为空**的目录全部忽略 |
| 技能枚举 | 只枚举含 `SKILL.md` 的子目录（散落文件、无 SKILL.md 的目录忽略）；名称取 frontmatter `name`，无 frontmatter 时回落目录名；列表描述**截断到 160 字符** |
| 去重与优先级 | 解包目录（priority 2）优先于缓存（priority 1）**除非缓存版本更新**：delta 解包 1.0.0 vs 缓存 9.9.9 → **缓存赢**；epsilon 解包 1.0.0 vs 缓存 0.5.0 → **解包赢**；gamma 缓存 1.0.0 vs 2.0.0 → **新版本赢** |
| 版本比较 | 预发布后缀被忽略：`2.0.0-beta.1` **不**算比 `2.0.0` 新（不会替换） |
| 其它 | 结果按插件名排序；homepage/license 带出（供 compatibility）；每个技能暴露自己的 `SKILL.md` 路径；空目录 / 不存在的家目录都返回空数组（给人类看的报错在工具层） |

### 4. 独立探针 C：移植事务 + 四个工具面（`probes/probe_port_tools.mjs` → `raw/42`，50/50）

| 声明（`docs/USAGE.md`「移植规则 / 备份与目录边界」） | 读数 |
|---|---|
| dryRun 只预览不写盘 | `status=planned`、`files=0`；目标目录**未创建**；对不存在的目标根也一样（`raw/42` C1） |
| 真实移植 | `status=ported`、文件计数；目标 `SKILL.md` 已转 DSH 格式（name 一致、description 保留、compatibility 含源插件、`allowed-tools: Bash`）、正文保留；普通子目录被复制；**Codex 专属 `agents/` 被剔除** |
| 幂等 | 同名再移植（overwrite=false）→ `skipped`，理由含 `overwrite=false` |
| 覆盖与备份 | `overwrite=true` → `ported`；目标里旧文件不在了，旧安装被移入 `.dsh-port-<技能名>-<随机>/previous/`（含旧文件），`recovery.json` 记录 `phase: "installed"`、`skill`；**事务目录顶层没有 `SKILL.md`**（不会被当成第二个技能） |
| 成功移植也留恢复目录 | 首次移植（非覆盖）**也会留下一个 `.dsh-port-<技能名>-<随机>/` 目录**（仅 `recovery.json`，无 `previous/`）——文档只写了「成功覆盖也保留 previous/ 及 recovery.json」（P3-2） |
| 名称失败契约 | 大写名（`Upper_Skill`）→ `failed`（`转换后的技能名称或描述无效`）；无 frontmatter（空描述）→ `failed`；Windows 设备名 `con` → `failed`（不产生安装目录） |
| 目标失败契约 | 空 `targetDir` → `failed`（`目标技能目录不能为空`）；文件系统根 → `failed`（`不能把文件系统根目录作为技能目录`）；目标是普通文件 → `failed`（`目标技能不是目录，拒绝覆盖`） |
| 源/目标重叠 | overwrite=false 先按「已存在」跳过；overwrite=true 走到重叠检查被**拒绝**（`技能源与安装目标重叠，拒绝递归复制或移动源目录`） |
| 工具面 | `buildCodexPortTools()` 注册 **4 个工具**：`codex_list` / `codex_port` / `codex_status` / `codex_health`；入口 `name='codex-port'`、`inject=['tools']` |
| `codex_list` | 报告发现的插件与技能数；`skill`/`plugin` 过滤不区分大小写、子串匹配；无命中时 `count=0` 但仍返回 `total`；`limit` 被夹到 1..200（0 与 500 都照常返回） |
| `codex_port` | dryRun：`plannedCount=1` / `failed=3`，**不创建目标目录**；真实移植：`ported=1` / `failed=3`，落地文件在盘上；`skills` 过滤不区分大小写、可按调用请求 overwrite；**abort 信号在写入前中止（AbortError）** |
| `codex_status` | `skills=4 / installed=1 / missing=3`，`missingNames` 列出未移植的技能名（大写/无 frontmatter/设备名三项） |
| `codex_health` | 正常时 `ok=true` + 两条逐项检查（Codex 主目录、插件目录）；家目录不存在时 `ok=false` 且给出可执行指引「…请检查是否安装了 Codex CLI，或在 cordis.patch.yml 里用 codexHome 显式指定」 |
| 配置解析 | 显式值 trim 后生效；缺省时 `CODEX_HOME` 优先；默认目标 `<DSH_HOME>/skills`；`overwrite` 默认 false |

## 发现

> 本件**未发现 P0 / P1 / P2**。以下 5 条均为 **P3**（可诊断性 / 磁盘残留 / 文档同步 / 最小权限声明），
> 都不改变「转换是否可用」这一核心结论；每条附复现命令与原始读数。

### P3-1 · 名称不合格时的拒绝信息只说「无效」，不说规则与修法

**读数**（`raw/42` C4、`raw/40` A4）：

```
mixed-case name (Upper_Skill) -> failed: 转换后的技能名称或描述无效，不能安装。
no frontmatter => empty description -> failed: 转换后的技能名称或描述无效，不能安装。
real port  -> failed: 转换后的 SKILL.md 未通过 DSH 技能名称、目录一致性或非空描述校验
```

`docs/USAGE.md` 已写明规则（「覆盖前要求转换后的技能名符合 DSH 的小写短横线命名规则…大写、下划线、点号或清洗后不同名的技能不会替换旧版」），
但**失败结果里没有指出是哪条规则不满足、也没有给出改法**（改成什么名）。对「批量移植」这个场景，模型/用户拿到
一堆 `failed` 却只能翻文档自己推。

**影响**：可用性/可诊断性；不改变安全性（拒绝是对的）。**建议**：失败原因带上「目标名应匹配
`^[a-z0-9]+(?:-[a-z0-9]+)*$`，当前清洗结果为 `Upper_Skill`」，或提供一个显式的 `rename` 映射参数。

### P3-2 · 首次移植（非覆盖）也会留下一个空的恢复目录

**读数**（`raw/42` C2/C3）：

```
transaction dirs left after a fresh install: [".dsh-port-sane-skill-W1rNB0"]
fresh-install transaction contents: ["recovery.json"]        ← 没有 previous/、没有 SKILL.md
transaction dirs after overwrite: [".dsh-port-sane-skill-W1rNB0", ".dsh-port-sane-skill-..."]
```

移植成功路径不清理事务目录；首次安装没有旧技能可备份，却仍留下只含 `recovery.json` 的目录。
文档只声明「**成功覆盖**也保留 `previous/` 及 `recovery.json`」（并在「备份与目录边界」里提醒会多占磁盘），
没有说明**非覆盖的成功移植**也会留下目录。批量移植 N 个技能就留 N 个空目录。

**影响**：目标技能目录里持续累积 `.dsh-port-*` 目录（不会被 DSH 重复注册——事务目录顶层没有 `SKILL.md`，
本探针已验证；但会占目录项、影响人工清理）。**建议**：非覆盖成功路径删除该事务目录（覆盖路径保留），
或把恢复资料集中到 `<容器>/.dsh-port-recovery/<runId>/` 并在文档里写明保留策略。

### P3-3 · 文档只列 3 个工具，代码注册 4 个（`codex_health` 缺席）

**读数**：`raw/42` C5 打印 `tools = ["codex_list","codex_port","codex_status","codex_health"]`；
`src/index.ts` 模块注释写「注册三个面向模型的工具（codex_list / codex_port / codex_status）」；
`docs/USAGE.md` 的「工具一览」表也只有 3 行。而 `docs/VALIDATION.md` 反而写了「注册 4 个工具」。
**影响**：文档与代码对不上，用户不知道有自检工具可用（`codex_health` 恰好是排错入口）。
**建议**：把 `codex_health` 补进 `docs/USAGE.md` 工具表与入口注释（或明确它是否对外）。

### P3-4 · 所有移植技能的 `allowed-tools` 恒为 `Bash`，不读源技能的权限声明

**读数**（`raw/40` A2）：转换器固定写 `allowed-tools: Bash`，源 frontmatter 里的 `metadata` 等字段被整体丢弃；
无 frontmatter 的技能也一样得到 `allowed-tools: Bash`（只要它过了装载校验）。
**影响（未定）**：若宿主的 `allowed-tools` 是**最小权限限制**，这等于给每个移植技能开启了 Bash；
若它只是给模型的提示，则无实际影响。本机未装宿主、也没有 DSH `allowed-tools` 语义的权威文档，
因此**不下结论**，只记读数与建议：至少应支持从源技能/配置映射权限，或在文档里说明「移植后一律声明 Bash」这一取舍。

### P3-5 · npm 发布包的 README 与仓库版本不同步

**读数**（`raw/24`）：22 个同名文件里 **20 个逐字节相同**，**2 个不同：`README.md`、`README.en.md`**：
npm 包里的两份 README **缺少**仓库版本里的这段并欢迎语（中文「欢迎使用，遇到问题或有改进建议，请提交 issues 和 PR。」/
英文对应段）。代码（`lib/` 12 文件）与仓库构建产物逐字节相同 ⇒ **发的是早期快照的包**（或发布后文档又改过）。
**影响**：装到的包内文档比仓库旧；不影响运行。**建议**：发版前把 README 变更与 `prepublishOnly` 构建一起纳入发布检查。

### 已验的正面结论（同样逐点可复跑）

- **源→目标格式转换是可逆、可校验的**：生成的 frontmatter 能再被解析，name/description 与源一致，多行描述逐字保留。
- **移植是事务化的**：先复制到目标根内的唯一 `.dsh-port-*` 目录、转换、回读校验，成功后才切换；覆盖时旧技能进 `previous/`，
  `recovery.json` 记录阶段；切换失败有回滚分支（`raw/42` 的读取与 `src/port.ts` 的路径一致；回滚分支本身需制造失败，见「未验」）。
- **目录边界是 fail-closed 的**：空目标、文件系统根、符号链接目标根、源/目标重叠、非目录目标、Windows 设备名、名不可装载，全部拒绝且有中文说明。
- **工具面行为与文档一致**（除 P3-3 的清单）：过滤大小写不敏感、limit 夹取、dryRun 零写入、abort 生效、状态统计与健康检查可执行。
- **自带门禁能区分构建/测试/跳过**：55/55、0 skip；构建产物与已提交 `lib/` 一致。

## 诚实边界

- **已验**：
  ① 锚定（快照 ≡ 上游 commit 树 51/51；npm 包 lib 12/12 ≡ 本 commit 构建产物；两 README 差异已定位）；
  ② 构建 `tsc` exit 0（2.0 s / 12 文件）；
  ③ 自带测试 55/55（2.04 s / 0 skip）；
  ④ 探针 A 37 条（frontmatter 源格式/目标格式/整体转换/名称清洗矩阵）；
  ⑤ 探针 B 15 条（解包目录/缓存/版本目录发现、优先级与版本去重、枚举与排序）；
  ⑥ 探针 C 50 条（dryRun、移植、幂等、覆盖备份与 recovery.json、名称/源/目标失败契约、4 个工具面、配置解析）；
  ⑦ 查重（站点 33 条、账本 595 事件、全仓逐文件 0 命中）。
- **未验（没跑，列原因）**：
  ① **真实 DSH 技能加载 / 触发 / UI**：未装 live profile，未在真实会话里让 host 加载移植出的技能并触发；本件只验证了
     「文件被按 DSH 形状写出」，**没有验证「DSH 会把它当技能加载」**——这是本件最大的边界；
  ② **真实 Codex CLI 家目录**：本机未安装 Codex，全部用自建临时 CODEX_HOME（结构按 `src/discover.ts` 的路径推断，
     不是从真实 Codex 安装里观测来的）；
  ③ **官方安装通道**（`dsh plugin --profile web add dsh-codex-port`、插件面板安装）：不装 live profile；
  ④ **Windows 符号链接/目录联接的拒绝路径**：探针未创建符号链接（普通权限下创建符号链接需要开发者模式/管理员），
     `src/port.ts` 的 symlink 分支只做了代码级阅读，**没有运行时读数**；
  ⑤ **回滚分支**（复制/转换失败后恢复旧技能、`rollback-failed` 分支）：需要人为制造切换期失败，
     本件只验证了正常覆盖的 `previous/` 与 `recovery.json`，**回滚动作本身未演练**；
  ⑥ **并发移植 / 同技能被两次 `codex_port` 同时写入**：未构造并发场景；
  ⑦ **大目录/超长路径/深嵌套技能**：未做规模测试；
  ⑧ **Linux / WSL / macOS**：单平台（`sep`/设备名/rename 语义在别的平台不同）；
  ⑨ **`allowed-tools: Bash` 在宿主里的实际作用**（`P3-4` 的影响面）：无宿主、无权威文档。
- **不确定**：
  ① **UTF-8 BOM 开头的 `SKILL.md`**：`---` 前有 BOM 时 frontmatter 不被识别（`raw/40` A1 读数），随后会走「无 frontmatter →
     空描述 → 拒绝」一路；这是有意（BOM 视为非法源）还是遗漏，未见注释；
  ② **P3-4 的权限语义**：`allowed-tools: Bash` 是限制还是提示，取决于宿主，本件不下结论；
  ③ **事务目录残留（P3-2）是否是有意设计**（例如为了「任何成功移植都可回滚」），文档只覆盖覆盖场景；
  ④ `docs/VALIDATION.md` 的「53 项测试 / 0.2.4」与当前 55 项是否只是版本推进，未逐条对照历史。
- **不做**：不排名 / 不给总分 / 不用星级；不安装 live profile；不真的安装 Codex CLI 或修改本机 `~/.codex`；
  不修改被测源码、不提 PR；不对非 Windows 平台下任何结论；不评估移植后技能的**模型效果**（那需要真实会话与评分集）。

## 查重

对照三处（读数见 `raw/00` §4，脚本 `probes/probe_environment.py`）：

| 对照对象 | 读数 |
|---|---|
| review.lingshulab.com 唯一真源 `review/data/plugins.json` | 记录含 `codex-port` 的 **0** 条（3 条记录仍是 dsh-memory / dsh-mnemon / dsh-auto-memory） |
| 站点清单快照（`测试/主创站筛选`，2026-10-18 21:15 抓） | 33 条清单里有 `dsh-codex-port`：`reviewed=false`（**暂无评测**）、`manifestVersion=0.3.0`、`upstream=可访问`、`subpath="."` |
| `dsh-bounty` 账本 `docs/bounty/ledger.json` | **595 个事件**；`dsh-codex-port` **0**、`codex-port` **0**、`codex_list` / `codex_port` / `codex_health` 各 **0** |
| 整个 dsh-bounty 快照（md/json/html/py/yml/txt/mjs/js，排除 node_modules） | 含 `codex-port` 的文件 **0** 个 |
| 本机工作区 | `测试/dsh-codex-port/` 本轮**新建**（开工前不存在），此前无此件 |
| review.lingshulab.com 站点评测（2026-10-19 复查） | **已有 1 篇**：aroejony-cell《dsh-codex-port 0.3.0 测评：allowed-tools 被强制改成 Bash + `~` 路径静默错位》，`01a14fd0-c6aa-712d-bfbd-3c5285bb7a90`，2026-10-19 00:21。本件晚于该评测，见「性质声明」重叠声明 |

⇒ 站点已有同件（1 篇，aroejony-cell）；本件**不主张首评**，作为**独立复测 + 补充证据**（102 条独立断言、
构建与已提交 `lib/` 逐字节一致、npm 包代码面 `lib/` 12/12、自带 55/55 测试、移植事务/工具面边界），
请求按同件合并或按独立验证计分。dsh-bounty 账本 595 事件 0 命中、全仓逐文件检索 0。

## 复现步骤（第三方原样可跑）

环境：Windows x64；工具链走 `cmd /c "C:\Users\30951\tools\run.cmd <cmd>"`（git 2.56.0 / node v24.21.0 / pnpm 11.28.5 / npm 12.2.0）；
**本机未安装 Codex CLI**，探针自带临时 CODEX_HOME。

```powershell
cd D:\natnat\lingshu\测试\dsh-codex-port
$node = "C:\Users\30951\AppData\Local\Programs\DeepSeek Harness\resources\runtime\primary-runtime\dependencies\node\bin\node.exe"

# 0) 取件 + 锚定（期望 SAME TREE）
& $node ..\tools\gh-fetch.mjs --url "https://codeload.github.com/STARDUSTLC666/dsh-codex-port/tar.gz/9b144ccfa69479b6e979aa7adb04179ebbce2056" --out raw\upstream-dsh-codex-port-9b144cc.tgz
New-Item -ItemType Directory -Force worktree | Out-Null
tar -xzf raw\upstream-dsh-codex-port-9b144cc.tgz -C worktree
Rename-Item worktree\dsh-codex-port-9b144ccfa69479b6e979aa7adb04179ebbce2056 worktree\upstream-9b144cc
python -X utf8 probes\make_anchor.py --root local="D:\natnat\lingshu\外部插件\dsh-codex-port\dsh-codex-port-master" --root upstream=worktree\upstream-9b144cc --compare local,upstream --out raw\21-anchor-compare.txt

# 1) 仓库副本 + 依赖 + 构建（原快照不装、不改）
Copy-Item -Recurse "D:\natnat\lingshu\外部插件\dsh-codex-port\dsh-codex-port-master" worktree\pkg
cmd /c "C:\Users\30951\tools\run.cmd pnpm install --no-frozen-lockfile"        # 在 worktree\pkg 下执行
& $node node_modules\typescript\bin\tsc -p tsconfig.json                        # 期望 exit 0、lib 12 文件
python -X utf8 probes\run_cmd.py --cwd "worktree\pkg" --label "repo test suite" --out "raw\30-self-test.txt" -- $node --test "test/*.test.mjs"   # 期望 55/55

# 2) 三个独立探针（不依赖自带断言；都只 import lib/ 公开函数并自建临时夹具）
& $node probes\probe_frontmatter.mjs  --pkg worktree\pkg --out raw\40-probe-frontmatter.txt      # 37/37
& $node probes\probe_discover.mjs     --pkg worktree\pkg --out raw\41-probe-discover.txt         # 15/15
& $node probes\probe_port_tools.mjs   --pkg worktree\pkg --out raw\42-probe-port-tools.txt       # 50/50

# 3) 环境/查重/取件 + 发布包核对
python -X utf8 probes\probe_environment.py --pkg "D:\natnat\lingshu\外部插件\dsh-codex-port\dsh-codex-port-master" --bounty "D:\natnat\lingshu\dsh-bounty-main" --site "D:\natnat\lingshu\测试\主创站筛选" --tgz raw\upstream-dsh-codex-port-9b144cc.tgz --out raw\00-env-baseline.txt
python -X utf8 probes\probe_package.py --pkg "D:\natnat\lingshu\外部插件\dsh-codex-port\dsh-codex-port-master" --built worktree\pkg\lib --tgz raw\dsh-codex-port-0.3.0.npm.tgz --out raw\24-npm-package.txt --extract-to worktree\npm-extract

# 4) 证据整理与 issue（固定动作）
& $node ..\tools\normalize_raw.mjs raw
& $node ..\tools\make_manifest.mjs --raw raw --label "dsh-codex-port 0.3.0"
& $node ..\tools\make_issue.mjs --report "测评报告_dsh-codex-port_v0.1.md"
```

> 探针全部自建临时 CODEX_HOME 与临时目标目录，跑完即删；`raw/` 里两个 tarball 可原样重建 `worktree/`。
> `worktree/`（含 `node_modules`）在交付时**已删除**。

## 一句话总结

**dsh-codex-port 0.3.0（上游 `9b144ccf`）在本机 Windows 单平台上：源码树与上游 commit 51/51 文件逐字节相同，
构建产物与仓库已提交的 `lib/` 一致，自带测试 55/55 全绿；102 条独立断言验证了「Codex SKILL.md 源格式 → DSH
frontmatter（name/description/compatibility/allowed-tools）」转换、Codex 家目录发现与「解包优先/新版本覆盖」去重、
移植事务（dryRun 零写入、覆盖备份 previous/ + recovery.json、名称/源/目标/设备名/重叠全部 fail-closed）与四个工具面；
未发现 P0/P1/P2，5 条 P3 分别是名称拒绝信息不可执行、成功移植也留恢复目录、文档只列 3 个工具而代码注册 4 个、
`allowed-tools` 恒为 Bash（权限语义未定）、npm 包 README 与仓库不同步；**真实 DSH 技能加载/触发/UI 未验**。**
