[intake 输入] 【测评报告】dsh-flakefinder 0.3.5 体验快测（测试稳定性 / flaky 检测 · 方法试验）

<!-- intake:v1 {"project":"bench","difficulty":"medium","impact":"B","target":"STARDUSTLC666/dsh-flakefinder","form":"intake"} -->

<!-- 协议对齐：工程协议手册 v1.1（r2）§6 体验快测档；协议文件 sha256 8dd51cbf75b259c5dabfdb928eb112364231b5d8f9f580759534e5d78a34d849 -->
> **协议对齐（v1.1 · r2 · 体验快测档）**：本件是**体验快测**（手册 §6），只记录安装/功能点/卸载残留类检查结果；
> **不生成五种能力状态标签、不进入能力榜、不以「通过/合格」作为插件结论**；未覆盖项见「诚实边界」。
> - **协议绑定**：`工程协议手册-v1.1⟧（修订标识 r2），文件 sha256 `8dd51cbf…d849⟧（快照 `测试/协议/⟧）。
> - **插件身份**：源码版（commit + 逐文件树指纹），见「锚定提交」。
> - **环境配置 ID**：dsh 0.2.1-rc.2 / win32-x64 / Windows 10.0.26200 / node v24.21.0 / model=n/a。
> - **安全口径（§4 三分法）**：本件**未做**六威胁安全审计 ⇒ 安全结论 = **未测**。
> - **时效（§13.7）**：测评完成后 90 个自然日内有效。

## 性质声明

本件是**给主创测评站 <https://review.lingshulab.com> 的投稿测评**（intake 输入，外部贡献申报），不是悬赏：
**不 /claim、不自行加 bounty 标签**；计分、档位与是否归并均由维护者裁定（marker 的 difficulty/impact 仅为 intake 格式字段）。

- 被测对象：站点「dsh-flakefinder」详情页（清单版本 **0.3.5**）；源码取上游默认分支 `master⟧ commit `fdba1afd⟧ 的 tarball 解包快照。
- **未把插件装进任何正在使用的 DSH profile**：读数来自源码快照 + 自带测试 + 直接 `import lib/*.js⟧ 的探针 + 真实 pytest 生成的 JUnit 报告。
- **仅 Windows**（10.0.26200 x64）：不对其它平台下结论。
- 不排名、不给总分、不用星级；不改被测源码、不提 PR、不做安全渗透。

## 锚定提交

- 仓库：`STARDUSTLC666/dsh-flakefinder⟧，默认分支 `master⟧
- commit：`fdba1afd20f7c942302aea36b6164903dad5f070⟧（2026-10-08T12:00:17Z）
- 逐文件树指纹：**55 文件 / 2,040,220 B / sha256 `2708d4dcb942cd9c⟧**
- tarball：`外部插件/dsh-flakefinder/dsh-flakefinder.tgz⟧，sha256 `ba56aeee7d2c…⟧
- 快照目录：`外部插件/dsh-flakefinder/dsh-flakefinder-master⟧

## 环境与基线

| 项 | 值 |
|---|---|
| 宿主 | DSH desktop **0.2.1-rc.2** |
| 平台 | Windows 11 10.0.26200 x64 |
| Node / pnpm | v24.21.0 / 11.7.0 |
| 运行依赖 | `proper-lockfile⟧ 4.1.2 |
| 外部测试框架 | 真实 pytest（临时 venv 安装，仅用于生成 JUnit XML） |
| 基线 | `node --test⟧ 原生 TAP 输出 / pytest `--junitxml⟧ |

## 结果速览

| 面 | 结果 |
|---|---|
| 依赖安装 | **exit 0**，9 包，6.1 s |
| 构建（`tsc⟧） | **exit 0**，4.8 s |
| 自带测试 | **47 / 47 通过，0 失败**，3.1 s |
| 独立探针（16 断言） | **16 / 16 通过** |
| 真实 pytest → JUnit → 插件解析 | **复现 1 条 P1（用例名错配 + 单轮误判 flaky）** |

## 逐项读数

### 1. 安装 / 构建 / 自带测试（`raw/02-install.txt⟧、`raw/03-build.txt⟧、`raw/04-self-test.txt⟧）

```
install:  exit 0  6.1 s   + proper-lockfile 4.1.2 / typescript 5.9.3
build:    exit 0  4.8 s   tsc -p tsconfig.json
self-test: exit 0 3.1 s   tests 47 / pass 47 / fail 0 / skipped 0
```

### 2. 独立探针（`raw/05-probe.txt⟧、`raw/06-probe-fixed.txt⟧）

探针：`probes/probe_dsh_flakefinder.mjs⟧，**16/16 通过**。覆盖：

- **聚合三态**：两轮全过 → `stable-pass⟧；一过一挂 → `flaky⟧（`failureRate=50⟧）；全挂 → `stable-fail⟧。
- **崩溃合成**：某一轮 `report=null⟧ 时补 `(crash)⟧ 记录，verdict 仍为 `flaky⟧。
- **解析器**：JSON（vitest/jest 结构）、TAP（`ok/not ok/# SKIP⟧）、JUnit XML；非法 JSON 抛错。
- **框架探测**：按本地 `node_modules/vitest/vitest.mjs⟧ 识别 vitest；按 `pytest.ini⟧ 识别 pytest；无框架回退 `node:test⟧。
- **配置默认**：`defaultRuns=5⟧、`maxRuns=20⟧、`dataDir⟧ 落在 `~/.dsh/.dsh-flakefinder⟧。

> 方法学说明：首轮 4 条失败均为探针假设错（`detectFramework⟧ 按本地入口而非 devDeps、`buildPlan⟧ 无 `cwd⟧ 字段、
> `resolveConfig⟧ 字段是 `defaultRuns⟧），按源码契约修正后全绿；首轮读数保留在 `raw/05-probe.txt⟧。

### 3. 真实 pytest 端到端（`raw/08-pytest-real-junit.txt⟧）

- 临时 venv 安装 pytest，生成一过一挂的测试文件，`pytest --junitxml⟧ 产出标准 XML：

```xml
<testcase classname="" name="test_ok" time="0.001" />
<testcase classname="" name="test_bad" time="0.001"><failure message="assert False">…</failure></testcase>
```

- 插件 `parseJunitReport⟧ 输出：

```json
{ "total": 2, "passed": 1, "failed": 1,
  "tests": [["test_ok","failed"], ["test_ok","passed"]] }
```

- 再用单轮结果跑 `aggregate⟧：`test_ok⟧ 被判定为 **flaky**（`passes=1 failures=1⟧），总体 `stable-fail⟧。

## 发现

### P1-1 · JUnit 中「自闭合 testcase + 带 failure 用例」混排时，用例名全部错配、单轮即误判 flaky

- **复现**：`raw/08-pytest-real-junit.txt⟧（真实 pytest 输出）；最小复现 `raw/07-junit-mixed-defect.txt⟧。
- **现象**：两条用例都被解析成 `test_ok⟧（一条 `failed⟧、一条 `passed⟧），`test_bad⟧ 名称丢失；
  同一 `id⟧ 在下一次聚合里被合并成 `passes=1 / failures=1⟧，于是**一次稳定运行**就把 `test_ok⟧ 判为 flaky。
- **根因**：`lib/parse.js⟧ 的 block 正则会把自闭合标签的 `[^>]*⟧ 吞到 `/⟧，随后 `>⟧ 匹配，
  body 一直延伸到**下一个** `/testcase⟧；于是第一个自闭合用例与后面的失败用例被合成一条，
  name 取前者、status 取后者。随后自闭合单测正则又追加一条，造成同名重复。
- **影响**：pytest 用户（JUnit 路径）的用例名与 id 不可信；聚合按 id 合并时会把稳定通过用例误报为 flaky，
  进而污染历史记录与隔离清单建议。JS 项目（JSON reporter）与 node:test（TAP）不受影响。
- **建议**：先匹配并移除自闭合 `<testcase …/>⟧，再匹配成对标签；或用一个正则同时捕获可选的 `/⟧ 自闭合分支。
  自带 47 项测试未覆盖「自闭合与成对混排」，建议补一条回归用例。

## 诚实边界

- **已验**：安装、构建、自带 47 项测试、16 条独立探针、三种报告格式解析、框架探测、
  真实 pytest JUnit 的 P1 复现与最小复现。
- **未验**：真实 DSH 会话内工具注册与 UI 流程；真实 vitest/jest 项目端到端（只验结构，未装两者跑真实项目）；
  并发多轮调度与锁竞争；卸载残留；非 Windows 平台；大报告（数十万用例）性能。
- **不确定**：其它 JUnit 生成器（如 JUnit 4 XML、xUnit）是否也有自闭合混排；pytest 不同版本的空 `classname⟧ 表现。
- **不做**：不排名、不给总分、不用星级；不做安全渗透；不改被测源码、不提 PR；不装进 live profile；
  不对非 Windows 平台下任何结论。

## 查重

- 账本（595 事件）：`dsh-flakefinder⟧ **0 命中**。
- 全仓 md（3,048 个，排除 `node_modules⟧/`外部插件⟧/本件目录）：**0 命中**（`raw/09-dedupe-grep.txt⟧）。
- 站点：`plugins.json⟧ 中 `dsh-flakefinder⟧ **reviewed=false**。
- 结论：对照「账本 / 全仓文本 / 站点列表」，未见同件。

## 复现步骤

```bash
# 0) 锚定：STARDUSTLC666/dsh-flakefinder @ fdba1afd20f7c942302aea36b6164903dad5f070
pnpm install --frozen-lockfile
pnpm run build
node --test test/*.test.mjs
node probes/probe_dsh_flakefinder.mjs
# P1 最小复现
node probes/repro_junit_mixed.mjs
# 真实 pytest 复现：见 raw/08-pytest-real-junit.txt（临时 venv + pytest --junitxml）
node ../tools/make_manifest.mjs --raw raw --label "dsh-flakefinder 0.3.5"
```

## 一句话总结

**dsh-flakefinder 0.3.5 装得上、构建干净、自带 47 项测试全绿，聚合/解析/框架探测 16 条独立探针全部符合预期；
但 JUnit 解析存在一条 P1：pytest 的标准输出（自闭合通过与带 failure 用例混排）会让用例名全部错配，
并在单轮内把稳定通过用例误判为 flaky。JS/TAP 路径不受影响。**
