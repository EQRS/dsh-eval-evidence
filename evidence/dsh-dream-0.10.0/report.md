[intake 输入] 【测评报告】dsh-dream 0.10.0 体验快测（反思记忆 / 经验复用 · 方法试验）

<!-- intake:v1 {"project":"bench","difficulty":"medium","impact":"B","target":"STARDUSTLC666/dsh-dream","form":"intake"} -->

<!-- 协议对齐：工程协议手册 v1.1（r2）§6 体验快测档；协议文件 sha256 8dd51cbf75b259c5dabfdb928eb112364231b5d8f9f580759534e5d78a34d849 -->
> **协议对齐（v1.1 · r2 · 体验快测档）**：本件是**体验快测**（手册 §6），只记录安装/功能点/卸载残留类检查结果；
> **不生成五种能力状态标签、不进入能力榜、不以「通过/合格」作为插件结论**；未覆盖项见「诚实边界」。
> - **协议绑定**：`工程协议手册-v1.1`（修订标识 r2），文件 sha256 `8dd51cbf75b259c5dabfdb928eb112364231b5d8f9f580759534e5d78a34d849`（快照 `测试/协议/`）。
> - **插件身份**：源码版（commit + 逐文件树指纹）或发布包版（版本 + 哈希），见「锚定提交」。
> - **环境配置 ID**：dsh 0.2.1-rc.2 / win32-x64 / Windows 10.0.26200 / node v24.21.0 / model=n/a（本快测未调用模型）/ 依赖与外部服务见「环境与基线」。
> - **安全口径（§4 三分法）**：本件**未做**六威胁安全审计 ⇒ 安全结论 = **未测**（不是「未发现问题」，也不是「已验证通过」）。
> - **时效（§13.7）**：测评完成后 90 个自然日内有效；版本/权限/数据流/依赖/宿主变化触发复核，旧报告不自动适用于新版本。


## 性质声明

本件是 **intake 输入**（外部贡献申报），不是悬赏：**不 /claim、不自行加 bounty 标签**；本件为
**review.lingshulab.com 主创测评站投稿**（站点当前对 `@stardustlc/dsh-dream` 显示「暂无评测」）。
计分与档位由维护者裁定。

- **四态边界**：下文每条面向声明均落在「已验 / 未验 / 不确定 / 不做」四态之一，未跑的项目如实写「未验」，不把未验写成已验。
- **只跑 Windows**：本机 Windows 11（10.0.26200）x64 单平台；WSL / Linux / macOS **未跑**，不对这些平台下任何结论。
- **不排名、不给总分、不用星级**：只给逐项读数与 P 级发现；P 级按「不做会怎样」分级，不代表总体评分。
- **不装 live profile**：插件**没有**装进任何正在使用的 DSH profile；全部读数来自**仓库副本内**的 `pnpm install` + `tsc` 构建 + `node --test` + 独立探针（临时目录夹具）。本机 live profile 只读核对见 `raw/02-env-baseline.txt`。

## 锚定提交

- 被测包：`@stardustlc/dsh-dream`，声明版本 **0.10.0**（`package.json`）。
- 上游仓：`STARDUSTLC666/dsh-dream`，锚定 commit **`8a0ae7fd67560fb7075660677b474cb6f07f0f83`**（提交时间 **2026-10-17T15:15:21Z**，提交信息 `feat: 设置面板新增首次使用分步引导`）。本机经 `gh-proxy.com` 复核 commit API 与 tarball，见 `raw/00-anchor-upstream.txt`、`raw/00-upstream-commit.json`。
- **tarball 锚定复核**：任务给定 sha256 `acb24546c8514c4206184c7dbb463c66222b9b92596b648662e5cd93590c9df6` 对应 **master 分支** tarball（2,291,880 B，本机重取一致）；**commit** tarball 为 2,292,356 B / sha256 `6fd1abfa…`，两者仅顶层目录名不同（`dsh-dream-master` vs `dsh-dream-<sha>`）。commit tarball 解包后的树指纹与本地解包源码**完全一致**，故本地源码可视为该 commit 的快照。
- **本地源码树（无 `.git`）逐字节锚**（`raw/01-anchor.txt`）：

