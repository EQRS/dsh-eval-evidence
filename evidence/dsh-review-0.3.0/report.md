[intake 输入] 【测评报告】dsh-review 0.3.0 体验快测（代码评审 / PR · 方法试验）

<!-- intake:v1 {"project":"bench","difficulty":"medium","impact":"B","target":"STARDUSTLC666/dsh-review","form":"intake"} -->

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
- **不排名、不给总分、不用星级**：只给逐条读数与四态边界（已验 / 未验 / 不确定 / 不做）。
- **仅 Windows 单平台**：本机 Windows 10.0.26200 x64；Linux / WSL / macOS **未跑**。
- 测评**未把插件装进任何正在使用的 DSH profile**；全部读数来自**本地源码快照**＋**仓库副本内的构建与测试**＋**三个独立探针**。
- **关键环境边界（全篇成立的前提）**：本机**没有 Git**（`git` 不在 PATH，且全盘常见路径检索 0 命中，见 `raw/00`）。
  该插件自身要求 Git（README「需要 Git、Node.js 22.19+ / 24+」），因此**所有依赖 git 仓库的路径都未验**，
  包括真实审阅流程、`scripts/host-acceptance.mjs` 与自带测试里 46 条需要临时 git 仓库的用例。
- 每个数字都能在 `raw/` 里逐字找到（文件索引见 `README.md`）；`raw/manifest.txt` 是全部证据的 sha256 清单。

## 锚定提交

| 项 | 读数（证据文件） |
|---|---|
| 被测仓 | `STARDUSTLC666/dsh-review`（npm 包名 **`@stardustlc/dsh-review`**；站点 id `01a14f25-263e-7df1-9d8e-193b3092a5b6`，`subpath: "."`） |
| 声明版本 | **0.3.0**（`package.json`；站点清单版本同值，见「环境与基线」） |
| 锚定提交 | `53a30cf1152a15ebc615c7ffadf11ba288afcaef` —— 2026-10-17T14:40:25Z |
| 本地快照 | `D:\natnat\lingshu\外部插件\dsh-review\dsh-review-main`（**无 `.git`**，53 文件 / 219704 B） |
| `package.json` | size **1642** / sha256 **`6315e6d168c001435fe0547c849aa8f9e636e769bc7ffa1018b3bb847be2085a`**（`raw/20`） |
| 树指纹（全树） | **`6d083fafc33aa1d438d7426e1e65c919e927c52d23ae17d6f3db9e24c13731f1`**（`raw/20`） |
| 逐目录树指纹 | src `754f31e9…`（22 文件 / 120294 B）、test `50114367…`（13 / 49905）、scripts `9883f3bb…`（2 / 13443）、docs `18a45a56…`（4 / 14735）、.github `f55950c6…`（2 / 1045） |
| 上游取件 | `codeload.github.com/…/tar.gz/53a30cf1…` → **72092 B，sha256 `ba77f1b81651d1a003c66c2c7c0355cfe642a622afcd9d7d5e66e36e8bfc1585`**（gh-proxy.com 与 gh-proxy.org **两镜像逐字节相同**）；`raw/23` |
| 快照≡上游 | 解包后 **53/53 文件、逐文件 sha256 全等**，differing=0、only_in_*=0 → `SAME TREE`（`raw/21`） |
| npm 发布包 | `@stardustlc/dsh-review@0.3.0` tarball **56501 B，sha256 `f899830413e2e96dba051d2e9ecefa047fa71d0f0e04838458b0266e9baf783c`**；包内 54 文件，与本仓共有 **10/10 逐字节相同**；包内 `lib/` **44/44 与本 commit 重新构建的 `lib/` 逐字节相同**（`raw/24`） |
| 宿主 | DeepSeek Harness **0.2.1-rc.2**（`dsh --version`，`raw/00`）；插件自述适配验收于 0.2.1-rc.1 |

> **锚定注记（方法学，不是插件缺陷）**：交办文字给的 tarball sha256 `b3fa2e8d…` 在本机**无法复现**：
> 两个独立镜像对同一 commit 都取到 `ba77f1b8…`，npm 发布包是另一个字节流（`f8998304…`）。所以本件
> **不以 tarball sha 作锚**，而是以**逐文件树指纹 + 与上游 commit 树的逐文件比对**作锚（`raw/20`、`raw/21`、`raw/23`）。
> 详见「发现 P3-2」。

