# 深度审计：dsh-git-memory 0.8.1（L3 · A 路径）

> 站点 2026/10/20 10:13（seriousz158/dsh-memory）。

## 一、结论

| 项 | 值 |
|---|---|
| 能力判定 | **还说不准**（需 ctx.settings 服务；且包是 monorepo 布局，真实入口在 packages/dsh-git-memory/lib/index.js） |
| 安全结论 | **未测** |

## 二、静态

- deps=0、peers=9（settings / system-prompt / tools / llm…）、无 postinstall、sha1 6a045110…7d0 与 registry 一致。
- 装机后发现真实入口在嵌套 packages/ 下（发布物保留 monorepo 结构），裸包 exports 未指向该入口 ⇒ 按包名 import 会失败。这是**发布物布局观察**，宿主 loader 是否按 subpath 挂载未验证，故不判缺陷。
## 依据（本轮实测）

- 装载失败原文：Cannot find package '@deepseek-ai/dsh-settings'；补装后 apply 抛 Cannot read properties of undefined (reading 'settings')（_batch3_表面.log）。

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

- 未装载；git 记忆的写入/召回/分支**全部未验证**；「裸包入口不可直接 import」仅是装机观察。

> 本批全部未在真实宿主装载；能力「还说不准」不等于「没用」。
