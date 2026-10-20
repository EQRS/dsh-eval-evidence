# 深度审计：dsh-followup-prompt 0.1.1（L3 · A 路径）

> 来源：站点 <https://review.lingshulab.com/plugins?cat=__none__>（2026/10/20 00:00，keliwang/dsh-followup-prompt）。授权：六威胁全测、沙箱内（2026-10-20）。实验在 `%TEMP%\batch2` 内。

## 一、结论

| 项 | 值 |
|---|---|
| **能力判定** | **还说不准（依赖宿主 effect/llm 才能装载）** |
| **安全结论（指定范围）** | 未测（静态：无网络代码路径证据） |

## 二、依据

- 包导出 `./host/index.js`，导出 `apply/inject/name`；`apply` 在桩 ctx 下抛 `Cannot read properties of undefined (reading 'effect')`，**未能注册任何工具/注入**（`_batch2_表面.log`）。
- 功能是「压缩后预测你的下一条消息」→ 必然依赖 llm 服务与真实会话状态，沙箱不能替代。
- 包信息：`deps=0`、`peers=2`（dsh-llm、schemastery）、无 postinstall、sha1 `411cd30c…b3540e3` 与 registry 一致。

## 三、六威胁（全部未测）

| # | 威胁 | 现状 |
|---|---|---|
| 1 | 提示注入 | **未测**（预测文本/上下文会进 prompt） |
| 2 | 权限越界 | **未测** |
| 3 | 数据外传 | **未测**（静态未见网络调用；预测若走远端模型则外传内容属模型调用面） |
| 4 | 破坏性操作 | **未测** |
| 5 | 凭据保护 | **未测** |
| 6 | 供应链 | 静态：无第三方运行依赖、无 postinstall、sha1 与 registry 一致 |

## 四、不适用条件

- 未在真实宿主装载；预测质量、误触发、token 成本**全部未验证**。
- 本报告不含任何安全结论。
