[intake 输入] 【测评报告】dsh-locale-es-419 1.0.0 体验快测（i18n / 西语 locale · 方法试验）

<!-- intake:v1 {"project":"bench","difficulty":"medium","impact":"B","target":"Dreftian/dsh-locale-es-419","form":"intake"} -->

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
  逐项读数 + 未验」组织，**不打总分、不用星级**。站点侧该插件 `reviewed=false`（`raw/50` §2），本件是首份第三方测评。
- 测评方**没有把插件安装进任何 live profile**（`raw/00` §4：dependencies/bundles/node_modules 三处都没有它）；
  所有读数来自**源码快照 + sandbox 副本里的构建 + 宿主 asar 只读扫描 + Node 里模拟宿主 locale 服务的运行时探针**。
- 源码目录**只读**：build 只在 `sandbox/repo` 副本里跑，副本前后树指纹与源码相同（`raw/00` §5、`raw/30` §0）。
- **仅 Windows 单平台**：本机无 WSL / 无 macOS，非 Windows 侧一律不下结论；**真实浏览器语言切换、真实安装后的 UI 未跑**。
- **插件没有自带测试**：仓库无 `tests/`、`package.json` 无 `test` script（`raw/31` §9）。
  因此「自带测试」一栏如实记为 **0/0（无）**，方法试验全部用独立探针（`raw/24`、`raw/30`、`raw/32`、`raw/34`）。
- 本件的「英文基准」取自**本机 DSH 0.2.1-rc.2 app.asar 里各 client bundle 编译后的 en 字典**（不是从 README 抄的；
  宿主 `locale/en.json` 只是包元数据 stub，见 `raw/20`、`raw/21`）。

## 锚定提交

- 目标仓：`Dreftian/dsh-locale-es-419`；声明版本 **1.0.0**（`package.json`）。
- 上游锚定（`raw/11`，gh-fetch 经 gh-proxy 镜像现取）：
  - commit **`f099d3725a07725ae6182a76b5000af22ba10309`**，`commit.date = 2026-10-18T02:13:29Z`，
    tree sha `e0d379d212282f0ab3bff43c58fed71d7eab373e`；
    message = `fix(i18n): complete translations for font settings, work details, automation tasks, plugin manager, and dynamic package metadata`；
  - 该 commit 的 codeload tarball：**1,757,434 B**，sha256 `33b9c5bdc2ec39c0f25e5cb9719f085b15ba512d33a39a721c74e644876c2a23`；
  - 解包 83 entries（含目录）后与本地快照逐文件对比：**77 文件 / 2,240,518 B，差异 0**，
    树指纹 `f23a23ef752dbf03ec686b7a1c676894eeb279ce2d7b1f75efae1a01ea810078` 完全相同。
  - **注记**：tarball 是 gzip 归档，**字节不可复现**——外部缓存的前缀是 `3d985415…`，本机这次下载是 `33b9c5bd…`；
    因此本件**以「解包后的树指纹」为锚**，不把 gzip sha 当锚。tarball 本体已留档 `raw/11-tarball.tgz`。
- 快照锚（无 `.git`，逐字节可复算；`raw/10`）：
  - 全树 **77 文件 / 2,240,518 B**，指纹 `f23a23ef…`（同上游 commit 内容）；
  - `package.json` sha256 = `33803d4a7532b1a9d3fcafaf8f3e70be73b777030e8259b08e3f2cb43990c66c`
  - `lib/client.js` = `f0da77536cb9897b…`（375,533 B）；`lib/index.js` = `b29b7cf3d7ab910d…`（239 B）
  - `README.md` = `b5f8374ea154fd34…`（5,732 B）；`tools/build-client.mjs` = `830e9a7951ee5b95…`
  - `locale/` 60 文件 / 182,267 B；`tools/` 4 文件 / 45,991 B；`docs/` 6 文件 / 1,628,353 B
- 构建产物与源码的对应：见「逐项读数 §2」——发布物与重新构建**逐字节相同**，所以本件所有行为结论同时覆盖
  「仓库源码」与「用户装到的 lib/client.js」。

## 环境与基线

