// Homepage (poster style): the growing name, then games first, then writing and work for hire.

import { site } from '../site.config.js';
import { esc } from '../lib/html.js';
import { renderPage } from './layout.js';
import { growName } from './parts.js';

export function renderHome(home, game, latestEntry) {
  const entryLink = latestEntry
    ? `<a href="/games/${esc(game.slug)}/journal/${esc(latestEntry.slug)}/">Read the latest journal entry</a>`
    : `<a href="/games/${esc(game.slug)}/journal/">Read the development journal</a>`;

  const main = `    ${growName(['Primordial', 'Paradigm'])}

    <section class="lead" aria-labelledby="lead-games">
      <h2 id="lead-games">Games</h2>
      <p class="lead-text">${esc(home.gamesLead)}</p>
      <p class="lead-links">
        ${entryLink}
        <a href="/games/${esc(game.slug)}/">About ${esc(game.title)}</a>
      </p>
    </section>

    <div class="cols">
      <section aria-labelledby="col-writing">
        <h2 id="col-writing">Writing</h2>
        <p>${esc(home.writingText)}</p>
        <a href="/learn/">Writing</a>
      </section>
      <section aria-labelledby="col-work">
        <h2 id="col-work">Work for hire</h2>
        <p>${esc(home.workText)}</p>
        <a href="/services/">What the studio offers</a>
      </section>
    </div>`;

  return renderPage({
    title: `${site.name}: ${site.tagline}`,
    description: home.description,
    path: '/',
    style: 'poster',
    main,
    scripts: ['grow-name'],
    jsonLd: [
      { '@context': 'https://schema.org', '@type': 'Organization', name: site.name, url: site.url, email: site.email, sameAs: site.social.map((s) => s.url) },
      { '@context': 'https://schema.org', '@type': 'WebSite', name: site.name, url: site.url }
    ]
  });
}
