[intake 输入] 【测评报告】dsh-lore 0.9.2 体验快测（工作记忆 / Agent Skill · 方法试验）

<!-- intake:v1 {"project":"bench","difficulty":"medium","impact":"B","target":"IThinkItsaName/dsh-lore","form":"intake"} -->

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
- 本件是**投给 review.lingshulab.com（灵枢插件测评子站）的测评**，marker 沿用 dsh-bounty 的 `intake:v1` 体例
  （站点 `<记录>` 的字段比 marker 多，本件只交付可复跑证据，不代替站点记录）。
- **不排名、不给总分、不用星级**：只给逐条读数与四态边界（已验 / 未验 / 不确定 / 不做）。
- **仅 Windows 单平台**：本机 Windows 10.0.26200 x64，Linux / WSL / macOS **未跑**（见「诚实边界」）。
- 测评**未把插件装进任何正在使用的 DSH profile**（live profile 里没有 `dsh-lore` 链接，也没装）；
  全部读数来自**本地源码快照**＋**仓库副本内装齐 3 个 devDependency** 后的自带门禁＋**三个自带探针**。
- 每个数字都能在 `raw/` 里逐字找到（文件索引见 `README.md`）；`raw/manifest.txt` 是全部证据的 sha256 清单。

## 锚定提交

| 项 | 读数（证据文件） |
|---|---|
| 被测仓 | `IThinkItsaName/dsh-lore`（站点 id `01a14e0b-af4d-787a-8d48-cd2cc8f7738a`，`subpath: "."`） |
| 声明版本 | **0.9.2**（`package.json`；站点清单版本同值，见「环境与基线」） |
| 锚定提交 | `31d6552846ff53896cc4e6e677664f8ea0682186` —— 2026-10-18T04:24:18Z，`chore(release): v0.9.2` |
| 本地快照 | `D:\natnat\lingshu\外部插件\dsh-lore\dsh-lore-main`（**无 `.git`**，75 文件 / 2205985 B） |
| `package.json` | size **2490** / sha256 **`357210c9031dcfd7b8ffb92a6424e820fbd79575d3a4dada1ff29d8f683c8afb`**（`raw/20`） |
| 树指纹（全树） | **`ddb2d39b9b926d81e733a29b62704e03d51a102e31d474733c28044d299ed4a8`**（`raw/20`） |
| 逐目录树指纹 | lib `95fb7406…` / skills `84fe1f3c…` / tests `d5fe306e…` / tools `3296dd0e…` / docs `5f86dc19…` / locale `de6a4403…`（完整见 `raw/20-anchor-local.txt`） |
| 上游取件 | `codeload.github.com/…/tar.gz/31d65528…` → **789282 B，sha256 `1a149d7fbaa2baeeda04edbf3ab3f011f43663d55f14d68933db462c0b629dc7`**（gh-proxy.com 与 gh-proxy.org **两镜像逐字节相同**）；`raw/23` |
| 快照≡上游 | 解包后 **75/75 文件、逐文件 sha256 全等**，differing=0、only_in_*=0 → `SAME TREE`（`raw/21`） |
| npm 发布包 | `dsh-lore-0.9.2.tgz` **603945 B，sha256 `9f384834b8117fbea0f681ac694101cd89616172a4be62fb6a8f61173eab3dd0`**；包内 57 文件，与快照共有的 **57/57 逐字节相同**（`raw/24`） |
| 宿主 | DeepSeek Harness **0.2.1-rc.2**（`dsh --version` = `0.2.1-rc.2`，`raw/00`） |

> **锚定注记（方法学，不是插件缺陷）**：交办文字里的 tarball sha256 `e50c9e59…` 在本机**无法复现**：
> 两个独立镜像对同一 commit 都取到 `1a149d7f…`，npm 发布包是另一个字节流（`9f384834…`），
> registry 的 `dist.shasum` 是 sha1（`9558dabb…`）。所以本件**不以 tarball sha 作锚**，而是以
> **逐文件树指纹 + 与上游 commit 树的逐文件比对**作锚（`raw/20`、`raw/21`、`raw/23`）。
> 详见「发现 P3-2」。

## 环境与基线

