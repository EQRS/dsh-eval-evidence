# 灵枢大脑区第四批 5 组报告 · dsh-memory 0.9.6（检索引擎 / rust crate / hive 全量 / TS 全量 / 多端接入）

> 同一锚定：0.9.6 @ `dcac0e795c`（tarball sha256 `4004935…87e6b`，3784 文件）。
> 依据：`测试/协议/判定与证据链规范-v1.md`；本批只做**仓内可离线复跑的验证面**，不涉及站点插件条目重复。

## 一、结论（5 组）

| 组 | 范围 | 结果 |
|---|---|---|
| ①检索引擎验收 | `tests/test_*.py` 19 个验收入口 | **19/19 全过**（173 条子断言 + 14 条 unittest，0 失败） |
| ②rust crate 重测 | `rust/`（mdcg-eval 0.2.0，零第三方依赖） | **构建成功 38.6 s，4 个测试全过**（前批「长中文路径链接错误」**根因非缺陷**，见 §2） |
| ③hive 全量其余 | `hive/test_*.py` 其余 37 个 | **37/37 全过，867 条断言 0 失败**（首跑 29/37 是环境前置缺失，见 §3） |
| ④TS 全量 | `test/*.test.ts` 全 47 文件 | **204 项：run2 0 失败**；run1 有 1 次 load 敏感抖动（见 §4） |
| ⑤多端接入 | claude / codebuddy / codex / zcode / dsh | 注入件字节一致、3 模板合规、**MCP 真握手 cg/stg 两工具**；1 处清单口径待确认（见 §5） |

## 二、①检索引擎验收：19/19

覆盖 BM25 水合/池视图、RRF 合格 topk 与去重投票、链式最优优先/候选域、子图有界 BFS、信任有界前沿、结构层级审计图、快照形状与准入、JSONL 提交水位、派生缓存代际、时区块/时区规范化、live 有效期缓存、qmd、查询摘要、reach 快照准入。

- 读数：19 个文件全 `rc=0`；`通过 173 / 失败 0`（16 个汇总块）+ 14 条 unittest `ok`。
- 日志：`tests-group.log`。

## 三、②rust crate：构建成功、4 测试全过

### 读数

- 布局：`<短路径>/rust` + `<短路径>/md_cg/semantic`，`CARGO_TARGET_DIR` 指短路径 → `cargo test --release`：**exit 0，38.59 s**，2（lib）+1+1 = **4 tests 全 ok**。
- 日志：`rust-test.log`。

### 前批「链接错误」的根因（更正）

不是工具链或代码缺陷，是**两条环境前提**同时不满足：

1. **路径过长**：在长中文路径下 LTO 产物链接失败；换到短路径即通过（同 hive 的做法一致）。
2. **crate 不是自包含的**：`src/atoms.rs:298` 用 `include_str!("../../md_cg/semantic/unify_fixture.json")` **编译期内嵌仓内文件**；只把 `rust/` 单独拷出会直接编译失败（`系统找不到指定的路径`）。必须按原仓相对布局带上 `md_cg/semantic/`。

> 由此给出**轻度打包面问题**（非功能缺陷）：`rust/` 与 `hive/` 都依赖仓内文件（hive 侧为 `src/job.rs` 的 `../id_charset_blocks.txt`、`../id_contract_corpus_v2.txt`），两 crate **无法脱离仓库单独发布**；对「crate 可独立 crates.io 发布」的场景不成立。

## 四、③hive 全量其余 37 个：37/37、867 断言

### 首跑 → 复跑

- 首跑（无 `hive.exe`、PATH 无 git、单文件直跑）：**29/37**。8 个失败**全部归因为环境前置**：
  - 4 个要 `hive/target/release/hive.exe`（`test_h6_mcp_depends_on`、`test_id_contract_v2`、`test_job_id_segment_dot`、`test_n232_anchor_expectation`）
  - 3 个要 `git` 在 PATH（`test_wm_conflict/progress/traversal` 建临时 wm 仓）
  - 1 个需**模块方式**运行（`test_issue557…` 用相对导入，须 `-m hive.<name>`；文件头「生效条件」已写明）
- 复跑（补 `hive.exe`、git 入 PATH、Python 运行时目录入 PATH、issue557 走 `-m`）：**37/37 全过，867 条 `[ok]`、0 条 `[FAIL]`**。

### 副产品：安全闸真实生效

`test_n232` 首跑暴露出 `exec_cmd.command_root_gate` 的实际判据——允许根 = `dirname(sys.executable)` 与系统临时目录；spec 里写死另一条路径的 Python 会被拒（`不在允许根内 … 池内 spec 不得执行任意路径的程序`）。这是**设计意图**，不是缺陷；但意味着**同一池必须在同一解释器下运行**，否则「合法命令」会被根闸拦下（使用注意，已写入不适用条件）。

- 日志：`hive-rest.log`（首跑）、`hive-rest2.log`（复跑，权威）。

## 五、④TS 全量 204 项：run2 零失败

