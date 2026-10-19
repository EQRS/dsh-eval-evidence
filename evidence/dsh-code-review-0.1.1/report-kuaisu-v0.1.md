[intake 输入] 【测评报告】dsh-code-review 0.1.1 体验快测（代码评审 / Go 引擎 · 方法试验）

<!-- intake:v1 {"project":"bench","difficulty":"medium","impact":"B","target":"Nicholas023/dsh-code-review","form":"intake"} -->

<!-- 协议对齐：工程协议手册 v1.1（r2）§6 体验快测档；协议文件 sha256 8dd51cbf75b259c5dabfdb928eb112364231b5d8f9f580759534e5d78a34d849 -->
> **协议对齐（v1.1 · r2 · 体验快测档）**：本件是**体验快测**（手册 §6），只记录安装/功能点/卸载残留类检查结果；
> **不生成五种能力状态标签、不进入能力榜、不以「通过/合格」作为插件结论**；未覆盖项见「诚实边界」。
> - **协议绑定**：`工程协议手册-v1.1`（修订标识 r2），文件 sha256 `8dd51cbf75b259c5dabfdb928eb112364231b5d8f9f580759534e5d78a34d849`（快照 `测试/协议/`）。
> - **插件身份**：源码版（commit + 逐文件树指纹）或发布包版（版本 + 哈希），见「锚定提交」。
> - **环境配置 ID**：dsh 0.2.1-rc.2 / win32-x64 / Windows 10.0.26200 / node v24.21.0 / model=n/a（本快测未调用模型）/ 依赖与外部服务见「环境与基线」。
> - **安全口径（§4 三分法）**：本件**未做**六威胁安全审计 ⇒ 安全结论 = **未测**（不是「未发现问题」，也不是「已验证通过」）。
> - **时效（§13.7）**：测评完成后 90 个自然日内有效；版本/权限/数据流/依赖/宿主变化触发复核，旧报告不自动适用于新版本。


## 性质声明

本件是 **intake 输入**（外部贡献申报），不是悬赏：**不 /claim、不自行加 bounty 标签**，计分与归并均由维护者裁定。
本件是**对 `review.lingshulab.com` 主创站插件 dsh-code-review 的投稿测评**；站点当前该插件页为「本站评测（0）/ 暂无评测」，清单版本 **0.1.1**（`raw/15-site-review.txt`）。

- **取用版本**：**GitHub tag `v0.1.1`**（commit `c8ce29ddd34f…`）——站点清单写 0.1.1，上游存在对应 tag，故按站点版本测评；本地工作区解包快照是 HEAD=0.1.2，仅用于版本面差异核对（见「锚定提交」与「版本面」）。
- **测评方式**：不把被测插件装进任何正在使用的 DSH profile。读数来自 ① v0.1.1 tag tarball 的字节级锚定；② `npm ci` + JS 门禁；③ Go 1.27.2 构建/测试/CLI 探针；④ 4 组独立探针（45/19/27/锚定）；⑤ 站点/账本查重与上游 tarball 核对。
- **状态口径**：**仅 Windows x64**（WSL/Linux/macOS 未跑）；**未调用真实评审模型**（不触碰付费通道）；**不排名、不给总分、不用星级、不做安全渗透**；对被测源码只读不改（只在 `.work/` 内建副本/构建产物）。
- 四态边界（已验 / 未验 / 不确定 / 不做）逐条见「诚实边界」。

## 锚定提交

| 项 | 值 | 证据 |
|---|---|---|
| 站点清单 | dsh-code-review，**manifestVersion 0.1.1**，reviewed=false，本站评测 0 | `raw/15-site-review.txt`、`raw/16-dedupe.txt` |
| 上游 tags | `v0.1.0@266d45ee…`、**`v0.1.1@c8ce29ddd34f07d04bc1e370341ad1a0093803d3`（2026-10-18T04:28:56Z）**、`v0.1.2@ecc26e87922eaaf6b5706f96ddf81040f40e6fd2`（2026-10-18T09:55:40Z，HEAD） | `raw/01a-upstream-tags.txt`、`raw/01c-upstream-commit-api.txt`、`raw/01f-upstream-commit-v011-api.txt` |
| **测评锚点** | **tag v0.1.1 = commit `c8ce29d`**；tarball `refs/tags/v0.1.1` = **4 723 031 B / sha256 `19c5f95cbe2d93dcdd7e8024ee7f67c611b82196a0de22048357c18dbe831e52`**，解包 601 文件 | `raw/01d-upstream-v011-tarball.txt`、`raw/19-upstream-anchor.txt` |
| 版本面差异 | v0.1.1 → v0.1.2：**+9 / −84 / 改 75** 文件（0.1.2 是「fork 治理整包发布」：删上游发布/社区死重、规则数据化、fork 版本戳、命令名收敛、SPDX、CI 增 go test/build 门禁） | `raw/19-upstream-anchor.txt` |
| 本地快照 | `外部插件/dsh-code-review/dsh-code-review-main` = **v0.1.2 tag tarball**（526 文件逐文件 sha256 相同；2 7b6a2a2f… / 1 980 852 B）⇒ 本地快照**不是** 0.1.1，本次按 tag 拉取 v0.1.1 作为被测源 | `raw/01e-upstream-v012-tarball.txt`、`raw/19-upstream-anchor.txt` |
| v0.1.1 不可变指纹 | `package.json` sha256 `600640cad11a3bc06fa472d95b94c083255ceeffb8e19a4485053f3efbdc2612`；`package-lock.json` `6216f739…`；`dsh-plugin.json` `89ce577b…`；`src/` 17 文件/217 555 B/`f7289086…`；`scripts/` 13/145 466 B/`c133ac0e…`；`engine/` 553/9 738 878 B/`9b41b694…`；全仓 **601 文件/10 198 028 B/`f856ae4a…`** | `raw/07-anchor-fingerprint.txt`、`raw/19-upstream-anchor.txt` |
| npm 发布面 | registry 上的 `dsh-code-review` 是**同名不同物**（另一个项目的 agent preset，Gitee 仓，2026-08/09 发布）；**不能作为本插件安装/发布通道** | `raw/17-npm-metadata.txt` |

