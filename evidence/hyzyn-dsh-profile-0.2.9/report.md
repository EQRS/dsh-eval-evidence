[intake 输入] 【测评报告】@hyzyn/dsh-profile 0.2.9 体验快测（Profile 管理 / Web GUI · 方法试验）

<!-- intake:v1 {"project":"bench","difficulty":"medium","impact":"B","target":"hyzyn/dsh-plugin-kit","form":"intake"} -->

<!-- 协议对齐：工程协议手册 v1.1（r2）§6 体验快测档；协议文件 sha256 8dd51cbf75b259c5dabfdb928eb112364231b5d8f9f580759534e5d78a34d849 -->
> **协议对齐（v1.1 · r2 · 体验快测档）**：本件是**体验快测**（手册 §6），只记录安装/功能点/卸载残留类检查结果；
> **不生成五种能力状态标签、不进入能力榜、不以「通过/合格」作为插件结论**；未覆盖项见「诚实边界」。
> - **协议绑定**：`工程协议手册-v1.1⟧（r2），sha256 `8dd51cbf…d849⟧（快照 `测试/协议/⟧）。
> - **插件身份**：monorepo 子包源码（commit + 子包树指纹），见「锚定提交」。
> - **环境配置 ID**：dsh 0.2.1-rc.2 / win32-x64 / Windows 10.0.26200 / node v24.21.0 / model=n/a。
> - **安全口径（§4 三分法）**：本件**未做**六威胁安全审计 ⇒ 安全结论 = **未测**。
> - **时效（§13.7）**：测评完成后 90 个自然日内有效。

## 性质声明

本件是**给主创测评站 <https://review.lingshulab.com> 的投稿测评**（intake 输入，外部贡献申报），不是悬赏：
**不 /claim、不自行加 bounty 标签**；计分、档位与是否归并均由维护者裁定（marker 的 difficulty/impact 仅为 intake 格式字段）。

- 被测对象：站点「@hyzyn/dsh-profile」详情页（清单版本 **0.2.9**）；源码取 `hyzyn/dsh-plugin-kit⟧ 默认分支 `main⟧ commit `7363332f⟧ 的 tarball，子路径 `packages/profile⟧。
- **未把插件装进任何正在使用的 DSH profile**：读数来自源码快照 + 构建/类型检查 + 直接 `import packages/profile/lib/index.js⟧ 的探针（临时 `DSH_HOME⟧）。
- **仅 Windows**（10.0.26200 x64）：不对其它平台下结论。
- 不排名、不给总分、不用星级；不改被测源码、不提 PR、不做安全渗透。

## 锚定提交

- 仓库：`hyzyn/dsh-plugin-kit⟧，默认分支 `main⟧，子路径 `packages/profile⟧
- commit：`7363332f595b8112cb4b601f8723e6453043eb62⟧（2026-10-18T13:46:13Z）
- 子包树指纹：**12 文件 / 123,179 B / sha256 `c4a87d3a68c1c780⟧**
- 整仓树指纹：**712 文件 / 26,784,155 B / sha256 `2857f54b4c02eb62⟧**
- tarball：`外部插件/hyzyn-dsh-profile/hyzyn-dsh-profile.tgz⟧，sha256 `83211d61a348…⟧（与首批 @hyzyn/dsh-env 同仓同 tarball）
- 快照目录：`外部插件/hyzyn-dsh-profile/dsh-plugin-kit-main/packages/profile⟧

## 环境与基线

| 项 | 值 |
|---|---|
| 宿主 | DSH desktop **0.2.1-rc.2** |
| 平台 | Windows 11 10.0.26200 x64 |
| Node / pnpm | v24.21.0 / 11.7.0 |
| 运行依赖 | `@deepseek-ai/schemastery⟧ 3.18.4、`@hyzyn/dsh-kit⟧ 0.5.3 |
| 基线 | 空 `DSH_HOME/profiles⟧ 临时目录 |

## 结果速览

| 面 | 结果 |
|---|---|
| 依赖安装（`pnpm install --filter @hyzyn/dsh-profile...⟧） | **exit 0**，202 包，8.4 s |
| 构建（`tsc⟧） | **exit 0**，3.0 s |
| 类型检查 + client-lint | **exit 0**，4.7 s（样式 lint 全过） |
| 独立探针（16 断言） | **16 / 16 通过** |
| 覆盖 | list / create / duplicate / rename / port / delete 六路由 + 三类守卫 |

## 逐项读数

### 1. 安装 / 构建 / 类型检查（`raw/02-install.txt⟧、`raw/03-build.txt⟧、`raw/04-typecheck.txt⟧）

```
install:   exit 0   8.4 s   Scope: 2 of 14 workspace projects；+202 包
build:     exit 0   3.0 s   tsc -p tsconfig.json
typecheck: exit 0   4.7 s   tsc --noEmit && node ../../scripts/client-lint.mjs
           [client-lint] client.js 通过（宿主地址 0 处 · 样式变量 75 处全部存在 · 自定义属性 77 处全部有定义 …）
```

