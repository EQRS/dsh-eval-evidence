#!/usr/bin/env node
/**
 * 宿主模拟器（独立探针共用）：
 *  - 用真实子进程实现 DSH `ctx.subprocess.spawn` 的最小面，从而走插件真实入口 `apply()`
 *    → `createSubprocessRunner()` → 工具 execute 全链路（不是绕过 exec 层的直连）；
 *  - 提供断言计数器与若干读数小工具。
 *
 * 该 shim 只在本机测试用，不发布；与 DSH 宿主的差别显式写在报告「诚实边界」里。
 */
import { spawn } from 'node:child_process'
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'

const COLLECT_BYTES = 4 * 1024 * 1024

/** 真实子进程版 SubprocessSpawnLike：stdout/stderr 各收 4MB，支持 AbortSignal 强杀。 */
export function realSubprocessSpawn() {
  return (spec) => {
    const [program, ...args] = spec.argv
    const child = spawn(program, args, {
      cwd: spec.cwd,
      windowsHide: true,
      stdio: ['ignore', 'pipe', 'pipe'],
    })
    const out = []
    const err = []
    let outBytes = 0
    let errBytes = 0
    let lossyOut = false
    let lossyErr = false
    child.stdout.on('data', (chunk) => {
      out.push(chunk)
      outBytes += chunk.length
      if (outBytes > COLLECT_BYTES) {
        // 模拟宿主「保尾丢头」：只保留最后 4MB
        const all = Buffer.concat(out)
        out.length = 0
        out.push(all.subarray(all.length - COLLECT_BYTES))
        lossyOut = true
      }
    })
    child.stderr.on('data', (chunk) => {
      err.push(chunk)
      errBytes += chunk.length
      if (errBytes > COLLECT_BYTES) lossyErr = true
    })
    const done = new Promise((resolve) => {
      child.on('close', (code, signal) => resolve({ exitCode: code, signal: signal ?? null }))
      child.on('error', () => resolve({ exitCode: null, signal: null }))
    })
    if (spec.signal !== undefined) {
      spec.signal.addEventListener('abort', () => {
        try { child.kill('SIGKILL') } catch { /* 已退出 */ }
      }, { once: true })
    }
    const readFrom = (chunks, lossy) => (offset) => {
      const buf = Buffer.concat(chunks)
      return { text: buf.subarray(offset).toString('utf8'), lossy, truncated: lossy }
    }
    return {
      done,
      collected: {
        stdout: { readFrom: readFrom(out, lossyOut) },
        stderr: { readFrom: readFrom(err, lossyErr) },
      },
      terminate() {
        try { child.kill('SIGKILL') } catch { /* 已退出 */ }
      },
    }
  }
}

/** 载入被测插件入口。 */
export async function loadPlugin(pluginDir) {
  return import(pathToFileURL(join(pluginDir, 'lib', 'index.js')).href)
}

/**
 * 走插件真实入口 apply() 注册工具；返回 { lib, tools, byName, tool(name), dispose() }。
 * @param {string} pluginDir 已构建的仓库副本
 * @param {object|undefined} config 插件配置（同 cordis.patch.yml 的 config）
 */
export async function createTools(pluginDir, config) {
  const lib = await loadPlugin(pluginDir)
  const registered = []
  const disposers = []
  const ctx = {
    subprocess: { spawn: realSubprocessSpawn() },
    tools: { register(definition) { registered.push(definition); return () => { const i = registered.indexOf(definition); if (i >= 0) registered.splice(i, 1) } } },
    on(_event, listener) { disposers.push(listener); return () => {} },
  }
  lib.apply(ctx, config ?? null)
  const byName = new Map(registered.map((definition) => [definition.name, definition]))
  return {
    lib,
    tools: registered,
    byName,
    tool(name) {
      const definition = byName.get(name)
      if (definition === undefined) throw new Error('缺少工具 ' + name)
      return definition
    },
    dispose() { for (const dispose of disposers) dispose() },
  }
}

/** 工具执行上下文（cwd 决定相对路径基准；其余字段与宿主无关）。 */
export function execCtx(cwd, extra = {}) {
  return { agent: { session: { header: { cwd } } }, ...extra }
}

/** 断言/读数计数器：全部逐条打印，最后返回汇总结果。 */
export function makeResults() {
  const rows = []
  return {
    rows,
    check(label, ok, detail) {
      rows.push({ label, ok: ok === true, detail: detail === undefined ? '' : String(detail) })
      console.log((ok === true ? 'OK   ' : 'FAIL ') + label + (detail === undefined ? '' : '  → ' + detail))
      return ok === true
    },
    get passed() { return rows.filter((row) => row.ok).length },
    get failed() { return rows.filter((row) => !row.ok).length },
    summary() {
      console.log('')
      console.log('检查项合计：' + rows.length + '，通过 ' + this.passed + '，失败 ' + this.failed)
      return { total: rows.length, passed: this.passed, failed: this.failed }
    },
  }
}

export function sha256File(file) {
  return createHash('sha256').update(readFileSync(file)).digest('hex')
}

/** 近似比较（默认 ±0.15s，覆盖关键帧对齐与容器时间基）。 */
export function near(actual, expected, tolerance = 0.15) {
  return typeof actual === 'number' && Number.isFinite(actual) && Math.abs(actual - expected) <= tolerance
}

/** 统一解析执行结果：成功返回 value，失败返回 { error }。 */
export async function attempt(promise) {
  try {
    return { ok: true, value: await promise }
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : String(error) }
  }
}
