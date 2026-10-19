[intake 输入] 【测评报告】dsh-code-security 0.5.0 体验快测（本地 SAST / 代码安全 · 方法试验）

<!-- intake:v1 {"project":"bench","difficulty":"medium","impact":"B","target":"STARDUSTLC666/dsh-code-security","form":"intake"} -->

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
本件是**对 `review.lingshulab.com` 站点上 dsh-code-security 0.5.0 的投稿测评**；该站当前该插件页为「暂无评测 / 本站评测（0）」，清单版本 **0.5.0**（`raw/15-site-review.txt`）。

测评方式：**不把被测插件装进任何正在使用的 DSH profile**，全部读数来自
① 解包源码快照的字节级锚定；② 在 `测试/dsh-code-security/.work/repo` 仓库副本内 `pnpm install` + `tsc` 构建 + 自带测试门；
③ 不经过插件自带断言的独立探针（规则层 51 例、diff 纯函数 20 例、工具层 39 例、入口注册 9 例、真实 Git 端到端 7 例）；
④ 插件的客户端资源只做静态核对（0.5.0 的变更面是设置面板引导，属 UI，**未点击验证**）。

状态口径（四态见「诚实边界」）：**仅 Windows x64**，WSL/Linux/macOS 未跑；**不排名、不给总分、不用星级、不做安全渗透/漏洞利用**；
对被测源码**只读不改**，不提交 PR、不安装到 live profile、不写 `测试/README.md` 或其他测评目录。

## 锚定提交

| 项 | 值 | 证据 |
|---|---|---|
| 被测仓 | `STARDUSTLC666/dsh-code-security`，声明版本 **0.5.0**（`package.json`） | `raw/20-declared-claims.txt` |
| 锚定 commit | **`0f2c70b14294460ad07f80ad754d0464765e4dbd`**（2026-10-17T15:15:35Z，message「feat: 设置面板新增首次使用分步引导」，tree `229dff9a…`） | GitHub API（gh-proxy.com 镜像 200）：`raw/01b-upstream-commit-api.txt`、`raw/19-upstream-anchor.txt` |
| tarball 锚定 | `refs/heads/master` tarball = **2 121 498 B，sha256 `b12aa8e548f68fda6c12bdc311f8eab27ba91403c94759dcce3ab4434d2c56f5`**，与任务给定值一致 | `raw/01d-upstream-master-tarball.txt` |
| 同 commit 直取 | `codeload …/tar.gz/0f2c70b…` = 2 121 548 B，sha256 `d9df0b4666f12bada842e24498cb20a6b11b48b2f7a7e4379c97f8dcf28120d4`；两份 tarball **96/96 成员内容逐一相同**，仅顶层目录名前缀不同（差 50 B） | `raw/01c-upstream-tarball.txt`、`raw/19-upstream-anchor.txt` |
| 本地快照 | `D:\natnat\lingshu\外部插件\dsh-code-security\dsh-code-security-master` 与 commit tarball **96/96 文件 sha256 全部相同**（仅快照有 / 仅 tarball 有 / 内容不同 均为空） | `raw/19-upstream-anchor.txt` |
| 不可变指纹 | `package.json` sha256 `84a2f7da462711f199ff94f2027c8c37f51adfa9bc68fc7803bb7bc49c5c8103`；`pnpm-lock.yaml` sha256 `8c2bfb659d294c9ca97526e3cd543508903dff255534469fdfbaff24975858c3`；`src/` 17 文件/151 765 B/`ab2809bf…`；`test/` 17/78 357 B/`95b6c6e3…`；`rules/` 3/2 736 B/`d6d590a0…`；`lib/` 35/201 346 B/`5f62ac8c…`；全仓 96 文件/2 481 660 B/`deea2205…` | `raw/02-anchor-fingerprint.txt`、`raw/19-upstream-anchor.txt` |
| 构建可复现 | 在仓库副本内 `pnpm run build` 前后 `lib/` 指纹不变（35 文件、201 346 B、`5f62ac8c…`）⇒ 仓库内 `lib/` 就是该快照 `src/` 的 tsc 输出 | `raw/06-build.txt`、`raw/07-anchor-after-build.txt` |
| npm 发布面 | registry 直连 200：`latest = 0.5.0`，发布于 2026-10-17T15:23:50Z，tgz 76 229 B，sha256 `6da03b715e7ed4b16616842c7c6b07b5bb5dedaf1c64261a53ad1c90363c22c0`（**与任务给的 tarball 哈希不是同一产物**：前者是 npm 包，后者是 GitHub codeload 源码 tarball） | `raw/17-npm-metadata.txt` |

> 注：任务描述的 tarball sha256 对应 GitHub `refs/heads/master` 源码 tarball；本提交即 master 头。本报告用「已解包快照 ≡ commit tarball ≡ 上述 sha256」三线互证，而不是只抄一个哈希。

## 环境与基线