| 项 | 读数（证据） |
|---|---|
| 宿主 | DeepSeek Harness **0.2.1-rc.2**；`DSH_HOME=C:\Users\30951\.dsh`，profile=`desktop` |
| 平台 | **仅 Windows** 10.0.26200 x64（`platform.platform()` = `Windows-10-10.0.26200-SP0`，机器名 `bbs`）；WSL / Linux / macOS **未跑** |
| Node | **v24.21.0**（DSH 自带：`…\runtime\primary-runtime\dependencies\node\bin\node.exe`；**不在 PATH**） |
| Python | **3.12.10**（`C:\Users\30951\AppData\Local\Programs\Python\Python312\python.exe`） |
| pnpm | **11.28.5**（`…\primary-runtime\dependencies\pnpm\bin\pnpm.cjs`，用上面的 node 跑；**不在 PATH**） |
| npm / git | **不在 PATH**（本机无独立 npm；本件的「自带门禁」是用 node 直接跑 `.mjs`，不需要 npm） |
| cargo | 在 PATH（`C:\Users\30951\.cargo\bin\cargo.EXE`）——本件未用 |
| 网络 | `registry.npmjs.org` **HTTP 200**、`review.lingshulab.com` **HTTP 200**；GitHub 域名被 hosts 指向 `127.0.0.1`（`raw/00`），取件走 `测试/tools/gh-fetch.mjs` 镜像 |
| 插件安装面（基线） | desktop profile **没有** `dsh-lore` 链接（`C:\Users\30951\.dsh\profiles\desktop\node_modules\dsh-lore` 不存在）⇒ 本件的「无插件基线」就是**未安装**；本轮也**不安装** |
| 依赖安装（仅仓库副本） | 在 `worktree/pkg`（快照的逐字节副本）里 `pnpm install`：**22 个包，17.2 s，exit 0**（`@deepseek-ai/dsh-tools`/`dsh-llm` 0.2.0-rc.2、`schemastery` 3.18.4）；**原始快照未装任何依赖**，副本与快照的 75 个源文件逐字节相同、只多一个 `pnpm-lock.yaml`（`raw/22`）。侧写：pnpm 把 content-addressable store 放到了 `D:\.pnpm-store\v11`（本机默认 store 无法硬链接，pnpm 自动切换，属其正常行为）；`worktree/`（含 node_modules）在交付时**已删除**，用 `raw/` 里两个 tarball 可重建 |
| 站点清单（外部面） | review.lingshulab.com：`dsh-lore` **reviewed=false（暂无评测）**、`manifestVersion=0.9.2`、`upstream=可访问`、`synced=2026/10/18 16:59`、`subpath="."`；站点共 31 条清单（`raw/00` §4） |

## 结果速览

| 面 | 结果 | 证据 |
|---|---|---|
| 锚定（快照 vs 上游 commit） | **75/75 文件逐字节相同**，`SAME TREE` | `raw/21` |
| 发布包（npm 0.9.2） | **57/57 共有文件逐字节相同**；运行必需文件（`lib/index.js`、`lib/client.js`、`cordis.patch.yml`、`skills/**/journal.py`、`locale/*`）均在包内 | `raw/24` |
| 自带 Python 自测（`_selftest.py`） | **867/867 passed（2 条跳过未计入），exit 0**，**573.6 s** | `raw/10` |
| 自带 node 门禁（20 条命令） | **20/20 通过**（清空宿主导出的 `DSH_PROFILE_DIR`）；保留该变量时 **19/20**（只有 `preaudit` 红，原因是 live profile 未装插件，见 P3-1） | `raw/31` / `raw/30` |
| 独立探针 · 技能层（`probes/probe_skill_layer.py`） | **28/28 断言通过** | `raw/40` |
| 独立探针 · 记忆层（`probes/probe_memory_layer.py`） | **31/31 断言通过** | `raw/41` |
| 独立探针 · 插件层（`probes/probe_plugin_mount.mjs`） | **39/39 断言通过** | `raw/42` |
| 官方安装通道（`dsh plugin add` / 市场安装） | **未验**（见「诚实边界」） | — |

**一句话读数**：三套自带门禁 + 三个自带探针在本机**全绿**（`_selftest` 867 条、node 门禁 20 条命令、
探针 28+31+39 条断言），**未发现 P0 / P1 / P2**；发现的 3 条都是 **P3**（开发门禁的一处误红、
交办给的 tarball sha 不可复跑、`new --insert` 补行留占位符）。

## 逐项读数

### 1. 自带 Python 自测（`npm test` 的实体，`raw/10`）

```bash
python -B skills/project-work-log/scripts/_selftest.py     # 本机 Python 3.12.10，PYTHONUTF8=1
```

