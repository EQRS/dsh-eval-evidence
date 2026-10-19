# 预注册 · dsh-code-security 标准测评 v0.2（判分器与 subprocess 桩修正后重跑）

- 冻结时间：2026-10-19T20:29+08:00（文件 mtime 可核）
- 被测件：dsh-code-security 0.5.0（commit 0f2c70b14294460ad07f80ad754d0464765e4dbd）
- 实验脚本：测试/dsh-code-security/probes/experiment_code_security_v02.mjs；结果 raw/70-eval-v02/

## 零、v0.1 作废原因（判分器/桩缺陷，非插件缺陷）

v0.1（`raw/70-eval/`，D=-9 / CI[-16,-3] / 半宽 6.5）两处缺陷：
1. S7 干净场景：模型答「NONE」，判分器的 clean 词表未含 none → 两侧同判错（diff=0，不影响 D，但读数失真）；
2. 装组 subprocess 桩直接 throw → 部分工具路径报 ERROR（S2 seed202 模型转向「Git 不可用」），干扰装组表现。
v0.1 整体作废保留为历史；v0.2 修正两处后全量重跑，场景与阈值不变。

## 一、指标（同 v0.1）

- D = Σ(装 − 不装)，8 场景 × 3 seed；a=12，b=6；bootstrap 半宽 ≤6；B=10000，seed=20261019。
- 模型 deepseek-flash，temperature 0.7，seeds=[101,202,303]。

## 二、场景（同 v0.1）

| # | fixture | 期望 |
|---|---|---|
| S1 | inject.js SQL 拼接 | 注入 + inject.js |
| S2 | secrets.js 硬编码 key | 硬编码/密钥 + secrets.js |
| S3 | exec.js 命令拼接 | 命令注入 + exec.js |
| S4 | eval.js | eval/代码执行 + eval.js |
| S5 | hash.js md5 | md5/弱哈希 + hash.js |
| S6 | fs.js 路径拼接 | 路径遍历 + fs.js |
| S7 | good.js 纯函数 | 无问题（含 NONE） |
| S8 | secrets.js + inject.js | 两类都命中 |

## 三、反作弊（同 v0.1）

判分器冻结；每场景独立目录；不装组文件内容由脚本读取；不得只重跑差的一边。

## 四、口径

单模型单温度、单机、8 个小文件；内置规则引擎（builtin）默认；外部引擎未启用；不排名、不给总分。