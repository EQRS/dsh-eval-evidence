[intake 输入] 【测评报告】@hyzyn/dsh-mcp 0.3.6 体验快测（MCP 服务器配置 · 方法试验）

<!-- intake:v1 {"project":"bench","difficulty":"medium","impact":"B","target":"hyzyn/dsh-plugin-kit","form":"intake"} -->

<!-- 协议对齐：工程协议手册 v1.1（r2）§6 体验快测档；协议文件 sha256 8dd51cbf75b259c5dabfdb928eb112364231b5d8f9f580759534e5d78a34d849 -->
> **协议对齐（v1.1 · r2 · 体验快测档）**：本件是**体验快测**（手册 §6），只记录安装/功能点/卸载残留类检查结果；
> **不生成五种能力状态标签、不进入能力榜、不以「通过/合格」作为插件结论**；未覆盖项见「诚实边界」。
> - **协议绑定**：`工程协议手册-v1.1`（修订标识 r2），文件 sha256 `8dd51cbf75b259c5dabfdb928eb112364231b5d8f9f580759534e5d78a34d849`（快照 `测试/协议/`）。
> - **插件身份**：源码版（commit + 逐文件树指纹）或发布包版（版本 + 哈希），见「锚定提交」。
> - **环境配置 ID**：dsh 0.2.1-rc.2 / win32-x64 / Windows 10.0.26200 / node v24.21.0 / model=n/a（本快测未调用模型）/ 依赖与外部服务见「环境与基线」。
> - **安全口径（§4 三分法）**：本件**未做**六威胁安全审计 ⇒ 安全结论 = **未测**（不是「未发现问题」，也不是「已验证通过」）。
> - **时效（§13.7）**：测评完成后 90 个自然日内有效；版本/权限/数据流/依赖/宿主变化触发复核，旧报告不自动适用于新版本。


## 性质声明

本件是给 **review.lingshulab.com 插件测评子站**的 intake 输入（外部贡献申报），不是悬赏：**不 /claim、不自行加 bounty 标签**，计分与归并均由维护者裁定。

**范围声明（monorepo 子包）**：被测对象是 `hyzyn/dsh-plugin-kit` monorepo 的 **`packages/mcp`（`@hyzyn/dsh-mcp@0.3.6`）**；根包 `@hyzyn/dsh-plugin-kit@0.1.57` 只是全家桶 bundle，**同仓另外 12 个包不在本件范围**。本件只评价 `packages/mcp` 的源码/产物/行为，不评价根包整合与同仓其它包。

本件**未把插件装进任何正在使用的 DSH profile**：全部读数来自本地只读快照 + 已有 `node_modules` 的临时探针环境；**没有重装依赖、没有写 live profile、没有改被测源码**（跑完根树恢复为 711 文件，见 `raw/16-post-clean-anchor.txt`）。网络只做只读拉取：GitHub raw 镜像、npm registry tarball、评测子站页面。

**平台声明**：本件**仅 Windows**（Windows 11 10.0.26200，x64）实测；WSL / Linux / macOS **未跑**；POSIX 文件权限、跨平台 spawn 行为不对其下结论。

**利益相关/独立性**：被测作者为 `hyzyn`，与测评者无已知关联；本件不是作者自评。但本件是**项目方派发的站点投稿件**，不构成平台级第三方审计；所有结论以 `raw/` 原始读数为准。

## 锚定提交

