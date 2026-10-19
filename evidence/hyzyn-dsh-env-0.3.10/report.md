[intake 输入] 【测评报告】@hyzyn/dsh-env 0.3.10 体验快测（环境变量 / 密钥管理 · 方法试验）

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

- 本件是向 **review.lingshulab.com** 投稿的**外部测评**（intake 输入），不是悬赏：**不领取（claim）、不自行加 bounty 标签**；计分与归并由维护者裁定。
- **范围＝monorepo 子包**：被测对象是 `hyzyn/dsh-plugin-kit` 的 **`packages/env`（`@hyzyn/dsh-env` 0.3.10）**。**本件只对这一个子包下结论**，不评价同仓另外 12 个包（codegraph / docker / rss / tty 等）的质量、版本与测试面。
- **方法＝源码快照 + 仓库自带测试 + 独立探针**：本测评**没有**把插件装进任何正在使用的 DSH profile（live profile 未动）；全部读数来自本地源码快照、仓库自带 vitest、以及用假宿主（假 `ctx`/假 `webServer`/假凭据 seam）直连插件已发布入口 `lib/index.js` 的离线探针。
- **四态边界**：每个面向声明都给出 已验 / 未验 / 不确定 / 不做 四态之一（见「诚实边界」）；**未测的写未测，不把「未验」写成「已验」**。
- **平台**：**仅 Windows 10.0.26200 x64**；WSL / Linux / macOS **未跑**，POSIX 侧权限与路径语义不下结论。
- **不做**：不排名、不给总分、不用星级；不与被测作者沟通/提 PR；不做安全渗透或利用（`js:` 只做只读能力验证）。

## 锚定提交

- 上游仓：`hyzyn/dsh-plugin-kit`（根包 `@hyzyn/dsh-plugin-kit` **0.1.57**；pnpm monorepo）。
- **被测子包**：`packages/env` → `@hyzyn/dsh-env` **0.3.10**（`packages/env/package.json`）。
- **锚定 commit**：`7363332f595b8112cb4b601f8723e6453043eb62`
  - 日期：**2026-10-18T13:46:13Z**（`2026-10-18 21:46:13 +08:00`）
  - 主题：`chore(release): loglens 首发（dsh-all 0.1.63 / 根 0.1.57 / search 0.4.10）`
  - 该 commit 改动文件：`package.json`、`packages/all/package.json`、`packages/search/package.json`、`pnpm-lock.yaml`（**不含 packages/env**；env 的内容由更早提交引入，本件的锚定是「该 commit 的整棵树」）。
- 本地快照：`D:\natnat\lingshu\外部插件\hyzyn-dsh-plugin-kit\dsh-plugin-kit-main`（**无 `.git`**，711 个文件 / 26,783,926 B，测试与 node_modules 除外口径见下）。
- **锚定指纹（逐字节可复算，见 `raw/01-anchor.txt`）**：
  - 根 `package.json` sha256 = `283a5fc901a740d826e9d3e2003c7121ab419bb7dc296c270a0186826ccc484b`
  - `pnpm-lock.yaml` sha256 = `d54abb9c6c43004931b537ccfeb16a4443dcc125b4d608efd95bb0838e034003`
  - 根树指纹（711 文件 / 26,783,926 B，排除 `node_modules` `.git` `.codegraph`）= `0970ad60dd262cb230f211a254409e6e2fc564a6e97337ffc8398f70a323b488`
  - `packages/env` 树指纹（**13 文件 / 157,595 B**）= `973ed9e45eb3a06a24b3bb1192d74c808f55a6fa205fd7effe736c7eba622ff0`
  - `packages/env/package.json` sha256 = `ca7f8b10375e0c794e6cd4aa289d1ae8e36c72e692a727dddbef2851765ed35a`
  - `packages/env/src/index.ts` sha256 = `b12ed670e5f6f3e999612781150c5962dec895c74a459d245b005b57767eb31a`
  - `packages/env/lib/index.js` sha256 = `69f169f04753fe0bf9e78e0864c5c5b3b7661ec91c98d39edc5508da943e4370`
  - `packages/env/client.js` sha256 = `99ed04c668276783b08cfd4302b2232303e206a95c503f9c15b07807014e6745`
- **上游交叉核对（`raw/03-anchor-network.txt`）**：commit API 返回 sha 与日期均匹配；**commit 处的 raw 文件与快照逐字节一致**——
  `package.json`、`packages/env/package.json`、`packages/env/src/index.ts`、`pnpm-lock.yaml` 四项 sha256 全部命中（表中同名值）。⇒ 快照 == 该 commit 的内容。