### 2. 独立探针（`raw/05-probe.txt⟧ → `raw/06-probe-fixed.txt⟧ → `raw/07-probe-with-pnpm.txt⟧）

探针：`probes/probe_hyzyn_profile.mjs⟧，**16/16 通过**：

- **路由挂载**：`apply⟧ 注册 6 条路由（list/create/duplicate/rename/port/delete）。
- **CRUD 端到端**：create `alpha⟧（写 `package.json⟧ + `cordis.patch.yml⟧）→ list 可见 → duplicate 到 `beta⟧ →
  rename `beta→gamma⟧（目录与 manifest 同步）→ port 写 50888 → delete `gamma⟧。
- **守卫**：非法名称 `../evil⟧ → 400；非 loopback 请求 → 403；方法不匹配 → 405；受保护名 `web⟧ 删除 → 400。

> 方法学说明：首轮 6 条失败由两类探针错误造成——请求字段名写成 `from/to⟧（契约是 `name/from⟧、`name/newName⟧），
> 以及 PATH 缺 `pnpm⟧ 导致 duplicate 的依赖安装失败。修正后（含临时 `pnpm.cmd⟧ 垫片）全绿；
> 两轮失败读数均保留在 `raw/05-probe.txt⟧、`raw/06-probe-fixed.txt⟧。

## 发现

### P3-1 · duplicate 依赖外部 `pnpm⟧ 在 PATH；缺失时返回原始 Windows 命令错误（含编码乱码）

- **现象**：探针环境未把 `pnpm⟧ 放进 PATH 时，`duplicate⟧ 返回
  `复制后安装依赖失败（pnpm 退出码 1）: 'pnpm' 不是内部或外部命令…⟧（`raw/06-probe-fixed.txt⟧）。
- **根因**：`copyProfile⟧ 复制后调用 `installProfileDependencies⟧，通过 `spawnPortable('pnpm', …)⟧ 走系统命令；
  宿主安装的 DSH 通常自带 pnpm 入口，但独立/精简环境不一定有。错误信息直接透传子进程 stderr，
  在中文 Windows 下可能是 GBK 字节解码后的乱码。
- **影响**：仅影响「复制 profile」这一操作在缺 pnpm 的环境中的可诊断性；真实桌面宿主一般不受影响。
- **建议**：优先用宿主已知的 pnpm 入口（如 `process.execPath + pnpm.cjs⟧），或在错误中加一句
  "请确认 pnpm 在 PATH 中"，避免直接透传原始命令错误。

### 已验的正面结论

- **loopback 守卫**：非 `127.0.0.1/::1⟧、Host 不在白名单、`sec-fetch-site: cross-site⟧ 的请求均被拒。
- **名称校验**：`../evil⟧ 等路径穿越形态被拒；`web⟧ 受保护，不可删除。
- **重命名原子性**：目录移动与 `package.json⟧ 改名同步完成。

## 诚实边界

- **已验**：依赖安装、构建、类型检查 + client 样式 lint、16 条独立探针（CRUD/守卫/端口）。
- **未验**：真实 DSH Web GUI 中的设置页卡片与交互；真实请求经宿主 `webServer⟧ 的注册与鉴权链；
  在真实 `~/.dsh/profiles⟧ 上的操作（只用临时目录）；卸载残留；非 Windows 平台；并发操作。
- **不确定**：不同宿主版本 `webServer.register⟧ 契约；pnpm 版本差异对 duplicate 的影响。
- **不做**：不排名、不给总分、不用星级；不做安全渗透；不改被测源码、不提 PR；不装进 live profile。

## 查重

- 账本（595 事件）：`@hyzyn/dsh-profile⟧/`dsh-profile⟧ **0 命中**。
- 全仓 md（3,048 个，排除 `node_modules⟧/`外部插件⟧/本件目录）：**0 命中**（`raw/09-dedupe-grep.txt⟧）。
- 站点：`plugins.json⟧ 中 **reviewed=false**。
- 结论：未见同件（同 monorepo 的 env/prompt/mcp 三件为不同子包，不构成重复）。

## 复现步骤

```bash
# 锚定：hyzyn/dsh-plugin-kit @ 7363332f595b8112cb4b601f8723e6453043eb62（packages/profile）
pnpm install --filter "@hyzyn/dsh-profile..." --frozen-lockfile
pnpm --filter "@hyzyn/dsh-profile" build
pnpm --filter "@hyzyn/dsh-profile" typecheck
# 探针需要 pnpm 在 PATH（真实宿主自带）；本机可用临时垫片
node probes/probe_hyzyn_profile.mjs
node ../tools/make_manifest.mjs --raw raw --label "@hyzyn/dsh-profile 0.2.9"
```

## 一句话总结

**@hyzyn/dsh-profile 0.2.9 在同仓依赖装好后可构建、类型检查与 client 样式 lint 全过；
6 条路由的 CRUD 与三类守卫在 16 条独立探针中全部符合预期，loopback 限制和受保护名有效。
唯一发现是 P3：duplicate 依赖外部 pnpm，缺失时错误信息直接透传原始命令报错。真实 Web GUI 交互未验。**
