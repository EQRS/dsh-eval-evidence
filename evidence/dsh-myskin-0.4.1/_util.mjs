// dsh-myskin 0.4.1 测评探针的共享工具（纯 Node 内置模块）。
// 纪律：
//   - 被测源码目录只读：所有 build / install / test 都在 WORK/sandbox/repo 副本里跑；
//   - live profile 不动；安装依赖只在副本内（沙箱），装前先落锚定；
//   - 原始读数一律写 raw/ 下 UTF-8 文本。
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

export const WORK = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export const RAW = path.join(WORK, 'raw');
export const SRC = 'D:\\natnat\\lingshu\\外部插件\\dsh-myskin\\dsh-myskin-main';
export const SANDBOX = path.join(WORK, 'sandbox');
export const REPO = path.join(SANDBOX, 'repo');
export const NODE = process.execPath;
export const PNPM = 'C:\\Users\\30951\\AppData\\Local\\Programs\\DeepSeek Harness\\resources\\runtime\\primary-runtime\\dependencies\\pnpm\\bin\\pnpm.cjs';
export const DSH_APP = 'C:\\Users\\30951\\AppData\\Local\\Programs\\DeepSeek Harness';
export const DSH_ASAR = path.join(DSH_APP, 'resources', 'app.asar');
export const LIVE_PROFILE = 'C:\\Users\\30951\\.dsh\\profiles\\desktop';

export function sha256(buf) { return crypto.createHash('sha256').update(buf).digest('hex'); }
export function sha256File(p) { return sha256(fs.readFileSync(p)); }

export function walkFiles(root) {
  const out = [];
  const visit = (dir) => {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, e.name);
      if (e.isDirectory()) visit(p);
      else if (e.isFile()) out.push(path.relative(root, p).split(path.sep).join('/'));
    }
  };
  visit(root);
  return out.sort();
}

export function inventory(root) {
  const m = new Map();
  for (const rel of walkFiles(root)) {
    const p = path.join(root, ...rel.split('/'));
    m.set(rel, { size: fs.statSync(p).size, sha256: sha256File(p) });
  }
  return m;
}

export function treeInfo(root) {
  const inv = inventory(root);
  const canon = [...inv.entries()].map(([rel, v]) => `${rel}\t${v.size}\t${v.sha256}`).join('\n') + '\n';
  let bytes = 0;
  for (const v of inv.values()) bytes += v.size;
  return { files: inv.size, bytes, fingerprint: sha256(Buffer.from(canon, 'utf8')), inventory: inv };
}

export function ensureDir(p) { fs.mkdirSync(p, { recursive: true }); return p; }

export function writeRaw(name, lines) {
  const text = Array.isArray(lines) ? lines.join('\n') + '\n' : String(lines);
  ensureDir(RAW);
  const p = path.join(RAW, name);
  fs.writeFileSync(p, text, 'utf8');
  console.log(`[raw] ${name}  ${text.split('\n').length} lines, ${Buffer.byteLength(text)} bytes`);
  return p;
}

export function run(cmd, args, opts = {}) {
  const r = spawnSync(cmd, args, { encoding: 'utf8', maxBuffer: 128 * 1024 * 1024, ...opts });
  return {
    cmd: [cmd, ...args].map((a) => (/[ \t]/.test(a) ? JSON.stringify(a) : a)).join(' '),
    status: r.status,
    signal: r.signal,
    error: r.error ? (r.error.code || r.error.message) : null,
    stdout: r.stdout || '',
    stderr: r.stderr || '',
  };
}

export function cmdBlock(title, res, { full = true } = {}) {
  const out = [`### ${title}`, `$ ${res.cmd}`, `exit=${res.status}${res.signal ? ' signal=' + res.signal : ''}`];
  if (res.stdout) out.push('--- stdout ---', full ? res.stdout.replace(/\s+$/, '') : tailLines(res.stdout, 40));
  if (res.stderr) out.push('--- stderr ---', full ? res.stderr.replace(/\s+$/, '') : tailLines(res.stderr, 40));
  return out;
}

