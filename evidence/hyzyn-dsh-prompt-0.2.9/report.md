[intake 输入] 【测评报告】@hyzyn/dsh-prompt 0.2.9 体验快测（Prompt 管理 / A/B 分流 · 方法试验）

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

**范围声明（monorepo 子包）**：被测对象是 `hyzyn/dsh-plugin-kit` monorepo 的 **`packages/prompt`（`@hyzyn/dsh-prompt@0.2.9`）**；根包 `@hyzyn/dsh-plugin-kit@0.1.57` 只是全家桶 bundle，**同仓另外 12 个包不在本件范围**。本件结论只覆盖 `packages/prompt` 的源码/产物/行为，不评价同仓其它包，也不评价整仓发布质量。

本件**未把插件装进任何正在使用的 DSH profile**：全部读数来自本地只读快照 + 一个由既有 `node_modules` 支撑的临时构建/探针环境；未重装依赖、未联网安装、未改被测源码（跑完根树恢复为 711 文件，见 `raw/14-post-clean-anchor.txt`）。唯一的网络访问是**只读**拉取 npm registry tarball、GitHub raw 镜像与评测子站页面（见「锚定提交」「查重」）。

**平台声明**：本件**仅 Windows**（Windows 11 10.0.26200，x64）；WSL / Linux / macOS **未跑**。POSIX 文件权限（0600）在 Windows 上不生效，本件不对其下结论。

**利益相关/独立性**：被测作者为 `hyzyn`，与测评者无已知关联；本件不是作者自评。但本件是**项目方派发的站点投稿件**，不构成平台级第三方审计；所有结论以 `raw/` 原始读数为准。

## 锚定提交

- 被测仓：`hyzyn/dsh-plugin-kit`（**无 `.git`**；Given commit `7363332f595b8112cb4b601f8723e6453043eb62`，2026-10-18T13:46:13Z）
- 快照：`D:\natnat\lingshu\外部插件\hyzyn-dsh-plugin-kit\dsh-plugin-kit-main`
- **commit 内容独立核验**：本机直连 GitHub 失败，经 `gh-proxy.com` / `ghfast.top` 镜像拉取该 commit 的 raw 文件；**matched=15 / total=15（全部与本地逐字节 MATCH）**（`raw/08-upstream-commit.txt`），并取到 `commit.patch`（sha256 `60dd0c5ad6340f501fa890dea4513f89e9167eb8596ce2d92f5592d911932d89`；头部日期 `Sun, 18 Oct 2026 21:46:13 +0800` = 2026-10-18T13:46:13Z，与任务给出一致）。⇒ 本地快照可锚定到该 commit 的内容面（不是只信版本号）。
- **版本面**：根 `package.json` 0.1.57 / `packages/prompt/package.json` 0.2.9；关键指纹（`raw/00-anchor.txt`）：
  - 根 `package.json`：4216 B，sha256 `283a5fc901a740d826e9d3e2003c7121ab419bb7dc296c270a0186826ccc484b`
  - 子包 `package.json`：1979 B，sha256 `9675bc81efb9a1b08e87c7e6a94e9ba6e87fc5e53236be3a0d4eab4882adc1d6`
  - `packages/prompt` 树：12 文件 / 175257 B / `0848832fe51499a188ef5e3e623df7c6583f1cd03aeae15cbde262fa04a199ce`
  - `src/`：2 文件 / 33943 B / `1244193de453b3e666fff897ff2a4a283e5de90c3e4a00c2e98592fc6092827f`
  - `test/`：1 文件 / 7154 B / `405caf9279eab2fb2133355ca6395b13dfb31a2a030f3b6c42e25db30f5c9533`
  - `lib/`（入库产物）：3 文件 / 68467 B / `60ed3c6ecab59a595f517795f8e8258a1484da74b55d60e905ddef4b6b7a8a37`
  - 根树（排除 `node_modules/.git/.codegraph`）：**711** 文件 / 26783926 B / `f4fd279ced46acc8382797d722c46197dee2e52e423ba175f9d9b770bbb31f46`（本件自写聚合算法：按 relpath 排序后 `relpath<TAB>sha256` 再 sha256；与 dsh-env 旧件文件数/字节数一致）