```
867/867 passed（2 条跳过，未计入）
      SKIPPED: N5-③ write_raw 保住权限位
      SKIPPED: inbox 不跟随符号链接
exit = 0        elapsed = 573.6 s        （命令与完整输出见 raw/10 头部 7 行 + 全文 875 行）
```

- `-B`：不写 `__pycache__`，被测快照保持逐字节不变。
- 2 条跳过是**平台相关项**（权限位 / 符号链接），自测自己在尾行标注「跳过未计入」，不混进通过数。
- 自测**规模自检**：自测最后一步会核对 SKILL.md / analysis.md / commands.md 里写的「共 N 项」是否等于
  真正跑过的断言数（`867`），所以文档与自测规模不会脱钩。

### 2. 自带 node 门禁（`raw/31`，20 条命令全绿）

| # | 命令 | 关键读数 |
|---|---|---|
| 1 | `node tests/run.mjs` | `139/139 passed` |
| 2 | `node tests/registry-contract.mjs` | `every provider output satisfies the rules the registry applies` |
| 3 | `node tests/manifest.mjs` | `all bundle manifest checks passed (3 skipped)` |
| 4 | `node tests/audit-paths.mjs` | `path consistency OK` |
| 5 | `node tests/audit-doc-consistency.mjs` | `doc/identifier consistency OK` |
| 6 | `node tests/audit-ranks.mjs` | `catalog rank relations OK (1 skipped)` |
| 7 | `node tests/audit-versions.mjs` | `version consistency OK (1 skipped)` |
| 8 | `node tests/audit-locale.mjs` | `plugin locale metadata OK` |
| 9 | `node tests/audit-client.mjs` | `client half OK — lib/client.js loads under id dsh-lore with 2 resolvable require(s)` |
| 10 | `node tests/audit-client-tokens.mjs` | `client design tokens OK` |
| 11 | `node tests/audit-client-runtime.mjs` | `client runtime OK — the card claims its namespace, mounts, edits and reports` |
| 12 | `node tests/audit-settings.mjs` | `status route and settings stores OK` |
| 13 | `node tests/audit-memory-injection.mjs` | `memory injection OK — nothing means nothing, and both switches are real` |
| 14 | `node tests/audit-memory-settings.mjs` | `memory-root settings OK — card beats file beats environment beats the default…` |
| 15 | `node tests/audit-memory-migration.mjs` | `memory migration OK — copy, marker, idempotence, three refusals, and the failure path` |
| 16 | `node tests/audit-inbox-delivery.mjs` | `inbox delivery OK — …`（**18.8 s**，20 条里最慢） |
| 17 | `node tests/audit-harness-hygiene.mjs` | `harness hygiene OK — 17 gates wired…`（提到 **120 mutations**、12 phases） |
| 18 | `node tests/preaudit.mjs` | `AUDIT CLEAN — the host will import sha256:2cd0649702cec925 … (2 skipped)` |
| 19 | `node tools/build-skill-only.mjs --check` | `in sync (3 files, line endings normalised)` |
| 20 | `node tests/audit-paths.mjs`（`test:skill-only` 的第二条） | `path consistency OK` |

- 全部 **exit=0**；20 条合计 **26.1 s**（`raw/31` 的 summary 段）。
- 第 18 条给出**入口指纹**：`lib/index.js` sha256 前 16 位 `2cd0649702cec925`，**3473 行**（`raw/31`）。
- 第 19 条是自己核自己的派生物 `dist/skill-only/` 与 `skill-only/` 是否与源一致（构建产物漂移检查）。

**同一套命令保留宿主导出的环境变量再跑一遍**（`raw/30`）：`19/20`，唯一红的是第 18 条：

```
FAIL  the profile has the dsh-lore link  -- C:\Users\30951\.dsh\profiles\desktop/node_modules/dsh-lore
1 FAILED (1 skipped)
```

清空 `DSH_PROFILE_DIR` 后同一命令变成：

```
SKIP  profile link check SKIPPED (set DSH_PROFILE_DIR to enable it)
AUDIT CLEAN — the host will import sha256:2cd0649702cec925 and it satisfies the registry (2 skipped)
```

⇒ 这条红**不是**插件行为，是门禁的前置条件判定问题（P3-1）。

### 3. 独立探针 A：技能层（`probes/probe_skill_layer.py` → `raw/40`，28/28）

自建工作区夹具（台账按 `references/templates.md` §2 模板手写），不 import 被测仓的任何 test/fixture。

