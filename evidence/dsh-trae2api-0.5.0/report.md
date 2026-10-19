[intake 输入] 【测评报告】dsh-trae2api 0.5.0 体验快测（Trae LLM provider 桥 · 方法试验）

<!-- intake:v1 {"project":"bench","difficulty":"medium","impact":"B","target":"Fleey/deepseek-harness-trae","form":"intake"} -->

<!-- 协议对齐：工程协议手册 v1.1（r2）§6 体验快测档；协议文件 sha256 8dd51cbf75b259c5dabfdb928eb112364231b5d8f9f580759534e5d78a34d849 -->
> **协议对齐（v1.1 · r2 · 体验快测档）**：本件是**体验快测**（手册 §6），只记录安装/功能点/卸载残留类检查结果；
> **不生成五种能力状态标签、不进入能力榜、不以「通过/合格」作为插件结论**；未覆盖项见「诚实边界」。
> - **协议绑定**：`工程协议手册-v1.1`（修订标识 r2），文件 sha256 `8dd51cbf75b259c5dabfdb928eb112364231b5d8f9f580759534e5d78a34d849`（快照 `测试/协议/`）。
> - **插件身份**：源码版（commit + 逐文件树指纹）或发布包版（版本 + 哈希），见「锚定提交」。
> - **环境配置 ID**：dsh 0.2.1-rc.2 / win32-x64 / Windows 10.0.26200 / node v24.21.0 / model=n/a（本快测未调用模型）/ 依赖与外部服务见「环境与基线」。
> - **安全口径（§4 三分法）**：本件**未做**六威胁安全审计 ⇒ 安全结论 = **未测**（不是「未发现问题」，也不是「已验证通过」）。
> - **时效（§13.7）**：测评完成后 90 个自然日内有效；版本/权限/数据流/依赖/宿主变化触发复核，旧报告不自动适用于新版本。


## 性质声明

本件是**给主创测评站 <https://review.lingshulab.com> 的投稿测评**（intake 输入，外部贡献申报），不是悬赏：
**不 /claim、不自行加 bounty 标签**；计分、档位与是否归并均由维护者裁定。

- 被测对象：站点「dsh-trae2api」详情页（清单版本 **0.5.0**，上游状态「可访问」，本站评测 **0**）；
  源码取上游默认分支 commit `35cafb11…` 的 GitHub tarball 解包快照。
- **未把插件装进任何正在使用的 DSH profile**：桌面 live profile 只读核对为「未安装 dsh-trae2api」，
  本件也不安装（`raw/22-live-profile.txt`）。读数来自：源码快照 + 仓库自带测试 + 直接 `import lib/index.js` /
  `lib/testing.mjs` 的独立探针；**没有真实 Trae 凭据，也没有发起任何真实模型调用**。
- **仅 Windows**（10.0.26200 x64）：WSL / Linux / macOS 未跑，不对其它平台下结论。
- 不排名、不给总分、不用星级；不评价作者其它插件；不改被测源码、不提 PR、不做安全渗透；
  不向 `api.enterprise.trae.cn` / 企业控制台发真实请求（无凭据，也不该借测评去试）。
- 面向声明的四态（已验 / 未验 / 不确定 / 不做）见「诚实边界」。

## 锚定提交

| 项 | 读数 |
|---|---|
| 仓库 | `Fleey/deepseek-harness-trae` |
| 声明版本 | **0.5.0**（`package.json` 2,258 B，sha256 `0843cb297666e1799135706614423ce6469b0315043f9548d6b85d18118607d6`） |
| 锚定 commit | **`35cafb11479b8b89d73ecdc60dc6da2d602ce9b3`**（任务给定 2026-10-18T01:48:00Z） |
| tarball | `dsh-trae2api.tgz` 149,986 B，sha256 **`2137f41ee9ecbdfa6af2318b13a261b763b77f808d1255c84ba03b98dc9c53ee`**（与给定 `2137f41e…` 一致） |
| 快照位置 | `D:\natnat\lingshu\外部插件\dsh-trae2api\deepseek-harness-trae-main`（无 `.git`；解包树与 tarball 重解包逐文件一致） |
| 预置产物 | `lib/index.js` 98,440 B / sha256 `292cda61…`；`lib/client.js` 与 `client/client.js` 均 65,586 B / sha256 `530086eb…`；**`lib/testing.mjs` 不存在**（由 `build:test` 生成） |

