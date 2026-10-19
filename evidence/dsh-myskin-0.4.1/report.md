[intake 输入] 【测评报告】dsh-myskin 0.4.1 体验快测（DSH 桌面皮肤 / 主题 · 方法试验）

<!-- intake:v1 {"project":"bench","difficulty":"medium","impact":"B","target":"WTStarMark/dsh-myskin","form":"intake"} -->

<!-- 协议对齐：工程协议手册 v1.1（r2）§6 体验快测档；协议文件 sha256 8dd51cbf75b259c5dabfdb928eb112364231b5d8f9f580759534e5d78a34d849 -->
> **协议对齐（v1.1 · r2 · 体验快测档）**：本件是**体验快测**（手册 §6），只记录安装/功能点/卸载残留类检查结果；
> **不生成五种能力状态标签、不进入能力榜、不以「通过/合格」作为插件结论**；未覆盖项见「诚实边界」。
> - **协议绑定**：`工程协议手册-v1.1`（修订标识 r2），文件 sha256 `8dd51cbf75b259c5dabfdb928eb112364231b5d8f9f580759534e5d78a34d849`（快照 `测试/协议/`）。
> - **插件身份**：源码版（commit + 逐文件树指纹）或发布包版（版本 + 哈希），见「锚定提交」。
> - **环境配置 ID**：dsh 0.2.1-rc.2 / win32-x64 / Windows 10.0.26200 / node v24.21.0 / model=n/a（本快测未调用模型）/ 依赖与外部服务见「环境与基线」。
> - **安全口径（§4 三分法）**：本件**未做**六威胁安全审计 ⇒ 安全结论 = **未测**（不是「未发现问题」，也不是「已验证通过」）。
> - **时效（§13.7）**：测评完成后 90 个自然日内有效；版本/权限/数据流/依赖/宿主变化触发复核，旧报告不自动适用于新版本。


## 性质声明

本件是 **intake 输入**（外部贡献申报），不是悬赏：**不 /claim、不自行加 bounty 标签**，计分由维护者裁定。

- 本件同时是**主创测评站 review.lingshulab.com 的投稿稿**：按站点体例「结论 + 锚定与证据链 + 结果速览 +
  逐项读数 + 未验」组织，**不打总分、不用星级**。站点侧该插件目前 `reviewed=false`（`raw/50` §2），
  本件是它的首份第三方测评。
- 测评方**没有把插件安装进任何 live profile**：本机 live profile 的 dependencies 里没有 `dsh-myskin`
  （`raw/00` §3）。所有读数来自**源码快照 + 沙箱副本里的构建/安装/测试 + 宿主 asar 只读扫描**。
- 源码目录**只读**：build/install/test 全在 `sandbox/repo` 副本里跑；跑前跑后源码树指纹一致
  `cdde503ecb5021…`（`raw/10`；快照 96 文件 / 6,239,752 B）。
- **仅 Windows 单平台**：本机无 WSL / 无 macOS，非 Windows 侧一律不下结论；**真实桌面渲染未跑**（见诚实边界）。
- 站点与 bounty 两边都不存在同件：详见「查重」。

## 锚定提交

- 目标仓：`WTStarMark/dsh-myskin`；声明版本 **0.4.1**（`package.json`）。
- 上游锚定（本机网络只读核对，`raw/11`）：
  - commit **`014b1aa9054dabb413fb18283832dd83e71e5726`**
    （GitHub API：commit.date = `2026-10-06T09:37:11Z`，message 为 0.4.1 变更清单）；
  - 该 commit 的 codeload tarball：**4,794,543 B**，sha256 = `6a1e91d18d3fee40bbb6c47b887b290b13cc5309cae87e91e648c6de33fcf818`；
  - 解包后与本地快照做全树对比：**96 文件 / 6,239,752 B / 树指纹 `cdde503ecb5021914e03bc5388336b067b996b6874c25d214f809f20030d3af3`
    完全一致**（仅 upstream/本地/内容差异均为 0）；
  - GitHub release `v0.4.1`（published `2026-10-06T09:42:25Z`，target_commitish=main）存在。
  - **注记**：任务简报给的 tarball 前缀是 `2daee45c…`，与本机这次下载的完整 sha256 `6a1e91d1…` **不同**；
    但**解包内容树指纹与本地快照逐字节一致**，所以内容锚定成立。tarball 字节差异可能来自下载 URL/打包实现/时间，
    不影响「本地快照 = 该 commit 内容」这一结论（记为「不确定」，不据此判缺陷）。
