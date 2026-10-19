[intake 输入] 【测评报告】@hyzyn/dsh-kit-settings 0.2.6 体验快测（插件配置页 / Web GUI · 方法试验）

<!-- intake:v1 {"project":"bench","difficulty":"medium","impact":"B","target":"hyzyn/dsh-plugin-kit","form":"intake"} -->

<!-- 协议对齐：工程协议手册 v1.1（r2）§6 体验快测档；协议文件 sha256 8dd51cbf75b259c5dabfdb928eb112364231b5d8f9f580759534e5d78a34d849 -->
> **协议对齐（v1.1 · r2 · 体验快测档）**：本件是**体验快测**（手册 §6），只记录安装/功能点/卸载残留类检查结果；
> **不生成五种能力状态标签、不进入能力榜、不以「通过/合格」作为插件结论**；未覆盖项见「诚实边界」。
> - **规范对齐（AI 编程通用规范 v1.1.2）**：验证结论按**附表 A 四档**给出（见「结果速览」）；报告按附表 B 顺序组织。
> - **插件身份**：monorepo 子包源码（commit + 子包树指纹），见「锚定提交」。
> - **环境配置 ID**：dsh 0.2.1-rc.2 / win32-x64 / Windows 10.0.26200 / node v24.21.0 / model=n/a。
> - **安全口径（§4 三分法）**：本件**未做**六威胁安全审计 ⇒ 安全结论 = **未测**。
> - **时效（§13.7）**：测评完成后 90 个自然日内有效。

## 性质声明

本件是**给主创测评站 <https://review.lingshulab.com> 的投稿测评**（intake 输入，外部贡献申报），不是悬赏：
**不 /claim、不自行加 bounty 标签**；计分、档位与是否归并均由维护者裁定（marker 的 difficulty/impact 仅为 intake 格式字段）。

- 被测对象：站点「@hyzyn/dsh-kit-settings」详情页；源码取 `hyzyn/dsh-plugin-kit⟧ 默认分支 `main⟧ commit `7363332f⟧ 的 tarball，子路径 `packages/kit-settings⟧。
- **未把插件装进任何正在使用的 DSH profile**：读数来自源码快照 + 构建/类型检查 + 直接 `import lib/index.js⟧ 的契约探针。
- **仅 Windows**（10.0.26200 x64）：不对其它平台下结论。
- 不排名、不给总分、不用星级；不改被测源码、不提 PR、不做安全渗透。

## 锚定提交

- 仓库：`hyzyn/dsh-plugin-kit⟧，默认分支 `main⟧，子路径 `packages/kit-settings⟧
- commit：`7363332f595b8112cb4b601f8723e6453043eb62⟧（2026-10-18T13:46:13Z）
- 子包树指纹：**9 文件 / 17,027 B / sha256 `b3ccca6109b46427⟧**
- 整仓树指纹：**712 文件 / 26,784,155 B / sha256 `2857f54b4c02eb62⟧**
- tarball：`外部插件/hyzyn-dsh-kit-settings/hyzyn-dsh-kit-settings.tgz⟧，sha256 前缀 `83211d61a3480138⟧
- 快照目录：`外部插件/hyzyn-dsh-kit-settings/dsh-plugin-kit-main/packages/kit-settings⟧

## 环境与基线

| 项 | 值 |
|---|---|
| 宿主 | DSH desktop **0.2.1-rc.2** |
| 平台 | Windows 11 10.0.26200 x64 |
| Node / pnpm | v24.21.0 / 11.7.0（仓库声明 pnpm 10.30.3 可用） |
| 运行依赖 | 同 monorepo peer（`@deepseek-ai/schemastery⟧ 等，由宿主提供） |
| 形态 | **宿主半体极薄**（`lib/index.js⟧ 仅 name/inject/apply），主要能力在 `client.js⟧ 浏览器半体 |

## 结果速览

**验证四档：部分验证**

| 面 | 结果 |
|---|---|
| 依赖安装（`pnpm install --filter @hyzyn/dsh-kit-settings...⟧） | **exit 0**，4.2 s（202 包，含工作区依赖） |
| 构建（`tsc⟧） | **exit 0**，2.7 s |
| 类型检查 + client-lint | **exit 0**，4.1 s（样式 lint 全过） |
| 独立探针（6 断言，契约面） | **6 / 6 通过** |

> 四档判定理由：宿主半体可构建、可加载、契约探针通过；但插件的核心价值在浏览器半体，
> 本地未在真实 Web GUI 中加载，故不写「已验证通过」。

## 逐项读数

### 1. 安装 / 构建 / 类型检查（`raw/02-install.txt⟧、`raw/03-build.txt⟧、`raw/04-typecheck.txt⟧）

```
install:   exit 0  4.2 s   Scope: 2 of 14 workspace projects；+202 包
build:     exit 0  2.7 s   tsc -p tsconfig.json
typecheck: exit 0  4.1 s   tsc --noEmit && node ../../scripts/client-lint.mjs
           [client-lint] client.js 通过（宿主地址 0 处 · 样式变量 3 处全部存在 · 自定义属性 3 处全部有定义 …）
```

### 2. 独立探针（`raw/05-probe.txt⟧）

探针：`probes/probe_kit_settings.mjs⟧，**6/6 通过**（契约面）：

- 导出 `name = 'kit-settings'⟧、`inject = []⟧；
- `apply({})⟧ 不抛异常（输出 `mounted（设置里的「插件配置」页由浏览器半体提供）⟧）；
- `client.js⟧ 存在；`package.json⟧ 声明 `exports⟧/`dsh⟧；`cordis.patch.yml⟧ 存在。

## 发现

### 未发现 P0 / P1 / P2 / P3

- 宿主半体极薄，未发现异常；核心 UI 逻辑在 `client.js⟧，本件未做前端运行时验证（见诚实边界）。

## 诚实边界

- **已验**：依赖安装、构建、类型检查 + client 样式 lint、6 条契约探针。
- **未验**：真实 DSH Web GUI 中「设置 → 插件 → 插件配置」页的渲染与交互；各 kit 插件配置表单的读写；
  宿主 `webServer⟧ 注册链；卸载残留；非 Windows 平台。
- **不确定**：不同宿主版本对 `client.js⟧ 入口约定的变化。
- **不做**：不排名、不给总分、不用星级；不做安全渗透；不改被测源码、不提 PR；不装进 live profile。

## 查重

- 账本（595 事件）：`@hyzyn/dsh-kit-settings⟧/`kit-settings⟧ **0 命中**。
- 站点：`plugins-20261019b.json⟧ 中 **reviewed=false**。
- 结论：未见同件（同 monorepo 的 env/prompt/mcp/profile 为不同子包，不构成重复）。

## 复现步骤

```bash
# 锚定：hyzyn/dsh-plugin-kit @ 7363332f595b8112cb4b601f8723e6453043eb62（packages/kit-settings）
pnpm install --filter "@hyzyn/dsh-kit-settings..." --frozen-lockfile
pnpm --filter "@hyzyn/dsh-kit-settings" build
pnpm --filter "@hyzyn/dsh-kit-settings" typecheck
node probes/probe_kit_settings.mjs
node ../tools/make_manifest.mjs --raw raw --label "@hyzyn/dsh-kit-settings 0.2.6"
```

## 一句话总结

**@hyzyn/dsh-kit-settings 0.2.6 在同仓依赖装好后可构建、类型检查与 client 样式 lint 全过，宿主半体契约 6/6 通过。
但核心能力在浏览器半体，本件未在真实 Web GUI 中验证，按附表 A 记「部分验证」。**