- **npm 发布面（`raw/13`、`raw/21`）**：`@hyzyn/dsh-env@0.3.10` 发布于 **2026-10-17T16:27:59Z**；发布 tarball 35,510 B、sha256 `9a36c3f9a4aaa1e0de40a0de227159c97423b20a8251f6f4d585a7e7c7c5cb3c`；`dist.shasum`（sha1）与 `dist.integrity`（sha512）均与下载字节对账一致；tarball 内 `lib/index.js`、`lib/index.d.ts`、`lib/index.js.map`、`client.js`、`README.md`、`cordis.patch.yml` 与快照**逐字节一致**（仅 `package.json` 因 pnpm publish 重排字段顺序而字节不同，JSON 语义一致，见 `raw/17-npm-packagejson-diff.txt`）。⇒ **npm 上的 0.3.10 就是本快照的 packages/env，无「发布后有未发布改动」的落差。**
- **版本面注记**：站点清单版本、npm `latest`、快照 `package.json` 三者都是 **0.3.10**，一致。
- **不确定（tarball sha）**：约定给的整仓 tarball sha256 `83211d61a3480138c2db6dfbae4f18bd8030529a68520bcfaa07ebc67590610b` **本机无法复现**：codeload 该 commit 的 tarball（14,107,616 B）gzip sha256 = `722391aa1f208f784c6aa5cb9038b7428aa12f3fd1bbee5e61143687de12b451`，解压后 tar sha256 = `1b7ab672e993fb77862d0906f7f6598d81b48bcec5f4a2d6c2ce68e717c8fad9`，两者都不等于给定值；`gh-proxy.com` 与 `gh-proxy.org` 两个镜像下载字节**完全一致**（`raw/11c-tarball-mirror-compare.txt`），说明不是镜像重压缩。**因此本件不以该 tarball sha 作锚**，改用「commit + raw 文件 sha 对账」（上一条，强于 tarball 锚）。

## 环境与基线

| 项 | 读数 |
|---|---|
| 宿主 | DeepSeek Harness 桌面端 **0.2.1-rc.2**（`runtime/primary-runtime/runtime.json` 的 `desktopVersion`；GUI HTTP 未鉴权请求返回 401，无法从 `/api/version` 读版本） |
| 平台 | **仅 Windows** 10.0.26200（x64），机器名 `BBS`；WSL/Linux/macOS **未跑** |
| Node | **v24.21.0**（DSH 自带；不在 PATH，需显式路径调用） |
| pnpm | payload **11.28.5**（`pnpm.cjs` 调用入口）；仓库 `packageManager: pnpm@10.30.3`，安装日志自述 `using pnpm v10.30.3` |
| Python | PATH 上系统 **3.12.10**；bundled 3.12.14（本件只用 python 做账本 JSON 统计） |
| 缺失工具 | `npm`、`git` **不在 PATH**（取件走 `测试/tools/gh-fetch.mjs` 镜像；版本核对走 npm registry 直连） |
| 插件安装面 | desktop profile **只有** `@dsh-external/dsh-vibe-island` + 桌面端自带 bundles；**dsh-env 未安装，本测评也不安装** |
| 基线（无插件） | **不适用/未测**：本件不观测宿主性能或运行时行为变化，只验插件自身纯函数、HTTP 路由与 `process.env` 写入；没有可比的「无插件」读数（这是方法选择，不是遗漏） |

> 宿主与工具链原始读数：`raw/00-env-baseline.txt`、`raw/00b-host-version.txt`。

## 结果速览

| 面 | 结果 | 证据 |
|---|---|---|
| 锚定（commit → 快照逐字节） | **4/4** raw 文件 sha256 命中；commit sha/日期匹配 | `raw/01-anchor.txt`、`raw/03-anchor-network.txt` |
| 依赖安装（仓库副本内） | **exit 0**，**31.4 s**，`+202` 包；`pnpm-lock.yaml` sha256 装前装后一致 | `raw/02-pnpm-install.txt` |
| 自带测试（packages/env） | **2/2 文件、32/32 用例通过**，9.9 s 墙钟（测试时长 7.27 s），exit 0 | `raw/04-test-env-package.txt` |
| 整仓测试（**仅参考**） | 177 文件：**171 通过 / 5 失败 / 1 跳过**；3250 用例：**3219 通过 / 4 失败 / 27 跳过**；76.4 s，exit 1；env 两个文件在整仓里同样通过 | `raw/05-test-full-reference.txt` |
| typecheck（包级） | **exit 0**（`tsc --noEmit` + `client-lint` 通过），5.6 s | `raw/06-typecheck-env.txt` |
| 产物一致性 | 重建 `lib/index.js`+`index.d.ts` 与入库**逐字节一致**；npm 发布 tarball 与快照**逐文件一致**（12/12 检查通过） | `raw/21-probe-artifact.txt` |
| 独立探针：env.yml 解析/渲染/校验 | **44/44** | `raw/20-probe-env-parse.txt` |
| 独立探针：`js:` 表达式边界 | **24/24** | `raw/22-probe-js-expr.txt` |
| 独立探针：路由围栏 / 密钥 mask / 落盘 | **40/40** | `raw/23-probe-routes-mask.txt` |
| 独立探针：写入 `process.env` | **25/25** | `raw/24-probe-process-env.txt` |
| **探针断言合计** | **133/133 通过**（4 个断言探针：44+24+40+25；另加锚定/产物/查重/站点 4 个证据探针） | 上述 20–24 |
| 查重 | 账本 595 事件 **0** 命中；站点该条目「暂无评测」 | `raw/30-dedupe.txt`、`raw/32-review-site-check.json` |
| 官方安装通道 | **未验**（见诚实边界） | — |

