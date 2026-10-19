[intake 输入] 【测评报告】@hyzyn/dsh-codegraph 0.6.10 体验快测（Codegraph 集成 / 代码探索 · 方法试验）

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

- 被测对象：站点「@hyzyn/dsh-codegraph」详情页；源码取 `hyzyn/dsh-plugin-kit⟧ 默认分支 `main⟧ commit `7363332f⟧，子路径 `packages/codegraph⟧。
- **未把插件装进任何正在使用的 DSH profile**：读数来自源码快照 + 构建/类型检查 + 直接 `import lib/index.js⟧ 的独立探针（本地临时目录）。
- **仅 Windows**（10.0.26200 x64）：不对其它平台下结论。
- 不排名、不给总分、不用星级；不改被测源码、不提 PR、不做安全渗透。

## 锚定提交

- 仓库：`hyzyn/dsh-plugin-kit⟧，默认分支 `main⟧，子路径 `packages/codegraph⟧
- commit：`7363332f595b8112cb4b601f8723e6453043eb62⟧（2026-10-18T13:46:13Z）
- 子包树指纹：**39 文件 / 1,532,279 B / sha256 `099e532cce2a391c⟧**
- 整仓树指纹：**712 文件 / 26,784,155 B / sha256 `2857f54b4c02eb62⟧**
- tarball：`外部插件/hyzyn-dsh-kit-settings/hyzyn-dsh-kit-settings.tgz⟧，sha256 前缀 `83211d61a3480138⟧（与 kit-settings 同仓同 tarball）
- 快照目录：`外部插件/hyzyn-dsh-kit-settings/dsh-plugin-kit-main/packages/codegraph⟧

## 环境与基线

| 项 | 值 |
|---|---|
| 宿主 | DSH desktop **0.2.1-rc.2** |
| 平台 | Windows 11 10.0.26200 x64 |
| Node / pnpm | v24.21.0 / 11.7.0 |
| 运行依赖 | 同仓 `@hyzyn/dsh-kit⟧（探针需其 `js-yaml⟧ 依赖已安装） |
| 外部 CLI | `codegraph⟧（本机未安装，只验证参数构造与索引定位，不执行 CLI） |

## 结果速览

**验证四档：已验证通过（本地纯函数与索引定位范围）**

| 面 | 结果 |
|---|---|
| 依赖安装（`--filter @hyzyn/dsh-codegraph...⟧） | **exit 0**，4.2 s（202 包） |
| 补装同仓 `@hyzyn/dsh-kit⟧ | **exit 0**，2.2 s（探针 import 需要 `js-yaml⟧） |
| 构建（`tsc + scripts/build-client.mjs⟧） | **exit 0**，3.3 s |
| 类型检查 + client-lint | **exit 0**，5.4 s（样式 lint 全过） |
| 独立探针（18 断言） | **18 / 18 通过** |

## 逐项读数

### 1. 安装 / 构建 / 类型检查（`raw/02-install.txt⟧、`raw/02b-install-kit.txt⟧、`raw/03-build.txt⟧、`raw/04-typecheck.txt⟧）

```
install(codegraph): exit 0  4.2 s  +202 包
install(dsh-kit):   exit 0  2.2 s  （补 js-yaml，探针 import 链需要）
build:              exit 0  3.3 s  tsc -p tsconfig.json && node scripts/build-client.mjs
typecheck:          exit 0  5.4 s  tsc --noEmit && client-lint（111 处样式变量全部存在）
```

### 2. 独立探针（`raw/05-probe.txt⟧ → `raw/05b-probe-after-kit.txt⟧）

探针：`probes/probe_codegraph.mjs⟧，**18/18 通过**：

- **工具分桶**：`mcp__codegraph__search → codegraph⟧；`grep → file⟧；`read_image/web_search/write_file/'' → other⟧
  （非探索模式优先于文件模式）。
- **累加与采纳率**：`foldToolCall⟧ 两次 grep 计 `file=2、discovery=2⟧；`summarizeAdoption⟧ 在 exploratory=4 时 `rate=0.25⟧，
  分母 0 时 `rate=undefined⟧。
- **索引定位**：含 `.codegraph/*.db⟧ 的目录 → `indexed⟧；空 `.codegraph/⟧ → `not-a-project⟧；无 `.codegraph⟧ → `missing⟧；
  `resolveIndexedRoot⟧ 从三层子目录向上命中项目根。
- **CLI 参数**：`syncArgs⟧ / `unlockArgs⟧ 用 `--⟧ 分隔；`indexArgs⟧ 的 `--force⟧ 在 `--⟧ 之前。
- **配置**：`resolveCliConfig⟧ 默认 `command=codegraph⟧、`cliTimeoutMs=60000⟧、`indexTimeoutMs=600000⟧；空白命令回落与 `indexForce⟧ 透传。

> 方法学说明：首轮探针因同仓 `@hyzyn/dsh-kit⟧ 的 `js-yaml⟧ 未安装而 import 失败（`raw/05-probe.txt⟧），
> 补装后全绿（`raw/05b-probe-after-kit.txt⟧）。这是环境依赖，不是插件缺陷。

## 发现

### 未发现 P0 / P1 / P2 / P3

- 纯函数契约清晰；索引定位对「家目录形状」（`.codegraph/⟧ 存在但无索引库）有显式区分，避免误认项目。

## 诚实边界

- **已验**：安装、构建、类型检查 + client lint、18 条独立探针（分桶/采纳率/索引定位/CLI 参数/配置）。
- **未验**：真实 `codegraph⟧ CLI 的 `sync/index/unlock/files⟧ 执行与超时；DSH Web GUI 卡片与右侧栏；
  符号搜索/callers/callees 的真实查询；`syncManagedMcpRow⟧ 对 `cordis.patch.yml⟧ 的写入（只读了实现，未执行）；
  卸载残留；非 Windows 平台。
- **不确定**：本机未装 `codegraph⟧ CLI，参数正确性只按源码与注释核对，未对真实 CLI 跑通。
- **不做**：不排名、不给总分、不用星级；不做安全渗透；不改被测源码、不提 PR；不装进 live profile。

## 查重

- 账本（595 事件）：`@hyzyn/dsh-codegraph⟧/`codegraph⟧ **0 命中**（作为插件名；`codegraph⟧ 作为 CLI 名出现在其它文档中属不同主体）。
- 站点：`plugins-20261019b.json⟧ 中 **reviewed=false**。
- 结论：未见同件。

## 复现步骤

```bash
# 锚定：hyzyn/dsh-plugin-kit @ 7363332f595b8112cb4b601f8723e6453043eb62（packages/codegraph）
pnpm install --filter "@hyzyn/dsh-codegraph..." --frozen-lockfile
pnpm install --filter "@hyzyn/dsh-kit..." --frozen-lockfile   # 探针 import 链需要 js-yaml
pnpm --filter "@hyzyn/dsh-codegraph" build
pnpm --filter "@hyzyn/dsh-codegraph" typecheck
node probes/probe_codegraph.mjs
node ../tools/make_manifest.mjs --raw raw --label "@hyzyn/dsh-codegraph 0.6.10"
```

## 一句话总结

**@hyzyn/dsh-codegraph 0.6.10 可构建、类型检查与 client lint 全过；工具分桶、采纳率、索引三态定位、
CLI 参数与配置默认在 18 条独立探针中全部符合预期。未发现 P0–P3；真实 codegraph CLI 与 Web 卡片未验。**