**构建前树指纹**（口径：逐行 `<相对路径>\t<字节数>\t<sha256>` 排序后整体 sha256；`probes/anchor.mjs`）：

```
src      files=11  bytes=146473  tree_sha256=777a523ff33123afa28af687ba1ae343bf8d28a4f58f5af4a319286d04183b9a
lib      files=2   bytes=164026  tree_sha256=ce35a31526212f2d1b7ce3623d3fe312c99ab8c0a4f9edf94d54ffe3935c6f14
client   files=1   bytes=65586   tree_sha256=723a1f674a53a361eba791d485bcd766a9249d10328cc5a0aaffbd9f56909f37
test     files=6   bytes=100650  tree_sha256=8d2ca49cf04bc2f9927182e5a39c5e5676cc543d57a0d65028ddf91218604861
tools    files=2   bytes=14838   tree_sha256=b47d7957b78ff7083b2a736ef232e077fb91c2a00fc7570128e2049fceb7f72d
```

**锚定旁证**：① tarball sha256 与任务给定/筛选清单一致；② 解包树与 tarball 重解包树指纹一致（`raw/02-tarball-verify.txt`）；
③ 工作区「主创站筛选」清单记录同一 commit 与 tarball 前缀（`raw/20-dedupe.txt`）。
**未独立复核**：本轮用 `gh-fetch.mjs` 取 GitHub API 的 commit 元数据时，三个镜像均 403（`raw/18-upstream-anchor.txt`），
故 commit 的提交时间/信息采用任务给定值 + 筛选清单旁证，**没有**从 GitHub API 二次核对。

> **工作树状态声明**：为取证，本轮在该源码快照内执行了 `pnpm install`、`pnpm run build`、`pnpm run build:test`；
> 因此快照的 `lib/` 现为构建产物（预置产物原始副本在 `raw/artifacts/anchor/`），并新增 `pnpm-lock.yaml` 与
> `lib/testing.mjs`。`src/`、`client/`、`test/`、`tools/` 与顶层文件未被改动（构建前后指纹见 `raw/00` 与 `raw/19`）。

## 环境与基线

| 项 | 读数 |
|---|---|
| 宿主 | DeepSeek Harness **0.2.1-rc.2**（`dsh --version`） |
| 平台 | **仅 Windows** 10.0.26200 x64（Windows 11 家庭中文版），主机名 `BBS`，32 CPU / 15.2 GiB |
| Node | **v24.21.0**（DSH 自带；`node/npm/pnpm/git` 均不在 PATH，`tar` 在） |
| pnpm | 自带 11.28.5；仓库 `packageManager` 钉 `pnpm@11.7.0`（成功那一次安装日志显示 `pnpm v11.28.5`） |
| 插件依赖 | 仓库**无 lockfile**；`pnpm install` 从 registry 装到 16 个包：`@deepseek-ai/cordis` 4.0.4、`@deepseek-ai/dsh-llm` 0.2.0-rc.2、`@deepseek-ai/schemastery` 3.18.5、`@types/node` 22.20.5、`esbuild` 0.25.12、`typescript` 5.9.3 |
| 网络 | `registry.npmjs.org` 200；npm 上 `dsh-trae2api` / `deepseek-harness-trae` 均 **404**（`raw/17`）；GitHub API 镜像 403（`raw/18`）；**未访问 Trae 任何接口** |
| 插件安装面 | 桌面 profile 仅 `@deepseek-ai` bundles + `@dsh-external/dsh-vibe-island`；**dsh-trae2api 未安装** |
| 无插件基线 | 不适用耗时对照：这是 provider 桥，基线＝「未安装」；真实模型调用无法在无凭据下建立基线 |

环境原始读数见 `raw/01-env.txt`、`raw/22-live-profile.txt`。

## 结果速览

