// =============================================================================
// Primordial Paradigm Studio - About Page Module
// =============================================================================

import { renderBaseLayout } from '../layouts/BaseLayout.js';

export function renderAboutPage() {
  const content = `
    <div class="container page-content">
      <div class="page-header">
        <span class="mono-label">PHILOSOPHY & ETHOS</span>
        <h1>About Primordial Paradigm</h1>
        <p class="lead">
          An independent studio exploring the boundaries between game systems, creative computing, and clear communication.
        </p>
      </div>

      <div class="content-body">
        <section class="text-section">
          <h2>Origin & Purpose</h2>
          <p>
            Primordial Paradigm was founded on a simple conviction: software and interactive worlds are most compelling when crafted from first principles rather than assembled from cookie-cutter corporate patterns.
          </p>
          <p>
            Whether building an emergent video game system, authoring an exhaustive technical breakdown, or engineering an executive data interface, our goal is the same: unyielding clarity, tactile responsiveness, and structural integrity.
          </p>
        </section>

        <section class="text-section" id="colophon">
          <h2>Colophon & Standards</h2>
          <ul class="colophon-list">
            <li><strong>Architecture:</strong> Statically compiled with pure ES modules for zero runtime client-side JavaScript overhead.</li>
            <li><strong>Aesthetic:</strong> Custom Obsidian Cosmos theme tokens with WCAG AAA contrast ratio compliance.</li>
            <li><strong>Privacy:</strong> Zero third-party trackers, zero invasive cookies, zero telemetry without explicit consent.</li>
            <li><strong>Hosting:</strong> High-performance static web hosting on Hostinger.</li>
          </ul>
        </section>
      </div>
    </div>
  `.trim();

  return renderBaseLayout({
    title: 'About the Studio — Primordial Paradigm',
    description: 'The ethos, philosophy, and personal founder voice behind Primordial Paradigm Studio.',
    canonicalPath: '/about/',
    content
  });
}