- **npm 发布面对账**：`@hyzyn/dsh-prompt@0.2.9` 在 registry 的 `published_at=2026-10-17T16:27:23.822Z`、`dist-tags.latest=0.2.9`；tarball 35701 B，sha1 `cc455067f820534097c508ae05e208a1c94848ab`（= dist.shasum）、sha256 `0b4f9a9bcf0157ae42aeb554c7ae3ab052153485c659338a9b4a2ef2d4e54fec`；解包 9 文件**全部与本地一致**（`package.json` 仅键序差异、语义相等；`LICENSE` 对仓根一致），见 `raw/10-npm-publish.txt`。
- **版本面注记**：npm 0.2.9 发布于 2026-10-17，而给定 commit 是 2026-10-18 的仓 HEAD（submission 是 `chore(release): loglens 首发 …`）；`packages/prompt` 在 commit 处 raw 与本地逐字节一致 ⇒ 本件的 prompt 子包结论对该 commit 与 npm 0.2.9 tarball 都成立，但不能说「该 commit 就是 0.2.9 发布提交」。

## 环境与基线

| 项 | 读数 | 证据 |
|---|---|---|
| 宿主 | DeepSeek Harness **0.2.1-rc.2**（`dsh --version`） | `raw/00b-host-version.txt` |
| 平台 | **仅 Windows** 11 10.0.26200，x64 | `raw/00-anchor.txt` |
| Node | **v24.21.0**（DSH 自带 runtime） | `raw/00-anchor.txt` |
| pnpm | **11.28.5**（DSH 自带 `pnpm.cjs`） | `raw/00-anchor.txt` |
| Python | 3.12.10（仅用于 `run_cmd.py` 取证驱动） | `raw/00-anchor.txt` |
| git / npm | **均不在 PATH**；node/pnpm 需绝对路径 | `raw/00-anchor.txt` |
| 依赖态 | **上一件 dsh-env 测评已装好 node_modules，本件未重装**：根 node_modules 12 个顶层项、`.pnpm` 204 个包、`packages/prompt/node_modules` 有 cordis/dsh/schemastery/kit/js-yaml/react/typescript；vitest 3.2.7、typescript 5.9.3 | `raw/00-anchor.txt` |
| 插件安装面 | 桌面 profile **未装** @hyzyn/dsh-prompt；`~/.dsh/prompts.yml` **不存在**；profile 三个文本文件 `mentions_dsh_prompt=false` | `raw/15-side-effects.txt` |
| 基线（无插件） | 未在真实 DSH 会话内注册该插件；本件用**最小 host 面**（fake webServer/systemPrompt）挂载插件测得行为，非真实宿主基线 | `raw/07-routes.txt` |

## 结果速览

| 面 | 结果 | 证据 |
|---|---|---|
| commit 内容锚定 | 给定 commit 的 **matched=15 / total=15 raw 文件 MATCH**；commit.patch 日期一致 | `raw/08-upstream-commit.txt` |
| npm 发布锚定 | tarball sha1/integrity 校验通过；**matched=9 / mismatched=0 文件与本地一致**（package.json 语义相等） | `raw/10-npm-publish.txt` |
| 自包子测试 | `packages/prompt` **1 文件 / 12 用例全通过**，rc=0，9.92 s | `raw/01-prompt-tests.txt` |
| 包级 typecheck | `tsc --noEmit` rc=0，1542 ms | `raw/02-prompt-typecheck.txt` |
| client 静态检查 | `scripts/client-lint.mjs` rc=0（宿主地址来源 0 处、样式变量 88 处等） | `raw/03-prompt-client-lint.txt` |
| 产物链 | src 重建 → 临时 outDir：`index.js`/`index.d.ts` 字节 EQUAL、map 语义 EQUAL，PASS | `raw/04-artifact-chain.txt` |
| 独立托管区块探针 | **pass=30 / fail=3（边界 FAIL）**（CRLF/Unicode/500KB/根 `[]` 等通过；3 个畸形文件边界见 P3-1） | `raw/06-managed-block.txt` |
| 独立路由/版本/AB/导入导出探针 | **pass=83 / fail=0**（含 loopback 围栏、校验矩阵、A/B 权重边界、导出/导入/删除） | `raw/07-routes.txt` |
| 整仓测试（仅参考） | 177 文件：168 通过 / 8 失败 / 1 跳过；3250 用例：3169 通过 / 54 失败 / 27 跳过，rc=1；`packages/prompt` 12 用例通过 | `raw/05-full-tests-reference.txt` |
| 线上站点 | `@hyzyn/dsh-prompt` 已列、清单版本 **0.2.9**、**暂无评测**、评测链接 0 | `raw/09-review-site.txt` |
| 官方安装 / 真实 DSH UI | **未验**（见诚实边界） | — |