| 项 | 读数 |
|---|---|
| 宿主 | DeepSeek Harness Desktop **0.2.1-rc.2**（`@deepseek-ai/dsh-desktop-runtime`；app.asar 182,794,869 B，sha256 `47874618…`；`raw/00` §3） |
| 平台 | **仅 Windows 11**（`os.release=10.0.26200`，x64，hostname `bbs`）；WSL/Linux/macOS 未跑 |
| 运行时/工具链 | Node **v24.21.0**（DSH 自带）；git **2.56.0.windows.2**、Python **3.12.10**、npm **12.2.0**、ffmpeg N-127650、pnpm **11.28.5**（经 `C:\Users\30951\tools\run.cmd` 与 DSH 自带 pnpm 验证；`raw/00` §2） |
| 网络 | GitHub 取件走 `测试/tools/gh-fetch.mjs` 的 gh-proxy 镜像；Node 需 `--use-system-ca` 过本机 TLS 代理（`raw/11`） |
| live profile | 未安装本插件（dependencies / bundles / node_modules 三处均为 false；`raw/00` §4） |
| 源码快照 | `D:\natnat\lingshu\外部插件\dsh-locale-es-419\dsh-locale-es-419-main`，无 `.git`、无 `node_modules`（`raw/10`） |
| 自带测试 | **0/0：没有 test 目录与 test script**（`raw/31` §9）——这是「无自带测试」的事实，不是“测试全绿” |
| 英文基准（基线） | 从宿主 asar 的 **53 个** client bundle 提取出 **63 个 namespace / 2,891 条 en 键**（`raw/22`、`raw/24` §0–1）；提取器 0 个 unresolved（`raw/24` §1） |
| 「无插件」基线 | 宿主 UI 语言只有内置 `zh` / `en`（`raw/31` §6：`LOCALE_IDS = ["zh","en"]`；`FALLBACK_LOCALE = en`）；插件不存在时无 es-419 语言 |

## 结果速览

| 面 | 结果 | 证据 |
|---|---|---|
| 上游锚定 | commit/tarball 树指纹核对：**77 文件逐字节一致**，差异 0 | `raw/11` |
| 版本面 | package/README/manifest 均 1.0.0；站点快照 `manifestVersion=1.0.0` | `raw/10`、`raw/50` |
| 发布面结构 | `locale/` 60 JSON / 182,267 B；无重复键、无 BOM/CRLF；所有值均为字符串 | `raw/32` |
| 构建复现 | `lib/client.js` 发布物 vs 重新构建 **逐字节相同**（375,533 B）；两次构建确定 | `raw/30` §2–3 |
| 生成物 vs 源 JSON | 59 namespace × 2 语言（es-419 / es）、2,745 键 ×2、META 174：与源 JSON **0 差异** | `raw/30` §4–5 |
| 宿主命名空间覆盖 | 插件 59 vs 宿主 63；匹配 **57**；仅插件 2（过期）；**仅宿主 6（未覆盖）** | `raw/24` §1–2 |
| 键对等 | 共有 **2,582**；es **缺 182**；es **多 155**；键级覆盖率 **89.3%** | `raw/24` §2 |
| 占位符 / 复数 | 占位符不一致 **2** 处；复数键 es 46 vs 宿主 53（缺 **8**） | `raw/24` §4–5 |
| 未翻译 | 与 en 同形 144（格式 26 / 技术白名单 38 / 候选 80）；强候选 9，其中 **3 个 `Edit`** 真未翻译 | `raw/24` §6–6c |
| 运行时（模拟 locale 服务） | apply 正确：2 语言 / 118 次 register / resolveText 5 用例全过；**停用后覆写残留**、重复 apply 叠加 | `raw/34` |
| 宿主 API/契约 | inject 包存在；locale API 齐全；**宿主无 removeLanguage**；`dsh.engines` 放置位置不被宿主读取 | `raw/31` |
| 安装说明 vs 宿主链路 | README「装完自动注册」与宿主 `enabled: subject.selection ?? false` 有冲突风险 | `raw/31` §10 |
| 查重 | 账本 595 事件 0 命中；站点 1 条 `reviewed=false`；上游 issues 0 | `raw/50` |
| 真实安装 / 浏览器切换 | **未验** | — |

## 逐项读数

### 1. 上游与本地快照（`raw/10`、`raw/11`）

