[intake 输入] 【测评报告】dsh-sql 0.4.5 体验快测（本地数据库 / SQL 工具 · 方法试验）

<!-- intake:v1 {"project":"bench","difficulty":"medium","impact":"B","target":"STARDUSTLC666/dsh-sql","form":"intake"} -->

<!-- 协议对齐：工程协议手册 v1.1（r2）§6 体验快测档；协议文件 sha256 8dd51cbf75b259c5dabfdb928eb112364231b5d8f9f580759534e5d78a34d849 -->
> **协议对齐（v1.1 · r2 · 体验快测档）**：本件是**体验快测**（手册 §6），只记录安装/功能点/卸载残留类检查结果；
> **不生成五种能力状态标签、不进入能力榜、不以「通过/合格」作为插件结论**；未覆盖项见「诚实边界」。
> - **协议绑定**：`工程协议手册-v1.1`（修订标识 r2），文件 sha256 `8dd51cbf75b259c5dabfdb928eb112364231b5d8f9f580759534e5d78a34d849`（快照 `测试/协议/`）。
> - **插件身份**：源码版（commit + 逐文件树指纹），见「锚定提交」。
> - **环境配置 ID**：dsh 0.2.1-rc.2 / win32-x64 / Windows 10.0.26200 / node v24.21.0 / model=n/a（本快测未调用模型）。
> - **安全口径（§4 三分法）**：本件**未做**六威胁安全审计 ⇒ 安全结论 = **未测**。
> - **时效（§13.7）**：测评完成后 90 个自然日内有效；版本/权限/数据流/依赖/宿主变化触发复核。

## 性质声明

本件是**给主创测评站 <https://review.lingshulab.com> 的投稿测评**（intake 输入，外部贡献申报），不是悬赏：
**不 /claim、不自行加 bounty 标签**；计分、档位与是否归并均由维护者裁定（marker 的 difficulty/impact 仅为 intake 格式字段）。

- 被测对象：站点「dsh-sql」详情页（清单版本 **0.4.5**）；源码取上游默认分支 `master` commit `6ed1199c` 的 tarball 解包快照。
- **未把插件装进任何正在使用的 DSH profile**：全部读数来自源码快照 + 仓库自带测试 + 直接 `import lib/*.js` 的独立探针。
- **仅 Windows**（10.0.26200 x64）：WSL / Linux / macOS 未跑，不对其它平台下任何结论。
- 不排名、不给总分、不用星级；不改被测源码、不提 PR、不做安全渗透。

## 锚定提交

- 仓库：`STARDUSTLC666/dsh-sql`，默认分支 `master`
- commit：`6ed1199c77d5ff856088cd45a6cbfe32b445dc78`（2026-10-08T12:00:01Z）
- 逐文件树指纹：**39 文件 / 2,033,620 B / sha256 `4354b22ea1c27076`**
- tarball：`外部插件/dsh-sql/dsh-sql.tgz`，sha256 `472c6793e939…`（tarball gzip 字节不保证可复现，内容锚定以 commit + 树指纹为准）
- 快照目录：`外部插件/dsh-sql/dsh-sql-master`

## 环境与基线

| 项 | 值 |
|---|---|
| 宿主 | DSH desktop **0.2.1-rc.2** |
| 平台 | Windows 11 10.0.26200 x64 |
| Node / pnpm | v24.21.0 / 11.7.0 |
| 运行依赖 | `mysql2` 3.23.3、`pg` 8.23.0（SQLite 走 `node:sqlite`，零第三方驱动） |
| 基线 | 纯 Node 内存 SQLite（`node:sqlite` `DatabaseSync`），无插件 |

## 结果速览

| 面 | 结果 |
|---|---|
| 依赖安装（`pnpm install --frozen-lockfile`） | **exit 0**，28 包，16.6 s |
| 构建（`pnpm run build`） | **exit 0**，4.7 s |
| 自带测试（`node --test test/*.test.mjs`） | **56 / 56 通过，0 失败**，0.9 s |
| 独立探针（不经插件自带断言） | **25 / 25 通过** |
| 端到端（临时 SQLite 建表/插入/查询/列结构/limit） | 通过 |

## 逐项读数

### 1. 安装（`raw/02-install.txt`）

```
command: <node> <pnpm.cjs> install --frozen-lockfile
exit: 0    seconds: 16.6
dependencies: + mysql2 3.23.3  + pg 8.23.0
devDependencies: + @types/node 24.13.3  + @types/pg 8.21.0  + typescript 5.9.3
```

### 2. 构建（`raw/03-build.txt`）

```
command: pnpm run build     # tsc -p tsconfig.json
exit: 0    seconds: 4.7
```

### 3. 自带测试（`raw/04-self-test.txt`）

```
command: node --test test/*.test.mjs
exit: 0    seconds: 0.9
tests 56 / pass 56 / fail 0 / skipped 0
```
覆盖：只读守卫（`assertReadQuery` 的 data-modifying CTE、INTO OUTFILE、行锁、PRAGMA 赋值）、
行数/超时限制、配置解析、SQLite 适配器、注册形状。

