// =============================================================================
// Primordial Paradigm Studio - Option 1: Editorial Broad-Sheet Hero
// Inspirations: Playdead, Remedy (Alan Wake 2), Awwwards Editorial Winners.
// High-contrast typography, celestial accretion singularity, and archival telemetry.
// =============================================================================

export function renderEditorialBroadSheetHero() {
  return `
    <section class="editorial-hero" id="editorialHero">
      <!-- Ambient Gravitational Singularity Canvas -->
      <canvas id="singularityCanvas" class="singularity-canvas" aria-label="Gravitational Accretion Singularity"></canvas>

      <!-- Analog Film Grain / Texture -->
      <div class="editorial-grain-overlay" aria-hidden="true"></div>

      <!-- Top Architectural Masthead Strip -->
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
            <span class="masthead-status-beacon">
              <span class="beacon-spark"></span>
              ACTIVE
            </span>
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
                <span>View Archival Ledger</span>
                <span class="btn-arrow">&darr;</span>
              </a>
              <a href="/about/" class="editorial-btn editorial-btn-outline">
                <span>Studio Colophon</span>
              </a>
            </div>
          </div>

          <!-- Interactive Singularity HUD Capsule -->
          <div class="editorial-singularity-capsule">
            <div class="capsule-frame">
              <div class="capsule-top">
                <span class="capsule-label">PHENOMENON // 001</span>
                <span class="capsule-id">KERR SINGULARITY</span>
              </div>

              <div class="capsule-display-area" aria-hidden="true">
                <div class="capsule-crosshair ch-tl">+</div>
                <div class="capsule-crosshair ch-tr">+</div>
                <div class="capsule-crosshair ch-bl">+</div>
                <div class="capsule-crosshair ch-br">+</div>
                <div class="capsule-orbit-hint">
                  <span>ORBITAL VELOCITY: 0.98c</span>
                  <span>DRAG TO CURVE SPACETIME</span>
                </div>
              </div>

              <div class="capsule-bottom">
                <div class="capsule-stat">
                  <span class="stat-k">MASS RATIO</span>
                  <span class="stat-v">3.14 &times; 10&#8308; M&#9737;</span>
                </div>
                <div class="capsule-stat">
                  <span class="stat-k">ACCRETION</span>
                  <span class="stat-v">KEPLERIAN</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <!-- Bottom Marquee / Ticker Strip -->
      <div class="editorial-ticker-bar">
        <div class="ticker-track">
          <span class="ticker-item">&bull; INDEPENDENT GAME DEVELOPMENT</span>
          <span class="ticker-item">&bull; 2D VECTOR KINEMATICS</span>
          <span class="ticker-item">&bull; DETERMINISTIC SYSTEMS ARCHITECTURE</span>
          <span class="ticker-item">&bull; ZERO RUNTIME BLOAT</span>
          <span class="ticker-item">&bull; WCAG 2.2 AAA CONTRAST</span>
          <span class="ticker-item">&bull; INDEPENDENT GAME DEVELOPMENT</span>
          <span class="ticker-item">&bull; 2D VECTOR KINEMATICS</span>
          <span class="ticker-item">&bull; DETERMINISTIC SYSTEMS ARCHITECTURE</span>
        </div>
      </div>
    </section>

    <style>
      /* =============================================================================
         Editorial Broad-Sheet Hero Styles (Playdead & Remedy Inspired)
         ============================================================================= */
      .editorial-hero {
        position: relative;
        min-height: calc(100vh - var(--nav-height));
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        background: #06070a;
        overflow: hidden;
        border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      }

      .singularity-canvas {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        display: block;
        z-index: 0;
      }

      .editorial-grain-overlay {
        position: absolute;
        inset: 0;
        pointer-events: none;
        z-index: 1;
        opacity: 0.04;
        background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
      }

      /* Masthead Strip */
      .editorial-masthead-strip {
        position: relative;
        z-index: 2;
        border-bottom: 1px solid rgba(255, 255, 255, 0.07);
        background: rgba(6, 7, 10, 0.85);
        backdrop-filter: blur(14px);
        padding: 0.65rem 0;
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
        color: var(--accent-amber);
        font-weight: 700;
        letter-spacing: 0.06em;
      }

      .masthead-divider {
        width: 25px;
        height: 1px;
        background: rgba(255, 255, 255, 0.15);
      }

      .masthead-tag {
        letter-spacing: 0.08em;
      }

      .masthead-coord {
        letter-spacing: 0.05em;
      }

      .masthead-status-beacon {
        display: inline-flex;
        align-items: center;
        gap: 5px;
        color: var(--status-success);
        font-weight: 600;
      }

      .beacon-spark {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: var(--status-success);
        box-shadow: 0 0 8px var(--status-success);
      }

      /* Editorial Hero Container */
      .editorial-hero-container {
        position: relative;
        z-index: 2;
        padding-top: clamp(3rem, 6vw, 5rem);
        padding-bottom: clamp(3rem, 6vw, 5rem);
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
        width: 32px;
        height: 1px;
        background: var(--accent-amber);
      }

      .kicker-text {
        font-family: var(--font-mono);
        font-size: 0.75rem;
        letter-spacing: 0.15em;
        color: var(--accent-amber);
        font-weight: 600;
      }

      .editorial-monumental-headline {
        font-family: Georgia, Cambria, 'Times New Roman', serif;
        font-size: clamp(2.75rem, 6vw, 5.25rem);
        line-height: 1.02;
        font-weight: 400;
        letter-spacing: -0.025em;
        color: var(--text-primary);
        margin-bottom: 1.75rem;
      }

      .headline-italic {
        font-style: italic;
        color: #f1f5f9;
        text-shadow: 0 0 35px rgba(245, 158, 11, 0.2);
      }

      .headline-sans {
        font-family: var(--font-sans);
        font-weight: 700;
        letter-spacing: -0.04em;
        color: var(--text-primary);
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
        border-radius: 2px;
        font-family: var(--font-mono);
        font-size: 0.825rem;
        font-weight: 600;
        letter-spacing: 0.05em;
        text-decoration: none;
        transition: all 180ms ease;
      }

      .editorial-btn-primary {
        background: var(--accent-amber);
        color: #06070a;
        border: 1px solid var(--accent-amber);
      }

      .editorial-btn-primary:hover {
        background: var(--accent-amber-light);
        transform: translateY(-2px);
        text-decoration: none;
      }

      .editorial-btn-outline {
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid rgba(255, 255, 255, 0.15);
        color: var(--text-primary);
      }

      .editorial-btn-outline:hover {
        background: rgba(255, 255, 255, 0.08);
        border-color: rgba(255, 255, 255, 0.3);
        transform: translateY(-2px);
        text-decoration: none;
      }

      /* Singularity Capsule (Right Column) */
      .editorial-singularity-capsule {
        pointer-events: auto;
      }

      .capsule-frame {
        background: rgba(10, 12, 17, 0.7);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: var(--radius-md);
        padding: 1.5rem;
        backdrop-filter: blur(14px);
        box-shadow: 0 30px 60px -15px rgba(0, 0, 0, 0.9);
      }

      .capsule-top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-family: var(--font-mono);
        font-size: 0.7rem;
        padding-bottom: 0.75rem;
        margin-bottom: 1rem;
        border-bottom: 1px solid rgba(255, 255, 255, 0.06);
      }

      .capsule-label {
        color: var(--accent-amber);
        font-weight: 600;
      }

      .capsule-id {
        color: var(--text-muted);
      }

      .capsule-display-area {
        position: relative;
        height: 180px;
        border: 1px dashed rgba(255, 255, 255, 0.08);
        border-radius: var(--radius-sm);
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 1rem;
        background: radial-gradient(circle, rgba(245, 158, 11, 0.04) 0%, transparent 70%);
      }

      .capsule-crosshair {
        position: absolute;
        font-family: var(--font-mono);
        font-size: 0.75rem;
        color: rgba(245, 158, 11, 0.4);
        line-height: 1;
      }

      .ch-tl { top: 6px; left: 8px; }
      .ch-tr { top: 6px; right: 8px; }
      .ch-bl { bottom: 6px; left: 8px; }
      .ch-br { bottom: 6px; right: 8px; }

      .capsule-orbit-hint {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 4px;
        font-family: var(--font-mono);
        font-size: 0.68rem;
        color: var(--text-muted);
        text-align: center;
      }

      .capsule-bottom {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 10px;
        padding-top: 0.75rem;
        border-top: 1px solid rgba(255, 255, 255, 0.06);
      }

      .capsule-stat {
        display: flex;
        flex-direction: column;
        gap: 2px;
      }

      .stat-k {
        font-family: var(--font-mono);
        font-size: 0.65rem;
        color: var(--text-muted);
      }

      .stat-v {
        font-family: var(--font-mono);
        font-size: 0.78rem;
        color: var(--text-primary);
        font-weight: 600;
      }

      /* Ticker Bar */
      .editorial-ticker-bar {
        position: relative;
        z-index: 2;
        border-top: 1px solid rgba(255, 255, 255, 0.06);
        background: rgba(6, 7, 10, 0.95);
        padding: 0.65rem 0;
        overflow: hidden;
        white-space: nowrap;
      }

      .ticker-track {
        display: inline-flex;
        gap: 2.5rem;
        font-family: var(--font-mono);
        font-size: 0.72rem;
        color: var(--text-muted);
        letter-spacing: 0.08em;
        animation: tickerScroll 28s linear infinite;
      }

      @keyframes tickerScroll {
        from { transform: translateX(0); }
        to { transform: translateX(-50%); }
      }

      @media (max-width: 900px) {
        .editorial-hero-grid {
          grid-template-columns: 1fr;
          gap: 2.5rem;
        }
        .masthead-meta-center { display: none; }
      }
    </style>

    <script>
      (function() {
        const canvas = document.getElementById('singularityCanvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const heroSection = document.getElementById('editorialHero');

        let width = 0;
        let height = 0;
        let dpr = window.devicePixelRatio || 1;
        let animId = null;

        const particles = [];
        const particleCount = 180;
        const mouse = { x: null, y: null, active: false };

        function initParticles() {
          particles.length = 0;
          const cx = width * 0.7;
          const cy = height * 0.5;
          for (let i = 0; i < particleCount; i++) {
            const angle = Math.random() * Math.PI * 2;
            const dist = Math.random() * (Math.min(width, height) * 0.45) + 35;
            particles.push({
              x: cx + Math.cos(angle) * dist,
              y: cy + Math.sin(angle) * dist,
              vx: -Math.sin(angle) * (1.2 + Math.random() * 0.9),
              vy: Math.cos(angle) * (1.2 + Math.random() * 0.9),
              size: Math.random() < 0.2 ? 2.0 : 1.1,
              hue: Math.random() < 0.35 ? 38 : 190,
              brightness: Math.random() * 0.7 + 0.3
            });
          }
        }

        function resize() {
          if (!heroSection) return;
          const rect = heroSection.getBoundingClientRect();
          width = rect.width;
          height = rect.height;
          dpr = window.devicePixelRatio || 1;

          canvas.width = width * dpr;
          canvas.height = height * dpr;
          ctx.scale(dpr, dpr);

          if (particles.length === 0) initParticles();
        }

        resize();
        window.addEventListener('resize', resize, { passive: true });

        window.addEventListener('pointermove', (e) => {
          const rect = canvas.getBoundingClientRect();
          mouse.x = e.clientX - rect.left;
          mouse.y = e.clientY - rect.top;
          mouse.active = true;
        }, { passive: true });

        window.addEventListener('pointerleave', () => {
          mouse.active = false;
          mouse.x = null;
          mouse.y = null;
        });

        function renderSingularity() {
          ctx.fillStyle = 'rgba(6, 7, 10, 0.2)';
          ctx.fillRect(0, 0, width, height);

          // Center of singularity (right-weighted on desktop for asymmetrical balance)
          const cx = width > 900 ? width * 0.7 : width * 0.5;
          const cy = height * 0.5;
          const horizonRadius = 26;

          // Glowing Accretion Corona
          const coronaGrad = ctx.createRadialGradient(cx, cy, 2, cx, cy, 95);
          coronaGrad.addColorStop(0, 'rgba(0, 0, 0, 1)');
          coronaGrad.addColorStop(0.35, 'rgba(10, 12, 18, 0.95)');
          coronaGrad.addColorStop(0.44, 'rgba(245, 158, 11, 0.5)');
          coronaGrad.addColorStop(0.6, 'rgba(6, 182, 212, 0.2)');
          coronaGrad.addColorStop(1, 'transparent');

          ctx.fillStyle = coronaGrad;
          ctx.beginPath();
          ctx.arc(cx, cy, 95, 0, Math.PI * 2);
          ctx.fill();

          // Black Core Hole
          ctx.fillStyle = '#030406';
          ctx.beginPath();
          ctx.arc(cx, cy, horizonRadius, 0, Math.PI * 2);
          ctx.fill();

          // Event Horizon Ring
          ctx.strokeStyle = 'rgba(245, 158, 11, 0.75)';
          ctx.lineWidth = 1.6;
          ctx.beginPath();
          ctx.arc(cx, cy, horizonRadius + 1, 0, Math.PI * 2);
          ctx.stroke();

          // Accretion Disk Keplerian Particles
          for (const p of particles) {
            const dx = cx - p.x;
            const dy = cy - p.y;
            const distSq = dx * dx + dy * dy;
            const dist = Math.sqrt(distSq);

            // Gravitational attraction
            const f = 900 / Math.max(distSq, 380);
            p.vx += (dx / dist) * f;
            p.vy += (dy / dist) * f;

            // Secondary gravitational curvature from cursor
            if (mouse.active && mouse.x !== null) {
              const mdx = mouse.x - p.x;
              const mdy = mouse.y - p.y;
              const mdistSq = mdx * mdx + mdy * mdy;
              if (mdistSq < 35000 && mdistSq > 150) {
                const mdist = Math.sqrt(mdistSq);
                const mf = 550 / mdistSq;
                p.vx += (mdx / mdist) * mf;
                p.vy += (mdy / mdist) * mf;
              }
            }

            p.vx *= 0.988;
            p.vy *= 0.988;

            p.x += p.vx;
            p.y += p.vy;

            // Draw particle with distance alpha
            const alpha = Math.min(p.brightness, (dist - horizonRadius) / 28);
            if (alpha > 0.02) {
              ctx.fillStyle = p.hue === 38
                ? \`rgba(245, 158, 11, \${alpha})\`
                : \`rgba(6, 182, 212, \${alpha})\`;
              ctx.beginPath();
              ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
              ctx.fill();
            }

            // Respawn particles pulled past event horizon
            if (dist < horizonRadius || p.x < -60 || p.x > width + 60 || p.y < -60 || p.y > height + 60) {
              const spawnAngle = Math.random() * Math.PI * 2;
              const spawnDist = Math.min(width, height) * 0.42 + Math.random() * 50;
              p.x = cx + Math.cos(spawnAngle) * spawnDist;
              p.y = cy + Math.sin(spawnAngle) * spawnDist;
              p.vx = -Math.sin(spawnAngle) * (1.1 + Math.random() * 0.9);
              p.vy = Math.cos(spawnAngle) * (1.1 + Math.random() * 0.9);
            }
          }

          animId = requestAnimationFrame(renderSingularity);
        }

        animId = requestAnimationFrame(renderSingularity);
      })();
    </script>
  `.trim();
}