```text
commit f099d3725a07725ae6182a76b5000af22ba10309  date=2026-10-18T02:13:29Z  tree=e0d379d2…
tarball bytes=1,757,434  sha256=33b9c5bd…（gzip 不可复现；外部缓存前缀 3d985415…）
extracted 83 entries
upstream files=77 bytes=2,240,518 fingerprint=f23a23ef…
local    files=77 bytes=2,240,518 fingerprint=f23a23ef…
树指纹相同 = true；仅 upstream 有=0；仅本地有=0；同路径不同内容=0
```

### 2. 版本、发布面与构建复现（`raw/10`、`raw/30`、`raw/32`）

```text
package.json version = 1.0.0；README 标题 dsh-locale-es-419；package files =
  ["lib/**/*.js","locale/**/*.json","cordis.patch.yml","README.md","LICENSE"]
发布物：lib/client.js 375,533 B sha f0da7753…；lib/index.js 239 B sha b29b7cf3…
构建：node tools/build-client.mjs
  built   size=375,533 sha=f0da7753…（与发布物逐字节相同 = true）
  shipped size=375,533 sha=f0da7753…
  第二次构建 sha 相同 = true（确定性）
生成物：LANGS = [{"es-419":"Español (Latinoamérica)"},{"es":"Español"}]
  DICTS: es-419 59 namespaces/2745 keys；es 59/2745（两者完全相同）
       不含 packageMeta；META_TRANSLATIONS = 174 条（与 packageMeta.json 相同）
  DICTS vs 源 locale JSON：namespace 集合相同；逐 namespace 键值 0 差异
源文件体检：60 JSON / 2919 键（含 meta 174）/ 182,267 B
  非字符串值=0 · 空串=0 · 纯空白=1 · 花括号不配对=0 · 重复键=0 · BOM=0 · CRLF=0
```

### 3. 宿主 en 基准怎么来的（`raw/20`–`raw/23`）

```text
宿主 asar 里的 locale/en.json：216 个文件，全部形如 {"meta":{"title":"<包名>"}}（1 个键）
⇒ 它们只是插件管理器的包元数据，不是 UI 字典
真正的 en 字典编译在 client bundle 里：
  const en = { … } / ctx.effect(() => ctx.locale.register(NS, { zh, en }))
从 53 个 client bundle 解析出 63 个 namespace / 2,891 个 en 键，0 unresolved
（解析器 probes/_locale-extract.mjs 支持 …spread 与三参 register；(空)形态证据见 raw/25、raw/26）
```

### 4. 命名空间与键对等（核心，`raw/24`）

```text
插件 namespace = 59（不含 packageMeta）；宿主 en namespace = 63
匹配 = 57；仅插件 = 2（claude-code-mods 4 键、inspector 4 键；宿主已无对应注册/包）
仅宿主（插件未翻译 ⇒ 回退英文） = 6，共 127 键：
  pluginMarket 78（dsh-client-ui-plugin-market）
  cotTranslation 32（dsh-experimental-client-ui-cot-translation）
  directory-browser 13（dsh-client-ui-directory-picker-browse）
  secretMask 2 · deepseek-model-label-1017 1 · shortcuts.layout 1

键：宿主全部 2,891；匹配部分 2,764；两边共有 2,582；es 缺 182；es 多 155
键级覆盖率 = 2,582 / 2,891 = 89.3%

缺失/多余最多的 namespace（前 8）：
  conversation      host 371 / es 367 / 缺 4 / 多 0
  pluginManager     host 221 / es 205 / 缺 17 / 多 1
  schedule.manager  host 188 / es 181 / 缺 14 / 多 7
  settings.models   host 134 / es 113 / 缺 24 / 多 3
  job               host 40  / es 23  / 缺 17 / 多 0
  session-inspector host 52  / es 43  / 缺 9 / 多 0
  settings.webSearch host 27 / es 18 / 缺 9 / 多 0
  voice-input       host 109 / es 101 / 缺 8 / 多 0
（完整表在 raw/24 §2；missing/extra 逐条在 raw/24 与 24-parity-summary.json）
```

另有 **schedule.\* 内容错配**（`raw/24` §3）：插件 `schedule.catalog` 与 `schedule.manager` 的**键集完全相同**
（各 181 键，23 个同键不同值，JSON 不同），但与宿主交叉核对：

