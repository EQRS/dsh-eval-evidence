[intake 输入] 【测评报告】dsh-rss 0.7.0 体验快测（RSS/Atom 聚合 · 方法试验）

<!-- intake:v1 {"project":"bench","difficulty":"medium","impact":"B","target":"STARDUSTLC666/dsh-rss","form":"intake"} -->

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

- 被测对象：站点「dsh-rss」详情页；源码取上游默认分支 `master⟧ commit `774ed131⟧ 的 tarball 解包快照（源码版本 **0.7.0**）。
- **未把插件装进任何正在使用的 DSH profile**：读数来自源码快照 + 自带测试 + 直接 `import lib/index.js⟧ 的独立探针。
- **仅 Windows**（10.0.26200 x64）：不对其它平台下结论。
- 不排名、不给总分、不用星级；不改被测源码、不提 PR、不做安全渗透。

## 锚定提交

- 仓库：`STARDUSTLC666/dsh-rss⟧，默认分支 `master⟧
- commit：`774ed13181d4c1a6423283c2dc21bb63ff33d99b⟧（2026-10-17T15:15:26Z）
- 逐文件树指纹：**109 文件 / 2,419,064 B / sha256 `3467bf30da2aeec7⟧**
- tarball：`外部插件/dsh-rss/dsh-rss.tgz⟧，sha256 前缀 `fe3bd5443b362c26⟧
- 快照目录：`外部插件/dsh-rss/dsh-rss-master⟧

## 环境与基线

| 项 | 值 |
|---|---|
| 宿主 | DSH desktop **0.2.1-rc.2** |
| 平台 | Windows 11 10.0.26200 x64 |
| Node / pnpm | v24.21.0 / 11.7.0 |
| 运行依赖 | `fast-xml-parser⟧ 5.10.1、`schemastery⟧ 3.18.0、`undici⟧ 8.12.1、`yaml⟧ 2.9.0 |
| 基线 | 纯本地 XML/OPML/YAML 文本，无网络请求 |

## 结果速览

**验证四档：已验证通过（本地范围）**

| 面 | 结果 |
|---|---|
| 依赖安装 | **exit 0**，8.0 s |
| 构建（`tsc⟧） | **exit 0**，5.6 s |
| 自带测试 | **119 / 119 通过，0 失败**，3.6 s |
| 独立探针（16 断言） | **16 / 16 通过** |

## 逐项读数

### 1. 安装 / 构建 / 自带测试（`raw/02-install.txt⟧、`raw/03-build.txt⟧、`raw/04-self-test.txt⟧）

```
install:   exit 0  8.0 s  + fast-xml-parser 5.10.1 / schemastery 3.18.0 / undici 8.12.1 / yaml 2.9.0
build:     exit 0  5.6 s  tsc -p tsconfig.json
self-test: exit 0  3.6 s  tests 119 / pass 119 / fail 0 / skipped 0
```

### 2. 独立探针（`raw/05-probe.txt⟧ 首轮、`raw/07-probe-final.txt⟧ 最终）

探针：`probes/probe_dsh_rss.mjs⟧，**16/16 通过**：

- **RSS 2.0**：2 条条目；标题/链接/日期归一为 ISO 8601（字段名 `pubDate⟧）；摘要去 HTML 标签。
- **Atom**：1 条条目，feed 标题正确。
- **异常输入**：空内容抛错；截断 XML（缺闭合标签）抛错。
- **OPML**：解析出 3 条 outline（含 1 条 `ftp://⟧），父 outline 的 `Tech⟧ 分类正确继承；
  `importOpmlFeeds⟧ 只收 2 条 http(s)、跳过 1 条并给出原因；`buildOpml⟧ → `parseOpml⟧ 往返条数一致。
- **订阅列表**：`sameFeedUrl⟧ 归一 host 大小写（`URL.href⟧ 语义），但**保留尾部斜杠差异**（设计选择）；
  `addFeed⟧ 对归一后同 URL 合并、新 URL 追加；feeds YAML 往返 2 条。
