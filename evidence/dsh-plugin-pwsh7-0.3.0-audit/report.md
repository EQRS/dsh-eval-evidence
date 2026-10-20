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
| **安全结论（指定范围）** | 安全面**部分结论**：六威胁中 **1 项已确认问题（供应链 F1，文件级）**、2 项「未发现问题」（提示注入、凭据保护）、1 项「未发现问题（运行期+脚本级，注册表未真实回放）」（数据外传、破坏性操作按此口径记「未测→未发现问题（有限范围）」）、1 项**未测**（权限越界）；**无任何一项达到「已验证通过」** |

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

## 四、安全动态实验（本轮新增）

### E1 篡改归档实验 —— **F1 升级为「已确认问题」**

- 构造：把官方 `PowerShell-7.6.7-win-x64.zip`（106,364,316 B）复制后**追加一个不在官方发布里的文件** `evil-payload.txt`（内容 `TAMPER-MARKER-42…`），得 106,364,484 B。
- 执行：`installPowerShell7`（method=portable、scope=user）以**注入的 fetch** 把该归档当作「GitHub 发布下载」返回；`updatePath` 打桩只记录不写注册表。
- 读数：**`ok:true`，version=7.6.7，耗时 3.5 s**；安装目录 `…\dsh\pwsh7\powershell7\7.6.7\` 内**存在 `evil-payload.txt`**（内容逐字为注入串）；该目录被加入 PATH（桩记录 `…\7.6.7\pwsh.exe`）。
- 判定：**安装链对归档内容不做任何完整性校验**（无 sha256/digest/签名），**任意文件可被写入 PATH 目录**。⇒ 这是**已确认问题**（一次实验即确认，符合 §4.1.1「可重复验证」门槛），严重度按供应链口径记 **🟠 高**：上游/MITM/代理替换归档即可在用户 PATH 目录落任意文件（含可执行文件），后续被 `pwsh` 工具或用户按名调用即执行。
- 缓解仍在：安装需**用户主动触发**；`probePwsh` 会跑 `pwsh.exe` 并要求主版本 ≥7（所以「换成非 PS7 的二进制」会被拦下，但「真 PS7 + 附带载荷文件」不会被拦）。
- 未做：真实恶意 PE 投毒（不做该实验本身可能造成损害）、以及 TLS 层中间人构造（用注入 fetch 等价替换了来源）。

### E2 PATH 写入：脚本级回放（注册表未真实写入）

- `pathUpdateScript` 生成脚本：**写 `Path`**、**保留原始未展开值与 ValueKind**、**广播 Explorer** 三项均在（正则断言全 True）。
- `pathRemovalScript`：按 root 前缀移除、保留 ValueKind。
- `updateInstallPath(..., run=注入桩)` → 捕获脚本 4,057 字符，**真实注册表未被写**（未调用 `runWindowsScript`）。
- 结论：**未执行真实注册表写入**，只能给「脚本级」证据；破坏性面按「未测→未发现问题（有限范围）」记录，不等于已验证。

### E4 权限边界红队（读越界 / 写越界 / 执行越界）

- **T1 执行越界（新观察 F3）**：把 `config.pwshPath` 指向 `C:\Windows\System32\cmd.exe` 后，`resolveExecutorPwshPath()` **原样返回该路径**，且 `pwshReady(state)=true`（`state.pwsh.version=undefined`）——即**解析期不校验目标是 PowerShell 7**，只有安装期 `probePwsh` 才校验版本。影响：本地可写 config 者（或安装后被替换配置）可让宿主的 `pwsh` 工具实际执行任意可执行文件。严重度 **🟡 中**（需同用户写权限，非远程）。
- **T2 写越界（库层观察）**：`installDirectory(env,'user',root)` 对 `C:/Windows/System32/l3probe`、`C:/Program Files/l3probe` **原样返回**，库层不限制 `root`；但 `root` 由 `LOCALAPPDATA` 派生、不是模型可控参数。
- **T3 读/写越界实测**：把 `LOCALAPPDATA` 指向 `C:\Windows\System32` 后执行 `route` 动作 → **`ok:false`**，错误原文 `EPERM: operation not permitted, mkdir 'C:\Windows\System32\dsh\pwsh7'`，**未发生静默降级**，系统目录未被写（实测 `existsSync=false`）。
- **E5 系统级安装提权**：`requireSystemAdministrator()` 在非管理员进程直接抛出 `System installation requires administrator rights…`；`installPowerShell7(scope:'system')` 返回 `ok:false` 同一文案（耗时 0.65 s，未产生部分写入）。

### E3 运行期外呼计数

- 给 `globalThis.fetch` 计数后依次调用 `status / diagnose / selfcheck / route(system) / route(plugin)`：**fetch 调用 0 次**。
- 即：**工具动作零外呼**；外呼只出现在用户主动安装的下载阶段（`api.github.com` + 发布资源）。

### 本次实验的自身副作用（如实披露）

- E3 的 `route` 动作走的是真实 `process.env`，**在 `%LOCALAPPDATA%\dsh\pwsh7\config.json` 生成了一个配置文件**（内容 `{route: "plugin", version: 1, updatedAt: …}`）。发现后已**立即删除该文件与其空目录**，恢复到实验前状态；注册表 PATH **全程未真实写入**。

## 五、六威胁逐项

| # | 威胁 | 测法 | 证据 | 结论 |
|---|---|---|---|---|
| 1 | 提示注入 | 静态参数面 + 动态投注入串 | `action`/`mode` 仅 enum；`{"action":"status; calc.exe"}`、`{"action":"nope"}` 被 schema 拒 | **未发现问题** |
| 2 | 权限越界 | 三组红队：执行越界 T1 / 写越界 T2-T3 / 提权 E5 | T1：`config.pwshPath=cmd.exe` 被原样解析且 `pwshReady=true`（**F3 🟡 中**）；T3：写 System32 被 EPERM 拒且错误外显；E5：系统级安装需管理员，非管理员直接拒 | **未发现问题（系统级/系统目录）** ＋ **F3 观察项（解析期不校验 PS7）** |
| 3 | 数据外传 | 静态外呼点 + 动态 fetch 计数（E3） | 工具动作 0 次外呼；仅安装期 GitHub 两跳 | **未发现问题（运行期）** |
| 4 | 破坏性操作 | 脚本级回放（E2），注册表未真实写入 | 写 HKCU/HKLM `Path` 保留原值类型；移除脚本按 root 可逆 | **未测→未发现问题（有限范围）** |
| 5 | 凭据保护 | 静态：config 与状态输出字段 | 只存 `pwshPath`/`route`/`installed`；状态输出只列路径与版本 | **未发现问题** |
| 6 | 供应链与更新行为漂移 | 篡改归档实验（E1） | **`ok:true` + `evil-payload.txt` 落入 PATH 目录**；全程无哈希校验 | **♂ 已确认问题（🟠 高）** |

**三分法**：以上「未测」= 没考；「未发现问题」= 考了没抓到；本轮**没有任何一项**达到「已验证通过」。安全结论因此只能落在「未测（含两项静态观察）」。

## 六、不适用条件（读结论前必看）

- 能力结论 **只在「本机只有 PowerShell 5.1」的环境**成立：差值来自 PS7 与 5.1 的能力差，插件的作用是把工具路由到 PS7。**已装 PS7 或宿主持有 PS7 的环境，本差值预期为 0**（未实测）。
- 本实验的 PS7 由**手动下载便携包**放入 `%TEMP%\ps7`，**没有走插件的自动安装流程**；因此「安装流程是否可靠/是否会被中断」未评估。
- 判分只看固定期望串，不评价模型输出质量；S1 期望 `7` 会随 PS7 主版本升级失效（需同步升版）。
- 安全面：**F1 已由 E1 实验确认**（篡改归档被接受、注入文件落入 PATH 目录）；未做的是「真实恶意 PE 投毒」与「TLS 层中间人构造」，用注入 fetch 等价替代来源。
- 权限越界（#2）：只覆盖「系统级安装提权 / 系统目录写入 / config 指向非 PS7 可执行」三组；**未覆盖**「普通用户目录内的越权读写」（同用户本就有权，不构成越界）。
- 新增观察 **F3**：`config.pwshPath` 解析期不校验目标是否为 PowerShell 7（安装期才会 probe）；属**纵深防御缺口**，不是可直接远程利用的漏洞。
- E3 的 `route` 动作曾在本机生成 `%LOCALAPPDATA%\dsh\pwsh7\config.json`，已删除恢复；若你在本机看到该文件，说明未清理干净，请告知。
- 本次**未**写入真实 `%LOCALAPPDATA%\dsh\pwsh7\config.json`，也未改真实 PATH/注册表。

## 七、证据清单

| 文件 | 内容 |
|---|---|
| `raw-ability.json` | 48 次命令执行的 rc/stdout/stderr/命中明细与分组汇总 |
| `raw-router.log` | 路由解析（state.route=plugin、ready=true、resolved=PS7）+ 工具参数注入串被 schema 拒绝 + `diagnose` 输出 |
| `深度审计_dsh-plugin-pwsh7_v0.1.md` | 本报告 |
