[intake 输入] 【测评报告】dsh-ffmpeg 0.5.0 体验快测（音视频处理 / FFmpeg · 方法试验）

<!-- intake:v1 {"project":"bench","difficulty":"medium","impact":"B","target":"STARDUSTLC666/dsh-ffmpeg","form":"intake"} -->

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
**review.lingshulab.com 主创测评站投稿**（站点清单版本 0.5.0）。

- **与前件的重叠（重要）**：本站点 **2026-10-19 02:06 已有他人对同一插件同一版本的评测**——
  《dsh-ffmpeg 0.5.0 测评：字幕单引号转义 + 覆写保护缺口》，作者 **aroejony-cell**，
  review id **`01a15031-528c-7fc2-8198-585ac3281c2f`**。该评测是**代码级 + fake runner**，其环境自述
  「本机无 ffmpeg/ffprobe」，自带 110 项测试里 **10 项真实端到端被 skip**。
  本件**不主张首测**：定位为「**独立复测 + 真实转码补充证据**」——用本机补好的 ffmpeg/ffprobe 跑真实转码，
  **复核其 F1–F4**，并新增其未覆盖的流拷贝剪辑时长问题（P2 候选）。**请求维护者按同件并入或按独立验证计分**。
- **四态边界**：下文每条面向声明均落在「已验 / 未验 / 不确定 / 不做」四态之一；未跑的项目如实写「未验」，
  不把未验写成已验。
- **只跑 Windows**：Windows 11（10.0.26200）x64 单平台；WSL / Linux / macOS **未跑**，不对这些平台下结论。
- **不排名、不给总分、不用星级**：只给逐项读数与 P 级发现；P 级按「不做会怎样」分级，不代表总体评分。
- **不装 live profile**：`dsh-ffmpeg` **没有**装进任何正在使用的 DSH profile；全部读数来自**仓库临时副本内**的
  `pnpm install` + `tsc` 构建 + `node --test`（真实 ffmpeg 集成测试全跑）+ 独立探针（真实转码/失败契约）。
  本机 live profile 只读核对见 `raw/02-env-baseline.txt`。

## 锚定提交

- 被测包：**`dsh-ffmpeg`**，声明版本 **0.5.0**（`package.json`）。
- 上游仓：`STARDUSTLC666/dsh-ffmpeg`，锚定 commit **`5e85066d1e9ab7bad60c4a290db44ac9e5c32038`**
  （提交时间 **2026-10-15T05:04:08Z**，提交信息 `fix: repair GIF trimming and normalize mixed video joins (0.5.0)`）。
  本机经 `gh-proxy.com` 复核 commit API 与 tarball，见 `raw/00-anchor-upstream.txt`、`raw/00-upstream-commit.json`。
- **tarball 复核**：任务给定 sha256 `cd172c41…` 对应 **master 分支** tarball（2,056,491 B，本机重取一致）；
  commit tarball 为 2,056,603 B / sha256 `111fda71…`（顶层目录名不同，故 sha 不同）。**codeload gzip 的 sha256
  不保证跨请求可复现**，因此锚定以 **commit + 树指纹**为准：commit tarball 解包后的整树指纹
  **`ce1a92d3c32fc0c09209f29cc4af459d5b1e6145bb03d686723b79d79bcf8aa5`**（59 文件 / 2,253,008 B）
  与本地解包源码**完全一致**。
- **本地源码树（无 `.git`）逐字节锚**（`raw/01-anchor.txt`）：

| 范围 | 文件数 | 字节 | 树指纹（sha256） |
|---|---:|---:|---|
| 整棵树 | 59 | 2,253,008 | `ce1a92d3c32fc0c09209f29cc4af459d5b1e6145bb03d686723b79d79bcf8aa5` |
| `src/` | 7 | 67,720 | `269c1125add1828ded26c39e37d9a82296079b8dee67b94e73d6a77e8c0ddb09` |
| `lib/`（随包构建产物） | 14 | 78,559 | `f0e0282e3626bd46a9d4d17970811cf4ceb23fda929e839eeae07400d3d1009f` |
| `test/` | 16 | 74,286 | `e14b64b4f33184c8d4e54ed28cb2099e4f0b0693a74fa8a710d684c037cd1e2c` |
| `docs/` | 4 | 9,591 | `ac66e2192aa9787285b7790918d33a945eb3ddaccb54c2c914dc6f0a93fee674` |
| `assets/` | 3 | 2,001,673 | `e8078730c52b47c8957e244cff3dd770363b3f0864691faf1b08905e885aabef` |