## 环境与基线

| 项 | 读数（证据） |
|---|---|
| 宿主 | DeepSeek Harness **0.2.1-rc.2**；`DSH_HOME=C:\Users\30951\.dsh`，profile=`desktop` |
| 平台 | **仅 Windows** 10.0.26200 x64（`raw/00`）；WSL / Linux / macOS **未跑** |
| Node | **v24.21.0**（DSH 自带 `…\primary-runtime\dependencies\node\bin\node.exe`；**不在 PATH**） |
| Python | **3.12.10**（仅用于运行本件的 Python 探针/工具，不是被测插件依赖） |
| pnpm | **11.28.5**（`…\dependencies\pnpm\bin\pnpm.cjs`，用上面的 node 跑；不在 PATH） |
| **Git** | **不在 PATH，且本机不存在**：常见安装路径逐个 `Test-Path` 全 False；`C:\Users\30951` 与 `D:\` 递归深度 5 的 `git.exe` 检索 **0 命中**（`raw/00` 的 toolchain 段与 §1） |
| npm | 不在 PATH（本件用 node 直接跑 `tsc` / `node --test`，不需要 npm） |
| 网络 | `registry.npmjs.org` **HTTP 200**、`review.lingshulab.com` **HTTP 200**；GitHub 域名被 hosts 指向 `127.0.0.1`，取件走 `测试/tools/gh-fetch.mjs` 镜像（`raw/00`） |
| 插件安装面（基线） | desktop profile **没有** `@stardustlc/dsh-review`（本轮不安装）；「无插件基线」= 未安装 |
| 依赖安装（仅仓库副本） | 在 `worktree/pkg`（快照的逐字节副本）里 `pnpm install`：**3 个包，25 s，exit 0**（`typescript` 5.9.2、`@types/node` 24.19.2 及其依赖）；**原始快照未装任何依赖**，副本的 53 个源文件与快照逐字节相同（`raw/22`） |
| 构建 | `node node_modules/typescript/bin/tsc -p tsconfig.json` → **exit 0，1.9 s，无输出**，产出 `lib/` **44 文件**（22 `.js` + 22 `.d.ts`，`raw/32`） |
| 站点清单（外部面） | review.lingshulab.com：`@stardustlc/dsh-review` **reviewed=false（暂无评测）**、`manifestVersion=0.3.0`、`upstream=可访问`、`synced=2026/10/18 21:13`、`subpath="."`；站点共 33 条清单（`raw/00` §4） |

## 结果速览

| 面 | 结果 | 证据 |
|---|---|---|
| 锚定（快照 vs 上游 commit） | **53/53 文件逐字节相同**，`SAME TREE` | `raw/21` |
| 发布包（npm 0.3.0） | 与本仓共有 **10/10 逐字节相同**；包内 `lib/` **44/44 与本 commit 构建产物逐字节相同** | `raw/24` |
| 构建（`npm run build` 的实体） | **exit 0，1.9 s**，产出 44 文件 | `raw/32` |
| 自带测试（`npm test` 的实体：build + `node --test "test/*.test.mjs"`） | **75 条：29 通过 / 46 失败 / 0 跳过**，4.27 s；46 条失败**全部归因于 `spawnSync git ENOENT`**（本机无 Git），**0 条**归因于插件逻辑（`raw/33` 逐块统计） | `raw/30`、`raw/33` |
| 宿主验收（`npm run test:host`） | **未验**：`scripts/host-acceptance.mjs` 要求 `DSH_REVIEW_DSH_ROOT` 指向已安装 DSH 的 node_modules，本机 DSH 打包在 `app.asar` 内，无法给出该目录（原始报错见 `raw/31`） | `raw/31` |
| 独立探针 A · 评审规则命中/漏报 | **70/70 断言通过** | `raw/40` |
| 独立探针 B · diff 边界 | **28/28 断言通过** | `raw/41` |
| 独立探针 C · 失败契约 | **43/43 断言通过** | `raw/42` |
| 官方安装通道（`dsh plugin add`） | **未验**（见「诚实边界」） | — |

**一句话读数**：三个独立探针共 **141 条断言全绿**（评审规则过滤/去重/证据契约、diff 边界、fail-closed 矩阵），
构建与发布包同源（44/44），**未发现 P0 / P1 / P2**；自带测试 46 红的**唯一原因**是本机缺 Git，
发现的 3 条都是 **P3**（`FileDiff.oldPath` 语义、交办给的 tarball sha 不可复跑、无 Git 时测试不 skip 而红）。

## 逐项读数

### 1. 自带测试门（`raw/30`）

```bash
# package.json: "test": "npm run build && node --test \"test/*.test.mjs\""
# 本机无 npm，故拆开执行：build 见 raw/32；测试用 node 直接跑
node --test "test/*.test.mjs"
```

```
ℹ tests 75   ℹ pass 29   ℹ fail 46   ℹ cancelled 0   ℹ skipped 0   ℹ todo 0
ℹ duration_ms 4267.5739          （runner exit=1）
```

- **46 条失败逐条归因**：全部命中 `Error: spawnSync git ENOENT`（`test/helpers.mjs` 的 `repo()` 先要
  `git init/commit`）；按测试块统计：**归因于缺 git = 46 条，归因于其它原因 = 0 条**（`raw/33` 的逐块统计，
  原文 `attributed to missing git (spawnSync git ENOENT) = 46` / `attributed to anything else = 0`）。
- **29 条通过**（不需要 git 的纯函数/纯文件用例），包括：diff 解析 4 条、dispatcher 2 条、账本 6 条
  （含「坏状态文件不致命」「并发实例不能互相覆盖」「v1 迁移不继承 clean approval」）、模式/风险 3 条、
  工具注册与配置 2 条、PR 政策 7 条（机器人/作者/旧提交不填人工名额、精确 head、未解决线程、策略 fail-closed 等）、
  GitHub 适配器 1 条、REVIEW.md/glob 3 条。

### 2. 构建（`raw/32`）

```
$ node node_modules/typescript/bin/tsc -p tsconfig.json
exit = 0   elapsed = 1.9s   output lines = 0
```

产出 `lib/` 44 个文件（22 `.js` + 22 `.d.ts`），与 npm 发布包里的 `lib/` **44/44 逐字节相同**（`raw/24`）。

### 3. 独立探针 A：评审规则「命中 / 漏报」（`probes/probe_gate_rules.mjs` → `raw/40`，70/70）

自建一个最小 `ReviewTarget`（不跑 git、不读被审仓），直接对被测模块的公开函数下断言。

| 声明（README / docs） | 读数 |
|---|---|
| REVIEW.md 的「限制 / 跳过 / 坏掉长什么样 / 敏感路径」 | `parseRules` 解出 `maxNits=0`、`severityFloor=blocker`、`mode=deep`、`skip=['vendor/**','**/*.lock']`、2 条 failureSignals、`sensitivePaths=['src/billing/**']`；无文件时 `found=false`；**非法值被忽略**（`max_nits: lots` → null）；**>32 KiB 直接拒收** |
| 跳过 glob 语义（`**` 任意层级、`*` 只在本层） | 10 个用例矩阵符合：`vendor/**` 命中 `vendor/a/b.js` 不命中 `src/vendor.js`；`**/*.lock` 命中 `x.lock`、`a/b/c.lock`，不命中 `package-lock.json`；`src/*.ts` 不命中 `src/sub/a.ts` |
| **「风格、命名、格式和清理建议直接过滤」** | `DROP_KINDS` 9 个（style / formatting / format / diagnostics / diagnostic / cleanup / nitpick / naming / whitespace）**全部被 `parseCandidate` 丢弃（返回 null）**；`correctness` 通过并拿到 16 位指纹；**未知 kind 不是静默丢弃，而是报错**（`Unknown finding kind`） |
| 证据必须引用快照真实行 | 用 base 侧的行当 after 侧锚 → `Finding does not quote exact snapshot source`；`line=0` 同样被拒；`side:"before"` 可引用 base 快照；`introducedBy` 落在未改动行 → `Finding is not linked to a changed introducing line`；`sourceMatches` 精确匹配、off-by-one 拒绝 |
| 已发表按指纹去重 | 同一缺陷被两个 lens 报出 → **同一指纹**（不会双报）；同一锚文本在文件里出现两次（第 4/5 行）→ **不同指纹**（occurrence 参与计算）；大小写/空白/反斜杠归一化后指纹稳定 |
| 门槛与上限 | 默认 `severityFloor=important` → nit 被丢（postable 2 / dropped 1）；REVIEW.md 把 floor 降到 nit → nit 可发；`maxNits=1` + 2 条 nit → 1 发 1 丢；`maxFindings=1` + 2 条 confirmed → **1 发、1 转「未验证」**（不是超发）；同一 finding 第二轮按指纹 suppressed 且 `repeats` 累加；同指纹不同 severity 合并为一条（保留最高严重度） |
| 独立复核投票 | 3 票需 **≥2 一致**：2 confirm → confirm；2 reject → reject（并把上一轮同指纹 finding 标为 wrong/fixed）；**只有 1 票或票数不足 → unverifiable（不放行）**；三条互不相同的决定 → unverifiable；理由 <12 字符 / confirm 无 witness / pre-existing 无 before 证据 / 伪造 witness → 全部报错 |
| 模式与风险表 | quick = correctness+security、1 复核、无汇总；standard = 4 镜头、3 复核、无汇总；deep = 4 镜头、3 复核、**有汇总者**；`classifyRisk`：文档/测试 → low、普通代码 → medium、`package.json`/`.github/workflows/**`/`auth/**` → **high**；high 强制 deep；人工批准数 low 0 / medium 1 / high 2 |

### 4. 独立探针 B：diff 边界（`probes/probe_diff_edges.mjs` → `raw/41`，28/28）

| 声明 | 读数 |
|---|---|
| 多文件 / hunk 行号 / 计数 | 两文件三段 hunk；`added=2 removed=2`；新增行 `newNo=2`、`oldNo=null`；删除行 `oldNo=2`、`newNo=null`；上下文行两侧都有号；`complete=true` |
| 二进制变更 | `Binary files … differ` 与 `GIT binary patch` 两种写法都标记 `binary=true`（上层据此在自动放行处拒绝，见探针 C） |
| 状态识别 | added / deleted / renamed / copied 四种都识别；rename 保留 `oldPath=old.txt`、`path=new.txt` |
| Git 引号路径 | 八进制 UTF-8 路径解码为 `文.md`；`\t` 转义为真实 TAB；**非法转义抛错**（`Invalid Git path escape`）；未闭合引号抛错；未引号路径原样返回 |
| 无换行标记 / CRLF | `\ No newline at end of file` 不计入 diff 行、不影响增删计数；CRLF 输入解析后行文本不带 `\r` |
| 未知头 | 不能识别的 `diff --git` 头把 `complete` 置 **false**（上层据此报「审查未完成」，不是静默放过） |
| 空上下文 / 取上下文 | 单空格上下文行保留为 ctx 行（oldNo=2）而不是被丢；`contextAround` 按行号返回窗口、越界返回空 |

### 5. 独立探针 C：失败契约（`probes/probe_failure_contract.mjs` → `raw/42`，43/43）

| 声明（README「审查没完成时不要说通过」） | 读数 |
|---|---|
| 证据命令不得绕过宿主 | 无 runner / 无 live agent → `review_check requires the DSH controlled Bash runner and a live calling agent; direct process execution is disabled`；timeout 越界 → 明确报错；cwd 逃出工作区 → `Evidence command cwd must stay inside the workspace`；runner 的失败判定原样透传（`ok=false, exitCode=3`） |
| **前置条件缺失（本机无 git）** | `captureTarget()` → `Git read failed: spawn git ENOENT`（**明确失败，不是空 diff 放行**） |
| 账本 fail-closed | 损坏的 `state.json` → `Review ledger is corrupt; original file preserved. Gate remains blocked.`，且**原文件内容未被改动**；v1 旧账本 → 升为 v2 且 **heads 为空**（旧「通过」不沿用，legacy 保留）；`stateDir` 逃出工作区 → 拒绝；新账本 = version 2 / revision 0 |
| 自动放行矩阵（9 组拒绝 + 1 组放行） | 放行：complete+done+独立+有风险分级+无未验证+非二进制+最新一轮+无未处置 → `ok=true, exit=0`，且 boundary 写明「AI review layer only… No merge approval」。拒绝（均 exit=1 并给出对应理由）：未完成 / running / 外部任务（非独立）/ 缺风险分级 / 2 条未验证 / 二进制变更 / 非最新一轮 / 旧 targetId / 1 条未处置 finding |
| 批准人数 | 高风险+额外人工 → 2；中风险 → 1（上限 2） |
| PR 证据门禁（10 组拒绝 + 3 组通过） | 通过：精确 head 的 2 个可信批准 + 检查成功 + 无未解决线程；拒绝：机器人批准（不填人工名额）、旧提交批准、非可信 reviewer、未解决 change request、未解决线程、草稿 PR、缺检查/失败检查/别的 head 上的检查。作者不受信 → 要求 2 人；改到 `.github/workflows/**` → 至少 1 人；`alwaysTwoPaths` → 强制 2 人；高风险 → 2 人 |
| 策略解析 | 缺 `trustedAuthors` / 空 `requiredChecks` / 非法 appSlug → 全部 `Invalid trusted review policy…` 拒收 |

### 6. 环境与查重（`raw/00`）

- 宿主/工具链读数见「环境与基线」；本机 **`git` 不存在**（PATH 与全盘检索双证），这是本件最大的环境边界。
- 查重：账本 **595 事件**中 `dsh-review` **0**、`@stardustlc/dsh-review` **0**、`review_run` **0**、`review_gate` **0**；
  作者名 `STARDUSTLC666` 出现 **42** 次（是其**其他**插件的历史结算，不是本件）；
  整个 dsh-bounty 快照逐文件检索含 `dsh-review` 的文件 **0**；站点快照 33 条里本件 `reviewed=false`。

## 发现

> 本件**未发现 P0 / P1 / P2**。以下 3 条均为 **P3**（一致性 / 锚定方法学 / 开发门禁信号），
> 不改变插件在宿主里的运行行为；每条附复现命令与原始读数。

### P3-1 · `FileDiff.oldPath` 在 `added` 文件上不是 null（与 `TargetFile.oldPath` 语义不一致）

**读数**（`raw/41` 的 D3 段）：

```
added:   status=added   path=n.txt  oldPath=n.txt     ← 期望 oldPath=null（该文件没有旧侧）
deleted: status=deleted path=d.txt  oldPath=d.txt
```

`src/diff.ts` 在 `--- /dev/null` 分支里对 `status === 'added'` **跳过** `oldPath` 赋值，于是 `oldPath` 停留在
header 里的 `a/<path>`；而 `src/target.ts` 从 `--name-status` 构造 `TargetFile` 时对 `A` 明确给 `oldPath: null`。
两处形状对「新增文件没有旧路径」这件事的表示不一致。

**影响**：本件未找到依赖 `FileDiff.oldPath` 判定新增/删除的调用方（`sourceMatches`/`parseCandidate` 用的是
`TargetFile`），因此**未见功能损害**；属可读性与维护性缺陷（下一个写 diff 侧逻辑的人可能踩）。
**建议**：`parseDiff` 里 `added` 时把 `oldPath` 置 `null`（`deleted` 时把 `path` 与 `oldPath` 明确区分），
或在接口注释里写明「`FileDiff.oldPath` 只在 renamed/copied 上有意义」。

### P3-2 · tarball sha256 不适合作锚（交办值本机不可复现）

**读数**（`raw/23`、`raw/24`）：

| 来源 | sha256 | 备注 |
|---|---|---|
| 交办文字给的 | `b3fa2e8d…`（截断） | **本机取不到** |
| codeload @commit，gh-proxy.com | `ba77f1b81651d1a003c66c2c7c0355cfe642a622afcd9d7d5e66e36e8bfc1585` | 72092 B |
| codeload @commit，gh-proxy.org | `ba77f1b8…`（同上，逐字节一致） | 72092 B |
| npm 发布包 `@stardustlc/dsh-review@0.3.0` | `f899830413e2e96dba051d2e9ecefa047fa71d0f0e04838458b0266e9baf783c` | 56501 B / 54 文件 |

**影响**：intake 写成「锚定 tarball sha」会让第三方**无法复跑**——gzip 字节随取件/打包通道变
（codeload 的 repo tarball 与 `npm pack` 的包本来就不是同一字节流）。
**建议**：锚定改用**逐文件树指纹**（本件 `tree_fp(ALL)=6d083faf…`）或 **npm `dist.integrity`（sha512）**。

### P3-3 · 没有 Git 的机器上，自带测试是 46 红而不是「跳过」

**读数**（`raw/30`）：`node --test "test/*.test.mjs"` → `tests 75 / pass 29 / fail 46 / skipped 0`，
46 条逐条命中 `spawnSync git ENOENT`。

README 已声明「需要 Git」，所以这是**已声明的前置条件**，不是隐藏缺陷；但测试套件自身没有
「git 不在 PATH 就跳过依赖 git 的用例」的 preflight，于是**新机器上「没装前置条件」与「代码坏了」
在读数上不可区分**（本项目其他门禁是会显式 skip 的，见 `test/manifest`/`eval` 的 skip 风格）。
**建议**：`test/helpers.mjs` 的 `repo()` 在 `git` 缺失时 `t.skip()`（或 CI 前置检查里显式说明），
让 `fail` 只表示代码问题。

### 已验的正面结论（同样逐点可复跑）

- **发布包与源码同源**：npm `lib/` 44 文件与本 commit 重新构建的 `lib/` 逐字节相同（`raw/24`），
  所以「测评这棵树」的结论可以外推到安装包（就代码而言）。
- **「风格/命名/格式/清理不进审阅」是真的过滤**：9 类 kind 在 `parseCandidate` 处直接丢弃，
  不是靠提示词；未知 kind 反而报错（不静默吞）。
- **证据是机械校验的**：finding 必须引用快照精确行，verifier 的 witness 必须存在，
  pre-existing 必须有 base 侧证据，<12 字符的理由与无 witness 的 confirm 都被拒。
- **fail-closed 覆盖到位**：损坏账本、状态目录越界、缺 runner、无 git、外部任务冒充独立、
  二进制变更、未处置问题、非最新一轮——逐项都拒绝放行，且在放行时仍声明「不授予合并批准」。
- **风险分级与模式表与 README 一致**：敏感路径强制 deep，文档/测试算 low，人工批准数 0/1/2。

## 诚实边界

- **已验**：
  ① 锚定（快照 ≡ 上游 commit 树 53/53 文件；npm 包 lib 44/44 ≡ 本 commit 构建产物；两镜像 tarball 一致）；
  ② 构建 `tsc` exit 0（1.9 s / 44 文件）；
  ③ 自带测试 75 条的读数与逐条归因（29 pass / 46 fail，全部 46 条 = git ENOENT）；
  ④ 探针 A 70 条（规则解析/glob/过滤/证据/指纹/门槛/投票/模式风险）；
  ⑤ 探针 B 28 条（diff 边界）；
  ⑥ 探针 C 43 条（证据执行边界/缺 git/账本/放行矩阵/PR 门禁/策略解析）；
  ⑦ 查重（站点 33 条、账本 595 事件、全仓逐文件 0 命中）。
- **未验（没跑，列原因）**：
  ① **真实审阅流程**（`review_diff` → `review_run` → 独立 finder/verifier/arbiter → 自动放行/账本落盘）：
     需要 Git 仓库 + DSH 的子智能体/作业/权限预设服务 + 真实模型调用；本机无 Git，也不在 live 会话里跑；
  ② **宿主验收脚本**（`npm run test:host`）：`scripts/host-acceptance.mjs` 要求
     `DSH_REVIEW_DSH_ROOT` 指向已安装 DSH 的 node_modules；本机 DSH 打包在 `app.asar` 内，给不出该目录（`raw/31`）；
  ③ **需 Git 的 46 条自带测试**（review-flow / advanced / target / eval / cli 等）：本机无 Git；
  ④ **官方安装通道**（`dsh plugin --profile web add @stardustlc/dsh-review`、市场安装）：不装 live profile；
  ⑤ **真实 DSH 会话内的工具注册与模型调用**、设置/状态页 UI；
  ⑥ **Linux / WSL / macOS**：单平台；
  ⑦ **Windows 官方预设的 pwsh→Git Bash 桥接**（`src/index.ts` 里 `PSNativeCommandArgumentPassing`/Git Bash 路径）：
     本机既无 Git Bash 也无宿主受控终端；
  ⑧ **只读会话拒绝证据命令**（`index.ts` 的 `sandbox === 'read-only'` 分支）：需要宿主权限预设上下文。
- **不确定**：
  ① 交办 tarball sha `b3fa2e8d…` 的真实来源（本机三种通道都取不到，见 P3-2）；
  ② `FileDiff.oldPath` 在 added 上等于 path 是「有意留给下游」还是笔误（未见注释，按 P3 报一致性）；
  ③ 46 条 git 用例在装 Git 后是否全绿：**未验证**，只能确认它们的失败原因是同一前置条件缺失。
- **不做**：不排名 / 不给总分 / 不用星级；不跑真实 LLM 审阅（消耗 token 且需要宿主）；不做安全渗透；
  不改被测源码、不提 PR；不对非 Windows 平台下任何结论；不评估 GitHub API 真实调用（只验了适配器的纯逻辑测试通过）。

## 查重

对照三处（读数见 `raw/00` §4，脚本 `probes/probe_environment.py`）：

| 对照对象 | 读数 |
|---|---|
| review.lingshulab.com 唯一真源 `review/data/plugins.json` | 记录含 `dsh-review` 的 **0** 条（3 条记录仍是 dsh-memory / dsh-mnemon / dsh-auto-memory） |
| 站点清单快照（`测试/主创站筛选`，2026-10-18 21:13 抓） | 33 条清单里有 `@stardustlc/dsh-review`：`reviewed=false`（**暂无评测**）、`manifestVersion=0.3.0`、`upstream=可访问`、`subpath="."` |
| `dsh-bounty` 账本 `docs/bounty/ledger.json` | **595 个事件**；`dsh-review` **0**、`@stardustlc/dsh-review` **0**、`review_run` **0**、`review_gate` **0**；作者名 `STARDUSTLC666` **42** 次（其**其他**插件的历史条目） |
| 整个 dsh-bounty 快照（md/json/html/py/yml/txt/mjs/js，排除 node_modules） | 含 `dsh-review` 的文件 **0** 个 |
| 本机工作区 | `测试/dsh-review/` 本轮**新建**（开工前不存在），此前无此件 |

⇒ 对照站点清单 / dsh-bounty 账本 595 事件 / 全仓逐文件检索，**未见同件**。本件是 `@stardustlc/dsh-review` **首评**。

## 复现步骤（第三方原样可跑）

环境：Windows x64；Node **v24.21.0**（DSH 自带，不在 PATH）；pnpm **11.28.5**（node 跑 `pnpm.cjs`）；
**本机无 Git**，所以「需 git」的路径会按 `raw/30` 那样失败（这本身是读数之一）：

```powershell
cd D:\natnat\lingshu\测试\dsh-review
$node = "C:\Users\30951\AppData\Local\Programs\DeepSeek Harness\resources\runtime\primary-runtime\dependencies\node\bin\node.exe"
$pnpm = "C:\Users\30951\AppData\Local\Programs\DeepSeek Harness\resources\runtime\primary-runtime\dependencies\pnpm\bin\pnpm.cjs"

# 0) 取件与锚定
& $node ..\tools\gh-fetch.mjs --url "https://codeload.github.com/STARDUSTLC666/dsh-review/tar.gz/53a30cf1152a15ebc615c7ffadf11ba288afcaef" --out raw\upstream-dsh-review-53a30cf.tgz
New-Item -ItemType Directory -Force worktree | Out-Null
tar -xzf raw\upstream-dsh-review-53a30cf.tgz -C worktree
Rename-Item worktree\dsh-review-53a30cf1152a15ebc615c7ffadf11ba288afcaef worktree\upstream-53a30cf
python -X utf8 probes\make_anchor.py --root local="D:\natnat\lingshu\外部插件\dsh-review\dsh-review-main" --root upstream=worktree\upstream-53a30cf --compare local,upstream --out raw\21-anchor-compare.txt   # 期望 SAME TREE

# 1) 仓库副本 + 装 devDependency（原快照不装、不改）
Copy-Item -Recurse "D:\natnat\lingshu\外部插件\dsh-review\dsh-review-main" worktree\pkg
cd worktree\pkg
& $node $pnpm install --no-frozen-lockfile          # 3 个包，约 25 s
& $node node_modules\typescript\bin\tsc -p tsconfig.json   # 构建：exit 0，lib/ 44 文件
cd ..\..

# 2) 自带测试（本机 75 条：29 pass / 46 fail，全部 fail = git ENOENT）
python -X utf8 probes\run_cmd.py --cwd "worktree\pkg" --label "repo test suite" --out "raw\30-self-test.txt" -- $node --test "test/*.test.mjs"

# 3) 宿主验收（本机不可用：需要 DSH_REVIEW_DSH_ROOT；原始报错见 raw\31）
python -X utf8 probes\run_cmd.py --cwd "worktree\pkg" --label "host-acceptance" --out "raw\31-host-acceptance.txt" -- $node scripts/host-acceptance.mjs

# 4) 三个独立探针（不依赖自带断言；都只 import lib/ 的公开函数，无 git 也能跑）
& $node probes\probe_gate_rules.mjs      --pkg worktree\pkg --out raw\40-probe-gate-rules.txt        # 70/70
& $node probes\probe_diff_edges.mjs      --pkg worktree\pkg --out raw\41-probe-diff-edges.txt        # 28/28
& $node probes\probe_failure_contract.mjs --pkg worktree\pkg --out raw\42-probe-failure-contract.txt # 43/43

# 5) 环境/查重/取件 + 发布包核对
python -X utf8 probes\probe_environment.py --pkg "D:\natnat\lingshu\外部插件\dsh-review\dsh-review-main" --bounty "D:\natnat\lingshu\dsh-bounty-main" --site "D:\natnat\lingshu\测试\主创站筛选" --tgz raw\upstream-dsh-review-53a30cf.tgz --tgz2 raw\upstream-dsh-review-53a30cf.gh-proxy.org.tgz --out raw\00-env-baseline.txt
python -X utf8 probes\probe_package.py --pkg "D:\natnat\lingshu\外部插件\dsh-review\dsh-review-main" --built worktree\pkg\lib --tgz raw\dsh-review-0.3.0.npm.tgz --out raw\24-npm-package.txt --extract-to worktree\npm-extract

# 6) 证据整理与 issue（固定动作）
& $node ..\tools\normalize_raw.mjs raw
& $node ..\tools\make_manifest.mjs --raw raw --label "dsh-review 0.3.0"
& $node ..\tools\make_issue.mjs --report "测评报告_dsh-review_v0.1.md"
```

> 探针都自己建临时夹具/隔离根（`$env:DSH_HOME` 指向临时目录），跑完即删；`raw/` 里的两个 tarball
> 可原样重建 `worktree/`。`worktree/`（含 `node_modules`）在交付时**已删除**。

## 一句话总结

**@stardustlc/dsh-review 0.3.0（上游 `53a30cf1`）在本机 Windows 单平台上：源码树与上游 commit 53/53 文件逐字节相同，
npm 发布包的 `lib/` 44/44 与本 commit 构建产物相同（tsc exit 0 / 1.9 s）；141 条独立断言全绿——
「风格/命名/格式/清理」9 类 kind 在入口即被丢弃、finding 必须引用快照精确行、3 票复核需 ≥2 一致、
9 组自动放行拒绝条件 + PR 证据门禁 10 组拒绝条件全部 fail-closed、损坏账本/无 git/越界状态目录都明确拒绝放行；
未发现 P0/P1/P2，3 条 P3 分别是 `FileDiff.oldPath` 在新增文件上不为 null、交办给的 tarball sha 本机不可复跑
（应改用树指纹或 npm integrity）、以及本机无 Git 时自带测试 46 红而不是 skip。**