| 范围 | 文件数 | 字节 | 树指纹（sha256） |
|---|---:|---:|---|
| 整棵树 | 119 | 3,362,370 | `1cce18a95af601ef1c6cf5971efd6d67945864d5427d25a12badfea2a5260d19` |
| `src/` | 17 | 347,164 | `3a7d97371a55d7b674a4a113ebf1845a426e189ba990e2e9cebac88650a3862d` |
| `lib/`（随包构建产物） | 35 | 542,784 | `4988205ffd21f76161f85902fd8160b771f0e07f1cc947da1ee935c1e0f19feb` |
| `test/` | 35 | 421,010 | `82a740c895bf3d7b40326bb0538400655e4f68f22c064148cacdb8a6c2c8db0f` |
| `skills/` | 1 | 14,944 | `541079ad60b376a1744339e58507dcb626f61d181a49f65d3cc96d2a5e94237f` |
| `docs/` | 13 | 69,016 | `643f1e0ee4b14220b0d9f628528bcd8f995f261692e8aa35fd930891affd5e8c` |

- `package.json` sha256 = `da108c9e329874163a26d5bfd3b9df3ceab75449b645ad9b1ebb500286170a9c`；`pnpm-lock.yaml` = `7e5c52d8…`；`tsconfig.json` = `cfb6cdd8…`；`cordis.patch.yml` = `756cc598…`。
- **版本面注记**：`docs/validation/` 最新只有 `0.9.0.md`，`0.9.1` / `0.10.0` **无专项验收记录**（见 P3-3）；本件结论只对上述树指纹的 **0.10.0 快照**成立，不等价于「npm 上 0.10.0 发布包逐字节相同」。

## 环境与基线

| 项 | 读数 | 证据 |
|---|---|---|
| 操作系统 | Windows 11 Home China，`10.0.26200`，x64；机器名 `bbs` | `raw/02-env-baseline.txt` |
| 宿主 | DeepSeek Harness **0.2.1-rc.2**（读 `app.asar` 根 `package.json`：`@deepseek-ai/dsh-desktop@0.2.1-rc.2`，`dshBuildCommit=332895e0…`，nightly 通道） | 同上 |
| Node | **v24.21.0**（DSH 自带：`…\dsh-runtimes\dsh-primary-runtime\dependencies\node\bin\node.exe`） | 同上 |
| pnpm | `pnpm --version` = **11.28.5**；实际执行 `pnpm.mjs` 时按 `packageManager` 字段用 **v11.7.0** | `raw/02`、`raw/03-install-first.txt` |
| 其他工具 | Python 3.12.10；`cargo` 在 PATH；**git / npm / pnpm / cl 不在 PATH** | `raw/02` |
| 网络 | `registry.npmjs.org` HTTP 200；`review.lingshulab.com` HTTP 200 | `raw/02` |
| live profile 插件面 | 仅 `@dsh-external/dsh-vibe-island` + 6 个官方 bundle；**`dsh-dream` 未安装** | `raw/02` |
| 被测件基线 | 仓库副本（非 live）：`src/ lib/ test/ skills/ docs/ scripts/ .github/`；无 `node_modules`（安装后 3 个包） | `raw/01`、`raw/03-install-first.txt` |

> 基线口径：本件是**源码快照 + 自带测试 + 纯函数/工具层探针**，不是「装进 DSH 后的端到端体验」；后者的读数全部列入「未验」。

## 结果速览