- 被测仓：`hyzyn/dsh-plugin-kit`（**无 `.git`**）；给定 commit `7363332f595b8112cb4b601f8723e6453043eb62`（2026-10-18T13:46:13Z）。
- 快照：`D:\natnat\lingshu\外部插件\hyzyn-dsh-plugin-kit\dsh-plugin-kit-main`。
- **commit 内容独立核验**：本机直连 GitHub 失败，经 `gh-proxy.com` / `ghfast.top` 镜像拉取该 commit 的 raw 文件；**matched=21 / total=21 逐字节 MATCH**（`raw/06-upstream-commit.txt`），另取到 `commit.patch`（sha256 `60dd0c5ad6340f501fa890dea4513f89e9167eb8596ce2d92f5592d911932d89`；头部日期 `Sun, 18 Oct 2026 21:46:13 +0800` = 2026-10-18T13:46:13Z，与任务给出一致）。⇒ 本地快照可锚定到该 commit 的内容面。
- **版本/关键指纹**（`raw/00-anchor.txt`）：
  - 根 `package.json` 0.1.57：4216 B，sha256 `283a5fc901a740d826e9d3e2003c7121ab419bb7dc296c270a0186826ccc484b`
  - 子包 `packages/mcp/package.json` 0.3.6：2223 B，sha256 `a7edc746c10f3a8c3633b4c400f2321f6a17da30071666e9d9f0fde4dac88c34`
  - `packages/mcp/src/index.ts`：56796 B，sha256 `0d29078ce986547e60be78f9c50d9b5fce72a0e73e2ce234b1ab7b468968232d`
  - 入库产物 `packages/mcp/lib/index.js`：55205 B，sha256 `9eb08baa85a1147df805d7fddef2151392b552f37679709437940f896ae9332a`
  - `packages/mcp/` 树：**17 文件 / 292076 B / `6fad0f5d3949e284de22133570ad8fceecdab7d0d4e558d4ea949e7ea898e1a0`**
  - `src/`：2 文件 / 57568 B / `2e4bbeafb1ec90e5241e63979c91ff770891df89a29e24f2803ce64c096dd393`；`test/`：5 文件 / 33628 B / `107f58f51fd2002e5ea6b30323a571a06b81e860a07e0197d2248ce69e7561c5`；`lib/`：3 文件 / 104528 B / `d2e4ad2d1d153b72be2d1eb0e747c8c36821738a86cf94f99a4d14101fe4f21b`
  - 根树（排除 `node_modules/.git/.codegraph`）：**711 文件 / 26783926 B / `f4fd279ced46acc8382797d722c46197dee2e52e423ba175f9d9b770bbb31f46`**（本件自写聚合算法：按 relpath 排序后 `relpath<TAB>sha256` 再 sha256）
- **npm 发布面对账**：`@hyzyn/dsh-mcp@0.3.6` 的 `published_at=2026-10-17T16:29:01.916Z`、`dist-tags.latest=0.3.6`；tarball 63263 B，sha1 `fcf31d0bf17c2829a93f3d2450955106d91cd18d`（= dist.shasum）、sha256 `8289bd13317367deb85eaa734ad9fe535af57b9e6e153ece781abc064d34aca9`、integrity 自算与 registry 一致；解包 9 文件 **matched=9 / mismatched=0**（`package.json` 键序差异、语义相等；`LICENSE` 对仓根一致），见 `raw/07-npm-publish.txt`。
- **版本面注记**：npm 0.3.6 发布于 2026-10-17，而给定 commit 是 2026-10-18 的仓 HEAD；`packages/mcp` 在该 commit 的 21 个 raw 文件与本地逐字节一致 ⇒ 本件结论对该 commit 与 npm 0.3.6 tarball 都成立；但不能说「该 commit 就是 0.3.6 的发布提交」。

## 环境与基线

| 项 | 读数 | 证据 |
|---|---|---|
| 宿主 | DeepSeek Harness **0.2.1-rc.2**（`dsh --version`） | `raw/00b-host-version.txt` |
| 平台 | **仅 Windows** 11 10.0.26200，x64 | `raw/00-anchor.txt` |
| Node | **v24.21.0**（DSH 自带） | `raw/00-anchor.txt` |
| pnpm | **11.28.5**（DSH 自带） | `raw/00-anchor.txt` |
| 新工具链（run.cmd） | git **2.56.0.windows.2**、npm **12.2.0**、go **1.27.2**、ffmpeg **N-127650**、python **3.12.10** | `raw/00-anchor.txt` |
| 依赖态 | **沿用前两件测评已装的 node_modules，本件未重装**：root 顶层 12 项、`.pnpm` **204** 包、`packages/mcp/node_modules` 有 cordis/dsh/schemastery/kit/js-yaml/react/typescript；vitest 3.2.7、typescript 5.9.3 | `raw/00-anchor.txt` |
| 插件安装面 | live profile **未装** @hyzyn/dsh-mcp；真 `~/.dsh/cordis.patch.yml` / `prompts.yml` 均 **MISSING**；profile 三文件 `mentions_dsh_mcp=false` | `raw/17-side-effects.txt` |
| 基线（无插件） | 未在真实 DSH 会话注册本插件；本件用**最小 host 面**（fake webServer/systemPrompt + fake MCP 服务器）测行为，非真实宿主基线 | `raw/08-pure.txt`、`raw/09-routes.txt` |

