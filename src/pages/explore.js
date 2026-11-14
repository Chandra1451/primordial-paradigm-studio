// =============================================================================
// Primordial Paradigm Studio - Creative Direction & Layout Exploration Page
// =============================================================================

import { renderBaseLayout } from '../layouts/BaseLayout.js';
import { renderCreativeStudioLab } from '../components/CreativeStudioLab.js';
import { renderCraftSwitcher } from '../components/CraftSwitcher.js';

export function renderExplorePage() {
  const content = `
    <section class="section" style="padding-top: calc(var(--space-2xl) * 1.2);">
      <div class="container">
        <!-- Eyebrow & Headline -->
        <div class="hero-top-bar" style="margin-bottom: var(--space-xs);">
          <span class="studio-badge">
            PP-STUDIO-13 // CREATIVE VISUAL LAB
          </span>
          <span style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-muted);">
            ARCHITECTURAL OBSIDIAN
          </span>
        </div>

        <h1 class="hero-headline" style="font-size: clamp(2.2rem, 5vw, 3.5rem); margin-bottom: var(--space-sm);">
          Evolving Beyond the <br />
          <span class="headline-solid">Standard Template.</span>
        </h1>

        <p class="hero-lead" style="max-width: 720px; margin-bottom: var(--space-xl);">
          Independent game and creative technology studios sell atmosphere, mystery, and uncompromising technical craft. Below is our interactive research sandbox for testing three bespoke motion systems and exploring modern architectural layouts.
        </p>

        <!-- Interactive Motion Sandbox -->
        ${renderCreativeStudioLab()}

        <!-- Architectural Layout Concepts Section -->
        <div style="margin-top: calc(var(--space-2xl) * 1.5);">
          <div class="section-header">
            <div class="section-meta">
              <span class="section-label">LAYOUT ARCHITECTURE</span>
              <span class="meta-line"></span>
            </div>
            <h2 class="section-title">Three Studio Layout Directions</h2>
            <p class="section-sub">Replacing the 3-box SaaS card grid with deliberate, asymmetrical editorial structures.</p>
          </div>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 340px), 1fr)); gap: var(--space-lg); margin-top: var(--space-xl);">
            
            <!-- Architecture Option 1 -->
            <article class="pillar-card" style="border-color: rgba(229, 155, 32, 0.25);">
              <span class="card-tag">CONCEPT 01 // EDITORIAL MONOLITH</span>
              <h3 class="card-title" style="font-size: 1.3rem;">Cinematic Viewport + Research Cassettes</h3>
              <p class="card-desc">
                Massive architectural masthead with real-time celestial telemetry. The hero flows directly into a playable in-situ game simulation right on the homepage, flanked by asymmetrical project research cassettes.
              </p>
              <div style="margin-top: var(--space-md); padding-top: var(--space-sm); border-top: 1px solid var(--border-subtle); font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-muted);">
                ✦ Best paired with: <strong>Gravitational Singularity</strong>
              </div>
            </article>

            <!-- Architecture Option 2 -->
            <article class="pillar-card" style="border-color: rgba(56, 189, 248, 0.25);">
              <span class="card-tag">CONCEPT 02 // CAD BLUEPRINT & DOSSIER</span>
              <h3 class="card-title" style="font-size: 1.3rem;">Tactical Grid + Parameter Deck</h3>
              <p class="card-desc">
                Inspired by avionics schematics and architectural drafting. Hairline grid with crosshair markers (<code style="color: var(--accent-cyan); font-size: 0.85em;">+</code>). Split-screen dossier pairing the founder manifesto with interactive simulation dials.
              </p>
              <div style="margin-top: var(--space-md); padding-top: var(--space-sm); border-top: 1px solid var(--border-subtle); font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-muted);">
                ✦ Best paired with: <strong>Procedural Flow Field</strong>
              </div>
            </article>

            <!-- Architecture Option 3 -->
            <article class="pillar-card" style="border-color: rgba(255, 255, 255, 0.15);">
              <span class="card-tag">CONCEPT 03 // ISOMETRIC GEOMETRY CORE</span>
              <h3 class="card-title" style="font-size: 1.3rem;">3D Monumental Brutalism</h3>
              <p class="card-desc">
                Extreme typographic scale contrast (giant titles paired with tiny monospaced telemetry). Features an interactive 3D rotating First Form crystalline core that responds to user mouse inertia.
              </p>
              <div style="margin-top: var(--space-md); padding-top: var(--space-sm); border-top: 1px solid var(--border-subtle); font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-muted);">
                ✦ Best paired with: <strong>Kinetic Sacred Geometry</strong>
              </div>
            </article>

          </div>
        </div>

        <!-- Call to Action / Alignment -->
        <div style="margin-top: calc(var(--space-2xl) * 1.2); padding: var(--space-xl); background: rgba(15, 18, 26, 0.6); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); text-align: center;">
          <h3 style="font-size: 1.4rem; color: var(--text-primary); margin-bottom: var(--space-xs);">
            Ready to Select the Studio Direction
          </h3>
          <p style="color: var(--text-secondary); max-width: 600px; margin: 0 auto var(--space-md); font-size: 0.95rem;">
            Test the 3 animation modes above, feel the mouse response and velocity, and let me know which concept best matches your vision for Primordial Paradigm Studio.
          </p>
          <div style="display: flex; gap: var(--space-sm); justify-content: center; flex-wrap: wrap;">
            <a href="/" class="btn btn-secondary">&larr; Return to Live Homepage</a>
            <a href="/games/systemic-movement-prototype/" class="btn btn-secondary">Inspect Kinematics Sandbox</a>
          </div>
        </div>
      </div>
    </section>

    <!-- Discrete Floating Creative Direction Switcher Dock -->
    ${renderCraftSwitcher('03')}
  `.trim();

  return renderBaseLayout({
    title: 'Creative Direction & Motion Lab — Primordial Paradigm Studio',
    description: 'Interactive experimental lab for testing bespoke studio layouts, procedural shaders, and kinetic physics simulations.',
    canonicalPath: '/explore/',
    content
  });
}