## 逐项读数

### 1. 依赖态与执行方式（不重装）

```bash
# NODE = C:\Users\30951\AppData\Local\Programs\DeepSeek Harness\resources\runtime\primary-runtime\dependencies\node\bin\node.exe
# PNPM = ...\runtime\primary-runtime\dependencies\pnpm\bin\pnpm.cjs
cd <repo>
<NODE> node_modules\vitest\vitest.mjs run packages/prompt
```

- 依赖由上一件 `hyzyn-dsh-env` 测评安装；本件只读复用。`pnpm-lock.yaml` sha256 `d54abb9c6c43004931b537ccfeb16a4443dcc125b4d608efd95bb0838e034003`，根树 711 文件未变（`raw/00`、`raw/14`）。
- 未执行 `pnpm install`，未改 `node_modules`；`raw/15` 显示 live profile 与 `~/.dsh/prompts.yml` 均未被写。

### 2. 子包自带测试（`vitest run packages/prompt`）

```
✓ packages/prompt/test/managed-prompt.test.ts (12 tests) 117ms
Test Files  1 passed (1)
     Tests  12 passed (12)
Duration  9.92s
```

rc=0（`raw/01-prompt-tests.txt`）。**覆盖面注记**：全包只有 1 个测试文件、12 条用例，全部围绕 `prompts.yml` 托管区块（store 往返/容错/默认化）；**8 条 HTTP 路由、A/B 选择、导入/导出、`client.js` 浏览器半体没有自带用例**——本件用独立探针补位（见 P3-3）。

### 3. 包级 typecheck + client 静态检查

```
tsc --noEmit -p tsconfig.json          # rc=0，1542 ms
node ../../scripts/client-lint.mjs     # rc=0
```

client-lint 读数：`client.js 通过（宿主地址来源 0 处 · 样式变量 88 处全部存在 · 自定义属性 91 处全部有定义 · 胶囊/正圆 2 处均已配对 corner-shape · 中性边框 8 处均为 0.5px 发丝线 · 圆角 7 处均为官方尺度 token · 危险按钮 1 处均为官方 danger 配方 · 按钮族 4 个类均对齐官方 Button · 排版 21 处字号均已配对行高与官方字重 · 控件选中色 1 处均为官方 brand · 输入档 1 处均为显式高度 + token 圆角 · 颜色 87 处宿主令牌引用均无字面量兜底 …）`（`raw/03`）。**这只是静态规则，不等于浏览器行为已验证**。

### 4. 产物链（src → lib，入库产物）

```
tsc -p packages/prompt/tsconfig.json --outDir raw/artifacts/prompt-build   # rc=0
compare[index.js]=EQUAL          34483B/b22f828c…
compare[index.d.ts]=EQUAL        1519B/d6088bdc…
compare[index.js.map]=SEMANTIC_EQUAL  mappings_equal=true（仅 sources 路径随 outDir 变）
byte_diff_count=0  map_semantic_diff_count=0  verdict=PASS_artifact_chain
```

`raw/04-artifact-chain.txt`。⇒ 入库 `lib/` 与 `src/` 同步（AGENTS.md 的「build 后 git diff 干净」在 prompt 子包上成立）。

### 5. 独立托管区块探针（`probes/probe-managed-block.mjs`）

33 条检查：**pass=30 / fail=3**（`raw/06-managed-block.txt`）。已验的正常/容错面包括：

- 文件不存在 → 空 store 且读不创建文件；首次写以 `# dsh prompt manager file` 头 + 标记开始/结束、只有一份区块、目录无 tmp 残留；Windows 实测 mode `666`（0600 仅 POSIX）。
- 区块外前缀/尾注保留；重复写幂等；缺结束标记→`fileError` 含「缺少结束标记」；损坏 YAML→「解析失败」；标量→「托管区块不是 YAML 对象」；数组→空 store；空/注释区块→空 store。
- 不完整 prompt → `versions=[]`、`activeVersionId=null`、`ab={enabled:false,aVersionId:'',bVersionId:'',aWeight:50}`。
- 根 `[]` 被替换且注释保留、整文件仍是合法 YAML；Unicode/多行/`#`/`:`/`---` 内容往返深等；CRLF 文件可读、重写仍只一份区块；500,000 字符内容 helper 层可写/读等值（helper 无 500KB 校验，校验在路由层）。

