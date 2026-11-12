// =============================================================================
// Primordial Paradigm Studio - 404 Error Page
// =============================================================================

import { renderBaseLayout } from '../layouts/BaseLayout.js';

export function render404Page() {
  const content = `
    <section class="section" style="padding-top: calc(var(--space-2xl) * 1.5); min-height: 60vh; display: flex; align-items: center;">
      <div class="container" style="max-width: 680px; text-align: center;">
        <div style="display: inline-flex; align-items: center; justify-content: center; width: 64px; height: 64px; border-radius: 50%; background: rgba(224, 90, 71, 0.08); border: 1px solid rgba(224, 90, 71, 0.3); margin-bottom: var(--space-md); color: var(--color-accent);">
          <span style="font-family: var(--font-mono); font-size: 1.25rem; font-weight: 700;">404</span>
        </div>
        <div class="hero-eyebrow" style="color: var(--color-accent); justify-content: center; margin-bottom: var(--space-xs);">
          SECTOR COORDINATE NOT FOUND
        </div>
        <h1 class="hero-title" style="font-size: clamp(2rem, 5vw, 2.75rem); margin-bottom: var(--space-sm);">
          Signal Lost in Void
        </h1>
        <p class="hero-desc" style="margin: 0 auto var(--space-xl); max-width: 540px; font-size: 1.05rem;">
          The requested coordinate does not exist in the studio archives. It may have been refactored, relocated, or decommissioned.
        </p>

        <div style="display: flex; gap: var(--space-sm); justify-content: center; flex-wrap: wrap;">
          <a href="/" class="btn btn-primary">Return to Studio Home</a>
          <a href="/games/" class="btn btn-secondary">Explore Games</a>
          <a href="/learn/" class="btn btn-secondary">Systems Architecture</a>
        </div>
      </div>
    </section>
  `.trim();

  return renderBaseLayout({
    title: '404: Coordinate Not Found — Primordial Paradigm',
    description: 'The requested coordinate does not exist in the Primordial Paradigm studio archives.',
    canonicalPath: '/404.html',
    noindex: true,
    content
  });
}