## 逐项读数

### 1. 依赖安装（仓库副本内，先记锚定）

```text
cd <repo>; PATH 加 DSH 自带 node 目录后：
node <...>/pnpm/bin/pnpm.cjs install --reporter=append-only
Scope: all 14 workspace projects / Lockfile is up to date, resolution step is skipped
Packages: +202
Done in 28.4s using pnpm v10.30.3          （墙钟 31.4 s，exit 0）
lock_sha256_before = D54ABB9C…34003
lock_sha256_after  = D54ABB9C…34003        （未变）
installed_pkgs（.pnpm 目录数）= 203
```

- `@hyzyn/dsh-env 0.3.10 <- packages\env`（workspace 本地链接，未从 registry 拉同名包）；`@deepseek-ai/dsh 0.1.7-rc.2 <- scripts\dsh-peer-stub`（仓库 `pnpm.overrides` 生效）。
- 安装告警：`Ignored build scripts: @deepseek-ai/dsh-subprocess-local, cpu-features, esbuild, koffi, node-pty, ssh2`（pnpm 的 approve-builds 策略；env 包的测试与探针不需要这些 postinstall）。
- 安装后重跑锚定：`packages/env` 树指纹不变（`973ed9e4…`，13 文件 / 157,595 B）⇒ 装依赖**未改被测子包内容**。
- 附注：整仓 `vitest run` 会在工作树里生成 8 个 `packages/codegraph/.preview/*.html`（被 `.gitignore` 忽略的预览夹具，合计 197,053 B；`raw/01d-preview-artifacts.txt` 记录删除前的文件名/字节/时间，`raw/01b-anchor-after-install.txt` 记录根树指纹因此变为 719 文件/`8bdf4dfc…`，与 +197,053 B 精确对账）；已删除该生成目录并复核根树恢复 711 文件/`0970ad60…`（`raw/01c-anchor-restored.txt`）。**这是整仓脚本的副作用，不属 dsh-env；本件不据此下任何结论。**

### 2. 自带测试（包级，结论依据）

```text
command = node node_modules/vitest/vitest.mjs run packages/env
 ✓ packages/env/test/startup-injection.test.ts (14 tests) 112ms
 ✓ packages/env/test/managed-env.test.ts (18 tests) 111ms
 Test Files  2 passed (2)
      Tests  32 passed (32)
   Duration  7.27s        （墙钟 9.9 s，exit 0）
```

覆盖：托管区块渲染/往返/0600（POSIX 分支）/原子写无残留/缺结束标记/损坏 YAML/非数组块/`[]` 根替换、密钥空串≡缺字段、启动同步注入（含「不 await、不冲微任务」的时序守卫）、凭据文件缺失/损坏容错、secret 内联明文优先、两个配置开关、路径推导。

### 3. 整仓测试（**仅参考**，不作为本件结论）

```text
command = node node_modules/vitest/vitest.mjs run
 Test Files  5 failed | 171 passed | 1 skipped (177)
      Tests  4 failed | 3219 passed | 27 skipped (3250)
   Duration  72.80s        （墙钟 76.4 s，exit 1）
失败文件：packages/codegraph/test/agent-created-mode.test.ts、packages/tty/test/probe.test.ts、
         scripts/test/internal-identifiers.test.ts、scripts/test/live-profile.test.ts、scripts/test/package-contents.test.ts
（env 的两个文件在整仓里同样 ✓ 通过；失败均不在 packages/env）
```

> 5 个失败的具体根因**未深挖**（不在本件范围，且其中 tty 一条是仓库注释里已记录的「负载下间歇红」）；本件只声明「整仓参考读数」与「env 文件在整仓里通过」。

### 4. 类型检查（包级）

```text
node <pnpm.cjs> --filter @hyzyn/dsh-env typecheck
> tsc --noEmit && node ../../scripts/client-lint.mjs
[client-lint] client.js 通过（宿主地址来源 0 处 · 样式变量 54 处全部存在 · …）
exit 0（5.6 s）
```

### 5. 产物一致性（源码 → 入库 lib/ → npm 发布包）

```text
node probes/probe-artifact.mjs
PASS | Q1b | tsc 重建 exit=0
PASS | Q1-index.js   | committed lib/index.js == 重建产物：true (69f169f0…)
PASS | Q1-index.d.ts | committed lib/index.d.ts == 重建产物：true (de7eb92a…)
PASS | Q2-* | npm tarball 内 6 个发布文件与快照逐字节一致：true
PASS | Q2-package.json | tarball package.json 与快照 JSON 语义一致：true（字节差异来自 pnpm publish 字段重排）
PASS | Q2d | npm tarball sha512 与 registry dist.integrity 一致：true
PASS | Q3 | tarball package.json name=@hyzyn/dsh-env@0.3.10 main="lib/index.js" exports={"types":"./lib/index.d.ts","default":"./lib/index.js"}
SUMMARY pass=12 fail=0
```

