# 预注册 · dsh-flakefinder 标准测评 v0.2（装组修复后重跑，跑前冻结）

- 冻结时间：2026-10-19T17:02+08:00（本文件生成时间；正式实验 17:09 开跑）
- 被测件：dsh-flakefinder 0.3.5（锚定见 `测试/dsh-flakefinder/raw/00-anchor.txt`）
- 背景：v0.1 实验（`raw/12-eval/`，D=-8，判定「还说不准（精度不足）」）的装组用的是**手写包装** `flake_aggregate / flaky_flaky`，并未调用插件真实工具面（真实为 flaky_detect / flaky_history / flaky_quarantine / flaky_clear / flaky_report / flaky_health）→ 装组读数不代表插件能力，v0.1 结论作废、保留为历史。
- 本件（v0.2）改为：装组注入插件**真实** 6 工具 schema 与真实 execute；场景为真实 node:test 项目（fixture 按 plan.json 产生可控的通过/失败序列），装组由 flaky_detect 实际多次运行测试并读取 TAP 报告。
- 实验脚本：`测试/dsh-flakefinder/probes/experiment_flake2.mjs`（判分器 = 同文件 judge）；结果落盘 `raw/13-eval/result.json` + `calls.jsonl`。

## 一、指标与判定（沿用 dsh-sql / dsh-rss / dsh-ppt 口径）

- 配对正确差 D = Σ_scenario (装组正确数 − 不装组正确数)，8 场景 × 3 seed，范围 [−24, 24]。
- a = 12，b = 6；bootstrap 95% 区间半宽 ≤ 6（按场景重采样，B=10000，seed=20261019）。
- 判定：半宽 > 6 → 还说不准（精度不足）；L > 12 → 真有用；U < −6 → 帮倒忙；L > −6 且 U < 12 → 没啥差别；其余 → 还说不准。
- 模型 deepseek-flash，temperature 0.7，seed ∈ {101, 202, 303}。

## 二、场景（fixture = node:test 单文件，每轮状态由 plan.json + state.json 控制）

| # | plan（每测试 3 轮状态 P/F） | 期望 flaky 集合 | 题面要点 |
|---|---|---|---|
| S1 | alpha P P P；beta P P F；gamma P P P | {beta} | 哪些测试不稳定？ |
| S2 | alpha P F P；beta F P P；gamma P P P | {alpha,beta} | 哪些测试不稳定？ |
| S3 | alpha F F F；beta F F F；gamma P P P | {} | 有没有 flaky 测试？ |
| S4 | 全部 P P P | {} | 有没有 flaky 测试？ |
| S5 | alpha P F P；beta P P P；gamma P P P | {alpha} | 哪些测试不稳定？ |
| S6 | alpha F P P；beta P P P；gamma P P F | {alpha,gamma} | 哪些测试不稳定？ |
| S7 | alpha F P P；beta P F P；gamma P P P | {alpha,beta} | 哪些测试不稳定？ |
| S8 | alpha P P P；beta F F F；gamma P P P | {} | 哪些测试稳定通过、哪些稳定失败、有没有 flaky？ |

- fixture 生成：每个 (scenario, seed) 独立目录 `raw/13-eval/runs/<S>-<seed>/`，跑前重置 `state.json={run:0}`；装组与不装组使用同一 plan 的两份独立副本（保证看到的数据一致）。
- 装组：提示模型用 `flaky_detect`（target=`test.stability.test.mjs`，framework=node，runs=3）真实运行 3 轮；工具 schema 为插件真实 schema，execute 为插件真实实现（ProcessRunner 由 child_process 包装，argv 数组、无 shell）。
- 不装组：不给任何工具；把同一 plan 预跑的 3 轮 TAP 原始输出直接拼进 prompt；模型只能自行解析 TAP。
- 判分：两边都取模型最后一行 `ANSWER:` 的测试名集合，与期望集合**完全相等**记 1（NONE/无 → 空集）。装组未产出 ANSWER 记 0。

## 三、反作弊

1. 预注册与判分器跑前冻结；看到结果不改判据。
2. 不装组的 TAP 由脚本预跑生成（非人工编造），且与装组 plan 一致；不得只重跑差的一边。
3. 装组不得人工放置 flaky 结论；工具返回即插件真实输出。
4. 提示语中不出现期望集合。

## 四、口径与不适用

- 单模型单温度、单机 Windows、node:test 单一框架（pytest 路径未覆盖，见报告不适用条件）；未独立复核。
- 结论只在能力五状态框架内使用，不用于排名/总分。
