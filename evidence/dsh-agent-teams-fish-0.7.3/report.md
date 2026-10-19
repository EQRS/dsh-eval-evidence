# 标准测评报告 · dsh-agent-teams-fish 0.7.3（能力五状态：不适用；功能验证：通过）

> 依据：工程协议手册 v1.1 §2/§3/§6/§13；`测试/协议/判定与证据链规范-v1.md`。
> 本件不是配对实验（没有装/不装 D），而是**真实宿主功能验证**：用插件官方 `scripts/harness-runtime-verify.mjs` 在真实 DSH 0.2.1-rc.2 运行时上跑 8 类场景。

## 一、结论

**能力五状态：不适用**（宿主平面插件，配对任务的「不装组」无法组队）；**功能验证：通过**。

| 项 | 值 |
|---|---|
| 功能验证 | **通过**（10 runs / 81 条断言全 true，全部 exit 0、无超时） |
| 宿主 | @deepseek-ai/dsh **0.2.1-rc.2**（exact cohort **295** 个 @deepseek-ai/dsh* 包，registry 快照在证据里） |
| 插件 | dsh-agent-teams-fish **0.7.3**（npm pack tgz，sha256 前缀 2f4c34ad） |
| 平台 | win32 / node v24.21.0 |
| 模型 | 插件自带夹具（`fixtures/harness-runtime-llm.mjs`，确定性） |

## 二、为什么不是五状态

- 本插件 `inject = [tools, llm, subagents, systemPrompt, agents]`，工具（14 个 `agent_teams_*`）的执行依赖真实宿主服务。
- 「不装组」没有 agent 服务，无法创建团队 → 配对差测不出「插件让模型多做了什么」，只会得到「不装=0」的天花板，属错问题。
- 按规范，本件输出「功能验证 + 可用性」，不套五状态、不进入能力榜。

## 三、验证方法（官方脚本，可复现）

1. `npm pack` 插件 → tgz（32.3 MB，418 文件）。
2. `node scripts/harness-runtime-verify.mjs --host-version 0.2.1-rc.2 --artifact <tgz> --report-dir <dir>`：脚本从 npm 拉精确 cohort、`npm install` 出隔离 runtime、把插件装进 headless profile，逐场景起 `dsh --profile headless` 会话，断言读 `trace.jsonl`。
3. Windows 兼容补丁（**只动测试脚本，不动 lib/ 与被测代码**）：
   - `spawn-shim.cjs`：脚本用 `spawn("npm", ...)`（无 shell），Windows 解析不到 npm → 用 `cmd /c` 包装（NODE_OPTIONS=--require 注入）。
   - `symlinkSync(..., "dir")` → `"junction"`（2 处）：Windows 目录符号链接需开发者模式/管理员权限（EPERM）。
   补丁文件与 diff 随证据保存。

## 四、读数（10 runs / 81 断言）

| 场景 | 断言 | 结果 |
|---|---|---|
| lifecycle | 9 | 全 true |
| lifecycle-cold-restore | 5 | 全 true |
| fallback | 9 | 全 true |
| fallback-cold-restore | 5 | 全 true |
| failure | 6 | 全 true |
| captain-idle-wakeup | 8 | 全 true |
| progressive-entry | 5 | 全 true |
| web-approval | 13 | 全 true |
| protocol-compatibility | 9 | 全 true |
| stability | 12 | 全 true |

关键断言举例（stability）：lazy-start / running-plan-correction / steering / read-receipt-continuation / reassign / archive / batch-plan / terminal-evidence / report-retry / settlement-dedup 全通过；web-approval 的「审批前 idle、审批后唤醒、成员输出释放、重复审批 409、无效团队 404」全通过。

## 五、预注册

本件没有配对预注册：场景与断言由插件官方 verify 脚本内置（跑前固定），本次未改断言。可复现命令见第九节。

## 六、证据链（https，已上传并实测 200）

站点提交文本：`证据链_提交文本.txt`（8 行）。

- 被测 commit：https://github.com/Fish-under-sea/dsh-agent-teams-fish/commit/b5490e945a85c3906368b351c0be2f64ea38c6d4
- 全部证据：https://github.com/EQRS/dsh-eval-evidence/tree/main/evidence/dsh-agent-teams-fish-0.7.3
- 报告本体：https://github.com/EQRS/dsh-eval-evidence/blob/main/evidence/dsh-agent-teams-fish-0.7.3/report.md
- 结果：https://github.com/EQRS/dsh-eval-evidence/blob/main/evidence/dsh-agent-teams-fish-0.7.3/result.json
- 验证脚本流水（补丁说明）：https://github.com/EQRS/dsh-eval-evidence/blob/main/evidence/dsh-agent-teams-fish-0.7.3/windows-compat.diff
- 关键场景 trace（stability）：https://github.com/EQRS/dsh-eval-evidence/blob/main/evidence/dsh-agent-teams-fish-0.7.3/trace-stability.jsonl
- 关键场景 trace（web-approval）：https://github.com/EQRS/dsh-eval-evidence/blob/main/evidence/dsh-agent-teams-fish-0.7.3/trace-web-approval.jsonl
- 安装日志：https://github.com/EQRS/dsh-eval-evidence/blob/main/evidence/dsh-agent-teams-fish-0.7.3/install.stdout.log

## 七、遗留问题

1. **锚定**：上游 Fish-under-sea/dsh-agent-teams-fish @ `b5490e945a85c3906368b351c0be2f64ea38c6d4`（2026-10-18T06:21:36Z），tree 1218 files / 49,771,469 B，见 `raw/00-anchor.txt`。
2. 两个 Windows 兼容补丁改变了**测试脚本**的行为（spawn/symlink），已记录；未改断言逻辑。
3. 模型是夹具：本件验证的是「插件在真实宿主里按协议工作」，不是「模型用它的效果」。
4. 未验（官方脚本自述）：真实 provider API 与凭据、浏览器交互、其它操作系统、原生终端执行、真实用户数据迁移。
5. 证据目录本地 1.3 GB（含 runtime node_modules）；上传只含结果、trace 样本与补丁，不含 node_modules。

## 八、不适用条件

- 不能用于评价：模型实际使用 AgentTeams 完成任务的效率/质量（需配对实验，另立预注册）。
- 不能用于评价：非 Windows 平台、真实模型 provider、浏览器 UI。
- 本件不进入能力榜、不排名、不给总分。

## 九、复现

```bash
cd 外部插件/dsh-agent-teams-fish/dsh-agent-teams-fish-main
npm pack --pack-destination %TEMP%/at-pack
node scripts/harness-runtime-verify.mjs --host-version 0.2.1-rc.2 \
  --artifact %TEMP%/at-pack/dsh-agent-teams-fish-0.7.3.tgz \
  --report-dir 测试/dsh-agent-teams-fish/raw/60-eval-runtime
```

## 十、附录

- 快测底稿：[测评报告_dsh-agent-teams-fish_v0.1.md](测评报告_dsh-agent-teams-fish_v0.1.md)
- 本地读数：`raw/60-eval-runtime/result.json`（10 runs）、`registry-cohort.json`（295 包快照）、各场景 `trace.jsonl`。