- 命令：`node --import tsx --test "test/*.test.ts"`（47 个文件；8 个 `@deepseek-ai/*` peer 已在第三批装齐）。
- run1（机器同时跑 rust/hive 编译，重负载）：204 项 → **203 pass / 1 fail**，唯一失败是 `bridge.test.ts` 的 `dispose：进程优雅退出`（`AssertionError: dispose 后进程应退出`，5.8 s 处）。
- run2（机器空闲）：**204 项 / 203 pass / 0 fail**，`EXIT=0`，47.7 s。
- 单文件复跑：`test/bridge.test.ts` **7/7 通过**，dispose 断言 5.82 s **通过**。

**判定**：该断言是**时间窗敏感**（等进程退出，5 s 量级），在 CPU 被 cargo 编译抢占时可能超窗。两跑一过一不过 + 单文件稳定通过 ⇒ 记为**负载敏感抖动**，**不判产品缺陷**；若要定 flaky 需 ≥5 跑统计（本批未做，如实标注）。

## 六、⑤多端接入：注入件一致、模板合规、MCP 真握手

1. **注入件字节一致**：`claude/CLAUDE.md`、`codebuddy/CODEBUDDY.md`、`codex/AGENTS.md`、`zcode/AGENTS.md` 四件均 **24,932 B，sha256 前 16 位 `9039a95195ee1bf4`**；内含 18 条纪律（条号去重 18、出现 36 次），CCG/触发/声明俱全。
2. **模板合规**：3 份 MCP 模板（`claude/mcp.json.example`、`codebuddy/mcp.json`、`codex/config.toml.example`）JSON/TOML 可解析，**0 处本机绝对路径**，占位符 `REPLACE_WITH_*` 齐（3/2/2 处）。
3. **MCP 真握手**：以 `PYTHONPATH=<repo>`、`MDCG_ROOT=<空临时目录>` 起 `python -m md_cg.mcp_server`，`initialize` 返回 `protocolVersion 2024-11-05`、`serverInfo mdcg-mcp`；`tools/list` 返回 **2 个工具 `[cg, stg]`**，与 DSH 端注入声明「core = cg/stg 两基元」一致；stderr 自报 `render_version=2` 与延迟导入代校验（517 项 / 52 模块）。
4. **两份清单的路径口径不一致（待主创确认，未判缺陷）**：`.claude-plugin/marketplace.json` 的 `source: ./claude/lingshu-memory` 只在「相对仓根」解析时存在；`.agents/plugins/marketplace.json` 的 `source: ../../codex/lingshu-memory` 只在「相对清单目录」解析时存在。两套宿主规范不同，本机无 Claude Code / Codex 宿主可判 → 记为待确认项，不判缺陷。

- 日志：`mcp-handshake.log`。

## 七、环境前置（复跑清单）

| 需要 | 说明 |
|---|---|
| Rust 工具链 | `cargo 1.97.1`；构建 `rust/`、`hive/` 时用**短路径** `CARGO_TARGET_DIR` |
| 仓内内嵌文件 | `rust/` 需同仓 `md_cg/semantic/unify_fixture.json`；`hive/` 需 `hive/id_charset_blocks.txt`、`hive/id_contract_corpus_v2.txt` |
| `hive/target/release/hive.exe` | 13 个 hive 测试的前置；`cargo build --release`（21.7 s）后拷入 |
| `git` 在 PATH | 3 个 wm 测试建临时仓 |
| Python 在 PATH 且与 `sys.executable` 同一解释器 | `exec_cmd` 根闸按 `dirname(sys.executable)` 判允许根 |
| 8 个 `@deepseek-ai/*` peer | TS 全量前置（第三批已装） |

## 八、不适用条件

- 本批只覆盖**测试面**，不覆盖 LLM 实际调用质量（桩执行器为主）、不覆盖站点插件发布形态。
- ①的 19 个是 `md_cg` 守卫的验收包装；md_cg 全量 628 PASS/46 FAIL 的读数是**另一口径**（第一/二批），两者不可相加。
- ②③的构建结论只在「零第三方依赖 + 短路径 + 仓内布局完整」下成立；单 crate 独立发布形态**不成立**（内嵌文件）。
- ④的「0 失败」是 1 次空闲机跑数；`dispose` 断言的 flaky 率未定量（需 ≥5 跑）。
- ⑤未覆盖宿主侧真实加载（本机无 Claude Code / Codex / CodeBuddy / ZCode 宿主），MCP 握手是协议层验证，非宿主集成验证。
- ⑤的 marketplace 清单路径口径未判定（缺宿主规范）。

## 九、证据清单

| 文件 | 内容 |
|---|---|
| `tests-group.log` | ①19 个验收入口逐文件 rc + 断言汇总（173 通过/0 失败 + 14 unittest） |
| `rust-test.log` | ②release 构建 38.59 s + 4 tests 全 ok |
| `hive-rest.log` | ③首跑 29/37 与 8 条环境失败原文 |
| `hive-rest2.log` | ③复跑 37/37、867 条 `[ok]`（权威） |
| `ts-full.log` | ④run1 204 项（203 pass / 1 dispose 抖动） |
| `ts-full2.log` | ④run2 204 项 / 0 失败 / EXIT=0（权威） |
| `ts-bridge-alone.log` | ④bridge 单文件 7/7（dispose 通过） |
| `mcp-handshake.log` | ⑤MCP initialize + tools/list 原文 |