| 面 | 结果 | 证据 |
|---|---|---|
| 依赖安装 | 首次 exit 1（pnpm 的 ignored-builds 策略拦 `esbuild` 安装脚本）；`--ignore-scripts` 复跑 **exit 0**（16 包），esbuild 0.25.12 可用 | `raw/03a`、`raw/03`、`raw/09` |
| typecheck | **exit 0**，3.3 s，无诊断 | `raw/04-typecheck.txt` |
| build | **exit 0**，1.6 s；`lib/index.js` 96.1 kB；构建产物与预置 `lib/index.js` **逐字节一致** | `raw/05-build.txt`、`raw/21-drift.txt` |
| build:test | **exit 0**，1.5 s；生成 `lib/testing.mjs` 82,704 B | `raw/07-build-test.txt` |
| 自带测试（全新克隆态，`pnpm test`） | **exit 1**：`internals.test.mjs` 因缺 `lib/testing.mjs` 失败（16 例中 15 过 1 失败） | `raw/06a-test-without-buildtest.txt` |
| 自带测试（`build:test` 之后） | **55/55 通过，0 失败 / 0 跳过**，exit 0，449 ms | `raw/08-self-test.txt` |
| 独立探针·协议/解码（离线） | 70/71 符合；1 项 FINDING（SSE event 不按空行重置） | `raw/10-probe-wire.txt` |
| 独立探针·目录/额度解析（离线） | 47/48 符合；1 项 FINDING（刷新失败会降级到缓存） | `raw/11-probe-parsers.txt` |
| 独立探针·适配器/流式/失败契约（离线桩） | **52/52 符合**；另记录 1 项 FINDING（流中途错误被吞） | `raw/12-probe-adapter.txt` |
| 独立探针·装配与路由（离线桩） | **30/30 符合** | `raw/13-probe-plugin.txt` |
| 独立探针·PAT→JWT（经装配，离线桩） | 21/23 符合；2 项 FINDING（并发首次兑换重复，同一根因） | `raw/14-probe-auth.txt` |
| 独立探针·选择卡片/Cue/GetUserInfo（离线桩） | **47/47 符合** | `raw/15-probe-suggest-cue.txt` |
| 独立探针·浏览器半身（静态+装配） | **24/24 符合** | `raw/16-probe-client.txt` |
| 发布通道 | npm **404**（不走 npm）；README 的预构建 tgz 不在快照中 → tgz 安装通道**未验** | `raw/17-npm-channel.txt` |
| 查重 | **11/11**：账本 595 事件 0 次、review 数据 0、站点「暂无评测/0.5.0」、工作区无同件测评 | `raw/20-dedupe.txt` |
| 真实 Trae 凭据 / 真实模型调用 | **未验**（无 PAT；本件不发起真实企业接口请求） | — |

## 逐项读数

### 1. 依赖安装（仓库副本内；无 lockfile）

```
$ node <pnpm.cjs> install                  # packageManager=pnpm@11.7.0
downloaded 16 packages … [ERR_PNPM_IGNORED_BUILDS] Ignored build scripts: esbuild@0.25.12
[runner] exit_code=1

$ node <pnpm.cjs> install --ignore-scripts  # 已装齐，复跑校验
Already up to date
Done in 961ms using pnpm v11.28.5
[runner] exit_code=0

$ <repo>/node_modules/esbuild/bin/esbuild --version
0.25.12
```

pnpm 11 默认拦截依赖构建脚本，属生态策略而非插件缺陷；esbuild 的平台包已随 optionalDependencies 安装，
`--ignore-scripts` 下仍可用（版本实测通过）。仓库没有 `pnpm-lock.yaml`，安装后新增了一份（工作树变更已声明）。

### 2. typecheck 与 build（可复现性）

```
$ node <pnpm.cjs> run typecheck   # tsc -p tsconfig.json
exit 0，elapsed 3,289 ms，无诊断

$ node <pnpm.cjs> run build       # esbuild bundle + copy client
  lib\index.js  96.1kb
Done in 17ms
[runner] exit_code=0 elapsed_ms=1589
```

**产物可复现**（`probes/drift.mjs`，拿锚定 tarball 重解包树逐文件对比）：

```
files_compared = 28   same = 27   changed = 0   only_in_anchor = 0   only_in_built = 1（pnpm-lock.yaml）
宿主端 bundle 构建后 vs 锚定预置: anchor=292cda61b286ade8… built=292cda61b286ade8… same=true
浏览器端产物构建后 vs 锚定预置: anchor=530086eba0405bdb… built=530086eba0405bdb… same=true
client/client.js 与 lib/client.js 同内容 = true
```