### 4. 独立探针（`raw/05-probe.txt`、`raw/06-probe-fixed.txt`）

探针脚本：`probes/probe_dsh_sql.mjs`（25 断言，**25/25 通过**）。分组：

- **只读守卫拒绝矩阵（9 条）**：DELETE / UPDATE / INSERT / DROP / `PRAGMA journal_mode=WAL` / 多语句 /
  `SELECT … INTO OUTFILE` / `FOR UPDATE` / data-modifying CTE —— 全部被拒。
- **放行矩阵（6 条）**：`SELECT`、`SHOW CREATE TABLE`、`EXPLAIN`、读取型 `PRAGMA`、只读 CTE、尾部分号规范化 —— 全部放行。
- **SQLite 端到端（7 条）**：建表 → 5 行插入 → `listTables` → `describeTable`（主键标记正确）→ 全量查询 →
  `limit=2` 生效 → `ping`/`close` 正常。
- **其它（3 条）**：CSV 引号/逗号/换行转义；`resolveConfig` 默认 `:memory:` 且拒绝非法 engine；已 abort 的 signal 让 `query` 立即失败。

> 方法学说明：首轮探针把适配器方法名写成 `columns()`，实际契约为 `describeTable()`；
> 首轮失败读数保留在 `raw/05-probe.txt`（exit 1），修正后 `raw/06-probe-fixed.txt` 为 25/25。这是探针错误，不是插件缺陷。

## 发现

### P3-1 · data-modifying CTE 被拒，但错误信息指向 `SELECT INTO`（误导）

- **现象**：`sql_query` 对 `WITH x AS (INSERT INTO t … RETURNING *) SELECT * FROM x` 返回
  `sql_query 不接受 SELECT INTO（写表或 OUTFILE），请用 sql_exec。`（`raw/06-probe-fixed.txt`）
- **根因**：`assertReadQuery` 先命中 `/\binto\b/i` 分支（INSERT 语句里含 `INTO`），未走到写关键字扫描；
  行为上**拒绝是正确的**，但提示把用户引向 `SELECT INTO`，而实际是写 CTE。
- **影响**：仅错误提示可读性；不影响只读保证。
- **建议**：`INTO` 检查前先判定语句是否含写关键字，或在提示中列出同时命中的关键字。

### 未发现 P0 / P1 / P2

- 只读守卫在 9 类危险语句上均拒绝，且未发现可绕过的注释/字符串拼接路径（本件未做穷举 fuzz）。
- SQLite 路径完全离线，无外部服务依赖。

## 诚实边界

- **已验**：安装、构建、自带 56 项测试、25 条独立探针、SQLite 端到端（含 limit 与 abort）、只读守卫矩阵。
- **未验**：真实 DSH 会话内工具注册与 UI；MySQL/PostgreSQL 连接（本机无服务，未启动容器）；
  官方安装通道（插件面板/npm 安装）；卸载残留；并发访问与长时间运行；非 Windows 平台。
- **不确定**：只读守卫面对极端编码/巨大 SQL 文本的行为未测；`node:sqlite` 在其它 Node 版本的行为未测。
- **不做**：不排名、不给总分、不用星级；不做安全渗透/利用；不改被测源码、不提 PR；不把插件装进 live profile；
  不对非 Windows 平台下任何结论。

## 查重

- 账本 `dsh-bounty-main/docs/bounty/ledger.json`（595 事件）：`dsh-sql` **0 命中**。
- 全仓 md 文本（3,048 个，排除 `node_modules`/`外部插件`/本件目录）：**0 命中**（`raw/09-dedupe-grep.txt`）。
- 站点：`plugins.json` 中 `dsh-sql` **reviewed=false（暂无评测）**。
- 结论：对照「账本 / 全仓文本 / 站点列表」三处，未见同件。

## 复现步骤（第三方原样可跑）

```bash
# 0) 记锚定（在 install/build 之前）
#    repo STARDUSTLC666/dsh-sql @ 6ed1199c77d5ff856088cd45a6cbfe32b445dc78
# 1) 装依赖（本机 node 不在 PATH，需显式指定）
pnpm install --frozen-lockfile
pnpm run build
node --test test/*.test.mjs
# 2) 离线探针
node probes/probe_dsh_sql.mjs
# 3) 证据
node ../tools/make_manifest.mjs --raw raw --label "dsh-sql 0.4.5"
```

## 一句话总结

**dsh-sql 0.4.5 在本机（Windows 11 / DSH 0.2.1-rc.2 / Node 24.21.0）离线可装、可构建、自带 56 项测试全绿；
只读守卫在 9 类危险语句上均正确拒绝，SQLite 端到端（含行数限制与 abort）25 条独立探针全部符合预期；
唯一发现是 P3 级错误提示误导（写 CTE 被提示成 SELECT INTO）。MySQL/PostgreSQL 与真实宿主 UI 未验。**