| 面 | 结果 | 证据 |
|---|---|---|
| 装依赖（`pnpm install --frozen-lockfile --ignore-scripts`） | **exit 0**，4.0 s（缓存复用；3 个包：typescript 5.6.2、@types/node 24.13.3） | `raw/03-install-first.txt`、`raw/03b-installed-versions.txt` |
| `pnpm run typecheck`（`tsc --noEmit`） | **exit 0**，7.7 s，无诊断 | `raw/04-typecheck.txt` |
| `pnpm run build`（`tsc`） | **exit 0**，11.6 s | `raw/05-build.txt` |
| 构建可复现 | 重新构建的 `lib/` 与随包 `lib/` **35/35 文件逐字节相同**（指纹相等） | `raw/07-lib-reproducibility.txt` |
| 自带测试门（31 个 `*.test.mjs`，`node --test "test/*.test.mjs"`） | **320 项 / 319 通过 / 0 失败 / 1 跳过**，8,237 ms，runner **exit 0**；唯一跳过=并发压测（需 `DSH_DREAM_STRESS=1`） | `raw/06-self-test.txt` |
| 并发压测（可选，`DSH_DREAM_STRESS=1`） | **1/1 通过**，1,577 ms（8 进程 × 8 次写入不丢） | `raw/06b-stress-concurrency.txt` |
| 探针 A：回顾会话 + 反思日记 | v4 zstd / v0 旧代并存取新版、子代理过滤、打包行流式兜底、梦原料脱敏、日记写入/倒序/检索、BOM+坏行兼容**全部符合声明** | `raw/08-probe01-digest-journal.txt` |
| 探针 B：核验 / 去重 / 审阅 / 复用 | 来源核验（read/claimed）、同指纹合并、同一来源不重复计支持数、候选不注入、accept 后可检索、项目/工作区/平台/版本/包名识别/预算/到期**全部符合声明** | `raw/09-probe02-learn-review-retrieve.txt` |
| 探针 C：跨重启与迁移 | 新进程读回一致；删 `index.json` 后从 `events.jsonl` 全量重建；未知 `schemaVersion` 可诊断；自动状态损坏 fail-closed；跨进程锁「活主忙 / 死主回收」 | `raw/10-probe03-write.txt`、`raw/11-probe03-read.txt` |
| 查重 | 账本 **595** 事件中 0 次；全仓 378 文件 0 命中；公开站 `dsh-dream` 条目显示「暂无评测」 | `raw/20-dedupe.txt` |
| 发现 | **4 × P3**（脱敏占位符被二次替换、0.10.0 引导未进用户文档、版本验收记录未同步、脱敏开关适用范围易误读），**无 P0/P1/P2** | 见下节 |

## 逐项读数

### 1. 安装、类型检查、构建与构建可复现

```text
install   : exit 0, 4043 ms, "Already up to date / +3 packages", pnpm v11.7.0
typecheck : exit 0, 7736 ms, '$ tsc -p tsconfig.json --noEmit'（无其它输出）
build     : exit 0, 11583 ms, '$ tsc -p tsconfig.json'
pnpm list : @types/node@24.13.3, typescript@5.6.2（2 devDependencies，0 runtime deps）
lib 比对  : committed 35 files fingerprint=00623dd8…  rebuilt 35 files fingerprint=00623dd8…
            fingerprintEqual=true, identical files=35/35, differences=(none)
```

> 说明：`lib/` 是随包提交的构建产物。重新 `tsc` 后 35 个产物与仓库内 `lib/` **逐字节相同**，说明「仓库里的 `lib/` 与 `src/` 同步」且 tsc 版本（5.6.2）不引入字节漂移。

### 2. 自带测试门（320 项）

```text
tests 320 | suites 0 | pass 319 | fail 0 | cancelled 0 | skipped 1 | todo 0
duration_ms 8237.3785   (runner exit 0)
唯一跳过：﹣ 并发写：8 进程 × 8 次不丢（默认跳过，DSH_DREAM_STRESS=1 运行） # 设置 DSH_DREAM_STRESS=1 运行
补充跑：DSH_DREAM_STRESS=1 node --test test/concurrency.test.mjs
         ✔ 并发写：8 进程 × 8 次不丢  1/1 pass, 1577 ms
```

覆盖面（按测试文件标题归并）：会话代际（v0–v4 / zstd / packed-chunk）、日记、知识存储、检索、审阅与冲突、桥接
preview/apply/rollback、Web 只读路由与写入记录路由、客户端模块注册契约、自动整理排队/预算/租约、L1 评测、
旧行为基线、证据纪律。另有测试内诊断行 `SKIP 断链用例：当前环境不允许创建文件符号链接（EPERM）`（该用例自身转
junction 路径继续，不是跳过项）。

### 3. 独立探针 A：回顾会话（`dream_digest`）与反思日记（`raw/08`）