`build:test` 之后只再新增 `lib/testing.mjs`（测试产物，未列入 `package.json files`）。**宿主端 bundle 与预置产物逐字节一致**，
这条比 dsh-cite 那件干净（那件是模板/产物漂移）。

### 3. 自带测试门（55 项）

```
$ pnpm test        # node --test test/internals.test.mjs test/plugin.test.mjs test/client.test.mjs
tests 55 / pass 55 / fail 0 / skipped 0 / todo 0 / duration_ms 449.56
[runner] exit_code=0 elapsed_ms=1528
```

**但全新克隆态直接 `pnpm test` 会红**（`raw/06a`）：

```
✖ test\internals.test.mjs  ERR_MODULE_NOT_FOUND … lib/testing.mjs
tests 16 / pass 15 / fail 1 (internals 套件整体失败)
[runner] exit_code=1
```

原因：`lib/testing.mjs` 由 `build:test` 生成、且被 `.gitignore` 忽略；`test` 脚本没有先跑它。
README 开发节确实写了「先 `npm run build:test` 再 `npm test`」，但 package.json 的 `test` 单独不可用（见 P3-3）。
测试本身覆盖面很宽：目录解析/窗口、消息转换与 4027 修复、SSE 解码、错误分类、重复塌陷、文本工具调用、
额度两拼写、企业控制台、建议卡片、Cue 上报、GetUserInfo、适配器请求体/兜底、客户端 slot/额度徽标。

### 4. 独立探针（不经过自带断言）

```
$ node probes/wire.mjs        --out raw/10-probe-wire.txt        # 71 例：70 符合 / 1 FINDING
$ node probes/parsers.mjs     --out raw/11-probe-parsers.txt     # 48 例：47 / 1 FINDING
$ node probes/adapter.mjs     --out raw/12-probe-adapter.txt     # 52 例：52（+1 行为 FINDING）
$ node probes/plugin.mjs      --out raw/13-probe-plugin.txt      # 30 例：30
$ node probes/auth.mjs        --out raw/14-probe-auth.txt        # 23 例：21 / 2 FINDING
$ node probes/suggest-cue.mjs --out raw/15-probe-suggest-cue.txt # 47 例：47
$ node probes/client.mjs      --out raw/16-probe-client.txt      # 24 例：24
```

关键正向读数（抽样）：

- **目录**：内置 20 个模型 / 20 条路由，其中 **14 个 maxMode（均为 1M）**、**15 个多模态**；别名解析覆盖
  id / configName / `__dev` / `__max`、大小写不敏感；`toRoutes` 对「无 max_key 的 Max」保留标准 key 并置 maxMarker。
- **消息转换**：system/developer→system、assistant 的 tool_calls 带 index/type、tool 结果带 tool_call_id；
  孤儿 tool 结果降级为 user 文本、未应答 call 折进正文、保留的 call 重编号；用户消息图片按 `image_url` 内联
  （`data:` URI），纯文本模型与 tool 结果里的图片降级为 `[image omitted]`。
- **SSE**：跨 chunk 的 JSON、CRLF、`[DONE]`、坏 JSON、标量 data 均按预期；末尾无换行也能解出。
- **错误分类**：4023→MODEL_NOT_FOUND、4001→INVALID_REQUEST、3003→PROVIDER_UNAVAILABLE(可重试)、
  rate limit→RATE_LIMIT、`status code: 503`→PROVIDER_UNAVAILABLE、普通错误→PROVIDER_ERROR。
- **守卫**：重复塌缩触发并截断（finish=max-tokens）、正常长文本不触发、`loopGuardChars=0` 关闭；
  文本 `<invoke>` 工具调用可恢复（含参数按 schema 强类型、跨 chunk、HTML 实体、未提供工具名保持原样）。
- **适配器**：请求头/请求体（`function/config_name/model_name/session_id/conversation_id/metadata.access_type`
  与 tools 的 `parameters` JSON 字符串）、正文/思考/工具调用/usage 流、文本工具调用恢复、输出预算截断、
  空回合重试、3003 重试、4023/HTTP 500 映射、401 换 JWT 重试、读超时（PROVIDER_TIMEOUT）、用户取消保留 reason、
  main-loop 回调只在「有 sessionId + 无 purpose + 带工具」时触发、图片内联与取图失败降级。
