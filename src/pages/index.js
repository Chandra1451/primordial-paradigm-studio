// =============================================================================
// Primordial Paradigm Studio - Homepage Module (Atmospheric & Animated)
// =============================================================================

import { renderBaseLayout } from '../layouts/BaseLayout.js';
import { renderFirstFormMonogram } from '../components/FirstFormMonogram.js';
import { renderPrimordialHeroField } from '../components/PrimordialHeroField.js';

export function renderHomePage() {
  const content = `
    <!-- Hero Section with Generative Cosmic Field -->
    <section class="hero-section">
      ${renderPrimordialHeroField()}

      <div class="container hero-container">
        <div class="hero-top-bar">
          <div class="badge-wrapper">
            <span class="studio-badge">
              <span class="badge-dot"></span>
              INDEPENDENT STUDIO
            </span>
          </div>

          <button type="button" id="motionToggle" class="motion-toggle-btn" aria-label="Toggle ambient animation" title="Pause or resume ambient background motion">
            <span class="motion-toggle-icon">&bull;</span>
            <span class="motion-toggle-label">Motion Active</span>
          </button>
        </div>

        <h1 class="hero-headline">
          Crafting Worlds & <br />
          <span class="gradient-text">Computational Systems.</span>
        </h1>

        <p class="hero-lead">
          Primordial Paradigm is an independent game and creative technology studio. We develop original interactive experiences, research deep systems architecture, and engineer high-craft digital tools.
        </p>

        <div class="hero-actions">
          <a href="/games/" class="btn btn-primary">
            <span>Explore Games & Devlogs</span>
            <span class="btn-arrow">&rarr;</span>
          </a>
          <a href="/learn/" class="btn btn-secondary">
            <span>Read Systems Essays</span>
          </a>
        </div>
      </div>
    </section>

    <!-- Core Pillars Grid -->
    <section class="pillars-section">
      <div class="container">
        <div class="section-header">
          <div class="section-meta">
            <span class="section-label">STUDIO DIVISIONS</span>
            <span class="meta-line"></span>
          </div>
          <h2 class="section-title">Where Craft Meets Computation</h2>
          <p class="section-sub">Three integrated wings operating under one philosophical standard.</p>
        </div>

        <div class="pillars-grid">
          <!-- Card 1: Games -->
          <article class="pillar-card pillar-card-games">
            <div class="card-ambient-glow"></div>
            <div class="card-spark spark-amber"></div>
            <span class="card-tag">INTERACTIVE CRAFT & DEVLOGS</span>
            <h3 class="card-title">Independent Games</h3>
            <p class="card-desc">
              Designing systemic, atmospheric video games rooted in distinctive art direction and emergent gameplay mechanics.
            </p>
            <a href="/games/" class="card-link">View Projects & Devlogs &rarr;</a>
          </article>

          <!-- Card 2: Learn -->
          <article class="pillar-card pillar-card-learn">
            <div class="card-ambient-glow"></div>
            <div class="card-spark spark-cyan"></div>
            <span class="card-tag">RESEARCH & WRITING</span>
            <h3 class="card-title">Learning Hub</h3>
            <p class="card-desc">
              Exhaustive, high-value technical essays covering systems architecture, data visualization, and game mechanics.
            </p>
            <a href="/learn/" class="card-link">Browse Technical Essays &rarr;</a>
          </article>

          <!-- Card 3: Consulting -->
          <article class="pillar-card pillar-card-services">
            <div class="card-ambient-glow"></div>
            <div class="card-spark spark-slate"></div>
            <span class="card-tag">SYSTEMS ADVISORY</span>
            <h3 class="card-title">Systems Consulting</h3>
            <p class="card-desc">
              Bespoke executive dashboards, data architecture, and custom business intelligence systems delivered with obsessive polish.
            </p>
            <a href="/services/" class="card-link">Explore Capabilities &rarr;</a>
          </article>
        </div>
      </div>
    </section>

    <!-- Studio Ethos Banner with Living Halo Monogram -->
    <section class="ethos-section">
      <div class="container ethos-container">
        <div class="ethos-card">
          <div class="ethos-halo-backdrop"></div>
          <div class="ethos-content">
            <div class="monogram-halo-wrapper">
              <div class="monogram-pulse-ring"></div>
              ${renderFirstFormMonogram({ size: 54, sparkColor: 'var(--accent-amber)' })}
            </div>
            <h2 class="ethos-title">Built on First Principles</h2>
            <p class="ethos-text">
              We reject templated mediocrity and corporate bloat. Every project published under the Primordial Paradigm masthead is built with unyielding attention to design craft, zero runtime bloat, and technical integrity.
            </p>
            <div class="ethos-actions">
              <a href="/about/" class="btn btn-secondary">Read Studio Philosophy</a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <script>
      (function() {
        const toggleBtn = document.getElementById('motionToggle');
        if (!toggleBtn) return;
        let isRunning = true;

        toggleBtn.addEventListener('click', () => {
          isRunning = !isRunning;
          const label = toggleBtn.querySelector('.motion-toggle-label');
          if (isRunning) {
            label.textContent = 'Motion Active';
            toggleBtn.classList.remove('is-paused');
          } else {
            label.textContent = 'Motion Paused';
            toggleBtn.classList.add('is-paused');
          }
          window.dispatchEvent(new CustomEvent('pp:toggle-motion', { detail: { running: isRunning } }));
        });
      })();
    </script>
  `.trim();

  return renderBaseLayout({
    title: 'Primordial Paradigm — Independent Game & Creative Tech Studio',
    description: 'Primordial Paradigm is an independent game and creative technology studio building intricate game systems, technical essays, and high-craft software.',
    canonicalPath: '/',
    content
  });
}