⇒ 「入库的 `lib/` 是 `src/` 的真实构建产物」且「npm 上的 0.3.10 就是这个子包」两条都成立。

### 6. 独立探针：env.yml 托管区块解析 / 渲染 / 校验（44/44）

`node probes/probe-env-parse.mjs`（对 `lib/index.js`，环境变量指向临时目录）：

- 容错：文件不存在→`entries=[]` 无错；无标记→空且无错；**缺结束标记**→`fileError` 含「缺少结束标记」；损坏 YAML→含「解析失败」（带 js-yaml 行列上下文）；块非数组→`托管区块不是 YAML 数组`；仅注释块→空；**CRLF 文件**可读。
- 边界：**值内的结束标记文本不被当区块边界**（`M = "# --- end dsh-env-manager managed ---\ntail"` 完整读回）；缺 key / 非对象行跳过；`secret:true`+`value:''` → `value: undefined`（ref 语义），普通条目空串仍为空串。
- 渲染：`- key: FOO\n  value: bar\n  secret: false\n`；密钥缺值省略 `value` 字段；`!!js process.env.X`；多行走 `|-\` 缩进 block；空列表 `[]\n`。
- 写入：标记各一次；区块外用户内容保留；重复写不产生重复区块；根位置 `[]` 被替换且写出文仍是合法 YAML（用 js-yaml 复读验证）；无 `.tmp` 残留。
- 校验：合法键 `[A-Za-z_][A-Za-z0-9_]*`；非法（数字开头/连字符/点/空格/非 ASCII/换行）逐条拒绝；重复键拒绝；非数组/非对象条目拒绝；`value` 缺省＝继承已存值（返回 `inherited` 集合）；数字 `value` 转字符串。
- 落盘权限：本机 Windows `mode=666`（`writeFileSync` 的 0600 在 Win32 是 no-op；仓库测试也只在非 win32 断言 0600）。

### 7. 独立探针：`js:` 表达式边界（24/24）

`node probes/probe-js-expr.mjs`：

- 求值：`js:1+2`→`3`；`js:true`→`true`；`js:({a:1})`→`[object Object]`；`js:[1,2].join("-")`→`1-2`；`js: process.env.SRC`（`js:` 后有空格）→可用；多行表达式可用；`js:undefined` / `js:null` → **删除该变量**（`resolved===''` 语义）。
- 前缀：`JS:...`（大写）与 `' js:...'`（前导空格）**不识别**，按普通字符串写入；`js:` 空表达式渲染为 `!!js` 空串节点。
- **失败隔离（见发现 P2-1）**：同批 `[A 正常, BAD=js:(()=>{throw})() 抛错, C 正常]` → 保存路径 `A` 写入、`C` **未写入**，响应 `warnings=["已写入文件，但应用 process.env 失败: boom"]`；启动路径同样中断且**日志为空**。
- **顺序（见发现 P2-2）**：`FORWARD=js:process.env.LATER+"-x"`（定义在前）→ `undefined-x`；`C=js:process.env.A+'!'`（A 在前）→ `one!`；**引用同文件 ref 托管密钥**的 `DERIVED=js:(process.env.SECRET_KEY ?? "MISSING")+"-x"` → `MISSING-x`，而 `SECRET_KEY` 本身在 `apply()` 返回时已是 `stored-secret`。
- 安全面（README 已声明「等同本机代码执行」，本件只做只读验证）：`js:process.getBuiltinModule('node:fs').existsSync('C:\\Windows')`→`true`；`js:globalThis.process === process`→`true`；`js:(process.env.X='yes','ok')` 可对宿主 `process.env` 产生副作用；`js:import('node:fs')`（Promise）→字符串 `[object Promise]`。
- 列表路由对 `js:` 只回文本、不求值（`EXPR.value="js:process.env.SRC"`）；密钥条目 `value=null`。
- 落盘形态：`value: !!js 1+1`（YAML `!!js` 标量），不是字符串 `"js:..."`。

### 8. 独立探针：HTTP 路由围栏 / 密钥 mask / 落盘形态（40/40）

`node probes/probe-routes-mask.mjs`（假 `ctx` 捕获 `apply()` 注册的两条 exact 路由）：

- 只注册 `GET /api/dsh-env/list`、`POST /api/dsh-env/save`；`POST /list`→405、`GET /save`→405。
- 围栏（`isLoopbackRequest`）拒绝：`remoteAddress=10.1.2.3`、`host=evil.example:443`、`sec-fetch-site=cross-site`、`origin=http://evil.example`、缺 `host` → 全部 **403 `forbidden: loopback-only`**；放行：`127.0.0.1`/`localhost`/`::1`+`[::1]`/`::ffff:127.0.0.1`/同源 `origin`。
- body：非法 JSON、JSON 数组（非对象）、600 KiB（上限 512 KiB）→ 全部 **400 `invalid JSON body`**。
- mask：普通条目回明文；`storage: refs` 的密钥 `value=null`；`storage: file` 的密钥也 `value=null`（明文**不下发**）；响应头 `cache-control: no-store`、`x-content-type-options: nosniff`、`referrer-policy: no-referrer`。
- 落盘两条路径：**无凭据 seam（单存储降级）时密钥明文留在 env.yml**（文档「全有全无降级」的已声明行为）；**seam 在场时**经 `seam.set` 进 refs、env.yml 只留 `- key: X\n  secret: true`、响应 `storage: refs`。
- 保存语义：留空（`value:null`）＝保持原值、不重写 refs；删条目→`seam.unset`；`secret→plain`→值从 refs **物化回 env.yml** 并 unset；`seam.set` 抛错→`warnings` + 明文留文件（可重试）；`secret + js:`→表达式留文件、不进 refs、响应仍 mask。
- 校验：非法键名/重复键/非数组 → 400 并回具体错误；文件损坏时 `list` 返回 `fileError`；保存后无 `.tmp` 残留。