| 项 | 读数 | 证据 |
|---|---|---|
| 宿主 | DeepSeek Harness 桌面端 **0.2.1-rc.2**（`runtime.json` desktopVersion），payloadDigest `e2cef445…` | `raw/00-env.txt` |
| 平台 | **仅 Windows**：`Microsoft Windows NT 10.0.26200.0`（`ver` 显示 10.0.26200.9711；系统 Caption 自报「Windows 11 家庭版 中文版」，与题面「Win10.0.26200」是同一 build）。WSL/Linux/macOS **未跑** | `raw/00-env.txt` |
| 运行时 | Node **v24.21.0**（DSH 自带 `…\runtime\primary-runtime\dependencies\node\bin\node.exe`）；pnpm CLI **11.28.5**（用 node 跑 `…\dependencies\pnpm\bin\pnpm.cjs`，仓库 `packageManager` 固定 11.7.0，安装时 pnpm 自报 v11.7.0）；Python(PATH) 3.12.10 | `raw/00-env.txt`、`raw/03b-pnpm-install-note.txt` |
| 缺失工具 | **npm、git 不在 PATH**；`cargo` 在 PATH。为跑真实 Git 路径，本轮额外解压了**便携 MinGit 2.56.0.windows.2**（GitHub 官方 git-for-windows 最小发行版，zip 35 287 516 B / sha256 `a8a9172a…`），只解压到 `.work/git/`，**未安装进系统** | `raw/00-env.txt`、`raw/09a-mingit-download.txt`、`raw/09b-mingit-env.txt` |
| 网络 | `registry.npmjs.org` 直连 200；GitHub 走 `gh-proxy.com → gh-proxy.org` 镜像（API/raw/tarball 均 200）；`review.lingshulab.com` 200 | `raw/00-env.txt`、`raw/01a`–`01d`、`raw/15-site-review.txt` |
| 插件安装面（基线） | desktop profile 仅 `@deepseek-ai` bundles + `@dsh-external/dsh-vibe-island`；**dsh-code-security 未安装**，本轮也不装 | `raw/00-env.txt` |
| 基线含义 | 「无插件」基线 = 上述 profile 里没有 dsh-code-security；所有功能读数来自源码副本直连（工具层经 `buildSecureTools`，入口经 `apply` 桩 ctx），不是 live 会话 | `raw/12-probe-tools.json`、`raw/13-probe-apply.json` |

## 结果速览

| 面 | 结果 | 证据 |
|---|---|---|
| `pnpm run typecheck` | **exit=0**，12.98 s | `raw/05-typecheck.txt` |
| `pnpm run build` | **exit=0**，10.3 s；`lib/` 输出指纹与仓库内已提交 `lib/` 完全一致 | `raw/06-build.txt`、`raw/07-anchor-after-build.txt` |
| 自带测试门（本机无 git） | 79 项：**65 pass / 11 fail / 3 skip**，runner exit=1，wall 23.35 s；11 个失败全部由「本机无 git」引起（10 个 `spawn git ENOENT`，1 个 engines 夹具辅助函数拿到 null 退出码） | `raw/08a-self-test-no-git.txt`、`raw/08d-self-test-summary.txt` |
| 自带测试门（便携 MinGit 在 PATH） | 79 项：**75 pass / 1 fail / 3 skip**，runner exit=1，wall 44.3 s；唯一失败是 textconv 用例的**正向对照**（MinGit busybox 无 `usr/bin/sh.exe`），该用例内被测插件断言在失败前已通过；定向复跑 `git-diff.test.mjs` 为 **8 pass / 1 fail** | `raw/08b-self-test-with-git.txt`、`raw/08c-git-diff-test-usrin.txt`、`raw/08d-self-test-summary.txt` |
| 独立探针·规则层 | 51 用例：**42 pass / 0 fail**，另观测 **5 个漏报、1 个失效豁免轴、3 类误报** | `raw/10-probe-rules.json` |
| 独立探针·diff 纯函数 | **20/20**（只报新增行、删除/上下文不报、中文八进制路径、截断/非法路径拒绝、argv 与退出码契约、策略排除/忽略、重叠脱敏） | `raw/11-probe-diff.json` |
| 独立探针·工具层 | **39/39**（扫描门禁、基线、复查、report/export、diff/暂存/未跟踪、policy、参数失败契约、脱敏、上限、health、deps） | `raw/12-probe-tools.json` |
| 独立探针·插件入口 | **9/9**（10 工具注册、schema、3 类写操作审批门、dispose、配置损坏仍可加载但检查必报错、会话工作区解析） | `raw/13-probe-apply.json` |
| 独立探针·真实 Git 端到端 | **7/7**（只报新增行、中文+空格路径、staged 读 index、未跟踪 opt-in、复查闭合、git 缺失明显失败） | `raw/18-e2e-git.json` |
| 0.5.0 变更面 | 客户端构建产物含 4 步「首次使用」引导与存储键 `dsh-first-run:dsh-code-security:v1`；**设置面板实际点击未验** | `raw/21-client-first-run.txt` |
| 官方安装通道 / live 会话 | **未验**（见诚实边界，不是跑失败） | — |

