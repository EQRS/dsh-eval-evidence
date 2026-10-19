[intake 输入] 【测评报告】dsh-agent-teams-fish 0.7.3 体验快测（多智能体团队协作 · 方法试验）

<!-- intake:v1 {"project":"bench","difficulty":"medium","impact":"B","target":"Fish-under-sea/dsh-agent-teams-fish","form":"intake"} -->

<!-- 协议对齐：工程协议手册 v1.1（r2）§6 体验快测档；协议文件 sha256 8dd51cbf75b259c5dabfdb928eb112364231b5d8f9f580759534e5d78a34d849 -->
> **协议对齐（v1.1 · r2 · 体验快测档）**：本件是**体验快测**（手册 §6），只记录安装/功能点/卸载残留类检查结果；
> **不生成五种能力状态标签、不进入能力榜、不以「通过/合格」作为插件结论**；未覆盖项见「诚实边界」。
> - **协议绑定**：`工程协议手册-v1.1⟧（r2），sha256 `8dd51cbf…d849⟧（快照 `测试/协议/⟧）。
> - **插件身份**：源码版（commit + 逐文件树指纹），见「锚定提交」。
> - **环境配置 ID**：dsh 0.2.1-rc.2 / win32-x64 / Windows 10.0.26200 / node v24.21.0 / model=n/a。
> - **安全口径（§4 三分法）**：本件**未做**六威胁安全审计 ⇒ 安全结论 = **未测**。
> - **时效（§13.7）**：测评完成后 90 个自然日内有效。

## 性质声明

本件是**给主创测评站 <https://review.lingshulab.com> 的投稿测评**（intake 输入，外部贡献申报），不是悬赏：
**不 /claim、不自行加 bounty 标签**；计分、档位与是否归并均由维护者裁定（marker 的 difficulty/impact 仅为 intake 格式字段）。

- 被测对象：站点「dsh-agent-teams-fish」详情页（清单版本 **0.7.3**）；源码取默认分支 `main⟧ commit `b5490e94⟧ 的 tarball 解包快照。
- **未把插件装进任何正在使用的 DSH profile**：读数来自源码快照 + 构建/类型检查 + 仓库自带离线验证 + 直接 `import lib/*.js⟧ 的探针（临时目录）。
- **仅 Windows**（10.0.26200 x64）：不对其它平台下结论。
- 不排名、不给总分、不用星级；不改被测源码、不提 PR、不做安全渗透。
## 锚定提交

- 仓库：`Fish-under-sea/dsh-agent-teams-fish⟧，默认分支 `main⟧
- commit：`b5490e945a85c3906368b351c0be2f64ea38c6d4⟧（2026-10-18T06:21:36Z）
- 逐文件树指纹：**1,218 文件 / 49,771,469 B / sha256 `7398113882047610⟧**
- tarball：`外部插件/dsh-agent-teams-fish/dsh-agent-teams-fish.tgz⟧，sha256 `a2b83de63399…⟧
- 快照目录：`外部插件/dsh-agent-teams-fish/dsh-agent-teams-fish-main⟧

## 环境与基线

| 项 | 值 |
|---|---|
| 宿主 | DSH desktop **0.2.1-rc.2** |
| 平台 | Windows 11 10.0.26200 x64 |
| Node / pnpm | v24.21.0 / 11.28.5 |
| 运行依赖 | **0**；devDependencies 35 个（`@deepseek-ai/dsh-*⟧ 0.2.0-rc.2 全家桶、React、tsdown、TypeScript） |
| 基线 | 临时目录 + 仓库自带 `scripts/verify.mjs⟧ 离线 smoke |

## 结果速览

| 面 | 结果 |
|---|---|
| 依赖安装 | **exit 0**，66.1 s（35 包） |
| 构建（`build⟧） | **exit 0**，10.2 s |
| 类型检查（host + client） | **exit 0**，7.9 s |
| 仓库自带离线验证（`scripts/verify.mjs⟧） | **exit 0**，5.9 s，全部 PASS |
| 独立探针（15 断言） | **15 / 15 通过** |

## 逐项读数

### 1. 安装 / 构建 / 类型检查（`raw/02-install.txt⟧、`raw/03-build.txt⟧、`raw/05-typecheck.txt⟧）

```
install:   exit 0  66.1 s   + @deepseek-ai/dsh-* 0.2.0-rc.2（22 个）、react 18.3.1、tsdown 0.22.2、typescript 5.9.3
build:     exit 0  10.2 s   clean-build → tsc(host) → tsc(client) → tsdown → git-artifacts
typecheck: exit 0   7.9 s   tsc -p tsconfig.json --noEmit && tsc -p tsconfig.client.json --noEmit
```

### 2. 仓库自带离线验证（`raw/04-verify.txt⟧）

```
command: node scripts/verify.mjs
exit: 0    seconds: 5.9
… PASS  approval model preflight rejects an unlisted typo before spawn
… PASS  cold-resumed child restores provider, model, and reasoning from team.json
8/8 state-file atomic write hardening (Windows EPERM fallback)
… all checks passed
```
### 3. 独立探针（`raw/06-probe.txt⟧ → `raw/10-probe-final.txt⟧）

探针：`probes/probe_agent_teams_fish.mjs⟧，**15/15 通过**（内部模块探针，非插件公开 API）：

- **键名归一**：`sanitizeKey⟧ 处理空白/大小写、保留中文、纯符号回落 `k-<hash>⟧。
- **状态往返**：`createTeamDir⟧ → `readTeam⟧ 字段一致；缺失团队返回 `undefined⟧。
- **信箱**：串行 3 条顺序正确；**持 `withTeamLock⟧ 并发 10 条全部保留**；
  无锁直接并发 10 条只保留 1 条（记录内部函数契约：调用方须持锁）。
- **状态机**：同态无错；`completed⟧ 回退被拒；未知状态抛 `TypeError⟧（内部函数，调用方类型约束）。
- **依赖判定**：`unsatisfiedDependencies⟧ 正确指出未完成项。
- **诊断与归档**：`describeTeamStateDefect⟧ 能指出缺失字段；`archiveTeamDir⟧ 后原目录消失、`readArchivedTeam⟧ 可读回。

> 方法学说明：探针经三轮修正（补 `name/captainSessionId/createdAt/taskSeq⟧ 必填字段、区分合法状态、
> 把并发用例改为持锁调用），失败读数全部保留（`raw/06-probe.txt⟧、`raw/07-probe-fixed.txt⟧、`raw/08-probe-fixed2.txt⟧、`raw/09-probe-fixed3.txt⟧）。
## 发现

### P3-1 · transitionError 对表外状态抛 TypeError，而不是返回错误串

- **现象**：调用 transitionError 传入表外状态（如 done → claimed）时抛
  Cannot read properties of undefined (reading includes)（`raw/09-probe-fixed3.txt⟧）。
- **根因**：TASK_TRANSITIONS 只覆盖 pending/claimed/in_progress/completed/failed/cancelled，
  函数直接读 TASK_TRANSITIONS[current].includes(...)，未做键存在性检查。
- **影响**：内部函数，两处调用点的 task.status 由类型约束保证在表内，正常路径不触发；
  但若外部状态文件含历史/非法状态，诊断会退化为 TypeError 而非可读错误。
- **建议**：加一行键存在性判断，返回 unknown task status 的可读错误。

### 已验的正面结论

- **Windows 落盘加固**：自带 verify 覆盖 8 条状态文件原子写/EPERM 回退断言，全部通过。
- **锁语义**：withTeamLock 下 10 条并发信箱写入零丢失（探针实测）。
- **状态诊断**：describeTeamStateDefect 能指出具体缺失字段（tasks is missing），不是笼统报错。

## 诚实边界

- **已验**：依赖安装、构建、host/client 类型检查、仓库自带 scripts/verify.mjs（离线 smoke）、
  15 条独立探针（键名/状态/信箱/锁/状态机/归档）。
- **未验**：真实 DSH 会话内多智能体组队与模型调用；`pnpm verify⟧ 全链（26 个子验证，只跑了第一个 verify.mjs）；
  client 界面（React 侧栏/头像）；真实子代理 spawn 与模型路由；卸载残留；非 Windows 平台；长时压测。
- **不确定**：@deepseek-ai/dsh-* 版本与宿主 0.2.1-rc.2 的兼容面（devDeps 为 0.2.0-rc.2）；
  多实例并发下的锁竞争。
- **不做**：不排名、不给总分、不用星级；不做安全渗透；不改被测源码、不提 PR；不装进 live profile。
## 查重

- 账本（595 事件）：`dsh-agent-teams-fish⟧ **0 命中**。
- 全仓 md（3,048 个，排除 `node_modules⟧/`外部插件⟧/本件目录）：**0 命中**（`raw/09-dedupe-grep.txt⟧）。
- 站点：`plugins.json⟧ 中 **reviewed=false**。
- 结论：未见同件。

## 复现步骤

```bash
# 锚定：Fish-under-sea/dsh-agent-teams-fish @ b5490e945a85c3906368b351c0be2f64ea38c6d4
pnpm install --frozen-lockfile
pnpm run build
pnpm run typecheck
node scripts/verify.mjs
node probes/probe_agent_teams_fish.mjs
node ../tools/make_manifest.mjs --raw raw --label "dsh-agent-teams-fish 0.7.3"
```

## 一句话总结

**dsh-agent-teams-fish 0.7.3 依赖可装（66 s）、构建与 host/client 类型检查全过、仓库自带离线验证全 PASS；
15 条独立探针验证了键名归一、状态往返、持锁并发零丢失、状态机与归档。唯一发现是 P3：
内部函数 transitionError 对表外状态抛 TypeError。真实多智能体组队与全 verify 链未验。**

## 证据链（https，站点提交用）

| # | 说明 | 链接 |
|---|---|---|
| 1 | 被测 commit（锚定） | https://github.com/Fish-under-sea/dsh-agent-teams-fish/commit/b5490e945a85c3906368b351c0be2f64ea38c6d4 |
| 2 | 全部证据 | https://github.com/EQRS/dsh-eval-evidence/tree/main/evidence/dsh-agent-teams-fish-0.7.3 |
| 3 | report.md | https://github.com/EQRS/dsh-eval-evidence/blob/main/evidence/dsh-agent-teams-fish-0.7.3/report.md |
| 4 | raw-00-anchor.txt | https://github.com/EQRS/dsh-eval-evidence/blob/main/evidence/dsh-agent-teams-fish-0.7.3/raw-00-anchor.txt |
| 5 | raw-manifest.txt | https://github.com/EQRS/dsh-eval-evidence/blob/main/evidence/dsh-agent-teams-fish-0.7.3/raw-manifest.txt |
| 6 | probe_agent_teams_fish.mjs | https://github.com/EQRS/dsh-eval-evidence/blob/main/evidence/dsh-agent-teams-fish-0.7.3/probe_agent_teams_fish.mjs |
| 7 | 04-verify.txt | https://github.com/EQRS/dsh-eval-evidence/blob/main/evidence/dsh-agent-teams-fish-0.7.3/04-verify.txt |
| 8 | 02-install.txt | https://github.com/EQRS/dsh-eval-evidence/blob/main/evidence/dsh-agent-teams-fish-0.7.3/02-install.txt |

站点证据框格式：**每行一条 `URL` 或 `URL | 备注`**，最多 10 条；可直接粘贴 `证据链_提交文本.txt`。

```text
https://github.com/Fish-under-sea/dsh-agent-teams-fish/commit/b5490e945a85c3906368b351c0be2f64ea38c6d4 | 被测 commit（锚定）
https://github.com/EQRS/dsh-eval-evidence/tree/main/evidence/dsh-agent-teams-fish-0.7.3 | 全部证据
https://github.com/EQRS/dsh-eval-evidence/blob/main/evidence/dsh-agent-teams-fish-0.7.3/report.md | report.md
https://github.com/EQRS/dsh-eval-evidence/blob/main/evidence/dsh-agent-teams-fish-0.7.3/raw-00-anchor.txt | raw-00-anchor.txt
https://github.com/EQRS/dsh-eval-evidence/blob/main/evidence/dsh-agent-teams-fish-0.7.3/raw-manifest.txt | raw-manifest.txt
https://github.com/EQRS/dsh-eval-evidence/blob/main/evidence/dsh-agent-teams-fish-0.7.3/probe_agent_teams_fish.mjs | probe_agent_teams_fish.mjs
https://github.com/EQRS/dsh-eval-evidence/blob/main/evidence/dsh-agent-teams-fish-0.7.3/04-verify.txt | 04-verify.txt
https://github.com/EQRS/dsh-eval-evidence/blob/main/evidence/dsh-agent-teams-fish-0.7.3/02-install.txt | 02-install.txt
```
