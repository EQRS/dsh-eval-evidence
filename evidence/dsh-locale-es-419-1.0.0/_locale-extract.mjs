// locale 提取辅助：从宿主 DSH 编译后的 client bundle 中解析 en/zh 字典与 namespace 注册表。
// 这些 bundle 的形态（本机 0.2.1-rc.2 实测）：
//   const en$6 = { title: "...", "chat.turnNavigation.label": "..." }
//   ctx.effect(() => ctx.locale.register("documentMarkdown", { zh: zh$6, en: en$6 }), ...)
// 以及 shorthand 的 `{ zh, en }`。只做“对象字面量里的字符串键值对”解析，遇到不支持的形态记 unresolved。
import fs from 'node:fs';
import { asarEntry } from './_util.mjs';

const WS = /\s/;

function skipWs(text, i) {
  while (i < text.length) {
    const c = text[i];
    if (WS.test(c)) { i++; continue; }
    if (c === '/' && text[i + 1] === '/') { while (i < text.length && text[i] !== '\n') i++; continue; }
    if (c === '/' && text[i + 1] === '*') { const e = text.indexOf('*/', i + 2); i = e < 0 ? text.length : e + 2; continue; }
    break;
  }
  return i;
}

function parseString(text, i) {
  const quote = text[i];
  if (quote !== '"' && quote !== "'" && quote !== '`') return null;
  const start = i;
  i++;
  let out = '';
  while (i < text.length) {
    const c = text[i];
    if (c === '\\') {
      const n = text[i + 1];
      const map = { n: '\n', t: '\t', r: '\r', b: '\b', f: '\f', v: '\v', 0: '\0', '\\': '\\', '"': '"', "'": "'", '`': '`' };
      if (n === 'u') {
        if (text[i + 2] === '{') {
          const close = text.indexOf('}', i + 3);
          out += String.fromCodePoint(parseInt(text.slice(i + 3, close), 16));
          i = close + 1;
          continue;
        }
        out += String.fromCharCode(parseInt(text.slice(i + 2, i + 6), 16));
        i += 6;
        continue;
      }
      out += map[n] ?? n;
      i += 2;
      continue;
    }
    if (c === quote) return { value: out, next: i + 1, raw: text.slice(start, i + 1) };
    out += c;
    i++;
  }
  return null;
}

function parseIdentifier(text, i) {
  const m = /^[A-Za-z_$][\w$]*/.exec(text.slice(i));
  return m ? { value: m[0], next: i + m[0].length } : null;
}

/** 解析 { key: "value", "k.ey": `value`, ...spread, ... }；返回 map（字符串值）+ 展开变量名。 */
export function parseStringMap(text, i) {
  i = skipWs(text, i);
  if (text[i] !== '{') return { error: 'expect { at ' + i };
  i++;
  const map = {};
  const bad = [];
  const spreads = [];
  for (;;) {
    i = skipWs(text, i);
    if (text[i] === '}') return { map, bad, spreads, next: i + 1 };
    if (text[i] === '.' && text[i + 1] === '.' && text[i + 2] === '.') {
      i = skipWs(text, i + 3);
      const r = parseIdentifier(text, i);
      if (!r) return { error: 'bad spread at ' + i };
      spreads.push(r.value);
      i = r.next;
      i = skipWs(text, i);
      if (text[i] === ',') { i++; continue; }
      if (text[i] === '}') return { map, bad, spreads, next: i + 1 };
      return { error: 'expect , after spread at ' + i };
    }
    let key;
    if (text[i] === '"' || text[i] === "'") {
      const r = parseString(text, i); if (!r) return { error: 'bad key at ' + i };
      key = r.value; i = r.next;
    } else {
      const r = parseIdentifier(text, i); if (!r) return { error: 'bad key at ' + i };
      key = r.value; i = r.next;
    }
    i = skipWs(text, i);
    if (text[i] !== ':') return { error: 'expect : after key ' + key + ' at ' + i };
    i = skipWs(text, i + 1);
    let value;
    if (text[i] === '"' || text[i] === "'" || text[i] === '`') {
      const r = parseString(text, i); if (!r) return { error: 'bad value for ' + key + ' at ' + i };
      value = r.value; i = r.next;
    } else {
      // 非字符串值：跳过（记 bad），支持简单嵌套对象/数组跳过
      const start = i;
      let depth = 0;
      while (i < text.length) {
        const c = text[i];
        if (c === '"' || c === "'" || c === '`') { const r = parseString(text, i); if (!r) return { error: 'bad string at ' + i }; i = r.next; continue; }
        if (c === '{' || c === '[' || c === '(') depth++;
        else if (c === '}' || c === ']' || c === ')') { if (depth === 0) break; depth--; }
        else if (c === ',' && depth === 0) break;
        i++;
      }
      bad.push(key + '=' + text.slice(start, i).trim().slice(0, 40));
      value = undefined;
    }
    if (value !== undefined) map[key] = value;
    i = skipWs(text, i);
    if (text[i] === ',') { i++; continue; }
    if (text[i] === '}') return { map, bad, spreads, next: i + 1 };
    return { error: 'expect , or } at ' + i + ' near ' + JSON.stringify(text.slice(i, i + 40)) };
  }
}