```text
overlap(plugin.catalog, host.catalog) = 54     host.catalog 只有 70 键
overlap(plugin.catalog, host.manager) = 174    host.manager 有 188 键
overlap(plugin.manager, host.catalog) = 54
overlap(plugin.manager, host.manager) = 174
⇒ 插件 catalog 文件装的其实是 task-manager 的词条；提醒（catalog）界面 16 个 host 键缺失、127 个多余键不生效
```

### 5. 占位符 / 复数 / 未翻译（`raw/24` §4–6c）

```text
占位符集合不一致 = 2（花括号数量不配对 = 0）：
  1) pluginManager.installDoneRestart
     en: "Installed; restart DSH to load it. {reason}"
     es: "Instalado; se carga en el próximo inicio."        ← 丢了 {reason}
  2) pluginManager.reasonIncompatibleVersion
     en: "{plugin} is incompatible with DSH {runtime} (requires {requirements}); …"
     es: "{plugin} es incompatible con DSH {runtime} (requiere {peers}); …"   ← {requirements} 写成 {peers}

复数键：es-419 46 vs 宿主 53；缺 8 个 .other 形：
  job.count.idle.other；schedule.catalog/unit.{hour,minute,second}.other；schedule.catalog.trigger.other；
  schedule.manager/unit.{hour,minute,second}.other

未翻译：与 en 同形 144 处（trim 后）；纯符号/格式 26；技术/专有白名单 38；候选 80；
  其中强候选（英文动作词）9：command.token.export/feedback/goal/permission（斜杠命令名，保留英文合理）、
  conversation.tool.title.edit（工具名，合理）、open-in-app.app.filemanager（应用名，合理）、
  **common.edit / pluginManager.installEdit / settings.models.edit = "Edit"（应为 "Editar"，3 处真未翻译）**
```

### 6. 宿主静态契约（`raw/31`）

```text
宿主 = @deepseek-ai/dsh-desktop-runtime 0.2.1-rc.2
package.json：top-level engines = undefined；dsh.engines = {"dsh":">=0.2.0-rc.1"}
宿主 asar 里 'dsh.engines' 出现 0 次；evaluatePluginCompatibility 读的是 manifest 的顶层 engines
  ⇒ 插件声明的 DSH 最低版本不会被宿主校验（peer 里也只有 cordis，没有 @deepseek-ai/dsh）
dsh.client.inject：@deepseek-ai/dsh-client-locale 在宿主存在 version=0.2.1-rc.2
客户端 bundle：exports.inject = ["locale"]；用 addLanguage / ctx.locale.register / 覆写 resolveText
宿主 locale 服务：LOCALE_IDS = ["zh","en"]；FALLBACK_LOCALE = "en"；addLanguage 要求 fallback 已注册；
  register 支持 {zh,en}/三参；重复注册抛 "already registered" / "already has locale"（插件 catch 正则能匹配）；
  removeLanguage 出现 0 次（宿主没有删除语言 API）
无自带测试：tests/ 不存在；package.json 无 test script
files 白名单：lib/**/*.js、locale/**/*.json、cordis.patch.yml、README.md、LICENSE
  docs/ 不在白名单（npm 包里 README 图片会缺）；tools/ 不在白名单（构建脚本不随包发）
README 宣称“58 Módulos cubiertos / 58 diccionarios”，实测 DICTS namespace = 59
安装链路：install 只在 enabled !== false 时 selectBundle；管理器传 enabled: subject.selection ?? false
  ⇒ README「装完自动登记」有冲突风险（未真实安装，见 P2）
```

### 7. 运行时模拟（`raw/34`）

```text
bundle 捕获：id=dsh-locale-es-419；exports=apply,inject；inject=["locale"]
apply 后：语言 = en/zh(宿主内置) + es-419/es；namespace=59；register 调用=118（59×2）；ctx.effect=120
resolveText（active=es-419）：5 个用例全过
  object{en,es-419} → es-419 值；object{en,es} → es 值；object 无翻译 → 宿主 fallback；
  string 命中 packageMeta → 西语；string 未命中 → 原样
active=en 不做 meta 翻译；active=es 同样生效
停用（跑完 120 个 effect disposer）后：
  字典条目清空（仍有条目的 namespace=0）；语言数仍是 4（宿主无 removeLanguage，插件 effect 返回 no-op）；
  resolveText 覆写仍在，active=es-419 时 "Voice input" 仍返回 "Entrada de voz"
连续 apply 两次（热重载）：
  第二次不向外抛错；语言数仍 4、namespace 仍 59；但 resolveText 又被包了一层
汇总：20 PASS / 1 FAIL（FAIL = “停用后覆写应撤回”没有做到）；语言残留按宿主 API 限制记录
```

