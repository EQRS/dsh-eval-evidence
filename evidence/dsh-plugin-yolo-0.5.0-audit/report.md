# 深度审计：dsh-plugin-yolo 0.5.0（L3 · A 路径）

> 站点 2026/10/20 10:19（hanshanyike/dsh-yolo）。授权：六威胁全测、沙箱内。

## 一、结论

| 项 | 值 |
|---|---|
| 能力判定 | **还说不准**（bundle 型：入口是 loader，真功能在 5 个宿主子行，需 dsh-agent / llm / settings 服务） |
| 安全结论 | **未测**（静态：未见遥测；含 22,985 B 的 SQLite schema） |

## 二、结构（重要，别误判）

- dist/src/index.mjs 只有 **235 B**：apply(ctx) 只打一行日志「[yolo] plugin loaded」——**这是有意为之的 loader entry**，用于让客户端模块注册表发现浏览器 bundle（cordis.patch.yml 注释明写），**不是空壳缺陷**。
- cordis.patch.yml 挂 6 行：yolo（裸包/客户端行）、yolo-storage、yolo-memory、yolo-extract、yolo-reminder、yolo-ui。
- 子行实测：storage / reminder / ui 载入即失败（缺 @deepseek-ai/dsh-agent）；memory 缺 llm 服务；extract 缺 settings 服务。
- 功能定位：个人助理（从对话整理事项、跟踪、提醒）+ 侧栏 UI + dashboard。
## 依据（本轮实测）

- 见上「结构」段与 _batch3_表面.log 的 yolo rows 段。

## 六威胁

| # | 威胁 | 现状 |
|---|---|---|
| 1 | 提示注入 | **未测** |
| 2 | 权限越界 | **未测** |
| 3 | 数据外传 | **未测**（静态未见遥测） |
| 4 | 破坏性操作 | **未测** |
| 5 | 凭据保护 | **未测** |
| 6 | 供应链 | 静态：无 postinstall；tarball sha1 与 registry 一致 |

## 不适用条件

- 未装载进真实 DSH；6 行插件的行为、数据落点（SQLite schema 指向存储服务）、提醒调度、抽取质量**全部未验证**。
- 未做任何安全红队；本报告不含安全结论。

> 本批全部未在真实宿主装载；能力「还说不准」不等于「没用」。