> 取用理由：站点是本次投稿的面向对象，站点清单版本 0.1.1 且有对应 tag，因此以 v0.1.1 为测评锚点；0.1.2 的差异只作「版本面」对照，不把 0.1.2 的修复算进 0.1.1 的结论。

## 环境与基线

| 项 | 读数 | 证据 |
|---|---|---|
| 宿主 | DeepSeek Harness 桌面端 **0.2.1-rc.2**（`runtime.json`），win32 x64 | `raw/00-env.txt` |
| 平台 | **仅 Windows**：`Microsoft Windows NT 10.0.26200.0`（x64）；WSL/Linux/macOS **未跑** | `raw/00-env.txt` |
| 工具链 | 统一走 `C:\Users\30951\tools\run.cmd`：**Go 1.27.2 windows/amd64**、git 2.56.0.windows.2、Node v24.21.0（DSH 自带）、npm 12.2.0、pnpm 11.28.5、ffmpeg N-127650、Python 3.12.10 | `raw/00-env.txt` |
| Go 模块代理 | `proxy.golang.org` 本机不可达；改用 `GOPROXY=https://goproxy.cn,direct` + `GOSUMDB=off` 拉齐依赖（go.sum 未改动） | 见「逐项读数·Go 构建」 |
| 插件安装面（基线） | desktop profile 仅 `@deepseek-ai` bundles + `@dsh-external/dsh-vibe-island`；**dsh-code-review 未安装**，本轮也不装 | `raw/00-env.txt` |
| 基线含义 | 「无插件」= profile 里没有本件；全部功能读数来自源码副本（`npm ci` + `go build`）与独立探针，不是 live 会话 | — |
| 网络 | registry.npmjs.org 200；GitHub 走 gh-proxy.com/gh-proxy.org 镜像（API/tags/tarball 均 200）；站点 200 | `raw/00-env.txt`、`raw/01a`–`01f` |

## 结果速览

| 面 | 结果 | 证据 |
|---|---|---|
| v0.1.1 依赖安装 | `npm ci`：**5 包 / 0 漏洞 / 2.38 s** | `raw/02a-npm-ci-v011.txt` |
| JS 语法门 `npm run check` | **exit=0**，19.84 s | `raw/03a-check-v011.txt` |
| JS 单元门 `npm run unit` | **exit=0**，16.71 s（unit 44 项 + file-config 16 项全过） | `raw/03b-unit-v011.txt` |
| JS 自检 `npm run selfcheck` | **exit=0**，11.52 s（cordis 入口 + client bundle + unit + file-config + task-api） | `raw/03c-selfcheck-v011.txt` |
| JS 冒烟 `npm run smoke` | **exit=0**，1.73 s | `raw/03d-smoke-v011.txt` |
| `serve-smoke`（后台 serve 链路） | **exit=0**，4.22 s；无引擎环境任务被 serve 拾起→failed（链路走通） | `raw/03f-serve-smoke-v011.txt` |
| Go 构建 | `go build ./...` **exit=0**；单二进制 **78 268 928 B**（`codecheck-v011.exe`） | `raw/04d-go-build-all-v011.txt` |
| Go CI 门（v0.1.1 声明） | `gofmt -l .` 无输出（exit=0）；`go vet ./...` **exit=0** | `raw/04b-gofmt-v011.txt`、`raw/04c-go-vet-v011.txt` |
| Go 测试（v0.1.1 额外跑） | **20 包 ok / 4 包 FAIL / 1 包 no test files；10 个顶层用例失败**（v0.1.1 CI 未声明 go test；0.1.2 才加该门禁） | `raw/04a-go-test-short-v011.txt` |
| 版本面复核（v0.1.2） | 定向复跑 v0.1.2：`cmd/opencodereview` ok（137.15 s）、`internal/delegate` ok；`internal/release`、`internal/llm/gen` 两包在 0.1.2 已删除 | `raw/04e-go-test-v012-targeted.txt` |
| 独立探针·JS 模块 | **45/45**（runner/敏感点名/报告/配置/凭据/file-config/task-book/exec-context） | `raw/08-js-modules.json` |
| 独立探针·插件入口 | **19/19**（3 工具、settings、2 命令、4 路由、首启引导、dispose、状态工具、set-config） | `raw/09-entry.json` |
| 独立探针·引擎 CLI | **27/27**（version/help/rules check/未知命令/未知 flag/无端点 fail-loud/配置契约/llm providers/session/viewer/completion） | `raw/10-engine-cli.json` |
| 敏感扫描三组 | 排除 `engine/**`（CI 语义）**0 命中**；含 engine 全仓 9 命中（信息读数） | `raw/11-sensitive-scan.txt` |
| 治理脚本 | SPDX 许可头全过；英文-only 检查 434 文件无违规 | `raw/11b-governance-checks.txt` |
| 站点/查重 | 站点「暂无评测 / 本站评测（0）」、清单 0.1.1；账本 595 事件 0 命中；全仓 grep 0 | `raw/15-site-review.txt`、`raw/16-dedupe.txt` |
| 官方安装通道 / 真实模型评审 | **未验**（不装 live profile、不调真实模型；见诚实边界） | — |

