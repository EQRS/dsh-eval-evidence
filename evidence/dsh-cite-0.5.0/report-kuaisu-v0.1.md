[intake 输入] 【测评报告】dsh-cite 0.5.0 体验快测（DOI / BibTeX 文献工作台 · 方法试验）

<!-- intake:v1 {"project":"bench","difficulty":"medium","impact":"B","target":"STARDUSTLC666/dsh-cite","form":"intake"} -->

<!-- 协议对齐：工程协议手册 v1.1（r2）§6 体验快测档；协议文件 sha256 8dd51cbf75b259c5dabfdb928eb112364231b5d8f9f580759534e5d78a34d849 -->
> **协议对齐（v1.1 · r2 · 体验快测档）**：本件是**体验快测**（手册 §6），只记录安装/功能点/卸载残留类检查结果；
> **不生成五种能力状态标签、不进入能力榜、不以「通过/合格」作为插件结论**；未覆盖项见「诚实边界」。
> - **协议绑定**：`工程协议手册-v1.1`（修订标识 r2），文件 sha256 `8dd51cbf75b259c5dabfdb928eb112364231b5d8f9f580759534e5d78a34d849`（快照 `测试/协议/`）。
> - **插件身份**：源码版（commit + 逐文件树指纹）或发布包版（版本 + 哈希），见「锚定提交」。
> - **环境配置 ID**：dsh 0.2.1-rc.2 / win32-x64 / Windows 10.0.26200 / node v24.21.0 / model=n/a（本快测未调用模型）/ 依赖与外部服务见「环境与基线」。
> - **安全口径（§4 三分法）**：本件**未做**六威胁安全审计 ⇒ 安全结论 = **未测**（不是「未发现问题」，也不是「已验证通过」）。
> - **时效（§13.7）**：测评完成后 90 个自然日内有效；版本/权限/数据流/依赖/宿主变化触发复核，旧报告不自动适用于新版本。


## 性质声明

本件是**给主创测评站 <https://review.lingshulab.com> 的投稿测评**（intake 输入，外部贡献申报），不是悬赏：
**不 /claim、不自行加 bounty 标签**；计分、档位与是否归并均由维护者裁定。

- 被测对象：站点「dsh-cite」详情页（清单版本 **0.5.0**，上游状态「可访问」，本站评测 **0**）；
  源码取上游默认分支 commit `3f6276e9…` 的 GitHub tarball 解包快照。
- **未把插件装进任何正在使用的 DSH profile**：桌面 live profile 只读核对为「未安装 dsh-cite」，
  本件也不安装（`raw/19-live-profile.txt`）。全部读数来自：源码快照 + 仓库自带测试 + 直接 `import lib/index.js`
  的独立探针 + npm 已发布 0.5.0 包核对（在线行为单列）。
- **仅 Windows**（10.0.26200 x64）：WSL / Linux / macOS 未跑，不对其它平台下任何结论。
- 不排名、不给总分、不用星级；不评价作者其它插件；不改被测源码、不提 PR、不做安全渗透。
- 面向声明的四态（已验 / 未验 / 不确定 / 不做）见「诚实边界」。

## 锚定提交

| 项 | 读数 |
|---|---|
| 仓库 | `STARDUSTLC666/dsh-cite` |
| 声明版本 | **0.5.0**（`package.json`，1829 B，sha256 `8655d0ac7242e5b664c50136ba393dad64666dee15715a2e2a19ea874015c656`） |
| 锚定 commit | **`3f6276e90aa183b6682df3001c311177af4af3fc`**（2026-10-17T15:15:47Z，提交信息 `feat: 设置面板新增首次使用分步引导`） |
| tarball | `dsh-cite.tgz` 2,052,542 B，sha256 **`26ef8346c94ed5a786ba9ff12c9e86b46f3b1ce5bbf0b7a81323e3770bb9cafe`** |
| 快照位置 | `D:\natnat\lingshu\外部插件\dsh-cite\dsh-cite-master`（无 `.git`；解包树与 tarball 逐文件一致） |
| 预置产物 | `lib/client.js` **28,210 B** / sha256 `935f693f…`；`lib/index.js` 1,978 B / sha256 `9908211b…` |

**构建前树指纹**（口径：逐行 `<相对路径>\t<字节数>\t<sha256>` 排序后整体 sha256；见 `probes/anchor.mjs`）：

