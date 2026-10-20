# 深度审计：@zhangj1164/dsh-memo 0.1.1（L3 · A 路径）

> 被测件：站点（2026-10-20 11:08，zhangj1164/dsh-mega-plugins → `packages/memo/dsh-memo`）。
> 结论先行：**能力「没法测」**——它是**宿主服务 + 设置页 UI**，不注册任何 tool、不注入 systemPrompt。

## 一、结论

| 项 | 值 |
|---|---|
| **能力判定** | **没法测**（无工具面/无 prompt 注入面；需 storageDomain + telemetry + githubIssue 三个宿主服务） |
| **安全结论（指定范围）** | **未测**（静态面：无网络、无子进程；写 `$DSH_HOME/memo/ledger.json`） |

## 二、依据

- 装载结果（`raw-surface.log`）：导出 `MemoService` / `Config` / 若干 schema；**`inject` 未声明**，`apply` 不存在（服务型包，由 `cordis.patch.yml` 插入行 + 其它 bundle 提供服务）。
- `cordis.patch.yml` 明确：必须与 `@zhangj1164/dsh-telemetry`、`@zhangj1164/dsh-github-issue` **一起装**；两条行由各自 bundle 拥有。
- 静态计数（`lib/index.js` 48 KB）：`fetch=0`、`child_process=0`、`writeFileSync 等=4`、`readFileSync=2`、`process.env=1`（`DSH_HOME`）。
- 数据落点：`$DSH_HOME/memo/ledger.json`（`analyses` 上限 500 条）；AI 分析走 `ctx.llm`（provider/model 缺省跟随 agentDefaultModel）。

## 三、六威胁（全部未测，仅列观察点）

| # | 威胁 | 现状 |
|---|---|---|
| 1 | 提示注入 | **未测**（分析结果回灌模型的路径需真实 llm 服务） |
| 2 | 权限越界 | **未测**；观察：存在 `featureCodeRef: memo:readExternalPath` 两处（读外部路径） |
| 3 | 数据外传 | **未测**；观察：telemetry 服务由**另一个包**提供，外传面在依赖侧不在本包 |
| 4 | 破坏性操作 | **未测**；观察：写 ledger（上限 500 条），无删除 API |
| 5 | 凭据保护 | **未测**；观察：config 只存 repoUrl 与可选 provider/model |
| 6 | 供应链 | **未测（静态）**：`deps={zod, schemastery}`、`peers=10`、无 postinstall、tarball sha1 `363edb76…4841b6` 与 registry 一致 |

## 四、不适用条件

- 无工具面的服务型插件，按本站五状态只能记「没法测」；若后续补 `MemoService` 的方法级驱动（需 storageDomain mock），可重做。
- 未安装 telemetry / github-issue 两个依赖包，因此「分析 + 上报」链路完全未验证。
- 本报告不含任何安全结论，不得据此认为该插件安全。