- `package.json` sha256 = `3c217bfa55694b7a809bcc620a6e7cb165c4ccbed650dc6f9eed0d7723a85f80`；`pnpm-lock.yaml` = `fc0d864b…`；`tsconfig.json` = `882866ce…`；`cordis.patch.yml` = `d33fd324…`。
- **版本面注记**：`docs/VALIDATION.md` 的验收记录停在 Harness `0.2.0-rc.1` / Node `24.16.0` / 96 项（2026-09-28），
  而 `docs/USAGE.md` 自称「110 个测试」；本件实测 110/110（见下）。本件结论只对上述树指纹的 **0.5.0 快照**成立。

## 环境与基线

| 项 | 读数 | 证据 |
|---|---|---|
| 操作系统 | Windows 11 Home China，`10.0.26200`，x64；机器名 `bbs` | `raw/02-env-baseline.txt` |
| 宿主 | DeepSeek Harness **0.2.1-rc.2**（读 `app.asar` 根 `package.json`：`@deepseek-ai/dsh-desktop@0.2.1-rc.2`，`dshBuildCommit=332895e0…`） | 同上 |
| Node / pnpm | **v24.21.0**（DSH 自带）；`pnpm --version` = **11.28.5**，实际执行按 `packageManager` 用 **v11.7.0** | 同上、`raw/03-install.txt` |
| **FFmpeg / ffprobe** | **N-127650-geceaa54a38-20261018**（BtbN 2026-10-18 gpl build；`--enable-libx264 --enable-libx265 --enable-libvpx --enable-gpl`；`subtitles`/`palettegen`/`paletteuse` 滤镜在） | `raw/02-env-baseline.txt` |
| 其他工具 | git 2.56.0.windows.2、go 1.27.2、npm 12.2.0、Python 3.12.10（本轮由 `C:\Users\30951\tools\run.cmd` 提供 PATH） | 同上 |
| 网络 | `registry.npmjs.org` HTTP 200；`review.lingshulab.com` HTTP 200 | 同上 |
| live profile 插件面 | 仅 `@dsh-external/dsh-vibe-island` + 6 个官方 bundle；**`dsh-ffmpeg` 未安装** | 同上 |
| 站点清单 | review.lingshulab.com 插件页 `01a14f27-30d9-79b3-9cda-561ad8e46126`，版本 **0.5.0** | `raw/20-dedupe.txt` |

> 基线口径：本件是「源码快照 + 自带测试（含真实 ffmpeg 集成）+ 宿主等价 shim 下的工具级真实转码」，
> **不是**「装进 DSH 后的端到端体验」；后者的读数全部列入「未验」。工具链由 `run.cmd` 提供，
> `ffmpeg -version` 能出结果（插件 README 的兼容口径）即视为可用——**插件不做 ffmpeg 版本硬校验**。

## 结果速览

| 面 | 结果 | 证据 |
|---|---|---|
| 装依赖（`pnpm install --frozen-lockfile --ignore-scripts`） | **exit 0**，9,380 ms（typescript 5.9.3、@types/node 24.13.3，3 个包） | `raw/03-install.txt` |
| `pnpm run typecheck` | **exit 0**，5,404 ms，无诊断 | `raw/04-typecheck.txt` |
| `pnpm run build` | **exit 0**，5,316 ms | `raw/05-build.txt` |
| 构建可复现 | 重新构建的 `lib/` 与随包 `lib/` **14/14 文件逐字节相同** | `raw/07-lib-reproducibility.txt` |
| 自带测试门（16 个 `*.test.mjs`，`node --test "test/*.test.mjs"`） | **110 项 / 110 通过 / 0 失败 / 0 跳过**，11,212 ms，runner **exit 0**；**10 项真实 ffmpeg 端到端本次全部执行**（不是 skip） | `raw/06-self-test.txt` |
| 探针 A：夹具 / health / probe | **23/23**（真实 ffprobe 金标准对照） | `raw/08-probe01-fixtures-health.txt` |
| 探针 B：真实转码面 | **30/30**（cut/encode/subtitle/extract/gif/frames/adjust，逐项独立 ffprobe 复核） | `raw/09-probe02-transforms.txt` |
| 探针 C：拼接 + 失败契约 | **36/36**（统一画布/补静音/流拷贝/25 类失败/覆写/环境变量/取消） | `raw/10-probe03-concat-failures.txt` |
| 探针 D：复核站内既有评测 F1–F4 | **8/8**（F1 证实、F2 部分证实、F3 参数面证实、F4 证实） | `raw/11-probe04-prior-review.txt` |
| 查重 | 账本 595 事件 0 次；全仓 378 文件 0 命中；**站点已有同件评测**（详见「查重 / 重叠」） | `raw/20-dedupe.txt` |
| 发现 | **1 × P2（本件新增）** + **既有评测 F1–F4 真实复核**（F1/F4 证实、F2 部分证实、F3 参数面证实） | 见下节 |