```
src        files=11  bytes=72378   tree_sha256=ceb9f39559953196323f31f5f41f009dfcaf996dae3bdd9a4ddb507ca6b9a476
test       files=6   bytes=26893   tree_sha256=89c8d637bdf659099eba1247b11069d0a5269a3bb30434b0c7b60e35da5b4992
lib        files=23  bytes=111227  tree_sha256=1c4ad1ae8fc318bc8a2c08ed637d95ceee8fb6cc87f6f3d6ea55982cdcd1df32
templates  files=1   bytes=23426   tree_sha256=10cfd83776b56008d17049bb92c70ec3af649f41e19e24a302299cfb85083182
scripts    files=1   bytes=130     tree_sha256=cd80f50f74ec83ddd89ae7b500c242c525b2c2bad88b02f8a836ec139d9dd29a
docs       files=4   bytes=13764   tree_sha256=81a4942ce88ba994fed774aa03785e42b4624556d1d38a0593b6c04ab7ab2aea
```

**锚定旁证（三路互证）**：① tarball sha256 与筛选清单给的 `26ef8346…` 一致；
② 解包树与 tarball 重解包树指纹逐项一致（`raw/02-tarball-verify.txt`）；
③ npm registry 上 `dsh-cite@0.5.0` 的 `gitHead` 同为 `3f6276e9…`，GitHub API 返回的 commit 日期/提交信息与本锚定一致
（`raw/18-upstream-anchor.txt`、`raw/artifacts/github-commit.json`）。

> **锚定注记（对后文 P1 很关键）**：该 commit 只改了 **3 个文件**——`CHANGELOG.md`（+4）、
> `lib/client.js`（+52/−1）、`package.json`（+1/−1）；**`templates/client.js` 没有被改**。
> 而构建脚本 `scripts/build-client.mjs` 的唯一动作是「把 `templates/client.js` 复制成 `lib/client.js`」。
>
> **工作树状态声明**：为取证，本轮在该源码快照内执行了 `pnpm install` 与 `pnpm run build`，因此快照的 `lib/`
> 现在是**构建后产物**（预置产物的原始副本保存在 `raw/artifacts/anchor/`，逐文件漂移见 `raw/16-drift.txt`）；
> `src/`、`test/`、`templates/`、`docs/` 与顶层文件均未被改动（构建前后指纹一致，见 `raw/00` 与 `raw/15`）。

## 环境与基线

| 项 | 读数 |
|---|---|
| 宿主 | DeepSeek Harness **0.2.1-rc.2**（`dsh --version`） |
| 平台 | **仅 Windows** 10.0.26200 x64（Windows 11 家庭中文版），主机名 `BBS`，32 CPU / 15.2 GiB |
| Node | **v24.21.0**（DSH 自带；`node/npm/pnpm/git` 均不在 PATH） |
| pnpm | DSH 自带 11.28.5；`packageManager` 钉 `pnpm@11.7.0`，安装即按此版本执行 |
| Python | 3.12.10（仅用于辅助，不参与判定） |
| 网络 | `registry.npmjs.org` 直连可用；`api.crossref.org` 200（冷启 3,930 ms）；GitHub 走 `gh-proxy.com`（API 200 / 1,760 ms） |
| 插件安装面 | 桌面 profile 仅 `@deepseek-ai` bundles + `@dsh-external/dsh-vibe-island`；**dsh-cite 未安装** |
| 无插件基线 | 不适用性能对照：本件是本地工具类插件，基线＝「未安装」；不做「装插件前后」耗时对比 |

环境原始读数见 `raw/01-env.txt`、`raw/19-live-profile.txt`。

## 结果速览

| 面 | 结果 | 证据 |
|---|---|---|
| 依赖安装 | **16/16 包，exit 0**，53.8 s | `raw/03-install.txt` |
| typecheck | **exit 0**，10.3 s，无诊断 | `raw/04-typecheck.txt` |
| build | **exit 0**，9.6 s；但产物与锚定预置 `lib` **漂移 1 个文件** | `raw/05-build.txt`、`raw/16-drift.txt` |
| 自带测试（`pnpm test` 整脚本） | **43/43 通过，0 失败 / 0 跳过**，exit 0，11.6 s | `raw/21-pnpm-test.txt` |
| 自带测试（`node --test` 直跑） | 43/43，4.78 s，exit 0 | `raw/06-self-test.txt` |
| 独立探针·解析去重（离线） | 35/39 符合；4 项落 FINDING（DOI 行尾标点 ×3、年份后缀 ×1） | `raw/10-probe-parse.txt` |
| 独立探针·格式导出（离线） | 19/22 符合；3 项落 FINDING（章节类型 ×2、无标题占位 ×1） | `raw/11-probe-format.txt` |
| 独立探针·补全离线行为 | **41/41 符合** | `raw/12-probe-enrich.txt` |
| 独立探针·装配与 HTTP 边界 | **26/26 符合** | `raw/13-probe-api.txt` |
| 独立探针·Crossref 在线 | 16/17 符合；1 项落 FINDING（GB/T 作者名与文档示例不一致） | `raw/14-probe-crossref-online.txt` |
| npm 发布包核对（在线） | 9/10 符合；1 项落 FINDING（**0.5.0 发布包不含首用引导**） | `raw/17-npm-0.5.0.txt` |
| 查重 | **10/10**：账本 595 事件 0 次、review 数据 0、站点「暂无评测」、工作区无同件测评 | `raw/20-dedupe.txt` |
| 官方安装通道 | **未验**（不装 live profile；见诚实边界） | — |