## 结果速览

| 面 | 结果 | 证据 |
|---|---|---|
| commit 内容锚定 | matched=21 / total=21 raw 文件 MATCH；commit.patch 日期一致 | `raw/06-upstream-commit.txt` |
| npm 发布锚定 | tarball sha1/integrity 通过；matched=9 / mismatched=0；9 文件 | `raw/07-npm-publish.txt` |
| 子包自带测试 | **5 文件 / Tests 49 passed (49)**，rc=0，3.48 s | `raw/01-mcp-tests.txt` |
| 包级 typecheck | `tsc --noEmit` rc=0，2492 ms | `raw/02-mcp-typecheck.txt` |
| client 静态检查 | `client-lint.mjs` rc=0（样式变量 118 处 / 自定义属性 123 处等） | `raw/03-mcp-client-lint.txt` |
| 产物链 | src 重建 → `index.js`/`index.d.ts` 字节 EQUAL、map 语义 EQUAL，PASS | `raw/04-artifact-chain.txt` |
| 包自带 verify 脚本 | `verify-managed-block.mjs` **11 条 PASS / 0 FAIL** | `raw/05-verify-managed-block.txt` |
| 独立纯函数/DTO/闸门探针 | **pass=47 / fail=0** | `raw/08-pure.txt` |
| 独立路由/连接测试探针 | **pass=47 / fail=0**（stdio 含 `.cmd` shim；http json/sse-post/get-sse） | `raw/09-routes.txt` |
| 独立托管区块边界探针 | **pass=3 / fail=4**（4 条畸形文件边界，见 P2-1/P3-1） | `raw/13-block-edges.txt` |
| 整仓测试（仅参考） | 177 文件：3 failed / 173 passed / 1 skipped；3250 用例：3 failed / 3223 passed / 24 skipped；`packages/mcp` 5 文件全通过 | `raw/12-full-tests-reference.txt` |
| 线上站点 | `@hyzyn/dsh-mcp` 已列、清单版本 **0.3.6**、**暂无评测**、0 评测链接 | `raw/11-review-site.txt` |
| 官方安装 / 真实 DSH UI / HMR | **未验**（见诚实边界） | — |

## 逐项读数

### 1. 依赖态与执行方式（不重装）

```bash
# NODE/PNPM 由 DSH runtime 提供；本轮用 run.cmd 统一带 git/npm/go/ffmpeg PATH
cmd /c "C:\Users\30951\tools\run.cmd node node_modules\vitest\vitest.mjs run packages/mcp"
```

- `node_modules` 由前两件测评装好，本件**未执行 `pnpm install`**；`pnpm-lock.yaml` sha256 `d54abb9c6c43004931b537ccfeb16a4443dcc125b4d608efd95bb0838e034003`，根树 711 文件未变（`raw/00`、`raw/16`）。
- 行为探针统一把 `DSH_HOME` 指向 `raw/artifacts/` 下临时目录；真实 `~/.dsh` 未被写（`raw/17` 显示 live `cordis.patch.yml`/`prompts.yml` 均 MISSING）。

### 2. 子包自带测试（`vitest run packages/mcp`）

```
✓ packages/mcp/test/save-guard.test.ts (10 tests)
✓ packages/mcp/test/managed-block.test.ts (12 tests)
✓ packages/mcp/test/external-conflicts.test.ts (9 tests)
✓ packages/mcp/test/tool-count.test.ts (9 tests)
✓ packages/mcp/test/route-gate.test.ts (9 tests)
Test Files  5 passed (5)
     Tests  49 passed (49)
Duration  3.48s
```