/** 从一段文本里提取 const/let/var 名字 = {字符串映射}；支持 ...spread 递归合并。 */
export function extractDictVars(text) {
  const raw = {};
  const re = /(?:const|let|var)\s+([A-Za-z_$][\w$]*)\s*=\s*\{/g;
  let m;
  while ((m = re.exec(text)) !== null) {
    const name = m[1];
    const start = m.index + m[0].length - 1;
    const r = parseStringMap(text, start);
    if (r.map && (Object.keys(r.map).length > 0 || (r.spreads ?? []).length > 0)) raw[name] = { map: r.map, spreads: r.spreads ?? [], bad: r.bad ?? [] };
  }
  const out = {};
  const resolving = new Set();
  const resolve = (name) => {
    if (out[name]) return out[name];
    if (!raw[name]) return undefined;
    if (resolving.has(name)) return undefined;
    resolving.add(name);
    const merged = {};
    for (const s of raw[name].spreads) {
      const r = resolve(s);
      if (r) Object.assign(merged, r.map);
    }
    Object.assign(merged, raw[name].map);
    resolving.delete(name);
    out[name] = { map: merged, bad: raw[name].bad };
    return out[name];
  };
  for (const name of Object.keys(raw)) resolve(name);
  return out;
}

/** 解析 namespace 标识符：字符串字面量或变量（从 const 定义里找同名字符串）。 */
function resolveNs(text, i) {
  i = skipWs(text, i);
  if (text[i] === '"' || text[i] === "'") {
    const r = parseString(text, i);
    return r ? { ns: r.value, next: r.next } : null;
  }
  const r = parseIdentifier(text, i);
  if (!r) return null;
  const re = new RegExp("(?:const|let|var)\\s+" + r.value.replace(/\$/g, "\\$") + "\\s*=\\s*([\"'])");
  const m = re.exec(text);
  if (!m) return { ns: r.value, next: r.next, unresolvedVar: true };
  const s = parseString(text, m.index + m[0].length - 1);
  return s ? { ns: s.value, next: r.next } : { ns: r.value, next: r.next, unresolvedVar: true };
}

/** 三参调用/数组形态：从 `[["zh", {...}], ["en", {...}]]` 里取某个语言的字典。 */
function inlinePairDict(text, localeId) {
  const re = new RegExp("\\[\\s*[\"']" + localeId + "[\"']\\s*,\\s*\\{", 'g');
  let m;
  while ((m = re.exec(text)) !== null) {
    const brace = text.indexOf('{', m.index);
    const r = parseStringMap(text, brace);
    if (r.map && Object.keys(r.map).length > 0) return r.map;
  }
  return undefined;
}

/** 解析 locale.register 的第二个参数：{ zh, en } 或 { zh: zh$1, en: en$1 }。 */
function parseLocalePair(text, i) {
  i = skipWs(text, i);
  if (text[i] !== '{') return null;
  i++;
  const pair = {};
  for (;;) {
    i = skipWs(text, i);
    if (text[i] === '}') return { pair, next: i + 1 };
    const key = parseIdentifier(text, i);
    if (!key) return null;
    i = skipWs(text, key.next);
    if (text[i] === ':') {
      i = skipWs(text, i + 1);
      const val = parseIdentifier(text, i);
      if (!val) return null;
      pair[key.value] = val.value;
      i = val.next;
    } else {
      pair[key.value] = key.value; // shorthand { zh, en }
    }
    i = skipWs(text, i);
    if (text[i] === ',') { i++; continue; }
    if (text[i] === '}') return { pair, next: i + 1 };
    return null;
  }
}

/**
 * 从一个 client bundle 文本提取 locale 注册表。
 * @returns {{regs: Array<{ns:string, en?:string, zh?:string}>, dicts: Record<string,{map:object,bad:string[]}>}}
 */
export function extractLocaleRegistrations(text) {
  const dicts = extractDictVars(text);
  const regs = [];
  const re = /locale\.register\(/g;
  let m;
  while ((m = re.exec(text)) !== null) {
    let i = m.index + m[0].length;
    const nsr = resolveNs(text, i);
    if (!nsr) continue;
    i = nsr.next;
    i = skipWs(text, i);
    if (text[i] !== ',') continue;
    const pr = parseLocalePair(text, i + 1);
    if (!pr) {
      // 可能是三参 API：register(NS, locale, dict)，字典来自本地 [["zh", {...}], ["en", {...}]] 数组
      const enInline = inlinePairDict(text, 'en');
      const zhInline = inlinePairDict(text, 'zh');
      if (enInline || zhInline) regs.push({ ns: nsr.ns, enInline, zhInline });
      else regs.push({ ns: nsr.ns, bad: 'pair-parse-failed' });
      continue;
    }
    regs.push({ ns: nsr.ns, zh: pr.pair.zh, en: pr.pair.en, unresolvedNsVar: nsr.unresolvedVar === true });
  }
  return { regs, dicts };
}

/** 遍历宿主所有 web client bundle：返回 namespace → en 字典。 */
export function extractHostEn(asarPath, allPaths) {
  const PKG = 'dsh/node_modules/@deepseek-ai/';
  const hosts = {
    namespaces: {},
    packages: [],
    unresolved: [],
  };
  const seen = new Set();
  for (const p of allPaths) {
    if (!p.startsWith(PKG)) continue;
    if (!/\/lib\/(client|client\.browser)\.js$/.test(p)) continue;
    if (!/\/@deepseek-ai\/dsh-/.test(p)) continue;
    const pkg = p.split('/')[3];
    const r = asarEntry(asarPath, p);
    if (!r.data) continue;
    const text = r.data.toString('utf8');
    if (!text.includes('locale.register(')) continue;
    const { regs, dicts } = extractLocaleRegistrations(text);
    for (const reg of regs) {
      const enName = reg.en;
      const dict = reg.enInline ? { map: reg.enInline, bad: [] } : (enName !== undefined ? dicts[enName] : undefined);
      if (!dict) {
        hosts.unresolved.push({ package: pkg, path: p, ns: reg.ns, enVar: enName, reason: reg.bad ?? 'en dict not found in same bundle' });
        continue;
      }
      if (!hosts.namespaces[reg.ns]) {
        hosts.namespaces[reg.ns] = { dict: dict.map, package: pkg, path: p, dictVar: enName, bad: dict.bad ?? [] };
      } else if (!seen.has(reg.ns)) {
        hosts.namespaces[reg.ns].duplicate = true;
      }
      seen.add(reg.ns);
    }
    hosts.packages.push({ package: pkg, path: p, regs: regs.length, dicts: Object.keys(dicts).length });
  }
  return hosts;
}

/** 读取插件 locale/es-419/*.json（排除 packageMeta.json）→ namespace → dict。 */
export function extractPluginDicts(localeDir, { includeMeta = false } = {}) {
  const dicts = {};
  for (const f of fs.readdirSync(localeDir).filter((x) => x.endsWith('.json')).sort()) {
    if (!includeMeta && f === 'packageMeta.json') continue;
    dicts[f.replace(/\.json$/, '')] = JSON.parse(fs.readFileSync(localeDir + '/' + f, 'utf8'));
  }
  return dicts;
}

/** 提取 {placeholder} / {0} 等插值 token。 */
export function placeholders(value) {
  return [...new Set([...String(value).matchAll(/\{([A-Za-z0-9_.\-\s]+)\}/g)].map((m) => m[1]))].sort();
}