### 8. 查重（`raw/50`）

```text
bounty 账本：595 事件；dsh-locale-es-419 / dsh-locale-es / Dreftian / es-419 命中 0；全仓 373 文本命中 0
主创站筛选快照：plugins.json 47 条 / details.json 33 条，dsh-locale-es-419 各 1 条：
  id=01a14cb1-b39e-791d-bc49-4d949e20be87, reviewed=false, manifestVersion=1.0.0, upstream=可访问
上游 GitHub issues（含 PR）：0 条
工作区：只有本件工作目录与源码快照，无第二份测评
```

## 发现

> 所有发现均有本机可复跑读数。**没有发现会破坏语言注册/构建/运行时加载的 P0/P1**；
> 问题集中在「对当前宿主版本的翻译覆盖」「schedule 字典内容」「i18n 生命周期/占位符」与「安装说明」上。
> 本插件**没有自带测试**，所以以下结论全部来自独立探针，不引用作者测试（作者也没有提供）。

### P2-1 · 对当前宿主 0.2.1-rc.2 的覆盖不完整：6 个 namespace 完全未翻译、键级覆盖 89.3%

**读数**（`raw/24` §1–2）：插件 59 个 namespace 中 57 个能与宿主 63 个 namespace 对上；
**6 个宿主 namespace 没有任何插件字典**（pluginMarket 78、cotTranslation 32、directory-browser 13、secretMask 2、
deepseek-model-label-1017 1、shortcuts.layout 1，共 127 键）；在能对上的 namespace 里，es 仍**缺 182 个 en 键**、
另有 **155 个键宿主已没有**（过期/改名）。键级覆盖率 **2,582 / 2,891 = 89.3%**。
宿主 fallback 是 en（`raw/31`），所以这些键在 es-419 下会显示英文：插件市场页（pluginMarket 78 键）整页英文、
任务详情/插件管理器/模型设置等新键回退英文。
**与 README 的落差**：README 写「58 Módulos cubiertos / Cobertura integral」，实测是 59 个 namespace 且宿主有 63 个；
「integral」在 0.2.1-rc.2 上不成立。**影响**：选择西语后仍有可见英文（fallback 不崩，但承诺未兑现）。
**建议**：以当前宿主 en 字典为源做一次补齐；把 pluginMarket / directory-browser / cotTranslation 纳入；并在 README 写清覆盖到哪个 DSH 版本、缺哪些页。

### P2-2 · `schedule.catalog` 与 `schedule.manager` 内容错配且两份几乎重复

**读数**（`raw/24` §3）：插件两个文件**键集完全相同**（各 181 键，23 个同键不同值，JSON 不同）；
与宿主交叉：插件 catalog 与宿主 **catalog 只重合 54/70**，与宿主 **manager 重合 174/188**；
插件 manager 与宿主 manager 重合 174/188。即：插件的 `schedule.catalog.json` 装的是任务管理器（manager）词条，
提醒（catalog/reminders）界面的 70 个键里有 16 个没翻译、127 个键写了但宿主不读。
**影响**：提醒/自动化任务的 catalog 界面大量英文；两份近乎重复的 181 键文件也增加维护成本。
**建议**：按宿主 0.2.1 的两个 namespace 重新拆分（catalog= reminders 70 键，manager= task manager 188 键）。

### P2-3 · 安装说明宣称「装完自动登记」，但宿主 0.2.1-rc.2 的安装链路默认 `enabled: false`

**读数**（`raw/31` §10）：README §Paso 2 写「DeepSeek Harness descargará y registrará automáticamente el plugin」。
宿主 asar 里实际代码：

```text
install 流程：if (options?.enabled !== false) await this.selectBundle(name, true);
管理器 UI  ：installBundle(spec, { enabled: subject.selection ?? false, … })
```