## 逐项读数

### 1. 依赖安装（`pnpm install --frozen-lockfile`）

```
$ node <dsh>/.../pnpm/bin/pnpm.cjs install --frozen-lockfile
$ cwd = D:\natnat\lingshu\外部插件\dsh-cite\dsh-cite-master
done: 16 packages（dependencies 3 + devDependencies 3 及传递依赖），exit 0，elapsed 60,183 ms
+ @citation-js/core 0.9.0 / @citation-js/plugin-bibtex 0.9.0 / proper-lockfile 4.1.2
+ @types/node 24.13.3 / @types/proper-lockfile 4.1.4 / typescript 5.9.3
```

环境注记：本机 `pnpm` 不在 PATH，**首次直跑 exit 1**（`'node' 不是内部或外部命令`）；把 DSH 自带 node 目录
加入 PATH 后成功。这是本机 PATH 条件，与插件无关；全部依赖来自 `registry.npmjs.org`。

### 2. typecheck 与 build

```
$ node <pnpm.cjs> run typecheck    # tsc -p tsconfig.json --noEmit
exit 0，elapsed 10,305 ms，无任何诊断输出

$ node <pnpm.cjs> run build        # tsc -p tsconfig.json && node scripts/build-client.mjs
exit 0，elapsed 9,612 ms
```

**构建漂移（关键）**：拿锚定 tarball 重解包树与「构建后快照」逐文件比（`probes/drift.mjs`）：

```
files_compared = 62   same = 61   changed = 1   only_in_anchor = 0   only_in_built = 0
lib/client.js: anchor_bytes=28210 built_bytes=23426
  anchor_sha256=935f693ff58e593c1133b48c4e9672401f6db2a93115ad6deffd98f6de6310a4
  built_sha256 =e4466f4bb7a2b1fec0ab7a00b8705242757ae7946a7c471cc5e7a23a7c1788bd
构建后 lib/client.js 仍含 0.5.0 首用引导 = false
templates/client.js 含 0.5.0 首用引导 = false
prebuilt lib/client.js 与 templates/client.js 是否同内容 = true
```

即：**唯一被构建改写的文件正是 0.5.0 唯一新增功能所在的 `lib/client.js`**，构建后它退化成模板内容（不含引导）。
构建后整体指纹见 `raw/15-post-build-anchor.txt`（`lib` 树 111,227 B → 106,443 B、tree_sha256 变化）。

### 3. 自带测试门（43 项）

```
$ pnpm test        # = pnpm run build && node --test "test/*.test.mjs"
tests 43 / pass 43 / fail 0 / skipped 0 / duration_ms 4051
[runner] exit_code=0 elapsed_ms=11608
```

另单跑 `node --test "test/*.test.mjs"`：43/43、4.78 s（`raw/06-self-test.txt`）。
测试覆盖面读起来是扎实的：BibTeX 嵌套花括号/LaTeX/宏/机构作者/复合姓氏、DOI 大小写与 URL 归一、
精确重复与候选重复、畸形输入与容量边界、修订冲突、补全只补空字段/保留冲突/404 重试、取消不写入、
四种格式导出、完整备份保留原始输入、词条 origin/CSRF 围栏、工具取消。**未覆盖客户端 `lib/client.js` 的产物一致性**
（这正是 P1 能溜过去的原因）。

### 4. 独立探针（不经过插件自带断言）

```
$ node probes/parse.mjs   --out raw/10-probe-parse.txt     # 39 例，35 符合
$ node probes/format.mjs  --out raw/11-probe-format.txt    # 22 例，19 符合
$ node probes/enrich.mjs  --out raw/12-probe-enrich.txt    # 41 例，41 符合
$ node probes/api.mjs     --out raw/13-probe-api.txt       # 26 例，26 符合
```

关键正向读数（抽样）：

- DOI 归一：`10.1000/ABC` / `https://doi.org/10.1000/Abc` / `doi: 10.1000/abc` → 均归一为 `10.1000/abc`；
  `not-a-doi` 行返回 null + 错误；成对括号 `10.1000/article(2020)` 保留。
