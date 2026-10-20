# 深度审计：dsh-lan-access 0.1.3（L3 · A 路径）

> 来源：站点 <https://review.lingshulab.com/plugins?cat=__none__>（2026/10/19 10:25，Leon0555/dsh-lan-access）。授权：六威胁全测、沙箱内（2026-10-20）。实验在 `%TEMP%\batch2` 内。

## 一、结论

| 项 | 值 |
|---|---|
| **能力判定** | **还说不准（需真实 webserver 绑定才能验 LAN 可达）** |
| **安全结论（指定范围）** | **观察 🟡 中**：bundle 补丁把 `webserver.host` 改为 `0.0.0.0`，Web GUI 暴露到局域网；无鉴权提示 |

## 二、读到的行为（静态 + 桩验证）

- `cordis.patch.yml`（`# dsh-lan-access bundle patch`）：
  ```yaml
  - id: webserver
    config:
      host: 0.0.0.0
      port: !!js ctx.webStartup.port ?? 3080
  ```
  注释自陈：「bind the Web GUI to all interfaces (LAN access, **trusted networks only**)」。
- `lib/index.js`：`apply(ctx) → ctx.webServer.tapIndex(injectHead)`；`injectHead(html)` 在 `</head>` 前注入 `randomUUID` polyfill + `DEVICE_CSS`（桩验证：`html.includes("randomUUID")` 时幂等跳过）。
- **绑定行为本身无法在沙箱验证**（需要真实 webserver 起监听）⇒ 能力「还说不准」。

## 三、六威胁（重点在权限/外传）

| # | 威胁 | 现状 |
|---|---|---|
| 1 | 提示注入 | **未测** |
| 2 | 权限越界 | **未测**；观察：把 GUI 监听从 127.0.0.1 改为 `0.0.0.0`，网络可达面从本机扩到整个 LAN |
| 3 | 数据外传 | **未测**；观察：GUI 暴露后，任何同网段主机可访问会话界面（DSH 是否自带鉴权取决于宿主版本，**本件未加鉴权**） |
| 4 | 破坏性操作 | **未测** |
| 5 | 凭据保护 | **未测**；若 GUI 无鉴权，暴露面即凭据/会话内容面 |
| 6 | 供应链 | 静态：`deps=0`、`peers=0`、无 postinstall、sha1 `9b02938b…8fb224a` 与 registry 一致 |

## 四、使用建议（非判定）

- 只在**可信局域网**启用；公网/酒店 Wi-Fi 下应关闭。
- 暴露前请自行确认 DSH 版本是否对 Web GUI 有访问控制；本件**不加鉴权**。

## 五、不适用条件

- 未实际起监听、未从另一台机器探测可达性；「LAN 可访问」与「鉴权缺失导致的风险」均为**静态观察**，未做红队。
- 本件不是安全审计结论，不得写成「该插件不安全」。
