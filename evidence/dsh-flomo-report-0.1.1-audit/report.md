# 深度审计：dsh-flomo-report 0.1.1（L3 · A 路径）

> 来源：站点 <https://review.lingshulab.com/plugins?cat=__none__>（2026/10/20 11:07，zhengjy01/dsh-flomo-report）。授权：六威胁全测、沙箱内（2026-10-20）。实验在 `%TEMP%\batch2` 内。

## 一、结论

| 项 | 值 |
|---|---|
| **能力判定** | **还说不准（工具注册已验，报告生成/同步未验）** |
| **安全结论（指定范围）** | 未测（静态：无遥测；同步目标由用户配置的 flomo API 决定） |

## 二、已验

- `apply(ctx, config={})` 在桩 ctx 下**注册 3 个工具**：`flomo_report`、`flomo_report_config`、`flomo_report_test`；并注册 systemPrompt 段 `plugin:dsh-flomo-report`（`_batch2_表面.log`）。
- 包信息：`deps=0`、`peers=3`、无 postinstall、sha1 `7ae5d37b…4ee24d` 与 registry 一致。
- `buildMemoBody(...)` 按我猜的参数返回 `undefined` ⇒ **入参形状未知，未继续测**（不判缺陷）。

## 三、六威胁

| # | 威胁 | 现状 |
|---|---|---|
| 1 | 提示注入 | **未测**；观察：报告正文会拼进 flomo 内容（功能本体） |
| 2 | 权限越界 | **未测** |
| 3 | 数据外传 | **未测**；**功能本体就是把会话报告发到用户配置的 flomo API**，需用户确认目标 URL 与密钥 |
| 4 | 破坏性操作 | **未测** |
| 5 | 凭据保护 | **未测**；flomo API URL/Key 由配置提供，是否明文落盘未验 |
| 6 | 供应链 | 静态：无第三方运行依赖、无 postinstall、sha1 与 registry 一致 |

## 四、不适用条件

- 未配置真实 flomo key；报告生成、去重、同步**全部未验证**。
- `buildMemoBody` 失败是入参猜错，不是缺陷。