夹具：`sess-a`（v4 多帧 zstd，2 轮，含注入上下文消息与内嵌流式片段；同目录另放 v0 旧代 `session.jsonl`）、
`sess-b`（v0 纯文本 + `text-chunks`/`tool-call-chunks` 打包行）、`sess-sub`（`origin=subagent`）、`sess-c`（含 `sk-` 密钥）。

```text
listSessionFiles scanned=4（每个会话只取最新代：sess-a 取 session.v4.jsonl.zstd，不读旧 session.jsonl）
dream_digest count=3（sess-a / sess-b / sess-c；sess-sub 被过滤，subagentIncluded=false）
  sess-a: title="SMTP 取消投递会话", turns=2, tools=["bash"]
          userMessages=["取消发送后 SMTP 还在投递","那就把连接确实关掉再返回"]（system 注入未计入）
          assistantTail 2 条；digestText 135B
  sess-b: title="输入法问题排查", turns=1；assistantTail 为空但 digestText 含「最终回应（流式还原）：先重启输入法进程，再开兼容模式」
  sess-c: userMessages=["我的 token=[已脱敏·凭据] sk 密钥] 泄露了"]（原密钥未出现，maskSecretsApplied=true）
dream_save ×2 → dreams.jsonl 2 行；dream_journal count=2, moods={"坚定":1,"平静":1}, skippedLines=0
dream_recall query=输入法 → count=1
空 reflection 被拒："梦境反思（参数 reflection）为必填，请提供非空字符串。"
旧格式兼容：BOM 开头 + 缺 mood/lessons + 1 行坏 JSON → readDreamsDetailed dreams=1, skippedLines=1；dreamStats total=1, moods={"平静":1}
[2b] dream_save 落盘含原始 sk 密钥=true，落盘含脱敏占位=false（对照：digest 输出已脱敏）
```

### 4. 独立探针 B：来源核验 / 去重 / 审阅门槛 / 复用检索（`raw/09`）

```text
[A1] read + 真实会话记录 → verification=read/source-verified，state=candidate，独立支持=1
[A2] read + 不存在的会话 → claimed/session-not-found-or-ambiguous，state=candidate，支持=0
[A3] claimed 声明          → claimed/model-claimed，state=candidate，支持=0
[B1] 完全相同再提交        → created=false，同一 lessonId，支持仍=1（幂等）
[B2] 同指纹 + 新来源(seq9) → created=false，合并，支持=2
[B3] 同一来源(seq7)换 claimed 复述 → created=false，支持仍=2（on-disk evidenceCount=3）
[C1] accept 前 dream_context → items=0；skipped=[candidate-hold, no-evidence×2]
[C2] includeCandidates=true → items=1（state=candidate），无证据仍 no-evidence 被扣
[D1] dream_review accept（rev3）→ usable，revision=4，review={decision:accepted, actor:model}
[D2] accept 后 dream_context → items=1，budget={limit:5,maxChars:3000,usedChars:213}；
     when/action/exceptions 完整，evidenceSummary=「独立证据 2 条（已读 2 / 仅声明 1）」
[D3] 换项目 proj-beta → items=0（不跨项目）    [D4] 未知项目 → items=0（只回 global）
[D5] workspaceRoot 相同 → items=1；不同 → items=0
[E] windows+9.0.5 → items=2；linux → platform-mismatch；8.1.0 → version-mismatch；
    query 不含包名 + 显式 packageName=some-other-lib → items=2（版本条件不参与，符合 R3）；
    无包名上下文 → items=2；limit=1 → 1 条 + reason=limit；maxChars=1 → 0 条 + reason=budget-stop
[F] 合成老化（reviewAfter=2020-01-02、review.at=2020-01-01）→ usable 条目 reason=review-due 被扣
[G] 显式 global 经验 + 未知项目 → items=1（scopeLabel="全局"）
[H] maskSecrets("my token=sk-probe…7890 leaked") → "my token=[已脱敏·凭据] sk 密钥] leaked"（见 P3-1）
```

### 5. 独立探针 C：跨重启 / 迁移 / 损坏兜底（`raw/10`、`raw/11`，两个独立 node 进程）