即：用户没有在安装对话框里主动勾选“启用”时，bundle 不会写进 `dsh.profile.bundles`；宿主对「装了但不在 bundles 里」
是静默跳过的（同类插件 dsh-vibe-island 的 README 记录过同样的坑：插件管理器显示已安装、功能毫无反应、无提示）。
**影响**：照 README 装的用户可能看不到语言下拉里的西语，且没有报错可查。
**边界**：本件**未真实安装**（不写 live profile），这是宿主 asar 的代码级证据 + 同类插件已知事故，不是运行时实测。
**建议**：README 补「安装后到插件页确认已启用 / 若没有，点『立即启用』或手工把 `dsh-locale-es-419` 加进 `dsh.profile.bundles`」。

### P3-1 · 两个占位符不一致（一个丢 `{reason}`，一个把 `{requirements}` 写成 `{peers}`）

**读数**（`raw/24` §4）：`pluginManager.installDoneRestart` 的 es 值没有 `{reason}`；
`pluginManager.reasonIncompatibleVersion` 的 es 值用 `{peers}` 代替 en 的 `{requirements}`。
**影响**：插件管理器“装完需重启”的提示丢掉具体原因；版本不兼容提示可能显示不出所需版本/多余占位符
（宿主对缺失参数的渲染方式未测，见「不确定」）。**建议**：按 en 模板占位符逐一保留。

### P3-2 · `resolveText` 覆写没有放进 `ctx.effect`：停用不撤回、热重载叠加

**读数**（`raw/34` §3–4）：停用（跑完全部 effect disposer）后字典被清空，但 `resolveText` 仍是插件覆写；
active=es-419 时 `"Voice input"` 仍返回西语。连续 apply 两次时，`resolveText` 又被包了一层（不抛错，但泄漏）。
**影响**：插件被禁用/热重载后，package meta 的西语翻译仍会劫持 resolveText；重复重载会叠 wrapper（体积/行为累积）。
**建议**：把覆写包进 `ctx.effect(() => { const orig = ctx.locale.resolveText; ctx.locale.resolveText = …; return () => { ctx.locale.resolveText = orig; } }, '…')`。

### P3-3 · 停用后语言定义残留（宿主无 `removeLanguage`，插件也丢弃了任何可撤销句柄）

**读数**（`raw/31` §6：`removeLanguage` 出现 0 次；`raw/34` §3：停用后语言数仍为 4 = en/zh + es-419/es）。
插件的 addLanguage effect 永久返回 `() => {}`；即使宿主将来提供删除 API 也不会被调用。
**影响**：禁用插件后语言下拉仍有两个西语项，选中后字典已被清空 → 全英文（看起来像“西语没翻译”）。
**不确定**：宿主当前 API 是否允许插件撤掉 addLanguage（现在显然没有删除接口）；因此这一条主因在宿主 API 限制，
插件侧能做的是记录并在 disable 时给出明确提示/降级。**建议**：在 README「卸载与回滚」写清“禁用后需重启移除语言项”，
或与宿主协商 removeLanguage。

### P3-4 · DSH 最低版本声明放在 `dsh.engines`，宿主不会读取

**读数**（`raw/31` §2–3）：`package.json` 顶层 `engines = undefined`，`dsh.engines = {"dsh":">=0.2.0-rc.1"}`；
宿主 asar 里字符串 `dsh.engines` 出现 **0** 次，`evaluatePluginCompatibility` 读的是 manifest 顶层 `engines`。
peerDependencies 也只有 `@deepseek-ai/cordis`，没有 `@deepseek-ai/dsh`。
**影响**：插件在低于 0.2.0-rc.1 的 DSH 上不会被宿主拦下（B 型行为差异可能让人误以为是翻译问题）。
**建议**：把 `"engines": {"dsh": ">=0.2.0-rc.1"}` 放到顶层（或同时保留），并把 `@deepseek-ai/dsh` 加进 peer。

### P3-5 · README 的模块数 58 与实测 59 不一致；`docs/` 未随包发布