## 逐项读数

### 1. 锚定与上游校验

- GitHub API 返回值与任务给定一致：commit `0f2c70b…`、日期 `2026-10-17T15:15:35Z`、tree `229dff9a…`（`raw/01b-upstream-commit-api.txt`）。
- 给定 tarball sha256 `b12aa8e5…` = master ref tarball；同 commit 直取 tarball 只因顶层目录名为 40 位 commit 前缀而多 50 B，**成员内容 96/96 相同**（`raw/19-upstream-anchor.txt`）⇒ 后续所有结论覆盖的正是该 commit。
- 本地快照与 commit tarball **逐文件 sha256 全部相同**（96/96），因此下文「快照」与「锚定 commit」可互换表述。
- 在副本内重跑 `tsc` 得到相同 `lib/` 指纹 ⇒ 构建可复现，且可直接用构建产物做探针（避免只信作者已提交的 `lib/`）。

### 2. 依赖安装（仓库副本内）

```
node <DSH>\pnpm\bin\pnpm.cjs install --frozen-lockfile --store-dir .work\pnpm-store   # 先加 <DSH>\node\bin 到 PATH
```

- 30 个包，全部来自 `registry.npmjs.org`；pnpm 自报 **Done in 16.9 s**（wall 21.43 s，`--frozen-lockfile`），「✓ Lockfile passes supply-chain policies (30 entries in 4.1 s)」。
- 实装版本与锁文件一致：`@babel/parser 7.29.9`、`@babel/traverse 7.29.10`、`@babel/types 7.29.8`、`proper-lockfile 4.1.2`、`smol-toml 1.9.1`；dev：`typescript 5.9.3`、`@types/node 24.13.3`、`@types/babel__traverse 7.28.0`、`@types/proper-lockfile 4.1.4`、`fflate 0.8.3`（`raw/04a-deps-list.txt`、`raw/04b-pnpm-store-packages.txt`）。
- 过程注记（诚实）：首次调用因 pnpm 子进程找不到 `node` 失败（exit=1），把 DSH 自带 node 目录加入本次进程 PATH 后成功；未写系统目录、未动 live profile（`raw/03b-pnpm-install-note.txt`）。

### 3. 自带测试门（79 项，三组读数）

| 组 | 条件 | tests | pass | fail | skip | duration | runner |
|---|---|---|---|---|---|---|---|
| A | 本机 PATH 无 git | 79 | 65 | 11 | 3 | 4 988.96 ms | exit=1 |
| B | 便携 MinGit 2.56.0.windows.2 入 PATH，`pnpm test` | 79 | 75 | 1 | 3 | 34 445.96 ms | exit=1 |
| C | 仅 `git-diff.test.mjs`（MinGit cmd+usr/bin 入 PATH） | 9 | 8 | 1 | 0 | 17 792.10 ms | exit=1 |

- A 的 11 个失败均可归因于「本机无 git」：10 个直接 `spawn git ENOENT`，`engines.test.mjs:66` 的夹具辅助函数在 git 缺失时拿到 `null` 退出码（`null !== 0`）。同一批用例在 B 中通过。
- B 的唯一失败是 `secure_diff ignores configured external text converters and reviews source text` 的**正向对照**：它先验证插件路径（`--no-ext-diff/--no-textconv` 生效、converter 未运行）——这些断言已通过；随后断言普通 `git diff` 会执行 textconv，而 MinGit busybox **不含 `usr/bin/sh.exe`**，得到 `-c: applet not found / fatal: unable to read files to diff`。这是便携 MinGit 的限制，不是插件逻辑失败（若用完整 Git for Windows 预期通过；本轮未验）。
- 3 个 skip 是 Betterleaks / Semgrep CE / OSV 的原生集成测试，与 `docs/USAGE.md:95`「未指定原生程序路径时三项明确跳过」一致；skip 不计入通过。

### 4. 规则层独立探针（51 例，纯离线）

直接调用公共 API `scanText()`，自带期望值，不读插件测试断言（`probes/probe-rules.mjs`、`raw/10-probe-rules.json`）。