| 声明 | 读数 |
|---|---|
| `new --insert` 生成记录并补台账 | `created work_log/0001-first-entry.md` / `index: 已写入 A. 起步（2026-10-18 ~ ）：#0001`，exit 0；台账表结构保留 |
| **六个只读命令真的只读**（`brief`/`snapshot`/`outline`/`stats`/`search`/`show`） | 六条 exit 0；**跑前跑后整树 sha256 与文件数完全相同**（用指纹判，不信注释） |
| 两道门禁分工 | 未填的骨架：`check` → `0 error / 0 warn`（**结构门禁**，exit 0）；`check --strict --lint` → `4 error`，exit 1（**内容门禁**） |
| 填好同一篇后转绿 | `check --strict --lint` → `0 error / 0 warn / 0 info`，exit 0（同文件红→绿） |
| 外科式维护 | `status --set 阶段=v2-probe`、`todo --add 'probe todo item'` 均 exit 0；台账里出现新值，**原有 `- [ ] keep me` 仍在**；改完两道门禁仍 0 |
| `--dry-run` | `new … --dry-run` exit 0，**整树 sha256 不变** |
| **纯标准库**（README 第 7 行） | AST 收集 `journal.py` 的全部 import：`['__future__','argparse','csv','datetime','fnmatch','hashlib','io','json','os','re','sys','time','unicodedata','urllib','uuid','zipfile']`，**非标准库 = []** |
| 无 PYTHONPATH 也能跑 | `python -I -X utf8 journal.py brief` → exit 0（`-I` = 忽略 PYTHONPATH/user-site） |
| 编号/索引 | 第二篇拿到 `0002`；`outline` 两篇都在 |
| 坏记录被拦 | 缺验证实质的 `0003-broken.md`：`check` 只 `1 warn`（结构门禁按设计只警告），`check --strict --lint` **红并点出文件与原因** |
| `index sync` | 缺索引行的 `0003-unindexed.md` 被 `check` 点名 → `index sync` exit 0 并补行，不用手改台账 |
| 台账新鲜度 | 新增 `日期：2026-12-31` 的记录后：`[WARN] 「当前状态」(2026-10-18) 早于最新记录 (2026-12-31)，台账可能过期`；`--strict` 把该 WARN 抬成 ERROR（exit 1） |

### 4. 独立探针 B：记忆层（`probes/probe_memory_layer.py` → `raw/41`，31/31）

隔离记忆根（`--memory <tmp>`），不碰用户真实的 `~/dsh-lore-memory`。

| 声明（`references/memory.md`） | 读数 |
|---|---|
| `wl/NNNN` 需篇号**真实存在** | `--source wl/0001`（存在）→ `已加入 01-general.md`，exit 0；`--source wl/9999` → `ERROR: wl/9999 在记录目录里不存在`，exit 1 |
| 认不出的来源 → 拒绝 | `--source bogus:source` → `ERROR: 来源 bogus:source 认不出（写 <工作区>/wl/NNNN，或 manual:tested/read/inferred 之一）`，exit 1 |
| `manual:inferred` **强制标注** | 不带标注 → `ERROR: manual:inferred 必须显式标注「未经证实」…`，exit 1；带「未经证实」→ 接受，**重建索引后仍不进 INDEX.md**（文档写明「进索引=否」） |
| id 规则 | `Bad_ID` → `ERROR: id 不合法：只认小写拉丁 / 数字 / 连字符`；重复 id → `ERROR: id 已经存在（id 全局唯一…）`，均 exit 1 |
| `personal/` 隔离 | 默认检索 `0 条命中`（并提示「personal/ 默认不检索」）；`--include-personal` 后命中 |
| `INDEX.md` 是生成物 | `memory index` → `已重建 INDEX.md（83 字）`；`memory index --check` → `OK: INDEX.md 与正文一致（83 字）` |
| 单向门（发布清单） | `memory publish --upload` 写出 `<容器>/发布.md`（含 `upload: true` 与 `wl/0001` 行）→ 人工把那行改成能带走的一句话 → `memory collect` 收进全局分册（正文出现 `source: proj/wl/0001`）；**再跑一次 collect：`没有新东西（collect 是幂等的：清单没变就不重复收）`** |
| 索引漂移被抓 | collect 后未重建索引：`memory lint --strict` → `ERROR: INDEX.md: 索引与正文不一致：漏 1 条 / 多 0 条（漏：wl-0001） —— 跑 memory index 重建，别手改索引`，exit 1；重建后 `0 error / 0 warn / 0 info`，exit 0 |
| 状态面 | `memory status`：分册 1 个 / 条目 3 条（active 3）、名册 1 个工作区（upload: 1）、索引 83 字（软 800 / 硬 1500）、信箱 0 条、personal 1 条（不进索引、默认不检索）、反馈 0 |