**读数**（`raw/31` §9、§11）：README 两处写 58（`58 diccionarios`、`58 Módulos cubiertos`），
实际 DICTS namespace = **59**（不含 packageMeta；`raw/30`、`raw/24`）。`files` 白名单不含 `docs/`、`tools/`，
而 README 内嵌 `docs/hero.jpg` 等图片 → 若从 npm tarball 安装，README 图片会缺（从 GitHub/git 安装不受影响）。
**影响**：文档级/分发形态级。**建议**：把 58 改成 59（或注明统计口径），按需把 docs 加进 files 或改图片外链。

### P3-6 · 三处动作词仍是英文 `Edit`

**读数**（`raw/24` §6b）：`common.edit`、`pluginManager.installEdit`、`settings.models.edit` 的 es 值均为 `"Edit"`，
西语应为「Editar」。同批 144 个“与 en 同形”值里，其余多为单位/格式/URL/品牌/工具名（如 `{count} min`、`Cron`、
`VS Code`、`Bash`、`GitHub`），**不**按未翻译计。
**影响**：通用「编辑」按钮在 es-419 下显示英文。**建议**：改 `Edit` → `Editar`（3 处）。

### 已验的正面结论（同样逐项可复跑）

- 发布物与重新构建**逐字节相同**、两次构建确定；59 namespace × 2 语言 × 2745 键与源 JSON 0 差异（`raw/30`）。
- locale 源数据干净：60 JSON 全部可解析、值全为字符串、无重复键/BOM/CRLF；唯一纯空白值是分隔符（`raw/32`）。
- 运行时 apply 正确：语言注册 2 个、118 次 register、resolveText 的 5 个用例（object/string/fallback/active 切换）全过（`raw/34`）。
- 宿主契约成立：inject 包 `@deepseek-ai/dsh-client-locale` 0.2.1-rc.2 存在、locale API 齐全、addLanguage/register 的错误文案能被插件 catch 正则命中（`raw/31`）。
- 上游锚定与查重：本地快照 = commit 内容；账本/站点/上游 issues 均无同件（`raw/11`、`raw/50`）。

## 诚实边界

- **已验**：上游 commit + tarball 树指纹与本地快照一致；版本/发布面/构建复现；locale 源文件结构；
  对宿主 en 基准的命名空间/键对等/多余键/占位符/复数/未翻译分类；宿主 locale API、engines 读取位置、inject 包；
  客户端 bundle 运行时（apply/118 register/resolveText 5 用例/停用残留/重复 apply）；查重。
- **未验（没跑，列原因）**：
  ① **真实浏览器语言切换与 UI 渲染**：本件不安装插件、没有浏览器/桌面自动化可驱动真实 DSH 渲染；
     文案在真实页面上的排版、截断、RTL/复数实际显示、语言下拉是否出现 es-419/es 都**未测**；
  ② **真实安装/卸载**：不写 live profile，P2-3/P3-3 是宿主代码级证据与模拟读数，不是真机安装观察；
  ③ **与其它 locale 插件的并发**：未装第二个语言包，语言 id 冲突、register 顺序等未测；
  ④ **macOS / Linux**：单平台；
  ⑤ **宿主 translate 对缺失占位符的实际渲染**：只验证到字典层（es 缺 `{reason}` / 用 `{peers}`），
     宿主是保留花括号还是替换为空未实测（两种都会丢信息）；
  ⑥ **宿主 benchmark 完整性的上限**：en 基准从编译后的 client bundle 字面注册提取（0 unresolved），
     若宿主存在动态/非字面注册，覆盖率数字可能低估；本件只敢说「对这 53 个 bundle / 63 个 namespace 的静态面成立」；
  ⑦ **真实 npm 分发形态**：未 `npm pack`，docs/ 不在 files 的后果是按清单推断的。
- **不确定**：
  ① 外部缓存的 tarball 前缀 `3d985415…` 与本机 `33b9c5bd…` 不同（gzip 不可复现；内容树指纹一致）；
  ② P2-3 是否在本机 0.2.1-rc.2 的 UI 上真的发生（未点安装）；
  ③ 宿主 `translate()` 对缺失/多余占位符的处理；
  ④ 插件 `es` 别名（同一字典注册为 `es-419` 和 `es`）是否有意——会让语言下拉出现两个西语项；README 只提 es-419；
  ⑤ pluginMarket 等 6 个未覆盖 namespace 是否是作者目标版本里还不存在的模块（作者声明 0.2.0-rc.2，本次宿主 0.2.1-rc.2）。