3 条失败均为**用户手工制造/复制的畸形文件**（不是插件自己写出的形态），见 P3-1。

### 6. 独立路由/版本/AB/导入导出探针（`probes/probe-routes.mjs`）

用 fake `ctx.inject(['webServer'])` / `systemPrompt.section()` 真实挂载 `apply(ctx, config)`，捕获 8 条路由并直接调用 handler：**pass=83 / fail=0**（`raw/07-routes.txt`）。覆盖：

- 挂载面：8 条 exact 路径与 README 一致；默认注入公告 section（order 150），空库不注入 active section；`enabled:false` 不注册路由/不注入；`announceToAgent:false` 无公告；`applyToSystemPrompt:false` 只有公告。
- 围栏：无 Host→403；loopback Host→200；`localhost`→200；非 loopback remote→403；`sec-fetch-site:cross-site`→403；同源 Origin→200、跨源→403；围栏先于方法（GET /save→405）。
- save/list/active：空库；新建自动 `p-*` id、首个自动 active、默认 ab disabled/50；更新原 prompt；切换 activeVersionId 后 active section 文本同步；`/active` 返回 variantId/text。
- 校验矩阵（10 拒绝 + 2 接受边界）：name 空/81 字符、versions 空、重复版本 id、非法 prompt id、activeVersionId 不存在、AB 开启 A=B、aWeight 101/-1、内容 500001 字符 → 400；80 字符 name、500000 字符内容 → 200。
- activate：指定版本→改 activeVersionId+section；不存在版本/prompt→400；空 promptId→停用并释放 section。
- A/B：weight=70 时 random `0`/`0.6999`→A、`0.7`/`0.9999`→B；weight=0 恒 B、weight=100 恒 A；开启且 A=B→400（关闭且 A=B 接受）；aWeight 50.5→四舍五入 51；`activate(versionId)` 会把 `ab.enabled` 置 false（现状，见「不确定」）。
- 导出：JSON `{schema:'dsh-prompt',version:1,exportedAt,...}`；markdown `text/markdown` 且含 `# 名称`/`## 版本`/正文；不存在 promptId→空；未知 `format=xml` → 回退 JSON（见 P3-2）。
- 导入：导出 payload 导入空库→200 且 id/内容/activePromptId 恢复；单 `prompt` 形态合并；空 prompts/重复 id/无版本 prompt→400；**不校验 schema/version**（schema=other/version=99 仍接受，见 P3-2）。
- delete：删非 active 保留 active；删 active→active=null 且释放 section；不存在→400。
- 正文上限：>2MB JSON → 400 `invalid JSON body`。

### 7. 整仓测试（仅参考，不下 prompt 结论）

```
Test Files  8 failed | 168 passed | 1 skipped (177)
     Tests  54 failed | 3169 passed | 27 skipped (3250)
Duration  117.67s      exit=1
```

8 个失败文件为 `scripts/test/{live-profile,package-contents,internal-identifiers}.test.ts` 与 `packages/codegraph/test/{projects,agent-created-mode,cli-surface,auto-reindex,cli-route}.test.ts`——**均不在 `packages/prompt`**；`packages/prompt/test/managed-prompt.test.ts` 在整仓中同样 **12 passed**（`raw/05` 第 1942 行）。该整仓红与仓库已知 Windows `.cmd` spawn 问题同域（`vitest.config.ts` 也记录了 Windows 腿的负载敏感），**不归到 prompt 子包**，也不据此判发布件质量。

### 8. 发布锚定与站点查重

- npm registry（`raw/10-npm-publish.txt`）：`published_at 2026-10-17T16:27:23.822Z`、`dist-tags.latest=0.2.9`、tarball 35701 B、sha1 `cc455067f820534097c508ae05e208a1c94848ab`、sha256 `0b4f9a9bcf0157ae42aeb554c7ae3ab052153485c659338a9b4a2ef2d4e54fec`；9 文件与本地一致；`package.json` 仅键序差异（语义相等）。
- 线上站点（`raw/09-review-site.txt`，2026-10-18 23:00 抓取）：`@hyzyn/dsh-prompt` 已列，清单版本 **0.2.9**，`暂无评测`，`detail_review_links=0`，子路径 `packages/prompt`。