rc=0（`raw/01-mcp-tests.txt`）。覆盖面：托管区块拼接、保存空列表防护、外部重名/冲突、toolCount DTO、路由闸门负例；**连接测试（probeStdio/probeHttp）与完整 3 条路由 handler 不在自带 49 用例内**（本件用独立探针补，见 P3-2）。

### 3. typecheck / client-lint / 产物链

```
tsc --noEmit -p tsconfig.json          # rc=0，2492 ms
node ../../scripts/client-lint.mjs     # rc=0
```

client-lint 读数：`client.js 通过（宿主地址来源 0 处 · 样式变量 118 处全部存在 · 自定义属性 123 处全部有定义 · 胶囊/正圆 4 处均已配对 corner-shape · 中性边框 13 处均为 0.5px 发丝线 · 圆角 10 处均为官方尺度 token · 危险按钮 1 处均为官方 danger 配方 · 按钮族 4 个类均对齐官方 Button · 排版 28 处字号均已配对行高与官方字重 · 控件选中色 1 处均为官方 brand · 输入档 1 处均为显式高度 + token 圆角 · 颜色 117 处宿主令牌引用均无字面量兜底 …）`（`raw/03`）。**静态规则不等于浏览器行为已验证**。

产物链（`raw/04-artifact-chain.txt`）：

```
compare[index.js]=EQUAL          55205B/9eb08baa…
compare[index.d.ts]=EQUAL        6384B/e112b70b…
compare[index.js.map]=SEMANTIC_EQUAL  mappings_equal=true（sources 仅随 outDir 变）
byte_diff_count=0  map_semantic_diff_count=0  verdict=PASS_artifact_chain
```

### 4. 托管区块：仓库自带 verify + 独立纯函数探针

- 仓库自带 `packages/mcp/scripts/verify-managed-block.mjs`：**11 条 PASS / 0 FAIL**（`raw/05`），覆盖追加/原位替换/head+tail 保留/悬空 start/`js` 表达式/空文本。
- 独立 `probe-pure.mjs` 的 splice 部分（`raw/08`）：无区块追加、原内容保留、空 rows 写 `- insert: []`（不是裸 `[]`）、已有区块原位替换、根 `[]` 摘除后仍合法 YAML、悬空 start 保留尾部、`disabled: true` 落盘、`!!js` 表达式落盘与 DTO 还原 `js:` 前缀；均 PASS。

### 5. MCP 配置解析 / 校验矩阵（独立 `probe-routes.mjs`，save 路由）

`raw/09-routes.txt`。已验：

- 合法两行（stdio + streamable-http、`disabled: true`、`env` 的 `js:` 前缀）保存 200、落盘 `disabled: true` 与 `!!js 'process.env.TOKEN'`；GET 回读还原 `js:process.env.TOKEN`。
- 拒绝矩阵（16 例）：servers 非数组、非法/重复 id、重复 serverName、serverName 非法字符、transport 非法、stdio 缺 command、http 缺 url、http 非 http/https、cwd 不存在、未知配置项、env 非对象、toolCallTimeoutMs=0、reconnect initial>max、maxAttempts=0、reconnect 未知键 → 均 400。
- **空列表清空防护**：已有 1 条 + `servers: []` 无 `clearAll` → 400 且文案含「1 条」「clearAll: true」；带 `clearAll:true` → 200 且落盘 `- insert: []`；区块本来空 → 200。
- **外部重名**：fake loader 里存在外部 mcp-client `taken` 时，新增同名行 → 400 且点名占用；纯函数矩阵另验「已保存同 id+name 历史遗留放行、改名后再撞拒绝」。
- **请求体上限**：>512KB → 400 `invalid JSON body`。
- **DTO 失败**：`ctx.loader` 属性访问抛错 → GET `/servers` 返回 **500 + error**，不是空 400。

### 6. 连接测试（stdio / streamable-http）与启停语义

`probe-routes.mjs` 用 fake webServer/systemPrompt 真实挂载 `apply()`，直接调 `POST /api/dsh-mcp/test`；**pass=47 / fail=0**（`raw/09`）：

