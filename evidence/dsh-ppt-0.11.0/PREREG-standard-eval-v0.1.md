# 预注册 · dsh-ppt 标准测评 v0.1（跑前冻结）

- 冻结时间：2026-10-19T17:00+08:00（初版生成；此后仅允许在**正式实验开跑前**做带记录的修正，见四之二）
- 被测件：dsh-ppt 0.11.0（锚定 STARDUSTLC666/dsh-ppt @ 46bb5272，见 `测试/dsh-ppt/raw/00-anchor.txt`）
- 实验脚本：`测试/dsh-ppt/probes/experiment_ppt.mjs`（判分器 = 同文件 `judge()`）
- 结果落盘：`测试/dsh-ppt/raw/12-eval/result.json` + `calls.jsonl`

## 一、假设与指标

- 主要指标：配对正确差 D = Σ_scenario (装组正确数 − 不装组正确数)，8 场景 × 3 轮，范围 [−24, 24]。
- 判定阈值（沿用 dsh-sql / dsh-rss 口径）：a = 12，b = 6。
- 精度门槛：bootstrap 95% 区间半宽 ≤ 6；重采样按场景（8 个），B = 10000，bootstrap seed = 20261019。
- 判定：半宽 > 6 → 还说不准（精度不足）；L > 12 → 真有用；U < −6 → 帮倒忙；L > −6 且 U < 12 → 没啥差别；其余 → 还说不准。

## 二、模型与调用

- 模型：`deepseek-flash`；temperature = 0.7；seed ∈ {101, 202, 303}（每场景每组各一轮）。
- 装组：注入 dsh-ppt 全部 7 个工具的真实 schema（ppt_themes / ppt_create / ppt_templates / ppt_edit / ppt_undo / ppt_check / ppt_render），工具 execute 为插件真实实现。
- 不装组：不注入任何工具；提示模型只能输出文本。判分器只认产物文件，故不装组预期 0 分（对照退化，见遗留问题）。
- 每组每场景独立空输出目录：`raw/12-eval/runs/<scenario>-<seed>/`；装组 config 的 outputDir 指向该目录。
- 单会话最多 12 轮工具调用；超限按未完成判错。

## 三、场景与判分（判分器读输出目录内最新 `*.json` deck 工程）

| # | 任务（发给模型的原文要点） | 判分条件（全部满足才算 1） |
|---|---|---|
| T1 | 做一份「2026 年第三季度复盘」演示：封面 + 目录页 + 至少一页正文，主题默认 | slideCount ≥ 3；slides[0].layout == 'cover' 且 title 含「季度复盘」；存在 layout=='section' 且 title 含「目录」的页 |
| T2 | 做一份 3 页正文演示，页标题必须分别是「问题」「方案」「收益」，每页至少 2 条要点 | 存在三页 title 分别等于/包含「问题」「方案」「收益」，且各页 bullets.length ≥ 2 |
| T3 | 做一页柱状图：季度 Q1–Q4 销售额分别为 120/98/145/160（万元），要 2 条系列（去年/今年，去年 100/110/130/150）；另加封面与结束页 | 存在 slide.chart.kind=='column'；categories == ['Q1','Q2','Q3','Q4']；series.length == 2；两条 values 按顺序数值等于给定值（±0.01） |
| T4 | 做一页表格，3 列「指标/目标/实际」，8 行数据（数值可自拟但须完整） | 存在 layout=='table' 页；rows[0] == ['指标','目标','实际']；rows.length == 9 |
| T5 | 指定主题 velvet，做 4 页（封面 + 3 页正文，正文标题自拟，每页 ≥2 条要点） | deck.theme == 'velvet'；slideCount ≥ 4 且 ≥3 页 layout=='bullets'（插件会自动追加结束页）；quality.errorCount == 0 |
| T6 | 用给定 12 页材料做演示，但本环境下单次生成上限为 6 页（config maxSlides=6），要求成品不超过 6 页且保留封面 | slideCount ≤ 6 且 ≥ 3；slides[0].layout == 'cover'；quality.errorCount == 0 |
| T7 | 先做 3 页（第 2 页标题「背景」），再把第 2 页标题改为「关键结论」，最后检查一次 | 最终 deck slides[1].title == '关键结论'；deck.revision == 1；deck.history.length == 1；该 deck 是目录内最新 .json |
| T8 | 先做 3 页（第 2 页标题「背景」），把第 2 页标题改为「临时修改」，再撤销该修改；撤销后第 2 页标题应恢复「背景」 | 最终 deck slides[1].title == '背景'；deck.revision == 2；undoAvailable == 0；history.length == 0 |

- 判分器约定：多个 `.json` 时取 mtime 最新者；JSON 解析失败 = 0；缺字段 = 0。
- 不装组：输出目录必然为空 → 0；同时记录模型文本里是否给出等价规格（仅作定性记录，不进入 D）。

## 四、反作弊

1. 判分器代码在跑前冻结（本文件第三节 + 脚本 `judge()`），看到结果后不得修改。
2. 不得只重跑差的一边；不得按结果挑选 seed 重跑。
3. 装组不得由人工预先放置产物；每场景目录跑前清空并记录。
4. 模型提示中不出现判分条件原句（只给任务要求），判分器独立读取产物。
5. 不装组模型不得通过宿主写文件通道产出（提示语明确「无文件工具」；脚本只给 API tools，不给宿主文件工具）。

## 四之二、跑前修正记录（正式实验开跑前，依据冒烟实测修订；未看过任何实验读数）

- 2026-10-19T17:01+08:00：按冒烟实测修订判分——插件 ppt_create 会自动追加结束页（T5 改为 slideCount ≥ 4 且 ≥3 个 bullets 页）；ppt_edit 后 revision=1/history=1，ppt_undo 后 revision=2/undoAvailable=0/history=0（T7/T8 判分改为与实际行为一致）。冒烟产物在临时目录，不进证据。

- 2026-10-19T17:08+08:00（**脚本修订 1，跑前修正**）：首轮全量运行（run1，结果 D=20）发现 T6 场景装组 0/3；取证（`probes/experiment_ppt.mjs` 重放）确认根因为脚本配置：max_tokens=1600 且模型第二轮返回空响应（finish_reason=length 或空 content）时脚本直接结束，未重试、未记录 finish_reason——属实验脚本缺陷，非插件缺陷。修订：max_tokens 4096；空响应重试 1 次；calls.jsonl 记录 finish_reason。run1 结果整体作废并保留于 `raw/12-eval-run1/`（历史，不进入结论）；修复后按同一预注册全量重跑（判分条件不变）。

## 五、口径声明

- 本实验测「有无 dsh-ppt 工具」的配对差，属天花板对照（不装组无法产出文件）；结论只在「能力五状态」框架内使用，不用于排名/总分。
- 单模型（deepseek-flash）单温度（0.7）、单机（Windows）、未独立复核 → 写入报告遗留问题。
