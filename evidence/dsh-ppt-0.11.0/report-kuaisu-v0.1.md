> **标准测评报告见 [标准测评_dsh-ppt_v0.1.md](标准测评_dsh-ppt_v0.1.md)**（五状态：真有用）。本文件是体验快测底稿。

[intake 输入] 【测评报告】dsh-ppt 0.11.0 体验快测（演示文稿生成 · 方法试验）

<!-- intake:v1 {"project":"bench","difficulty":"medium","impact":"B","target":"STARDUSTLC666/dsh-ppt","form":"intake"} -->

<!-- 协议对齐：工程协议手册 v1.1（r2）§6 体验快测档；协议文件 sha256 8dd51cbf75b259c5dabfdb928eb112364231b5d8f9f580759534e5d78a34d849 -->
> **协议对齐（v1.1 · r2 · 体验快测档）**：本件是**体验快测**（手册 §6），只记录安装/功能点/卸载残留类检查结果；
> **不生成五种能力状态标签、不进入能力榜、不以「通过/合格」作为插件结论**；未覆盖项见「诚实边界」。
> - **规范对齐（AI 编程通用规范 v1.1.2）**：验证结论按**附表 A 四档**给出（见「结果速览」）；报告按附表 B 顺序组织。
> - **插件身份**：源码版（commit + 逐文件树指纹），见「锚定提交」。
> - **环境配置 ID**：dsh 0.2.1-rc.2 / win32-x64 / Windows 10.0.26200 / node v24.21.0 / model=n/a。
> - **安全口径（§4 三分法）**：本件**未做**六威胁安全审计 ⇒ 安全结论 = **未测**。
> - **时效（§13.7）**：测评完成后 90 个自然日内有效。

## 性质声明

本件是**给主创测评站 <https://review.lingshulab.com> 的投稿测评**（intake 输入，外部贡献申报），不是悬赏：
**不 /claim、不自行加 bounty 标签**；计分、档位与是否归并均由维护者裁定（marker 的 difficulty/impact 仅为 intake 格式字段）。

- 被测对象：站点「dsh-ppt」详情页；源码取上游默认分支 `master⟧ commit `46bb5272⟧ 的 tarball 解包快照（源码版本 **0.11.0**）。
- **未把插件装进任何正在使用的 DSH profile**：读数来自源码快照 + 自带测试 + 直接 `import lib/config.js⟧ 与 `lib/skill.js⟧ 的独立探针。
- **仅 Windows**（10.0.26200 x64）：不对其它平台下结论。
- 不排名、不给总分、不用星级；不改被测源码、不提 PR、不做安全渗透。

## 锚定提交

- 仓库：`STARDUSTLC666/dsh-ppt⟧，默认分支 `master⟧
- commit：`46bb52724ba17253818ece75ebf4ef1ad4cab9e3⟧（2026-10-17T15:15:31Z）
- 逐文件树指纹：**83 文件 / 2,488,890 B / sha256 `851931c7b60245d0⟧**
- tarball：`外部插件/dsh-ppt/dsh-ppt.tgz⟧，sha256 前缀 `5d755d3dde8955fc⟧
- 快照目录：`外部插件/dsh-ppt/dsh-ppt-master⟧

## 环境与基线

| 项 | 值 |
|---|---|
| 宿主 | DSH desktop **0.2.1-rc.2** |
| 平台 | Windows 11 10.0.26200 x64 |
| Node / pnpm | v24.21.0 / 11.7.0 |
| 运行依赖 | `@office-kit/pptx⟧ 0.21.0、`fflate⟧ 0.8.3 |
| 关键间接依赖 | `koffi⟧ 3.1.1（含原生构建脚本，被 pnpm 供应链策略忽略） |

## 结果速览

**验证四档：部分验证**

| 面 | 结果 |
|---|---|
| 依赖安装（`pnpm install --frozen-lockfile⟧） | **exit 1**（`ERR_PNPM_IGNORED_BUILDS⟧：`koffi@3.1.1⟧ 构建脚本被忽略；包已落盘） |
| 构建（`pnpm run build⟧） | **exit 1**（pnpm 依赖状态检查拦截，未执行到 tsc） |
| 构建（直接 `tsc -p tsconfig.json⟧） | **exit 0**，1.5 s，`lib/⟧ 17 个产物文件 |
| 自带测试 | **119 / 119 通过，0 失败**，2.0 s |
| 独立探针（13 断言） | **13 / 13 通过** |