export function tailLines(text, n) {
  const lines = String(text).split('\n').filter((l) => l !== '');
  return lines.slice(Math.max(0, lines.length - n)).join('\n');
}

export function readJson(p) { return JSON.parse(fs.readFileSync(p, 'utf8').replace(/^\uFEFF/, '')); }

/** Read one file from an Electron asar (read-only). Layout documented in raw/14 of the vibe-island review. */
export function asarEntry(asarPath, entryPath) {
  const b = fs.readFileSync(asarPath);
  const hs = b.readUInt32LE(4);
  const js = b.readUInt32LE(12);
  const base = 8 + hs;
  const header = JSON.parse(b.subarray(16, 16 + js).toString('utf8'));
  let node = header;
  for (const seg of String(entryPath).split('/')) {
    if (!node.files || !node.files[seg]) return { header, missing: seg };
    node = node.files[seg];
  }
  if (!node.offset) return { header, isDir: true };
  const start = base + Number(node.offset);
  return { header, data: b.subarray(start, start + node.size) };
}

/** List the entries under a directory prefix in an asar, up to `depth` levels. */
export function asarList(asarPath, prefix, depth = 2) {
  const b = fs.readFileSync(asarPath);
  const hs = b.readUInt32LE(4);
  const js = b.readUInt32LE(12);
  const header = JSON.parse(b.subarray(16, 16 + js).toString('utf8'));
  let node = header;
  for (const seg of String(prefix).split('/').filter(Boolean)) {
    if (!node.files || !node.files[seg]) return [];
    node = node.files[seg];
  }
  const out = [];
  const walk = (n, rel, level) => {
    for (const [name, child] of Object.entries(n.files || {})) {
      const r = rel ? rel + '/' + name : name;
      const isDir = !child.offset;
      out.push({ path: r, isDir, size: child.size ?? 0 });
      if (isDir && level < depth) walk(child, r, level + 1);
    }
  };
  walk(node, '', 1);
  return out;
}

/** Read every file under an asar directory prefix: [{ rel, data: Buffer }]. */
export function asarReadTree(asarPath, prefix, { maxBytes = 400 * 1024 * 1024 } = {}) {
  const b = fs.readFileSync(asarPath);
  const hs = b.readUInt32LE(4);
  const js = b.readUInt32LE(12);
  const base = 8 + hs;
  const header = JSON.parse(b.subarray(16, 16 + js).toString('utf8'));
  let node = header;
  for (const seg of String(prefix).split('/').filter(Boolean)) {
    if (!node.files || !node.files[seg]) return [];
    node = node.files[seg];
  }
  const out = [];
  let total = 0;
  const walk = (n, rel) => {
    for (const [name, child] of Object.entries(n.files || {})) {
      const r = rel ? rel + '/' + name : name;
      if (!child.offset) { walk(child, r); continue; }
      total += child.size ?? 0;
      if (total > maxBytes) throw new Error('asarReadTree exceeded maxBytes');
      const start = base + Number(child.offset);
      out.push({ rel: r, data: b.subarray(start, start + child.size) });
    }
  };
  walk(node, '');
  return out;
}

export function ensureSandboxCopy() {
  const srcInfo = treeInfo(SRC);
  const repoInfo = fs.existsSync(REPO) ? treeInfo(REPO) : null;
  return { srcInfo, repoInfo, same: repoInfo !== null && repoInfo.fingerprint === srcInfo.fingerprint };
}

export function header(title) {
  return [
    '='.repeat(78),
    title,
    'sampled_at = ' + new Date().toISOString(),
    'workdir    = ' + WORK,
    'node       = ' + process.version + ' (' + NODE + ')',
    'platform   = ' + process.platform + ' ' + process.arch,
    '='.repeat(78),
    '',
  ];
}

export function osInfo() {
  return { platform: process.platform, arch: process.arch, release: os.release(), version: os.version(), hostname: os.hostname() };
}
