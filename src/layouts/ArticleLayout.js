// =============================================================================
// Primordial Paradigm Studio - Article Layout
// Optimized for deep-dive technical essays, systems writeups, and game devlogs.
// =============================================================================

import { renderBaseLayout } from './BaseLayout.js';

export function renderArticleLayout({
  title,
  description,
  date,
  readingTime,
  tags = [],
  canonicalPath,
  categoryLabel = 'TECHNICAL ESSAY',
  parentHref = '/learn/',
  parentLabel = 'Learning Hub',
  bodyHtml = ''
}) {
  const canonicalURL = `https://primordialparadigm.com${canonicalPath}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": title,
    "description": description,
    "datePublished": date,
    "author": {
      "@type": "Organization",
      "name": "Primordial Paradigm",
      "url": "https://primordialparadigm.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Primordial Paradigm",
      "url": "https://primordialparadigm.com",
      "logo": "https://primordialparadigm.com/favicon.svg"
    },
    "mainEntityOfPage": canonicalURL
  };

  const tagsHtml = tags.map(t => `<span class="article-tag">${t}</span>`).join(' ');

  const content = `
    <article class="container article-container">
      <nav class="article-breadcrumb" aria-label="Breadcrumb">
        <a href="${parentHref}" class="back-link">&larr; Back to ${parentLabel}</a>
      </nav>

      <header class="article-header">
        <div class="article-meta-top">
          <span class="category-badge">${categoryLabel}</span>
          <span class="meta-sep">&bull;</span>
          <time datetime="${date}">${date}</time>
          <span class="meta-sep">&bull;</span>
          <span class="reading-time">${readingTime}</span>
        </div>

        <h1 class="article-title">${title}</h1>
        <p class="article-lead">${description}</p>

        ${tags.length > 0 ? `<div class="article-tags-wrap">${tagsHtml}</div>` : ''}
      </header>

      <div class="prose-content">
        ${bodyHtml}
      </div>

      <footer class="article-colophon">
        <div class="colophon-box">
          <h4>About this publication</h4>
          <p>
            Published under the Primordial Paradigm masthead. Authored with first-principles systems analysis, zero sponsored bias, and strict reproducible rigor.
          </p>
          <a href="${parentHref}" class="btn btn-secondary">&larr; Return to ${parentLabel}</a>
        </div>
      </footer>
    </article>

    <script type="application/ld+json">
${JSON.stringify(articleSchema, null, 2)}
    </script>
  `.trim();

  return renderBaseLayout({
    title: `${title} — Primordial Paradigm`,
    description,
    canonicalPath,
    ogType: 'article',
    content
  });
}