- **配置默认**：`resolveConfig({})⟧ 返回 `timeoutMs=15000⟧、`maxBodyBytes=5 MiB⟧、`allowPrivateNetwork=false⟧、`opmlWriteApproval=true⟧。

> 方法学说明：首轮 3 条失败均为探针假设错（条目字段是 `pubDate⟧ 不是 `published⟧；
> `sameFeedUrl⟧ 不忽略尾部斜杠）。按源码契约修正后全绿；首轮读数保留在 `raw/05-probe.txt⟧。

## 发现

### 未发现 P0 / P1 / P2 / P3

- 解析层对空内容、截断 XML、非法 OPML 均有显式中文错误；OPML 导入逐条跳过非法 URL 而不中断。
- 需要说明的行为（不是缺陷）：`sameFeedUrl⟧ 用 `URL.href⟧ 比较，`/feed⟧ 与 `/feed/⟧ 判为不同订阅，
  合并/去重时按字面 URL 处理。

## 诚实边界

- **已验**：安装、构建、自带 119 项测试、16 条独立探针（RSS/Atom/OPML/订阅 YAML/配置默认）。
- **未验**：真实 DSH 会话内的 `rss_*⟧ 工具与 Web 面板；真实网络抓取（HTTP/proxy/DNS 回退路径）；
  `web.js⟧ 路由与写审批；定时汇总注入 systemPrompt；卸载残留；非 Windows 平台；大 feed（数万条目）性能。
- **不确定**：不同站点 RSS 变体（RDF、命名空间混用）的解析边界；代理/DNS 回退在受限网络下的行为。
- **不做**：不排名、不给总分、不用星级；不做安全渗透；不改被测源码、不提 PR；不装进 live profile。

## 查重

- 账本（595 事件）：`dsh-rss⟧ **0 命中**。
- 站点：`plugins-20261019b.json⟧ 中 **reviewed=false**。
- 结论：未见同件（`@hyzyn/dsh-rss⟧ 是同名不同作者的另一个包，不在本件范围）。

## 复现步骤

```bash
# 锚定：STARDUSTLC666/dsh-rss @ 774ed13181d4c1a6423283c2dc21bb63ff33d99b
pnpm install --frozen-lockfile
pnpm run build
node --test test/*.test.mjs
node probes/probe_dsh_rss.mjs
node ../tools/make_manifest.mjs --raw raw --label "dsh-rss 0.7.0"
```

## 一句话总结

**dsh-rss 0.7.0 装得上、构建干净、自带 119 项测试全绿；RSS/Atom 解析、OPML 往返、非法 URL 跳过、
订阅 YAML 往返与配置默认在 16 条独立探针中全部符合预期。未发现 P0–P3；真实网络抓取与宿主内 UI 未验。**


## 证据链（https，站点提交用）

| # | 说明 | 链接 |
|---|---|---|
| 1 | 被测 commit（锚定） | https://github.com/STARDUSTLC666/dsh-rss/commit/774ed13181d4c1a6423283c2dc21bb63ff33d99b |
| 2 | 全部证据 | https://github.com/EQRS/dsh-eval-evidence/tree/main/evidence/dsh-rss-0.7.0 |
| 3 | report.md | https://github.com/EQRS/dsh-eval-evidence/blob/main/evidence/dsh-rss-0.7.0/report.md |
| 4 | raw-00-anchor.txt | https://github.com/EQRS/dsh-eval-evidence/blob/main/evidence/dsh-rss-0.7.0/raw-00-anchor.txt |
| 5 | raw-manifest.txt | https://github.com/EQRS/dsh-eval-evidence/blob/main/evidence/dsh-rss-0.7.0/raw-manifest.txt |
| 6 | probe_dsh_rss.mjs | https://github.com/EQRS/dsh-eval-evidence/blob/main/evidence/dsh-rss-0.7.0/probe_dsh_rss.mjs |
| 7 | 04-self-test.txt | https://github.com/EQRS/dsh-eval-evidence/blob/main/evidence/dsh-rss-0.7.0/04-self-test.txt |
| 8 | 07-probe-final.txt | https://github.com/EQRS/dsh-eval-evidence/blob/main/evidence/dsh-rss-0.7.0/07-probe-final.txt |

站点证据框格式：**每行一条 `URL` 或 `URL | 备注`**，最多 10 条；可直接粘贴 `证据链_提交文本.txt`。

```text
https://github.com/STARDUSTLC666/dsh-rss/commit/774ed13181d4c1a6423283c2dc21bb63ff33d99b | 被测 commit（锚定）
https://github.com/EQRS/dsh-eval-evidence/tree/main/evidence/dsh-rss-0.7.0 | 全部证据
https://github.com/EQRS/dsh-eval-evidence/blob/main/evidence/dsh-rss-0.7.0/report.md | report.md
https://github.com/EQRS/dsh-eval-evidence/blob/main/evidence/dsh-rss-0.7.0/raw-00-anchor.txt | raw-00-anchor.txt
https://github.com/EQRS/dsh-eval-evidence/blob/main/evidence/dsh-rss-0.7.0/raw-manifest.txt | raw-manifest.txt
https://github.com/EQRS/dsh-eval-evidence/blob/main/evidence/dsh-rss-0.7.0/probe_dsh_rss.mjs | probe_dsh_rss.mjs
https://github.com/EQRS/dsh-eval-evidence/blob/main/evidence/dsh-rss-0.7.0/04-self-test.txt | 04-self-test.txt
https://github.com/EQRS/dsh-eval-evidence/blob/main/evidence/dsh-rss-0.7.0/07-probe-final.txt | 07-probe-final.txt
```