### 5. 独立探针 C：插件层 + 注入预算（`probes/probe_plugin_mount.mjs` → `raw/42`，39/39）

自带一个最小 fake ctx（`skills.registerProvider` / `tools.register` / `systemPrompt.section|context` /
`effect` / `logger`），直接 import `lib/index.js`；`DSH_HOME`、`DSH_WORKLOG_SETTINGS`、`DSH_WORKLOG_MEMORY`
全部钉到临时目录。

| 声明 | 读数 |
|---|---|
| manifest 面 | name=`dsh-lore`、version=`0.9.2`、type=`module`、`dsh.bundle.patch=./cordis.patch.yml`、`exports["."]=./lib/index.js`、导出 `name`/`inject`/`apply`/`Config`（含 `toJSON`） |
| `inject` | `["skills","tools","systemPrompt"]` |
| `apply()` | 最小 ctx 上**不抛**、logger **零 error**；`effects` 注册 4 条：状态路由 / 记忆工具 / 记忆索引段 / 信箱上下文 |
| 每 bundle 一个 provider | 磁盘上 3 个带 `SKILL.md` 的 bundle → **注册 3 个 provider**，名字各异且都是 kebab-case |
| provider 真的服务内容 | `project-work-log` **35794 B**、`reliability-guidelines` **4156 B**、`client-require-whitelist` **3296 B**（合计 43246 B）；候选 rank 均为 **350** |
| 工具面 | 注册了 `worklog_memory`；`parameters` 是 JSON Schema：`required=["operation","workspace"]`，`operation.enum` 含 `search`/`inbox`；`output` 带 `{schema, render}`；有 `execute()` |
| **注入预算**（plugin-spec §四） | 记忆索引段文本 = **210 字符**（上限 800）；注入文本点名 `worklog_memory` |
| 上界是真上界 | 把 `INDEX.md` 换成 **935 字符** → 注入文本 **变成空串**（整段丢弃，不截断）；只有标题的空索引 → 也**空串** |
| 易变通道零字节 | 信箱为空时 `context()` 文本 = **`""`**（不是一行「暂无消息」） |
| bundle patch | `cordis.patch.yml` 48 行 / 2575 B，**含 `skill-filesystem`**（README 声称「本包已在 cordis.patch.yml 里处理」） |

### 6. 网络、取件与发布包（`raw/23`、`raw/24`）

- 上游 commit tarball：gh-proxy.com **16780 ms**、gh-proxy.org **12231 ms**，两者 **789282 B / sha256 相同**。
- npm 发布包与源码快照：共有 **57/57** 文件逐字节相同；`only_in_repo=18` 全部是 `package.json` 的
  `files` 白名单**故意不发布**的东西（`docs/`、`CHANGELOG.md`、`SETTINGS.md`、`PUBLISHING.md`、
  `RELEASING.md`、`dist/`、`.github/`、`package-lock.json`、`.git*`）。
- 运行必需文件都在包内（逐项 YES：`lib/index.js`、`lib/client.js`、`cordis.patch.yml`、
  `skills/project-work-log/SKILL.md`、`skills/project-work-log/scripts/journal.py`、
  `skills/project-work-log/references/commands.md`、`locale/zh-cn.json`）。

## 发现

> 本件**未发现 P0 / P1 / P2**。以下 3 条均为 **P3**（体验 / 开发门禁 / 锚定方法学），
> 都不改变插件在宿主里的运行行为。每条附复现命令与原始读数。

### P3-1 · `npm run audit`（`tests/preaudit.mjs`）在宿主 shell 里会「误红」，而不是跳过

**读数**（`raw/30`，保留宿主导出的环境变量）：

```
FAIL  the profile has the dsh-lore link  -- C:\Users\30951\.dsh\profiles\desktop/node_modules/dsh-lore
1 FAILED (1 skipped)
```

**原因**：DSH 的 shell 会导出 `DSH_PROFILE_DIR`（本机 `C:\Users\30951\.dsh\profiles\desktop`，`raw/00`）。
`preaudit.mjs` 的三分支是「没给 profile → SKIP」「给了但 profile 里没有 `dsh-lore` → **FAIL**」
「给了且指向本包 → PASS」；在一个**装了 DSH 但没装这个插件**的机器上，第二条恰好命中，
于是「没装」被报成「审计失败」，而不是「跳过」。