```text
[write] dream_save + learn(accepted rev2 / candidate / rejected) + 自动状态(calls=3, pending=1, cursors, policies)
        context(before restart)=1 条；index.json 紧凑序列化 lines=1
[read ] 新进程 pid=38916
[R1] context items=1，lessonId@revision 与 write 阶段一致（usable）；dream_journal count=1
     stats: lessons=3 evidence=3 events=8 replayMode="snapshot+tail" replayedEvents=0 unreplayedEvents=8
[R2] 删除 index.json → 再读：items 相同；stats replayMode="full" replayedEvents=8；
     events.jsonl 未变（sha 相同）；candidate/rejected 状态保持；读路径未重建 index.json（零写盘）
[R3] 追加未知 schemaVersion=999 事件 → store 可读、lessons 仍 3、stats.unsupportedVersions=1（可诊断，不炸）
[R4] state.json 写成坏 JSON → read/update 均抛错（fail-closed），坏文件保持原样，无 .lock 残留
[R5] 跨进程锁：活主（本进程 pid + 新鲜 mtime）→ "automatic-storage-busy"；
     死主 pid + mtime 回拨 120 s → 回收并写入成功（calls=9，.lock 已清理）
```

### 6. 查重读数（`raw/20`）

```text
dsh-bounty 账本（docs/bounty/ledger.json）：events=595；含 "dsh-dream" 的事件=0（原文出现 0 次）
review 子站数据（review/data/plugins.json）：0 条 entry；"dsh-dream" 命中 0
全仓文本检索（378 个 md/json/yml/yaml/html/py/mjs/js/ts/txt 文件）：命中 0
公开站 review.lingshulab.com/plugins?tag=agent-memory：HTTP 200，出现 "dsh-dream" 4 次，均相邻「暂无评测」
公开站 /reviews：HTTP 200，出现 "dsh-dream" 0 次（无该件评测）
```

## 发现

> 分级按「不做会怎样」；本轮无 P0/P1/P2，4 条 P3 均为体验/文档/脱敏可读性级别，**不改变已发布的记忆与检索主流程**。
> 每条均在 `raw/` 有原始读数；被测源码未改动。

### P3-1 · `maskSecrets` 的占位符会被下一条规则二次替换，输出里残留「`sk 密钥]`」残片

**读数**（`raw/09` [H]，同现象也出现在 `raw/08` 的 `sess-c` 脱敏结果）：

```text
in  = "my token=sk-probeABCDEFGHIJKLMNOP1234567890 leaked"
out = "my token=[已脱敏·凭据] sk 密钥] leaked"
二次脱敏结果相同（幂等，不是无限膨胀）
```

**机制**（静态定位）：`src/mask.ts` 先把 `sk-…` 替换成 `[已脱敏·疑似 sk 密钥]`（L9–17、L32–34），
随后 `CRED_ASSIGN`（L20）以 `token=` 后的非空白串为值再替换一次，把占位符前半段当成凭据值，
于是留下标签残片 `sk 密钥]`。

**影响**：**没有泄露原始密钥**（实测原串消失），但 dream 原料 / 经验摘要等下游文本会被打乱成不可读片段；
排障时容易误判为「脱敏损坏」。属可读性缺陷，不影响落盘与检索逻辑。

**建议**：先处理凭据赋值再做模式替换，或把替换占位符用不可再匹配的哨兵（最后统一回填），并为该重叠输入加一条单测。

### P3-2 · 0.10.0 的「首次使用引导」只在 CHANGELOG 与前端 bundle 里，README/USAGE 无说明

**读数**（`raw/12-version-surface.txt`）：

```text
declared version = 0.10.0；CHANGELOG 顶部 = "## 0.10.0（2026-10-17）"，含「首次使用」
lib/client.js bytes=148,889（UTF-8 字符 134,153）；包含 "dsh-first-run:dsh-dream:v1" = true；包含「首次使用」= true
README.md 含「首次使用」= false；docs/USAGE.md 含「首次使用」= false
```

**影响**：升级到 0.10.0 的用户只有翻 CHANGELOG 才知道引导存在、以及「清 `dsh-first-run:dsh-dream:v1` 可重看」这个
可操作提示；手册（USAGE）没有对应条目。属文档同步缺口。

