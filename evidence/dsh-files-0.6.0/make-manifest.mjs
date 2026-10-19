// Build raw/manifest.txt: sha256 of every evidence file under raw/ (excluding
// the manifest itself). Uses node:fs so names that Win32 resolves as devices
// (NUL.doc, CON.txt, COM1, "report.txt.") are still hashed — PowerShell's
// Get-FileHash cannot open those, which is itself part of the finding.
//
// Run (from the review work dir):
//   node probes/make-manifest.mjs

import { readdir, stat, readFile, writeFile } from 'node:fs/promises'
import { createHash } from 'node:crypto'
import { join, relative, resolve, sep } from 'node:path'

const root = resolve(process.cwd())
const rawDir = join(root, 'raw')

async function walk(dir) {
  const out = []
  for (const name of await readdir(dir)) {
    const p = join(dir, name)
    const st = await stat(p)
    if (st.isDirectory()) out.push(...await walk(p))
    else out.push(p)
  }
  return out
}

const files = (await walk(rawDir))
  .filter((p) => relative(rawDir, p) !== 'manifest.txt')
  .sort()

const lines = [
  '# Raw evidence index (sha256 of every file under raw/, excluding this manifest)',
  'generated_at = ' + new Date().toISOString(),
  'plugin = dsh-files 0.6.0 (snapshot: D:\\natnat\\lingshu\\dsh-files-main)',
  'generator = node probes/make-manifest.mjs',
  ''
]
for (const p of files) {
  const rel = relative(root, p).split(sep).join('/')
  const buf = await readFile(p)
  const sha = createHash('sha256').update(buf).digest('hex')
  lines.push(`${rel}  ${String(buf.length).padStart(9)}  ${sha}`)
}
await writeFile(join(rawDir, 'manifest.txt'), lines.join('\n') + '\n', 'utf8')
console.log(`wrote ${files.length} entries`)
