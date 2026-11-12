// =============================================================================
// Primordial Paradigm Studio - Learn Page Module
// =============================================================================

import { renderBaseLayout } from '../layouts/BaseLayout.js';

export function renderLearnPage(articles = []) {
  const articlesHtml = articles.length > 0 ? `
    <div class="articles-section">
      <h2 class="sub-heading">Featured Systems Essays</h2>
      <div class="pillars-grid">
        ${articles.map(a => `
          <article class="pillar-card">
            <div class="card-spark" style="background: var(--accent-cyan);"></div>
            <span class="card-tag">${a.categoryLabel || 'SYSTEMS ESSAY'} &bull; ${a.date}</span>
            <h3 class="card-title">${a.title}</h3>
            <p class="card-desc">${a.description}</p>
            <a href="${a.url}" class="card-link">Read Deep-Dive (${a.readingTime}) &rarr;</a>
          </article>
        `).join('')}
      </div>
    </div>
  ` : '';

  const content = `
    <div class="container page-content">
      <div class="page-header">
        <span class="mono-label">DIVISION / RESEARCH & LEARNING</span>
        <h1>Systems Architecture & Essays</h1>
        <p class="lead">
          High-value, deep-dive technical essays exploring the intersection of creative engineering, data architecture, and game systems.
        </p>
      </div>

      <div class="status-card" style="margin-bottom: 3.5rem;">
        <div class="status-indicator">
          <span class="pulse-dot" style="background-color: var(--accent-cyan); box-shadow: 0 0 10px var(--accent-cyan);"></span>
          <span class="status-title">VALUABLE CONTENT FRAMEWORK</span>
        </div>
        <p class="status-body">
          Technical publications adhere strictly to first-principles systems analysis: exhaustive depth, structured architecture diagrams, and reproducible insights.
        </p>
      </div>

      ${articlesHtml}
    </div>
  `.trim();

  return renderBaseLayout({
    title: 'Learning Hub & Systems Essays — Primordial Paradigm',
    description: 'Deep-dive technical essays on systems architecture, data visualization, and game mechanics.',
    canonicalPath: '/learn/',
    content
  });
}
