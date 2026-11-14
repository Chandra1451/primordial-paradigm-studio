// =============================================================================
// Primordial Paradigm Studio - Option 1: Editorial Broad-Sheet Hero
// Inspirations: Playdead, Remedy (Alan Wake 2), Awwwards Editorial Winners.
// High-contrast typography, celestial accretion singularity, and architectural hairlines.
// Zero SaaS capsule pills, zero text gradients, pure monolithic materiality.
// =============================================================================

export function renderEditorialBroadSheetHero() {
  return `
    <section class="editorial-hero" id="editorialHero">
      <!-- Ambient Gravitational Singularity Canvas -->
      <canvas id="singularityCanvas" class="singularity-canvas" aria-label="Gravitational Accretion Singularity"></canvas>

      <!-- Analog Film Grain / Texture -->
      <div class="editorial-grain-overlay" aria-hidden="true"></div>

      <!-- Architectural Masthead Strip -->
      <div class="editorial-masthead-strip">
        <div class="container masthead-flex">
          <div class="masthead-meta-left">
            <span class="masthead-index">[CATALOGUE NO. 01]</span>
            <span class="masthead-divider"></span>
            <span class="masthead-tag">AUTONOMOUS ATELIER</span>
          </div>
          <div class="masthead-meta-center">
            <span class="masthead-location">SECTOR: 01 // DEEP SYSTEMS</span>
          </div>
          <div class="masthead-meta-right">
            <span class="masthead-coord">37.77° N, -122.41° W</span>
            <span class="masthead-divider"></span>
            <span class="masthead-status">STATUS // ACTIVE R&D</span>
          </div>
        </div>
      </div>

      <!-- Center Monumental Editorial Lockup -->
      <div class="container editorial-hero-container">
        <div class="editorial-hero-grid">
          
          <div class="editorial-title-wrap">
            <div class="editorial-kicker">
              <span class="kicker-rule"></span>
              <span class="kicker-text">AN INDEPENDENT GAME & SYSTEMS ATELIER</span>
            </div>

            <h1 class="editorial-monumental-headline">
              Crafting Worlds <br />
              <em class="headline-italic">from the Void.</em> <br />
              <span class="headline-sans">Computational Play.</span>
            </h1>

            <p class="editorial-lead-prose">
              Primordial Paradigm develops atmospheric independent games, researches deterministic emergent mechanics, and builds high-craft computational systems. Built entirely on first principles — zero engine bloat, unyielding architectural rigor, and radical transparency.
            </p>

            <div class="editorial-action-row">
              <a href="#ledger" class="editorial-btn editorial-btn-primary">
                <span>VIEW ARCHIVAL LEDGER</span>
                <span class="btn-arrow" aria-hidden="true">&darr;</span>
              </a>
              <a href="/about/" class="editorial-btn editorial-btn-outline">
                <span>STUDIO COLOPHON</span>
              </a>
            </div>
          </div>

          <!-- Interactive Singularity HUD Docket (Right Column) -->
          <div class="editorial-singularity-docket">
            <div class="docket-frame">
              <div class="docket-top">
                <span class="docket-label">PHENOMENON // 001</span>
                <span class="docket-id">KERR SINGULARITY</span>
              </div>

              <div class="docket-display-area" aria-hidden="true">
                <div class="docket-crosshair ch-tl">+</div>
                <div class="docket-crosshair ch-tr">+</div>
                <div class="docket-crosshair ch-bl">+</div>
                <div class="docket-crosshair ch-br">+</div>
                <div class="docket-orbit-hint">
                  <span class="hint-val">ORBITAL VELOCITY: 0.98c</span>
                  <span class="hint-sub">MOVE CURSOR TO CURVE SPACETIME</span>
                </div>
              </div>

              <div class="docket-bottom">
                <div class="docket-stat">
                  <span class="stat-k">MASS RATIO</span>
                  <span class="stat-v">3.14 &times; 10&#8308; M&#9737;</span>
                </div>
                <div class="docket-stat">
                  <span class="stat-k">ACCRETION</span>
                  <span class="stat-v">KEPLERIAN</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        <!-- Bottom Telemetry Ticker Strip -->
        <div class="editorial-telemetry-dock">
          <div class="telemetry-col">
            <span class="t-kicker">INVARIANT</span>
            <span class="t-val">Pure ESM Engine</span>
          </div>
          <div class="telemetry-col">
            <span class="t-kicker">PHYSICS CORE</span>
            <span class="t-val">2D Deterministic Vector</span>
          </div>
          <div class="telemetry-col">
            <span class="t-kicker">TARGET TICK</span>
            <span class="t-val">60.00 Hz Lock</span>
          </div>
          <div class="telemetry-col">
            <span class="t-kicker">RENDERER</span>
            <span class="t-val">Zero-Native Canvas</span>
          </div>
        </div>

      </div>
    </section>

    <!-- Component Scoped Styles (Zero Capsules, Zero Text Gradients) -->
    <style>
      .editorial-hero {
        position: relative;
        background: #07080a;
        color: var(--text-primary);
        overflow: hidden;
        min-height: 85vh;
        display: flex;
        flex-direction: column;
        border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      }

      /* Background Canvas */
      .singularity-canvas {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        z-index: 1;
        pointer-events: auto;
      }

      /* Film Grain Texture */
      .editorial-grain-overlay {
        position: absolute;
        inset: 0;
        z-index: 1;
        pointer-events: none;
        opacity: 0.035;
        background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
      }

      /* Masthead Strip */
      .editorial-masthead-strip {
        position: relative;
        z-index: 2;
        border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        background: rgba(7, 8, 10, 0.85);
        backdrop-filter: blur(14px);
        -webkit-backdrop-filter: blur(14px);
        padding: 0.75rem 0;
      }

      .masthead-flex {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-family: var(--font-mono);
        font-size: 0.72rem;
        color: var(--text-muted);
      }

      .masthead-meta-left, .masthead-meta-right {
        display: flex;
        align-items: center;
        gap: 0.85rem;
      }

      .masthead-index {
        color: var(--text-primary);
        font-weight: 700;
        letter-spacing: 0.08em;
      }

      .masthead-divider {
        width: 20px;
        height: 1px;
        background: rgba(255, 255, 255, 0.12);
      }

      .masthead-tag {
        letter-spacing: 0.08em;
      }

      .masthead-coord {
        letter-spacing: 0.06em;
      }

      .masthead-status {
        color: var(--accent-amber);
        font-weight: 600;
        letter-spacing: 0.08em;
      }

      /* Editorial Hero Container */
      .editorial-hero-container {
        position: relative;
        z-index: 2;
        padding-top: clamp(3.5rem, 6vw, 5.5rem);
        padding-bottom: clamp(3.5rem, 6vw, 5.5rem);
        pointer-events: none;
      }

      .editorial-hero-grid {
        display: grid;
        grid-template-columns: 1.25fr 0.75fr;
        gap: clamp(2rem, 5vw, 4.5rem);
        align-items: center;
      }

      .editorial-title-wrap {
        pointer-events: auto;
      }

      .editorial-kicker {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        margin-bottom: 1.5rem;
      }

      .kicker-rule {
        width: 28px;
        height: 1px;
        background: var(--accent-amber);
      }

      .kicker-text {
        font-family: var(--font-mono);
        font-size: 0.72rem;
        letter-spacing: 0.16em;
        color: var(--accent-amber);
        font-weight: 600;
        text-transform: uppercase;
      }

      .editorial-monumental-headline {
        font-family: var(--font-serif);
        font-size: clamp(2.75rem, 6vw, 5.25rem);
        line-height: 1.02;
        font-weight: 400;
        letter-spacing: -0.025em;
        color: #f4f4f5;
        margin-bottom: 1.75rem;
      }

      .headline-italic {
        font-style: italic;
        color: #f4f4f5;
      }

      .headline-sans {
        font-family: var(--font-sans);
        font-weight: 700;
        letter-spacing: -0.04em;
        color: #f4f4f5;
      }

      .editorial-lead-prose {
        font-size: clamp(1.05rem, 1.8vw, 1.2rem);
        line-height: 1.7;
        color: var(--text-secondary);
        max-width: 600px;
        margin-bottom: 2.75rem;
      }

      .editorial-action-row {
        display: flex;
        align-items: center;
        gap: 1.25rem;
        flex-wrap: wrap;
      }

      .editorial-btn {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 0.85rem 1.65rem;
        border-radius: 0px;
        font-family: var(--font-mono);
        font-size: 0.8rem;
        font-weight: 600;
        letter-spacing: 0.08em;
        text-decoration: none;
        transition: all 160ms ease;
      }

      .editorial-btn-primary {
        background: #f4f4f5;
        color: #07080a;
        border: 1px solid #f4f4f5;
      }

      .editorial-btn-primary:hover {
        background: var(--accent-amber);
        border-color: var(--accent-amber);
        color: #07080a;
        text-decoration: none;
      }

      .editorial-btn-outline {
        background: transparent;
        border: 1px solid rgba(255, 255, 255, 0.18);
        color: #f4f4f5;
      }

      .editorial-btn-outline:hover {
        background: rgba(255, 255, 255, 0.06);
        border-color: rgba(255, 255, 255, 0.4);
        text-decoration: none;
      }

      /* Singularity Docket (Right Column) - Sharp Precision */
      .editorial-singularity-docket {
        pointer-events: auto;
      }

      .docket-frame {
        background: rgba(13, 14, 19, 0.85);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 0px;
        padding: 1.5rem;
        backdrop-filter: blur(14px);
        -webkit-backdrop-filter: blur(14px);
      }

      .docket-top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-family: var(--font-mono);
        font-size: 0.7rem;
        padding-bottom: 0.75rem;
        margin-bottom: 1rem;
        border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      }

      .docket-label {
        color: var(--accent-amber);
        font-weight: 600;
        letter-spacing: 0.08em;
      }

      .docket-id {
        color: var(--text-muted);
        letter-spacing: 0.08em;
      }

      .docket-display-area {
        position: relative;
        height: 180px;
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 0px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 1rem;
        background: rgba(7, 8, 10, 0.6);
      }

      .docket-crosshair {
        position: absolute;
        font-family: var(--font-mono);
        font-size: 0.75rem;
        color: rgba(255, 255, 255, 0.25);
        line-height: 1;
      }

      .ch-tl { top: 6px; left: 8px; }
      .ch-tr { top: 6px; right: 8px; }
      .ch-bl { bottom: 6px; left: 8px; }
      .ch-br { bottom: 6px; right: 8px; }

      .docket-orbit-hint {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 4px;
        font-family: var(--font-mono);
        text-align: center;
      }

      .hint-val {
        font-size: 0.72rem;
        color: #f4f4f5;
        font-weight: 600;
        letter-spacing: 0.06em;
      }

      .hint-sub {
        font-size: 0.62rem;
        color: var(--text-muted);
        letter-spacing: 0.08em;
      }

      .docket-bottom {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
        padding-top: 0.85rem;
        border-top: 1px solid rgba(255, 255, 255, 0.08);
      }

      .docket-stat {
        display: flex;
        flex-direction: column;
        gap: 2px;
        font-family: var(--font-mono);
      }

      .stat-k {
        font-size: 0.62rem;
        color: var(--text-muted);
        letter-spacing: 0.08em;
      }

      .stat-v {
        font-size: 0.82rem;
        color: #f4f4f5;
        font-weight: 600;
      }

      /* Telemetry Dock Strip */
      .editorial-telemetry-dock {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 1.5rem;
        margin-top: clamp(3rem, 5vw, 4.5rem);
        padding-top: 1.75rem;
        border-top: 1px solid rgba(255, 255, 255, 0.08);
        pointer-events: auto;
      }

      .telemetry-col {
        display: flex;
        flex-direction: column;
        gap: 3px;
        font-family: var(--font-mono);
      }

      .t-kicker {
        font-size: 0.62rem;
        color: var(--text-muted);
        letter-spacing: 0.08em;
      }

      .t-val {
        font-size: 0.85rem;
        color: #f4f4f5;
        font-weight: 600;
      }

      /* Responsive Rules */
      @media (max-width: 960px) {
        .editorial-hero-grid {
          grid-template-columns: 1fr;
          gap: 3rem;
        }
        .editorial-telemetry-dock {
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
        }
      }

      @media (max-width: 640px) {
        .editorial-masthead-strip {
          display: none;
        }
        .editorial-telemetry-dock {
          grid-template-columns: 1fr;
          gap: 1.25rem;
        }
      }
    </style>

    <!-- Celestial Accretion Canvas Engine -->
    <script>
      (function() {
        const canvas = document.getElementById('singularityCanvas');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let width = 0;
        let height = 0;
        let dpr = 1;
        let animId = null;

        function resize() {
          const rect = canvas.getBoundingClientRect();
          width = rect.width;
          height = rect.height;
          dpr = Math.min(window.devicePixelRatio || 1, 2);
          canvas.width = Math.floor(width * dpr);
          canvas.height = Math.floor(height * dpr);
          ctx.scale(dpr, dpr);
        }

        resize();
        window.addEventListener('resize', resize, { passive: true });

        // Physics particles
        const PARTICLE_COUNT = 110;
        const particles = [];
        const horizonRadius = 38;

        for (let i = 0; i < PARTICLE_COUNT; i++) {
          const angle = Math.random() * Math.PI * 2;
          const dist = horizonRadius + 30 + Math.random() * 260;
          particles.push({
            x: 0,
            y: 0,
            angle,
            dist,
            speed: (0.45 + Math.random() * 0.75) * (Math.random() < 0.5 ? 1 : 1),
            size: Math.random() * 1.5 + 0.6,
            brightness: Math.random() * 0.7 + 0.3,
            vx: 0,
            vy: 0,
            isTungsten: Math.random() < 0.25
          });
        }

        const mouse = { x: null, y: null, active: false };

        window.addEventListener('mousemove', function(e) {
          const rect = canvas.getBoundingClientRect();
          mouse.x = e.clientX - rect.left;
          mouse.y = e.clientY - rect.top;
          mouse.active = true;
        }, { passive: true });

        window.addEventListener('mouseleave', function() {
          mouse.active = false;
        });

        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        function renderSingularity() {
          if (prefersReduced) return;

          ctx.clearRect(0, 0, width, height);

          // Singularity Center on desktop: right column center; on mobile: canvas center
          const cx = width > 960 ? width * 0.75 : width * 0.5;
          const cy = height * 0.5;

          // Event Horizon Core (True Black)
          ctx.fillStyle = '#07080a';
          ctx.beginPath();
          ctx.arc(cx, cy, horizonRadius, 0, Math.PI * 2);
          ctx.fill();

          // Event Horizon Hairline Boundary (Sharp, No Glow Blur)
          ctx.strokeStyle = 'rgba(244, 244, 245, 0.45)';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(cx, cy, horizonRadius, 0, Math.PI * 2);
          ctx.stroke();

          // Keplerian Particles
          for (let i = 0; i < particles.length; i++) {
            const p = particles[i];

            if (p.x === 0 && p.y === 0) {
              p.x = cx + Math.cos(p.angle) * p.dist;
              p.y = cy + Math.sin(p.angle) * p.dist;
            }

            const dx = cx - p.x;
            const dy = cy - p.y;
            const distSq = dx * dx + dy * dy;
            const dist = Math.sqrt(distSq);

            // Gravitational pull
            const f = 850 / Math.max(distSq, 350);
            p.vx += (dx / dist) * f;
            p.vy += (dy / dist) * f;

            // Mouse spacetime curvature
            if (mouse.active && mouse.x !== null) {
              const mdx = mouse.x - p.x;
              const mdy = mouse.y - p.y;
              const mdistSq = mdx * mdx + mdy * mdy;
              if (mdistSq < 30000 && mdistSq > 120) {
                const mdist = Math.sqrt(mdistSq);
                const mf = 450 / mdistSq;
                p.vx += (mdx / mdist) * mf;
                p.vy += (mdy / mdist) * mf;
              }
            }

            p.vx *= 0.988;
            p.vy *= 0.988;

            p.x += p.vx;
            p.y += p.vy;

            // Render Particle
            const alpha = Math.min(p.brightness, (dist - horizonRadius) / 30);
            if (alpha > 0.03) {
              ctx.fillStyle = p.isTungsten
                ? 'rgba(229, 155, 32, ' + alpha + ')'
                : 'rgba(244, 244, 245, ' + alpha + ')';
              ctx.beginPath();
              ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
              ctx.fill();
            }

            // Respawn particles crossing the event horizon
            if (dist < horizonRadius || p.x < -40 || p.x > width + 40 || p.y < -40 || p.y > height + 40) {
              const spawnAngle = Math.random() * Math.PI * 2;
              const spawnDist = Math.min(width, height) * 0.42 + Math.random() * 40;
              p.x = cx + Math.cos(spawnAngle) * spawnDist;
              p.y = cy + Math.sin(spawnAngle) * spawnDist;
              p.vx = -Math.sin(spawnAngle) * (1.0 + Math.random() * 0.8);
              p.vy = Math.cos(spawnAngle) * (1.0 + Math.random() * 0.8);
            }
          }

          animId = requestAnimationFrame(renderSingularity);
        }

        animId = requestAnimationFrame(renderSingularity);
      })();
    </script>
  `.trim();
}