**建议**：在 USAGE 的「开始使用」补一小节，写明自动出现一次、可跳过、重看方法。

### P3-3 · 版本验收记录停在 0.9.0：0.9.1 / 0.10.0 没有专项验收文件

**读数**（`raw/12`）：

```text
docs/validation = ["0.5.1.md","0.5.2.md","0.6.0.md","0.7.0.md","0.8.0.md","0.8.1.md","0.9.0.md"]
0.10.0 acceptance = false
docs/VALIDATION.md 链接 = validation/0.9.0.md … 0.5.1.md（无 0.9.1/0.10.0）
```

**影响**：仓库此前的惯例是每个版本一份验收记录（含宿主版本、范围与限制）；0.9.1（紧凑索引）与 0.10.0（引导）
在测试与 CHANGELOG 层面有覆盖，但缺「本版在什么宿主/平台、验了什么、没验什么」的独立记录，第三方复核时
只能依赖全量测试门。属流程/文档一致性缺口，不是代码缺陷。

### P3-4 · 脱敏开关 `maskSecrets` 的适用范围容易误读：`dream_save` 写盘是原文

**读数**（`raw/08` [2b]）：开了默认 `maskSecrets` 后，`dream_digest` 的会话文本会脱敏，但 `dream_save(reflection=…)`
落盘 `dreams.jsonl` **含原始 `sk-` 密钥**（`落盘含原始密钥=true`，`落盘含脱敏占位=false`）。
源码侧 `dream_save` 直接调 `saveDream`（`src/tools.ts` L393–400），未过 `mask.ts`。

**影响**：文档 USAGE 的脱敏清单只列「M1 的经验 / 证据 / 错误 / 桥接写盘路径」，同页另有「梦境日记本身是明文存储」的
提示，因此**不算安全漏洞**；但「隐私保护（默认开启）」的标题与 `maskSecrets` 的配置说明（「梦原料隐私脱敏」）
容易被读成「日记也会脱敏」。属期望管理/文档边界问题。

**建议**：在配置与 USAGE 明确写「日记正文不脱敏（明文存储）」，或给 `dream_save` 增加可选脱敏开关。

### 已验的正面结论（同样逐项可复跑）

- 构建链干净：`typecheck` / `build` 均 exit 0 且无诊断；重新构建的 `lib/` 与随包产物 **35/35 逐字节一致**。
- 自带门禁 **320 项 / 0 失败**；可选并发压测开启后 **1/1 通过**（8 进程 × 8 次写入不丢）。
- 会话回放：v4 多帧 zstd、v0 旧代并存只取最新代、子代理过滤、`text-chunks`/`tool-call-chunks` 流式兜底、
  v4 `source.kind!=user` 注入不计入用户原话、`maskSecrets` 生效——均按 README/USAGE 声明工作。
- 经验记忆的「先候选、再核验、再审阅、后才复用」链路成立：read 声明必须真读到、伪造降 claimed、同指纹合并、
  同来源不重复计独立支持、候选默认不注入、accept 后按项目/工作区/平台/版本/包名/预算正确筛选、到期条目扣留。
- 跨进程持久化成立：新进程读回一致；派生索引可删可重建（`snapshot+tail` → `full` 回放）；未知 schemaVersion
  只计入 `unsupportedVersions` 不炸读取；自动状态损坏 fail-closed 且不改原文件；跨进程锁能区分活主与可回收死主。
- 查重：账本 595 事件、全仓 378 文件、review 子站数据、公开站页面四路均无同件。

## 诚实边界

- **已验**：`pnpm install/typecheck/build`；`lib/` 构建可复现；自带 320 项测试 + 可选并发压测；探针 A（会话回放/日记）；
  探针 B（核验/去重/审阅/复用/预算/到期）；探针 C（跨进程读回/索引重建/未知版本/损坏兜底/锁回收）；查重四路；
  0.10.0 版本面静态读数（含引导键在前端 bundle 中存在）。
