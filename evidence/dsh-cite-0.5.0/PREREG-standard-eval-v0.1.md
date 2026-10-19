# 预注册 · dsh-cite 标准测评 v0.1（跑前冻结）

- 冻结时间：2026-10-19T22:36+08:00（文件 mtime 可核）
- 被测件：dsh-cite 0.5.0（commit 3f6276e90aa183b6682df3001c311177af4af3fc）
- 实验脚本：测试/dsh-cite/probes/experiment_cite.mjs；结果 raw/60-eval/

## 一、指标（沿用本工作台口径）

- D = Σ(装 − 不装)，8 场景 × 3 seed；a=12，b=6；bootstrap 半宽 ≤6；B=10000，seed=20261019。
- 模型 deepseek-flash，temperature 0.7，seeds=[101,202,303]。

## 二、任务契约

- 每场景给一篇文献（DOI 10.1038/nature12345 等）与格式要求；装组用插件 6 工具（cite_lookup/format/bibtex/check/health/batch），不装组给同样的元数据文本。
- 判分：按格式规则正则检查 ANSWER（不直接比对插件输出，避免循环论证）：
  - gb-t-7714：含 `[J]` 文献类型标识；
  - apa：含四位年份括号 `(20xx)`；
  - mla：含 `vol.` 或题名引号；
  - chicago：含 `no.` 期号；
  - bibtex：含 `@` 条目头；
  - batch：返回 ≥2 条；
  - 错误 DOI：回答含「错误/未找到/失败/invalid」之一。

## 三、场景（8 个）

| # | 任务 | 判分 |
|---|---|---|
| S1 | DOI 文献按 GB/T 7714 格式化 | `[J]` |
| S2 | 同文献 APA | `(20xx)` |
| S3 | 同文献 MLA | `vol.` 或题名引号 |
| S4 | 同文献 Chicago | `no.` |
| S5 | 用题录检索定位文献（query） | 答案含 DOI 或标题关键词 |
| S6 | 生成 BibTeX | 含 `@` |
| S7 | 批量：两个 DOI 生成条目 | ≥2 条 |
| S8 | 非法 DOI（10.9999/invalid-xyz） | 含错误/未找到 |

## 四、反作弊

判分器冻结；场景固定；不装组元数据由脚本给出；不得只重跑差的一边；提示语不含格式正则片段。

## 五、口径与不适用

单模型单温度、单机、8 场景；Crossref 在线（本机实测 200）；格式正确性只做关键特征检查（不评标点细节/作者截断规则）；不排名、不给总分。