- 去重：同批三行同 DOI（大小写/URL 形态不同）→ 第 2、3 行 `duplicate='batch'`、默认不选；
  入库后再预览 `DOI: 10.1000/LIB` → `duplicate='library'`。
- 候选重复（无 DOI）：同标题+年份+第一作者 → 第 2 条 `candidate=true`、默认不选；与库内条目同样命中。
- BibTeX：嵌套花括号/`\textit` 清洗为纯文本、`@string` 宏、机构作者 `{World Health Organization}`、
  `de la Cruz` 复合姓氏、多出版社名、未映射 `note` 只留在完整备份（文档已声明的取舍）。
- 容量：单批 101 条 → 拒（含「100」）；输入 256 KiB+1 → 拒（含「256」）；库 500 条后再导入 → 拒（含「最多保存 500 条」）。
- 补全离线（fetch 桩）：只补空字段（authors/containerTitle/publisher/url/year）、冲突只登记不覆盖
  （title 冲突）、`type='other'` 占位被 Crossref 类型替换、provider DOI 不匹配拒绝、404 部分失败后可重试、
  并发峰值 2、取消后库文件逐字节不变、查询期间他处改库 → `failed`+`conflict` 且不合并旧结果、超时 2,013 ms 报「超时」。
- 装配/HTTP：`apply` 注册 6 工具、dispose 清空；跨站 origin / 缺 `x-dsh-cite` / origin-host 不一致 → 403；
  `dsh-app://app` 桌面 origin → 200；PUT → 405；下载头 `content-disposition` / `no-store` / `nosniff` 齐全；
  预览上限 10、损坏库原文件逐字节保留、库内重复 DOI 被结构校验拒绝。

### 5. Crossref 在线行为（单列：受本机网络条件影响）

```
$ node probes/crossref.mjs --out raw/14-probe-crossref-online.txt
crossref_http: status=200 elapsed_ms=3930（冷启，rows=1）
cite_health:   {"ok":true,"checks":[{"name":"Crossref API","ok":true,"detail":"HTTP 200，1422ms"},…]}
lookupDoi(10.1038/nature14539) → Deep learning / Nature / 2015 / 521(7553): 436-444 / 3 位作者
cite_bibtex → @article{lecun2015deep,…}（含 doi/url/publisher）
搜索题录 → count=3；cite_check（真 DOI + 不存在 DOI）→ 顺序保持、true/false 正确
不存在的 DOI → "DOI 在 Crossref 中不存在：…"
```

**网络条件声明**：以上全部请求发往 `api.crossref.org`（无需 key）。本机 Crossref 可达但较慢（冷启约 3.9 s、
健康检查约 1.4 s）；换网络环境读数会变，但「可达 / 404 语义 / 工具行为」在本轮是可复跑的。
另：`lookupDoi('10.1038/nature14539.')`（末尾带句点）实测返回「DOI 在 Crossref 中不存在」——与 P2-1 互证。

### 6. npm 已发布 0.5.0 产物核对（在线）

```
$ node probes/npm-artifact.mjs --out raw/17-npm-0.5.0.txt
npm_version   = 0.5.0
npm_gitHead   = 3f6276e90aa183b6682df3001c311177af4af3fc     # 与锚定 commit 一致
npm_tarball   = 42,095 B / sha256 33e7d380…（sha512 与 registry integrity 一致）
npm_lib_client.js = 23,426 B / sha256 e4466f… / 含首用引导 = false
仓库预置 lib/client.js = 28,210 B / sha256 935f69… / 含首用引导 = true
0.5.0 与 0.4.2 的 lib/client.js 是否同内容 = true
```

即：**用户从 npm / 插件市场装到的 0.5.0，`lib/client.js` 与 0.4.2 逐字节相同，不含 0.5.0 新增的首次使用引导。**

## 发现

> 分级按「不做会怎样」：P1＝发布级功能缺失；P2＝可复现的功能/数据正确性问题；P3＝文档/体验/边缘。
> 每条都给复现命令与原始读数位置；**未把「未验」写成「已验」**。

### P1-1 · 0.5.0 唯一新增功能（首次使用分步引导）在构建与发布物中丢失

**读数（三路互证）**：

1. 锚定 commit `3f6276e9…` 的提交信息就是 `feat: 设置面板新增首次使用分步引导`，但该 commit 只改了
   `CHANGELOG.md`、`lib/client.js`、`package.json` 三个文件，**没改 `templates/client.js`**
   （GitHub API 文件列表：`raw/artifacts/github-commit-files.txt`）。
