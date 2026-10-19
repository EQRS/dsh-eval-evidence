# 标准测评报告 · dsh-code-review v0.1.1（能力五状态）

> 依据：工程协议手册 v1.1 §2/§3/§6/§13；`测试/协议/标准测评报告规范-v1.md`。
> 本件是标准测评，不是体验快测：判定由配对实验区间 + 预注册阈值推出（第五节）。

## 一、结论

**还说不准**（区间下限恰在判据边界）

| 项 | 值 |
|---|---|
| 判定 | **还说不准**（D=-2；L=-6 不 > -b=-6，未落入「没啥差别」；U=0 不 < -6，也不是「帮倒忙」） |
| D | **-2**（范围 [-24,24]） |
| 95% bootstrap 区间 | **[-6, 0]** |
| 区间半宽 | **3**（门槛 ≤6，精度满足） |
| 模型 / 参数 | `deepseek-flash`，temperature=0.7，seeds=[101,202,303] |
| 样本 | 8 场景 × 3 seed × 2 组 = 48 次会话；73 次模型调用（25 次工具调用）；装组 24 次真实引擎评审（DeepSeek 端点） |
| 耗时 | 8 分 37 秒（2026-10-19 18:37:01 → 18:45:38） |

**读法**：8 个场景里 7 个两侧全对——单文件明显缺陷，裸模型本来就能识别；唯一差异在 S8（干净改动）：装组 1/3，引擎把等价重构报成「非等价/NaN」类问题，模型照单全收 → 误报。判据边界（-6 不严格大于 -6）使「没啥差别」未成立，故按规则输出「还说不准」。

## 二、任务契约

- 8 个场景（预注册第三节）：S1 硬编码密钥、S2 SQL 拼接、S3 路径遍历、S4 命令注入、S5 未判空、S6 off-by-one、S7 竞态、S8 等价重构（干净）。
- 每场景 = 临时 git 仓库：先提交干净版本，再写入改动；不装组拿到同一改动的 unified diff。
- 装组工具：`code_review(repo_path, mode, focus)`，执行 = 插件底层引擎 `codecheck review --repo <dir> --concurrency 1 --audience agent`（与插件 `buildReviewArgs` 同参数、`prepareEngineEnv` 同注入方式，DeepSeek 端点）。工具返回引擎 findings 文本。
- 判分器：模型最后一行 `ANSWER:` 是否命中期望缺陷类型关键词（关键词表见预注册）；S8 要求「无关键问题」且不含任何缺陷关键词。

## 三、预注册（跑前冻结）

- 文件：`probes/PREREG_标准测评_v0.1.md`（2026-10-19T18:35 冻结，文件 mtime 可核；实验 18:37 起跑）。
- 指标：D = Σ(装 − 不装)；a=12，b=6；bootstrap 半宽 ≤6；B=10000，seed=20261019。
- 反作弊：判分器冻结；每场景独立 repo；不装组 diff 由 git 实际生成；不得只重跑差的一边。

## 四、读数

| 场景 | 装组 | 不装组 | 期望 |
|---|---|---|---|
| S1 硬编码密钥 | 3/3 | 3/3 | secret |
| S2 SQL 拼接 | 3/3 | 3/3 | sqli |
| S3 路径遍历 | 3/3 | 3/3 | traversal |
| S4 命令注入 | 3/3 | 3/3 | cmdi |
| S5 未判空 | 3/3 | 3/3 | nullref |
| S6 off-by-one | 3/3 | 3/3 | offbyone |
| S7 竞态 | 3/3 | 3/3 | race |
| S8 等价重构 | 1/3 | 3/3 | 无缺陷 |
| **合计** | **22/24** | **24/24** | — |

S8 装组失败两句原答：「bug（重构非等价导致空值解引用 TypeError）」「bug / 逻辑回归（稀疏数组处理导致 NaN）」——均为引擎误报的转述。

## 五、区间与判定