## 发现

> 本件**未发现 P0/P1/P2**。以下均为 P3（低风险边界/文档/测试面），每条附可复跑命令与 `raw/` 读数。全部结论限定 `packages/prompt@0.2.9` 快照 + 该 commit/npm tarball。

### P3-1 · 托管区块在 3 种「手工畸形文件」上不满足 README 的「其余内容原样保留」承诺

**读数**（`raw/06-managed-block.txt`）：

```
INFO user_text_marker_phrase: startCount=1 fileError="托管区块缺少结束标记（# --- end dsh-prompt-manager managed ---）" prompts=0
FAIL 用户文本含标记短语 → 不应把它当托管区块（期望空 store 且无 error）
INFO double_block_after_write: start_markers=2
FAIL 写回双区块文件 → 期望收敛为 1 份（现状可能保留第二份）
INFO missing_end_write: tail_preserved=false head_preserved=true
FAIL 缺结束标记时写回 → 尾部用户内容保留（期望？源码现状会丢）
```

- **a. 标记子串误判**：`readManagedStore` 用 `line.includes('dsh-prompt-manager managed')` 找块起点；用户注释里只要出现该短语（例如抄了 README 的标记说明），就会被当成托管区块起点；其后没有 end 标记 → `fileError` + 空 store。文件本身没坏，但插件 UI 会显示错误/空库。
- **b. 双区块不收敛**：文件里已有两份托管区块（用户复制粘贴）时，`writeManagedStore` 只替换第一份，写回后仍留 2 个 START 标记。
- **c. 缺结束标记时丢尾部**：块起点存在但 end 缺失时，写回从起点到文件末尾整段替换，**尾部用户内容（含其它说明）被丢弃**。

**影响**：只有手工编辑/复制/截断文件会触发；插件自身正常写出的文件不会进入这些形态。但它与 README「插件只改写该区块，其余内容原样保留」在畸形输入下不一致，且丢内容不可逆。
**建议**：起点判定改为**整行精确匹配**（`line.trim() === MARK_START`，或至少 `startsWith('# --- dsh-prompt-manager managed')`）；写入时收敛多区块（保留首块、删后续块）或拒绝并报错；缺 end 时保留 `start` 之后未被识别为块尾的内容，或直接报错不写。

### P3-2 · 导入/导出契约的版本与格式边界过宽

**读数**（`raw/07-routes.txt`）：

```
PASS import 不校验 schema/version（schema=other/version=99 仍接受，现状）
PASS export 未知 format → 回退 JSON（现状）
```

导出的 JSON 带 `schema:'dsh-prompt'`、`version:1`，但 `validateImportPayload` 完全不看这两个字段；任何 `schema`/`version` 的 payload 只要 prompts 结构合法就会被接受。`/export?format=xml` 不报 400，而是静默回退 JSON。**影响**：跨版本/跨工具导入时可能静默接受不兼容语义；API 调用方无法区分「格式不支持」与「JSON 成功」。**建议**：导入时校验 `schema==='dsh-prompt'` 且 `version` 在支持集合内（或明确文档化为宽松兼容）；未知 format 返回 400 并列出支持值。

### P3-3 · 自带测试只覆盖托管区块；8 条路由 / A/B / 导入导出 / 客户端无回归网

**读数**：`packages/prompt/test/` 只有 `managed-prompt.test.ts`（12 用例，`raw/01`）；`raw/07` 的 83 条独立检查覆盖了路由/AB/导入导出，但**这些不是仓库自带测试**。**影响**：`pnpm test` 绿不能证明 README 主打的「A/B 分流 / 导出导入 / 8 条路由 / 浏览器卡片」没回归；本件只能用独立探针补位。**建议**：把 `/save`、`/activate`、`/abtest`、`/export`、`/import`、`/delete` 的核心分支与 A/B 权重边界落成包内 vitest 用例；`client.js` 至少保留静态 lint + 一个纯函数抽离测试（当前 lint 已覆盖地址来源/样式规则）。

### P3-4 · `activate` 指定版本会静默关闭 A/B（README 未声明）