- 快照锚（无 `.git`，逐字节可复算；完整清单见 `raw/10`）：
  - 全树：**96 文件 / 6,239,752 B**，指纹 `cdde503ecb5021914e03bc5388336b067b996b6874c25d214f809f20030d3af3`
  - `package.json` sha256 = `36f400c27e7d93da3d0976a6f326c5d6e3b782ef11287ae976e26d94c6a8431d`
  - `lib/client.js` = `711fb246442c0700…`（473,155 B）；`lib/index.js` = `8b142252ecafd5c7…`（41,539 B）
  - `src/` 31 文件 / 742,061 B（指纹 `302652e0…`）；`tests/` 41 文件 / 680,707 B（`fde2e52f…`）；
    `lib/` 2 文件 / 514,694 B（`5b322464…`）；`scripts/` 4 文件 / 34,895 B（`bc5c28ad…`）
- 版本面同步（`raw/12`）：`package.json`、`README.md`（首行 `# dsh-myskin (v0.4.1)`）、`CHANGELOG.md`
  （首个版本段 `[0.4.1] - 2026-10-06`）、`skills/dsh-myskin/SKILL.md`（「包版本 0.4.1」）全部一致；
  `lib/client.js` 里出现的 `0.4.0` 只是源码历史注释（`src/client/locales.ts` 的段落标题），不是版本面。

## 环境与基线

| 项 | 读数 |
|---|---|
| 宿主 | DeepSeek Harness Desktop **0.2.1-rc.2**（`@deepseek-ai/dsh-desktop-runtime`，asar 182,794,869 B；`raw/00`、`raw/22`） |
| 平台 | **仅 Windows 11**（`os.release=10.0.26200`，x64，hostname `bbs`）；WSL/Linux/macOS **未跑** |
| Node | **v24.21.0**（DSH 自带 runtime；`node` 不在 PATH，用绝对路径） |
| 包管理 / 辅助 | pnpm **11.28.5**（DSH 自带）；Python **3.12.10**；npm/git 不在 PATH |
| 网络 | 可访问 `registry.npmjs.org:443`（TCP-OK；Node fetch 需 `--use-system-ca` 才能过本机 TLS 代理）；只读访问 GitHub API/codeload |
| 源码快照 | `D:\natnat\lingshu\外部插件\dsh-myskin\dsh-myskin-main`，无 `.git`、无 `node_modules`（`raw/10`） |
| live profile | desktop：**没有** `dsh-myskin` 依赖/目录（`raw/00` §3）——本件不冒充「已安装」 |
| 沙箱 | `sandbox/repo`（源码副本，装完 10 个顶层 node_modules 条目）；`sandbox/fake-dsh-install`、`sandbox/fake-full-install`（从宿主 asar 抽的 DSH 包，用于跑 install-dependent 测试与门禁） |
| 基线（无插件 / 无 DSH dev install） | 自带测试：**245 tests / 238 pass / 0 fail / 7 skip**，exit=0（`raw/30` 形态 A）；`check:compat`/`check:types` 都打印 “skipped” 后 **PASS / exit 0**（`raw/35` 形态 1） |
| 基线（真实宿主包） | 把宿主 asar 的 306 个 `@deepseek-ai` 包铺成 install：自带测试 **245 pass / 0 fail / 0 skip**（`raw/30` 形态 B）；`check:compat` 37 ok / 4 FAIL（全为 Desktop 布局缺包）/ exit=1（`raw/35` 形态 2） |

## 结果速览

