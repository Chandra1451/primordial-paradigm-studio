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
            <div class="card-spark" style="background: var(--accent-amber);"></div>
            <span class="card-tag">${a.categoryLabel || 'DEVLOG'} &bull; ${a.date}</span>
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
        <span class="mono-label">DIVISION / GAMES</span>
        <h1>Interactive Systems & Worlds</h1>
        <p class="lead">
          We build systems-driven video games rooted in distinctive art direction and emergent gameplay mechanics.
        </p>
      </div>

      <div class="status-card" style="margin-bottom: 3.5rem;">
        <div class="status-indicator">
          <span class="pulse-dot"></span>
          <span class="status-title">ACTIVE R&D IN PROGRESS</span>
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
    description: 'Independent video games and interactive systems exploring emergent play mechanics and atmospheric worldbuilding.',
    canonicalPath: '/games/',
    content
  });
}
