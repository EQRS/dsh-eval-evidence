# 深度审计：dsh-plan-mode-plus 0.2.0（L3 · A 路径）

> 来源：站点 <https://review.lingshulab.com/plugins?cat=__none__>（2026/10/19 22:45，shuxidemosheng/dsh-plan-mode-plus）。授权：六威胁全测、沙箱内（2026-10-20）。实验在 `%TEMP%\batch2` 内。

## 一、结论

| 项 | 值 |
|---|---|
| **能力判定** | **还说不准（宿主 API 依赖过深，沙箱内无法执行）** |
| **安全结论（指定范围）** | 未测（静态面仅做包与依赖检查） |

## 二、依据

- 包 321 KB；`apply` 依赖 `ctx.ptcRuntime` / `ctx.sessionProjections` / `ctx.waterfall` / `ctx.reflect` / `ctx.fiber` 等宿主内部 API；mock 环境下 `apply` 直接抛 `Cannot read properties of undefined (reading 'tools')`，**工具未注册成功**（`_batch2_表面.log`）。
- 装它的意义是「模型可主动进入 plan 模式」；该行为只有在真实 PTC 宿主里才成立，沙箱不能替代。
- 包信息：`deps=0`、`peers=6`、无 postinstall、tarball sha1 `1e778736…877ebb` 与 registry 一致。

## 三、六威胁（全部未测）

| # | 威胁 | 现状 |
|---|---|---|
| 1 | 提示注入 | **未测**（plan 文本可能进 prompt） |
| 2 | 权限越界 | **未测**（依赖 `ptcRuntime`，权限面由宿主决定） |
| 3 | 数据外传 | **未测**（静态未见网络调用） |
| 4 | 破坏性操作 | **未测**（会改会话模式状态） |
| 5 | 凭据保护 | **未测** |
| 6 | 供应链 | 静态：无第三方运行依赖、无 postinstall、sha1 与 registry 一致 |

## 四、不适用条件

- 未在真实 PTC 宿主装载；工具层、plan 文件、模式切换**全部未验证**。
- 本报告不含任何安全结论。
