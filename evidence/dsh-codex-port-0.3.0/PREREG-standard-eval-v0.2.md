# 预注册 · dsh-codex-port 标准测评 v0.2（判分器修复后重跑，跑前冻结）

- 冻结时间：2026-10-19T19:09+08:00（文件 mtime 可核）
- 被测件：dsh-codex-port 0.3.0（锚定 commit 9b144ccf，见 测试/dsh-codex-port/raw/20-anchor-local.txt）
- 实验脚本：测试/dsh-codex-port/probes/experiment_codex_port_v02.mjs；结果 raw/50-eval-v02/result.json + calls.jsonl

## 零、v0.1 作废原因（判分器缺陷，非插件缺陷）

v0.1（`experiment_codex_port.mjs`，结果 D=15 / CI[6,21] / 半宽 7.5）的判分器与插件真实契约不符：
1. S2 期望「无 frontmatter 的技能被移植出产物」，插件实际**安全拒绝**（转换后 description 为空 → 不写非法技能）——拒绝才是正确行为；
2. S3 期望含空格括号的技能被移植，插件清洗为 `My_Skill__v2_` 后**校验拒绝**（不符合 DSH 名规则）——拒绝也是正确行为；
3. S8 期望回答含「不存在」，但 fixture 是「codexHome 存在但为空」，模型正确回答「0 个可移植技能」却判错。
以上属判分器设计错误。v0.1 整体作废、保留 raw/50-eval/ 为历史；v0.2 修正判据并全量重跑（不挑 seed、不挑场景）。

## 一、指标（同 v0.1）

- D = Σ_scenario (装组正确数 − 不装组正确数)，8 场景 × 3 seed，范围 [−24, 24]。
- a = 12，b = 6；bootstrap 半宽 ≤ 6（按场景重采样，B=10000，seed=20261019）。
- 模型 deepseek-flash，temperature 0.7，seed ∈ {101, 202, 303}。

## 二、任务契约（同 v0.1）

- 每场景 = 临时 Codex 家目录（.tmp/plugins/plugins/<plugin>/.codex-plugin/plugin.json + skills/<dir>/SKILL.md）+ 独立目标技能目录。
- 装组：插件真实 4 工具（codex_list / codex_port / codex_status / codex_health），真实 execute。
- 不装组：无工具（无法写文件），判分恒 0（天花板对照）。
- 运行副本：插件 lib/src 逐字节复制到 %TEMP%/cp-runtime，并补 yaml 2.9.0（pnpm 结构中 yaml 不在插件顶层 node_modules）；树指纹见 raw/50-eval-v02/runtime-copy.txt。

## 三、场景与判分（v0.2 修正处已标注）

| # | fixture / 任务 | 期望（装组） |
|---|---|---|
| S1 | 单插件 alpha / 技能 greet | 目标 skills/greet/SKILL.md 存在 |
| S2★ | 技能 plain 无 frontmatter | 目标**无** plain 技能（插件安全拒绝，不产非法产物） |
| S3★ | 技能名 v1.2-reader（合法特殊字符） | 目标 skills/v1.2-reader/SKILL.md 存在 |
| S4 | 两插件各 2 技能 | 目标 4 个技能目录 |
| S5 | 目标已有 greet（OLD-KEEP）+ overwrite=false | 移植后仍含 OLD-KEEP（跳过） |
| S6 | dryRun=true | 目标无任何技能目录（未落盘） |
| S7 | plugins=[beta] 过滤 | 目标只有 b1，无 a1 |
| S8★ | codexHome 存在但无插件 | 回答含「没有可移植/无任何可移植/未安装/0 个/均为 0/没有插件」 |

## 四、反作弊

1. 判分器冻结（v0.2 文件）；不改场景、不挑 seed。
2. 每场景独立 codexHome 与 targetDir，跑前重建。
3. 不装组无文件能力（天花板对照，报告明写）。
4. 提示语不含期望目录名。

## 五、口径与不适用

- 单模型单温度、单机 Windows、单文件技能 fixture；真实 Codex 插件目录/大技能包未覆盖。
- 不装组无文件能力 → D 反映「有无工具」，非质量。
- 结论只在能力五状态框架内使用；不排名、不给总分。