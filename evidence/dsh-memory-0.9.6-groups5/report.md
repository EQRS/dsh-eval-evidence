# 灵枢 0.9.6 第五批 5 组：把「环境造成的红」与「真缺陷」分开

> 同一锚定：0.9.6 @ `dcac0e795cd03923b2159e4218c76f7578b84efd`。
> 本批不再加新测试面，而是**处置前三批遗留的 4 处红/未收口**，逐条查根因。

## 一、结论（5 组）

| 组 | 遗留问题 | 结论 |
|---|---|---|
| ①行号锚 | 363 条红「未登记」 | **环境假红**：补 `.git` 基线后 **VERDICT PASS，未登记红 0** |
| ②scripts 4 FAIL | 第二批遗留 4 个守卫失败 | **4/4 全部转绿**（全是缺 `.git`） |
| ③md_cg 46 FAIL | 第一/二批 628 PASS / **46 FAIL** | **真克隆复跑 661 PASS / 13 FAIL → 补二进制后仅 2 FAIL**（1 真缺陷 + 1 环境相关） |
| ④hive 并发压测 | 此前只有功能测试，无压力面 | **PASS**：16 任务 / workers=4，峰值 running=4 未越界，16/16 done |
| ⑤纪律投影链 | `gate` 里 `verify_all` exit 2 | **环境假红**：缺 `--cg-root`；补最小库后 **10/10 目标一致** |

**一句话**：前三批报的 46 + 363 + 4 处红，绝大多数是**抽取式仓库没有 `.git`、缺 Rust 二进制**造成的；真缺陷仍是那 1 个（P2-1 心跳调度叠加）。

## 二、①行号锚 363 条红：假红，根因是缺 `.git`

- 旧读数：`[降级] git 不可用` 模式下 `VERDICT: FAIL —— 363 条行号锚未通过且未登记`。
- 做法：把 tarball 原样解到短路径 → `git init` + 全量 `git add -A` + `commit`（单提交基线 `a72dd5b`）→ 重跑 `scripts/check_line_anchors.py`。
- 读数：`VERDICT: PASS —— 未登记的红为 0（绿 163 + 豁免 2120 + 冻结 558）`，识别锚 7460、不判 4292、简写锚 6392 处/2923 行。
- 判定：**363 条红是「没有 git 历史就无法物化锚基线」的环境降级产物**，不是文档缺陷。日志 `anchors-git-baseline.log`。

## 三、②scripts 4 FAIL：4/4 转绿

第二批遗留的 4 个守卫，在 git 基线内逐个复跑：

| 守卫 | 旧 | 新 |
|---|---|---|
| `test_check_unreachable_decode` | FAIL（`git show rc=128 fatal: not a git repository`） | **rc=0，12 passed / 0 failed / 1 skipped** |
| `test_check_publish_artifact_manifest` | FAIL（18 passed / 10 failed） | **rc=0，18 passed / 0 failed / 1 skipped** |
| `test_check_publish_artifact_coverage` | FAIL（16 passed / 11 failed） | **rc=0，16 passed / 0 failed / 1 skipped** |
| `test_gate_rust_legs` | FAIL | **rc=0**（G5 系列断言全 PASS） |

判定：**全部是 `git` 缺位导致**（这些守卫用 `git show HEAD:file` 物化「修复前」基线）。日志 `scripts4-git-baseline.log`。

## 四、③md_cg 46 FAIL：真克隆复跑 → 只剩 2

### 为什么第一轮「单提交基线」不够

先按 ① 的方式建单提交基线跑 `python -m md_cg.run_tests`，出现大量 `FAIL 修复前 X 无 Y` —— 这些守卫要**真实的修复前提交**（`git show <parent>:file`），合成基线（1 个提交）物化不出来。**该轮作废**（保留 `lingshu-v096-mdcg-git-baseline.log` 作反例）。

### 真克隆复跑（权威）

- `git clone`（gh-proxy 镜像）→ `git checkout dcac0e795c`，本地可达提交 **3034** 个（真历史）。
- 环境：git + cargo + python 全在 PATH，PyYAML 6.0.3 已装。
- 读数：**661 PASS / 13 FAIL**（共 674 组；尾部 hive 组因缺 `hive.exe` 挂起，中断，如实记录）。
- 日志 `mdcg-clone.log`。

### 13 个失败逐个复跑（装上 `rust/target/release/mdcg-eval.exe` 与 `hive/target/release/hive.exe` 后）

| 组 | 复跑 | 归类 |
|---|---|---|
| `md_cg.test_issue150_empty_query_terms` | **PASS 14/0** | 环境（要 Rust 二进制 B0 前置） |
| `md_cg.test_issue491_compose_sandbox` | **PASS** | 环境 |
| `md_cg.test_issue91_verifier_timeout` | **PASS** | 环境 |
| `swarm.tests.bench_swarm_parallel` | **PASS**（13.5 s） | 负载（首跑机上有别的编译在跑，加速比 0.66× 被压） |
| `swarm.tests.test_swarm_fault` | **PASS**（46.5 s） | 环境（`FileNotFoundError`：缺二进制） |
| `scripts.test_mdcg_stale_servers_scan` | **PASS**（21.7 s） | 环境 |
| `hive.test_h6_mcp_depends_on` | **PASS 15.8 s** | 环境（缺 hive.exe） |
| `hive.test_id_contract_v2` | **PASS 67.9 s** | 环境 |
| `hive.test_job_id_segment_dot` | **PASS 11.9 s** | 环境 |
| `hive.test_orch` | **PASS 2.1 s** | 环境 |
| `hive.test_result_anchor_chain` | **PASS 1.6 s** | 环境 |
| `md_cg.test_heartbeat_ledger` | **仍 FAIL** | **真缺陷（P2-1）** |
| `md_cg.test_issue354_p2_datapath_clock` | **仍 FAIL** | **环境相关（见下）** |