### 9. 独立探针：写入 `process.env` 的行为（25/25）

`node probes/probe-process-env.mjs`：

- **启动同步注入成立**：`apply()` 返回后立刻读到 `P_PLAIN=plain-value`（覆盖启动环境旧值）、`P_DEL` 被空串语义删除、`P_JS=42`（启动即求值 `js:40+2`）、**`P_REF=ref-secret`（ref 托管值已同步就位）**；ctx 无 credentials seam 时异步路径一步不跑，值只可能来自同步预注入。
- 优先权：同名键 `P_INHERIT` 启动环境 `from-launch-env`、存储 `from-store` → `apply()` 后为 **`from-store`**；旧 seam（继承值优先）在场时，同步先写 `from-store`，异步对账在 20 ms 内收敛回 `from-launch-env`。
- 容错：凭据文件缺失 / 损坏 → 不抛，普通条目照常生效。
- **启动迁移**：env.yml 里 `secret:true` 内联明文 → 经 `seam.set` 进 refs、文件移除明文只留清单、日志 `migrated 1 secret(s) into the credentials store`；普通条目不受影响。
- **迁移冲突**：refs 已有同名键 → 不覆盖（无 `set`）、明文留文件、`warn: credentials store already configured for: …`。
- 配置开关：`applyToProcessEnv:false`→完全不碰 `process.env`；`secretsInCredentials:false`→普通条目照常、存储不预注入；`enabled:false`→不注册路由/不注入/无挂载日志。
- 公告：默认注册 `systemPrompt` section `{name:'plugin:dsh-env-manager', order:150}`，文本 421 字，含 `env.yml` 与凭据存储说明；`announceToAgent:false`→无 section。
- 保存路径即时写进程环境（含空串删除与 `js:6*7`→`42`）；`applyToProcessEnv:false` 时 `applied:false` 且不写进程。
- 路径推导：未设 `DSH_ENV_CREDENTIALS_FILE` 时取 `$DSH_HOME/.credentials.yaml`。

## 发现

> 分级按「不做会怎样」；全部附本机可复跑命令（探针离线、不碰 live profile）。
> 本件**没有**发现 P0/P1（没有可复现的数据泄露、越权读写或凭据明文外泄路径；`js:` 的代码执行能力是 README 已声明的信任模型，不按缺陷计）。

### P2-1 · 一条 `js:` 表达式求值失败会让**同批后续所有条目**不写入进程环境；启动期完全静默

**读数**（`raw/22-probe-js-expr.txt`，C1–C4）：

```
保存路径：entries = [A(plain-a), BAD(js:(()=>{throw new Error('boom')})()), C(plain-c)]
  → A 写入；C 未写入（process.env.C=undefined）；响应 200 + warnings=["已写入文件，但应用 process.env 失败: boom"]
启动路径：同一份 env.yml
  → A="plain-a"、C=undefined；logs 里除 mounted 外**没有任何告警**（try/catch 整体吞掉）
```

**影响**：`applyToProcessEnv()` 逐条 `evalValue`，任一条抛错就退出整个循环——写错的 `js:` 表达式（或依赖不存在导致 throw，如 `js:process.env.X.trim()`）会**静默**让它后面所有条目在冷启动时不生效。这恰好是插件自己文档里那类「MCP 认证头取不到值 → 卡片正常但工具 0 个」故障的另一种来源。保存路径至少回一条 `warnings`，启动路径连日志都没有。
**触发**：env.yml 里任意一条 `js:` 表达式抛错，且其后面还有别的条目。
**建议**：`applyToProcessEnv()` 每条独立 try/catch（与 `applyStoreEntriesToProcessEnv()` 已有的逐条 try/catch 口径一致），失败键名 `console.warn`；保存响应 `warnings` 里逐条列出，而不是整批一句话。
**复跑**：`node probes/probe-js-expr.mjs`（C 段）。