- **规则库存量**：`src/rules.ts` 实际 **48 条**（`SEC-001…603`），文档写「40+ 条」，声明保守、实测成立（`raw/20-declared-claims.txt`）。
- **命中面 42 例 PASS**：覆盖 JavaScript/Python/PHP/Java/Ruby/Shell/YAML/Dockerfile/.env/JSON 的命令执行、反序列化、弱哈希、JWT none、TLS 关闭、硬编码口令/私钥/.env 敏感项、chmod、Docker privileged/latest/root、浮动 Action、日志泄露、错误详情、路径穿越、SSRF、document.write、eval、tarfile.extractall 等；每条读数的 severity/confidence 与规则元数据一致。
- **脱敏 4/4**：口令、私钥、`.env`、高熵 token 的 snippet 均为 `[REDACTED]`/`[REDACTED SECRET]`；同一输入两次扫描指纹稳定（`redactionFails: []`）。
- **负例 5/5 PASS**：注释里的 `eval(` 不报、`secure-review-disable-next-line` 生效、DOMPurify.sanitize 绑定被抑制、纯数字长串不当作高熵、干净文件无误报。
- **漏报 5 例（确定性）**：
  1. `import { exec } from 'node:child_process'` 后 `exec(userInput)` → **0 命中**（SEC-002 只认 `execSync(` 或 `child_process.exec(`）；
  2. 跨行 `spawn(cmd, args, {\n shell: true })` → **0 命中**（SEC-003 只匹配同一行）；
  3. 跨行 `subprocess.run(\n cmd,\n shell=True)` → **0 命中**（SEC-004 只匹配同一行）；
  4. 跨行 `'SELECT … '` 与 `+ 'WHERE …'` → **0 命中**（SEC-007 只匹配同一行内「引号 SQL + 加号」）；
  5. `fs.chmodSync(file, 0o777)` → **0 命中**（SEC-401 的 `fs\.chmod\b` 被 `Sync` 挡住；`fs.chmod` 能命中）。
- **失效豁免轴 1 例**：`eval(staticCode) // secure-review-disable-line SEC-001` 仍按 SEC-001 报出——`DISABLE_LINE` 只在「整行注释」上求值，行尾注释永远进不了判定；`next-line` 正常。
- **误报/错标 3 类（均复现）**：
  - `git push --force` 命中 SEC-405「依赖安装使用 force / legacy-peer-deps」（标题与命中语义不符）；
  - Markdown 里的说明文字 `Use md5 hashing …` 命中 SEC-201 并按 high 报出；
  - 40 位十六进制 commit id（如 `"0123456789abcdef…"`）被当作高熵密钥（SEC-304 medium）。

### 5. Git 改动追踪

**纯函数层 20/20**（`probes/probe-diff.mjs`、`raw/11-probe-diff.json`）：只报新增行（上下文/删除行的缺陷不报）；新增行号正确；Git 八进制转义的中文路径正确解码；截断 hunk、非法路径转义、缺 `b/` 前缀均抛「git diff 不完整或格式无效」；`\ No newline` 容忍；行体以 `+++` 开头不被误当文件头；策略 `exclude`/`ignore` 生效；同一行「注入 + 高熵密钥」时注入证据也脱敏（`SEC-001` snippet = `eval("[REDACTED]")`，SEC-304 = `[REDACTED SECRET]`，与 0.4.1 变更说明一致）；`runGitDiff` 的 argv 固定带 `--no-ext-diff --no-textconv --no-color --relative …`，`staged` 加 `--cached`，退出码 2 拒绝、退出码 1 允许（无差异）、选项式 `base` 在起子进程前拒绝。

**真实 Git 端到端 7/7**（`probes/e2e-git-diff.mjs`、`raw/18-e2e-git.json`，经插件工具层 `secure_diff`/`secure_fix_verify` + 真实 `git.exe`）：
只报新增行（`src/中文 安全.js:2` SEC-001、`.env:2` SEC-305、口令 SEC-301）；`staged=true` 读 index 而非工作树；未跟踪文件默认不报、`includeUntracked:true` 才报；修回干净内容后 `secure_fix_verify` 判 `closed=1 / remaining=0 / fresh=0 / passed=true`；git 缺失时明显抛错且不写状态。

### 6. 工具层与失败契约（39/39）

`probes/probe-tools.mjs` / `raw/12-probe-tools.json`，用桩 subprocess 服务、临时工作区：

- 扫描：整仓 3 文件、单文件 target=1；门禁 `passed=false` 且 `failOn=medium`；状态写入 `.code-security/state.json`；`maxFiles` 触发时 `complete=false` + 「已达到文件数量上限」，**不完整永不判通过**。
- 参数失败契约 12/12：`paths/files` 等未知参数、空 target、非对象、非字符串 target、`base` 形如 `-pwn`、`staged` 非布尔、非法 engines、非法 audit、缺 policy、缺 reason 均**明确报错**，不静默扫描。
- 基线：接受后二次扫描 `newFindings=0 / acceptedFindings=N / passed=true`；新增问题后 `newFindings=1 / passed=false`。
- 复查：无基线 `baselineMissing=true` 且 `passed=false`；范围不同报「复查范围必须与上次扫描相同」；修好后 `closed=1 / remaining=0 / passed=true`。
- report/export：report 计数与扫描一致；SARIF 2.1.0、`driver.version=0.5.0`、results 数一致；Markdown 表行数一致；无扫描时导出报「尚无扫描结果」。
- 策略：损坏 JSON 报「安全策略无法读取或格式无效，原文件已保留」且文件原样保留；空忽略规则报「空规则不能禁用全部检查」；`exclude`/`ignore` 生效；`secure_policy_set` 非 JSON 拒绝、合法写入。
- 脱敏：返回值、`state.json`、SARIF、Markdown **均无原始口令/token**；跨次扫描指纹稳定。
- 其他：`secure_deps` 离线列出 2 个依赖（exact/range）；`secure_health` 返回 4 项配置检查 + 3 引擎状态。
- **范围观察**：`secure_scan` 的 `target: ".."` 会扫描到工作区父目录，`result.root` 与 finding 路径（`../ws/src/a.js`）都在工作区外——只读扫描无写入危害，但与「工作区扫描」及工作台「不接受任意磁盘路径」的叙事不一致（见 P3-4）。