| 面 | 结果 | 证据 |
|---|---|---|
| 上游锚定 | commit/tarball/树指纹均核对；**本地快照 = commit 内容**（96 文件逐字节） | `raw/11` |
| 版本面 | package/README/CHANGELOG/SKILL 全为 0.4.1 | `raw/12` |
| 构建复现 | `lib/client.js` **逐字节相同**（473,155 B）；`lib/index.js` 仅 98 B 路径注释差异；两次构建确定 | `raw/21` |
| 沙箱安装 | `pnpm install` 完成依赖安装（esbuild 0.25.12 / jsdom 25.0.1 / react 18.3.1 / TS 5.9.3 / schemastery 3.18.5）；pnpm 11 报 `ERR_PNPM_IGNORED_BUILDS` → **exit=1** | `raw/20` |
| 自带测试（无 DSH install） | 245 tests / **238 pass / 0 fail / 7 skip**，exit=0 | `raw/30` A |
| 自带测试（真实 0.2.1-rc.2 包） | **245 pass / 0 fail / 0 skip**，exit=0 | `raw/30` B |
| 皮肤注入 + 还原（独立探针） | **46/46**：自有 style、标记、文字替换、令牌、画布；dispose 后 DOM **逐字节回基线** | `raw/31` |
| 兼容模式（独立探针） | on/off/auto 三态、背景令牌与面板底色过滤、手写规则不受影响、别人的标记不覆盖：**全部成立** | `raw/31` |
| `.dshframework` 皮肤包 | 打包/解包往返、旧 `dshskin` 兼容、assets 真字节、损坏输入抛错：**22/22** | `raw/33` |
| 皮肤文档 schema | 默认值 / 8/8 volatile / 3 类坏值拒绝 / reset 保留皮肤库：**22/22** | `raw/34` |
| 宿主兼容面 | inject 5 包、`configForms.whileServed`、`overrideTokens`、`settings.section`、DOM 标记均存在；peer 区间经宿主 `includePrerelease` 口径成立 | `raw/40` |
| 兼容性门禁 | 无 install：两门都「skipped 却 PASS」；有 install：`check:types` Windows `symlink EPERM` 崩、`check:compat` 4 项 Desktop 布局假红 | `raw/35`、`raw/36` |
| 查重 | bounty 账本 595 事件 0 命中；站点 33 条中 1 条 `reviewed=false`；上游 issues 0 | `raw/50` |
| 真实桌面渲染 / 安装 | **未验**（见诚实边界） | — |

## 逐项读数

### 1. 上游与本地快照锚定（`raw/10`、`raw/11`）

```text
commit 014b1aa9054dabb413fb18283832dd83e71e5726  date=2026-10-06T09:37:11Z
tarball bytes=4794543  sha256=6a1e91d1…fcf818
upstream tree  files=96 bytes=6239752 fingerprint=cdde503e…d3af3
local    tree  files=96 bytes=6239752 fingerprint=cdde503e…d3af3
仅 upstream 有=0  仅本地有=0  同路径不同内容=0
release v0.4.1 published=2026-10-06T09:42:25Z
```

### 2. 发布面与构建复现（`raw/12`、`raw/21`）

```text
node scripts/build.cjs（第一次）
client: lib\client.js (473155 bytes)
host:   lib\index.js  (41637 bytes)
vs 发布物：lib/client.js 473155 B 逐字节相同 = true
           lib/index.js  41637 vs 41539 B；首差 offset=16；仅 esbuild 注释里的
           node_modules/.pnpm/@deepseek-ai+… 前缀（98 B），行数 1018 = 1018
第二次构建：两份产物 sha 均与第一次相同（确定性）
构建产物面：client 以 window.__ModuleLoader__.load({ id: "dsh-myskin", factory … }) 包裹；
            client require 去重 = react / react-dom/client / react/jsx-runtime / ui-primitives；
            host bundle ESM import = []（自包含，无裸 @deepseek-ai import）；
            隔离 import 成功，exports = Config, apply, name
```

发布面（`raw/12` §4）：`lib/index.js` 41,539 B / `lib/client.js` 473,155 B / `cordis.patch.yml` 595 B /
`src/` 31 文件 742,061 B / `skills/` 1 文件 77,634 B / `docs/` 5 文件 4,092,130 B（5 张截图）/
`README.md` 38,237 B / `CHANGELOG.md` 31,599 B。

### 3. 沙箱安装（`raw/20`）

```text
pnpm 11.28.5
node_modules 顶层条目 = 10
esbuild 0.25.12 · jsdom 25.0.1 · react 18.3.1 · react-dom 18.3.1 · typescript 5.9.3 · @deepseek-ai/schemastery 3.18.5
pnpm-lock.yaml 621,353 B  sha256=e990c2ef…
install exit = 1（ERR_PNPM_IGNORED_BUILDS：@deepseek-ai/dsh-subprocess-local、@google/genai、esbuild、
               koffi、node-pty、protobufjs 的 build scripts 被 pnpm 11 默认忽略）
package.json sha 未变 = true；源码目录没有生成 node_modules
```