2. `scripts/build-client.mjs` 全文只有一句：`writeFileSync('lib/client.js', readFileSync('templates/client.js'))`。
   因此 `pnpm run build`（以及 `prepublishOnly`）会用**不含引导的模板**覆盖**含引导的预置产物**。
   实测构建后：`lib/client.js` 28,210 B → 23,426 B，sha256 `935f693f…` → `e4466f4b…`；
   62 个文件里**只有这 1 个**发生变化（`raw/16-drift.txt`）。
3. npm 上实际发布的 0.5.0（`gitHead` 恰为锚定 commit）里，`lib/client.js` 已经是 23,426 B / `e4466f4b…`，
   **不含** `dsh-first-run:dsh-cite:v1`；而且与 0.4.2 的 `lib/client.js` **逐字节相同**
   （`raw/17-npm-0.5.0.txt`）。

**影响**：站点清单版本标 0.5.0、CHANGELOG 宣称「设置面板顶部新增首次使用分步引导」，但无论
`npm i`/插件市场安装还是按 README 从源码构建，用户都拿不到这个引导。**0.5.0 发布包相对 0.4.2 没有前端功能变化**；
仓库里那份含引导的 `lib/client.js` 只对「直接用仓库预置 lib、不构建」的人有效，而这是非文档路径。
**根因**：改了构建产物、漏改构建源（`templates/client.js`）。
**复现**：

```bash
node probes/drift.mjs --repo <快照> --tarball <dsh-cite.tgz> --out raw/16-drift.txt   # 见 changed=1
node probes/npm-artifact.mjs --out raw/17-npm-0.5.0.txt                              # 见 npm 包无引导、与 0.4.2 相同
```

**建议**：把首用引导片段搬进 `templates/client.js`（或让 `build-client` 以单一源生成），并在测试门里加一条
「构建后 `lib/client.js` 必须含 `dsh-first-run:dsh-cite:v1`」的产物一致性断言——否则下一次构建仍会静默丢功能。

### P2-1 · DOI 行尾的句点/分号被当作 DOI 合法字符保留（解析层 `assertDoi`）

**读数**（`probes/parse.mjs`，`raw/10-probe-parse.txt`）：DOI 列表里

```
10.1000/abc.     → work.doi = "10.1000/abc."   （句点进入 DOI）
10.1000/abc;     → work.doi = "10.1000/abc;"   （分号进入 DOI）
10.1000/abc. + 10.1000/abc  → 互相之间 duplicate=null，未判重
```

`src/crossref.ts` 的 `assertDoi()` 只做 trim 与 `https://doi.org/`、`doi:` 前缀剥除，正则
`/^10\.\d{4,9}\/[-._;()/:A-Za-z0-9]+$/` 把 `.` / `;` 当作 DOI 合法字符。而同一仓库的 `extractDois()`
（`cite_check` / `cite_lookup` 的文本路径）会剥行尾标点——**两条路径口径不一致**。
在线实测：`lookupDoi('10.1038/nature14539.')` → 「DOI 在 Crossref 中不存在」（`raw/14`）。
**影响**：从参考文献/网页复制 DOI 时句末句点极常见；带句点导入后：①文献库里存了错误 DOI；
②同一条目重复导入不被判重；③在线补全对该条目 404，需手工改库（本插件没有编辑 DOI 的入口）。
**复现**：`node probes/parse.mjs --out raw/10-probe-parse.txt`（CASE `preview_doi_trailing_period_cleaned` 等）。
**建议**：在 `assertDoi` 里复用 `extractDois` 的尾标点清洗，或对 DOI 行先做一次 `extractDois` 同口径清洗。

### P2-2 · GB/T 7714 输出把作者 given name 全写，与 `docs/USAGE.md` 示例不一致

**读数**（`raw/14-probe-crossref-online.txt`，真实 Crossref 数据）：

```
实际输出：LeCun Yann, Bengio Yoshua, Hinton Geoffrey. Deep learning[J]. Nature, 2015, 521(7553): 436-444.
文档示例（docs/USAGE.md L58）：LeCun Y, Bengio Y, Hinton G. Deep learning[J]. Nature, 2015, 521(7553): 436-444.
```

`src/format.ts` 的 `gbtAuthors()` 用 `fullName()`（family + given 全名），而文档示例按 GB/T 习惯写成
「姓 + 名首字母」。**影响**：直接复制 GB/T 引文去投稿会不符合示例/标准缩写，需要人工改；文档示例也无法由
代码复现（第三方按示例核对会对不上）。**复现**：`node probes/crossref.mjs --out raw/14-…`（CASE `cite_format_gbt_doc_match`）。
**不确定**：作者是否有意让「基本模板」用全名（README 声明「正式提交前核对学校或期刊要求」）；
但无论如何，文档示例与实际输出不一致是实锤，二者应至少对齐一个。