## 逐项读数

### 1. 安装、类型检查、构建与构建可复现

```text
install   : exit 0, 9380 ms, "+3 packages", pnpm v11.7.0（typescript 5.9.3 / @types/node 24.13.3）
typecheck : exit 0, 5404 ms, '$ tsc -p tsconfig.json --noEmit'
build     : exit 0, 5316 ms, '$ tsc -p tsconfig.json'
lib 比对  : committed 14 files fingerprint=933ebd6e…  rebuilt 14 files fingerprint=933ebd6e…
            fingerprintEqual=true, identical files=14/14, differences=(none)
```

### 2. 自带测试门（110 项，真实 ffmpeg 全跑）

```text
tests 110 | suites 0 | pass 110 | fail 0 | cancelled 0 | skipped 0 | todo 0
duration_ms 11212.3641   (runner exit 0)
真实端到端用例（本次全部执行，非 skip）：
  ✔ 环境检查：ffmpeg 可用
  ✔ 端到端：生成 → probe → cut → concat → encode（含竖屏）→ frame → gif
  ✔ 端到端：WebM(Opus) 提取音轨到 m4a（copy 失败自动转 AAC）
  ✔ 端到端：adjust 有音轨变速 + 无音轨调音量
  ✔ 端到端：subtitle 烧录硬字幕
  ✔ 端到端：concat 重编码拼接「有音轨 + 无音轨」
  ✔ real GIF honours a nonzero start and exact clip duration (#4)
```

> 与既有评测（无 ffmpeg，10 项 skip）的对比：本机因补装了 ffmpeg/ffprobe，**这 10 项真实端到端全部跑通**，
> 因此本件的基线读数与该评测不可直接跨环境比较（这本身是「独立复测」的价值）。

### 3. 探针 A：夹具 / 自检 / 探测（`raw/08`）

- 夹具（独立 ffmpeg 生成）：`src-a.mp4` 3 s / 320x240 / 30 fps / h264 + AAC 立体声；`src-b.mp4` 2 s / 640x360 / 25 fps；
  `silent-a.mp4` 2 s 无音轨；`silent-b.mp4` 1.5 s 无音轨；`src-opus.webm` vp8+opus；`two-video.mp4` 双视频流；`with-sub.mkv` 内嵌 srt 字幕轨。
- `ffmpeg_health`（默认配置 = PATH 上的 ffmpeg/ffprobe）：

```text
ok=true plugin=dsh-ffmpeg
ffmpeg : ✅ ffmpeg version N-127650-geceaa54a38-20261018 Copyright (c) 2000-2026 the FFmpeg developers
ffprobe: ✅ ffprobe version N-127650-geceaa54a38-20261018 Copyright (c) 2007-2026 the FFmpeg developers
```

- `ffmpeg_probe` 与独立 ffprobe 金标准逐项一致：`formatName=mov,mp4,m4a,3gp,3g2,mj2`、`duration=3`、`sizeBytes=345573`、
  `video={h264,320x240,30fps}`、`audio=[{aac,48000,2ch}]`、`bitrate=921528`；多视频流文件返回 `videos` 2 条
  （320x240 + 160x120），主视频取第一路；无声文件 `audio=[]`。
- 失败契约：输入不存在 →「输入文件不存在：…」；缺 `input` →「输入文件（参数 input）为必填…」；
  ffmpeg/ffprobe 配置为不可执行路径 → `health.ok=false` 且两项 `ok=false`（见「不确定」第 2 条）。

### 4. 探针 B：真实转码面（`raw/09`，逐项独立 ffprobe 复核）