- **装配**：Config 默认值（PAT 引用 `TRAE_PAT`、host/consoleHost、`20260908`、300 s 读超时、suggestions/reportCue 默认开）；
  `apply` 注册 4 条 Connection 路由（quota/catalog/suggestion/suggestion-event）+ adapter + Models 行 + 凭据/volatile 钩子；
  无 connection 服务时降级不抛错；无 PAT 时 `listModels` 给 MISSING_CREDENTIAL 与操作指引。
- **额度**：v1/v2 两种拼写、unlimited(-1)、0 额度、过期包丢弃、未知格式保留 raw、业务错误抛出；
  CheckLogin 发现 pay host → v1 200 → 缓存一分钟 → `?refresh` 失败如实返回错误；企业租户识别与 ToB 解析。
- **选择卡片**：3 卡 × 4 钮上限、代码围栏/`<think>` 剥离、裸行降级、半截 JSON 不生成、示例 JSON 往返一致；
  生命周期（shown/accept 各一次、resp_id 共用、turnStarted 丢弃、生成失败=无卡片、刚用过 ask_user_question 则不生成）；
  Cue multipart 上报（隐私模式跳过、401 换 JWT、非 401 抛错）；GetUserInfo 缓存/换 token/拒绝。
- **客户端静态面**：4 个 slot 注册项符合宿主规则（`conversation.input.right`/`dock`、`plugins.bundle.config`、
  `settings.models.provider-card`）；中英词典各 56 键且键集合一致；**无** `localStorage`/`sessionStorage`/`document.cookie`/
  `innerHTML`/`eval`/`new Function`；只发相对 `/api` 请求；PAT/控制台密码只经 `remote.credentials.set/describe`。

### 5. 发布通道（npm / tgz）

```
$ node probes/npm-channel.mjs --out raw/17-npm-channel.txt
npm dsh-trae2api -> 404
npm deepseek-harness-trae -> 404
package files = ["lib/index.js","lib/client.js","cordis.patch.yml","README.md"]
```

本插件**不走 npm 发布**，与 README 的「本地目录 / 预构建 `.tgz`」发货方式一致。因此没有「已发布 npm 产物」可核对；
README 提到的 `dsh-trae2api-0.5.0.tgz` 不在源码快照里，该安装通道列**未验**。

## 发现

> 分级按「不做会怎样」：P0 核心不可用/安全；P1 发布或主流程不可用；P2 可复现的功能/契约问题；P3 文档/边缘/开发体验。
> 全部有复现命令与 raw 读数；无 P0/P1。

### P2-1 · 上游目录刷新失败时会降级到 traecli 缓存，而不是保留上一次的上游目录

**读数**（`raw/11-probe-parsers.txt`，CASE `catalog_no_downgrade`）：先用可用的 `fetchUpstream` 得到
`origin=upstream`，再把上游改成失败、缓存文件仍可读，调 `refresh(true)`：

```
observed = ["upstream", "cache", null]     # 第一次 origin=upstream；刷新后 origin=cache；上次的 "Kept" 模型已不在
expected = ["upstream", "upstream", "Kept"]
```

**原因**：`src/trae/catalog-source.ts` 的 `load()` 在「上游失败 → 缓存成功」时会直接 `return snapshot(models,'cache',…)`，
先于末尾那段「`current.origin !== 'builtin'` 就保留上次快照」的保护。
**与文档冲突**：README 写「刷新失败不会清空目录，继续用上一次拿到的那份」（L48），实际会换成 traecli 缓存。
**影响**：上游故障时点「刷新」会把目录悄悄换成可能更旧的 traecli 缓存；若缓存里还有已下线模型，
选择器会继续列出它们，发送时报 `4023 the model is unknown`——正是「问来的目录」想避免的失效模式。
**复现**：

```bash
node probes/parsers.mjs --out raw/11-probe-parsers.txt    # 看 catalog_no_downgrade
```

**建议**：只有当 `current.origin === 'builtin'` 时才允许「上游失败 → 缓存」降级；已有 upstream/cache 快照时
刷新失败一律保留并 warn（与 README 承诺一致）。