### P2-3 · 章（`@incollection` → `book-chapter`）在 GB/T 标 `[Z]`、BibTeX 导出降级 `@misc`

**读数**（`raw/11-probe-format.txt`）：

```
GB/T 输出：Smith Jane. A chapter[Z]. (2021)[cited 2026-10-18].
BibTeX  ：@misc{smith2021a, …}    （booktitle/publisher 字段保留，但条目类型丢了）
```

`src/citation-worker.ts` 已把 CSL `chapter` 映射为 `book-chapter`，但 `format.ts` 的 `gbtTypeLabel()`
与 `bibtexType()` 都没有 `book-chapter` 分支：前者落到默认 `[Z]`/`[EB/OL]`，后者落到 `misc`。
**影响**：编著章节（常见文献类型）的 GB/T 标目类型错误、BibTeX 再导出类型降级；再次导入/投稿时类型信息丢失。
**复现**：`node probes/format.mjs --out raw/11-probe-format.txt`（CASE `chapter_gbt_label` / `chapter_bibtex_type`）。
**建议**：补 `book-chapter` 分支（GB/T 用 `[M]//` 或 `[C]//`，BibTeX 用 `@incollection`/`@inbook`）；
若有意不支持，至少在 README/USAGE 的「只包含已映射字段」处显式写明。

### P3-1 · 无标题条目的 BibTeX 导出写入中文占位符 `title={(无标题)}`

**读数**（`raw/11-probe-format.txt`）：对 title 为空的 Work，`buildBibtex()` 经 `titleOf()` 落成
`title={(无标题)}`（中英文导出一致）。显示层用占位符合理，但 BibTeX 是机器可读导出，占位文本会被当成真标题
被下游引用。**建议**：无标题时省略 `title` 字段（或写 `title={}`），把占位只留在 UI。

### P3-2 · BibTeX 年份带字母后缀（`year={2020a}`）解析为 0

**读数**（`raw/10-probe-parse.txt`）：`year={2020a}` → `work.year=0`（同作者同年多篇的常见写法）。
`year={2020}` / 无 year 分别得 2020 / 0，行为正常。**根因未定**：疑为 Citation.js 的日期解析不接受后缀，
插件未做兜底；因未定位到具体代码路径，按「不确定」处理（见诚实边界）。

### P3-3 · 首用引导（预置 `lib/client.js` 内）硬编码中文，且第 1 步文案与工作台实际路径不完全一致

> 前提：该引导只存在于仓库预置 `lib/client.js`（见 P1-1），发布物没有；此条针对「若按预置产物使用」的情形。

**读数**（`raw/artifacts/anchor/lib__client.js` L3–L5）：`__FR_STEPS` 三步文案全为中文硬编码，
不经过 `t()` / `locale`；而插件 README 声明「界面跟随 DSH 的中文 / English 设置」。英文界面下该卡片仍显示中文。
另：第 1 步写「有 DOI 就直接查元数据，作者、期刊、年份都会归一化」，但设置页的 DOI 导入是**纯本地解析**
（`parseCitationInput` 只归一 DOI 本身，不请求 Crossref；元数据要用户再点「从 Crossref 在线补全」），
与 CHANGELOG 0.5.0 自述「引导内容与该插件的实际用法一致」存在偏差。**不确定**：文案是否故意指 `cite_lookup` 工具而非工作台。

### 已验的正面结论（同样逐项可复跑）

- 自带测试 43/43、typecheck/build 干净；容量边界（256 KiB / 100 条 / 500 条）与「解析失败不落部分批次」成立。
- 精确去重（大小写/URL/批内/库内）与无 DOI「可能重复」提示成立，默认选择策略正确。
- 补全「只补空字段、冲突保留本地值并列差异、DOI 不匹配拒绝、404 可重试、取消不写入、修订冲突不覆盖」全部成立。
- 四种基本引文互不相同、BibTeX 键唯一且子集导出的键与全库一致、完整备份逐字保留原始输入、
  库内重复 DOI 与损坏库文件都会拒绝且不重置。
- HTTP 面：origin/CSRF 围栏、桌面 origin、下载头（`content-disposition`/`no-store`/`nosniff`）、方法限制均正确。
- Crossref 在线：健康检查、DOI 查询、题录搜索、404 语义、`cite_check` 顺序与并发（≤3）均符合声明。

## 诚实边界

- **已验**：安装（16 包）、typecheck、build 与产物漂移、`pnpm test` 43/43、`node --test` 43/43；
  离线探针 128 例（parse 39 / format 22 / enrich 41 / api 26）；在线探针 27 例（Crossref 17 / npm 产物 10）；
  查重 10 项；构建前后与 tarball 的逐文件指纹；npm 0.5.0 与 0.4.2 的 `lib/client.js` 逐字节比较。
