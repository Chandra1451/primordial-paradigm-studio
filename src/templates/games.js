// Games index and a single game's page (poster style).

import { site } from '../site.config.js';
import { esc } from '../lib/html.js';
import { renderPage } from './layout.js';
import { growName, dateTag } from './parts.js';

export function renderGamesIndex(games) {
  const items = games.map((g) => `<li>
          <h2><a href="/games/${esc(g.slug)}/">${esc(g.title)}</a></h2>
          <p class="status">${esc(g.status)}</p>
          <p>${esc(g.summary)}</p>
        </li>`).join('\n        ');
  const main = `    <header class="page-head">
      <p class="eyebrow">Games</p>
      <h1>Games</h1>
    </header>
    <section class="page-body">
      <ul class="game-list">
        ${items}
      </ul>
    </section>`;
  return renderPage({
    title: `Games: ${site.name}`,
    description: `Games from ${site.name}. ${games.map((g) => `${g.title}: ${g.summary}`).join(' ')}`,
    path: '/games/',
    style: 'poster',
    current: '/games/',
    main
  });
}

export function renderGamePage(game, entries) {
  const words = game.title.split(/\s+/);
  const list = entries.length
    ? `<ol class="entry-list">
          ${entries.map((e) => `<li>${dateTag(e.date)} <a href="/games/${esc(game.slug)}/journal/${esc(e.slug)}/">${esc(e.title)}</a></li>`).join('\n          ')}
        </ol>`
    : '<p>No entries yet.</p>';
  const main = `    ${growName(words)}
    <section class="page-body game-body" aria-label="${esc(game.title)}">
      <p class="status"><span class="eyebrow">Status</span> ${esc(game.status)}</p>
      ${game.bodyHtml}
    </section>
    <section class="page-body game-journal" aria-labelledby="journal-head">
      <h2 id="journal-head">Development journal</h2>
      ${list}
      <p><a href="/games/${esc(game.slug)}/journal/">The whole journal</a></p>
    </section>`;
  return renderPage({
    title: `${game.title}: ${site.name}`,
    description: game.summary,
    path: `/games/${game.slug}/`,
    style: 'poster',
    current: '/games/',
    main,
    scripts: ['grow-name']
  });
}