## 逐项读数

### 1. 版本面（站点 0.1.1 vs HEAD 0.1.2）

- 上游 tags 三个：`v0.1.0`、`v0.1.1`、`v0.1.2`；HEAD `ecc26e8` 就是 `v0.1.2`（`raw/01a`、`raw/01c`）。
- 站点清单 **0.1.1** 有对应 tag（commit `c8ce29d`，2026-10-18T04:28:56Z），故按 **v0.1.1** 测评；本地解包快照是 **0.1.2**（逐文件等于 v0.1.2 tarball），不能拿去冒充 0.1.1（`raw/19-upstream-anchor.txt`）。
- v0.1.1 → v0.1.2 差异：**+9 / −84 / 改 75** 文件。0.1.2 的 CHANGELOG 说明这是「fork 治理整包发布」：删上游死重（pages/extensions/skills/release 等未引入目录相关的测试与发布设施）、规则数据化、fork 版本戳、命令名收敛、SPDX 补头、CI 增 `go test -short` + `go build` 门禁（`raw/20-declared-claims.txt`）。
- **对本报告的影响**：v0.1.1 的若干问题（版本戳、Makefile 二进制名、`ocr` 残留、引擎测试红）在 0.1.2 已被处理；报告把它们标注为「v0.1.1 现状」，并在发现中给出 0.1.2 复核读数，不重复计功。

### 2. v0.1.1 依赖与 JS 门禁

```
npm ci                       # 5 packages, 2.38 s, 0 vulnerabilities
npm run check                # exit=0, 19.84 s（19 个 JS 文件 node --check）
npm run unit                 # exit=0, 16.71 s：44 项单元自检 + 16 项 file-config
npm run selfcheck            # exit=0, 11.52 s（cordis 入口 / client bundle / unit / file-config / task-api）
npm run smoke                # exit=0, 1.73 s（Cordis 入口冒烟）
node scripts/serve-smoke.mjs # exit=0, 4.22 s（后台 serve 链路）
```

### 3. Go 引擎：构建 / 静态门 / 测试

```
gofmt -l .                 # 无输出（exit=0）——v0.1.1 CI 门
go vet ./...               # exit=0 ——v0.1.1 CI 门
go build ./...             # exit=0
go build -o codecheck-v011.exe ./cmd/opencodereview   # 78 268 928 B
go test -short ./...       # exit=1：20 ok / 4 FAIL / 1 no test files；10 个顶层用例失败
```

**Go 测试失败清单（`raw/04a-go-test-short-v011.txt`）**：

| 失败包 | 失败用例 | 根因（读源码/测试可复核） |
|---|---|---|
| `cmd/opencodereview` | `TestArgCountErrors_AreActionable`、`TestZeroArgumentCommands_RejectUnexpectedArgs` | 断言里仍写上游 `ocr` 命令名，实际输出 `codecheck`（fork 改名未同步测试期望） |
| `cmd/opencodereview` | `TestCLIReferenceDocumentsSessionCompare/Export/Rm`、`TestCLIReferenceUsesSubtaskUnit` | 读 `../pages/src/content/docs/<locale>/cli-reference.md`——`pages/` 未随 fork 引入（FORK 决策：未导入上游 pages/extensions） |
| `internal/delegate` | `TestDelegateDiffExamples`、`TestDelegatePagerPTY` | 读 `skills/open-code-review-delegate/SKILL.md`——assistant-config/skills 未随 fork 引入 |
| `internal/llm/gen` | `TestGeneratedProvidersUpToDate` | 读 `extensions/frontend/src/shared/providers.generated.ts`——extensions 未随 fork 引入 |
| `internal/release` | `TestReleaseYmlMatchesURLPattern` | 读 `.github/workflows/release.yml`——fork 未引入 release 工作流 |

- 这些失败**不是运行时缺陷**：同一份源码 `go build`/`go vet`/CLI 功能均正常；但在按 `make test` 自检时是红门（v0.1.1 的 CI 尚未跑 go test，0.1.2 才把 `go test -short` 加入 CI，并定向复核为绿：`raw/04e-go-test-v012-targeted.txt`——cmd 与 delegate 两包 ok，release/gen 两包在 0.1.2 已删除）。

### 4. 引擎 CLI 契约（独立探针 27/27）

`probes/probe-engine-cli.mjs` / `raw/10-engine-cli.json`、失败路径完整 transcript `raw/10b-engine-review-transcripts.txt`：

