# 灵枢大脑区第三批 5 组报告 · dsh-memory 0.9.6（TS 桥接 / hive 全量 / 注入件 / 纪律 JSON / bench）

> 依据：工程协议手册 v1.1 §2/§3/§6/§13；`测试/协议/判定与证据链规范-v1.md`。
> 同一锚定：0.9.6 @ `dcac0e795c`。本批补测 TS 桥接层、hive 全量、多端注入件、纪律真源、公开 bench。

## 一、结论（5 组）

| 组 | 结果 |
|---|---|
| **TS 桥接层测试** | **27 tests / 23 pass / 4 fail**：`bridge.test.ts`「dispose 后进程应退出」断言失败（**候选真缺陷**）；host / prompt-safety / untrusted_memory 三件因缺 `@deepseek-ai/dsh-scope` 包（环境） |
| **hive 全量测试** | 前 5 个 `test_*.py` 全 PASS（chat / console_window / exec_cmd / exec_empty_response / exec_tools）；第 6 个（调度类）卡住（需 LLM/网络），**未完成** |
| **多端注入件一致性** | **4 端逐字节一致**：claude/CLAUDE.md、codex/AGENTS.md、codebuddy/CODEBUDDY.md、zcode/AGENTS.md 均 24,932 B / sha256 前缀 `9039a95195ee1bf4` |
| **纪律真源 JSON** | `docs/工作纪律_认知图条目_v1.1.json` 27,544 B / sha256 前缀 **`9486668b0dadac39`**；单条 `work_discipline`（content 748 字，覆盖 18 条纪律），与注入件同源 |
| **公开 bench（bench_p0）** | **exit 0** |

## 二、候选缺陷

**P3 候选 · bridge dispose 后进程未退出（`test/bridge.test.ts`）**

- 断言：`dispose 后进程应退出` → `true !== false`（5.2 s 内未退出）。
- 可能含义：dispose 未释放子进程/定时器/句柄（Windows 上常见于 spawn 的 stdin/stdout 未销毁）。
- 待复核：单跑该测试 + 检查 `bridge.ts` dispose 路径是否清理 `child` 与 timeout；本次未定位到具体源头，标为候选。

## 三、读数细节

### 3.1 TS 测试

- 命令：`node --import tsx --test test/<7 个关键文件>`（bridge / host / init / prompt-safety / untrusted_memory / issue563 双件）。
- 27 tests / 23 pass / 4 fail（47.8 s）。
- 失败三件（host / prompt-safety / untrusted_memory）日志一致报 `ERR_MODULE_NOT_FOUND: @deepseek-ai/dsh-scope`——npm install 时 peer 未装全，**环境**。

### 3.2 hive 全量

- 逐个 `python -m hive.test_*` 跑 39 个测试模块。
- 前 5 个全 PASS；第 6 个（字母序 `test_h3_h7_scheduler`）长时间无输出后人工停止——该组需要 LLM/调度桩，**未完成**。

### 3.3 注入件与纪律真源

- 4 端注入件 sha256 完全相同 → 渲染一致（与第二批 `render_discipline --all` exit 0 吻合）。
- 纪律真源指纹 `9486668b0dadac39` 与本工作台 DSH 端系统提示里标注的「真源指纹 SHA256 前16位」**一致**——说明两端使用同一份真源。

## 四、遗留与不适用

- TS 的 bridge dispose 断言失败未定位源头，标 P3 候选（不写成确定缺陷）。
- hive 全量未跑完（第 6 个起需 LLM/网络）。
- 注入件一致性只比 4 个 full 变体；`claude/linghu-memory`、`codex/linghu-memory` 的 skill 变体未逐一比对。
- bench 只跑 bench_p0；其余 bench（bm25/locomo/membench 等）需公开数据或 LLM，未跑。
- 本批不进入能力榜、不排名、不给总分。

## 五、查重

- 与上两批同一锚定（同一 commit）；站点 `reviewed=false`；账本历史 settle 不重复；本地 0.8.1 快测不重复。

## 六、证据

- 本地：`测试/主创站筛选/raw/lingshu-v096-ts-tests.log`、`lingshu-v096-hive-all.log`、`lingshu-v096-inj-disc.json`、`lingshu-v096-bench-p0.log`。
- 证据仓库：`EQRS/dsh-eval-evidence/evidence/dsh-memory-0.9.6-groups3/`。