| 工具/用例 | 读数（独立 ffprobe） |
|---|---|
| `cut` 流拷贝 start=0 dur=1（关键帧起点） | 请求 1 s → 实际 **1.002667 s** / 30 帧（正常） |
| `cut` 流拷贝 start=1 dur=1（非关键帧起点） | 请求 1 s → 实际 **2.005333 s** / 60 帧；产物 t=0.2 帧 md5 = 源 t=0.2 帧（**含预卷**）→ 见 P2-1 |
| `cut` 对照（同命令去掉 `-avoid_negative_ts make_zero`） | with=2.005333 s / **without=1.005333 s**，且 without 的 t=0.2 帧 = 源 t=1.2 帧（从请求起点开始）→ 根因定位 |
| `cut` 流拷贝 start=0.5 end=2.25 | 返回 duration=1.75，实际 **2.266667 s**（同样含预卷） |
| `cut` reencode start=1.5 dur=0.75 | 实际 **0.766667 s** / 23 帧（精确，±0.1 内） |
| `encode` bilibili-1080p / bilibili-4k | 输出可读、**保持 320x240**（预设只设编码档与码率上限，不升采样） |
| `encode` vertical-1080p | **1080x1920**（等比补边） |
| `encode` web-720p | **960x720**（高 720、宽偶数） |
| `encode` crf=30 fps=24 scale=160:120 | **160x120 / 24 fps**，时长 3.083 s |
| `subtitle` 烧录 SRT | 成功；时长 3 s、无字幕流（硬烧录）、保留音轨 |
| `extract` audio（AAC 源） | m4a / **aac 48000 2ch** / 3 s |
| `extract` audio（Opus 源 → m4a） | **2 次调用**：先 `-c copy` 失败 → 自动回退 `-c:a aac`；产物 aac |
| `extract` frames fps=2 duration=2 | **4 张** `out-ex-frames-001..004.png`，320x240 |
| `extract` frame start=1.2 | 1 张 PNG 320x240 |
| `extract` subtitle | 导出 SRT（101 B，含两条 cue 文本） |
| `gif` start=0/2 dur=1 fps=10 width=160 | 各 10 帧、160 宽、1 s；**start=0 与 start=2 产物 sha 不同**（0.5.0 非零起点修复生效） |
| `gif` start=1 dur=2 | **20 帧**（时长正确作用到输入区间）；输出目录无 palette 残留（调色板在随机临时目录） |
| `frames` every=1 / times=[0,1.5,2.5] / format=jpg | 3 张 / 3 张 / .jpg 各落在独立 `run-*` 子目录 |
| `adjust` speed=2 / speed=0.5 | 时长 1.566667 s / 5.986042 s（≈一半 / 两倍），保留音轨 |
| `adjust` volume=-3dB / mute / rotate=90 | 音量成功且保留音轨 / 输出无音轨 / 画面 **240x320** |
| `adjust` speed+volume+rotate270 组合 | 240x320、1.566667 s、保留音轨 |
| `adjust` 无声输入 volume=2 | 不报错、输出仍无音轨（先 probe 判断无音轨再构建滤镜） |

### 5. 探针 C：拼接与失败契约（`raw/10`）

```text
concat 重编码 [a 320x240@30 + b 640x360@25]
  → normalized={width:320,height:240,fps:30}，输出 320x240@30、5 s（150 帧）、含音轨（等比补边）
concat 显式 width=480 height=270 fps=24 → 输出 480x270@24
concat 混合有声/无声 [a 有声 3s + silent 无声 2s] → 有音轨、5 s（仅为无声段补静音）
concat 全无声 [silent 2s + silent 1.5s] → 无音轨、3.5 s
concat 流拷贝（同参片段）→ -c copy、2 s（60 帧）、音视频流都在
```

失败契约共 **25 类**全部为中文错误、零写入，例如：`inputs` 少于 2/多于 20、`width` 未开 reencode、
`width`/`height` 不成对、奇数宽度 321、`fps=0`、输入文件不存在、`cut` 输出=输入（「输出路径与输入文件相同，已拒绝」）、
`start=abc`/`start=-1`/`duration=0`/`end<start`、未知 `preset`、`crf=60`、`fps=300`、`scale=abc`、
`adjust` 无操作/speed=0.05/volume=`loud`/rotate=45、`extract what=video`、`frames every=0`/`times=abc`/
`format=webp`、`subtitle` 缺字幕文件。

覆写策略：默认第二次自动加序号（`src-a.cut_2.mp4`→`src-a.cut_3.mp4`，读数因多轮累积）；`overwrite=true` 写回同一路径。
外部依赖：ffmpeg 路径不可用 → 工具抛「ffmpeg 剪辑失败（退出码 null）：无错误输出」（宿主语义见「不确定」）；
`DSH_FFMPEG_PATH` 环境变量生效（health 报出该路径且失败）。
取消：执行前已 abort → 抛 `probe-cancel-before`；执行中 500 ms abort 重编码 → 抛 `probe-cancel-mid`。

### 6. 探针 D：复核站内既有评测 F1–F4（`raw/11`，真实 ffmpeg）

既有评测：`01a15031-528c-7fc2-8198-585ac3281c2f` / aroejony-cell / 2026-10-19 02:06
《dsh-ffmpeg 0.5.0 测评：字幕单引号转义 + 覆写保护缺口》（对方环境无 ffmpeg，10 项真实端到端 skip）。

