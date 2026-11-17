// =============================================================================
// Primordial Paradigm: static site build.
// Reads Markdown content from src/content/, renders it with the templates in
// src/templates/, and writes a complete static site to dist/.
//
//   node scripts/build.mjs             production build
//   node scripts/build.mjs --fixtures  adds test fixtures (never deploy: deploy.mjs refuses it)
// =============================================================================

import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

import { site } from '../src/site.config.js';
import { loadFile, loadFolder } from '../src/lib/content.js';
import { setAssetVersions } from '../src/templates/layout.js';
import { renderHome } from '../src/templates/home.js';
import { renderGamesIndex, renderGamePage } from '../src/templates/games.js';
import { renderJournalIndex, renderJournalEntry } from '../src/templates/journal.js';
import { renderWritingIndex, renderEssay } from '../src/templates/writing.js';
import { renderContentPage, renderNotFound } from '../src/templates/page.js';

const CODE_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.join(CODE_ROOT, 'src');
const CONTENT = path.join(SRC, 'content');
const DIST = path.join(CODE_ROOT, 'dist');
const PUBLIC = path.join(CODE_ROOT, 'public');
const FIXTURES = process.argv.includes('--fixtures');

console.log(`=== Primordial Paradigm build${FIXTURES ? ' (with test fixtures: do not deploy)' : ''} ===`);

fs.rmSync(DIST, { recursive: true, force: true });
fs.mkdirSync(DIST, { recursive: true });

// 1. Assets: copied as they are; CSS and JS get a content fingerprint for cache busting.
fs.cpSync(path.join(SRC, 'assets'), path.join(DIST, 'assets'), { recursive: true });
const versions = {};
for (const kind of ['css', 'js']) {
  for (const file of fs.readdirSync(path.join(SRC, 'assets', kind))) {
    const body = fs.readFileSync(path.join(SRC, 'assets', kind, file));
    versions[`/assets/${kind}/${file}`] = crypto.createHash('sha256').update(body).digest('hex').slice(0, 10);
  }
}
setAssetVersions(versions);

// 2. Content.
const reviewLog = [];
const track = (item) => { reviewLog.push({ file: path.relative(CODE_ROOT, item.file), review: item.review }); return item; };

const home = track(loadFile(path.join(CONTENT, 'pages', 'home.md'), ['description', 'gamesLead', 'writingText', 'workText', 'writingEmpty']));

const gamesDir = path.join(CONTENT, 'games');
const games = fs.readdirSync(gamesDir, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => {
    const game = track(loadFile(path.join(gamesDir, d.name, 'index.md'), ['status', 'summary']));
    game.slug = d.name;
    game.entries = loadFolder(path.join(gamesDir, d.name, 'journal'), ['date', 'summary']).map(track);
    return game;
  });
if (!games.length) throw new Error('No games in src/content/games/');

const essays = [
  ...loadFolder(path.join(CONTENT, 'essays'), ['date', 'summary']),
  ...(FIXTURES ? loadFolder(path.join(CODE_ROOT, 'tests', 'fixtures', 'essays'), ['date', 'summary']) : [])
].map(track);

const pages = {
  services: track(loadFile(path.join(CONTENT, 'pages', 'services.md'), ['summary'])),
  about: track(loadFile(path.join(CONTENT, 'pages', 'about.md'), ['summary']))
};

// 3. Pages.
const sitemap = [];
function write(urlPath, html, { inSitemap = true, lastmod } = {}) {
  const file = urlPath.endsWith('.html') ? path.join(DIST, urlPath) : path.join(DIST, urlPath, 'index.html');
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, html, 'utf8');
  if (inSitemap) sitemap.push({ urlPath, lastmod });
  console.log(`  ${urlPath}`);
}

const firstGame = games[0];
write('/', renderHome(home, firstGame, firstGame.entries[0]));
write('/games/', renderGamesIndex(games));
for (const game of games) {
  write(`/games/${game.slug}/`, renderGamePage(game, game.entries), { lastmod: game.entries[0]?.date });
  write(`/games/${game.slug}/journal/`, renderJournalIndex(game, game.entries), { lastmod: game.entries[0]?.date });
  game.entries.forEach((entry, i) => {
    write(`/games/${game.slug}/journal/${entry.slug}/`, renderJournalEntry(game, entry, game.entries[i - 1], game.entries[i + 1]), { lastmod: entry.date });
  });
}
write('/learn/', renderWritingIndex(essays, home.writingEmpty), { lastmod: essays[0]?.date });
for (const essay of essays) write(`/learn/${essay.slug}/`, renderEssay(essay), { lastmod: essay.date });
write('/services/', renderContentPage(pages.services, '/services/'));
write('/about/', renderContentPage(pages.about, '/about/'));
write('/404.html', renderNotFound(), { inSitemap: false });

// 4. Public files (.htaccess, favicon).
for (const file of fs.readdirSync(PUBLIC)) fs.copyFileSync(path.join(PUBLIC, file), path.join(DIST, file));

// 5. robots.txt and sitemap.xml.
fs.writeFileSync(path.join(DIST, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${site.url}/sitemap.xml\n`, 'utf8');
const urls = sitemap.map(({ urlPath, lastmod }) =>
  `  <url>\n    <loc>${site.url}${urlPath}</loc>${lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ''}\n  </url>`).join('\n');
fs.writeFileSync(path.join(DIST, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`, 'utf8');

if (FIXTURES) fs.writeFileSync(path.join(DIST, 'FIXTURE_BUILD'), 'Test build with fixtures. Do not deploy.\n', 'utf8');

const pending = reviewLog.filter((r) => r.review !== 'approved');
console.log(`=== Built ${sitemap.length + 1} pages. Content awaiting owner review: ${pending.length} of ${reviewLog.length} ===`);
for (const p of pending) console.log(`  pending: ${p.file}`);
