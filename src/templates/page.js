// Plain content pages (poster style): work for hire, about, and the 404 page.

import { site } from '../site.config.js';
import { esc } from '../lib/html.js';
import { renderPage } from './layout.js';

export function renderContentPage(page, urlPath) {
  const main = `    <header class="page-head">
      <p class="eyebrow">${esc(page.eyebrow || site.name)}</p>
      <h1>${esc(page.title)}</h1>
    </header>
    <section class="page-body">
${page.bodyHtml}
    </section>`;
  return renderPage({
    title: `${page.title}: ${site.name}`,
    description: page.summary,
    path: urlPath,
    style: 'poster',
    current: urlPath,
    main
  });
}

export function renderNotFound() {
  const main = `    <header class="page-head">
      <p class="eyebrow">404</p>
      <h1>This page does not exist</h1>
    </header>
    <section class="page-body">
      <p>It may have moved when the site was rebuilt.</p>
      <p><a href="/">Home</a> · <a href="/games/">Games</a> · <a href="/learn/">Writing</a></p>
    </section>`;
  return renderPage({
    title: `Page not found: ${site.name}`,
    description: 'This page does not exist.',
    path: '/404.html',
    style: 'poster',
    noindex: true,
    main
  });
}
