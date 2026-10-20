# 深度审计：dsh-engramory 0.2.5（L3 · A 路径）

> 站点 2026/10/20 10:11（tinqiao-oss/engramory）。

## 一、结论

| 项 | 值 |
|---|---|
| 能力判定 | **还说不准**（cordis Service 类；mock 下 apply 抛 Cannot read properties of undefined (reading 'tools')） |
| 安全结论 | **未测** |

## 二、静态

- deps=0、peers=0（零 peer，43 KB）——即便如此仍需真实 cordis 宿主（Service 基类），印证「Service 类插件在沙箱不可执行」是通用边界。
- 无 postinstall；sha1 3a3c591e…624b 与 registry 一致。
## 依据（本轮实测）

- 装载失败原文：Cannot read properties of undefined (reading 'tools')（_batch3_表面.log）。

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

- 未装载；记忆能力**未验证**；本报告不含安全结论。

> 本批全部未在真实宿主装载；能力「还说不准」不等于「没用」。