esbuild 本体仍可用（`transform`/`buildSync` 均成功，见 `raw/21`），所以后续构建/测试不受影响；
但「pnpm 11 下 install 退出 1」是否会被 DSH 插件管理器判成安装失败，本件**未验**（见不确定）。

### 4. 自带测试门禁（`raw/30`）

```text
形态 A：无 DSH install（DSH_INSTALL 未设置）
  node --test tests/*.test.mjs        exit=0
  # tests 245  # pass 238  # fail 0  # skipped 7  （Node 24 自行展开 glob；无 “找不到文件”）
  7 个 skip（逐条原因见 raw/30）：
    - font-roles: no local DSH web frontend to check against
    - preset 令牌 ×2: no local DSH theme package to check against
    - reset 宿主接受性 ×1: no local DSH schemastery (set DSH_INSTALL)
    - schema 默认值/volatile/真实文档 ×3: no local DSH schemastery (set DSH_INSTALL)

形态 B：DSH_INSTALL=<从宿主 asar 抽的 schemastery+cosmokit+theme+web-frontend>
  # tests 245  # pass 245  # fail 0  # skipped 0  exit=0
  （7 个 install-dependent 测试全部在真实 0.2.1-rc.2 包上跑过并全绿）
```

### 5. 皮肤注入 / 还原（独立探针，`raw/31` A 段）

```text
注入后：style#dsh-myskin-rule exists=true   html[data-dsh-skin]="dsh-myskin"
        #hero 文本 = "你好"                body 内联 --dsw-alias-bg-base = "#000000"
        theme.overrideTokens 调用一次（pluginId=dsh-myskin，3 个令牌）
        style 文本 225 B（body 背景图 `!important` + #hero color: red）
dispose 后：style 移除 · marker 摘除 · 文本还原 "Hello" · theme 令牌全撤销
            body style 逐字节回到基线 · 整棵 DOM outerHTML 与基线逐字节相同
```

### 6. 兼容模式（独立探针，`raw/31` B/C 段）

```text
readCompatChoice: on / off / auto 三态 ✓
resolveCompatMode: on→true（不论装没装）；off+installed→false（明确关闭盖过自动）；
                   auto+installed→true（装了壁纸自动让出背景）；auto+not→false
paintableTokens(compat): 背景族去掉、前景保留；isBackgroundToken 背景判定 ✓
paintableRules(compat): --dsh-myskin-panel 的区域 background-color 被摘、同规则 border-radius 保留、
                        手写 background-color 不受影响
B1 明确 on：不发布 html[data-dsh-skin] · 背景令牌不交给 theme · 前景令牌仍交 ·
            不画画布背景图 · 区域底色被摘 · 圆角保留 · 手写背景色保留
B2 明确 off + body[data-we-wallpaper]：发布标记 · 背景令牌交给 theme
B3 auto + body[data-we-glass-page]：自动兼容（不发布标记 / 不交背景令牌 / 不画画布背景）
C 另一个皮肤插件写的 data-dsh-skin="another-skin-plugin"：apply/dispose 都不覆盖不摘除
```

### 7. `.dshframework` 皮肤包（`raw/33`）

```text
packSkin → 2486 B，ZIP 魔数 [80,75,3,4]，format=dshframework，formatVersion=1
manifest.assets = [assets/image-1.gif (14B, image/gif), assets/image-2.png (70B, image/png)]
解包：背景/嵌入图数据 URL 与原值一致；text/tokens/css 往返一致
旧格式：旧 JSON 导出（format=dshskin）可导入且背景原样；旧 zip 里 dshskin: 资源引用被还原成 data URL
损坏输入：截断 zip → “zip end-of-directory not found”；随机字节/非法 JSON → JSON parse 错误（都抛错，不静默）
```

### 8. 皮肤文档 schema（`raw/34`）

```text
服务端 Config({}) 默认：enabled=false, tokens={}, css=[], text=[], layers=[], library=[],
                        content.workspaceTree=false, canvas.images=[]
volatile 访问器字段 = 8/8（enabled/tokens/css/text/canvas/layers/content/library）
坏值：tokens 传字符串 / text 传对象 / enabled 传字符串 → 全部拒绝（$.xxx expected …）
浏览器 normalizer：parseSkin(undefined) = EMPTY_SKIN 深拷贝；resetSkin 停用并清外观、保留 library、
                  不改入参；cloneSkin 深拷贝
```

