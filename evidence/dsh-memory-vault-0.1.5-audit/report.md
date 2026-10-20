# 深度审计：dsh-memory-vault 0.1.5（L3 · A 路径）

> 站点 2026/10/20 11:09（xs1023/dsh-memory-vault）。

## 一、结论

| 项 | 值 |
|---|---|
| 能力判定 | **还说不准**（依赖 ctx.storageDomain 服务；mock 下 apply 抛 Cannot read properties of undefined (reading 'storageDomain')） |
| 安全结论 | **未测** |

## 二、静态

- deps=2、peers=6（含 storage-domain / storage / json 等）、无 postinstall、tarball sha1 05f5d7ea…3ae6 与 registry 一致。
- 服务型依赖明确 ⇒ 想验必须给真 storageDomain。
## 依据（本轮实测）

- 装载失败原文：Cannot read properties of undefined (reading 'storageDomain')（_batch3_表面.log）。

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

- 未装载；记忆写入/检索/隔离**全部未验证**；本报告不含安全结论。

> 本批全部未在真实宿主装载；能力「还说不准」不等于「没用」。