```text
[F1] 真实烧录 it's.srt 与 its.srt 两个产物 sha256 完全相同（114669b049cdc984…）
     → 证实：it's.srt 被解析成 its.srt，同目录存在 its.srt 时**静默烧录错误字幕**
     仅 it's.srt（无 its.srt）→ ffmpeg 报 "Unable to open .../its.srt"（文件名改写再次证实）
[F2] 重编码 concat 输出=第 2 个输入 → ffmpeg 拒绝："Output ... same as Input #1 - exiting /
     FFmpeg cannot edit existing files in-place"，源档 sha 不变（未复现数据丢失）
     subtitle 输出=字幕源 (.srt) → ffmpeg 拒绝："Output #0, srt ... does not contain any stream"，
     源字幕 120 B / sha 不变（未复现）
     **F2b 默认流拷贝 concat（输入在 list 文件内）输出=第 2 个输入 → 工具返回成功，
     第 2 个输入档 sha 由 c6ce1a3f… 变为 76fc5900…、大小 112367→112004 B（源文件被覆盖改写）**
[F3] encode(scale=100000:100000) 被接受并进入 argv（-vf scale=100000:100000）；**未真实渲染**（防 OOM）
[F4] frames times=['abc'] 失败后，outputDir 仍留下 run-* 目录（1 个）
```

## 发现

> 分级按「不做会怎样」；本件新增 1 条 P2，另对站内既有评测的 F1–F4 给出**真实 ffmpeg 复核读数**。
> 每条均在 `raw/` 有原始读数；被测源码未改动、未提 PR。

### P2-1（本件新增 · 独立证据）· 默认流拷贝 `ffmpeg_cut` 在非关键帧起点上产物时长≈start+duration，且含关键帧前预卷

**读数**（`raw/09-probe02-transforms.txt`，真实 ffmpeg N-127650）：

```text
请求：start=1s, duration=1s, reencode=false（默认流拷贝）
工具返回：duration=1
实际产物：2.005333 s / 60 帧；产物 t=0.2 帧 md5 == 源 t=0.2 帧 md5（内容从 0s 关键帧开始，含 1s 预卷）
请求：start=0.5s, end=2.25s（同样流拷贝）→ 返回 duration=1.75，实际 2.266667 s
对照：start=0（关键帧对齐）→ 1.002667 s 正常；reencode=true → 0.766667 s（精确）
根因对照（同命令只去掉 -avoid_negative_ts make_zero）：
  with=2.005333 s（含预卷） / without=1.005333 s（t=0.2 帧=源 t=1.2 帧，从请求起点开始）
```

**机制**（静态定位）：`src/args.ts:41` 的流拷贝命令同时使用**输入侧 `-ss`** 与
**`-avoid_negative_ts make_zero`**。当 `-ss` 不在关键帧上时，ffmpeg 从关键帧开始复制，`make_zero`
把负时间戳平移成从 0 开始，`-t duration` 又被算在整段（含预卷）上，于是产物时长≈start+duration 且内容包含预卷；
去掉该选项后 ffmpeg 用编辑列表把起点拉回请求时间（1.005 s 且内容从请求起点开始）。

**影响**：默认剪辑（工具描述写「极快、关键帧对齐」，很多场景会直接用默认值）在「起点不是关键帧」时**静默多出
`start` 秒的预卷内容**，返回值却仍声称请求的 duration；下游 concat/encode/上传会用到多余内容。属功能性问题（P2），
非安全问题。**边界**：起点落在关键帧上（如从 0 开始）或 `reencode=true` 时正常；本读数在 N-127650 上复现，
其它 ffmpeg 构建未验（见「不确定」）。

**建议**：去掉流拷贝路径的 `-avoid_negative_ts make_zero`（或用 `-copyts`/输出侧 `-ss` 组合），并在测试里加
「非关键帧起点 + 流拷贝」的时长/首帧回归（现有 110 项测试未覆盖该组合）。

### 站内既有评测的独立复核（真实 ffmpeg，不重复主张为本站新发现）

- **F1（既有 P2，真实复核：证实）**：字幕路径含单引号时，`escapeFilterPath()` 的 `\'` 转义在两級
  filter 解析里被吃掉，`it's.srt` 变成 `its.srt`。本机真实烧录：`it's.srt` 的产物与 `its.srt` 的产物**逐字节相同**
  （sha `114669b049cdc984…`）——即**静默烧录了错误字幕**；无 `its.srt` 时报 `Unable to open .../its.srt`。
  对方当时无法用真实 ffmpeg 执行，本件把「tokenizer 语义推断」升级为**真实执行证据**。
