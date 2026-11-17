// The frame every page shares: head, menu bar, footer.
// No inline scripts or style attributes, so the site can run under a strict
// Content-Security-Policy (see public/.htaccess).

import { site } from '../site.config.js';
import { esc, jsonForScript } from '../lib/html.js';

// Asset URLs carry a content fingerprint (?v=...) set by the build, so browsers fetch a
// changed file after a deploy instead of using a stale cached copy.
let versions = {};
export function setAssetVersions(map) { versions = map; }
export function asset(urlPath) {
  const v = versions[urlPath];
  if (!v) throw new Error(`Unknown asset ${urlPath}: is it in src/assets/?`);
  return `${urlPath}?v=${v}`;
}

function bar(current, isHome) {
  const left = isHome
    ? `<p class="bar-name">${esc(site.tagline)}</p>`
    : `<a class="bar-name" href="/">${esc(site.name)}</a>`;
  const links = site.nav.map((item) => {
    const here = current === item.href ? ' aria-current="page"' : '';
    return `<a href="${esc(item.href)}"${here}>${esc(item.label)}</a>`;
  }).join('\n      ');
  return `<header class="bar">
    ${left}
    <nav aria-label="Main">
      ${links}
    </nav>
  </header>`;
}

function footer() {
  const year = new Date().getFullYear();
  const social = site.social
    .map((s) => `<li><a href="${esc(s.url)}" rel="me">${esc(s.name)}</a></li>`)
    .join('');
  const nav = site.nav.map((item) => `<li><a href="${esc(item.href)}">${esc(item.label)}</a></li>`).join('');
  return `<footer class="foot">
    <div class="foot-col">
      <p class="foot-name">${esc(site.name)}</p>
      <p>${esc(site.tagline)}.</p>
    </div>
    <nav class="foot-col" aria-label="Footer">
      <ul>${nav}</ul>
    </nav>
    <div class="foot-col">
      <p><a href="mailto:${esc(site.email)}">${esc(site.email)}</a></p>
      <ul>${social}</ul>
    </div>
    <p class="foot-copy">© ${year} ${esc(site.name)}</p>
  </footer>`;
}

/**
 * @param {object} page
 * @param {string} page.title        full <title>
 * @param {string} page.description  meta description (one or two plain sentences)
 * @param {string} page.path         canonical path, e.g. "/games/"
 * @param {string} page.style        page stylesheet name in assets/css (poster, notebook, essay)
 * @param {string} page.main         inner HTML of <main>
 * @param {string} [page.current]    nav href to mark as the current section
 * @param {string[]} [page.scripts]  script names in assets/js
 * @param {object[]} [page.jsonLd]   structured data objects
 * @param {boolean} [page.noindex]
 * @param {string} [page.ogType]
 */
export function renderPage(page) {
  const isHome = page.path === '/';
  const canonical = site.url + page.path;
  const scripts = (page.scripts || [])
    .map((name) => `<script src="${asset(`/assets/js/${name}.js`)}" defer></script>`)
    .join('\n  ');
  const jsonLd = (page.jsonLd || [])
    .map((d) => `<script type="application/ld+json">${jsonForScript(d)}</script>`)
    .join('\n  ');

  return `<!doctype html>
<html lang="${site.locale}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(page.title)}</title>
  <meta name="description" content="${esc(page.description)}">
  ${page.noindex ? '<meta name="robots" content="noindex">' : `<link rel="canonical" href="${esc(canonical)}">`}
  <meta property="og:title" content="${esc(page.title)}">
  <meta property="og:description" content="${esc(page.description)}">
  <meta property="og:type" content="${esc(page.ogType || 'website')}">
  <meta property="og:url" content="${esc(canonical)}">
  <meta property="og:site_name" content="${esc(site.name)}">
  <meta name="theme-color" content="#ece3d4">
  <link rel="icon" href="/favicon.svg" type="image/svg+xml">
  <link rel="preload" href="/assets/fonts/tektur-latin-900-normal.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="/assets/fonts/figtree-latin-400-normal.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="stylesheet" href="${asset('/assets/css/site.css')}">
  <link rel="stylesheet" href="${asset(`/assets/css/${page.style}.css`)}">
  ${jsonLd}
</head>
<body class="page-${esc(page.style)}">
  <a class="skip" href="#main">Skip to content</a>
  ${bar(page.current || '', isHome)}
  <main id="main">
${page.main}
  </main>
  ${footer()}
  ${scripts}
</body>
</html>
`;
}