- **stdio 成功**：node 直跑 fake MCP server → `ok=true`、`transport=stdio`、`toolsCount=2`、`serverInfo.name=fake-mcp`、`protocolVersion` 为字符串、`durationMs` 非负；`tools/list` 205 个 → `toolsCount=205` 且回传 tools 截断到 200。
- **stdio `.cmd` shim**：README 声称 `spawnPortable` 能处理 Windows `.cmd`；用 `%TEMP%` ASCII 路径的 `.cmd` 包装器实测 → `ok=true/toolsCount=2`（**成立**）。
- **stdio 失败**：fake 服务器 `--fail` 写中文 stderr 后 exit 3 → `ok=false`、error 含「启动失败」（容错解码，无 `���`）；缺 command → error 点名 command。
- **streamable-http 三种响应形态**：`json`（POST 直接 JSON）、`sse-post`（POST 回 SSE）、`get-sse`（POST 202 + GET SSE）→ 均 `ok=true/toolsCount=2`；不可达端口 → `ok=false` 且带 error；`ftp://` URL → `ok=false` 且提示 http/https。
- **启停语义**：`disabled: true` 落盘、DTO 回读 `disabled=true`；fake loader 中 `disabled` 条目 → status `disabled`；active/error/loading/not-loaded 状态映射与 `toolCount` 缺失/为 0 的语义由纯函数探针验证（`raw/08`）。
- **路由围栏**（`probe-pure.mjs`，`raw/08`）：回环+同源放行；外部 Host/非回环来源 403；POST 缺同源证明 403；桌面壳带 Cookie 例外放行；跨站即使带 Cookie 403；GET 无证明可读；方法不符 405 且先于证明；拒绝留一条成因日志。

### 7. 整仓测试（仅参考，不下 mcp 结论）

```
Test Files  3 failed | 173 passed | 1 skipped (177)
     Tests  3 failed | 3223 passed | 24 skipped (3250)
Duration  45.25s   exit=1
```

失败文件：`scripts/test/live-profile.test.ts`、`scripts/test/internal-identifiers.test.ts`、`packages/tty/test/probe.test.ts`——**均不在 `packages/mcp`**；`packages/mcp` 的 5 个文件在整仓中同样全通过（`raw/12`）。失败与本插件无关，不据此判 mcp 质量。

### 8. 站点查重

线上（`raw/11`，2026-10-19 抓取）：目录第 3 页找到 `@hyzyn/dsh-mcp`（`/plugins/01a14edf-a0ac-7831-b19e-bd86c7a3045b`），详情页「本站评测（0）」「暂无评测」、`detail_review_links=0`，清单版本 **0.3.6**、子路径 `packages/mcp`。本地查重（`raw/10`）：账本 595 事件 **0** 命中、review 数据 3 条无目标、主创站筛选 33 条中目标 1 条 `reviewed:false`、bounty 全仓 grep 0。

## 发现

> 本件**未发现 P0/P1**；1 条 P2（畸形文件恢复路径）+ 2 条 P3（边界与测试覆盖）。每条附可复跑命令与 `raw/` 读数。

### P2-1 · 结束标记丢失时的「恢复写回」会把旧 insert 行留在新区块之外，同 id 可能出现两次

**读数**（`raw/13-block-edges.txt`）：

```
INFO dangling_start insert_entries=2 mcp-a_occurrences=2
INFO dangling_start_output="# head
# --- dsh-mcp-config managed (auto-generated; do not edit) ---
- insert:
    - id: mcp-a
      name: '@deepseek-ai/dsh-mcp-client'
      config: { serverName: new-a … }
# --- end dsh-mcp-config managed ---

- insert:
    - id: mcp-a
      name: '@deepseek-ai/dsh-mcp-client'
      config: { serverName: old-a … }
"
```

