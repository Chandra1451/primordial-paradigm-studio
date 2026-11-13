// =============================================================================
// Primordial Paradigm Studio - Static Site Compiler
// Pure Node.js ESM static site generator with Markdown article pipeline.
// Zero native DLL binaries; 100% compliant with OS Application Control policies.
// =============================================================================

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { marked } from 'marked';

// Configure marked
marked.setOptions({
  gfm: true,
  breaks: false
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const CODE_ROOT = path.resolve(__dirname, '..');
const DIST_DIR = path.join(CODE_ROOT, 'dist');
const PUBLIC_DIR = path.join(CODE_ROOT, 'public');
const STYLES_DIR = path.join(CODE_ROOT, 'src', 'styles');
const CONTENT_GAMES_DIR = path.join(CODE_ROOT, 'src', 'content', 'games');
const CONTENT_ESSAYS_DIR = path.join(CODE_ROOT, 'src', 'content', 'essays');

// Import utilities and layouts
import { parseFrontmatter, estimateReadingTime } from '../src/utils/frontmatter.js';
import { renderArticleLayout } from '../src/layouts/ArticleLayout.js';
import { renderKinematicsSandbox } from '../src/components/KinematicsSandbox.js';

// Import page renderers
import { renderHomePage } from '../src/pages/index.js';
import { renderGamesPage } from '../src/pages/games.js';
import { renderLearnPage } from '../src/pages/learn.js';
import { renderServicesPage } from '../src/pages/services.js';
import { renderAboutPage } from '../src/pages/about.js';
import { render404Page } from '../src/pages/404.js';
import { renderExplorePage } from '../src/pages/explore.js';

console.log('=== Primordial Paradigm Studio Build ===');

// 1. Clean and initialize dist directory
if (fs.existsSync(DIST_DIR)) {
  fs.rmSync(DIST_DIR, { recursive: true, force: true });
}
fs.mkdirSync(DIST_DIR, { recursive: true });

const sitemapRoutes = [];

// 2. Process Game Devlogs (/games/[slug]/)
const gamesArticles = [];
if (fs.existsSync(CONTENT_GAMES_DIR)) {
  const gameFiles = fs.readdirSync(CONTENT_GAMES_DIR).filter(f => f.endsWith('.md'));
  for (const file of gameFiles) {
    const slug = path.basename(file, '.md');
    const rawContent = fs.readFileSync(path.join(CONTENT_GAMES_DIR, file), 'utf8');
    const { metadata, content } = parseFrontmatter(rawContent);

    const readingTime = estimateReadingTime(content);
    let bodyHtml = marked.parse(content);
    if (content.includes('{{KINEMATICS_SANDBOX}}')) {
      bodyHtml = bodyHtml.replace(/<p>\s*\{\{KINEMATICS_SANDBOX\}\}\s*<\/p>|\{\{KINEMATICS_SANDBOX\}\}/g, renderKinematicsSandbox());
    }
    const canonicalPath = `/games/${slug}/`;

    const articleData = {
      title: metadata.title || slug,
      description: metadata.description || '',
      date: metadata.date || '2026-11-13',
      readingTime,
      tags: metadata.tags || [],
      categoryLabel: metadata.categoryLabel || 'DEVLOG / RESEARCH',
      parentHref: '/games/',
      parentLabel: 'Games Hub',
      canonicalPath,
      bodyHtml,
      url: canonicalPath
    };

    const targetDir = path.join(DIST_DIR, 'games', slug);
    fs.mkdirSync(targetDir, { recursive: true });
    fs.writeFileSync(path.join(targetDir, 'index.html'), renderArticleLayout(articleData), 'utf8');

    gamesArticles.push(articleData);
    sitemapRoutes.push({ route: `games/${slug}`, priority: '0.8' });
    console.log(`  [Devlog] /games/${slug}/ -> dist/games/${slug}/index.html`);
  }
}

// 3. Process Learning Hub Essays (/learn/[slug]/)
const learnArticles = [];
if (fs.existsSync(CONTENT_ESSAYS_DIR)) {
  const essayFiles = fs.readdirSync(CONTENT_ESSAYS_DIR).filter(f => f.endsWith('.md'));
  for (const file of essayFiles) {
    const slug = path.basename(file, '.md');
    const rawContent = fs.readFileSync(path.join(CONTENT_ESSAYS_DIR, file), 'utf8');
    const { metadata, content } = parseFrontmatter(rawContent);

    const readingTime = estimateReadingTime(content);
    const bodyHtml = marked.parse(content);
    const canonicalPath = `/learn/${slug}/`;

    const articleData = {
      title: metadata.title || slug,
      description: metadata.description || '',
      date: metadata.date || '2026-11-13',
      readingTime,
      tags: metadata.tags || [],
      categoryLabel: metadata.categoryLabel || 'SYSTEMS ESSAY',
      parentHref: '/learn/',
      parentLabel: 'Learning Hub',
      canonicalPath,
      bodyHtml,
      url: canonicalPath
    };

    const targetDir = path.join(DIST_DIR, 'learn', slug);
    fs.mkdirSync(targetDir, { recursive: true });
    fs.writeFileSync(path.join(targetDir, 'index.html'), renderArticleLayout(articleData), 'utf8');

    learnArticles.push(articleData);
    sitemapRoutes.push({ route: `learn/${slug}`, priority: '0.9' });
    console.log(`  [Essay] /learn/${slug}/ -> dist/learn/${slug}/index.html`);
  }
}

// 4. Render Core Hub Pages
const corePages = [
  { route: '', html: renderHomePage(), priority: '1.0' },
  { route: 'games', html: renderGamesPage(gamesArticles), priority: '0.9' },
  { route: 'learn', html: renderLearnPage(learnArticles), priority: '0.9' },
  { route: 'services', html: renderServicesPage(), priority: '0.8' },
  { route: 'about', html: renderAboutPage(), priority: '0.7' },
  { route: 'explore', html: renderExplorePage(), priority: '0.5' }
];

for (const page of corePages) {
  const targetDir = page.route ? path.join(DIST_DIR, page.route) : DIST_DIR;
  fs.mkdirSync(targetDir, { recursive: true });
  fs.writeFileSync(path.join(targetDir, 'index.html'), page.html, 'utf8');
  sitemapRoutes.unshift({ route: page.route, priority: page.priority });
  console.log(`  [Page] /${page.route ? page.route + '/' : ''} -> dist/${page.route ? page.route + '/' : ''}index.html`);
}

// 4b. Render 404 Error Page (dist/404.html, unindexed)
fs.writeFileSync(path.join(DIST_DIR, '404.html'), render404Page(), 'utf8');
console.log('  [ErrorPage] /404.html -> dist/404.html');

// 5. Copy styles to dist/styles
const distStylesDir = path.join(DIST_DIR, 'styles');
fs.mkdirSync(distStylesDir, { recursive: true });
const styleFiles = fs.readdirSync(STYLES_DIR);
for (const file of styleFiles) {
  fs.copyFileSync(path.join(STYLES_DIR, file), path.join(distStylesDir, file));
  console.log(`  [Style] src/styles/${file} -> dist/styles/${file}`);
}

// 6. Copy public directory assets
if (fs.existsSync(PUBLIC_DIR)) {
  const publicFiles = fs.readdirSync(PUBLIC_DIR);
  for (const file of publicFiles) {
    fs.copyFileSync(path.join(PUBLIC_DIR, file), path.join(DIST_DIR, file));
    console.log(`  [Asset] public/${file} -> dist/${file}`);
  }
}

// 7. Generate robots.txt
const robotsTxt = `# Primordial Paradigm Studio - robots.txt
User-agent: *
Allow: /

Sitemap: https://primordialparadigm.com/sitemap.xml
`;
fs.writeFileSync(path.join(DIST_DIR, 'robots.txt'), robotsTxt, 'utf8');
console.log('  [SEO] robots.txt generated');

// 8. Generate sitemap.xml
const lastMod = new Date().toISOString().split('T')[0];
const sitemapUrls = sitemapRoutes.map(p => {
  const loc = `https://primordialparadigm.com/${p.route ? p.route + '/' : ''}`;
  return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${p.priority}</priority>
  </url>`;
}).join('\n');

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls}
</urlset>
`;
fs.writeFileSync(path.join(DIST_DIR, 'sitemap.xml'), sitemapXml, 'utf8');
console.log('  [SEO] sitemap.xml generated');

console.log('=== Build Complete: All static assets written to dist/ ===');