**读数**（`raw/07-routes.txt`）：`PASS activate 指定版本会关闭 A/B（现状）`；源码 `index.ts` 在 `versionId !== undefined` 分支执行 `nextPrompt.ab = { ...nextPrompt.ab, enabled: false }`。**影响**：用户为「回滚到某版本」点击激活，会顺带丢掉 A/B 开启状态，而 README 的 `/activate` 说明未提这一点。**建议**：README 写明该行为，或仅在 `versionId` 与当前 AB 版本都不匹配时才关闭，并在响应里返回 `abDisabled: true`。

## 诚实边界

- **已验**（有原始读数）：
  ① 给定 commit 的 matched=15 / total=15 raw 文件 MATCH（镜像）与 commit.patch 日期；② npm 0.2.9 tarball sha1/integrity + matched=9 / mismatched=0 文件对账；③ `packages/prompt` 自带 12/12；④ 包级 `tsc --noEmit` 与 client-lint rc=0；⑤ src→lib 产物链（JS/d.ts 字节相等、map 语义相等）；⑥ 托管区块 30/33（其中 3 条为**故意构造的畸形边界**）；⑦ 8 条路由/校验/AB 权重/导入导出/删除 83/83；⑧ 整仓测试参考读数（含 prompt 12 passed）；⑨ 线上站点「0.2.9 / 暂无评测 / 0 评测链接」；⑩ 源仓跑前跑后 711 文件一致、live profile 未被写。
- **未验（没跑，列原因）**：
  ① **真实 DSH 会话 + 浏览器 UI**：未把插件装进 live profile；`client.js` 的浏览器半体（卡片渲染、剪贴板分享、slots 服务）**没有跑**，本件只做了 `client-lint` 静态检查；② **官方安装通道**（`dsh plugin --profile web add link:...` / 插件市场）：本机 **git/npm 不在 PATH**、不写 live profile，未执行；③ **真实宿主 `webServer`/`systemPrompt` 服务注入**：本件用 fake host 面验证插件契约，未接真实 DSH 0.2.1-rc.2 的 webServer/section 生命周期；④ **整仓 `pnpm -r typecheck && pnpm build && pnpm test`**：只跑了 prompt 子包 typecheck/产物链与整仓 test 参考，不做整仓 build（会改仓内 `lib/`）；⑤ **POSIX 0600 权限**（Windows `chmod` 不生效）；⑥ **非 Windows 平台**；⑦ **真实 A/B 流量/多会话**：只用 Math.random 注入验证选择边界，未做真实会话流量统计；⑧ **并发写 prompts.yml 的竞争**：未构造多进程同时写；⑨ **安全审计/渗透**：未做。
- **不确定**：
  ① `activate(versionId)` 关闭 A/B 是「有意的人工覆盖」还是「顺带副作用」——源码无注释/README 未说明；② 导入不校验 schema/version 是有意的宽松兼容还是遗漏；③ 托管区块 3 个畸形边界在真实用户文件里出现的概率（是否值得升 P2）；④ 整仓 8 个失败文件均不在 prompt（按测试日志判定），但未逐条深挖其 Windows spawn 根因；⑤ npm 0.2.9 发布早于给定 commit（prompt 子树逐字节一致，但「commit == 发布提交」不成立）；⑥ 站点详情是登录前视图，「评测 0」是否含未公开草稿——按页面原文记录。
- **不做**：不排名、不给总分、不用星级；不做安全利用；不改被测源码、不提 PR；不装 live profile；不对非 Windows 下结论；不评价同仓其它 12 个包；不把「整仓测试 8 文件红」算到 prompt 子包。

## 查重

对照对象与读数（`raw/11-dedupe.txt` + `raw/09-review-site.txt`）：

1. **本地 dsh-bounty 快照**：`docs/bounty/ledger.json` **595** 事件，`dsh-prompt`/`dsh_prompt`/`@hyzyn/dsh-prompt` 命中 **0**；`review/data/plugins.json` 3 条记录（dsh-memory/dsh-mnemon/dsh-auto-memory），无 hyzyn/dsh-prompt；全仓文本 grep 命中 **0**（含 hyzyn 关键词 0）。
2. **同工作区「主创站筛选」快照**：33 条插件记录，目标 **1** 条——`@hyzyn/dsh-prompt`（repo `hyzyn/dsh-plugin-kit / packages/prompt`，`reviewed:false`）。
3. **线上评测子站**（review.lingshulab.com，2026-10-18 23:00 抓取，`raw/09`）：目录第 2 页列出 `@hyzyn/dsh-prompt`，详情页「本站评测（0）」「暂无评测」、`review_links=0`，清单版本 **0.2.9**、子路径 `packages/prompt`。
4. **不能查的**：本件没有 GitHub issue 搜索 API 可用（直连失败；镜像可行但未做全量 issue 检索）；站点登录后草稿不可见。