- 复现：写一份 `cordis.patch.yml`，有起始标记与一条 `- insert`（id `mcp-a`）但缺结束标记；调用 `spliceManagedBlock(file, [{ id:'mcp-a', config:{serverName:'new-a',…} }])` → 输出里 **2 个 insert / `mcp-a` 出现 2 次**：新行在标记内，旧行被原样留在 `# --- end … ---` 之后，成为顶层额外 insert。
- 源码注释/自带 verify 用例 3 的意图是「悬空 start 时保留区块后的用户内容，不吞掉」；但对**旧区块体中的 `- insert` 行**来说，它不再是「用户内容」，而是会被 DSH 当作第二条 patch 读取（同仓 `docs/troubleshooting.md` 明确 `duplicate loader entry id` 会导致宿主启动失败）。本机没有真实宿主，**未复现启动失败**，但文件层的重复与同 id 是可复现的。
- **影响**：只在文件缺结束标记（手工编辑/截断/外部写坏）后，用户再次保存时触发；插件自身正常写出的文件不会进入该形态。触发后最坏是 HMR/启动时同 id 冲突，或旧服务器配置继续生效；轻度是文件里出现两条重复。**建议**：悬空 start 分支只保留「非 insert 的用户内容」，或把旧 body 整体替换（与 prompt 插件同款行为）；同时在 verify 用例里钉住「同 id 不出现两次」。

### P3-1 · 托管区块其他 4 种畸形输入未被覆盖（标记短语误判/双区块/多行 insert/坏行静默）

**读数**（`raw/13-block-edges.txt`，pass=3 / fail=4）：

- **标记短语误判**：用户注释含 `dsh-mcp-config managed` → `readManagedRows` 把它当起点，因无 end 返回 `fileError="托管区块缺少结束标记…"`、rows=0（文件本身没坏，UI 会显示空/错误）。
- **双区块不收敛**：文件里已有两份托管区块，`spliceManagedBlock` 只替换第一份，写回后 `start_markers=2`；读 DTO 只读第一份。
- **一 insert 多行**：手写/第三方工具把两条 row 放进同一个 `insert` 数组时，`readManagedRows` 只取 `rows[0]`，DTO 只有 `mcp-r1`（`multi_row_insert dto_ids=["mcp-r1"]`）。
- **坏行静默**：一条好行 + 一条 `config` 非对象的坏行 → DTO 只保留好行、`fileError=undefined`，坏行无声消失（`malformed_row rows=1 ids=["mcp-good"]`）。

**影响**：均只在用户手工编辑/复制/第三方工具改写托管区块时出现；插件正常路径不会产生。**建议**：start/end 用整行精确匹配；写回时收敛为一份区块；`readManagedRows` 对坏行/多行给出 fileError 或全部保留；给这 4 种形态补自带用例。

### P3-2 · 连接测试与三条路由 handler 没有仓库自带单测，只靠需要真实宿主的 smoke 脚本

**读数**：`packages/mcp/test/` 只有 5 文件（managed-block / route-gate / save-guard / external-conflicts / tool-count，合计 `Tests 49 passed (49)`），`package.json` 的 `http-smoke` / `tools-smoke` 指向根 `scripts/verify-mcp-http.mjs` / `verify-mcp-tools.mjs`，两者都要求**运行中的宿主** `--host`（本机未装插件/未起宿主，未跑）。**影响**：`probeStdio`（含 `.cmd` shim、stderr 容错、协议版本、超时/提前退出）与 `probeHttp`（json/sse-post/get-sse）是 README 的核心卖点，但 `pnpm test` 绿不覆盖它们；回归只能靠手工 smoke。**建议**：把本件的 fake MCP stdio/http fixture 抽成包内 vitest（不需要真实 DSH 宿主），至少钉 `.cmd`、stderr 中文、三种 HTTP 响应形态与 `toolsCount` 截断。

## 诚实边界

- **已验**（有原始读数）：
  ① commit 处 matched=21 / total=21 raw 文件 MATCH 与 commit.patch 日期；② npm 0.3.6 tarball sha1/integrity + matched=9 / mismatched=0；③ `packages/mcp` 自带 `Tests 49 passed (49)`；④ `tsc --noEmit` 与 client-lint rc=0；⑤ src→lib 产物链 PASS；⑥ 仓库自带 `verify-managed-block` 11 条 PASS；⑦ 独立纯函数/DTO/闸门 pass=47 / fail=0；⑧ 独立路由/连接测试 pass=47 / fail=0（stdio `.cmd`、stderr 中文、HTTP json/sse-post/get-sse、保存/校验/清空防护/外部重名）；⑨ 托管区块 4 种畸形边界（pass=3 / fail=4）；⑩ 整仓参考读数（3 failed / 173 passed / 1 skipped；mcp 5 文件全过）；⑪ 线上站点 0.3.6 / 暂无评测 / 0 评测链接；⑫ 根树跑前跑后 711 文件、live profile 未被写。
