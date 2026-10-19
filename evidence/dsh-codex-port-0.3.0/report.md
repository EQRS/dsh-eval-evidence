# 标准测评报告 · dsh-codex-port 0.3.0（能力五状态）

> 依据：工程协议手册 v1.1 §2/§3/§6/§13；`测试/协议/标准测评报告规范-v1.md`。
> 本件是标准测评，不是体验快测：判定由配对实验区间 + 预注册阈值推出（第五节）。
> v0.1 实验因判分器缺陷作废（见附录），正式结论取 v0.2（本报告）。

## 一、结论

**真有用**

| 项 | 值 |
|---|---|
| 判定 | **真有用**（L=15 > a=12，半宽 4.5 ≤ 6） |
| D | **21**（范围 [-24,24]） |
| 95% bootstrap 区间 | **[15, 24]** |
| 区间半宽 | **4.5** |
| 模型 / 参数 | `deepseek-flash`，temperature=0.7，seeds=[101,202,303] |
| 样本 | 8 场景 × 3 seed × 2 组 = 48 次会话；122 次模型调用（76 次工具调用）；装组 24 次真实移植执行 |
| 耗时 | 4 分 13 秒（2026-10-19 19:10:30 → 19:14:43） |

**读法**：装组 23/24、不装组 0/24。不装组无文件系统能力（无法创建技能目录），本件属**天花板对照**——D=21 反映「有无移植工具」的绝对差，不是质量优劣。S3 的 0/3 属判分器与插件契约不符（见第七节第 1 条），两侧同为 0，diff=0，**不影响 D**。

## 二、任务契约

- 8 个场景：单技能移植、无 frontmatter 安全拒绝、合法特殊名、双插件批量、同名不覆盖、dryRun 预览、插件过滤、空 codexHome 状态。
- 每场景 = 临时 Codex 家目录（`.tmp/plugins/plugins/<plugin>/.codex-plugin/plugin.json` + `skills/<dir>/SKILL.md`）+ 独立目标技能目录。
- 装组：插件真实 4 工具（`codex_list` / `codex_port` / `codex_status` / `codex_health`），execute 为插件真实实现（`buildCodexPortTools`）。
- 不装组：无工具、无文件能力，只能文本作答。
- 判分器：读目标技能目录的真实产物（SKILL.md 存在/内容保留/目录为空），不读模型自述（S8 例外，读回答文本）。

## 三、预注册（跑前冻结）

- 文件：`probes/PREREG_标准测评_v0.2.md`（2026-10-19T19:09 冻结；实验 19:10 起跑）。
- 指标：D = Σ(装 − 不装)；a=12，b=6；bootstrap 半宽 ≤6；B=10000，seed=20261019。
- 修正记录：v0.1 的判分器在 S2/S3/S8 与插件真实契约不符（期望产物存在/期望「不存在」），v0.1 整体作废保留 `raw/50-eval/`；v0.2 修正三处判据后全量重跑。

## 四、读数

| 场景 | 装组 | 不装组 | 期望 |
|---|---|---|---|
| S1 单技能移植 | 3/3 | 0/3 | 目标有 greet/SKILL.md |
| S2 无 frontmatter | 3/3 | 0/3 | 目标无 plain（安全拒绝） |
| S3 特殊名 v1.2-reader | 0/3 | 0/3 | 目标有产物（判分器与契约不符，见遗留） |
| S4 双插件 4 技能 | 3/3 | 0/3 | 目标 4 个技能目录 |
| S5 同名不覆盖 | 3/3 | 0/3 | 旧内容 OLD-KEEP 保留 |
| S6 dryRun | 3/3 | 0/3 | 目标无任何技能（未落盘） |
| S7 插件过滤 | 3/3 | 0/3 | 只有 b1，无 a1 |
| S8 空 codexHome | 3/3 | 0/3 | 回答含「无可移植」 |
| **合计** | **23/24** | **0/24** | — |

## 五、区间与判定

1. 精度门槛：半宽 4.5 ≤ 6 → 通过。
2. L=15 > a=12 → **真有用**。
3. 未触发「帮倒忙」（U=24 未 < -6）、未触发「没啥差别」。

## 六、证据链（https，已上传并实测 200）

