# 灵枢大脑区补测组报告 · dsh-memory 0.9.6（scripts / data / src / docs / skills）

> 依据：工程协议手册 v1.1 §2/§3/§6/§13；`测试/协议/判定与证据链规范-v1.md`。
> 本件是上一件「五组件测评」的续批：同一锚定（0.9.6 @ `dcac0e795c`），补测另外 5 组可独立验证的组件。

## 一、结论（5 组）

| 组 | 结果 |
|---|---|
| **scripts**（工程守卫套件） | **34 PASS / 4 FAIL / 8 SKIP**（装 PyYAML 后全量跑）；4 FAIL 中 1 项明确为环境（无 .git 的红基线自证），3 项待复核 |
| **data**（公开评测数据） | **1000 条记录 / 0 解析错误**，字段完整（id/text/category/label/importance/tags/chars/observed_at/time_window），558,116 B |
| **src**（DSH 插件 TS） | **构建通过**：`npm install`（14 包）+ `npm run build`（tsc）exit 0；lib 可 import（apply/inject/Config/name）；工具面注册需完整宿主 ctx（本次假 ctx 不足，未完成冒烟） |
| **docs**（纪律渲染） | **`render_discipline.py --all` exit 0**：6 个 target 干跑（zcode/codex/claude-code/plugin-skill 等）；`verify_discipline --all-targets` 因缺 `--cg-root` 按设计 fail-closed |
| **skills**（技能包） | 结构：**686 个 Agent Skills（六域）+ 1 元技能**；`skill_export_verify.py` 不在本仓库（README 注明「工具置身体仓」）→ 无法独立复验导出链 |

## 二、读数细节

### 2.1 scripts 组（`python scripts/run_tests.py scripts`）

- 34 PASS / 4 FAIL / 8 SKIP。
- FAIL 明细：
  - `test_check_unreachable_decode`：12 passed / 1 failed，唯一失败项是「D 红基线自证：git show 失败 rc=128 not a git repository」——tarball 无 .git，**环境**。
  - `test_check_publish_artifact_manifest`：18 passed / 10 failed。
  - `test_check_publish_artifact_coverage`：16 passed / 11 failed（日志伴随 git CRLF 警告）。
  - `test_gate_rust_legs`：50 passed / 3 failed（Rust 门禁腿接线用例）。
- 后三项未逐个复核，**不写成缺陷**（未验证不写入）。
- SKIP 8 项均为「官方仓/真实条目不在本地」或「平台不适用」。

### 2.2 docs / 渲染一致性

- `render_discipline.py --all` exit 0（干跑）：zcode / codex / claude-code / 两个 plugin-skill 均输出目标路径与字节数，未发现渲染失败。
- `verify_discipline.py --all-targets` exit 2：缺认知图 root（`--cg-root` / `MDCG_ROOT`），按仓库设计「投影判据体没有执行面 → fail-closed」——这是**设计行为**，不是缺陷；补齐 cg-root 后可跑。
- `check_line_anchors.py`：`VERDICT: FAIL — 363 条行号锚未通过且未登记`（扫描 9349 件，绿 181 / 红 363 / 豁免 2120 / 基线冻结 560 / 无法解析 358）。注意输出自带 `[降级] git 不可用：受管件面退化为文件系统走查`——tarball 无 .git，**该 FAIL 不能直接定性为缺陷**，需在干净克隆上复核。

### 2.3 skills 结构

- `skills/README.md`：686 技能（compiler 116 / pylang 120 / graph 117 / os 112 / browser 104 / net 117）+ 1 元技能；每技能含 KCCS 四要素与「不适用条件三通道」。
- 导出链门禁（`skill_export.py` / `skill_export_verify.py`）不在本仓库 → 本次只能验结构描述，**不能验导出一致性**。

## 三、与上一件的合并读数

| 组件/组 | 结果 |
|---|---|
| swarm | 24/24 |
| compiler | 31/31 |
| hive（核心 test_exec_cmd） | 16/16 |
| scripts | 34 PASS / 4 FAIL / 8 SKIP |
| data | 1000 条 / 0 错误 |
| src | 构建 ✅ / 工具面冒烟未完成 |
| docs 渲染 | ✅（6 target 干跑） |
| skills | 结构 686+1，导出链无法复验 |
| md_cg | 628 PASS / 46 FAIL（环境为主）**+ P2-1 心跳叠加已复现** |
| rust | 未验（构建链接失败） |

## 四、遗留与不适用

- P2-1 心跳调度叠加（上一件）：**唯一已复现真缺陷**，本件不再重复。
- scripts 的 3 个 FAIL（manifest/coverage/rust_legs）待复核；line_anchors 363 红需干净克隆复核。
- src 的工具面注册冒烟需完整宿主 ctx（tools/logger/effect/config 等）；本次只验到「构建 + import + apply 入口存在」。
- skills 导出链、真实 MCP 宿主端到端、非 Windows：未验。
- 本件不进入能力榜、不排名、不给总分。

## 五、查重

- 与上一件同锚定（同一 commit），站点 `reviewed=false`；账本历史 settle 不重复；本地旧快测（0.8.1）不重复。

## 六、证据

- 本地：`测试/主创站筛选/raw/lingshu-v096-scripts-group.log`（scripts 组全量输出）、`lingshu-v096-data.json`、`lingshu-v096-docs.json`、`lingshu-v096-src-build.log`、`lingshu-v096-scripts-fails.json`。
- 证据仓库：`EQRS/dsh-eval-evidence/evidence/dsh-memory-0.9.6-groups2/`（上传见提交文本）。