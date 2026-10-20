# 深度审计：dsh-plugin-memory 0.10.0（L3 · A 路径）

> 同上批口径：L3 A 路径、六威胁全测、沙箱内（2026-10-20）。临时 `memoryDir`，未改真实配置。
> 被测件：站点（2026-10-19 23:08，LittleBlackTong/dsh-plugin-memory）。

## 一、结论

| 项 | 值 |
|---|---|
| **能力判定** | **真有用**（口径：注入面功能验证） |
| D | **+24**（8 项注入/注册断言全过 × 3 次；不装组 0/24） |
| 区间 | [24,24]，半宽 0 |
| **安全结论（指定范围）** | 2 项观察（默认在 `~/.memory` 建脚手架 🟡 中；boot 段含**命令式指令** 🟡 低）＋ 其余未发现问题 |

## 二、读数（8/8）

S1 boot 注入 SOUL 内容 ✅｜S2 注入 MEMORY ✅｜S3 注入 index ✅｜S4 注册 `memory` skill ✅（`ctx.skills.register`，带 `resourceBase`）｜S5 `bootMaxChars` 截断生效（HUGE-END 被截）✅｜S6 `autoInject:false` 不注入 ✅｜S7 `enabled:false` 全停（skill 也不注册）✅｜S8 缺文件容错 ✅

不装组：无 section、无 skill（0/24）。

## 三、发现

### B1（🟡 中）默认在 `~/.memory` 建脚手架

- `apply()` 在默认配置（`scaffold:true`、`memoryDir:~/.memory`）下**加载即创建**整套目录与模板：`BOOTSTRAP.md / MEMORY.md / SOUL.md / index.md / log.md` + `concepts/ decisions/ identity/ projects/ raw/ skills/ user/`（**13 项**）。
- 本次 mock 加载时**真实创建了 `C:\Users\30951\.memory`**（03:43:12，13 项，全为模板）→ 发现后**已删除并恢复**；特此披露。
- 影响：插件加载即写用户家目录；对「只想试用/离线审查」的场景是意外写入。可用 `scaffold:false` + `memoryDir` 规避。

### B2（🟡 低）boot 段直接向模型下命令

- 注入文本含：「**每次会话收尾前必须执行 memory digest……收到后立即写回，不得拖延**」。
- 属「第三方插件通过 systemPrompt 指挥模型行为」的治理面问题；对使用者是可预期的功能设计，但与其他插件/使用者指令可能冲突。

## 四、六威胁

| # | 威胁 | 证据 | 结论 |
|---|---|---|---|
| 1 | 提示注入 | boot 文件内容原样注入（S1-S3）；B2 的命令式文本一并注入 | **观察 🟡 中**（记忆投毒 + 指令植入） |
| 2 | 权限越界 | 读 `memoryDir` 下 boot 文件；默认路径在家目录（B1 会建目录） | **观察 🟡（B1 写家目录）** |
| 3 | 数据外传 | `lib/index.js` `fetch/http=0`；无遥测端点 | **未发现问题（静态）** |
| 4 | 破坏性操作 | 无删除；写限于 memoryDir（含 git auto-commit，需仓） | **未发现问题（未做回放）** |
| 5 | 凭据保护 | boot 文件仅 `SOUL/MEMORY/index`；若把密钥写进这些文件则会注入 | **观察（配置责任）** |
| 6 | 供应链 | 依赖/同批校验：包内无运行依赖，无 postinstall | **未发现问题（静态）** |

## 五、不适用条件

- 三条 Web 路由（CONFIG/INSIGHTS/GRAPH）在 mock 下**未注册成功**（`webServer.register` 签名未按要求注入）→ **未测**。
- auto-commit / digest 提醒 / recall-nudge / 图谱构建等需真实宿主与 git 仓的路径**未测**。
- 能力口径同 snapshot：注入面功能验证，不是端到端任务成功率。
- B1 的删除是我做的清理，不代表插件行为；真实使用请自行决定是否保留 `~/.memory`。
