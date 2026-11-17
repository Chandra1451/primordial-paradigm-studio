// Writing (essay style): index and single essay.

import { site } from '../site.config.js';
import { esc } from '../lib/html.js';
import { renderPage } from './layout.js';
import { dateTag } from './parts.js';

export function renderWritingIndex(essays, emptyText) {
  const list = essays.length
    ? `<ol class="essay-list">
        ${essays.map((e) => `<li>
          <p class="kicker">${dateTag(e.date)}</p>
          <h2><a href="/learn/${esc(e.slug)}/">${esc(e.title)}</a></h2>
          <p>${esc(e.summary)}</p>
        </li>`).join('\n        ')}
      </ol>`
    : `<p class="standfirst">${esc(emptyText)}</p>`;
  const main = `    <div class="essay">
      <header class="essay-head">
        <p class="kicker">${esc(site.name)}</p>
        <h1>Writing</h1>
      </header>
      ${list}
    </div>`;
  return renderPage({
    title: `Writing: ${site.name}`,
    description: `Essays from ${site.name}.`,
    path: '/learn/',
    style: 'essay',
    current: '/learn/',
    main
  });
}

// The first letter of the first paragraph becomes the cell-grid opening letter.
function withOpening(bodyHtml) {
  return bodyHtml.replace(/^<p>([A-Za-z])/, '<p class="opening"><span class="initial">$1</span>');
}

export function renderEssay(essay) {
  const main = `    <div class="progress" aria-hidden="true"><div class="progress-fill" id="progress"></div></div>
    <div class="essay">
      <header class="essay-head">
        <p class="kicker">Writing · ${dateTag(essay.date)}</p>
        <h1>${esc(essay.title)}</h1>
        <p class="standfirst">${esc(essay.summary)}</p>
      </header>
      <article class="essay-body">
${withOpening(essay.bodyHtml)}
      </article>
      <footer class="essay-foot">
        <p>Questions or comments: <a href="mailto:${esc(site.email)}">${esc(site.email)}</a></p>
        <p><a href="/learn/">All writing</a></p>
      </footer>
    </div>`;
  return renderPage({
    title: `${essay.title}: ${site.name}`,
    description: essay.summary,
    path: `/learn/${essay.slug}/`,
    style: 'essay',
    current: '/learn/',
    ogType: 'article',
    main,
    scripts: ['reading-progress'],
    jsonLd: [{
      '@context': 'https://schema.org', '@type': 'Article', headline: essay.title, description: essay.summary,
      datePublished: essay.date, author: { '@type': 'Organization', name: site.name, url: site.url },
      publisher: { '@type': 'Organization', name: site.name, url: site.url }
    }]
  });
}