### P2-2 · 同文件里 `js:` 条目在 ref 托管密钥同步预注入**之前**求值 → 引用存储密钥得到 `undefined`

**读数**（`raw/22-probe-js-expr.txt`，F1/F2）：

```
env.yml: SECRET_KEY (secret:true, 值在 .credentials.yaml 的 refs)
         DERIVED    value: !!js (process.env.SECRET_KEY ?? "MISSING") + "-x"
apply() 之后：SECRET_KEY="stored-secret"（已注入 ✓）；DERIVED="MISSING-x"（✗）
```

`apply()` 里的顺序是 `applyToProcessEnv(entries)` → `applyStoreRefsToProcessEnv(entries)`，所以本文件自己的 `js:` 条目先求值、看不到同文件的 ref 密钥；而文档承诺的「`apply()` 返回时 ref 密钥已在 `process.env`」只对**之后**求值的其它插件条目成立。
**影响**：想在 env.yml 里从存储密钥派生值（如 `js:'Basic ' + Buffer.from(process.env.U+':'+process.env.TOKEN)...`）会静默拿到错误字符串（`"undefined"`），症状仍是服务端 401。这是一个合理的用法，且没有任何提示。
**建议**：把「ref 同步预注入」提到「条目应用」之前（`applyStoreRefsToProcessEnv(entries)` → `applyToProcessEnv(entries)`），或在 README/表单里明确写「`js:` 不能引用同文件的 ref 托管密钥」。
**复跑**：`node probes/probe-js-expr.mjs`（F 段）。

### P3-1 · 键名首尾空白被静默 trim，校验比 README 的 `[A-Za-z_][A-Za-z0-9_]*` 宽

`validateEntries` 先 `key.trim()` 再 `KEY_RE.test`：`" lower "` 被接受并写成 `lower`，而不是按「非法键名」拒绝。**影响**：输入 `"FOO "` 会静默变成 `FOO`（保存后回显才可能被发现）；只影响可用性，不涉及安全。**复跑**：`node probes/probe-env-parse.mjs`（D1/D2b）。

### P3-2 · 同源围栏只比 `host[:port]`，**忽略 scheme**

`isLoopbackRequest` 用 `new URL(origin).host === new URL('http://' + host).host`；因此 `Host: 127.0.0.1:52034` + `Origin: https://127.0.0.1:52034` 被放行（`raw/23-probe-routes-mask.txt` A5b）。**影响有限**：同一端口不可能同时是 HTTP 服务与 HTTPS 页面，实际可利用性很低；但它不是「完整同源」，记录以免被当成已验证 scheme。**复跑**：`node probes/probe-routes-mask.mjs`（A5b）。

### P3-3 · README「env 文件落盘固定 0600」在 Windows 上不成立

本机实测落盘 `mode=0666`（`raw/20-probe-env-parse.txt` C5、`raw/23-probe-routes-mask.txt` B6）；`writeFileSync({mode:0o600})` 在 Win32 是 no-op，仓库自带测试也把权限断言放进 `process.platform !== 'win32'` 分支。**影响**：Windows 上 env.yml（无凭据 seam 时可能含明文）的文件权限不受插件控制。**不确定**：这是已知平台限制还是文档漏写（README 未限定平台）。**复跑**：`node probes/probe-env-parse.mjs`（C5）。

### P3-4 · `js:` 的结果类型与空值语义未文档化（强制 `String()`；`undefined/null` = 删除变量）

实测：`js:({a:1})`→`[object Object]`；`js:import('node:fs')`（Promise）→`[object Promise]`；`js:undefined`、`js:null`→**删除**该变量（走「空串＝删除」分支）。这些行为可预测但 README/表单未写，用户容易写出「看起来成功、实际是 [object Object]」的条目。**复跑**：`node probes/probe-js-expr.mjs`（A/B/D 段）。

### 已验的正面结论（同样逐项可复跑）

- **锚定可交叉验证**：commit API/`commit.patch`/raw 文件 sha256 三路一致，快照与 commit 逐字节对应。
- **产物链一致**：`src/index.ts` → 重建 → 入库 `lib/`（逐字节）→ npm 0.3.10 tarball（逐文件），无过期产物、无「发布后未发布改动」。
- **自带测试 32/32 通过**，且包含两条「时序不变式」守卫（不 await、不冲微任务）；整仓参考里 env 两文件同样通过；typecheck 全绿。
- **env.yml 解析健壮**：标记精确匹配（值内标记不误判）、CRLF、损坏/缺标记/非数组容错、根 `[]` 替换、区块外内容保留、原子写无残留。
- **密钥不下发明文**：refs/file 两种 `storage` 均 `value:null`；响应带 no-store/nosniff/no-referrer。
- **落盘策略与文档一致**：有 seam → 只留清单；无 seam → 单存储降级（明文留文件）；写失败/迁移冲突 → 明文留文件 + warnings/warn；`secret→plain` 会物化回文件。
- **路由围栏**：loopback/同源/跨站头/方法/body 上限/错误 body 共 15 类判定符合声明。
- **启动同步注入与对账**：ref 密钥在 `apply()` 返回时就位；同名键跟随宿主 seam 优先权；旧档落差在同一启动周期内自愈；凭据文件缺失/损坏不抛。
- **配置开关**（enabled / applyToProcessEnv / secretsInCredentials / announceToAgent）行为与文档一致。

