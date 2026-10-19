# 标准测评报告 · dsh-flakefinder 0.3.5（能力五状态）

> **已被 v0.2 取代（2026-10-19）**：本件装组使用手写包装（非插件真实工具面），装组读数无效、结论「还说不准」作废；正式结论见 [标准测评_dsh-flakefinder_v0.2.md](标准测评_dsh-flakefinder_v0.2.md)（没啥差别）。本文件保留为历史，不改读数。

> 依据：工程协议手册 v1.1 §2/§3/§6/§13；`测试/协议/标准测评报告规范-v1.md`。
> 本件是标准测评；但**装组工具链异常**，判定为「还说不准」，见第七节。

## 一、结论

**还说不准（精度不足）**

| 项 | 值 |
|---|---|
| 判定 | **还说不准（精度不足）** |
| D | **-8**（范围 [-24,24]） |
| 95% bootstrap 区间 | **[-18, 1]** |
| 区间半宽 | **9.5**（预注册门槛 ≤6，**未满足**） |
| 模型 | `deepseek-flash`，temperature=0.7，seeds=[101,202,303] |
| 样本 | 8 场景 × 3 seed × 2 组 = 48 次基础运行，148 秒 |

## 二、任务契约

- 任务：给多轮测试报告（JSON），找出 flaky 用例（8 个场景，含无 flaky、多 flaky、skipped 等）。
- 判分：答案中的 flaky 用例集合与期望集合完全一致。
- 对照：装=插件 `aggregate`/`flakyTests` 包装成工具；不装=裸模型读 JSON 自行判断。

## 三、预注册

目录内 `result.json` 记录：a=12、b=6、半宽≤6、B=10000、seed=20261019。

## 四、读数

| 场景 | 装组 | 不装组 |
|---|---|---|
| S1 | 0/3 | 0/3 |
| S2 | 0/3 | 3/3 |
| S3 | 3/3 | 3/3 |
| S4 | 3/3 | 3/3 |
| S5 | 0/3 | 0/3 |
| S6 | 0/3 | 3/3 |
| S7 | 0/3 | 3/3 |
| S8 | 3/3 | 2/3 |

## 五、区间与判定

半宽 9.5 > 6 → **精度不足** → 按协议 §2.2 输出「还说不准」。未生成正式能力标签。

## 六、证据链（https）

```text
https://github.com/STARDUSTLC666/dsh-flakefinder/commit/fdba1afd20f7c942302aea36b6164903dad5f070 | 被测 commit（锚定）
https://github.com/EQRS/dsh-eval-evidence/tree/main/evidence/dsh-flakefinder-0.3.5 | 全部证据
https://github.com/EQRS/dsh-eval-evidence/blob/main/evidence/dsh-flakefinder-0.3.5/result.json | 结果（D=-8，CI[-18,1]，还说不准）
https://github.com/EQRS/dsh-eval-evidence/blob/main/evidence/dsh-flakefinder-0.3.5/calls.jsonl | 调用记录
https://github.com/EQRS/dsh-eval-evidence/blob/main/evidence/dsh-flakefinder-0.3.5/experiment_flake.mjs | 任务与判分器
```

## 七、遗留问题（关键）

1. **装组工具链异常**：多个场景装组 0/3，怀疑工具 schema/参数与 `aggregate` 期望结构不匹配，或模型未正确调用；
   **这是实验封装问题，不是 dsh-flakefinder 的能力结论**；
2. 需修复装组调用后重跑（属新实验，另立预注册）；
3. 单模型、单温度；未独立复核。

## 八、不适用条件

- 本件结论**不能用于评价 dsh-flakefinder 的 flaky 检测能力**（装组未跑通）；
- 仅说明：本次实验设计未能在预注册精度内给出判定。