> 四档判定的理由：安装与 `pnpm run build⟧ 在 pnpm 默认供应链策略下非零；构建本身用本地 `tsc⟧ 验证通过。
> 因此写「部分验证」，不写「已验证通过」。

## 逐项读数

### 1. 安装（`raw/02-install.txt⟧ → `raw/02b/02c⟧ 重试）

```
command: <node> <pnpm.cjs> install --frozen-lockfile
exit: 1    seconds: 10.0
+ @office-kit/pptx 0.21.0
+ fflate 0.8.3
[ERR_PNPM_IGNORED_BUILDS] Ignored build scripts: koffi@3.1.1
Run "pnpm approve-builds" to pick which dependencies should be allowed to run scripts.
```

- 重试 `--allow-build=koffi⟧ → pnpm 11.7.0 报 `Unknown option⟧；
  `--config.onlyBuiltDependencies=koffi⟧ 未生效，仍报 `ERR_PNPM_IGNORED_BUILDS⟧。

### 2. 构建（`raw/03-build.txt⟧、`raw/03b/03c⟧、`raw/03d-build-direct-tsc.txt⟧）

```
pnpm run build:            exit 1（pnpm 依赖状态检查拦截）
<node> node_modules/typescript/bin/tsc -p tsconfig.json:  exit 0, 1.5 s
lib/ 产物文件数: 17
```

### 3. 自带测试（`raw/04-self-test.txt⟧）

```
command: node --test test/*.test.mjs
exit: 0    seconds: 2.0
tests 119 / pass 119 / fail 0 / skipped 0
```

### 4. 独立探针（`raw/05-probe.txt⟧）

探针：`probes/probe_dsh_ppt.mjs⟧，**13/13 通过**：

- `clampInt⟧：越界夹到上下限、非数字/NaN 回退、小数截断。
- `resolvePptConfig⟧：默认 `maxSlides=60⟧；非法 `defaultTheme⟧ 抛错；数组配置抛错。
- `parseSkillFile⟧：frontmatter 解析 `name/description⟧；无 frontmatter 时 name 为空且保留正文。
- 内置技能：`bundledSkillsDir()⟧ 存在；`skills/dsh-ppt/SKILL.md⟧ 可解析出 name；`SKILL_NAMES === ['dsh-ppt']⟧。

## 发现

### P3-1 · 依赖 `koffi⟧ 的原生构建脚本被 pnpm 忽略，导致 `pnpm install⟧ 退出码 1、`pnpm run build⟧ 被依赖检查拦截

- **现象**：`ERR_PNPM_IGNORED_BUILDS: koffi@3.1.1⟧；随后 `pnpm run build⟧ 因依赖状态检查直接失败（参数是 `tsc -p tsconfig.json⟧）。
- **根因**：pnpm 的供应链默认策略不执行未批准的依赖构建脚本；`koffi⟧ 是 `@office-kit/pptx⟧ 的原生依赖。
  这是**宿主 pnpm 策略与依赖形态的交互**，不是插件代码缺陷；用本地 `tsc⟧ 直接构建可通过，自带 119 项测试也全绿。