### 7. 插件入口与审批门（9/9）

`probes/probe-apply.mjs` / `raw/13-probe-apply.json`，桩 ctx：

- `apply()` 注册 **10 个工具**（`secure_scan / secure_diff / secure_fix_verify / secure_report / secure_export / secure_baseline / secure_deps / secure_policy_show / secure_policy_set / secure_health`），`name='code-security'`、`inject=['tools','subprocess']`。
- schema：`secure_scan`/`secure_diff` 的 `additionalProperties=false`；`secure_policy_set` 必填 `policy`、`secure_baseline` 必填 `reason`。
- `tools/pre-execute`：`secure_policy_set`、`secure_baseline`、带 `path` 的 `secure_export` 返回 `{kind:'ask', reason}`；不带 path 的导出与 `secure_scan` 直接放行。
- 配置损坏（`engines: []`）：插件仍注册 10 工具不阻塞加载，但扫描工具抛「请先修复插件配置，检查未运行」，`secure_health` 返回 `ok:false + configurationError`。
- `exec.agent.session.header.cwd` 决定扫描根（测试工作区命中 SEC-001）；dispose 调用 10 个 disposer。

### 8. 0.5.0 变更面（静态）

0.5.0 的 CHANGELOG 只有一条：设置面板「首次使用」分步引导。客户端构建产物 `lib/client.js`（32 005 B）中存在存储键 `dsh-first-run:dsh-code-security:v1`、标题「代码安全 · 首次使用（4 步）」、四步文案与「上一步/下一步/跳过/开始使用」按钮（`raw/21-client-first-run.txt`）。**只做静态核对，未在真实 DSH 设置面板点击**。

## 发现

> 分级按「不做会怎样」；每条都附复现入口（探针用例 id + raw 文件）。本轮没有 P0/P1：未发现崩溃、数据损坏、凭据原文外泄或静默把不完整结果判通过。

### P2-1 · 关键注入/命令执行规则在多行写法上系统性漏报

**读数**（`raw/10-probe-rules.json` → `knownMisses`，复跑 `node probes/probe-rules.mjs`）：

| 用例 | 样本 | 期望 | 实际 |
|---|---|---|---|
| `miss-destructured-exec` | `import { exec } from 'node:child_process'` + `exec(userInput)` | SEC-002 | 0 |
| `miss-spawn-shell-multiline` | `spawn(cmd, args, {`⏎`shell: true`⏎`})` | SEC-003 | 0 |
| `miss-subprocess-shell-multiline` | `subprocess.run(`⏎`cmd,`⏎`shell=True`⏎`)` | SEC-004 | 0 |
| `miss-sql-concat-multiline` | `'SELECT … '`⏎`+ 'WHERE …'` | SEC-007 | 0 |

根因（读源码可复核）：非文件级规则在 `scanLineSet()` 里**逐行**跑 `pattern.test(entry.text)`（`src/scanner.ts:164-200`），跨行调用/拼接天然无法命中；SEC-002 的模式只写了 `execSync(` 与 `child_process.exec(`，解构导入后的 `exec(` 不在其中（`src/rules.ts:33`）。
**影响**：被漏的 4 条都是 high/critical 注入类；Python `subprocess.run(\n …, shell=True\n)`、Prettier 格式化后的 `spawn(..., {\n shell: true })` 都是常见写法，**格式化即规避**。这是静态检查核心功效问题，不是文案瑕疵。
**建议**：把命令执行类规则改为「跨行窗口 + 调用形状」匹配（或对 TS/JS 走已有的 Babel AST，Python 走 `ast` 级判定）；SEC-002 增加独立 `exec` 导入绑定识别；为这 4 类补多行回归用例。

### P3-1 · `secure-review-disable-line` 豁免轴实际不可用（行尾注释不生效）

**读数**：`eval(staticCode) // secure-review-disable-line SEC-001` → 仍报 SEC-001（`raw/10-probe-rules.json` → `gaps`）。源码里 `DISABLE_LINE` 只在 `isCommentLine===true` 时求值（`src/scanner.ts:176`），而行尾注释所在代码行不是「整行注释」，所以该轴永远不触发；同时 `secure-review-disable-next-line` 正常。
**影响**：若用户按常见 ESLint 习惯写行尾豁免，会以为已豁免、实际仍报；不是漏报（不会静默放行），但会制造「豁免不灵」的体验问题。
**建议**：把行尾 `//` 后的 disable 注释纳入解析（先剥离字符串再找注释），或删掉该未完成轴并只文档化 next-line。

### P3-2 · `chmodSync` 漏报