### 9. 宿主兼容面（`raw/40`）

```text
dsh.client.inject 的 5 个包在宿主 asar 的出现次数：
  dsh-client-ui-settings 308 · dsh-client-ui-theme 42 · dsh-client-locale 130 ·
  dsh-client-connection 79 · dsh-api-remotes 108
客户端 require：react 8777 · react/jsx-runtime 64 · react-dom/client 2 · ui-primitives 126
API：configForms 91 · whileServed 20 · overrideTokens 9 · settings.section 37 · SettingsForms 5
DOM 契约：data-ds-dark-theme 38 · __ModuleLoader__ 99 · data-platform 61 · data-windows-titlebar 41 ·
  data-window-drag-recall 3 · composer 三标记 4/1/1 · data-slot 29 · conversation.session 62 ·
  conversation.view 20 · data-dockkit-pane 13 · data-sidebar-right-panel 7 · --dsw-font-family 146 ·
  --ds-font-family-code 69
peer：宿主 asar 内实际代码 semver.satisfies(runtimeVersion, range, { includePrerelease: true })
      ⇒ 0.2.1-rc.2 对 >=0.1.7-rc.2 <0.3.0 = true；cordis 4.0.5 对 ~4.0.4 = true
```

### 10. 兼容性门禁与类型检查（`raw/35`、`raw/36`）

```text
形态 1（无 DSH_INSTALL，默认 /opt/dsh-web 不存在）：
  check:compat → “note no pnpm store here; skipped” → PASS / exit 0
  check:types  → “note no node_modules here; skipped” → PASS / exit 0
形态 2（用宿主 asar 抽 306 包拼 fake install：6,212 文件 / 99,174,768 B / 7,156 ms）：
  check:compat → ok=37 FAIL=4 note=2 / exit 1
    4 FAIL 全是 Desktop 布局相关：
      @deepseek-ai/dsh-client-ui-primitives not installed（该包在 Desktop asar 不落目录）
      ui-slots SlotMap contract: package not installed（同上）
      settings.section slot contract missing "settings.section"（该字面量在 Desktop 拆在
        dsh-client-ui-agent-preset / settings-account / settings-general / settings-models /
        settings-plugins / dsh-cordis-client-runner，不在 core dsh-client-ui-settings）
      desktop platform marker: package not installed（primitives）
  check:types → fs.symlinkSync EPERM（Windows 无 symlink 权限）→ 未执行 tsc / exit 1
复刻（junction shim）：304 包链接；28 条 TS 诊断，全部可归因于
  “Desktop asar 的 client 包不带 .d.ts + primitives/slots 不落包目录”；没有发现可归因于签名漂移的诊断。
```

### 11. 查重（`raw/50`）

```text
bounty 账本：595 事件；dsh-myskin / myskin / WTStarMark 命中 0；review/data/plugins.json 记录 3 条，0 命中；
             全仓 373 个文本文件，命中 0
主创站筛选快照：plugins.json / details.json 各 33 条，dsh-myskin 1 条：
              id=01a14f58-89d1-7f8b-958f-135d06025aac, reviewed=false, manifestVersion=0.4.1,
              upstream=可访问, author=WTStarMark
上游 GitHub issues（含 PR）：0 条
工作区：只有本件工作目录；源码目录仅 dsh-myskin-main 快照，无第二份测评
```

## 发现

> 所有发现都附本机可复跑读数。**没有发现会直接破坏皮肤注入/还原/兼容模式/皮肤包的数据级缺陷**；
> 结构性的问题集中在「安装说明」与「作者的兼容性门禁」两处，另有 2 条文档级 P3。

### P2-1 · 安装说明宣称自动登记，但宿主 0.2.1-rc.2 的安装链路默认 `enabled:false`（存在“装完不生效且无提示”的风险）

**读数**（`raw/40` §8）：README §安装 原文：「安装完成后插件管理器会自动把 `dsh-myskin` 写入当前 profile 的
`dsh.profile.bundles`，不需要手动改配置。」

但本机宿主 asar 里这条链路的实际代码是：

```text
install 流程：if (options?.enabled !== false) await this.selectBundle(name, true);
管理器 UI 调用：installBundle(spec, { enabled: subject.selection ?? false, … })
⇒ 只有 enabled !== false 才写 bundles；UI 的 subject.selection 缺省是 false
```

