# 深度审计：dsh-native-memory 0.2.0（L3 · A 路径）

> 站点 2026/10/19 23:10（highland0971/dsh-native-memory）。

## 一、结论

| 项 | 值 |
|---|---|
| 能力判定 | **还说不准**（Service 类；mock 下 apply 抛 Cannot read properties of undefined (reading 'get')） |
| 安全结论 | **未测** |

## 二、静态

- deps=1、peers=1、无 postinstall、sha1 9ccf4616…b4470 与 registry 一致。
- 「native memory」定位：与宿主内存/存储原生集成，必然依赖宿主服务。
## 依据（本轮实测）

- 装载失败原文：Cannot read properties of undefined (reading 'get')（_batch3_表面.log）。

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
