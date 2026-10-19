# 灵枢 0.9.6 复测更正（第三批：TS 桥接 / h3-h7 调度器）

- 被测 commit：`dcac0e795cd03923b2159e4218c76f7578b84efd`（0.9.6）
- 更正对象：`灵枢大脑区_第三批组_v0.9.6.md` 的「①TS 桥接 27 tests / 23 pass / 4 fail」与「②hive 全量未跑完」
- 触发：上一轮把 4 个失败判为「环境未装」，本轮把环境装齐后复测，确认结论

## 一、更正结论（一句话）

**TS 4 个失败全部是缺包，不是产品缺陷；装齐 8 个 peer 依赖后 40 tests / 40 pass / 0 fail（exit 0）。**
**`hive/test_h3_h7_scheduler.py` 不需要 LLM 桩、不联网，纯离线可跑，27 passed / 0 failed（exit 0）。**

## 二、TS 桥接：23/27 → 40/40

### 根因

上一轮只装了部分 peer，8 个 `@deepseek-ai/*` peer 缺失；且**逐次 `npm install` 会剪掉先前 `--no-save` 装的包**，导致装一个掉一个、测试数在 23/27/37 之间来回摆动（曾误读为「不稳定」，实为安装方式错误）。

### 修法

一次性把 8 个 peer 装进同一条命令（npm 镜像 `registry.npmmirror.com`，`--no-save --no-package-lock --ignore-scripts --legacy-peer-deps`）：

```
@deepseek-ai/cordis @deepseek-ai/dsh-scope @deepseek-ai/dsh-timeout
@deepseek-ai/dsh-invariants @deepseek-ai/dsh-brand @deepseek-ai/dsh-attachment
@deepseek-ai/dsh-code-runtime @deepseek-ai/dsh-user-approval @deepseek-ai/dsh-typert-protocol
```

### 读数

| 项 | 结果 |
|---|---|
| 安装 | `INSTALL exit=0`（added 7 packages in 3s） |
| 测试 | `40 tests / 40 pass / 0 fail`，`TESTS exit=0`，duration 32.7 s |
| 日志 | `ts-final.log` |

### 顺带撤回的两条已发布判断

1. **P3 候选撤回**：`bridge.test.ts`「dispose 后进程应退出」这条断言**装齐依赖后通过**（日志 `[lingshu-bridge] 灵枢进程退出 code=0 signal=null（存活 5s）`）。上一轮列为「候选缺陷」是误判，现撤回，不作为缺陷。
2. **src 组件的工具面验证已补齐**：日志 `✔ 插件激活：cg/stg 工具注册进 ctx.tools（core = cg/stg 两基元）`，证明 TS 侧工具注册链路真实生效（此前补测组里「src 组只验了 tsc exit 0，未验工具注册」的缺口由此关闭）。

## 三、hive/test_h3_h7_scheduler.py：无需 LLM 桩，离线可跑

### 结论

- 需不需要 LLM 桩：**不需要**。脚本自带**桩执行器**，不调用任何模型。
- 能不能离线：**能**。只用本机 cargo + python，不触网。
- 结果：`27 passed, 0 failed`，`EXIT=0`（编译约 5 s，全程约半分钟）。

### 机制

脚本把 `hive/Cargo.toml` + `hive/src/` 复制到系统临时目录，用独立 `CARGO_TARGET_DIR` 编译，绕开长中文路径下的链接问题；然后起**真的 serve 进程** + 桩执行器跑场景，全程读磁盘字节做断言。

### 覆盖的 27 条断言（五组）

- **A 坏 status 不静默**（7 条）：标记文件按阈值落场、字段齐备（job_id/kind/detected_ts/first_ts/ticks/threshold/last_error）、启动告警点名坏任务、周期告警、坏任务既不领取也不终态化、doctor 归 corrupt 独立类别带明细、poll 单查 state=corrupt 而非裸 error。
- **B 字节不被改写**（4 条）：坏 status.json 逐字节不变、标记是独立文件、同目录 spec.json 逐字节不变、**零闸变对照**（健康任务仍被 serve 正常改写，证明「不改」是坏文件专属而非 serve 不干活）。
- **C 隔离可回退**（6 条）：`--quarantine` 搬家且报数、退出领取面、字节逐字节一致、doctor 如实报隔离、`--unquarantine` 原路退回字节一致、空操作幂等。
- **D H-7 有界**（4 条）：峰值 claimed+running=2 ≤ workers=2、有界不是空谈（期间确有 pending 残留）、drain 全 done 不伤吞吐、名额闸未破坏 N191 不变量。
- **E 端到端两态共存**（5 条）：干净池全 done、同池坏 status 字节不动且不产出 result.json、健康任务照常全 done、serve 心跳持续、serve 零 panic。

### 与已发布读数的关系

上一轮只跑了 `test_exec_cmd`（16/16）就标了「hive 全量未跑完」。本次补齐 h3/h7 调度器这一组；hive 其余测试仍按原报告口径（部分未跑）。

## 四、不适用条件

- 本更正只覆盖 TS 桥接与 h3-h7 调度器两组，不改变其余组的结论（swarm 24/24、compiler 31/31、md_cg 628 PASS/46 FAIL、注入件字节一致、纪律指纹一致、bench_p0 exit 0 均维持原判）。
- TS 40/40 的成立前提是**装齐 8 个 peer**；未装齐时测试会因缺少依赖失败，属环境问题，不可作为「产品不稳定」的证据。
- h3/h7 的「离线可跑」成立前提是本机已有可用的 Rust 工具链（cargo 1.97.1）；无 cargo 的机器上该脚本会因编译失败而不可跑。

## 五、证据

- `ts-final.log`：TS 安装 + 40/40 全量输出
- `h3h7.log`：27 条断言逐条 [ok] + 汇总行