也就是说：**用户在安装对话框里没有主动勾选“启用”时，bundle 不会被写进 `dsh.profile.bundles`**，
而宿主对「装了但不在 bundles 里」是**静默跳过**的（同类插件 dsh-vibe-island 的 README 把这条写成过明确的坑：
插件管理器显示“已安装”，功能毫无反应、宿主一行提示都不打）。dsh-myskin 的 README 没有让用户做任何启用/核对动作。
**影响**：照 README 安装的用户可能以为装好了，但设置页没有「皮肤管理」、皮肤不生效，且没有报错可查。
**触发条件**：DSH Desktop 0.2.1-rc.2 + 插件管理器安装；本件**未真实安装**（不写 live profile），
所以这是**代码级证据 + 同宿主同类插件已知事故**的高置信推断，不是运行时实测（见不确定）。
**建议**：README 安装节补一步「安装后到插件页确认已启用 / 若没有，点『立即启用』或手动把 `dsh-myskin` 加入
`dsh.profile.bundles`」，并给出 `--check` 式的自检命令（本插件包内没有类似脚本）。

### P2-2 · 两个兼容性门禁在本机「空转」或不可执行：`check:compat` / `check:types` 的 PASS 不代表校验过

**读数**（`raw/35`）：
- **无 DSH dev install**（本机默认，`/opt/dsh-web` 不存在）时：
  `check:compat` 打印 `note no pnpm store here; skipped` 后 **PASS: dsh-myskin matches 1 DSH install(s) / exit 0**；
  `check:types` 打印 `note no node_modules here; skipped` 后 **PASS: src/ matches every checked DSH install / exit 0**。
  即：**一个 install 都没检查，却给出 PASS**。
- **把宿主 asar 的 306 个包铺成 install 后**：
  `check:types` 在 `fs.symlinkSync` 铺 shim 时直接 **EPERM（Windows 无 symlink 权限）**，`tsc` 没跑，exit=1；
  `check:compat` 得到 37 ok / **4 FAIL**，4 条全部是 Desktop asar 布局造成的（两个客户端包不落 package 目录、
  `settings.section` 字面量不在 core settings 包），不是插件的契约缺失（`raw/36` §1 逐包定位）。
**影响**：README 宣称的「`npm run check:types` 逐字段对照本机安装的 DSH 校验」在**本机 Windows 上不成立**：
要么空转 PASS，要么因 symlink 权限崩溃。维护者若只看这两条命令的绿色，会误以为 DSH 0.2.1-rc.2 兼容性已被验证。
**建议**：无 install / 无 node_modules 时应以非零退出码或 `SKIP` 显式标出（不能 PASS）；Windows 上把 `symlinkSync`
换成 `junction`（本件 `raw/36` 已用 junction 复刻成功）；`settings.section` 检查改为在客户端包集合里找。

### P3-1 · README 安装示例的版本串仍是 0.4.0

**读数**（README L327/L329，`raw/12` §2 的版本串统计）：安装表格里写「需要固定版本时加 `#v0.4.0`」、
本地目录示例写 `~/dsh-plugins/dsh-myskin-0.4.0`；而同包 `skills/dsh-myskin/SKILL.md` 已经写成 `#v0.4.1`。
**影响**：文档级。照抄示例会装到 0.4.0 而不是当前 0.4.1。**建议**：示例统一到 0.4.1（或改为 `<version>` 占位）。

### P3-2 · 适配列表没有写当前宿主 0.2.1-rc.2（实测兼容，但文档未覆盖）

**读数**：`package.json` 的 description、README §兼容性、站点详情都说「适配 DSH 0.1.7-rc.2 / 0.2.0-rc.1 / 0.2.0-rc.2」；
本机宿主是 **0.2.1-rc.2**。实测：自带测试在真实 0.2.1-rc.2 包上 **245/245 全过**（`raw/30` 形态 B），
inject/API/DOM 契约均在（`raw/40`），peer 区间经宿主 `includePrerelease: true` 判定成立。
**影响**：文档级——用户会以为不支持当前桌面版；实际支持。**建议**：把 0.2.1-rc.2 加入声明列表（或写「0.2.x 通过 peer 区间覆盖」）。

### 已验的正面结论（同样逐项可复跑）