站点提交文本：`证据链_提交文本.txt`（8 行）。

- 被测 commit：https://github.com/STARDUSTLC666/dsh-codex-port/commit/9b144ccfa69479b6e979aa7adb04179ebbce2056
- 全部证据：https://github.com/EQRS/dsh-eval-evidence/tree/main/evidence/dsh-codex-port-0.3.0
- 报告本体：https://github.com/EQRS/dsh-eval-evidence/blob/main/evidence/dsh-codex-port-0.3.0/report.md
- 结果：https://github.com/EQRS/dsh-eval-evidence/blob/main/evidence/dsh-codex-port-0.3.0/result.json
- 调用记录：https://github.com/EQRS/dsh-eval-evidence/blob/main/evidence/dsh-codex-port-0.3.0/calls.jsonl
- 任务与判分器：https://github.com/EQRS/dsh-eval-evidence/blob/main/evidence/dsh-codex-port-0.3.0/experiment_codex_port_v02.mjs
- 预注册：https://github.com/EQRS/dsh-eval-evidence/blob/main/evidence/dsh-codex-port-0.3.0/PREREG-standard-eval-v0.2.md
- 快测底稿：https://github.com/EQRS/dsh-eval-evidence/blob/main/evidence/dsh-codex-port-0.3.0/report-kuaisu-v0.1.md

## 七、遗留问题

1. **S3 判分器仍与插件契约不符**：`v1.2-reader` 含点号，插件命名校验拒绝（只接受小写连字符），判分器却期望产物存在；两侧同为 0、diff=0，不影响 D，但该场景实际测的是「判分器假设」而非插件行为。剔除该场景后 D 仍为 21（S3 diff 为 0），结论不变。
2. **命名域窄**：插件对技能名的合法域比公开 pattern 更严（小写连字符），含点号/大写/空格的名字会被拒绝而非清洗；这是安全行为，但真实用户可能误以为「自动清洗总能成功」。
3. **对照退化**：不装组无文件能力，24 次全 0；D=21 是「有/无工具」的绝对差，不得包装成质量优势。
4. **运行副本**：插件 `yaml` 依赖在 pnpm 结构中，实验用源码副本（`%TEMP%/cp-runtime`，lib 树指纹与源一致 96a13655c6b504ed / 12 文件）+ yaml 2.9.0 运行，见证据 `runtime-copy.txt`。
5. 单模型单温度、单机 Windows、单文件技能 fixture；真实 Codex 插件目录/大技能包/宿主安装链路未覆盖。
6. v0.2 有一次 `finish=length` 调用（答超限），按脚本重试策略处理，未影响判分。

## 八、不适用条件

- 不能用于评价：真实 Codex CLI 家目录布局（.tmp/plugins 与 cache 的混合）、大技能包（多文件/二进制）、跨插件依赖；本件 fixture 为单文件 SKILL.md。
- 不能用于评价：插件在宿主内的真实安装/加载/触发、UI；这些未测。
- 换模型/温度/seed/场景集/判分器后结论不适用。
- 安全审计未测；性能仅记录总耗时。

## 九、复现

```bash
# 1) 准备运行副本（lib/src + yaml）
# 2) 全量重跑（约 4 分钟）
node 测试/dsh-codex-port/probes/experiment_codex_port_v02.mjs
cat 测试/dsh-codex-port/raw/50-eval-v02/result.json
```

- 预注册：`probes/PREREG_标准测评_v0.2.md`；结果：`raw/50-eval-v02/result.json`；调用：`raw/50-eval-v02/calls.jsonl`；副本指纹：`raw/50-eval-v02/runtime-copy.txt`

## 十、附录：v0.1 作废说明

v0.1（`raw/50-eval/`）D=15、CI[6,21]、半宽 7.5 → 还说不准（精度不足）。作废原因：S2 期望无 frontmatter 技能被移植（插件正确拒绝）、S3 期望脏名技能被移植（插件正确拒绝）、S8 期望「不存在」而 fixture 为空目录。三处均为判分器设计错误，非插件缺陷；v0.1 保留为历史，不进入结论。

- 快测底稿：[测评报告_dsh-codex-port_v0.1.md](测评报告_dsh-codex-port_v0.1.md)