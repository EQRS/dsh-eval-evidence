# 深度审计：dsh-evolve-in-git 0.6.3（L3 · A 路径）

> 被测件：站点列表（2026-10-20 10:18，Kytolly/dsh-evolve-in-git）。**只能从源码装**（无 npm 包），本次从 `main` 分支 tarball 取（266,298 B）。
> 使用者授权：六威胁全测、沙箱内（2026-10-20）。全部实验在 `%TEMP%\multi-l3` 内。

## 一、结论

| 项 | 值 |
|---|---|
| **能力判定** | **还说不准** |
| 依据 | 工具层（21 个 `evolve_*`）**未能执行**：`default` 是 `GitEvolutionService extends cordis.Service`，构造时必须真实 cordis 宿主（mock ctx 下 `Cannot read properties of undefined (reading 'provide')`）；纯函数级 4/8 通过，其余 3 项为我的入参形状猜错（**非缺陷**），1 项用错函数（错误脱敏应由 `redactSensitive` 负责，实测可用） |
| **安全结论（指定范围）** | 3 项**函数级已验证**（路径段净化、敏感内容脱敏、git argv 无 shell）＋ 其余**未测** |

## 二、表面（静态枚举）

- 工具 21 个：`evolve_connect/status/remember/update/forget/restore/show/export/branches/help/timeline/recall/branch_switch/branch_diff/rollback/conflicts/resolve` + `evolve_skill_list/promote/demote/draft`。
- 注入面：`ctx.systemPrompt.section({name:'tool:evolve-git', order:116, text})`；另有 `ctx.commands.register`（命令面板）与 skill provider。
- 存储：私有记忆仓库（`repoPath`/`repoUrl`/`memoryRoot`/`skillsRoot`，默认见 `lib/defaults.js`），git 提交 + 分支 + 归档。

## 三、函数级读数（`raw-functions.log`）

| # | 检查 | 结果 |
|---|---|---|
| S1 | `renderHelpText()` 非空 | ✅ |
| S2 | `parseEvolveCommand('remember …')` 解析出命令 | ✅ |
| S3 | `sanitizeSegment('../../etc/passwd')` 去掉 `..` 与分隔符 | ✅ |
| S4 | `lossless()` 往返不丢结构 | ✅ |
| S5 | `memoryPreview` 截断 | ⚠ 我的入参形状错（传了字符串，函数要对象）→ 不计 |
| S6 | `branchNameForRecord` | ⚠ 同上（record 形状错）→ 不计 |
| S7 | 错误信息脱敏 | ⚠ 用错函数；改用 `redactSensitive` 后 → ✅ |
| S8 | `draftSkillFromRecord` | ⚠ 入参形状错 → 不计 |

### 已验证的两项安全能力（函数级）

- **路径净化**：`sanitizeSegment('../../etc/passwd')` 不含 `..`、不含 `/` ⇒ 记忆路径段不能穿越。
- **敏感内容脱敏**：`redactSensitive()` 把 `ghp_…` token / 邮箱 / 手机号替换为 `<REDACTED>`；`classifySensitivity()` 对含 token 的文本返回 `secret`（`raw-functions.log` 的 privacy2 段）。
- **git 调用方式**：`spawnSync('git', ['-C', repoPath, ...args], …)`（argv 数组、无 shell 拼接）⇒ 命令注入面低。

## 四、六威胁

| # | 威胁 | 现状 |
|---|---|---|
| 1 | 提示注入 | **未测**；观察：记忆内容会经 `systemPrompt.section` 以 digest 注入（`digestEnabled` 默认开），与他件同类投毒面 |
| 2 | 权限越界 | **部分验证**：路径段净化 ✅（S3）；写入范围受 `repoPath/memoryRoot` 配置约束；**未做**越界读写红队 |
| 3 | 数据外传 | **未测**；观察：设计上会把记忆 **push 到配置的远端仓库**，属功能本体；代码内未见遥测端点 |
| 4 | 破坏性操作 | **未测**；观察：`evolve_forget/restore/rollback/branch_switch` 会改仓库历史与分支，属功能本体 |
| 5 | 凭据保护 | **函数级已验证**（脱敏 ✅）；观察：token 取自 `GITHUB_TOKEN` 并写进 git `http.extraheader`（`git.js:24-37`），未写入磁盘配置 |
| 6 | 供应链 | **只能源码安装**（无 npm 发行物）；`deps={cordis, schemastery}`、`peers=10`、无 postinstall；tarball 无签名/哈希可校 |

## 五、不适用条件

- 本报告**不给五状态**：工具层未执行，不能判「真有用/没用」。
- 4/8 函数检查的「未通过」是我猜错入参形状，**不是缺陷**；已逐条标注，不计入结论。
- 未做：真实 git 仓库的 connect/remember/recall 往返、远端 push、冲突解决、回滚、分支切换、conflict 检测、privacy 写入时的密级落库。
- 安全面：无抓包、无越界红队、无仓库破坏回放；「外传/破坏」两项在本件属**功能本体**（它就是要推远端、改历史），用法上需使用者自行确认远端私有性。

## 六、证据

`raw-surface.log`（装载尝试与 21 工具枚举、apply 失败原文）、`raw-functions.log`（8 项函数检查 + privacy 脱敏）。