**复现**：

```bash
cd <仓库副本>            # 已在其中 pnpm install（3 个 devDependency）
node tests/preaudit.mjs                                     # 保留 DSH_PROFILE_DIR → 1 FAILED
python -X utf8 probes/run_node_suite.py --pkg . --node <node> --out /tmp/x   # 同上，见 raw/30
# 清空后再跑：
set DSH_PROFILE_DIR=   （PowerShell: $env:DSH_PROFILE_DIR=""）
node tests/preaudit.mjs                                     # → SKIP + AUDIT CLEAN（raw/31）
```

**影响**：只影响**开发门禁**的读数可判性（任何在 DSH 终端里从干净克隆跑 `npm run audit` 的人都会先看到
一条红）；不影响已发布运行时行为。**建议**：把「profile 存在但里面没有 `dsh-lore`」并入 SKIP 分支，
或要求显式 `--installed` 才做这项比对。

### P3-2 · tarball sha256 不适合作锚（交办值本机不可复现）

**读数**（`raw/23`、`raw/24`）：

| 来源 | sha256 | 备注 |
|---|---|---|
| 交办文字给的 | `e50c9e594000588ae8005dc9e25ad0950152ab54ac50cfcc0f75c85bce81c72f` | **本机取不到** |
| codeload @commit，gh-proxy.com | `1a149d7fbaa2baeeda04edbf3ab3f011f43663d55f14d68933db462c0b629dc7` | 789282 B |
| codeload @commit，gh-proxy.org | `1a149d7f…`（同上，逐字节一致） | 789282 B |
| npm 发布包 `dsh-lore-0.9.2.tgz` | `9f384834b8117fbea0f681ac694101cd89616172a4be62fb6a8f61173eab3dd0` | 603945 B / 57 文件 |

**影响**：交付里写成「锚定 tarball sha」会让第三方**无法复跑**（gzip 字节随打包通道而变：codeload 的
repo tarball 与 `npm pack` 的包本来就不是同一字节流）。**建议**：intake 锚定改用
**逐文件树指纹**（本件 `tree_fp(ALL)=ddb2d39b…`）或 **npm `dist.integrity`（sha512）**，不用 tarball sha。

### P3-3 · `journal.py new --insert` 补进台账的「方面」列是占位符 `---`

**读数**（`raw/40` 的 D1 段）：

```
$ journal.py new --title 'First entry' --insert
created work_log/0001-first-entry.md
index: 已写入 `A. 起步（2026-10-18 ~ ）`：#0001
—— 台账那行实际是：| [0001-first-entry.md](0001-first-entry.md) | --- |
```

**影响**：行补得对、结构也对（后续 `check --strict --lint` 全绿），只是「方面」列留了 `---` 占位，
需要人再回来手改；对「少写」（外科式维护）的目标略有折扣。**建议**：`--insert` 支持 `--aspect`（或
从 `--title` 摘要生成一句），无值时不写 `---` 而是留空并提示。

### 已验的正面结论（同样逐点可复跑）

- **三层各自可独立跑**：技能层无 DSH 依赖（`python -I` 也跑，AST 证明零第三方 import）；记忆层
  只靠 `--memory` 一个根；插件层在最小 fake ctx 上装载并注册 3 个 provider + 1 个工具 + 2 个注入通道。
- **门禁能区分「通过 / 跳过 / 失败」**：`_selftest` 2 条跳过单独列且不计入通过；node 门禁的
  `manifest.mjs`（3 skipped）、`audit-ranks`（1）、`audit-versions`（1）、`preaudit`（2）都显式 skip；
  CI 里「跳过」不会被读成「通过」。
- **注入预算是真上限**：超 800 字符的索引**整段丢弃**而不是截断（避免「把子集当全集」）；空信箱
  注入零字节（不付「暂无消息」的常驻成本）。
- **「文案说得到、工具做不到」这条被自测盯住**：注入文本点名 `worklog_memory`，而工具注册的
  `operation.enum` 里确有 `search`/`inbox`（`raw/42` 第 4 段）。
- **发布包与仓库树同源**：npm 0.9.2 的 57 个文件全部与快照逐字节相同。

## 诚实边界

