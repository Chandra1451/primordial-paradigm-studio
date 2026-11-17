// Development journal (notebook style): index and single entry.

import { site } from '../site.config.js';
import { esc } from '../lib/html.js';
import { renderPage } from './layout.js';
import { dateTag, flickSketch } from './parts.js';

export function renderJournalIndex(game, entries) {
  const base = `/games/${game.slug}/journal/`;
  const items = entries.map((e) => `<article class="entry">
        <p class="margin">${dateTag(e.date)}</p>
        <div>
          <h2><a href="${esc(base + e.slug)}/">${esc(e.title)}</a></h2>
          <p>${esc(e.summary)}</p>
        </div>
      </article>`).join('\n      ');
  const main = `    <div class="leaf">
      <section class="opening">
        <h1>${esc(game.title)}: <span class="mark">development journal</span></h1>
        ${flickSketch('A sketch: push, glide, stop.')}
      </section>
      <section class="entries" aria-label="Entries, newest first">
      ${items || '<p>No entries yet.</p>'}
      </section>
      <p class="leaf-foot"><a href="/games/${esc(game.slug)}/">About ${esc(game.title)}</a></p>
    </div>`;
  return renderPage({
    title: `${game.title} development journal: ${site.name}`,
    description: `The development journal for ${game.title}. ${game.summary}`,
    path: base,
    style: 'notebook',
    current: '/games/',
    main,
    scripts: ['sketch-flick']
  });
}

export function renderJournalEntry(game, entry, newer, older) {
  const base = `/games/${game.slug}/journal/`;
  const step = (e, label) => (e ? `<a href="${esc(base + e.slug)}/" rel="${label === 'Newer' ? 'next' : 'prev'}">${label}: ${esc(e.title)}</a>` : '');
  const main = `    <div class="leaf">
      <article class="journal-entry">
        <header>
          <p class="margin">${esc(game.title)} · ${dateTag(entry.date)}</p>
          <h1>${esc(entry.title)}</h1>
        </header>
        <div class="entry-body">
${entry.bodyHtml}
        </div>
      </article>
      <nav class="steps" aria-label="More entries">
        ${step(older, 'Older')}
        ${step(newer, 'Newer')}
        <a href="${esc(base)}">All entries</a>
      </nav>
    </div>`;
  return renderPage({
    title: `${entry.title}: ${game.title} journal`,
    description: entry.summary,
    path: `${base}${entry.slug}/`,
    style: 'notebook',
    current: '/games/',
    ogType: 'article',
    main,
    jsonLd: [{
      '@context': 'https://schema.org', '@type': 'Article', headline: entry.title, description: entry.summary,
      datePublished: entry.date, author: { '@type': 'Organization', name: site.name, url: site.url },
      publisher: { '@type': 'Organization', name: site.name, url: site.url }, isPartOf: `${site.url}${base}`
    }]
  });
}