- **未验（没跑，列原因）**：① **官方安装通道**（插件面板 / `dsh plugin add dsh-cite`）——本件坚持不把被测插件
  装入 live profile，故未执行；② **真实 DSH 会话内的设置页 UI 与模型调用**（首用引导显隐、上传 `.bib`、下载、
  中英文切换、390px 布局）——未在浏览器/真实宿主里点过；③ **Linux / macOS / WSL** 声明——单平台无环境；
  ④ 8 MiB 库文件上限、Crossref 2 MiB 响应上限、预览 600 s 过期——构造成本高，未单独跑（部分由代码路径与
  自带测试间接覆盖，本轮不把它们写成已验）；⑤ Windows 下文献库目录符号链接拒绝路径——未构造（需权限）；
  ⑥ GBK 编码 `.bib` 上传——浏览器 `file.text()` 按 UTF-8 解码，理论上 GBK 文件会乱码，但未用真实 GBK 文件实测。
- **不确定**：① P1-1 属「漏改模板」还是作者有意只维护预置产物——提交内容指向漏改，但无作者说明；
  ② P3-2 年份后缀的根因（Citation.js 日期解析 vs 插件兜底缺失）；③ P2-3 章类型是否属文档声明的
  「基本模板」范围；④ `templates/client.js` 与 `lib/client.js` 谁才是作者心中的源（两者从未在同一 commit 同步）。
- **不做**：不排名/不给总分/不用星级；不做安全渗透或利用；不修改被测源码、不提 PR；不把插件装进 live profile；
  不对非 Windows 平台下结论；不评价上游作者其它插件；不重算其它测评的既有读数。

## 查重

对照四类来源（`raw/20-dedupe.txt`，10/10 通过）：

| 来源 | 读数 |
|---|---|
| `dsh-bounty` 账本 `docs/bounty/ledger.json` | **595** 个事件，`dsh-cite` / `dsh_cite` 命中 **0**；`STARDUSTLC666` 42 次（均为作者其它插件） |
| `dsh-bounty` `review/data/plugins.json` | 3 条记录，`dsh-cite` 命中 **0** |
| 主创站 <https://review.lingshulab.com>（在线） | dsh-cite 详情页「本站评测（0）/ 暂无评测」；`/reviews` 列表无 dsh-cite；页面「清单版本 **0.5.0**」 |
| 工作区文本（13,826 个文本文件，排除本次测评目录与被测源码快照） | 8 个文件提到 dsh-cite，全部是站点页面缓存 / 筛选清单 / 其它测评里的 slug 列表；**测评或申报形态的文件 0** |

⇒ **对照 dsh-bounty 账本 / review 站数据 / 主创站 / 工作区，未见同件。** 账本无 dsh-cite 事件，本件不是既有结算项的复跑；
工作区既有材料 `测试/主创站筛选/` 只是本轮选件清单（其锚定 commit 与 tarball 前缀与本件一致，作旁证）。

## 复现步骤（第三方原样可跑）

前提：Windows x64；Node v24.21.0（本机为 DSH 自带，`node` 不在 PATH，以下用绝对路径占位 `<node>`）；
快照在 `D:\natnat\lingshu\外部插件\dsh-cite\dsh-cite-master`；tarball 在同目录。测评工作目录
`D:\natnat\lingshu\测试\dsh-cite`。

```bash
cd D:\natnat\lingshu\测试\dsh-cite

# 0) 记锚定（务必在 install/build 之前）
node probes/anchor.mjs --out raw/00-anchor.txt --snapshot-copy
node probes/env.mjs    --out raw/01-env.txt
node probes/dedupe.mjs --out raw/20-dedupe.txt

# 1) 装依赖（在仓库副本内；本机 pnpm 需先把 node 目录放进 PATH）
cd D:\natnat\lingshu\外部插件\dsh-cite\dsh-cite-master
set PATH=<node-bin>;%PATH%
node <pnpm.cjs> install --frozen-lockfile          # 期望 16 packages, exit 0

# 2) 门禁
node <pnpm.cjs> run typecheck                      # 期望 exit 0
node <pnpm.cjs> run build                          # 期望 exit 0（注意：会覆盖 lib/client.js）
cd D:\natnat\lingshu\测试\dsh-cite
node probes/drift.mjs --repo <快照> --tarball <dsh-cite.tgz> --out raw/16-drift.txt  # 期望 changed=1 (lib/client.js)
node probes/run.mjs --out raw/21-pnpm-test.txt --cwd <快照> -- cmd.exe /c pnpm test
#   注：本机 pnpm 不在 PATH，`pnpm test` 内部还要再调 pnpm；本轮用 raw/artifacts/tools/pnpm.cmd 作 PATH shim
#   （不加 shim 直跑会 exit 1，属本机 PATH 条件）。

# 3) 离线探针
node probes/parse.mjs   --out raw/10-probe-parse.txt
node probes/format.mjs  --out raw/11-probe-format.txt
node probes/enrich.mjs  --out raw/12-probe-enrich.txt
node probes/api.mjs     --out raw/13-probe-api.txt

# 4) 在线探针（Crossref / npm；有网络时）
node probes/crossref.mjs     --out raw/14-probe-crossref-online.txt
node probes/npm-artifact.mjs --out raw/17-npm-0.5.0.txt

# 5) 证据整理与交付
node ../tools/normalize_raw.mjs raw
node ../tools/make_manifest.mjs --raw raw --label "dsh-cite 0.5.0"
node ../tools/make_issue.mjs --report "测评报告_dsh-cite_v0.1.md"
```