- **皮肤注入/还原是可逆的**：独立探针 46 项全过；`dispose()` 后 `<style>`、标记、文字、body 内联、整棵 DOM
  都与基线逐字节一致（`raw/31` A）。这是 0.4.1「还原默认真的能还原」的底层保证。
- **兼容模式语义完整**：on/off/auto、背景令牌/面板底色过滤、手写规则不受影响、不发布让路标记、
  不覆盖他人的同名标记（`raw/31` B/C）。
- **皮肤包格式自洽**：`.dshframework` 往返、旧 `dshskin` 兼容、assets 真字节、损坏输入抛错（`raw/33`）。
- **宿主 schema 契约成立**：Config 默认值、8/8 volatile、坏值拒绝、normalizer 深拷贝/reset 保留皮肤库（`raw/34`）。
- **构建可复现**：client 与发布物逐字节相同；host 仅 esbuild 路径注释 98 B 差异（`raw/21`）。
- **在真实 0.2.1-rc.2 包上自带测试 245/245**，包括此前需要 dev install 的 7 个 install-dependent 测试（`raw/30`）。

## 诚实边界

- **已验**：上游 commit/tarball/树指纹；版本面同步；构建复现（client 逐字节、host 98 B 注释差异、确定性）；
  沙箱安装依赖版本与 pnpm 行为；自带测试两形态（238+7 skip / 245 全过）；皮肤注入/还原 46 项；兼容模式三态与过滤；
  `.dshframework` 22 项；schema 22 项；宿主 asar 的 inject/API/DOM 面与 peer includePrerelease 口径；
  两个门禁的 vacuous/崩溃读数；查重（账本/站点快照/上游 issues/工作区）。
- **未验（没跑，列原因）**：
  ① **真实安装 + 桌面渲染（UI）**：不写 live profile，也没有浏览器/桌面自动化可驱动真实 DSH 渲染；
     设置页是否出现「皮肤管理」、绘制模式交互、像素级效果、真实壁纸插件联调都**未测**；
  ② **真实浏览器模块表**：客户端 bundle 的 4 个 external（react / react-dom/client / react/jsx-runtime / ui-primitives）
     在真实 renderer 中能否解析，本件只能证明「宿主 asar 里这些名字大量出现」；实际 `__ModuleLoader__` 装载未跑；
  ③ **`check:compat` / `check:types` 的有效结论**：本机没有 DSH dev install（/opt/dsh-web），Desktop asar 又不含
     `.d.ts`、且两个客户端包不落 package 目录 ⇒ 两条门禁的“PASS”不成立；类型检查**无法下结论**（`raw/36` 已说明）；
  ④ **真实安装链路**：P2-1 是宿主 asar 代码级证据 + 同类插件已知事故，未在本插件上真的点安装；
  ⑤ **pnpm 11 install exit=1 对 DSH 插件管理器的影响**：未验（本机手动安装依赖时出现，插件运行不需要 build scripts）；
  ⑥ **macOS / Linux**：单平台；Swift 端（macOS 灵动岛）不在本件范围；
  ⑦ **`pack:share` 产物**：其脚本写 `/home/share`（POSIX 路径）；本件用 `packSkin()` 直接验证了 `.dshframework` 字节，
     未跑 `npm run pack:share`；
  ⑧ **与真实 dsh-wallpaper-engine 的联调**：只用 DOM 标记模拟（`data-we-*`），没有装对方插件。
- **不确定**：
  ① 任务简报的 tarball 前缀 `2daee45c…` 与本机下载的 `6a1e91d1…` 不同（内容树指纹一致；可能 URL/打包实现不同）；
  ② P2-1 是否在本机 DSH 0.2.1-rc.2 的实际 UI 默认勾选上确实发生（没有真装）；
  ③ pnpm 11 的 `ERR_PNPM_IGNORED_BUILDS` 是否会让 DSH 插件管理器判失败（本机只用 pnpm 装依赖，未走插件管理器）；
  ④ 门禁在作者机器（带 `/opt/dsh-web` dev install、Linux/macOS symlink 可用）上是否真的全绿——本机无法复现该形态；
  ⑤ 真实浏览器里绘制模式的像素/布局（jsdom 无布局引擎，只能验证 AST 级 CSS 与 DOM 断言）。
- **不做**：不排名 / 不给总分 / 不用星级（站点体例如此）；不做安全渗透；不改被测源码、不提 PR；
  不写 live profile；不对非 Windows 平台下结论；不把这些「方法试验」读数冒充官方结论。