- **已验**：
  ① 锚定（快照 ≡ 上游 commit 树 75/75 文件；npm 发布包 57/57 文件；两镜像 tarball 一致）；
  ② 自带 Python 自测 867/867（2 跳过）；
  ③ 自带 node 门禁 20 条命令（两种环境各跑一遍：19/20 与 20/20）；
  ④ 技能层 28 条断言（含「六个只读命令零改动」「纯标准库」「`-I` 隔离跑」）；
  ⑤ 记忆层 31 条断言（来源分档、`manual:inferred` 强制标注且不进索引、发布清单单向门 + collect 幂等、
     索引漂移被 lint 抓）；
  ⑥ 插件层 39 条断言（provider/工具/两注入通道/注入预算 210 字 + 上界丢弃/空信箱零字节）；
  ⑦ 查重（见下节）。
- **未验（没跑，列原因）**：
  ① **官方安装通道**：`dsh plugin --profile <p> add dsh-lore@v0.9.2`、插件市场安装、`pi install …`——
     本机虽有 `dsh` CLI，但**不把被测插件装进任何在用 profile**，故未执行；
  ② **真实 DSH 会话里的模型侧行为**：技能是否被正确选中/加载、`worklog_memory` 被模型调用后的端到端
     效果、设置卡片在真实页面上的渲染与保存——需要装进 profile 并由宿主驱动，本轮未做；
  ③ **Linux / WSL / macOS**：本机只有 Windows，单平台（声明见「性质声明」）；
  ④ **浏览器里的 client bundle**：`lib/client.js` 只在 Node 里过仓库自带 loader 仿真（`audit-client*`），
     未在真实 Web 宿主里渲染；
  ⑤ **卸载 / 回滚 / 升级迁移的实机路径**：仓库有 `audit-memory-migration.mjs` 覆盖的逻辑，但没有
     真实用户目录上的迁移演练；
  ⑥ **`npm run test:plugin` 的原样执行**：本机无 npm，改为**同序逐条**执行 package.json 里那 17 条
     命令 + `audit` + `test:skill-only` 的 2 条（共 20 条，见 `raw/31`），不是 `npm run` 这一层壳。
- **不确定**：
  ① 交办给的 tarball sha `e50c9e…` 的真实来源（本机三种通道都取不到，见 P3-2）；
  ② `audit-inbox-delivery.mjs` 耗时 18.8 s（其余 ≤1.2 s）是设计使然（真实文件系统轮询/唤醒计时）
     还是可优化，未深究；
  ③ `preaudit` 的那条误红是否作者有意（"你从干净克隆跑就等于没装，所以要红"）—— 未在文档里找到结论，
     故按 P3 报「可判性问题」而非「缺陷」。
- **不做**：不排名 / 不给总分 / 不用星级；不做安全渗透或漏洞利用；不改被测源码、不提 PR；
  不对非 Windows 平台下任何结论；不重算站点已有 3 条记录（dsh-memory / dsh-mnemon / dsh-auto-memory）；
  不把「暂无评测」当成「没价值」——本件只提供证据，评级归维护者。

## 查重

对照三处（读数见 `raw/00` §4，脚本 `probes/probe_environment.py`）：

| 对照对象 | 读数 |
|---|---|
| review.lingshulab.com 唯一真源 `review/data/plugins.json` | `rubric_version=2.0`，**3 条**记录（dsh-memory / dsh-mnemon / dsh-auto-memory），含 `lore` 的 **0** 条 |
| 站点清单快照（`测试/主创站筛选`，2026-10-18 抓） | 31 条清单里有 `dsh-lore`：`reviewed=false`（**暂无评测**）、`manifestVersion=0.9.2`、`upstream=可访问`、`synced=2026/10/18 16:59` |
| `dsh-bounty` 账本 `docs/bounty/ledger.json` | **595 个事件**；`dsh-lore` **0** 次、`dsh-worklog` **0** 次、`project-work-log` **0** 次、`worklog_memory` **0** 次 |
| 整个 dsh-bounty 快照（md/json/html/py/yml/txt/mjs/js，排除 node_modules） | 含 `dsh-lore` 的文件 **0** 个 |
| 本机工作区 | `测试/dsh-lore/` 本轮**新建**（开工前不存在），此前无此件 |

⇒ 对照 review 子站 / dsh-bounty 账本 595 事件 / 全仓逐文件检索，**未见同件**。本件是 dsh-lore **首评**。

## 复现步骤（第三方原样可跑）

环境：Windows x64；Node **v24.21.0**（DSH 自带，不在 PATH）；Python **3.12.10**；pnpm **11.28.5**；
`DSH_PROFILE_DIR` 建议**清空**后再跑门禁（否则 `preaudit` 会因 live profile 未装而红，见 P3-1）。