`<node>` = `C:\Users\30951\AppData\Local\Programs\DeepSeek Harness\resources\runtime\primary-runtime\dependencies\node\bin\node.exe`；
`<pnpm.cjs>` = 同目录上级 `pnpm\bin\pnpm.cjs`。探针默认 `--repo` 指向上述快照，可显式覆盖。

## 一句话总结

**dsh-cite 0.5.0 的源码快照在 Windows 上装得上、typecheck/build 干净、自带 43 项测试全绿，DOI/BibTeX 解析去重、
离线补全语义、导出与 API 围栏在 165 个探针例（含查重 10 项）中 156 项符合；但它的 0.5.0 唯一新增功能（首次使用分步引导）
只存在于仓库预置的 `lib/client.js` 里，而构建脚本会用未更新的 `templates/client.js` 把它覆盖——npm 上真实发布的
0.5.0 包与 0.4.2 的 client.js 逐字节相同（P1）；另有 DOI 行尾标点未清洗（P2）、GB/T 作者名与自家文档示例不一致（P2）、
章类型导出降级（P2）及 3 条 P3。**

## 证据链（https，站点提交用）

| # | 说明 | 链接 |
|---|---|---|
| 1 | 被测 commit（锚定） | https://github.com/STARDUSTLC666/dsh-cite/commit/3f6276e90aa183b6682df3001c311177af4af3fc |
| 2 | 全部证据 | https://github.com/EQRS/dsh-eval-evidence/tree/main/evidence/dsh-cite-0.5.0 |
| 3 | report.md | https://github.com/EQRS/dsh-eval-evidence/blob/main/evidence/dsh-cite-0.5.0/report.md |
| 4 | raw-manifest.txt | https://github.com/EQRS/dsh-eval-evidence/blob/main/evidence/dsh-cite-0.5.0/raw-manifest.txt |
| 5 | anchor.mjs | https://github.com/EQRS/dsh-eval-evidence/blob/main/evidence/dsh-cite-0.5.0/anchor.mjs |
| 6 | 10-probe-parse.txt | https://github.com/EQRS/dsh-eval-evidence/blob/main/evidence/dsh-cite-0.5.0/10-probe-parse.txt |
| 7 | 11-probe-format.txt | https://github.com/EQRS/dsh-eval-evidence/blob/main/evidence/dsh-cite-0.5.0/11-probe-format.txt |

站点证据框格式：**每行一条 `URL` 或 `URL | 备注`**，最多 10 条；可直接粘贴 `证据链_提交文本.txt`。

```text
https://github.com/STARDUSTLC666/dsh-cite/commit/3f6276e90aa183b6682df3001c311177af4af3fc | 被测 commit（锚定）
https://github.com/EQRS/dsh-eval-evidence/tree/main/evidence/dsh-cite-0.5.0 | 全部证据
https://github.com/EQRS/dsh-eval-evidence/blob/main/evidence/dsh-cite-0.5.0/report.md | report.md
https://github.com/EQRS/dsh-eval-evidence/blob/main/evidence/dsh-cite-0.5.0/raw-manifest.txt | raw-manifest.txt
https://github.com/EQRS/dsh-eval-evidence/blob/main/evidence/dsh-cite-0.5.0/anchor.mjs | anchor.mjs
https://github.com/EQRS/dsh-eval-evidence/blob/main/evidence/dsh-cite-0.5.0/10-probe-parse.txt | 10-probe-parse.txt
https://github.com/EQRS/dsh-eval-evidence/blob/main/evidence/dsh-cite-0.5.0/11-probe-format.txt | 11-probe-format.txt
```
