# 标准测评报告 · dsh-cite 0.5.0（能力五状态）

> 依据：工程协议手册 v1.1 §2/§3/§6/§13；`测试/协议/标准测评报告规范-v1.md`。
> 本件是标准测评；S5 的 DOI 为虚构值（评估后发现），属实验设计缺陷，已在第七节披露并给敏感性说明。

## 一、结论

**还说不准（精度不足）**

| 项 | 值 |
|---|---|
| 判定 | 还说不准（精度不足）：半宽 7.5 > 6 |
| D | **+1**（范围 [-24,24]） |
| 95% bootstrap 区间 | **[-6, +9]** |
| 区间半宽 | 7.5 |
| 模型 / 参数 | `deepseek-flash`，temperature=0.7，seeds=[101,202,303] |
| 样本 | 8 场景 × 3 seed × 2 组 = 48 次会话；87 次模型调用 |
| 耗时 | 5 分 41 秒（2026-10-19 20:39:33 → 20:45:14） |

**读法**：装组 19/24、不装组 18/24，**几乎打平**（D=+1），且精度不足。唯一明确增益在 S1（GB/T 7714 的 `[J]` 文献类型标识，裸模型 0/3）；S5（检索）反而是装组劣势，但 S5 的 DOI 是虚构值，属设计缺陷（见第七节）。

## 二、任务契约

- 8 场景：4 种引文格式（gb-t-7714 / apa / mla / chicago）、题录检索、BibTeX、批量两条、非法 DOI。
- 装组：插件真实 6 工具（cite_lookup / cite_format / cite_bibtex / cite_check / cite_health / cite_batch）。
- 不装组：无工具，给出同一份元数据文本。
- 判分器：按格式规则正则检查（不直接比对插件输出，避免循环论证）。

## 三、预注册（跑前冻结）

- 文件：`probes/PREREG_标准测评_v0.1.md`（2026-10-19T22:36 冻结；实验 20:39 起跑）。
- 指标：D = Σ(装 − 不装)；a=12，b=6；bootstrap 半宽 ≤6；B=10000，seed=20261019。

## 四、读数

| 场景 | 装组 | 不装组 | 判分要点 |
|---|---|---|---|
| S1 GB/T 7714 | 3/3 | **0/3** | 含 `[J]` |
| S2 APA | 3/3 | 3/3 | 含 `(20xx)` |
| S3 MLA | 3/3 | 3/3 | 含 `vol.` 或引号 |
| S4 Chicago | 3/3 | 3/3 | 含 `no.` |
| S5 题录检索 | 1/3 | 3/3 | DOI 或标题（S5 设计缺陷，见第七节） |
| S6 BibTeX | 2/3 | 3/3 | 含 `@` |
| S7 批量两条 | 1/3 | 0/3 | ≥2 条 |
| S8 非法 DOI | 3/3 | 3/3 | 含错误/未找到 |
| **合计** | **19/24** | **18/24** | — |

## 五、区间与判定

1. 精度门槛：半宽 7.5 > 6 → 精度不足。
2. D=+1，方向中性；按预注册输出「还说不准」。
3. 未触发「真有用」（L=-6 未 > 12）、未触发「帮倒忙」（U=9 未 < -6）。

## 六、证据链（https，已上传并实测 200）

站点提交文本：`证据链_提交文本.txt`（8 行）。

- 被测 commit：https://github.com/STARDUSTLC666/dsh-cite/commit/3f6276e90aa183b6682df3001c311177af4af3fc
- 全部证据：https://github.com/EQRS/dsh-eval-evidence/tree/main/evidence/dsh-cite-0.5.0
- 报告本体：https://github.com/EQRS/dsh-eval-evidence/blob/main/evidence/dsh-cite-0.5.0/report.md
- 结果：https://github.com/EQRS/dsh-eval-evidence/blob/main/evidence/dsh-cite-0.5.0/result.json
- 调用记录：https://github.com/EQRS/dsh-eval-evidence/blob/main/evidence/dsh-cite-0.5.0/calls.jsonl
- 任务与判分器：https://github.com/EQRS/dsh-eval-evidence/blob/main/evidence/dsh-cite-0.5.0/experiment_cite.mjs
- 预注册：https://github.com/EQRS/dsh-eval-evidence/blob/main/evidence/dsh-cite-0.5.0/PREREG-standard-eval-v0.1.md
- 快测底稿：https://github.com/EQRS/dsh-eval-evidence/blob/main/evidence/dsh-cite-0.5.0/report-kuaisu-v0.1.md

## 七、遗留问题

1. **S5 设计缺陷（最重要）**：场景用的 DOI `10.1038/nature12345` 是虚构值（Crossref 实际无此记录）。装组工具如实报「Crossref 查不到」→ 判错；不装组被喂了含该虚构 DOI 的元数据 → 直接复述 → 判对。这是**信息不对称**，不是插件能力差异。
2. **敏感性（不替代预注册结论）**：剔除 S5 后装组 18/21、不装组 18/21（D=-3？按场景差：S1 +3、S6 -1、S7 +1 → D=+3），区间收窄但仍可能 >6；无论如何不足以判「真有用」。
3. **S1 是真实增益**：GB/T 7714 的 `[J]` 类型标识裸模型完全不知道（0/3），插件稳定输出（3/3）。
4. **S5/S6 的不稳**：cite_lookup 在「会议论文无 Crossref DOI」时会如实报错，模型转述后落在判分器「未找到」之外的叙述；cite_bibtex 2/3（一次格式偏差）。
5. 单模型单温度、单机、8 场景；Crossref 在线（本机 200）；格式正确性只做关键特征检查，未评标点/作者截断等细节。

## 八、不适用条件

- 不能用于评价：中文文献著录（GB/T 7714 中文专著/学位论文）、批量工作台 UI、citation store 持久化。
- 不能用于评价：真实 Crossref 数据质量（S5 的虚构 DOI 不构成对 Crossref 的评价）。
- 换模型/温度/场景集/判分正则后结论不适用。

## 九、复现

```bash
node 测试/dsh-cite/probes/experiment_cite.mjs
cat 测试/dsh-cite/raw/60-eval/result.json
```

## 十、附录

- 快测底稿：[测评报告_dsh-cite_v0.1.md](测评报告_dsh-cite_v0.1.md)
- 本地读数：`raw/60-eval/`（result + calls）