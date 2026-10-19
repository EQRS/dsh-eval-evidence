[intake 输入] 【测评报告】dsh-minimal-ptc 0.5.6 体验快测（极简提示词 / PTC 编排 · 方法试验）

<!-- intake:v1 {"project":"bench","difficulty":"medium","impact":"B","target":"STARDUSTLC666/dsh-minimal-ptc","form":"intake"} -->

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

- 被测对象：站点「dsh-minimal-ptc」详情页（清单版本 **0.5.6**）；源码取上游默认分支 `main⟧ commit `cf35c1a3⟧ 的 tarball 解包快照。
- **未把插件装进任何正在使用的 DSH profile**：读数来自源码快照 + 自带测试 + 直接 `import lib/index.js⟧ 的探针（临时 `DSH_HOME⟧）。
- **仅 Windows**（10.0.26200 x64）：不对其它平台下结论。
- 不排名、不给总分、不用星级；不改被测源码、不提 PR、不做安全渗透。

## 锚定提交

- 仓库：`STARDUSTLC666/dsh-minimal-ptc⟧，默认分支 `main⟧
- commit：`cf35c1a3a655a397e2a2f1f9cf87bd5535dc8eb7⟧（2026-10-16T16:22:26Z）
- 逐文件树指纹：**36 文件 / 2,027,138 B / sha256 `dd13ec12bd7d62e8⟧**
- tarball：`外部插件/dsh-minimal-ptc/dsh-minimal-ptc.tgz⟧，sha256 `947c953abe6f…⟧
- 快照目录：`外部插件/dsh-minimal-ptc/dsh-minimal-ptc-main⟧

## 环境与基线

| 项 | 值 |
|---|---|
| 宿主 | DSH desktop **0.2.1-rc.2** |
| 平台 | Windows 11 10.0.26200 x64 |
| Node / pnpm | v24.21.0 / 11.7.0 |
| 运行依赖 | **零**（仅 devDependency `js-yaml⟧ 4.1.1，供测试用） |
| 基线 | 空 `DSH_HOME⟧ 临时目录；无 live profile 改动 |

## 结果速览

| 面 | 结果 |
|---|---|
| 依赖安装 | **exit 0**，2 包（js-yaml），7.1 s |
| 自带测试（首次未装依赖） | exit 1：24 过 / 1 挂 / 1 跳过（缺 `js-yaml⟧） |
| 自带测试（装依赖后） | **25 通过 / 0 失败 / 1 跳过**，0.8 s |
| 独立探针（11 断言） | **11 / 11 通过** |

## 逐项读数

### 1. 安装（`raw/02-install.txt⟧）

```
command: <node> <pnpm.cjs> install --frozen-lockfile
exit: 0    seconds: 7.1
devDependencies: + js-yaml 4.1.1
```

### 2. 自带测试（`raw/01-self-test.txt⟧ → `raw/03-self-test-after-install.txt⟧）

- 首次（未装依赖）：`tests 26 / pass 24 / fail 1 / skipped 1⟧，失败项为
  `Cannot find package 'js-yaml'⟧（环境缺 devDependency，不是代码缺陷）。
- 装依赖后：`tests 26 / pass 25 / fail 0 / skipped 1⟧，跳过的是 POSIX 专用用例
  （`detectShellPath on POSIX returns bash regardless of GIT_BASH⟧）。

### 3. 独立探针（`raw/04-probe.txt⟧ 首轮、`raw/05-probe-fixed.txt⟧ 修正后）

探针：`probes/probe_minimal_ptc.mjs⟧，**11/11 通过**：

- **首次物化**：临时 `DSH_HOME/.agent-presets/ptc-minimal/⟧ 生成 5 个预设文件 + 版本标记
  （`agent.cordis.yml⟧ 12,253 B）。
- **幂等**：二次调用内容不变（版本标记命中即跳过）。
- **用户自建目录保护**：目录存在但无标记时**不覆盖**，并留下 warn 日志
  （"exists without our marker; leaving it alone"）。
- **profile 核心包拷贝检测**：`findProfileCoreCopies⟧ 只认 `dsh-tools⟧/`cordis⟧，不把 `schemastery⟧ 当宿主。
- **调度器键三态**：`Symbol.for⟧ → `global⟧；模块内同描述 Symbol → `module-local⟧；缺失 → `absent⟧；`null⟧ 入参不抛异常。

> 方法学说明：首轮 4 条失败是探针假设错（返回值是字符串而非对象、只认两个核心包名），
> 按源码契约修正后全绿；首轮读数保留在 `raw/04-probe.txt⟧。

## 发现

### 未发现 P0 / P1 / P2 / P3

- 零运行时依赖，物化逻辑幂等且有用户目录保护；调度器键检测覆盖三种宿主形态。
- 唯一需注意的运行前提：跑自带测试须先装 devDependency（`js-yaml⟧），属正常开发流程。

## 诚实边界