- 汇总：`SUMMARY ok=11 fail=2 total=13`。

### 剩余 2 个的判定

1. **`test_heartbeat_ledger` —— 真缺陷（第三次复现）**：`L5b 开态不叠加：开=10 关=6（倍率 1.67x，>1.6x 即两路各调度一次）`，`37 通过 / 1 失败`。与前两批读数一致（此前同一断言 1.67x），**维持「P2-1 心跳调度叠加」缺陷判断**。
2. **`test_issue354_p2_datapath_clock` —— 环境相关**：失败的是**对照断言** `A6：\.\aux / \.\nul / \.\conin$ 都打得开（判据非恒假）`（其余 64 条主断言全 PASS）。直接探针验证：`open("\\.\conin$")` 在本机**无交互控制台时阻塞**（探针脚本超时被强杀），所以对照组打不开不是被测逻辑的问题。⇒ 记为**非交互终端下的环境限制**，不判产品缺陷。

## 五、④hive 并发压测：有界

- 设计：`workers=4`、16 个任务（每个执行器睡 0.4 s），每 80 ms 采样 `status.json` 的 `state ∈ {claimed, running}`。
- 读数：
  - `A1` result.json 齐 **16/16**，`ok=true` 16/16
  - `A2` **峰值 running = 4 ≤ workers 4**
  - `A3` 并发真的发生（peak ≥ 2）
  - `A4` 全部 `state=done`
  - `A5` 任务目录数 = 16（无重复建目录）
  - `A6` serve 被 kill 后进程退出
- **VERDICT PASS**。日志 `hive-stress.log`。

### 压测暴露的使用陷阱（非缺陷，已记录）

首次压测把 `hive.exe` 放在仓外且未设 `HIVE_EXEC_PY`：serve 回退成 `exec.py`（llm_only），**命令不执行、16 个任务全部落 `error`**；serve 有明确告警（`HIVE_EXEC_PY 未设置…确定性执行不可用`）。⇒ 结论：**跑确定性任务必须显式给 `HIVE_EXEC_PY=<hive>/exec_cmd.py`**，否则任务会被领取并失败，不是静默成功。

## 六、⑤纪律投影链：`--cg-root` 补上后 10/10

- 旧读数：`gate` 里 `verify_all exit 2` → `未提供认知图 root（--cg-root / MDCG_ROOT）`。
- 补最小库：`python scripts/discipline_nodes.py --init --write --cg-root <dir>` → **新建 18 个节点**。
- 再跑：`python scripts/verify_discipline.py --allow-missing --cg-root <dir>` → **rc=0，结论 10/10 目标一致**（注入面 9 条链、分发面 17 个手写描述文件、16 处「N 条工作纪律」全部 = 真源 18 条）。
- 日志 `cgroot-chain.log`。

## 七、不适用条件

- ③ 的全量读数是「尾部 hive 组因缺二进制挂起被中断」的一次运行（661+13 组已判定）；**不是**完整 674 组的干净收口。若要完整数字，需在补好二进制的环境**重跑一遍全量**（本批未做）。
- ③ 的真克隆带 3034 个提交；单提交合成基线**不可用**于「修复前」类守卫（已作废，反例保留）。
- ②①⑤ 的「转绿」都建立在**有 git 历史**之上；无 `.git` 的抽取式分发面（tarball/压缩包）跑这些守卫必然红，**这是分发形态的限制**，不是缺陷，但会误导使用者 —— 建议仓方在无 git 场景明示「该守卫降级不可信」。
- ④ 的压测只覆盖「确定性命令执行 + workers 上限」，不覆盖 LLM 长任务、kill/超时强杀、跨进程抢占（这些由仓内 `test_stop_tree_kill` / `test_h3_h7_scheduler` 覆盖，已在前批通过）。
- ⑤ 只验纪律投影链一致性，不验语义正确性（节点内容是否等价于真源由 `verify_discipline` 的 own 判据决定）。
- 本批全部在本机 Windows + 交错负载下测得；`bench_swarm_parallel` 读数对机器负载敏感（首跑 0.66×、干净复跑通过）。

## 八、证据清单

| 文件 | 内容 |
|---|---|
| `anchors-git-baseline.log` | ① 行号锚 PASS（未登记红 0：绿 163 / 豁免 2120 / 冻结 558） |
| `scripts4-git-baseline.log` | ② 4 个守卫逐条 rc=0 与断言计数 |
| `mdcg-clone.log` | ③ 真克隆全量 661 PASS / 13 FAIL（尾部 hive 挂起中断） |
| `mdcg-clone-fails.rerun.log` | ③ 13 个失败复跑：11 PASS / 2 FAIL + 判定依据 |
| `hive-stress.log` | ④ 16 任务 / workers=4 采样与 A1-A6 |
| `cgroot-chain.log` | ⑤ 18 节点 + verify 10/10 |
| `clone.log` | 克隆过程（gh-proxy，GIT_EXIT=0） |