- **未验（没跑，列原因）**：
  ① **真实 DSH 会话 + 浏览器 UI**：未装 live profile；`client.js` 只有静态 `client-lint`，卡片渲染/剪贴板/`slots` 服务未跑；② **官方安装通道**（`dsh plugin --profile web add link:...`）：本机虽已有 run.cmd 的 git/npm，但**不写 live profile**，未安装；③ **真实 HMR 热加载**：README 声称 1~2 秒自动重载，本机未接真实宿主/loader，不能验证；④ **真实 MCP 服务器**：本件用 fake MCP stdio/http 服务器验证协议，未接真实 MCP SDK 工具加载链路（`mcp__<server>__<tool>` 是否注册、工具调用）；⑤ **`http-smoke` / `tools-smoke`**：需要运行中的宿主 `--host`，未跑；⑥ **Windows 以外平台**；⑦ **并发写 `cordis.patch.yml`**（`writeManagedRows` 有 mtime+size 复核重试，未构造多进程竞争）；⑧ **安全审计/渗透**：未做。
- **不确定**：
  ① 缺结束标记时保留旧 insert 行导致同 id 重复，在真实 DSH 的 loader 上究竟是「启动失败」还是「后行覆盖前行」——同仓文档只给 `duplicate loader entry id` 会让宿主启动失败，本机无宿主未复现；② 4 种畸形文件边界的实际用户触发率；③ 连接测试的 `.cmd`/HTTP 成功是否与官方 `@deepseek-ai/dsh-mcp-client` 的真实工具加载完全同构（本件只验探测链路）；④ 整仓 3 个失败文件（scripts/tty）与本插件无关，未逐条深挖根因；⑤ npm 0.3.6 发布早于给定 commit（mcp 子树 21 文件逐字节一致，但「commit == 发布提交」不成立）；⑥ 站点详情是登录前视图，「评测 0」是否含未公开草稿。
- **不做**：不排名、不给总分、不用星级；不做安全利用；不改被测源码、不提 PR；不装 live profile；不对非 Windows 下结论；不评价同仓其它 12 个包。

## 查重

对照对象与读数（`raw/10-dedupe.txt` + `raw/11-review-site.txt`）：

1. **本地 dsh-bounty 快照**：`docs/bounty/ledger.json` **595** 事件，`dsh-mcp` 关键词命中 **0**；`review/data/plugins.json` 3 条记录（dsh-memory/dsh-mnemon/dsh-auto-memory），无 hyzyn/dsh-mcp；bounty 全仓文本 grep 命中 **0**（含 hyzyn 关键词 0）。
2. **同工作区「主创站筛选」快照**：33 条插件记录，目标 **1** 条——`@hyzyn/dsh-mcp`（`hyzyn/dsh-plugin-kit / packages/mcp`，`reviewed:false`）。
3. **线上评测子站**（review.lingshulab.com，2026-10-19 抓取，`raw/11`）：目录第 3 页列出 `@hyzyn/dsh-mcp`，详情页「本站评测（0）」「暂无评测」、`detail_review_links=0`，清单版本 **0.3.6**、子路径 `packages/mcp`。
4. **不能查的**：本机没有 GitHub issue 搜索 API 的可复跑通道（直连失败、镜像未做全量 issue 检索）；站点登录后草稿不可见。

⇒ **对照 账本 595 事件 / 子站记录 3 条 / 主创站筛选 33 条 / 线上详情页，未见同件**；线上目标「暂无评测」，本件可作为该条目的首个独立运行快测。

## 复现步骤（第三方原样可跑）

环境：Windows x64；Node **v24.21.0**、pnpm **11.28.5**、vitest **3.2.7**（既有 `node_modules`，**不重装**）；新工具链经 `C:\Users\30951\tools\run.cmd`。被测仓：`D:\natnat\lingshu\外部插件\hyzyn-dsh-plugin-kit\dsh-plugin-kit-main`。

