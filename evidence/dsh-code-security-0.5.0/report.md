# 标准测评报告 · dsh-code-security 0.5.0（能力五状态）

> 依据：工程协议手册 v1.1 §2/§3/§6/§13；`测试/协议/标准测评报告规范-v1.md`。
> 本件是标准测评，不是体验快测：判定由配对实验区间 + 预注册阈值推出（第五节）。
> v0.1 实验因判分器 clean 词表与 subprocess 桩缺陷作废（附录），正式结论取 v0.2。

## 一、结论

**还说不准（精度不足）**

| 项 | 值 |
|---|---|
| 判定 | **还说不准（精度不足）**：半宽 7.5 > 6 |
| D | **-10**（范围 [-24,24]） |
| 95% bootstrap 区间 | **[-18, -3]** |
| 区间半宽 | **7.5** |
| 模型 / 参数 | `deepseek-flash`，temperature=0.7，seeds=[101,202,303] |
| 样本 | 8 场景 × 3 seed × 2 组 = 48 次会话；151 次模型调用 |
| 耗时 | 4 分 58 秒（2026-10-19 20:29:19 → 20:34:17） |

**读法（关键）**：装组 17/24、不装组 24/24，**装组更差**。但方向明确、精度不足（半宽 7.5 > 6），按预注册只能输出「还说不准」——不得据此判「帮倒忙」。失分集中在两类规则未覆盖的缺陷与「无 git 时覆盖不完整」，见第七节。

## 二、任务契约

- 8 个场景（预注册第三节）：SQL 拼接、硬编码密钥、命令注入、eval、md5 弱哈希、路径遍历、干净代码、双缺陷。
- 装组：插件真实 10 工具（`secure_scan` 等），execute 为插件真实实现（内置规则引擎 builtin）；工作区为场景 fixture。
- 不装组：无工具；把同一批文件内容作为文本给出。
- 判分器：ANSWER 需同时命中「正确文件名」与「缺陷类型关键词」；S7 要求答「无问题/NONE」且不含缺陷词。

## 三、预注册（跑前冻结）

- 文件：`probes/PREREG_标准测评_v0.2.md`（2026-10-19T20:29 冻结；实验 20:29 起跑）。
- 指标：D = Σ(装 − 不装)；a=12，b=6；bootstrap 半宽 ≤6；B=10000，seed=20261019。
- v0.1 作废原因：S7 clean 词表缺 `none`、装组 subprocess 桩直接 throw → 读数失真；v0.2 修正后全量重跑，场景与阈值不变。

## 四、读数

| 场景 | 装组 | 不装组 | 期望 |
|---|---|---|---|
| S1 SQL 拼接 | 3/3 | 3/3 | 注入 + inject.js |
| S2 硬编码密钥 | 3/3 | 3/3 | 硬编码 + secrets.js |
| S3 命令注入 | 0/3 | 3/3 | 命令注入 + exec.js |
| S4 eval | 3/3 | 3/3 | eval + eval.js |
| S5 md5 弱哈希 | 3/3 | 3/3 | md5 + hash.js |
| S6 路径遍历 | 0/3 | 3/3 | 路径遍历 + fs.js |
| S7 干净代码 | 0/3 | 3/3 | 无问题 |
| S8 双缺陷 | 2/3 | 3/3 | 硬编码 + 注入 |
| **合计** | **17/24** | **24/24** | — |

## 五、区间与判定

1. 精度门槛：半宽 7.5 > 6 → **精度不足**，不给方向性判定。
2. D=-10 落在 [-24,24] 内，方向是「装组更低」，但按预注册只能标「还说不准」。
3. 未触发「帮倒忙」（U=-3 未 < -6）。

## 六、证据链（https，已上传并实测 200）

站点提交文本：`证据链_提交文本.txt`（8 行）。

- 被测 commit：https://github.com/STARDUSTLC666/dsh-code-security/commit/0f2c70b14294460ad07f80ad754d0464765e4dbd
- 全部证据：https://github.com/EQRS/dsh-eval-evidence/tree/main/evidence/dsh-code-security-0.5.0
- 报告本体：https://github.com/EQRS/dsh-eval-evidence/blob/main/evidence/dsh-code-security-0.5.0/report.md
- 结果：https://github.com/EQRS/dsh-eval-evidence/blob/main/evidence/dsh-code-security-0.5.0/result.json
- 调用记录：https://github.com/EQRS/dsh-eval-evidence/blob/main/evidence/dsh-code-security-0.5.0/calls.jsonl
- 任务与判分器：https://github.com/EQRS/dsh-eval-evidence/blob/main/evidence/dsh-code-security-0.5.0/experiment_code_security_v02.mjs
- 预注册：https://github.com/EQRS/dsh-eval-evidence/blob/main/evidence/dsh-code-security-0.5.0/PREREG-standard-eval-v0.2.md
- 快测底稿：https://github.com/EQRS/dsh-eval-evidence/blob/main/evidence/dsh-code-security-0.5.0/report-kuaisu-v0.1.md

## 七、遗留问题（本件最重要的发现）

1. **规则覆盖窄（S3/S6 装组 0/3）**：内置规则对「命令注入（child_process.exec 拼接）」与「路径遍历（path.join 用户输入）」**未命中**；模型信任工具返回的「0 命中」→ 漏报。裸模型 3/3 全对。这是插件规则集的真实缺口，不是判分问题。
2. **无 git 工作区覆盖不完整（S7 装组 0/3）**：fixture 无 `.git`，`secure_scan` 报「只扫了 1 个文件、1 个被跳过」，模型因此不敢断言「无问题」；裸模型直接答 NONE。真实使用中若工作区未跟踪文件多，会出现「扫了但不完整」的焦虑输出。
3. **S8 seed202 漏一次**：双缺陷场景下模型只报其中一类（或答非 NONE 形态），属模型侧波动。
4. **判分器局限**：只认「文件名 + 关键词」，不判行号精确度；模型答「扫描完成但有覆盖缺口」这类叙述不命中 clean 词，属判分口径的已知粗糙点（两侧同错，diff 不变）。
5. 单模型单温度、单机 Windows、8 个小文件；外部引擎（betterleaks/semgrep）未启用；真实大仓库未覆盖。

## 八、不适用条件

- 不能用于评价：真实大仓库、多语言、自定义规则、外部引擎（semgrep/betterleaks）的效果。
- 不能用于评价：插件的 UI/工作台、策略文件、基线/导出工具（`secure_report`/`secure_export`/`secure_baseline` 等）的可用性。
- 换模型/温度/场景集/规则集后结论不适用。
- 安全审计外的性能未测。

## 九、复现

```bash
node 测试/dsh-code-security/probes/experiment_code_security_v02.mjs
cat 测试/dsh-code-security/raw/70-eval-v02/result.json
```

- 前置：`%TEMP%/cs-runtime`（插件 lib + 5 个 npm 依赖）；预注册：`probes/PREREG_标准测评_v0.2.md`

## 十、附录：v0.1 作废说明

v0.1（`raw/70-eval/`）D=-9、CI[-16,-3]、半宽 6.5。作废原因：①S7 clean 词表未含 `none`，两侧同判错；②装组 subprocess 桩直接 throw，S2 seed202 模型转向「Git 不可用」。v0.2 修正后全量重跑，结果见本报告。

- 快测底稿：[测评报告_dsh-code-security_v0.1.md](测评报告_dsh-code-security_v0.1.md)