`fs.chmod(file, 0o777)` 命中 SEC-401，但更常见的 `fs.chmodSync(file, 0o777)` **0 命中**：模式 `fs\.chmod\b` 在 `chmodSync` 处无词边界（`raw/10-probe-rules.json` → `miss-chmodsync`）。
**建议**：改为 `fs\.chmod(?:Sync)?\b`（`os.chmod` 同理）。

### P3-3 · 三类可复现误报/错标（规则精度）

1. `git push --force origin main`（Shell）→ SEC-405「依赖安装使用 force / legacy-peer-deps」——命中语义与标题不符，建议拆分为「安装命令上下文」或改标题；
2. Markdown 说明文字 `Use md5 hashing …` → SEC-201 按 **high** 报出——文档/注释类文本被当源码扫描；
3. 40 位十六进制 commit id → SEC-304「疑似高熵密钥」（medium）——十六进制串在该规则下普遍高熵。
**影响**：前两条会让安全报告混入明显噪音，第三条在 CI/配置文件中出现频繁；都不影响「真问题仍被报出」，但降低信噪比。
**建议**：SEC-405 限定在包管理器命令上下文；对 `.md` 降低 SEC-201/304 置信度或默认跳过文档；SEC-304 排除纯十六进制且长度=40/64 的常见摘要形态（或降级为 low）。

### P3-4 · `secure_scan` 的 `target` 可越出当前工作区

**读数**（`raw/12-probe-tools.json` → `observation-target-outside-workspace`）：工作区为 `…/scope/ws`，执行 `secure_scan {target: ".."}` 成功，`root` 返回父目录 `…/scope`，finding 路径为 `../ws/src/a.js`。
**影响**：只读扫描无写入/凭据外泄（证据仍脱敏），但与「扫描工作区（或指定文件/目录）」及工作台「不接受浏览器传入任意磁盘路径」的安全叙事不一致；若宿主把该工具直接暴露给模型，等于给了一个无围栏的只读代码读取面。
**建议**：把解析后的 target 限制在工作区根内（resolve 后做前缀校验），或明确文档化「可扫描任意本地路径」并说明理由。

### P3-5 · `pnpm test` 未声明 git 前置；缺 git 时 11 项红而不是 skip

**读数**：本机 PATH 无 git 时 79 项中 11 项失败（`raw/08a-self-test-no-git.txt`、`raw/08d-self-test-summary.txt`）。`docs/USAGE.md:95` 只声明了「三项原生引擎测试会跳过」，未声明 git 是 `pnpm test` 的前置；`test/helpers/native.mjs` 有原生引擎 skip 机制，git 夹具没有等价 skip。
**影响**：新环境（含评测机）会把「没装 git」读成 11 个插件缺陷；与作者自己对「skip ≠ pass」的严格口径相比，这里是「缺前置 ≠ 跳过」的反向不一致。
**建议**：在 README/USAGE 的测试前置里写清 `git`；或在 `git-diff.test.mjs`/`engines.test.mjs` 开头探测失败即 `skip`（并打印原因）。

### P3-6 · `secure_health` 的 `ok` 不反映增强引擎状态

桩 runner 下三引擎状态均为 `failed`，`secure_health` 仍返回 `ok:true`（仅 4 项配置检查全绿），引擎状态放在另一字段（`raw/13-probe-apply.json` → `health-ok-config`；`raw/12-probe-tools.json` 同）。工具描述写「遇到问题时先运行本工具定位」，若用户配置了错误的 enginePath，`ok:true` 会给出「正常」的误导结论。
**建议**：`ok` 纳入「已配置引擎可用性」或增加明确 `enginesHealthy` 布尔并在 render 里提示。

### 已验的正面结论（同样逐项可复跑）

- 仓库构建可复现（tsc 输出与提交的 `lib/` 指纹一致）；锁文件 supply-chain 校验通过、实装依赖与锁定版本一致。
- 规则库存量与声明相符（48 ≥ 40+）；单行规则命中、内联 next-line 豁免、注释不报、DOMPurify 绑定抑制、纯数字长串不误报均成立。
- **脱敏链路完整**：返回值、`state.json`、SARIF、Markdown 四处都不含原始口令/token，且重叠规则（注入 + 高熵）的证据也脱敏、指纹跨次稳定（0.4.1 声明复现）。
- **Git 改动追踪**：纯函数 20/20 + 真实 Git 7/7，只报新增行、staged 读 index、未跟踪 opt-in、中文/空格路径、截断/非法 diff 拒绝、选项注入拒绝、git 缺失失败不写状态。
- **门禁/基线/复查契约**：不完整扫描永不判通过；基线接受后只按新增判门禁；复查不能缩小范围冒称修复；参数拼错/未知键明确报错。
- **入口契约**：10 工具注册、3 类写操作审批门、配置损坏可加载但检查必报错、dispose 完整。

## 诚实边界