```powershell
# 0) 取件与锚定（本机 GitHub 走镜像；见 测试/网络通道.md）
node D:\natnat\lingshu\测试\tools\gh-fetch.mjs --url "https://codeload.github.com/IThinkItsaName/dsh-lore/tar.gz/31d6552846ff53896cc4e6e677664f8ea0682186" --out raw\upstream-dsh-lore-31d6552.tgz
tar -xzf raw\upstream-dsh-lore-31d6552.tgz -C worktree      # 顶层目录 = dsh-lore-<sha>，改名 upstream-31d6552
python -X utf8 probes\make_anchor.py --root local="D:\natnat\lingshu\外部插件\dsh-lore\dsh-lore-main" --root upstream=worktree\upstream-31d6552 --compare local,upstream --out raw\21-anchor-compare.txt
#   期望 verdict = SAME TREE (all paths + sha256 equal)

# 1) 环境/查重/取件读数
python -X utf8 probes\probe_environment.py --pkg <快照> --bounty D:\natnat\lingshu\dsh-bounty-main --site D:\natnat\lingshu\测试\主创站筛选 --tgz raw\upstream-dsh-lore-31d6552.tgz --out raw\00-env-baseline.txt

# 2) 仓库副本 + 装 3 个 devDependency（原快照不装、不改）
Copy-Item -Recurse <快照> worktree\pkg
cd worktree\pkg
node <…>\pnpm\bin\pnpm.cjs install --no-frozen-lockfile    # 22 个包 / 17.2 s / exit 0

# 3) 自带门禁（python 自测本机 573.6 s；node 门禁 26.1 s）
python -X utf8 D:\natnat\lingshu\测试\dsh-lore\probes\run_selftest.py --script "<快照>\skills\project-work-log\scripts\_selftest.py" --out ..\..\raw\10-selftest.txt
$env:DSH_PROFILE_DIR=""
python -X utf8 D:\natnat\lingshu\测试\dsh-lore\probes\run_node_suite.py --pkg . --node <node.exe> --out ..\..\raw\31-preaudit-noprofile.txt
#   期望 totals = 20 / pass = 20 / fail = 0

# 4) 三个独立探针（不依赖自带断言）
cd D:\natnat\lingshu\测试\dsh-lore
python -X utf8 probes\probe_skill_layer.py  --journal "<快照>\skills\project-work-log\scripts\journal.py" --out raw\40-probe-skill-layer.txt
python -X utf8 probes\probe_memory_layer.py --journal "<快照>\skills\project-work-log\scripts\journal.py" --out raw\41-probe-memory-layer.txt
node probes\probe_plugin_mount.mjs --pkg worktree\pkg --out raw\42-probe-plugin-mount.txt

# 5) 发布包核对
python -X utf8 probes\probe_npm_package.py --pkg "<快照>" --tgz raw\dsh-lore-0.9.2.npm.tgz --out raw\24-npm-package.txt

# 6) 证据整理与 issue（固定动作）
node D:\natnat\lingshu\测试\tools\normalize_raw.mjs raw
node D:\natnat\lingshu\测试\tools\make_manifest.mjs --raw raw --label "dsh-lore 0.9.2"
node D:\natnat\lingshu\测试\tools\make_issue.mjs --report "测评报告_dsh-lore_v0.1.md"
```

> node 的实际路径：`C:\Users\30951\AppData\Local\Programs\DeepSeek Harness\resources\runtime\primary-runtime\dependencies\node\bin\node.exe`
> pnpm 的实际路径：同目录下 `pnpm\bin\pnpm.cjs`（用上面的 node 跑）。
> 所有探针都自己建临时夹具/隔离根，跑完即删；`--keep` 可保留夹具目录（技能层/记忆层探针支持）。

## 一句话总结

**dsh-lore 0.9.2（上游 `31d6552`）在本机 Windows 单平台上：三层各跑得通——技能层 867/867 自测通过且
零第三方依赖（`python -I` 亦可跑）、记忆层 31 条断言全绿（来源分档/强制标注/发布清单单向门/索引漂移都被
门禁盯住）、插件层 39 条断言全绿（3 provider + `worklog_memory` 工具 + 记忆注入 210 字、超 800 字整段丢弃、
空信箱零字节）；node 门禁 20 条命令在干净环境 20/20；未发现 P0/P1/P2，3 条 P3 分别是 `preaudit` 在
宿主 shell 里的误红、交办给的 tarball sha 不可复跑（应改用树指纹）、以及 `new --insert` 补行留 `---` 占位。
**