- **未验（没跑，列原因）**：
  1. **官方安装通道**（`dsh plugin add @stardustlc/dsh-dream` / 插件面板安装 / 重启宿主）：按纪律不把被测插件装进 live
     profile，本机也无 `dsh` CLI 在 PATH；
  2. **真实 DSH 宿主内的自动整理与自动取回**（会话事件、Agent Inbox、动态上下文、模型调用）：需要真实宿主适配层与
     模型额度；离线只能测纯函数与工具层，未调用任何真实模型；
  3. **「设置 → 梦境日记」面板与 0.10.0 首次使用引导的真实渲染**（含窄窗/深浅色/中英文）：需要真实 GUI 加载插件
     bundle；本轮只静态确认 `lib/client.js` 含引导键与文案；
  4. **`dream_bridge` 对真实 `AGENTS.md` 的 preview/apply/rollback**：不是「反思记忆」主线，且需要真实工作区写入；
     仅由自带测试覆盖（本报告不另做独立读数）；
  5. **Linux / macOS / WSL**：单平台，未跑；跨平台 applicability 只做了参数级模拟（`platform` 显式传参）；
  6. **真实大知识库性能**（仓库已声明写入 O(历史)、0.9.1 只降常数）：本轮只写 3 条经验，1,000 条的
     「1359KB→926KB / 18.2ms→16.6ms」等 0.9.1 声明**未复测**，只确认 `index.json` 为单行紧凑序列化；
  7. **0.2.1-rc.2 上的宿主兼容**：README 声明的已验宿主是 `0.2.0-rc.2` 与 `0.2.1-alpha.1`，当前宿主 `0.2.1-rc.2`
     不在其中，自动面在该版本上的行为未验。
- **不确定**：
  1. `dream_save` 不脱敏是否符合作者预期（文档有明文提示，但开关名易误读，见 P3-4）；
  2. `applicability` 写成**多个条目**时的组合语义：实测两条 entry（`{package,versions}` + `{platform}`）在 linux 查询下
     仍会注入（因为无平台约束的 entry 恒为「平台通过」）；究竟是「entry 间 OR」还是「应合成 AND」，文档未写死；
  3. 0.9.1/0.10.0 缺 `docs/validation` 记录是流程遗漏还是有意（P3-3）；
  4. 自动状态损坏时把原因暴露为原始 `JSON.parse` 错误文本（`Expected property name…`）而非统一
     `automatic-state-invalid`，对最终用户是否足够可操作——面板层如何包装未验。
- **不做**：不排名 / 不给总分 / 不用星级；不把插件装进 live profile；不做安全渗透或漏洞利用；不改被测源码、不提 PR；
  不对非 Windows 平台下结论；不重算历史版本（0.5.x–0.9.x）的既有读数。

## 查重

对照：

- `dsh-bounty` 快照账本 `docs/bounty/ledger.json`（**595** 个事件）——`dsh-dream` 出现 **0** 次；
- `review/data/plugins.json`（review 子站数据）——**0** 条 entry，`dsh-dream` 命中 **0**；
- 全仓 378 个文本文件（md/json/yml/yaml/html/py/mjs/js/ts/txt）——命中 **0**；
- 公开站 <https://review.lingshulab.com/plugins?tag=agent-memory>——`dsh-dream` 条目出现 4 次，全部相邻「暂无评测」；
- 公开站 <https://review.lingshulab.com/reviews>——`dsh-dream` 命中 **0**（无该件评测）。

⇒ 结论：**对照 dsh-bounty 账本 / review 子站数据 / 全仓文本 / 公开测评站，未见同件**。原始读数见 `raw/20-dedupe.txt`。

## 复现步骤（第三方原样可跑）

环境：Windows x64、Node v24.21.0（DSH 自带；本机无 git/npm，pnpm 用 `node pnpm.mjs` 跑）；
以下命令在本机实测。**只在临时副本里安装依赖，不碰 live profile。**