- **已验**：锚定（commit/tarball/快照三线一致、构建可复现）；`--frozen-lockfile` 安装与依赖版本；typecheck/build；自带测试门三组读数（79 项，A/B/C）；规则层 51 例；diff 纯函数 20 例；工具层 39 例；入口 9 例；真实 Git 端到端 7 例；脱敏四处无原文；0.5.0 客户端字符串静态存在。
- **未验（没跑，列原因）**：
  ① **官方安装通道**（`dsh plugin --profile desktop add dsh-code-security` / 插件面板安装 / npm 全局装）：本轮约定不把被测件装进 live profile，且 npm 不在 PATH——是**未执行**，不是安装失败；
  ② **真实 DSH 会话内的工具注册与模型调用**：未启动 host，只用桩 ctx 验证 `apply()` 契约；
  ③ **设置面板/工作台 UI**（含 0.5.0 的四步引导点击、取消、390px 窄屏等）：无头浏览器未接，只做 `lib/client.js` 静态核对；
  ④ **三项原生引擎**（Betterleaks 1.9.0 / Semgrep CE 1.181.0 / OSV-Scanner 2.7.0）：未安装、其集成测试按文档跳过；`secure_deps` 只验了离线清单，OSV offline/online 未验；
  ⑤ **textconv 正向对照**：便携 MinGit busybox 无 `usr/bin/sh.exe`，普通 `git diff` 无法执行 textconv；完整 Git for Windows 下预期通过但**本轮未验**；
  ⑥ **WSL/Linux/macOS**：未跑；**真实桌面端 DSH 0.2.1-rc.2 加载**：未做 host 级加载（仅编译期/探针级兼容）。
- **不确定**：
  ① 11 项 git 相关测试「缺前置应 skip 还是 fail」是作者有意（CI 必有 git）还是遗漏；
  ② `secure_health.ok` 不纳入引擎状态是设计取舍（引擎状态另列）还是疏漏；
  ③ Markdown/十六进制等高熵误报是有意保守（宁可多报）还是精度缺陷；
  ④ MinGit 与完整 Git for Windows 在 `--no-textconv` 路径上是否存在差异（本轮只证明 MinGit 下插件路径成立）。
- **不做**：不排名/不给总分/不用星级；不做安全渗透、不构造可利用链、不评价模型自身安全能力；不改被测源码、不提 PR、不装 live profile；不对非 Windows 平台下结论；不重算其他四件的读数。

## 查重

对照四处，**未见同件**（`raw/15-site-review.txt`、`raw/16-dedupe.txt`）：

1. **review.lingshulab.com**：`/plugins/01a14f25-…` 页 HTTP 200，「本站评测（0）」「暂无评测」，清单版本 0.5.0，页内 review 文章链接 0；`/reviews` 页全文 0 次提及 `dsh-code-security`。
2. **dsh-bounty 账本**：`docs/bounty/ledger.json` 595 个事件中 `dsh-code-security` **0 次**。
3. **dsh-bounty 全仓**：md/json/html/py/yml/txt/js/ts 全量 grep，命中文件 **0**；`review/data/plugins.json` **0 次**。
4. **主创站筛选快照**：`测试/主创站筛选/details.json` 中该插件 `reviewed=false`、`manifestVersion=0.5.0`、`upstream=可访问` ⇒ 属本轮主创站待评五件之一，不是重复申报。

补充：本件与工作区既有 `dsh-files / dsh-ops / dsh-memory / dsh-vibe-island` 测评无重叠；此前工作区无 dsh-code-security 的任何测评产物。

## 复现步骤

环境：Windows x64 10.0.26200；Node **v24.21.0**（DSH 自带：`C:\Users\30951\AppData\Local\Programs\DeepSeek Harness\resources\runtime\primary-runtime\dependencies\node\bin\node.exe`）；
pnpm 用同一目录下 `…\pnpm\bin\pnpm.cjs`；测评交付目录 `D:\natnat\lingshu\测试\dsh-code-security`。