- `--version`/`version` exit=0，输出 `open-code-review dev windows/amd64`（v0.1.1 无 fork/plugin 版本身份戳；0.1.2 才引入 `<plugin>+fork.<N> (g<sha>)`）。
- `-h` exit=0，列出 `codecheck` 子命令（review/scan/delegate/session/config/llm/rules/viewer/completion/version）。
- `rules check`（确定性规则解析，不调模型）：JS/Python/Go/Dockerfile 分别命中系统内置规则；未知扩展名走 `Pattern: default`；每条规则文本都含**三条固定评审视角**（Security & secrets / Correctness bugs / Redundancy & scope creep）；项目 `.opencodereview/rule.json` 与 `--rule` 自定义规则分别报告 `Source: Project`/`Source: Custom`。
- 失败契约：未知子命令/未知 flag/`rules check` 缺参均 exit=1 且错误可操作；`review`/`scan` 在无任何 LLM 端点配置时**快速失败**（<10 s，stderr 明确列 `OCR_LLM_URL/OCR_LLM_TOKEN/OCR_LLM_MODEL`、`~/.opencodereview/config.json`、`ANTHROPIC_*` 三类通道），**不静默回退付费 API**。
- 注入不可达端点（`OCR_LLM_URL=http://127.0.0.1:9/v1`）后 `review` 真实走评审管线：选中 1 个改动文件、重试 6 次网络失败（约 14–15 s）、exit=1 并创建可 resume 的 session；输出**不含**注入的 token（`probe-token` 只作为子进程环境变量）。
- 配置契约：`config set llm.url` 成功并落盘到隔离 HOME 的 `~/.opencodereview/config.json`；未知键、非法 protocol 明确报错并列支持键；`config unset llm.url` **不支持**（unset 仅支持 provider/max_tokens/effort/custom_providers/mcp_servers）——set/unset 不对称。
- 离线能力：`llm providers` 列出内置 provider 表（含 deepseek/anthropic 等）；`session list`、`viewer -h`、`completion bash` 均正常退出。

### 5. JS 模块契约（独立探针 45/45）

`probes/probe-js-modules.mjs` / `raw/08-js-modules.json`：