### P2-2 · 流中途的上游错误被吞掉：截断回答以 `finish=stop` 正常收尾

**读数**（`raw/12-probe-adapter.txt`，CASE `miderror_swallowed`）：上游先发 `output` 正文，再发 `error` 事件：

```
observed = ["partial ", "stop", true]   # 文本=partial；finish.reason.kind=stop；只打了 "upstream error after output" 日志
expected = ["partial ", "stop", true]   # 行为本身可复现；但调用方拿不到“这轮不完整”的信号
```

`src/adapter.ts` 在已有输出时 `break`，`error` 只进 warning，reason 仍按 `stop` 处理（不抛错、不映射错误码）。
**影响**：用户看到的是「正常结束的截断答案」；下一步选择卡片会基于这段截断文本生成；宿主/用户都不会重试或提示。
**不确定**：是否作者有意「部分输出优先」；但没有任何把「不完整」传给调用方的通道。
**建议**：有输出后出现上游错误时，至少抛 `LlmError` 并把已发出的块保留给宿主（或提供 `finish.reason.kind='error'` 之类信号）。

### P3-1 · 并发首次取 JWT 会重复 `ExchangeToken`（pending 被 `reset()` 清掉）

**读数**（`raw/14-probe-auth.txt`，CASE `exchange_pending_dedup*`）：在无缓存 JWT 时并发调用
`listModels`（即并发 `auth.get()`）：

```
2 个并发 → 2 次 POST /oauth/ExchangeToken（期望 1）
3 个并发 → 3 次（期望 1）；三条都拿到了 20 个模型，功能正确
```

**原因**：`src/trae/auth.ts` 的 `get()` 在 `secret !== this.sessionSecret` 时先 `reset()`；首次 `sessionSecret` 是
`undefined`，每个并发调用都会 reset 掉别人刚设置的 `pending`，于是各自 `obtain()`（各自打一次兑换）。
**影响**：插件启动时「目录刷新 / 模型列表 / 额度」若同时要 token，会按并发数放大兑换请求（多打 N 次），
浪费且可能触发上游限流；功能结果不受影响。
**建议**：记录「正在兑换的 secret」（`pendingSecret`），只在 secret 真的变化时 reset；或把 secret 比较
放到 pending 建立之后。

### P3-2 · SSE 解码不按空行重置 `event` 类型（与标准 SSE 语义有偏差）

**读数**（`raw/10-probe-wire.txt`，CASE `sse_specials`）：一块 `event: error` 之后，新的 data-only 块
（`data: 42`，中间有空行）被标成 `error`，而标准 SSE 语义里没有 `event` 字段的事件块默认是 `message`。
**影响**：若上游发送 data-only 事件块，其类型会被上一块「污染」；当前观察到的 Trae 流每块都带 event，
**未观察到实际后果**（列不确定）。
**建议**：在空行/事件完成处把 `event` 重置为 `message`。

### P3-3 · 开发门禁不自洽：全新克隆上 `pnpm test` 失败

**读数**：`raw/06a-test-without-buildtest.txt`——`pnpm test` exit 1，`internals.test.mjs` 报
`ERR_MODULE_NOT_FOUND … lib/testing.mjs`；`.gitignore` 明确忽略 `lib/testing.mjs`（README L281 要求先 `build:test`）。
**影响**：照 README 的「开发」节分两步能过（本轮 55/55），但 `package.json` 的 `test` 单独跑、CI 直接跑都会红。
**建议**：`test` 脚本前置 `pnpm run build:test`，或把 `build:test` 并进 `build`。

### P3-4 · 文档漂移：测试数量 / 安装路径 / 预构建 tgz

- README L298 写「**24 项**单元测试」，本轮实测 **55 项**（`raw/08-self-test.txt`）。
- README L59 的安装示例是作者本机 macOS 路径 `/Users/leeyf/Desktop/trae/dsh-plugin`，对外部用户不可用。
- README 宣传 `dsh-trae2api-0.5.0.tgz` 预构建包，但源码快照里没有该文件、npm 上也没有包（`raw/17`）→
  该安装通道**未验**，不宜作为唯一推荐路径。

### 已验的正面结论（同样逐项可复跑）