- **不做**：不排名 / 不给总分 / 不用星级（站点体例如此）；不做安全渗透；不评价西语译文的地道程度（只做结构/一致性/占位符）；
  不改被测源码、不提 PR；不写 live profile；不对非 Windows 平台下结论；不把模拟宿主服务当成真实宿主。
- **明确声明**：**本插件没有自带测试（0/0）**；本件不把“独立探针全过/部分失败”写成“作者测试结果”。

## 查重

对照对象与结果（`raw/50`）：

- **bounty 本地快照**：`docs/bounty/ledger.json` **595** 个事件，关键词 `dsh-locale-es-419` / `dsh-locale-es` /
  `Dreftian` / `es-419` **0 命中**；全仓 373 个文本文件 0 命中；`review/data/plugins.json` 也无本插件。
- **主创测评站筛选快照**（`测试/主创站筛选/`）：`plugins.json` 47 条、`details.json` 33 条，
  dsh-locale-es-419 各 1 条：`id=01a14cb1-…`、`reviewed=false`、`manifestVersion=1.0.0`、`upstream=可访问`
  ⇒ 站点侧**暂无评测**，本件是首份第三方测评。
- **上游**：GitHub `Dreftian/dsh-locale-es-419` issues（含 PR）**0 条**，无 test report / 同件。
- **工作区**：`测试/` 下只有本件目录；`外部插件/dsh-locale-es-419/` 只有源码快照，无第二份测评。

⇒ 结论：**未见同件**。局限：站点是外部服务，本件以本地保存的站点快照为准，**未登录站点做在线核验**。

## 复现步骤（第三方原样可跑）

环境：Windows x64；Node **v24.21.0**（DSH 自带）；GitHub 取件需要 `NODE_OPTIONS=--use-system-ca`；
工具链可用 `cmd /c "C:\Users\30951\tools\run.cmd <cmd>"`。工作目录：`D:\natnat\lingshu\测试\dsh-locale-es-419`。

```bash
cd D:\natnat\lingshu\测试\dsh-locale-es-419
<NODE> probes/probe-env.mjs
<NODE> probes/probe-anchor.mjs
$env:NODE_OPTIONS='--use-system-ca'; <NODE> probes/probe-upstream.mjs
<NODE> probes/probe-build.mjs
<NODE> probes/probe-host-locale.mjs
<NODE> probes/probe-locale-baseline.mjs
<NODE> probes/probe-host-en-discovery.mjs
<NODE> probes/probe-register-shape.mjs
<NODE> probes/probe-locale-parity.mjs
<NODE> probes/probe-locale-structure.mjs
<NODE> probes/probe-host-static.mjs
<NODE> probes/probe-client-runtime.mjs
$env:NODE_OPTIONS='--use-system-ca'; <NODE> probes/probe-dedupe.mjs
# 证据整理
<NODE> ..\tools\normalize_raw.mjs raw
<NODE> ..\tools\make_manifest.mjs --raw raw --label "dsh-locale-es-419 1.0.0"
<NODE> ..\tools\make_issue.mjs --report "测评报告_dsh-locale-es-419_v0.1.md"
```

关键前置：所有探针只读源码/宿主 asar；`probe-build` 只写在 `sandbox/repo` 副本；`probe-upstream` 与 `probe-dedupe`
会访问 GitHub（gh-proxy 镜像），离线时可跳过并把对应项记为未验。`<NODE>` =
`C:\Users\30951\AppData\Local\Programs\DeepSeek Harness\resources\runtime\primary-runtime\dependencies\node\bin\node.exe`。

## 一句话总结

**dsh-locale-es-419 1.0.0 与上游 commit f099d372… 逐字节一致、构建可复现（发布物与重构建相同），
59 个 namespace × 2745 键的源数据干净、运行时注册与 resolveText 覆写可用；但对本机宿主 0.2.1-rc.2 的
键级覆盖只有 89.3%（6 个 namespace/127 键完全未翻译、缺 182 键），`schedule.catalog` 装了 manager 词条，
另有 2 处占位符错误、resolveText 停用不撤回/热重载叠加、语言残留与 `dsh.engines` 放错位置；
插件没有自带测试，真实浏览器语言切换与真实安装未验。**