- **F2（既有 P2，真实复核：部分证实）**：默认**流拷贝 concat**（输入写进 list 文件）时，`overwrite=true` +
  输出=第 2 个输入 → 工具返回成功、源文件被覆盖改写（sha/大小变化），**证实条件性数据丢失**；
  但同一配置下的**重编码 concat** 与 **subtitle 输出=字幕源** 两条路径在本机 ffmpeg 上被 ffmpeg 自身拒绝
  （`same as Input #1` / `does not contain any stream`），源文件未变——这两条在本环境**未复现**。
- **F3（既有 P3，参数面复核：证实）**：`encode.scale=100000:100000` 未做范围校验，直接进入 `-vf scale=100000:100000`；
  为防 OOM **未真实渲染**（显式不做）。
- **F4（既有 P3，真实复核：证实）**：`ffmpeg_frames` 参数非法失败后，`outputDir` 下残留 `run-*` 目录（先建目录后校验）。

### 已验的正面结论（同样逐项可复跑）

- 自带 110 项测试 **110/110 通过、0 跳过**；10 项真实 ffmpeg 端到端（生成→probe→cut→concat→encode→frame→gif、
  WebM/Opus 音轨回退、adjust 变速/无声、字幕烧录、混合音轨拼接、GIF 非零起点）全部执行并通过。
- 构建链干净：`typecheck`/`build` exit 0；重新构建的 `lib/` 与随包产物 **14/14 逐字节一致**。
- 0.5.0 三个修复点在本机真实复现验证：GIF 非零起点/时长作用到正确区间（10 帧 vs 20 帧、sha 不同）；
  重编码拼接统一画布/帧率并等比补边（320x240@30、480x270@24）；混合有声/无声只为无声段补静音、全无声保持无音轨。
- 失败契约完整：25 类参数错误均为中文、零写入；输出=输入拒绝；默认不覆写（自动加序号）；
  `DSH_FFMPEG_PATH` 生效；执行前/执行中取消都抛取消原因而非「无错误输出」。
- 探测面：真实 ffprobe 对照下时长/分辨率/帧率/编码/音轨/多视频流均一致；`ffmpeg_health` 报出
  N-127650 BtbN gpl build 并确认 ffmpeg/ffprobe 两项可用。

## 诚实边界

- **已验**：`pnpm install/typecheck/build`；`lib/` 构建可复现；自带 110 项测试（真实 ffmpeg 端到端全跑）；
  探针 A（夹具/health/probe）、B（cut/encode/subtitle/extract/gif/frames/adjust 真实转码 + 独立 ffprobe 复核）、
  C（concat 画布/补静音/流拷贝 + 25 类失败契约 + 覆写 + 环境变量 + 取消）、D（既有评测 F1–F4 复核）；
  查重四路；0.5.0 版本面静态读数。
- **未验（没跑，列原因）**：
  1. **真实 DSH 宿主装载**（`dsh plugin add dsh-ffmpeg` / 插件面板 / 重启宿主）：按纪律不把被测插件装进 live profile；
     本件用等价 subprocess shim 走 `apply()` 全链路，**真实宿主的 subprocess 服务、超时树级终止（taskkill /T）未验**；
  2. **宿主 0.2.1-rc.2 兼容**：仓库 `docs/VALIDATION.md` 只记录到 Harness `0.2.0-rc.1` / Node `24.16.0`（96 项，2026-09-28），
     当前宿主版本不在其记录内；
  3. **其它 ffmpeg 构建/版本**：P2-1 与 F2b 在 N-127650 上复现，其它 ffmpeg 版本（含发行版自带旧版）行为未验；
     插件不做 ffmpeg 版本硬校验（README 口径：`ffmpeg -version` 能出结果即可）；
  4. **大文件/长时长/4K 实转/并发/多实例**：只用 3 s 级 320x240/640x360 素材与短任务，未做压力与内存测试；
  5. **Linux / macOS / WSL**：单平台，未跑；
  6. **F3 超大画布真实渲染**：为防 OOM 只验证参数被接受，未真实执行；
  7. **UI/面板**：本插件是服务端工具插件（无 client bundle），无设置面板需要验。