- 宿主端 bundle 可由公开构建命令**逐字节复现**；`lib/client.js` 与 `client/client.js` 一致。
- `build:test` 后 55/55 测试通过；typecheck 干净。
- 目录三级兜底（上游→缓存→内置；内置 20 模型/14 Max/15 多模态）、消息转换与 4027 修复、SSE 解码、
  错误分类、重复守卫、文本工具调用恢复、输出预算、空回合/3003 重试、401 换 JWT、超时/取消、图片内联与降级。
- 额度解析（v1/v2/企业控制台）、CheckLogin→pay host→缓存、建议卡片解析/生命周期/Cue 上报、GetUserInfo。
- 插件装配与 4 条路由、无 PAT 的错误指引、无 connection 服务降级。
- 客户端 4 个 slot 合规、中英词典键对等、静态面无危险 API、凭据只走宿主 credentials。

## 诚实边界

- **已验**：依赖安装（16 包）、typecheck、build 与逐字节可复现、build:test、`pnpm test` 55/55（及全新克隆态 1 失败复现）；
  离线探针 295 例（wire 71 / parsers 48 / adapter 52 / plugin 30 / auth 23 / suggest-cue 47 / client 24），
  其中 291 符合、4 项 FINDING；查重 11 项；发布通道 3 项；构建前后/与 tarball 的逐文件指纹。
- **未验（没跑，列原因）**：① **真实 Trae PAT 兑换**：本机无 PAT，且不应借测评发起企业接口请求；
  ② **真实 `llm_raw_chat` 模型调用 / 流式输出 / function calling**：同上无凭据；③ **企业控制台额度与 ToB 席位**：
  需企业账号邮箱密码，未提供；④ **Cue 上报到真实 Trae**、**GetUserInfo 真实响应**：无凭据；
  ⑤ **真实 DSH 会话 / 浏览器 UI**（设置卡、next-step 卡片、额度徽标、中英切换）：未挂载插件到 profile；
  ⑥ **官方安装通道**（本地插件目录 / 预构建 tgz）：刻意不装 live profile，且 tgz 不在快照中；
  ⑦ **Linux / macOS**：无环境；⑧ 大图片附件缩放、2 MiB 响应上限等边界：未专门构造。
- **不确定**：① P2-2 的「部分输出优先」是否有意；② P3-2 在真实上游流量下是否会发生；③ README 的「24 项测试」
  是否为发布时计数、后续增长未更新；④ README 的「Max=1M 真实可用」自述——作者自己写「未经证实」，本件也未验；
  ⑤ 预构建 tgz 的实际内容（不在快照、npm 无包）。
- **不做**：不排名/不给总分/不用星级；不做安全渗透；不修改被测源码、不提 PR；不把插件装进 live profile；
  不向 Trae 发真实请求；不对非 Windows 平台下结论；不评价作者其它插件。

## 查重

对照四类来源（`raw/20-dedupe.txt`，11/11 通过）：

| 来源 | 读数 |
|---|---|
| `dsh-bounty` 账本 `docs/bounty/ledger.json` | **595** 个事件，`dsh-trae2api` / `deepseek-harness-trae` 命中 **0 / 0**；`trae2api` 也 0 |
| `dsh-bounty` `review/data/plugins.json` | 3 条记录，`dsh-trae2api` 命中 **0** |
| 主创站 <https://review.lingshulab.com>（在线） | dsh-trae2api 详情页「暂无评测」；页面含「清单版本 0.5.0」与 `deepseek-harness-trae` |
| 工作区文本（21,306 个文本文件，排除本次测评目录与被测源码快照） | 10 个文件命中，全部是站点页面缓存 / 筛选清单；**测评或申报形态 0** |

⇒ **对照 dsh-bounty 账本 / review 站数据 / 主创站 / 工作区，未见同件。** 账本无 dsh-trae2api / deepseek-harness-trae 事件，
本件不是既有结算项的复跑；工作区 `测试/主创站筛选/` 是本轮选件清单（其 commit 与 tarball 前缀与本件一致，作旁证）。

## 复现步骤（第三方原样可跑）