```bash
# 0) 锚定（应得到 raw/00 的同一组 sha256/树指纹）
cd D:\natnat\lingshu\测试\hyzyn-dsh-mcp
cmd /c "C:\Users\30951\tools\run.cmd node probes\probe-anchor.mjs --repo <REPO> --commit 7363332f595b8112cb4b601f8723e6453043eb62"

# 1) commit 内容锚定（镜像；需网络）与 npm tarball 对账
cmd /c "C:\Users\30951\tools\run.cmd node probes\probe-upstream.mjs --repo <REPO> --commit 7363332f595b8112cb4b601f8723e6453043eb62"
cmd /c "C:\Users\30951\tools\run.cmd node probes\probe-publish.mjs --repo <REPO> --version 0.3.6"

# 2) 子包测试 / typecheck / client-lint / 产物链
cd <REPO>
cmd /c "C:\Users\30951\tools\run.cmd node node_modules\vitest\vitest.mjs run packages/mcp"
cd packages\mcp
cmd /c "C:\Users\30951\tools\run.cmd node ..\..\node_modules\typescript\bin\tsc --noEmit -p tsconfig.json"
cmd /c "C:\Users\30951\tools\run.cmd node ..\..\scripts\client-lint.mjs"
cd <WORK>
cmd /c "C:\Users\30951\tools\run.cmd node probes\probe-artifact.mjs --repo <REPO> --tsc <REPO>\node_modules\typescript\bin\tsc --out <WORK>\raw\artifacts\mcp-build"

# 3) 独立探针（全部 DSH_HOME=raw/artifacts，不写 ~/.dsh）
cmd /c "C:\Users\30951\tools\run.cmd node probes\probe-pure.mjs <REPO>"
cmd /c "C:\Users\30951\tools\run.cmd node probes\probe-routes.mjs <REPO>"
cmd /c "C:\Users\30951\tools\run.cmd node probes\probe-block-edges.mjs <REPO>"
cmd /c "C:\Users\30951\tools\run.cmd node probes\probe-dedupe.mjs --bounty D:\natnat\lingshu\dsh-bounty-main --work <WORK>"
cmd /c "C:\Users\30951\tools\run.cmd node probes\probe-site.mjs --out <WORK>\raw\artifacts\site"

# 4) 整仓测试（仅参考；会生成 packages/codegraph/.preview/*.html，按 raw/15 清理）
cd <REPO>
cmd /c "C:\Users\30951\tools\run.cmd node node_modules\vitest\vitest.mjs run"
cd <WORK>
cmd /c "C:\Users\30951\tools\run.cmd node probes\probe-cleanup-preview.mjs --repo <REPO>"
cmd /c "C:\Users\30951\tools\run.cmd node probes\probe-anchor.mjs --repo <REPO> --commit 7363332f595b8112cb4b601f8723e6453043eb62"

# 5) 证据整理
cmd /c "C:\Users\30951\tools\run.cmd node ..\tools\normalize_raw.mjs raw"
cmd /c "C:\Users\30951\tools\run.cmd node ..\tools\make_manifest.mjs --raw raw --label \"@hyzyn/dsh-mcp 0.3.6\""
cmd /c "C:\Users\30951\tools\run.cmd node ..\tools\make_issue.mjs --report \"测评报告_hyzyn-dsh-mcp_v0.1.md\""
```

## 一句话总结

**@hyzyn/dsh-mcp 0.3.6 的 `packages/mcp` 子包主体健康：自带 Tests 49 passed (49)、typecheck/client-lint/产物链、commit matched=21 / total=21 raw 与 npm 0.3.6 matched=9 / mismatched=0 tarball 均对得上；独立探针验证了 stdio（含 `.cmd` shim + 中文 stderr 容错）、streamable-http（json/sse-post/get-sse）、保存/校验/清空防护/外部重名/启停 DTO 共 47 项，以及纯函数/DTO/围栏 47 项；未发现 P0/P1，只有 1 条 P2（缺结束标记时恢复写回可能留下同 id 旧 insert，真实宿主 duplicate loader entry id 未复现）与 2 条 P3（另外 4 种托管区块畸形边界、连接测试/路由无自带单测）；真实 DSH UI/HMR/官方安装/真实 MCP 工具加载未验。**