```powershell
# 0) 取件与锚定（本机已有解包快照；重取可复算 sha256）
node D:\natnat\lingshu\测试\tools\gh-fetch.mjs --url "https://codeload.github.com/STARDUSTLC666/dsh-code-security/tar.gz/refs/heads/master" --out upstream-master.tgz
#    期望 sha256 b12aa8e5…（raw/01d-upstream-master-tarball.txt）
node probes\anchor-fingerprint.mjs            # 期望 repo fingerprint deea2205…（raw/02 / raw/07）

# 1) 仓库副本 + 依赖（不改 live profile；store 也放 .work）
copy D:\natnat\lingshu\外部插件\dsh-code-security\dsh-code-security-master .work\repo
$env:PATH = "<DSH>\dependencies\node\bin;" + $env:PATH
cd .work\repo
node <DSH>\dependencies\pnpm\bin\pnpm.cjs install --frozen-lockfile --store-dir ..\pnpm-store   # 30 包，Done in 16.9s

# 2) 类型检查 / 构建 / 自带测试门（已在上一步 cd 进 .work\repo）
node <DSH>\dependencies\pnpm\bin\pnpm.cjs run typecheck    # exit=0
node <DSH>\dependencies\pnpm\bin\pnpm.cjs run build        # exit=0；lib/ 指纹 5f62ac8c…
node <DSH>\dependencies\pnpm\bin\pnpm.cjs test             # 无 git：79/65/11/3；有 git：79/75/1/3（见 08d）

# 3) 独立探针（在 测试\dsh-code-security 下；纯离线）
node probes\probe-rules.mjs      # 51 例：42 pass / 0 fail，另 5 漏报 + 1 失效豁免 + 3 误报
node probes\probe-diff.mjs       # 20/20
node probes\probe-tools.mjs      # 39/39（需 .work/repo 已装依赖）
node probes\probe-apply.mjs      # 9/9
$env:DSH_CS_GIT = ".work\git\cmd\git.exe"   # 可选：便携 MinGit（zip sha256 a8a9172a…）
node probes\e2e-git-diff.mjs     # 7/7（真实 git；无 MinGit 时该探针直接报缺件退出 2）

# 4) 证据整理（raw 已含 manifest）
node D:\natnat\lingshu\测试\tools\normalize_raw.mjs raw
node D:\natnat\lingshu\测试\tools\make_manifest.mjs --raw raw --label "dsh-code-security 0.5.0 @ 0f2c70b (snapshot + probes)"
node D:\natnat\lingshu\测试\tools\make_issue.mjs --report "测评报告_dsh-code-security_v0.1.md"
```

> 说明：`.work/`（仓库副本、pnpm store、MinGit、探针临时工作区）是**可丢弃的工作目录**，不在交付清单里；`raw/` 的证据文件与 `raw/manifest.txt` 提供逐文件 sha256。

## 一句话总结

**dsh-code-security 0.5.0@`0f2c70b` 在 Windows 上可复现构建、自带测试门在补齐便携 git 后 79 项 75 通过（3 skip、1 项 textconv 正向对照受 MinGit 限制），独立探针 126 例中规则层 51 例 42 pass / 0 fail、diff 20/20、工具 39/39、入口 9/9、真实 Git 7/7，脱敏与「只报新增行」成立；主要缺陷是 SEC-002/003/004/007 对多行/解构写法系统性漏报（P2-1），另有 6 条 P3（行尾豁免失效、chmodSync 漏报、三类误报、`target` 可越出工作区、测试门未声明 git 前置、`secure_health.ok` 不反映引擎状态）。**

## 证据链（https，站点提交用）

| # | 说明 | 链接 |
|---|---|---|
| 1 | 被测 commit（锚定） | https://github.com/STARDUSTLC666/dsh-code-security/commit/0f2c70b14294460ad07f80ad754d0464765e4dbd |
| 2 | 全部证据 | https://github.com/EQRS/dsh-eval-evidence/tree/main/evidence/dsh-code-security-0.5.0 |
| 3 | report.md | https://github.com/EQRS/dsh-eval-evidence/blob/main/evidence/dsh-code-security-0.5.0/report.md |
| 4 | raw-manifest.txt | https://github.com/EQRS/dsh-eval-evidence/blob/main/evidence/dsh-code-security-0.5.0/raw-manifest.txt |
| 5 | anchor-fingerprint.mjs | https://github.com/EQRS/dsh-eval-evidence/blob/main/evidence/dsh-code-security-0.5.0/anchor-fingerprint.mjs |
| 6 | 08a-self-test-no-git.txt | https://github.com/EQRS/dsh-eval-evidence/blob/main/evidence/dsh-code-security-0.5.0/08a-self-test-no-git.txt |
| 7 | 08b-self-test-with-git.txt | https://github.com/EQRS/dsh-eval-evidence/blob/main/evidence/dsh-code-security-0.5.0/08b-self-test-with-git.txt |

站点证据框格式：**每行一条 `URL` 或 `URL | 备注`**，最多 10 条；可直接粘贴 `证据链_提交文本.txt`。

```text
https://github.com/STARDUSTLC666/dsh-code-security/commit/0f2c70b14294460ad07f80ad754d0464765e4dbd | 被测 commit（锚定）
https://github.com/EQRS/dsh-eval-evidence/tree/main/evidence/dsh-code-security-0.5.0 | 全部证据
https://github.com/EQRS/dsh-eval-evidence/blob/main/evidence/dsh-code-security-0.5.0/report.md | report.md
https://github.com/EQRS/dsh-eval-evidence/blob/main/evidence/dsh-code-security-0.5.0/raw-manifest.txt | raw-manifest.txt
https://github.com/EQRS/dsh-eval-evidence/blob/main/evidence/dsh-code-security-0.5.0/anchor-fingerprint.mjs | anchor-fingerprint.mjs
https://github.com/EQRS/dsh-eval-evidence/blob/main/evidence/dsh-code-security-0.5.0/08a-self-test-no-git.txt | 08a-self-test-no-git.txt
https://github.com/EQRS/dsh-eval-evidence/blob/main/evidence/dsh-code-security-0.5.0/08b-self-test-with-git.txt | 08b-self-test-with-git.txt
```