- `buildReviewArgs`：review 默认显式单线 `--concurrency 1 --audience agent`；branch 模式 `--from/--to`（head 缺省 HEAD）、commit 模式 `--commit`、scan 不加 diff 定位参数；exclude 多模式合并为单值逗号分隔；focus→`--background`；并发广度钳制 1..32（100→32、2.6→3、0→1、NaN→8，关闭时恒 1）。
- **静默退化观察**：`mode:'commit'` 缺 `commit`、或未知 mode，均不报错而是退化为 uncommitted（见 P3）。
- `prepareEngineEnv`：完整端点才注入 5 个 `OCR_LLM_*`，key 只进 env 不进 note；`OCR_LLM_TIMEOUT` 下限 30 s；`OCR_LLM_EXTRA_BODY` 结构化 JSON。
- `runEngine`：exit0/stdout、非零 exit+stderr、超时（0.8 s 后 taskkill 进程树，`timedOut=true` + 「评审超时」）、不存在二进制均有结构化结果（不抛未捕获异常）。
- 敏感路径点名：15 条应命中（`.env`/`.npmrc`/`.netrc`/`id_rsa`/pem/p12/jks/kdbx/credentials.json/token.txt/refresh_token_backup.json/pass.yml/passwords.json 等）全中；10 条业务文件名（tokenizer.js/tokens.ts/design-tokens.md/passenger.json/pass.ts/password-strength.ts 等）全部不误报；`listSensitiveFiles` 过滤非字符串、统一反斜杠；点名块对反引号/强调符做清洗（`weird`x*_[<>|].pem` 不再注入 markdown）。
- **已知盲区**：`.ssh/config` 不被插件层点名（源码注释自述；`.ssh/id_rsa` 能点名）。
- 报告层：`repoNameOf` 处理 `.git` 尾巴、中文/非法字符、设备名兜底 `repo`、按 Unicode 码点截断 100；`reportFilePath` 用本地时间 `YYYY-MM-DD/<repo>-HHMMSS.mmm.md`；`writeReport` 对空目录/非字符串 body 返回结构化错误、正常时落盘。
- 配置层：`normalizeConfig` 默认值/类型/范围（timeout 钳 [1,6h]、concurrency 钳 [1,32]）；`pickOverrides` 解开 volatile `{value}` 包装并跳过 `__proto__/constructor/prototype`（原型污染防护）。
- file-config：`sanitizePatch` 白名单/trim/显式清空占位/非正值剔除/钳制；写读回环；损坏 JSON 回落空对象且**不抛错**；`PLUGIN_CONFIG_FILE` 在隔离 `DSH_REVIEW_HOME` 下。
- task-book：任务 id 时间戳+4 位 base36；**任务卡 config 白名单过滤掉 `api_key/token/nested` 等敏感/未知键**（落盘文件不含 secret）；enqueue/read/list/update 回环；`taskFileOf` 过滤非法 id 字符。
- exec-context：`cwdOfExec` 支持 `cwd/session.cwd/meta.cwd` 等键，取不到返回 null（不猜宿主目录）。

### 6. 插件入口契约（独立探针 19/19）

`probes/probe-entry.mjs` / `raw/09-entry.json`（桩 Cordis ctx，不启动 DSH）：

- `apply()` 注册 **3 个工具**：`code_review`（mode enum: uncommitted/branch/commit/scan；output schema 必填 `ok`；并发不安全声明 false）、`code_review_status`（task_id 可选）、`code_review_set_config`（additionalProperties=false，仅 review_model/report_dir/engine_bin）。
- 设置：`settings.register('dsh-code-review', schema)` 一次。
- 斜杠命令：`/review`、`/review-status` 两个 commands 注册（definitionId `dsh-code-review/review*`，handler 为函数）。
- 数据路由：`/api/code-review/tasks`、`/tasks/`、`/events`、`/config` 四条 webServer 路由注册。
- 首启引导：默认 `first_run=true` 时输出引导日志；`first_run:false` 时静默；无引擎时异步告警「未找到引擎 codecheck」。
- 状态工具直读任务簿：空态提示、入队后列表/详情/未知 id 三种返回正确；返回体不含敏感字段。
- set-config：查询返回配置文件路径；写 `review_model` 落盘；`engine_bin` 指向不存在文件被拒绝且**其他字段照常落盘**；`null` 清空字段（写 null 占位、读取回退默认）。
- dispose：卸载调用 9 个 disposer（3 工具 + 2 命令 + 4 路由）全部释放。

### 7. 治理与查重

- 敏感扫描（`raw/11-sensitive-scan.txt`）：复刻 v0.1.1 CI 三组模式（`sk-…`、平台/账号/内部 IP 串、账号目录名），按 CI 语义排除 `engine/**` 后 **0 命中**；含 engine 全仓有 9 处（均为上游源码/测试夹具中的模式串，CI 不扫该目录）。
- 治理脚本（`raw/11b-governance-checks.txt`）：`verify-license.sh` 通过（「All source files have valid license headers」）；`verify-english-only.go` 通过（434 个源码文件无未批准非英文字符）。
- 查重（`raw/15-site-review.txt`、`raw/16-dedupe.txt`）：站点插件页 HTTP 200、本站评测 0、清单版本 0.1.1、页内评测文章链接 0、`/reviews` 页 0 次提及；dsh-bounty 账本 595 事件 0 次 `dsh-code-review`；全仓 md/json/html/py/yml/txt/js/ts grep 命中文件 0；`review/data/plugins.json` 0；主创站筛选 `reviewed=false`（本轮待评件）。npm 上的同名包是**另一个项目**（Gitee/agent preset），不计为本件重复，但存在命名冲突（见 P3-5）。

## 发现

> 分级按「不做会怎样」；每条附复现入口。本轮没有 P0/P1：未发现崩溃、凭据原文外泄、静默成功或真实付费调用。所有 P2/P3 都可在源码副本内复跑。

### P2-1 · v0.1.1 引擎 `go test -short ./...` 红：10 个顶层用例失败（4 个包）

**读数**（`raw/04a-go-test-short-v011.txt`）：20 ok / 4 FAIL / 1 no test files；失败列表见「逐项读数·3」。根因分两类：
① **fork 未引入上游目录但保留了读这些目录的测试**：`pages/`（CLI 参考文档）、`skills/`、`extensions/`、`.github/workflows/release.yml`）；
② **命令名 `ocr`→`codecheck` 改名未同步测试断言**（arg 错误文案/未知子命令文案仍断言 `ocr`）。
**影响**：`make test`/`go test` 在 v0.1.1 上是红门；贡献者与评测者会把「未引入目录」读成 10 个功能缺陷。v0.1.1 的 CI 恰好只跑 gofmt/go vet，未跑 go test，所以发布门禁没有拦住它。**v0.1.2 已处理**：CI 增加 `go test -short`+`go build`，定向复核 v0.1.2 的 cmd/delegate 两包为 ok、release/gen 两包已删除（`raw/04e`）。
**建议**：0.1.2 的处理方向正确；若还要维护 0.1.1 分支，建议把这些依赖未引入目录的用例改为 `t.Skip`（注明「上游目录未随 fork 引入」），或干脆删除，并同步改名断言。

### P2-2 · `.credentials.yaml` 解析正则 `\s*` 跨行：空值键会吞下一行键名

**读数**（`probes/probe-js-modules.mjs` 用例 `H1b-credential-crossline-known-defect`）：对文本
`"  BARE_EMPTY:\n  NEXT_KEY:\n"` 调用 `parseCredentialsText(text, 'BARE_EMPTY')` 返回 **`"NEXT_KEY:"`**（应为 `''`）；`"  NAME:\n    nested: value\n"` 中 4 空格缩进的 `nested: value` 也能被读到（注释声称「刻意不匹配更深缩进 records 段」）。根因：`^ {0,4}NAME\s*[:=]\s*(?:"..."|'...'|([^\s'"]+))...` 的 `\s*` 含换行，可跨行把下一行的键名当值。
**影响**：用户 `.credentials.yaml` 里若出现「值为空的 ref 紧跟另一个 ref」，插件会把下一行键名当作 API key 注入引擎 → 认证必失败（401），却表现为「模型配置错误」；4 空格缩进段（records）理论上可被误读。因为捕获物是「键名 token」而非密钥值，**不构成密钥外泄**，但会掩盖真实配置问题。
**建议**：把 `\s*` 收紧为 `[^\S\r\n]*`（行内空白），并对 `^ {0,4}` 的缩进语义补一条单测（2 空格命中、≥4 空格不命中/或文档化 records 布局）。

### P3-1 · v0.1.1 engine Makefile 产物名与插件期望不一致（`opencodereview` vs `codecheck`）

`engine/Makefile:7` 为 `BINARY_NAME := opencodereview`（上游名），`make build` 生成 `dist/opencodereview(.exe)`；而插件 `runner.js` 只找 `codecheck(.exe)`（`engine_bin` / 包内 `bin/` / PATH）。README 手工安装步骤要求把产物放到插件包 `bin/codecheck(.exe)`——按 Makefile 构建后需手动改名，否则 `code_review` 报「未找到引擎」。v0.1.2 已把二进制名改为 `codecheck`（`raw/19` 的 v0.1.2 Makefile 片段）。P3：有明确 workaround（改名或 `engine_bin`），但默认构建路径会误导。

### P3-2 · v0.1.1 引擎无 fork/plugin 版本身份戳

`codecheck --version` 输出 `open-code-review dev windows/amd64`（`raw/10-engine-cli.json`）——既无插件版本 0.1.1，也无 `+fork.N (g<sha>)`，`dev` 来自直接 `go build`（Makefile 的 VERSION 依赖 git tag/commit，tar 快照无 `.git` 时退化为 `v0.0.0-`）。复现问题（bug report/评测）时无法从二进制反查版本。v0.1.2 已引入 build-fork.sh 单一真源 + 版本戳。

### P3-3 · 改名未收敛到用户可见文案（`ocr` 残留）

- `config set` 缺参的错误示例仍写 `ocr config set …`（`raw/10-engine-cli.json` 用例 `stale-ocr-examples-observation`）；
- `viewer -h` 的 Examples 仍写 `ocr viewer`；
- v0.1.1 `engine/README.md` 仍是上游文档（`npm install -g @alibaba-group/open-code-review`、release.yml badge），没有 fork 的身份/构建说明。
P3：不影响功能，但会让用户按旧命令名操作失败。v0.1.2 已做命令名收敛与 fork 文档（FORK_NOTES/`engine/NOTICE`）。

### P3-4 · README 的单元测试数量过期（28 → 实际 60）

`README.md:81` 写「npm run unit（28 项）」，实际 `npm run unit` 输出「44 项单元自检通过」+「file-config smoke 全过：16 项」= **60**（`raw/03b-unit-v011.txt`）。P3：文档漂移，不影响门禁结论（门禁 exit=0）。

### P3-5 · 包名被无关项目占用（npm `dsh-code-review` 同名不同物）

registry.npmjs.org 的 `dsh-code-review` 是另一个项目（Gitee `deepseek-harness-electron` 的 agent preset，作者「往事似风如雾」，2026-08/09 发布 0.1.0–0.1.2）；与本件（GitHub `Nicholas023/dsh-code-review`，repo 创建 2026-10-14）**同名不同物**（`raw/17-npm-metadata.txt`）。影响：本插件无法用该 npm 名发布/安装，用户 `npm i dsh-code-review` 会装到别的项目；站点/插件市场只能走 GitHub 源。P3：若作者未来要做 npm 分发，需要改名或 scope（如 `@nicholas023/dsh-code-review`）。

### P3-6 · `buildReviewArgs` 对 commit 模式缺参与未知 mode 静默退化

`mode:'commit'` 未给 `commit`、或 `mode:'frobnicate'` 时，函数不报错而是生成「无 diff 定位参数」的 review 命令（实际按 uncommitted 工作区评审）——用户以为在审某个提交，实际审的是工作区（`raw/08-js-modules.json` A4/A5）。P3：评审范围与用户意图不一致，但没有「假成功」——引擎报告会标注实际范围；建议在插件入口对未知 mode/commit 缺失显式报错。

### 已验的正面结论（同样逐项可复跑）

- **源码/tarball 锚定**：tag v0.1.1 tarball sha256 自算、解包 601 文件；本地 HEAD 快照被证明等于 v0.1.2 tarball（避免版本错配）。
- **JS 门禁**：npm ci 0 漏洞；check/unit/selfcheck/smoke/serve-smoke 全绿；后台任务簿（目录协议）+ task-api（含 SSE 连接上限 503 兜底）由仓库自带 smoke 全过。
- **Go 静态/构建**：gofmt 无差异、go vet 0 告警、`go build ./...` 与单二进制构建成功。
- **规则层**：`codecheck rules check` 对 JS/Python/Go/Dockerfile/default 及项目/自定义规则都能给出正确来源与规则文本；**三条固定评审视角**（安全脱敏 / 找 bug / 冗余与范围蔓延）在规则文本中稳定存在。
- **不静默回退付费 API**：无 LLM 端点时 review/scan 快速失败并列出三类配置通道；注入不可达端点后真实发起请求、重试 6 次、失败可见并给出 resume session id，注入的 token 不出现在输出。
- **插件入口**：3 工具 + 2 命令 + 4 路由 + 设置命名空间 + 首启引导 + dispose 完整；任务卡持久化过滤敏感键（白名单）；`engine_bin` 写入前做存在性/可执行校验且失败不吞。
- **敏感文件点名**：15 类凭据路径命中、10 类业务文件名不误报、点名块做 markdown 注入清洗；**内容不送审**（引擎侧排除）的设计由敏感路径表与 UI 文案一致表达。
- **治理**：SPDX 许可头全过、英文-only 检查 434 文件全过；CI 三组敏感扫描 0 命中。

## 诚实边界

- **已验**：版本面与锚定（tags/commit/tarball/快照三线）；`npm ci`；JS `check/unit/selfcheck/smoke/serve-smoke`；`gofmt`/`go vet`/`go build ./...`/单二进制构建；`go test -short`（v0.1.1 红，v0.1.2 定向绿）；引擎 CLI 27 例；JS 模块 45 例；插件入口 19 例；敏感扫描三组；许可/英文治理脚本；站点/账本查重。
- **未验（没跑，列原因）**：
  ① **真实模型评审成功路径**（review 完整跑完并出问题清单/报告）：需要真实 LLM 凭据与联网付费通道，本测评**明确不调用**（红线）；只验了「无端点快速失败」与「不可达端点的真实重试失败路径」。
  ② **官方安装通道**（DSH 插件市场/`dsh plugin add`/live profile 装载）：本轮不装 live profile，且 npm 同名包不是本件；安装到宿主后的热加载/设置页面板/客户端卡片未验。
  ③ **四个 e2e**（`e2e-engine`/`e2e-plugin`/`e2e-switch`/`e2e-sensitive`）：README 明示需要真实凭据与联网，CI 也禁止纳入；未跑。
  ④ **UI/浏览器**：viewer WebUI（本地 HTTP 服务打开浏览器）、设置面板、客户端 bundle 的实际渲染——只跑了 `client-bundle-smoke` 与 `viewer -h`，未做浏览器操作。
  ⑤ **后台 serve 的成功任务**：serve-smoke 只证明「拾起→执行→failed（无引擎）」链路；带真实引擎+真实模型的后台成功任务未验。
  ⑥ **非 Windows 平台**：仅 Windows x64；Linux/macOS 的进程树终止/路径语义未验。
  ⑦ **npm 发布安装通道**：同名包非本件，未做 `npm i dsh-code-review`（会装错项目）。
- **不确定**：
  ① Go 测试 10 个失败中，「依赖未引入上游目录」的 8 个是否应删除还是应补导入目录（取决于作者对 fork 边界的取舍）；改名相关的 2 个明确是测试滞后。
  ② `.credentials.yaml` 跨行解析缺陷在真实 DSH 凭据文件（`refs:` 2 空格、值为空的情况）中的实际触发概率——取决于用户是否会写出「空值 ref 紧跟 ref」；未在真实用户凭据文件上验证（不读用户凭据）。
  ③ `.ssh/config` 不被插件层点名是「已知盲区/引擎侧兜底」还是应补模式——源码注释自述为已知盲区。
  ④ 0.1.2 的版本戳/二进制名/文档收敛是否在所有发布渠道生效——只核了 tarball 源码与 CHANGELOG。
- **不做**：不排名/不给总分/不用星级；不做安全渗透或利用链；不调真实模型、不产生外部账单；不改被测源码、不提 PR、不装 live profile；不对非 Windows 平台下结论；不重算其他测评件的读数。

## 查重

对照四处，**未见同件**（`raw/15-site-review.txt`、`raw/16-dedupe.txt`）：

1. **review.lingshulab.com**：`/plugins/01a14e0b-…` HTTP 200，清单版本 **0.1.1**，「本站评测（0）/ 暂无评测」，页内 review 文章链接 0；`/reviews` 页 0 次提及。
2. **dsh-bounty 账本**：`docs/bounty/ledger.json` **595** 个事件中 `dsh-code-review` **0 次**。
3. **dsh-bounty 全仓**：md/json/html/py/yml/txt/js/ts grep 命中文件 **0**；`review/data/plugins.json` 0 次。
4. **主创站筛选快照**：`测试/主创站筛选/details.json` 中该插件 `reviewed=false`、`manifestVersion=0.1.1`、`upstream=可访问` ⇒ 属本轮待评件，不是重复申报。

补充：npm 上的同名包是另一个项目（见 P3-5），**不属于同件重复**，但建议投稿时在 issue 里注明 GitHub 源，避免读者误装。

## 复现步骤

环境：Windows 10.0.26200 x64；Node v24.21.0（DSH 自带）；Go 1.27.2 / git 2.56.0 / npm 12.2.0 经 `C:\Users\30951\tools\run.cmd` 提供；工作目录 `D:\natnat\lingshu\测试\dsh-code-review`。

```powershell
# 0) 取 v0.1.1（站点版本）tarball 并锚定
node ..\tools\gh-fetch.mjs --mode tarball --repo Nicholas023/dsh-code-review --ref v0.1.1 --ref-type tags --out .work\upstream-v0.1.1.tgz
#    期望 sha256 19c5f95c…（raw/01d-upstream-v011-tarball.txt）
tar -xzf .work\upstream-v0.1.1.tgz -C .work\repo-0.1.1 --strip-components=1
node probes\anchor-fingerprint.mjs          # 期望 repo fingerprint f856ae4a…（raw/07）

# 1) JS 依赖与门禁（在副本内）
cd .work\repo-0.1.1
cmd /c "C:\Users\30951\tools\run.cmd npm ci"
cmd /c "C:\Users\30951\tools\run.cmd npm run check"
cmd /c "C:\Users\30951\tools\run.cmd npm run unit"
cmd /c "C:\Users\30951\tools\run.cmd npm run selfcheck"
cmd /c "C:\Users\30951\tools\run.cmd npm run smoke"
cmd /c "C:\Users\30951\tools\run.cmd node scripts/serve-smoke.mjs"

# 2) Go 引擎（GOPROXY 用 goproxy.cn——本机 proxy.golang.org 不可达）
$env:GOPROXY='https://goproxy.cn,direct'; $env:GOSUMDB='off'
cd engine
cmd /c "C:\Users\30951\tools\run.cmd gofmt -l ."      # 无输出
cmd /c "C:\Users\30951\tools\run.cmd go vet ./..."    # exit=0
cmd /c "C:\Users\30951\tools\run.cmd go build ./..."  # exit=0
cmd /c "C:\Users\30951\tools\run.cmd go test -short ./..."   # 20 ok / 4 FAIL（见 raw/04a）
cmd /c "C:\Users\30951\tools\run.cmd go build -o ..\..\codecheck-v011.exe ./cmd/opencodereview"

# 3) 独立探针（在 测试\dsh-code-review 下）
$env:DSH_CR_REPO = ".work\repo-0.1.1"
node probes\anchor-fingerprint.mjs
node probes\probe-js-modules.mjs     # 45/45（需 .work/repo-0.1.1/node_modules）
node probes\probe-entry.mjs          # 19/19
node probes\probe-engine-cli.mjs     # 27/27（默认用 .work\codecheck-v011.exe；可用 DSH_CR_ENGINE 指定）

# 4) 证据整理与交付
node ..\tools\normalize_raw.mjs raw
node ..\tools\make_manifest.mjs --raw raw --label "dsh-code-review"
node ..\tools\make_issue.mjs --report "测评报告_dsh-code-review_v0.1.md"
```

> `.work/`（tarball、两个版本副本、Go 模块缓存、构建产物、探针隔离 HOME/仓库）是可丢弃工作目录；`raw/` 与 `raw/manifest.txt` 提供逐文件 sha256。

## 一句话总结

**dsh-code-review v0.1.1（站点清单版，commit `c8ce29d`）在本机 Windows 上可构建、JS 五道门禁全绿、Go 构建/vet/gofmt 与三条固定评审规则及「无端点不静默回退付费 API」契约成立，独立探针 91 例（45+19+27）全过且锚定指纹复核一致；主要缺陷是 v0.1.1 引擎 `go test` 10 个用例红（未引入上游 pages/skills/extensions/release 目录 + 改名未同步，P2，0.1.2 已处理）与 `.credentials.yaml` 解析跨行 bug（P2），另有 6 条 P3（Makefile 产物名、无版本身份戳、`ocr` 文案残留、单测数量文档过期、npm 同名包冲突、commit 模式静默退化）；真实模型评审与 UI/安装通道未验。**

## 证据链（https，站点提交用）

| # | 说明 | 链接 |
|---|---|---|
| 1 | 被测 commit（锚定） | https://github.com/Nicholas023/dsh-code-review/commit/c8ce29ddd34f07d04bc1e370341ad1a0093803d3 |
| 2 | 全部证据 | https://github.com/EQRS/dsh-eval-evidence/tree/main/evidence/dsh-code-review-0.1.1 |
| 3 | report.md | https://github.com/EQRS/dsh-eval-evidence/blob/main/evidence/dsh-code-review-0.1.1/report.md |
| 4 | raw-manifest.txt | https://github.com/EQRS/dsh-eval-evidence/blob/main/evidence/dsh-code-review-0.1.1/raw-manifest.txt |
| 5 | anchor-fingerprint.mjs | https://github.com/EQRS/dsh-eval-evidence/blob/main/evidence/dsh-code-review-0.1.1/anchor-fingerprint.mjs |
| 6 | 04a-go-test-short-v011.txt | https://github.com/EQRS/dsh-eval-evidence/blob/main/evidence/dsh-code-review-0.1.1/04a-go-test-short-v011.txt |
| 7 | 03c-selfcheck-v011.txt | https://github.com/EQRS/dsh-eval-evidence/blob/main/evidence/dsh-code-review-0.1.1/03c-selfcheck-v011.txt |

站点证据框格式：**每行一条 `URL` 或 `URL | 备注`**，最多 10 条；可直接粘贴 `证据链_提交文本.txt`。

```text
https://github.com/Nicholas023/dsh-code-review/commit/c8ce29ddd34f07d04bc1e370341ad1a0093803d3 | 被测 commit（锚定）
https://github.com/EQRS/dsh-eval-evidence/tree/main/evidence/dsh-code-review-0.1.1 | 全部证据
https://github.com/EQRS/dsh-eval-evidence/blob/main/evidence/dsh-code-review-0.1.1/report.md | report.md
https://github.com/EQRS/dsh-eval-evidence/blob/main/evidence/dsh-code-review-0.1.1/raw-manifest.txt | raw-manifest.txt
https://github.com/EQRS/dsh-eval-evidence/blob/main/evidence/dsh-code-review-0.1.1/anchor-fingerprint.mjs | anchor-fingerprint.mjs
https://github.com/EQRS/dsh-eval-evidence/blob/main/evidence/dsh-code-review-0.1.1/04a-go-test-short-v011.txt | 04a-go-test-short-v011.txt
https://github.com/EQRS/dsh-eval-evidence/blob/main/evidence/dsh-code-review-0.1.1/03c-selfcheck-v011.txt | 03c-selfcheck-v011.txt
```