- **影响**：在默认 pnpm 策略下，CI/开发者会看到安装与构建非零退出；需要额外批准步骤或直接调用 `tsc⟧。
- **建议**：在 README/CI 说明 `pnpm approve-builds⟧ 或把 `koffi⟧ 加入 `onlyBuiltDependencies⟧；
  或把 `build⟧ 脚本改为不触发 pnpm 依赖检查的形式（视项目 CI 约束而定）。

### 未发现 P0 / P1 / P2

## 诚实边界

- **已验**：安装落盘、直接 tsc 构建（17 产物）、自带 119 项测试、13 条独立探针（配置/技能解析）。
- **未验**：真实 DSH 会话内的 PPT 生成工具链与 `@office-kit/pptx⟧ 实际导出 PPTX 的端到端；Web 工作台预览与下载；
  真正执行 `koffi⟧ 原生构建后的行为；卸载残留；非 Windows 平台。
- **不确定**：批准 `koffi⟧ 构建后是否改变运行时行为；不同 pnpm 版本对 `onlyBuiltDependencies⟧ 的配置位置。
- **不做**：不排名、不给总分、不用星级；不做安全渗透；不改被测源码、不提 PR；不装进 live profile。

## 查重

- 账本（595 事件）：`dsh-ppt⟧ **0 命中**。
- 站点：`plugins-20261019b.json⟧ 中 **reviewed=false**。
- 结论：未见同件。

## 复现步骤

```bash
# 锚定：STARDUSTLC666/dsh-ppt @ 46bb52724ba17253818ece75ebf4ef1ad4cab9e3
pnpm install --frozen-lockfile        # 观察 ERR_PNPM_IGNORED_BUILDS
node node_modules/typescript/bin/tsc -p tsconfig.json   # 绕过 pnpm 依赖检查
node --test test/*.test.mjs
node probes/probe_dsh_ppt.mjs
node ../tools/make_manifest.mjs --raw raw --label "dsh-ppt 0.11.0"
```

## 一句话总结

**dsh-ppt 0.11.0 的源码可直接 `tsc⟧ 构建（17 产物）、自带 119 项测试全绿、13 条独立探针验证配置与技能解析；
但默认 pnpm 供应链策略忽略 `koffi⟧ 原生构建，导致 `pnpm install⟧ 退出码 1 且 `pnpm run build⟧ 被依赖检查拦截。
本件按附表 A 记「部分验证」。真实 PPTX 导出端到端未验。**

## 证据链（https，站点提交用）

| # | 说明 | 链接 |
|---|---|---|
| 1 | 被测 commit（锚定） | https://github.com/STARDUSTLC666/dsh-ppt/commit/46bb52724ba17253818ece75ebf4ef1ad4cab9e3 |
| 2 | 全部证据 | https://github.com/EQRS/dsh-eval-evidence/tree/main/evidence/dsh-ppt-0.11.0 |
| 3 | report.md | https://github.com/EQRS/dsh-eval-evidence/blob/main/evidence/dsh-ppt-0.11.0/report.md |
| 4 | raw-00-anchor.txt | https://github.com/EQRS/dsh-eval-evidence/blob/main/evidence/dsh-ppt-0.11.0/raw-00-anchor.txt |
| 5 | raw-manifest.txt | https://github.com/EQRS/dsh-eval-evidence/blob/main/evidence/dsh-ppt-0.11.0/raw-manifest.txt |
| 6 | probe_dsh_ppt.mjs | https://github.com/EQRS/dsh-eval-evidence/blob/main/evidence/dsh-ppt-0.11.0/probe_dsh_ppt.mjs |
| 7 | 04-self-test.txt | https://github.com/EQRS/dsh-eval-evidence/blob/main/evidence/dsh-ppt-0.11.0/04-self-test.txt |
| 8 | 03c-build-verify-off.txt | https://github.com/EQRS/dsh-eval-evidence/blob/main/evidence/dsh-ppt-0.11.0/03c-build-verify-off.txt |

站点证据框格式：**每行一条 `URL` 或 `URL | 备注`**，最多 10 条；可直接粘贴 `证据链_提交文本.txt`。

```text
https://github.com/STARDUSTLC666/dsh-ppt/commit/46bb52724ba17253818ece75ebf4ef1ad4cab9e3 | 被测 commit（锚定）
https://github.com/EQRS/dsh-eval-evidence/tree/main/evidence/dsh-ppt-0.11.0 | 全部证据
https://github.com/EQRS/dsh-eval-evidence/blob/main/evidence/dsh-ppt-0.11.0/report.md | report.md
https://github.com/EQRS/dsh-eval-evidence/blob/main/evidence/dsh-ppt-0.11.0/raw-00-anchor.txt | raw-00-anchor.txt
https://github.com/EQRS/dsh-eval-evidence/blob/main/evidence/dsh-ppt-0.11.0/raw-manifest.txt | raw-manifest.txt
https://github.com/EQRS/dsh-eval-evidence/blob/main/evidence/dsh-ppt-0.11.0/probe_dsh_ppt.mjs | probe_dsh_ppt.mjs
https://github.com/EQRS/dsh-eval-evidence/blob/main/evidence/dsh-ppt-0.11.0/04-self-test.txt | 04-self-test.txt
https://github.com/EQRS/dsh-eval-evidence/blob/main/evidence/dsh-ppt-0.11.0/03c-build-verify-off.txt | 03c-build-verify-off.txt
```