⇒ **对照 账本 595 事件 / 子站记录 3 条 / 主创站筛选 33 条 / 线上详情页，未见同件**；线上目标条目「暂无评测」，本件可作为该条目的首个独立运行快测。

## 复现步骤（第三方原样可跑）

环境：Windows x64；Node **v24.21.0**（DSH 自带）、pnpm **11.28.5**、vitest **3.2.7** 已在既有 `node_modules` 内；**不重装**。被测仓 `D:\natnat\lingshu\外部插件\hyzyn-dsh-plugin-kit\dsh-plugin-kit-main`。

```bash
# 0) 锚定（应得到 raw/00 的同一组 sha256/树指纹）
cd D:\natnat\lingshu\测试\hyzyn-dsh-prompt
<NODE> probes\probe-anchor.mjs --repo <REPO> --commit 7363332f595b8112cb4b601f8723e6453043eb62

# 1) commit 内容锚定（镜像；需网络）
<NODE> probes\probe-upstream.mjs --repo <REPO> --commit 7363332f595b8112cb4b601f8723e6453043eb62

# 2) 子包测试 / typecheck / 产物链
cd <REPO>
<NODE> node_modules\vitest\vitest.mjs run packages/prompt
cd packages\prompt
<NODE> ..\..\node_modules\typescript\bin\tsc --noEmit -p tsconfig.json
<NODE> ..\..\scripts\client-lint.mjs
cd <WORK>
<NODE> probes\probe-artifact.mjs --repo <REPO> --tsc <REPO>\node_modules\typescript\bin\tsc --out <WORK>\raw\artifacts\prompt-build

# 3) 独立探针（全部用 DSH_PROMPT_FILE 指到 raw/artifacts，不写 ~/.dsh）
<NODE> probes\probe-managed-block.mjs <REPO>
<NODE> probes\probe-routes.mjs <REPO>
<NODE> probes\probe-dedupe.mjs --bounty D:\natnat\lingshu\dsh-bounty-main --work <WORK>
<NODE> probes\probe-site.mjs --out <WORK>\raw\artifacts\site

# 4) 整仓测试（仅参考；会生成 packages/codegraph/.preview/*.html，已按 raw/13 清理）
cd <REPO>
<NODE> node_modules\vitest\vitest.mjs run

# 5) 证据整理
cd <WORK>
<NODE> ..\tools\normalize_raw.mjs raw
<NODE> ..\tools\make_manifest.mjs --raw raw --label "@hyzyn/dsh-prompt 0.2.9 (packages/prompt @ 7363332f)"
<NODE> ..\tools\make_issue.mjs --report "测评报告_hyzyn-dsh-prompt_v0.1.md"
```

> `<NODE>` = `C:\Users\30951\AppData\Local\Programs\DeepSeek Harness\resources\runtime\primary-runtime\dependencies\node\bin\node.exe`；`<PNPM>` = 同 runtime 下 `pnpm\bin\pnpm.cjs`。本机 `git`/`npm` 不在 PATH。

## 一句话总结

**@hyzyn/dsh-prompt 0.2.9 的 `packages/prompt` 子包是一份健康的小体量插件：自带 Tests 12 passed (12)、typecheck/client-lint、src→lib 产物链、commit 15/15 raw 文件与 npm 0.2.9 的 9/9 tarball 文件均对得上；独立探针验证了 8 条路由、loopback/同源围栏、A/B 权重边界、导出/导入/删除 83/83 与托管区块正常/容错面 30/33；未发现 P0/P1/P2，只有 4 条 P3（畸形 prompts.yml 的标记误判/双区块/丢尾部、导入不校验 schema/version、路由/AB/导入导出无自带测试、activate 指定版本静默关 A/B）；真实 DSH 会话/浏览器 UI/官方安装未验。**
