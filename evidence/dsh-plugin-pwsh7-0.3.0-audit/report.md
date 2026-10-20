# 深度审计：dsh-plugin-pwsh7 0.3.0（L3 · A 路径）

> L3 = L2 标准测评 + 安全六威胁全项（规范 §2.3，A 路径：本件无前置 L2，由本报告一并交付）。
> 使用者授权：六威胁全测、沙箱内进行（2026-10-20）；安装动作仅在本机临时目录与临时 `LOCALAPPDATA` 下进行，**未改真实 profile、未写真实注册表**。
> 被测件：站点 <https://review.lingshulab.com/plugins?cat=__none__>（2026-10-20 00:00，作者 drliuhuan/dsh-plugin-pwsh7），`dsh-plugin-pwsh7@0.3.0`。

## 一、结论

| 项 | 值 |
|---|---|
| **能力判定** | **真有用** |
| D（装 − 不装） | **+24**（范围 [-24, 24]） |
| 95% bootstrap 区间 | **[+24, +24]**，半宽 0（任务确定性，三次重复零方差） |
| 样本 | 8 个 PS7 独有语义场景 × 3 次重复 × 2 组 = 48 次命令执行 |
| 环境 | Windows，PowerShell 5.1.26100（默认）+ 便携 PowerShell 7.6.7（临时目录，实验用） |
| **安全结论（指定范围）** | **未测**（除两项静态观察：供应链校验缺口 F1、注册表 PATH 写入 F2）；不写「已验证通过」 |

**读法**：装组 24/24、不装组 0/24 ⇒ 在本机默认只有 PowerShell 5.1 的环境里，插件把 `pwsh` 工具路由到 PowerShell 7 之后，8 类 PS7 独有任务**从全失败变为全成功**。
**必须同时读的三条边界**（见 §五）：①PS7 由我手动放入临时目录，插件自身的「自动安装」流程未评估；②若部署环境已有 PS7 或默认就是 PS7，本差值不成立；③任务的正确性由固定期望串判定，不涉及模型。

## 二、任务契约与预注册

- 场景（均为 PS7 独有语义，PS5.1 直接失败）：
  S1 `$PSVersionTable.PSVersion.Major` 期望 `7`；S2 三元 `$x ? 'YES' : 'NO'`；S3 空值合并 `$null ?? 'DEF'`；S4 `ConvertFrom-Json -AsHashtable`；S5 UTF-8 默认落盘（首字节 228）；S6 `&&` 运算符；S7 `ForEach-Object -Parallel` + `Join-String`；S8 `Test-Json`。
- 判分：stdout 命中期望串即 1 分；每场景 3 次重复；满 24。
- 不装组：`C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe`（本机默认 5.1）。
- 装组：**经插件路由解析出的可执行文件**——在临时 `LOCALAPPDATA` 下写 `dsh\pwsh7\config.json`（`route=plugin`、`pwshPath=<PS7>`），`getRouterState()` 读出 `ready=true`，`resolveExecutorPwshPath()` 返回该 PS7 路径（日志 `raw-router.log`）。
- 环境变量与临时目录全部落在 `%TEMP%`，`LOCALAPPDATA` 指向临时目录；**真实用户配置未被读写**。

## 三、读数

| 场景 | 不装（PS5.1） | 装（PS7 经插件路由） |
|---|---|---|
| S1 版本大号 | 0/3 | 3/3 |
| S2 三元运算符 | 0/3 | 3/3 |
| S3 空值合并 | 0/3 | 3/3 |
| S4 JSON -AsHashtable | 0/3 | 3/3 |
| S5 UTF-8 默认落盘 | 0/3 | 3/3 |
| S6 `&&` 运算符 | 0/3 | 3/3 |
| S7 并行 ForEach | 0/3 | 3/3 |
| S8 Test-Json | 0/3 | 3/3 |
| **合计** | **0/24** | **24/24** |

原始读数：`raw-ability.json`（含每条命令的 rc/stdout/stderr/命中）。

## 四、六威胁逐项

| # | 威胁 | 测法 | 证据 | 结论 |
|---|---|---|---|---|
| 1 | 提示注入 | 静态读工具参数面 + 动态投注入串 | `shell_router` 参数只有 `action`（enum 7 值）与 `mode`（enum 2 值）；`{action:"status; calc.exe"}` 与 `{action:"nope"}` 均被 schema 拒绝（`invalid arguments: "action" must be one of [...]`） | **未发现问题**（本工具面无自由文本入口；执行面注入风险在宿主 `pwsh` 工具，不在本件） |
| 2 | 权限越界 | 静态：范围与提权；动态：临时 `LOCALAPPDATA` 隔离验证 | `requireSystemAdministrator()` 拒绝非管理员系统级安装并给文案；本次 per-user 路径全程在 `%TEMP%` 写出 | **未测**（未做越界读写红队） |
| 3 | 数据外传 | 静态：全包外呼点；动态：未抓包 | 包内 `fetch` 仅 1 处，位于安装下载函数（`api.github.com` + `github.com/.../releases/download/...`）；无遥测/上报端点 | **未测**（未抓包；静态未见遥测） |
| 4 | 破坏性操作 | 静态：系统写入面；动态：未真实执行安装到 PATH | `pathUpdateScript` 写 HKCU/HKLM `Path`（保留原值类型/未展开变量）并广播；`pathRemovalScript` 可逆移除 | **未测**（未在沙箱回放注册表写入，避免真机副作用） |
| 5 | 凭据保护 | 静态：配置与日志落盘内容 | `config.json` 只存 `pwshPath`/`route`/`installed`；未见 token/密钥字段；`shell_router` 状态输出只列路径与版本 | **未发现问题**（静态） |
| 6 | 供应链与更新行为漂移 | 静态：下载-校验-执行链；动态：未做替换实验 | **F1**：下载 PS7 zip 只校验魔数 + ≥5 MB，全包 `sha256/sha512/checksum/integrity/digest` 命中 **0**；缓解=用户主动触发 + 装后 probe 版本 + per-user 目录 | **未测**（静态缺口已记录，未做投毒实验） |

**三分法**：以上「未测」= 没考；「未发现问题」= 考了没抓到；本轮**没有任何一项**达到「已验证通过」。安全结论因此只能落在「未测（含两项静态观察）」。

## 五、不适用条件（读结论前必看）

- 能力结论 **只在「本机只有 PowerShell 5.1」的环境**成立：差值来自 PS7 与 5.1 的能力差，插件的作用是把工具路由到 PS7。**已装 PS7 或宿主持有 PS7 的环境，本差值预期为 0**（未实测）。
- 本实验的 PS7 由**手动下载便携包**放入 `%TEMP%\ps7`，**没有走插件的自动安装流程**；因此「安装流程是否可靠/是否会被中断」未评估。
- 判分只看固定期望串，不评价模型输出质量；S1 期望 `7` 会随 PS7 主版本升级失效（需同步升版）。
- 安全面：未做越界红队、未抓包、未回放注册表写入、未做 zip 投毒实验；F1 是**静态缺口**，不是已确认漏洞。
- 本次**未**写入真实 `%LOCALAPPDATA%\dsh\pwsh7\config.json`，也未改真实 PATH/注册表。

## 六、证据清单

| 文件 | 内容 |
|---|---|
| `raw-ability.json` | 48 次命令执行的 rc/stdout/stderr/命中明细与分组汇总 |
| `raw-router.log` | 路由解析（state.route=plugin、ready=true、resolved=PS7）+ 工具参数注入串被 schema 拒绝 + `diagnose` 输出 |
| `深度审计_dsh-plugin-pwsh7_v0.1.md` | 本报告 |