## 诚实边界

- **已验（有原始读数，可复跑）**：锚定（commit + 4 个 raw 文件 sha + npm tarball 指纹）；依赖安装（31.4 s / +202 包 / lock 不变）；`packages/env` 自带测试 32/32；整仓测试参考读数；包级 typecheck+client-lint；产物一致性 12 项；4 个离线断言探针共 **133 条断言**（env.yml 44、js: 24、路由/mask 40、process.env 25），另有锚定/产物/查重/站点 4 个证据探针；查重（账本 595 事件 / 站点 32 条 / legacy 3 条）。
- **未验（没跑，列原因）**：
  1. **真实 DSH 会话内的插件行为**：没把插件装进 live profile（本件纪律），所以「卡片表单渲染、`client.js` 浏览器半体、插件详情页内联位置、真实 `webServer` 注册与鉴权链路」都没验——只用假宿主直连宿主半体。
  2. **真实 `ctx.credentials` seam**：用假 seam，未验 `@deepseek-ai/dsh-credentials-local` 的 `describe/resolve/set/unset` 真实语义、`alpha.2/alpha.3` 两档差异与迁移边界（作者注释里有逐版结论，本件未在真宿主上复现）。
  3. **真实启动竞态**：MCP 条目 `!!js` 与 `env()` 的先后由 `apply()` 返回时点保证；本件验「返回时值已就位」，未在真实 desktop profile 组合树里跑 MCP 401 现场。
  4. **Linux / macOS**：未跑，POSIX 的 0600、`/` 路径与 CRLF 之外的行尾语义都不下结论。
  5. **官方安装通道**（`dsh plugin add` / 插件市场 / `npm i`）：未执行（不写 live profile；且 npm 不在 PATH）。
  6. **真实 loader 的 `!!js` 方言求值**：探针走本包 `evalValue`；宿主 loader 端未验「同一表达式在补丁文件里也等价」。
  7. **整仓 5 个失败 suite 的根因**：只记录参考读数，未深挖（不在本件范围）。
- **不确定**：
  1. **约定 tarball sha256 `83211d61…` 不可复现**（两次 codeload 下载均为 `722391aa…`，两镜像字节一致；未压缩 tar 为 `1b7ab672…`）；不知道该值来自哪种打包工具/URL 形态。本件改用 commit+raw 文件 sha 锚定。
  2. **P3-2（scheme 忽略）的实际可利用性**：理论低，未做攻击性验证。
  3. **P2-1/P2-2 是否被作者视为可接受**：仓库没有对应守卫测试，无法从代码意图判断。
  4. **npm tarball 的 `package.json` 字节序差异**：判断为 pnpm publish 的字段重排（JSON 语义一致），未从 pnpm 源码层面核实。
- **不做（主动排除，列理由）**：不排名 / 不给总分 / 不用星级（测评子站口径）；不评价同仓其他 12 个包；不做安全渗透或利用（`js:` 只做只读 `existsSync`/身份断言）；不改被测源码、不提 PR；不碰 live profile、不改 `测试/README.md` 与其他目录；不重算历史 issue 的既有读数。

## 查重

对照四类来源（原始读数：`raw/30-dedupe.txt`、`raw/30b-ledger-keywords.txt`、`raw/30c-ledger-hit-detail.txt`、`raw/32-review-site-check.json`）：