- **不确定**：
  1. P2-1 是否由 ffmpeg 版本差异导致（`-ss` + `-avoid_negative_ts` 的交互在旧版可能不同）——本机只验了 N-127650；
  2. `ffmpeg_health` 在「可执行文件不存在」时只显示「退出码 null：」，没有 ENOENT/可操作线索；**该细节取决于宿主
     spawn 对启动失败的处理语义**（本件 shim 下如此，真实宿主可能抛错并给出原因）；
  3. 既有评测 F2 在其它 ffmpeg 版本 / 其它输出路径下是否也会破坏文件（本机只有默认流拷贝 concat 复现）；
  4. `ffmpeg_gif` 对越界 fps/width 采用**静默钳制**，而其它工具对越界参数**报错**——是否为有意设计，文档未写死。
- **不做**：不排名 / 不给总分 / 不用星级；不装 live profile；不做安全渗透或漏洞利用；不改被测源码、不提 PR；
  不对非 Windows 平台下结论；不真实渲染超大画布（F3）；不重复主张既有评测已发表的结论为本件新发现。

## 查重 / 重叠

**结论先行：站点已有同插件同版本的他人评测 → 本件为「独立复测 + 真实转码补充证据」，不主张首测，请求并入或独立计分。**

- **站点既有评测（必须引用的重叠件）**：
  - id：**`01a15031-528c-7fc2-8198-585ac3281c2f`**
  - 标题：《dsh-ffmpeg 0.5.0 测评：字幕单引号转义 + 覆写保护缺口》
  - 作者：**aroejony-cell**
  - 时间：**2026-10-19 02:06**
  - URL：<https://review.lingshulab.com/reviews/01a15031-528c-7fc2-8198-585ac3281c2f>
  - 其特征：代码级 + fake runner；**环境自述「本机无 ffmpeg/ffprobe」，10 项真实端到端被 skip**；结论 F1 字幕单引号(P2)、
    F2 覆写保护缺口(P2)、F3 scale 无上限(P3)、F4 frames 残留 run-*(P3)。
- **本件与其关系**：同一插件、同一版本、同一 commit 的**独立复测**；本件用本机补好的 ffmpeg/ffprobe 跑**真实转码**，
  复核 F1–F4（见「发现」），并新增其未覆盖的 **P2-1（流拷贝 cut 时长≈start+duration）**；**请求维护者按同件并入
  或按独立验证/补充证据计分**，不重复主张对方已发表的结论。
- **账本/仓库查重**（`raw/20-dedupe.txt`）：

```text
dsh-bounty 账本（docs/bounty/ledger.json）：events=595；含 "dsh-ffmpeg" 的事件=0（原文出现 0 次）
review 子站数据（review/data/plugins.json）：0 条 entry；"dsh-ffmpeg" 命中 0
全仓文本检索（378 个 md/json/yml/yaml/html/py/mjs/js/ts/txt 文件）：命中 0
工作区 测试/：此前无 dsh-ffmpeg 目录（本目录本轮新建）
```

- **站点复核读数**：

```text
插件页 /plugins/01a14f27-30d9-79b3-9cda-561ad8e46126 → HTTP 200，含 8 处 "dsh-ffmpeg"，页面已显示「本站评测」（不再是「暂无评测」）
/reviews → HTTP 200，含 4 处 "dsh-ffmpeg"，其中一条即 2026-10-19 02:06 的既有评测
/reviews/01a15031-… → HTTP 200（37 处 "dsh-ffmpeg"），即上述既有评测正文
```

⇒ 对照 dsh-bounty 账本 / review 子站数据 / 全仓文本 / 公开测评站：**未见账本同件；站点已有同件评测（见上）**。
本件按「独立复测 + 补充证据」提交，**请维护者并入既有 review 或按独立验证计分；如判定为重复投稿，请直接关闭本件**。

## 复现步骤（第三方原样可跑）

环境：Windows x64、Node v24.21.0、ffmpeg/ffprobe **N-127650**（本机由 `C:\Users\30951\tools\run.cmd` 提供 PATH；
任何 `ffmpeg -version` 可用的构建亦可，但 P2-1/F2b 的读数可能随版本变化）。**只在临时副本里安装依赖，不碰 live profile。**