```bash
# 0) 取件与锚定（需要网络；本机 hosts 把 github 域名指向 127.0.0.1，故走 gh-proxy）
cd D:\natnat\lingshu
node 测试\tools\gh-fetch.mjs --mode api ^
  --path repos/STARDUSTLC666/dsh-dream/commits/8a0ae7fd67560fb7075660677b474cb6f07f0f83 --out commit.json
node 测试\tools\gh-fetch.mjs --mode tarball --repo STARDUSTLC666/dsh-dream --ref master --out dsh-dream-master.tgz
# 期望 sha256 = acb24546c8514c4206184c7dbb463c66222b9b92596b648662e5cd93590c9df6

# 1) 建仓库副本（被测源码不就地安装依赖）
mkdir %TEMP%\dsh-dream-probe 2>nul
xcopy /E /I D:\natnat\lingshu\外部插件\dsh-dream\dsh-dream-master %TEMP%\dsh-dream-probe\work
cd /d %TEMP%\dsh-dream-probe\work
set PATH=C:\Users\30951\.dsh\dsh-runtimes\dsh-primary-runtime\dependencies\node\bin;%PATH%
node C:\Users\30951\.dsh\dsh-runtimes\dsh-primary-runtime\dependencies\pnpm\bin\pnpm.mjs install --frozen-lockfile --ignore-scripts
node C:\Users\30951\.dsh\dsh-runtimes\dsh-primary-runtime\dependencies\pnpm\bin\pnpm.mjs run typecheck
node C:\Users\30951\.dsh\dsh-runtimes\dsh-primary-runtime\dependencies\pnpm\bin\pnpm.mjs run build
node --test "test/*.test.mjs"                         # 期望 320 项 / 319 通过 / 1 跳过，exit 0
set DSH_DREAM_STRESS=1
node --test test/concurrency.test.mjs                 # 期望 1/1 通过

# 2) 锚定指纹与构建可复现（probe 只读）
cd /d D:\natnat\lingshu\测试\dsh-dream
node probes\probe-anchor.mjs D:\natnat\lingshu\外部插件\dsh-dream\dsh-dream-master
node probes\probe-lib-diff.mjs D:\natnat\lingshu\外部插件\dsh-dream\dsh-dream-master\lib %TEMP%\dsh-dream-probe\work\lib
# 期望 fingerprintEqual=true, identical files=35/35

# 3) 独立探针（离线；每个自带夹具与临时目录，不写 live 数据）
node probes\probe-01-digest-journal.mjs --plugin %TEMP%\dsh-dream-probe\work
node probes\probe-02-learn-review-retrieve.mjs --plugin %TEMP%\dsh-dream-probe\work
node probes\probe-03-restart-migration.mjs --plugin %TEMP%\dsh-dream-probe\work --dir %TEMP%\dsh-dream-probe\probe03-state --phase write
node probes\probe-03-restart-migration.mjs --plugin %TEMP%\dsh-dream-probe\work --dir %TEMP%\dsh-dream-probe\probe03-state --phase read
node probes\probe-version.mjs --plugin %TEMP%\dsh-dream-probe\work

# 4) 查重与环境基线（只读；查重需网络）
node probes\probe-dedupe.mjs
node probes\probe-env.mjs

# 5) 证据整理
node ..\tools\normalize_raw.mjs raw
node ..\tools\make_manifest.mjs --raw raw --label "dsh-dream 0.10.0 @8a0ae7f"
node ..\tools\make_issue.mjs --report "dsh-dream\测评报告_dsh-dream_v0.1.md"
```

> `run-command.mjs` 是本机的「干净捕获」小工具：Windows PowerShell 5.1 对原生命令的 `2>&1` 会写成
> `NativeCommandError` + UTF-16，直接重定向会污染证据，故用 Node 逐条执行并落 `stdout/stderr/合并文本`。

## 一句话总结

**dsh-dream 0.10.0 在本机（Windows 11 / DSH 0.2.1-rc.2 / Node 24.21.0）源码快照上构建可复现（`lib/` 35/35 逐字节一致）、
自带 320 项测试 319 通过 0 失败（1 项并发压测默认跳过，开启后 1/1 通过），独立探针验证了「会话回放→记梦→候选经验→
来源核验→审阅→复用于后续任务」的整条链路与跨进程持久化/索引重建/损坏兜底均按声明工作；发现 4 条 P3（脱敏占位符
二次替换残留、0.10.0 引导未进用户文档、版本验收记录停在 0.9.0、`dream_save` 脱敏范围易误读），无 P0–P2；真实宿主
端到端、面板/引导渲染与非 Windows 平台未验。**