| 来源 | 读数 | 同件？ |
|---|---|---|
| **主创测评子站** `https://review.lingshulab.com/plugins` | 4 页共解析 **32** 条；`@hyzyn/dsh-env` 条目 `01a14edf-9b8a-7440-b644-818f324184df`（repo `hyzyn/dsh-plugin-kit / packages/env`，资料更新 2026/10/18 19:57）；详情页 200、含 **0.3.10**、页面文字含「暂无评测」、无「评测报告」 | **否**（未评测） |
| **悬赏站账本** `dsh-bounty/docs/bounty/ledger.json`（746,055 B，mtime 2026-10-17；**595** 事件） | `dsh-env` 命中 **0**、`hyzyn` 命中 **0**、`env-manager` 命中 **0**；「环境变量」命中 1 次 = 无关事件 `evt_d58d95946ca1`（#36/37–41，`project=memory`，lingshu 内存缺陷批次） | **否** |
| **子站数据** `review/data/plugins.json`（records **0** 条）与 `review/legacy/dsh-platform-v1/plugins.json`（3 条） | 均无目标命中 | **否** |
| **工作区** | 此前无本件（`外部插件\hyzyn-dsh-plugin-kit\dsh-plugin-kit-main` 是本件的**源码输入**，`测试\hyzyn-dsh-env\` 是本件**产物**） | **否** |

**结论：对照 主创测评子站 / 悬赏站账本 / 子站 legacy 数据 / 本机工作区，未见同件。**

## 复现步骤（第三方原样可跑）

环境：Windows x64；Node **v24.21.0**（不在 PATH，需要用绝对路径或先把 `…\dependencies\node\bin` 加进 PATH）；仓库 `packageManager` 固定 pnpm 10.30.3（以 DSH 自带 `pnpm.cjs` 启动即可）；本机 `npm`/`git` 不在 PATH。

```bash
# 0) 路径
#   REPO = D:\natnat\lingshu\外部插件\hyzyn-dsh-plugin-kit\dsh-plugin-kit-main
#   WORK = D:\natnat\lingshu\测试\hyzyn-dsh-env
#   NODE = C:\Users\30951\AppData\Local\Programs\DeepSeek Harness\resources\runtime\primary-runtime\dependencies\node\bin\node.exe
#   PNPM = C:\Users\30951\AppData\Local\Programs\DeepSeek Harness\resources\runtime\primary-runtime\dependencies\pnpm\bin\pnpm.cjs

# 1) 锚定（装依赖之前；期望 root_tree_sha256=0970ad60…、pkg_tree_sha256=973ed9e4…、13 文件）
cd WORK && NODE probes/probe-anchor.mjs REPO

# 2) 依赖（只在仓库副本内；期望 exit 0、约 30 s、lock sha256 不变）
cd REPO && PATH="$(dirname NODE):$PATH" NODE PNPM install --reporter=append-only

# 3) 包级测试（结论依据；期望 2 files / 32 tests passed）
cd REPO && NODE node_modules/vitest/vitest.mjs run packages/env

# 4) 整仓测试（仅参考；期望 171 passed / 5 failed / 1 skipped，失败不在 env）
cd REPO && NODE node_modules/vitest/vitest.mjs run

# 5) 包级类型检查（期望 exit 0）
cd REPO && NODE PNPM --filter @hyzyn/dsh-env typecheck

# 6) 独立探针（离线；每个都自带 PASS/FAIL 汇总，末尾打印 pass/fail）
cd WORK && NODE probes/probe-env-parse.mjs      # 期望 44/44
cd WORK && NODE probes/probe-js-expr.mjs        # 期望 24/24
cd WORK && NODE probes/probe-routes-mask.mjs    # 期望 40/40
cd WORK && NODE probes/probe-process-env.mjs    # 期望 25/25

# 7) 产物链 / 查重（artifact 需要 raw/16 的 npm tarball；network 探针会重新下载）
cd WORK && NODE probes/probe-artifact.mjs                         # 期望 12/12
cd WORK && NODE probes/probe-dedupe.mjs                           # 账本 595 事件 / 0 命中
cd WORK && NODE probes/probe-review-site.mjs --out raw            # 站点 32 条 / 目标「暂无评测」

# 8) 网络锚定（可选；需要 npm registry 与 gh-proxy 镜像）
cd WORK && NODE probes/probe-anchor-network.mjs --out raw \
  --expect-tarball-sha 83211d61a3480138c2db6dfbae4f18bd8030529a68520bcfaa07ebc67590610b

# 9) 证据整理（本件最后一步）
cd WORK && NODE ../tools/normalize_raw.mjs raw
cd WORK && NODE ../tools/make_manifest.mjs --raw raw --label "@hyzyn/dsh-env 0.3.10 (packages/env @ 7363332f)"
```

> 探针的仓库根可用 `--repo <path>` 或环境变量 `DSH_ENV_REPO` 覆盖；所有探针把 `DSH_ENV_FILE` / `DSH_ENV_CREDENTIALS_FILE` / `DSH_HOME` 指向临时目录并在退出时清理，**不读写真实 `~/.dsh/env.yml` / `.credentials.yaml`**（可自行用文件 mtime 复核）。

## 一句话总结

**@hyzyn/dsh-env 0.3.10 在本机 Windows 上自带测试 32/32、typecheck 与 4 个独立断言探针 133/133 全绿，锚定链（commit → 快照 → 入库 lib → npm tarball）逐字节闭合；声明的密钥 mask、loopback 围栏、启动同步注入、迁移与降级语义均成立，但 `js:` 表达式有一条求值错误就会静默跳过同批后续条目（P2-1），且本文件内 `js:` 引用 ref 托管密钥会先于注入求值而拿到 undefined（P2-2）；另有键名静默 trim、同源忽略 scheme、Windows 0600 不生效与 `js:` 结果类型未文档化四条 P3。**