前提：Windows x64；Node v24.21.0（本机为 DSH 自带，`node` 不在 PATH，以下用绝对路径占位 `<node>`）；
快照在 `D:\natnat\lingshu\外部插件\dsh-trae2api\deepseek-harness-trae-main`；tarball 在同目录。测评工作目录
`D:\natnat\lingshu\测试\dsh-trae2api`。

```bash
cd D:\natnat\lingshu\测试\dsh-trae2api

# 0) 记锚定（务必在 install/build 之前）
node probes/anchor.mjs  --out raw/00-anchor.txt --snapshot-copy
node probes/env.mjs    --out raw/01-env.txt
node probes/live-profile.mjs --out raw/22-live-profile.txt

# 1) 装依赖（在仓库副本内；本机 pnpm 需把 node 目录放进 PATH）
cd D:\natnat\lingshu\外部插件\dsh-trae2api\deepseek-harness-trae-main
set PATH=<node-bin>;%PATH%
node <pnpm.cjs> install                 # pnpm 11 会因 esbuild 构建脚本 exit 1（已知生态策略）
node <pnpm.cjs> install --ignore-scripts  # 期望 exit 0（16 包）
node node_modules/esbuild/bin/esbuild --version   # 期望 0.25.12

# 2) 门禁
node <pnpm.cjs> run typecheck           # 期望 exit 0
node <pnpm.cjs> run build               # 期望 exit 0（写 lib/index.js + lib/client.js）
cd D:\natnat\lingshu\测试\dsh-trae2api
node probes/drift.mjs --repo <快照> --tarball <dsh-trae2api.tgz> --out raw/21-drift.txt  # 期望 lib/index.js same=true

# 3) 测试（注意：test 脚本依赖 build:test 产物）
cd D:\natnat\lingshu\外部插件\dsh-trae2api\deepseek-harness-trae-main
node <pnpm.cjs> test                    # 全新克隆态：exit 1（缺 lib/testing.mjs）
node <pnpm.cjs> run build:test          # 生成 lib/testing.mjs
node <pnpm.cjs> test                    # 期望 55/55 通过，exit 0

# 4) 独立探针（全部离线桩）
cd D:\natnat\lingshu\测试\dsh-trae2api
node probes/wire.mjs        --out raw/10-probe-wire.txt
node probes/parsers.mjs     --out raw/11-probe-parsers.txt
node probes/adapter.mjs     --out raw/12-probe-adapter.txt
node probes/plugin.mjs      --out raw/13-probe-plugin.txt
node probes/auth.mjs        --out raw/14-probe-auth.txt
node probes/suggest-cue.mjs --out raw/15-probe-suggest-cue.txt
node probes/client.mjs      --out raw/16-probe-client.txt

# 5) 发布通道与查重（在线）
node probes/npm-channel.mjs --out raw/17-npm-channel.txt
node probes/dedupe.mjs      --out raw/20-dedupe.txt

# 6) 证据整理与交付
node ../tools/normalize_raw.mjs raw
node ../tools/make_manifest.mjs --raw raw --label "dsh-trae2api 0.5.0"
node ../tools/make_issue.mjs --report "测评报告_dsh-trae2api_v0.1.md"
```

`<node>` = `C:\Users\30951\AppData\Local\Programs\DeepSeek Harness\resources\runtime\primary-runtime\dependencies\node\bin\node.exe`；
`<pnpm.cjs>` = 同目录上级 `pnpm\bin\pnpm.cjs`。探针默认 `--repo` 指向上述快照，可显式覆盖。

## 一句话总结

**dsh-trae2api 0.5.0 在 Windows 上装得上、typecheck 干净、宿主 bundle 可按公开命令逐字节复现、`build:test` 后
55/55 自带测试通过；295 例独立离线探针里 291 例符合，覆盖了目录/消息/SSE/错误分类/重试/超时/取消/图片/额度/
建议卡片/客户端装配等 provider 桥的主要契约；但发现 2 条 P2——刷新失败会悄悄降级到 traecli 缓存（与 README 承诺相反），
流中途上游错误被吞成正常 stop 的截断回答——以及 4 条 P3（并发首次兑换重复、SSE event 不重置、全新克隆 `pnpm test` 失败、
文档漂移）；真实 Trae PAT、真实模型调用与企业额度均未验，因为没有凭据也不该借测评发起真实企业请求。**
