# 深度审计：qmd-autosearch 0.1.2（L3 · A 路径）

> 来源：站点 <https://review.lingshulab.com/plugins?cat=__none__>（2026/10/20 11:08，zhangzhenwen1/qmd-autosearch）。授权：六威胁全测、沙箱内（2026-10-20）。实验在 `%TEMP%\batch2` 内。

## 一、结论

| 项 | 值 |
|---|---|
| **能力判定** | **没法测（缺外部 QMD MCP 服务）** |
| **安全结论（指定范围）** | 未测（静态：只连配置的 qmdUrl，默认提示 localhost:6179） |

## 二、依据

- `apply(ctx, config)` 必填 `qmdUrl` + `collections`；**缺失时插件禁用并打显式告警**（实测输出：`qmd-autosearch: 未配置 qmdUrl 或 collections，插件已禁用。请在 cordis.patch.yml 的 config 中显式指定…`）——**失败即禁用、不静默**，这是正向行为（已作为功能断言通过）。
- 本机无 QMD/MCP 服务，`collections` 也无从解析 ⇒ 触发路径池无法实测 ⇒ 能力只能记「没法测」。
- 包信息：`deps=0`、`peers=0`、无 postinstall、tarball sha1 `3dfe44cf…6d971192` 与 registry 一致。

## 三、六威胁

| # | 威胁 | 现状 |
|---|---|---|
| 1 | 提示注入 | **未测**；观察：QMD 搜索结果会被注入模型上下文（本件功能本体），结果内容不可信 |
| 2 | 权限越界 | **未测**；观察：`triggerRoots` 会 `realpathSync` 配置路径 |
| 3 | 数据外传 | **未测**；观察：只连配置的 `qmdUrl`（默认示例为 localhost），无遥测 |
| 4 | 破坏性操作 | **未测**；无写/删代码路径（静态） |
| 5 | 凭据保护 | **未测**；无 token 类配置项 |
| 6 | 供应链 | 静态：零依赖、无 postinstall、sha1 与 registry 一致 |

## 四、不适用条件

- 未配置 QMD 服务，所以「自动补搜」这一核心能力**完全未验证**；本报告不是「它没用」。
- 未抓包、未做搜索结果投毒实验；注入面属功能本体。