1. 精度门槛：半宽 3 ≤ 6 → 通过。
2. L=-6：不 > a=12（非「真有用」）；不 < -b=-6（非「帮倒忙」）；也不满足「L > -b 且 U < a」（-6 不 > -6）→ 落入「其余」→ **还说不准**。
3. 边界说明：这是判据的严格边界，不是数据质量问题；若把 b 设为 5 则本件会落入「没啥差别」。不得事后改判据，故如实记录边界。

## 六、证据链（https，已上传并实测 200）

站点提交文本：`证据链_提交文本.txt`（8 行）。

- 被测 commit：https://github.com/Nicholas023/dsh-code-review/commit/c8ce29ddd34f07d04bc1e370341ad1a0093803d3
- 全部证据：https://github.com/EQRS/dsh-eval-evidence/tree/main/evidence/dsh-code-review-0.1.1
- 报告本体：https://github.com/EQRS/dsh-eval-evidence/blob/main/evidence/dsh-code-review-0.1.1/report.md
- 结果：https://github.com/EQRS/dsh-eval-evidence/blob/main/evidence/dsh-code-review-0.1.1/result.json
- 调用记录：https://github.com/EQRS/dsh-eval-evidence/blob/main/evidence/dsh-code-review-0.1.1/calls.jsonl
- 任务与判分器：https://github.com/EQRS/dsh-eval-evidence/blob/main/evidence/dsh-code-review-0.1.1/experiment_code_review.mjs
- 预注册：https://github.com/EQRS/dsh-eval-evidence/blob/main/evidence/dsh-code-review-0.1.1/PREREG-standard-eval-v0.1.md
- 快测底稿：https://github.com/EQRS/dsh-eval-evidence/blob/main/evidence/dsh-code-review-0.1.1/report-kuaisu-v0.1.md

## 七、遗留问题

1. **引擎误报倾向**（本件最重要观测）：S8 等价重构被引擎报成「非等价/NaN」类问题，装组照单全收；裸模型 3/3 判对。评审引擎对「改写但等价」的改动有过度告警倾向，真实使用中会增加人工复核成本。
2. **天花板缺失**：S1-S7 两侧全对，说明本实验的缺陷过于明显，无法区分「插件提升」与「模型本来就会」；预注册的 a=12 在两侧都接近满分时不具区分度（本件 D 只能靠误报拉开负差）。
3. 判据边界：L=-6 恰在「没啥差别」门槛外，结论按规则为「还说不准」；建议下一版预注册（新实验）对 b 的边界做敏感性说明，不得回改本件。
4. 单模型单温度、单机 Windows、单文件小改动、8 场景；真实大仓库/多文件 diff/安全审计未覆盖。
5. 装组引擎内部另调一次 DeepSeek 评审（token 成本 ~40K/次），与不装组有额外成本不对称，未计入。

## 八、不适用条件

- 不能用于评价：dsh-code-review 在真实大仓库、多文件 diff、跨语言项目上的表现；本件只有单文件小改动。
- 不能用于评价：插件的规则引擎覆盖能力（`rules check` 系统规则未作为独立测量项）、报告落盘、后台任务/命令面。
- 换模型/温度/seed/场景集/关键词判据后结论不适用。
- 安全审计未测；性能仅记录总耗时。

## 九、复现

```bash
# 全量重跑（约 9 分钟；装组会真实调用引擎评审 24 次，需 DeepSeek 端点）
node 测试/dsh-code-review/probes/experiment_code_review.mjs
cat 测试/dsh-code-review/raw/21-eval/result.json
```

- 预注册：`probes/PREREG_标准测评_v0.1.md`；结果：`raw/21-eval/result.json`；调用：`raw/21-eval/calls.jsonl`

## 十、附录

- 快测底稿：[测评报告_dsh-code-review_v0.1.md](测评报告_dsh-code-review_v0.1.md)（v0.1.1 锚定、四档「部分验证」、P2-1/P2-2 等）
- 引擎二进制：`.work/codecheck-v011.exe`（v0.1.1 构建产物，78MB，未入库）
- 本件索引：[README.md](README.md)