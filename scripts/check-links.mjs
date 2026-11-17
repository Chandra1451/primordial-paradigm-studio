// =============================================================================
// Link checker for dist/: every internal link and asset must resolve to a built file,
// and external links must be on the allowlist (the studio's own profiles).
// Run after a build: node scripts/check-links.mjs
// =============================================================================

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { site } from '../src/site.config.js';

const CODE_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(CODE_ROOT, 'dist');

// External destinations the site may link to. Anything else fails, so a stray
// third-party link or tracker cannot slip in unnoticed.
const ALLOWED_EXTERNAL = new Set([
  ...site.social.map((s) => s.url),
  'https://schema.org'
]);

console.log('--- Link checker ---');
if (!fs.existsSync(DIST)) { console.error('FAIL: dist/ not found. Run the build first.'); process.exit(1); }

const htmlFiles = [];
(function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walk(full);
    else if (e.name.endsWith('.html')) htmlFiles.push(full);
  }
})(DIST);

function resolves(urlPath) {
  const clean = decodeURIComponent(urlPath.split(/[?#]/)[0]);
  const target = path.join(DIST, clean);
  if (!target.startsWith(DIST)) return false;
  if (clean.endsWith('/')) return fs.existsSync(path.join(target, 'index.html'));
  return fs.existsSync(target) && fs.statSync(target).isFile();
}

const problems = [];
let checked = 0;
for (const file of htmlFiles) {
  const html = fs.readFileSync(file, 'utf8');
  const rel = path.relative(DIST, file);
  for (const m of html.matchAll(/\s(?:href|src)="([^"]+)"/g)) {
    const url = m[1].replace(/&amp;/g, '&');
    checked++;
    if (url.startsWith('mailto:') || url.startsWith('#')) continue;
    if (url.startsWith('/')) {
      if (!resolves(url)) problems.push(`${rel}: broken internal link ${url}`);
    } else if (/^https?:\/\//.test(url)) {
      if (url.startsWith(site.url + '/')) {
        if (!resolves(url.slice(site.url.length))) problems.push(`${rel}: broken link ${url}`);
      } else if (!ALLOWED_EXTERNAL.has(url)) {
        problems.push(`${rel}: external link not on the allowlist ${url}`);
      }
    } else {
      problems.push(`${rel}: relative link ${url} (use a path starting with /)`);
    }
  }
}

if (problems.length) {
  console.error(`Status: FAIL. ${problems.length} problem(s) in ${checked} links:`);
  for (const p of problems) console.error(`  - ${p}`);
  process.exit(1);
}
console.log(`Status: PASS. ${checked} links in ${htmlFiles.length} pages resolve or are allowed.`);
