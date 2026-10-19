# 预注册 · dsh-code-review 标准测评 v0.1（跑前冻结）

- 冻结时间：2026-10-19T18:35+08:00（文件写入时间；实验 18:37 起跑）
- 被测件：dsh-code-review v0.1.1（tag v0.1.1 = commit c8ce29ddd34f07d04bc1e370341ad1a0093803d3，见 测试/dsh-code-review/raw/19-upstream-anchor.txt）；引擎 codecheck-v011.exe（v0.1.1 构建产物）
- 实验脚本：测试/dsh-code-review/probes/experiment_code_review.mjs（判分器 = 同文件 judge）；结果 raw/21-eval/result.json + calls.jsonl

## 一、假设与指标（沿用本工作台口径）

- D = Σ_scenario (装组正确数 − 不装组正确数)，8 场景 × 3 seed，范围 [−24, 24]。
- a = 12，b = 6；bootstrap 95% 区间半宽 ≤ 6（按场景重采样，B=10000，seed=20261019）。
- 判定：半宽 > 6 → 还说不准（精度不足）；L > 12 → 真有用；U < −6 → 帮倒忙；L > −6 且 U < 12 → 没啥差别；其余 → 还说不准。
- 模型 deepseek-flash，temperature 0.7，seed ∈ {101, 202, 303}。

## 二、任务契约

- 每个场景 = 临时 git 仓库：先提交干净版本，再写入含 1 个注入缺陷的改动（S8 为干净改动）。
- 装组：注入插件工具 code_review（参数 repo_path / mode / focus），执行 = 插件底层引擎 CLI「codecheck review --repo <dir> --concurrency 1 --audience agent」（与插件 buildReviewArgs 同参数），LLM 端点 = DeepSeek（与插件 prepareEngineEnv 同注入方式）。工具返回引擎 findings 文本。
- 不装组：无工具；把同一改动（文件内容 + 说明）作为文本给模型，自行判断。
- 判分：模型最后一行 ANSWER: 中是否命中期望缺陷类型关键词（命中即对）。
  - 关键词表（中英任一命中）：
    - secret：硬编码 / hardcoded / 密钥 / secret / api key / 泄露
    - sqli：sql 注入 / sql injection / injection / 拼接 / 参数化 / parameterized
    - traversal：路径遍历 / traversal / 目录穿越 / ../ / 越权
    - cmdi：命令注入 / command injection / os.system / shell / exec
    - nullref：判空 / 未判空 / null / undefined / 空指针 / 可选链
    - offbyone：越界 / off-by-one / 边界 / 索引 / <=
    - race：竞态 / race / 并发 / 锁 / 原子
  - S8（干净代码）：回答须含「无关键问题/无缺陷/none/looks good/可以合入」且不含上述任何缺陷关键词。

## 三、场景（8 个）

| # | 注入缺陷 | 期望关键词 |
|---|---|---|
| S1 | 硬编码高权限密钥（sk-live-…） | secret |
| S2 | SQL 字符串拼接（查询里 url + name 直接拼） | sqli |
| S3 | 路径遍历（用户输入拼进 join 后读文件） | traversal |
| S4 | 命令注入（child_process.exec 拼用户输入） | cmdi |
| S5 | 未判空（user.profile.name 直接取） | nullref |
| S6 | off-by-one（循环 i <= arr.length） | offbyone |
| S7 | 竞态（并发累加共享计数，无锁/原子） | race |
| S8 | 干净改动（等价重构） | 无缺陷（clean） |

## 四、反作弊

1. 判分器跑前冻结；看到结果不改判据。
2. 每场景独立 repo，跑前重建；装组不得人工放置 findings。
3. 不装组的 diff 文本由脚本从仓库实际改动生成（非编造）。
4. 不得只重跑差的一边；提示语不含期望关键词。
5. 装组工具输出截断 8000 字符（防超长，不影响判分要素）。

## 五、口径与不适用

- 单模型单温度、单机 Windows、8 个单文件小改动；真实大仓库/多文件 diff 未覆盖。
- 装组引擎内部另调一次 DeepSeek 评审（插件真实路径），token 成本较高。
- 结论只在能力五状态框架内使用；不排名、不给总分。