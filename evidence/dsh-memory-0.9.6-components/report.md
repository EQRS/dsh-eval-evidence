# 灵枢大脑区组件测评报告 · dsh-memory 0.9.6（5 组件功能验证）

> 依据：工程协议手册 v1.1 §2/§3/§6/§13；`测试/协议/判定与证据链规范-v1.md`。
> 本件不是能力五状态：被测对象是库/运行时组件（md_cg / compiler / swarm / rust / hive），无「模型+工具 vs 裸模型」配对，按功能验证口径出结论。

## 一、结论

| 组件 | 结果 |
|---|---|
| **swarm**（蜂群运行时） | **24/24 全过**（`swarm/tests/test_*.py` 逐一跑） |
| **compiler**（中文编译器） | **31/31 全过**（`compiler/tests/test_*.py`） |
| **hive**（蜂巢并发引擎） | `test_exec_cmd.py` **ALL_PASS（16 例）**；runner 中 hive 组其余红项均为环境（HIVE_EXE 未构建 / 短名可执行） |
| **md_cg**（大脑本体） | runner 中 **628 PASS / 46 FAIL**（含全仓 scripts/hive/swarm 组），绝大多数失败为环境类；**发现 1 个可复现真缺陷：心跳调度源叠加（L5b 倍率 1.67x）** |
| **rust**（检索引擎） | `cargo test` **未能编译完成**（链接器找不到 .o/.rlib，路径含中文 + 并发编译），属环境/构建问题，未验 |

**一句话**：5 个组件里 2 个（swarm/compiler）全绿、1 个（hive）核心用例全绿、md_cg 发现 1 个真实缺陷、rust 构建未过（需短路径/单进程重跑）。

## 二、被测与锚定

- 仓库：`FuRongJun-1999/dsh-memory` @ `dcac0e795cd03923b2159e4218c76f7578b84efd`（2026-10-19T12:56:24Z），版本 **0.9.6**。
- 取件：gh-proxy 镜像 codeload tarball 38,623,919 B / sha256 `4004935364bb5ce665e0410f2c13cb6f2bf413c892f98065947d223d21687e6b`；解包 **3784 文件**。
- 环境：Windows 10.0.26200 x64 / node v24.21.0 / Python 3.12（DSH 自带）/ cargo 1.97.1。

## 三、方法与前置（重要）

- 按仓库 README「Python 测试约定」：`md_cg/` 等包内测试**必须以 `python -m` 从仓库根**运行；直接 `python md_cg/test_*.py` 会 ImportError（我首轮直接跑得到 76 假失败，已作废）。
- 全量入口：`python -m md_cg.run_tests --jobs 4`（md_cg + compiler + swarm 按存在性发现）。
- 测试跑法遵守仓库「子进程输出重定向到文件、不用管道」的约定（我只在 runner 外层重定向）。

## 四、读数

### 4.1 独立跑的组件（不受环境噪声干扰）

| 组件 | 读数 |
|---|---|
| swarm | 24/24 pass，0 fail |
| compiler | 31/31 pass，0 fail |
| hive `test_exec_cmd.py` | ALL_PASS（16 例） |

### 4.2 全量 runner（`python -m md_cg.run_tests --jobs 4`）

- 已执行 954 行输出：**628 PASS / 46 FAIL**（hive 收尾阶段卡住，人工停止；hive 组剩余用例未跑完）。
- 46 FAIL 分类（按块内错误特征）：
  - **env_yaml 8**：`ModuleNotFoundError: No module named yaml`（本机未装 PyYAML）——环境。
  - **env_git_or_exe 19**：`FileNotFoundError: CreateProcess`——测试 spawn 的短名可执行（git 等）不在 runner 的 PATH 里——环境（runner 启动时未加 tools 路径）。
  - **env_rust_bin 4**：需要 `rust/target/release/mdcg-eval.exe` 或 `hive/target/release/hive.exe`，未 `cargo build --release`——环境（设计上 fail-closed，不是缺陷）。
  - **anchor_missing 1**：`git show HEAD rc=128` / `ANCHOR-MISS`——tarball 快照无 `.git`，无法取修复前源做红基线自证——环境。
  - **other 14**：其中 **1 个已单独复现为真缺陷**（见第五节），其余待复核（未验证不写入）。

## 五、发现（P 级候选）

**P2-1 · 心跳调度源叠加（`md_cg/test_heartbeat_ledger.py` L5b）**

- 病象：`L5b 开态不叠加：开=10 关=6（倍率 1.67x，>1.6x 即两路各调度一次）`。
- 复现：`python -m md_cg.test_heartbeat_ledger` 单独跑，**exit 1，可稳定复现**（37 通过 / 1 失败）。
- 含义：开态心跳频率约为关态的 1.67 倍，超过守卫阈值 1.6x，提示「旧调度路径未退场、两路各调度一次」；这不是计时抖动（阈值已留 1.6x 余量）。
- 影响：心跳台账写入量/频率偏高，长跑可能加速分片轮转；不丢数据（L4 有界与 L1e 逐位一致仍通过）。
- 建议：检查 `_sustain` 心跳调度入口是否存在双注册（开关开时旧 job 未停）。

## 六、未验 / 不适用

- rust 组件：`cargo test --offline` 在长中文路径下链接器找不到中间产物（`.o`/`.rlib`），未完成编译；**未验**，需换短路径或单进程重试。
- `cargo build --release`（rust/hive）未执行 → 依赖 release 二进制的跨侧用例按设计 fail-closed。
- 本机未装 PyYAML / runner 未带 tools PATH → 8+19 个环境类失败；补装/补 PATH 后应消失（不代表插件缺陷）。
- 未验：真实 MCP 宿主端到端、`--serve` 并发、非 Windows 平台、全量 534+ md_cg 测试的完整收尾（runner 被人工停止）。
- 本件不进入能力榜、不排名、不给总分。

## 七、查重

- 站点：主创 `@furongjun1999/dsh-memory` 站内 `reviewed=false`（未评）；本件是首份第三方**组件级**测评。
- 账本：`dsh-memory` 相关 187 次命中**全部为 2026-10-12 及更早的历史 bounty 结算**（#11/#86/#61/#63/#105 等，对应旧版本缺陷）；本次是 **0.9.6 新版本组件测评**，不重复。
- 本地：`测试/dsh-memory/` 为 0.8.1 快测（旧版体验档），本次不重复。

## 八、复现

```bash
# 解包后，在仓库根：
python -m md_cg.run_tests --jobs 4      # 全量（md_cg + compiler + swarm）
python -m md_cg.test_heartbeat_ledger  # P2-1 单点复现（期望 exit 1）
cd rust && cargo test --offline        # 注意：长中文路径下需换短 target 或单进程
cd hive && python -m hive.test_exec_cmd
```

## 九、证据

- 本地：`测试/主创站筛选/raw/lingshu-v096-runner.log`（954 行全量输出）、`lingshu-v096-swarm-rust.json`、`lingshu-v096-repro.json`（heartbeat 复现）。
- 证据仓库（待上传）：`EQRS/dsh-eval-evidence/evidence/dsh-memory-0.9.6-components/`。