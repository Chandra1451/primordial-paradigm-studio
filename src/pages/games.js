// =============================================================================
// Primordial Paradigm Studio - Games Page Module
// =============================================================================

import { renderBaseLayout } from '../layouts/BaseLayout.js';

export function renderGamesPage(articles = []) {
  const articlesHtml = articles.length > 0 ? `
    <div class="articles-section">
      <h2 class="sub-heading">R&D Devlogs & Technical Post-Mortems</h2>
      <div class="pillars-grid">
        ${articles.map(a => `
          <article class="pillar-card">
            <div class="card-meta-line">
              <span class="card-tag">${a.categoryLabel || 'DEVLOG'}</span>
              <span class="card-sep">//</span>
              <span class="card-date">${a.date}</span>
            </div>
            <h3 class="card-title">${a.title}</h3>
            <p class="card-desc">${a.description}</p>
            <a href="${a.url}" class="card-link">Read Devlog (${a.readingTime}) &rarr;</a>
          </article>
        `).join('')}
      </div>
    </div>
  ` : '';

  const content = `
    <div class="container page-content">
      <div class="page-header">
        <span class="mono-label">DIVISION // GAMES</span>
        <h1>Interactive Systems & Worlds</h1>
        <p class="lead">
          We build systems-driven video games rooted in distinctive art direction and emergent gameplay mechanics.
        </p>
      </div>

      <div class="status-card" style="margin-bottom: 3.5rem;">
        <div class="status-indicator">
          <span class="status-kicker">[RESEARCH REGISTER]</span>
          <span class="status-sep">//</span>
          <span class="status-title">ACTIVE R&D</span>
        </div>
        <p class="status-body">
          The studio is actively exploring mechanics for our inaugural game projects. Early devlogs, architectural post-mortems, and playable prototypes are published directly below.
        </p>
      </div>

      ${articlesHtml}
    </div>
  `.trim();

  return renderBaseLayout({
    title: 'Games & Interactive Systems — Primordial Paradigm',
    description: 'Original video games, experimental physics prototypes, and interactive systems by Primordial Paradigm.',
    canonicalPath: '/games/',
    content
  });
}