- **已验**：安装、自带 26 项测试（25 过/1 跳过）、11 条独立探针（物化/幂等/保护/拷贝检测/键三态）。
- **未验**：真实 DSH 会话中预设选择器是否出现、`appReady⟧ 与 `tools⟧ 注入的真实时序；
  宿主 `agentPresets.register⟧ 存在时的分支（探针 mock 为不存在）；Windows 终端/Git Bash 实际执行；
  卸载残留；非 Windows 平台。
- **不确定**：宿主版本差异对 `workflow-worker-thread → workflow-ptc⟧ 重写的影响。
- **不做**：不排名、不给总分、不用星级；不做安全渗透；不改被测源码、不提 PR；不装进 live profile。

## 查重

- 账本（595 事件）：`dsh-minimal-ptc⟧ **0 命中**。
- 全仓 md（3,048 个，排除 `node_modules⟧/`外部插件⟧/本件目录）：**0 命中**（`raw/09-dedupe-grep.txt⟧）。
- 站点：`plugins.json⟧ 中 **reviewed=false**。
- 结论：未见同件。

## 复现步骤

```bash
# 锚定：STARDUSTLC666/dsh-minimal-ptc @ cf35c1a3a655a397e2a2f1f9cf87bd5535dc8eb7
pnpm install --frozen-lockfile
node --test
node probes/probe_minimal_ptc.mjs
node ../tools/make_manifest.mjs --raw raw --label "dsh-minimal-ptc 0.5.6"
```

## 一句话总结

**dsh-minimal-ptc 0.5.6 零运行时依赖、可完全离线；装依赖后自带 26 项测试 25 过 1 跳过，
11 条独立探针验证了物化 5 文件 + 版本标记、幂等、用户自建目录不被覆盖、profile 核心包检测与调度器键三态。
未发现 P0–P3。真实宿主选择器与注入时序未验。**


## 证据链（https，站点提交用）

| # | 说明 | 链接 |
|---|---|---|
| 1 | 被测 commit（锚定） | https://github.com/STARDUSTLC666/dsh-minimal-ptc/commit/cf35c1a3a655a397e2a2f1f9cf87bd5535dc8eb7 |
| 2 | 全部证据 | https://github.com/EQRS/dsh-eval-evidence/tree/main/evidence/dsh-minimal-ptc-0.5.6 |
| 3 | report.md | https://github.com/EQRS/dsh-eval-evidence/blob/main/evidence/dsh-minimal-ptc-0.5.6/report.md |
| 4 | raw-00-anchor.txt | https://github.com/EQRS/dsh-eval-evidence/blob/main/evidence/dsh-minimal-ptc-0.5.6/raw-00-anchor.txt |
| 5 | raw-manifest.txt | https://github.com/EQRS/dsh-eval-evidence/blob/main/evidence/dsh-minimal-ptc-0.5.6/raw-manifest.txt |
| 6 | probe_minimal_ptc.mjs | https://github.com/EQRS/dsh-eval-evidence/blob/main/evidence/dsh-minimal-ptc-0.5.6/probe_minimal_ptc.mjs |
| 7 | 01-self-test.txt | https://github.com/EQRS/dsh-eval-evidence/blob/main/evidence/dsh-minimal-ptc-0.5.6/01-self-test.txt |
| 8 | 03-self-test-after-install.txt | https://github.com/EQRS/dsh-eval-evidence/blob/main/evidence/dsh-minimal-ptc-0.5.6/03-self-test-after-install.txt |

站点证据框格式：**每行一条 `URL` 或 `URL | 备注`**，最多 10 条；可直接粘贴 `证据链_提交文本.txt`。

```text
https://github.com/STARDUSTLC666/dsh-minimal-ptc/commit/cf35c1a3a655a397e2a2f1f9cf87bd5535dc8eb7 | 被测 commit（锚定）
https://github.com/EQRS/dsh-eval-evidence/tree/main/evidence/dsh-minimal-ptc-0.5.6 | 全部证据
https://github.com/EQRS/dsh-eval-evidence/blob/main/evidence/dsh-minimal-ptc-0.5.6/report.md | report.md
https://github.com/EQRS/dsh-eval-evidence/blob/main/evidence/dsh-minimal-ptc-0.5.6/raw-00-anchor.txt | raw-00-anchor.txt
https://github.com/EQRS/dsh-eval-evidence/blob/main/evidence/dsh-minimal-ptc-0.5.6/raw-manifest.txt | raw-manifest.txt
https://github.com/EQRS/dsh-eval-evidence/blob/main/evidence/dsh-minimal-ptc-0.5.6/probe_minimal_ptc.mjs | probe_minimal_ptc.mjs
https://github.com/EQRS/dsh-eval-evidence/blob/main/evidence/dsh-minimal-ptc-0.5.6/01-self-test.txt | 01-self-test.txt
https://github.com/EQRS/dsh-eval-evidence/blob/main/evidence/dsh-minimal-ptc-0.5.6/03-self-test-after-install.txt | 03-self-test-after-install.txt
```