```bash
# 0) 取件与锚定（本机 hosts 把 github 域名指向 127.0.0.1，故走 gh-proxy）
node D:\natnat\lingshu\测试\tools\gh-fetch.mjs --mode api ^
  --path repos/STARDUSTLC666/dsh-ffmpeg/commits/5e85066d1e9ab7bad60c4a290db44ac9e5c32038 --out commit.json
node D:\natnat\lingshu\测试\tools\gh-fetch.mjs --mode tarball --repo STARDUSTLC666/dsh-ffmpeg --ref master --out dsh-ffmpeg-master.tgz
# 期望 sha256 = cd172c41…（codeload gzip 不保证可复现，正式锚定用 commit + 树指纹 ce1a92d3…）

# 1) 仓库副本 + 工具链包装器
mkdir %TEMP%\dsh-ffmpeg-probe 2>nul
xcopy /E /I D:\natnat\lingshu\外部插件\dsh-ffmpeg\dsh-ffmpeg-master %TEMP%\dsh-ffmpeg-probe\work
cd /d %TEMP%\dsh-ffmpeg-probe\work
cmd /c "C:\Users\30951\tools\run.cmd pnpm install --frozen-lockfile --ignore-scripts"
cmd /c "C:\Users\30951\tools\run.cmd pnpm run typecheck"
cmd /c "C:\Users\30951\tools\run.cmd pnpm run build"
cmd /c "C:\Users\30951\tools\run.cmd node --test test/*.test.mjs"     # 期望 110/110，0 skip，exit 0

# 2) 锚定指纹与构建可复现（probe 只读）
cd /d D:\natnat\lingshu\测试\dsh-ffmpeg
node probes\probe-anchor.mjs D:\natnat\lingshu\外部插件\dsh-ffmpeg\dsh-ffmpeg-master
node probes\probe-lib-diff.mjs D:\natnat\lingshu\外部插件\dsh-ffmpeg\dsh-ffmpeg-master\lib %TEMP%\dsh-ffmpeg-probe\work\lib
# 期望 fingerprintEqual=true, identical files=14/14

# 3) 独立探针（真实 ffmpeg；每个自带夹具与临时目录，不写 live 数据）
cmd /c "C:\Users\30951\tools\run.cmd node D:\natnat\lingshu\测试\dsh-ffmpeg\probes\probe-01-fixtures-health.mjs --plugin %TEMP%\dsh-ffmpeg-probe\work --dir %TEMP%\dsh-ffmpeg-probe\fixtures"
cmd /c "C:\Users\30951\tools\run.cmd node D:\natnat\lingshu\测试\dsh-ffmpeg\probes\probe-02-transforms.mjs --plugin %TEMP%\dsh-ffmpeg-probe\work --dir %TEMP%\dsh-ffmpeg-probe\fixtures"
cmd /c "C:\Users\30951\tools\run.cmd node D:\natnat\lingshu\测试\dsh-ffmpeg\probes\probe-03-concat-failures.mjs --plugin %TEMP%\dsh-ffmpeg-probe\work --dir %TEMP%\dsh-ffmpeg-probe\fixtures"
cmd /c "C:\Users\30951\tools\run.cmd node D:\natnat\lingshu\测试\dsh-ffmpeg\probes\probe-04-prior-review.mjs --plugin %TEMP%\dsh-ffmpeg-probe\work --dir %TEMP%\dsh-ffmpeg-probe\fixtures"

# 4) 环境基线 / 版本面 / 查重（只读）
cmd /c "C:\Users\30951\tools\run.cmd node probes\probe-env.mjs"
node probes\probe-version.mjs --plugin %TEMP%\dsh-ffmpeg-probe\work
node probes\probe-dedupe.mjs

# 5) 证据整理
node ..\tools\normalize_raw.mjs raw
node ..\tools\make_manifest.mjs --raw raw --label "dsh-ffmpeg 0.5.0"
node ..\tools\make_issue.mjs --report "dsh-ffmpeg\测评报告_dsh-ffmpeg_v0.1.md"
```

> `run-command.mjs` 是本机的「干净捕获」小工具：Windows PowerShell 5.1 对原生命令的 `2>&1` 会写成
> `NativeCommandError` + UTF-16，直接重定向会污染证据，故用 Node 逐条执行并落 `stdout/stderr/合并文本`。

## 一句话总结

**dsh-ffmpeg 0.5.0 在本机（Windows 11 / DSH 0.2.1-rc.2 / Node 24.21.0 / FFmpeg N-127650）源码快照上构建可复现
（`lib/` 14/14 逐字节一致），自带 110 项测试与 10 项真实 ffmpeg 端到端全部通过（0 skip），真实转码面
（cut/encode/subtitle/extract/gif/frames/adjust/concat）与 25 类失败契约按 0.5.0 声明工作；新增一条 P2：默认流拷贝
`cut` 在非关键帧起点上产物时长≈start+duration 且含预卷（请求 1 s 实际 2.005 s，去掉 `-avoid_negative_ts make_zero`
后恢复 1.005 s）；并用真实 ffmpeg 复核站内既有评测 F1–F4（F1/F4 证实、F2 默认流拷贝 concat 路径证实条件性覆盖、
F3 参数面证实），按独立复测+补充证据提交、请求并入既有 review 或按独立验证计分。**