- **附加披露**：所有 build/install/test 都在 `sandbox/repo` 进行，源码快照 96 文件前后树指纹一致
  `cdde503e…`；live profile 的 sha256 与 dependencies 未变（`raw/00`、`raw/10`）。

## 查重

对照对象与结果（`raw/50`）：

- **bounty 本地快照**：`docs/bounty/ledger.json` **595** 个事件，关键词 `dsh-myskin`/`myskin`/`WTStarMark`
  **0 命中**；`review/data/plugins.json` 3 条记录，0 命中；全仓 373 个文本文件，0 命中。
- **主创测评站筛选快照**（`测试/主创站筛选/`，2026-10-18 抓取）：`plugins.json`/`details.json` 各 33 条，
  dsh-myskin **1 条**：`id=01a14f58-…`、`reviewed=false`、`manifestVersion=0.4.1`、`upstream=可访问`——
  即站点侧**暂无评测**，本件是首份第三方测评。
- **上游**：GitHub `WTStarMark/dsh-myskin` issues（含 PR）**0 条**；没有 test report / 同件。
- **工作区**：`测试/` 下只有本件 `dsh-myskin/`；`外部插件/dsh-myskin/` 只有源码快照，无第二份测评。

⇒ 结论：**未见同件**（站点/账本/上游/工作区四处均无）。局限：站点是外部服务，本件对“暂无评测”的核验基于
本地保存的站点快照与 Lead 提供的站点信息；**未登录站点做在线发帖前核验**，也未做 `site:github.com` 式全网搜索。

## 复现步骤（第三方原样可跑）

环境：Windows x64，Node **v24.21.0**（DSH 自带），pnpm 11.28.5（DSH 自带），Python 3.12.10；
网络只在「上游核对 / pnpm install / 查重上游 issues」三步需要。`<NODE>`、`<PNPM>` 见本目录 `README.md`。

```bash
cd D:\natnat\lingshu\测试\dsh-myskin
<NODE> probes/probe-env.mjs
<NODE> probes/probe-anchor.mjs
$env:NODE_OPTIONS='--use-system-ca'; <NODE> probes/probe-upstream.mjs
<NODE> probes/probe-version.mjs
<NODE> probes/probe-install.mjs            # 副本内 pnpm install（会写 sandbox/，不碰源码）
<NODE> probes/probe-build.mjs
<NODE> probes/probe-dsh-asar.mjs
<NODE> probes/probe-tests.mjs              # 33 个测试文件 × 两种环境（≈1~2 min）
<NODE> probes/probe-skin-engine.mjs
<NODE> probes/probe-framework.mjs
<NODE> probes/probe-schema.mjs
<NODE> probes/probe-gates.mjs
<NODE> probes/probe-typecheck.mjs
<NODE> probes/probe-host-compat.mjs
$env:NODE_OPTIONS='--use-system-ca'; <NODE> probes/probe-dedupe.mjs
# 证据整理
<NODE> ..\tools\normalize_raw.mjs raw
<NODE> ..\tools\make_manifest.mjs --raw raw --label "dsh-myskin 0.4.1 source"
<NODE> ..\tools\make_issue.mjs --report "测评报告_dsh-myskin_v0.1.md"
```

关键前置：`probe-tests` 需要 `sandbox/repo/node_modules`（由 `probe-install` 装）；`probe-typecheck` 需要
`sandbox/fake-full-install`（由 `probe-gates` 生成）。全部探针只读宿主 asar、只写 `raw/` 与 `sandbox/`。

## 一句话总结

**dsh-myskin 0.4.1 与上游 commit 014b1aa9 逐字节一致、构建可复现，自带测试在真实 DSH 0.2.1-rc.2 包上
245/245 全过，皮肤注入/还原（46 项）与兼容模式（on/off/auto）在本机独立探针下行为成立，`.dshframework`
与 schema 各 22 项也全过；主要问题在工程侧：安装说明宣称自动登记但宿主安装链路默认 `enabled:false`
（P2-1），两个兼容性门禁在本机空转 PASS / Windows symlink 崩溃 / Desktop 布局假红（P2-2），
另有 README 版本串仍写 0.4.0、适配列表未含 0.2.1-rc.2 两条 P3；真实桌面渲染未验。**
