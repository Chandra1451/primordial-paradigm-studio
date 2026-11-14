// =============================================================================
// Primordial Paradigm Studio - Atmospheric Studio Hero
// Inspirations: Playdead, Remedy (Control / Alan Wake 2), Kurppa Hosk (Marathon).
// Dynamically morphs between 3 human-crafted creative atmospheres:
// 1. Cosmic Chiaroscuro (Remedy Crimson + Spacetime Lensing)
// 2. Vector Blueprint (Marathon Signal Orange + 3D Wireframe Mesh)
// 3. Atmospheric Surrealism (Playdead Fog + Monolithic Silhouettes)
// =============================================================================

export function renderEditorialBroadSheetHero() {
  return `
    <section class="editorial-hero" id="editorialHero">
      <!-- Ambient Interactive Physics Canvas -->
      <canvas id="singularityCanvas" class="singularity-canvas" aria-label="Interactive Studio Physics Canvas"></canvas>

      <!-- Analog Film Grain / Texture Overlay -->
      <div class="editorial-grain-overlay" aria-hidden="true"></div>

      <!-- Architectural Masthead Strip -->
      <div class="editorial-masthead-strip">
        <div class="container masthead-flex">
          <div class="masthead-meta-left">
            <span class="masthead-index" id="heroCatalogNo">[CATALOGUE NO. 01]</span>
            <span class="masthead-divider"></span>
            <span class="masthead-tag" id="heroAtelierTag">AUTONOMOUS ATELIER</span>
          </div>
          <div class="masthead-meta-center">
            <span class="masthead-location" id="heroSectorTag">SECTOR: 01 // DEEP SYSTEMS</span>
          </div>
          <div class="masthead-meta-right">
            <span class="masthead-coord">37.77° N, -122.41° W</span>
            <span class="masthead-divider"></span>
            <span class="masthead-status" id="heroStatusTag">STATUS // ACTIVE R&D</span>
          </div>
        </div>
      </div>

      <!-- Center Monumental Editorial Lockup -->
      <div class="container editorial-hero-container">
        <div class="editorial-hero-grid">
          
          <div class="editorial-title-wrap">
            <div class="editorial-kicker">
              <span class="kicker-rule"></span>
              <span class="kicker-text" id="heroKickerText">AN INDEPENDENT GAME & SYSTEMS ATELIER</span>
            </div>

            <h1 class="editorial-monumental-headline" id="heroMainTitle">
              Crafting Worlds <br />
              <em class="headline-italic">from the Void.</em> <br />
              <span class="headline-sans">Computational Play.</span>
            </h1>

            <p class="editorial-lead-prose" id="heroLeadProse">
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

          <!-- Interactive Physics & Telemetry Docket (Right Column) -->
          <div class="editorial-singularity-docket">
            <div class="docket-frame">
              <div class="docket-top">
                <span class="docket-label" id="docketLabel">PHENOMENON // 001</span>
                <span class="docket-id" id="docketId">KERR SINGULARITY</span>
              </div>

              <div class="docket-display-area" aria-hidden="true">
                <div class="docket-crosshair ch-tl">+</div>
                <div class="docket-crosshair ch-tr">+</div>
                <div class="docket-crosshair ch-bl">+</div>
                <div class="docket-crosshair ch-br">+</div>
                <div class="docket-orbit-hint">
                  <span class="hint-val" id="docketOrbitVal">ORBITAL VELOCITY: 0.98c</span>
                  <span class="hint-sub" id="docketOrbitHint">MOVE CURSOR TO CURVE SPACETIME</span>
                </div>
              </div>

              <div class="docket-bottom">
                <div class="docket-stat">
                  <span class="stat-k" id="docketStatK1">MASS RATIO</span>
                  <span class="stat-v" id="docketStatV1">3.14 &times; 10&#8308; M&#9737;</span>
                </div>
                <div class="docket-stat">
                  <span class="stat-k" id="docketStatK2">ACCRETION</span>
                  <span class="stat-v" id="docketStatV2">KEPLERIAN</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        <!-- Telemetry Dock Strip -->
        <div class="editorial-telemetry-dock">
          <div class="telemetry-col">
            <span class="t-kicker">ENGINE PARADIGM</span>
            <span class="t-val" id="telemetryCol1">Vector Kinematics</span>
          </div>
          <div class="telemetry-col">
            <span class="t-kicker">CREATIVE DISCIPLINE</span>
            <span class="t-val" id="telemetryCol2">Emergent Simulation</span>
          </div>
          <div class="telemetry-col">
            <span class="t-kicker">INFRASTRUCTURE</span>
            <span class="t-val" id="telemetryCol3">Zero-Dependency Pure ESM</span>
          </div>
          <div class="telemetry-col">
            <span class="t-kicker">ACTIVE ATMOSPHERE</span>
            <span class="t-val" id="telemetryCol4" style="color: var(--accent-studio);">Cosmic Chiaroscuro</span>
          </div>
        </div>

      </div>
    </section>

    <!-- Component Scoped Styles -->
    <style>
      .editorial-hero {
        position: relative;
        background: var(--bg-canvas);
        color: var(--text-primary);
        overflow: hidden;
        min-height: 85vh;
        display: flex;
        flex-direction: column;
        border-bottom: 1px solid var(--border-subtle);
        transition: background 300ms ease;
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
        border-bottom: 1px solid var(--border-subtle);
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
        background: var(--border-subtle);
      }

      .masthead-tag, .masthead-coord {
        letter-spacing: 0.06em;
      }

      .masthead-status {
        color: var(--accent-studio);
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
        background: var(--accent-studio);
      }

      .kicker-text {
        font-family: var(--font-mono);
        font-size: 0.72rem;
        letter-spacing: 0.16em;
        color: var(--accent-studio);
        font-weight: 600;
        text-transform: uppercase;
      }

      .editorial-monumental-headline {
        font-family: var(--font-serif);
        font-size: clamp(2.5rem, 5.5vw, 4.25rem);
        line-height: 1.08;
        font-weight: 400;
        letter-spacing: -0.02em;
        margin: 0 0 1.85rem 0;
        color: var(--text-primary);
      }

      .headline-italic {
        font-style: italic;
        color: var(--text-primary);
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
        border-radius: 0px;
        font-family: var(--font-mono);
        font-size: 0.8rem;
        font-weight: 600;
        letter-spacing: 0.08em;
        text-decoration: none;
        transition: all 160ms ease;
      }

      .editorial-btn-primary {
        background: var(--text-primary);
        color: var(--bg-canvas);
        border: 1px solid var(--text-primary);
      }

      .editorial-btn-primary:hover {
        background: var(--accent-studio);
        border-color: var(--accent-studio);
        color: #ffffff;
        text-decoration: none;
      }

      .editorial-btn-outline {
        background: transparent;
        border: 1px solid var(--border-strong);
        color: var(--text-primary);
      }

      .editorial-btn-outline:hover {
        background: rgba(255, 255, 255, 0.06);
        border-color: var(--text-primary);
        text-decoration: none;
      }

      /* Singularity Docket (Right Column) */
      .editorial-singularity-docket {
        pointer-events: auto;
      }

      .docket-frame {
        background: var(--bg-surface);
        border: 1px solid var(--border-subtle);
        border-left: 2px solid var(--accent-studio);
        border-radius: 0px;
        padding: 1.5rem;
        backdrop-filter: blur(14px);
        -webkit-backdrop-filter: blur(14px);
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6);
        transition: all 250ms ease;
      }

      .docket-top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-family: var(--font-mono);
        font-size: 0.7rem;
        padding-bottom: 0.75rem;
        margin-bottom: 1rem;
        border-bottom: 1px solid var(--border-subtle);
      }

      .docket-label {
        color: var(--accent-studio);
        font-weight: 700;
        letter-spacing: 0.1em;
      }

      .docket-id {
        color: var(--text-primary);
        font-weight: 600;
        letter-spacing: 0.06em;
      }

      .docket-display-area {
        position: relative;
        height: 140px;
        border: 1px solid var(--border-subtle);
        background: rgba(4, 5, 8, 0.6);
        margin-bottom: 1rem;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .docket-crosshair {
        position: absolute;
        font-family: var(--font-mono);
        font-size: 0.65rem;
        color: var(--text-muted);
        line-height: 1;
      }
      .ch-tl { top: 4px; left: 6px; }
      .ch-tr { top: 4px; right: 6px; }
      .ch-bl { bottom: 4px; left: 6px; }
      .ch-br { bottom: 4px; right: 6px; }

      .docket-orbit-hint {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 4px;
        text-align: center;
        font-family: var(--font-mono);
      }

      .hint-val {
        font-size: 0.75rem;
        color: var(--text-primary);
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
        border-top: 1px solid var(--border-subtle);
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
        color: var(--text-primary);
        font-weight: 600;
      }

      /* Telemetry Dock Strip */
      .editorial-telemetry-dock {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 1.5rem;
        margin-top: clamp(3rem, 5vw, 4.5rem);
        padding-top: 1.75rem;
        border-top: 1px solid var(--border-subtle);
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
        color: var(--text-primary);
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

    <!-- Multi-Atmosphere Dynamic Canvas Engine -->
    <script>
      (function() {
        const canvas = document.getElementById('singularityCanvas');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let width = 0;
        let height = 0;
        let dpr = 1;
        let animId = null;

        // UI Telemetry Elements
        const docketLabel = document.getElementById('docketLabel');
        const docketId = document.getElementById('docketId');
        const docketOrbitVal = document.getElementById('docketOrbitVal');
        const docketOrbitHint = document.getElementById('docketOrbitHint');
        const docketStatK1 = document.getElementById('docketStatK1');
        const docketStatV1 = document.getElementById('docketStatV1');
        const docketStatK2 = document.getElementById('docketStatK2');
        const docketStatV2 = document.getElementById('docketStatV2');
        const telemetryCol4 = document.getElementById('telemetryCol4');

        let currentAtmosphere = document.documentElement.getAttribute('data-atmosphere') || 'chiaroscuro';

        function resize() {
          const rect = canvas.getBoundingClientRect();
          width = rect.width;
          height = rect.height;
          dpr = Math.min(window.devicePixelRatio || 1, 2);
          canvas.width = Math.floor(width * dpr);
          canvas.height = Math.floor(height * dpr);
          ctx.setTransform(1, 0, 0, 1, 0, 0);
          ctx.scale(dpr, dpr);
          initAtmosphere();
        }

        window.addEventListener('resize', resize, { passive: true });

        // Mouse tracking
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

        // -------------------------------------------------------------
        // ATMOSPHERE 01: COSMIC CHIAROSCURO (Remedy Crimson + Singularity)
        // -------------------------------------------------------------
        const PARTICLE_COUNT = 130;
        const cosmicParticles = [];
        const horizonRadius = 38;

        function initCosmic() {
          cosmicParticles.length = 0;
          const cx = width > 960 ? width * 0.75 : width * 0.5;
          const cy = height * 0.5;
          for (let i = 0; i < PARTICLE_COUNT; i++) {
            const angle = Math.random() * Math.PI * 2;
            const dist = horizonRadius + 30 + Math.random() * 260;
            cosmicParticles.push({
              x: cx + Math.cos(angle) * dist,
              y: cy + Math.sin(angle) * dist,
              angle: angle,
              dist: dist,
              size: Math.random() * 1.5 + 0.6,
              brightness: Math.random() * 0.7 + 0.3,
              vx: -Math.sin(angle) * (1.1 + Math.random() * 0.8),
              vy: Math.cos(angle) * (1.1 + Math.random() * 0.8),
              isCrimson: Math.random() < 0.35
            });
          }
        }

        function drawCosmic() {
          ctx.fillStyle = 'rgba(5, 6, 8, 0.22)';
          ctx.fillRect(0, 0, width, height);

          const cx = width > 960 ? width * 0.75 : width * 0.5;
          const cy = height * 0.5;

          // Event Horizon Corona (Remedy Crimson subtle glow)
          const corona = ctx.createRadialGradient(cx, cy, 5, cx, cy, 95);
          corona.addColorStop(0, '#020304');
          corona.addColorStop(0.38, 'rgba(200, 43, 32, 0.28)');
          corona.addColorStop(0.7, 'rgba(15, 18, 24, 0.1)');
          corona.addColorStop(1, 'rgba(0, 0, 0, 0)');
          ctx.fillStyle = corona;
          ctx.beginPath();
          ctx.arc(cx, cy, 95, 0, Math.PI * 2);
          ctx.fill();

          // Black Core
          ctx.fillStyle = '#020304';
          ctx.beginPath();
          ctx.arc(cx, cy, horizonRadius, 0, Math.PI * 2);
          ctx.fill();

          // Horizon Ring
          ctx.strokeStyle = 'rgba(200, 43, 32, 0.75)';
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.arc(cx, cy, horizonRadius + 1, 0, Math.PI * 2);
          ctx.stroke();

          // Particles
          for (let i = 0; i < cosmicParticles.length; i++) {
            const p = cosmicParticles[i];
            const dx = cx - p.x;
            const dy = cy - p.y;
            const distSq = dx * dx + dy * dy;
            const dist = Math.sqrt(distSq);

            const f = 900 / Math.max(distSq, 380);
            p.vx += (dx / dist) * f;
            p.vy += (dy / dist) * f;

            if (mouse.active && mouse.x !== null) {
              const mdx = mouse.x - p.x;
              const mdy = mouse.y - p.y;
              const mdistSq = mdx * mdx + mdy * mdy;
              if (mdistSq < 40000 && mdistSq > 100) {
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

            const alpha = Math.min(p.brightness, (dist - horizonRadius) / 30);
            if (alpha > 0.03) {
              ctx.fillStyle = p.isCrimson
                ? 'rgba(200, 43, 32, ' + alpha + ')'
                : 'rgba(232, 236, 242, ' + alpha + ')';
              ctx.beginPath();
              ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
              ctx.fill();
            }

            if (dist < horizonRadius || p.x < -40 || p.x > width + 40 || p.y < -40 || p.y > height + 40) {
              const spawnAngle = Math.random() * Math.PI * 2;
              const spawnDist = Math.min(width, height) * 0.44 + Math.random() * 40;
              p.x = cx + Math.cos(spawnAngle) * spawnDist;
              p.y = cy + Math.sin(spawnAngle) * spawnDist;
              p.vx = -Math.sin(spawnAngle) * (1.1 + Math.random() * 0.8);
              p.vy = Math.cos(spawnAngle) * (1.1 + Math.random() * 0.8);
            }
          }
        }

        // -------------------------------------------------------------
        // ATMOSPHERE 02: VECTOR BLUEPRINT (Bungie Marathon + 3D Mesh)
        // -------------------------------------------------------------
        let rotX = 0.45;
        let rotY = 0.65;
        let targetRotX = 0.45;
        let targetRotY = 0.65;

        const phi = (1 + Math.sqrt(5)) / 2;
        const ICOSA_VERTICES = [
          [-1,  phi, 0], [ 1,  phi, 0], [-1, -phi, 0], [ 1, -phi, 0],
          [ 0, -1,  phi], [ 0,  1,  phi], [ 0, -1, -phi], [ 0,  1, -phi],
          [ phi, 0, -1], [ phi, 0,  1], [-phi, 0, -1], [-phi, 0,  1]
        ];

        const ICOSA_EDGES = [
          [0,11],[0,5],[0,1],[0,7],[0,10],[1,5],[1,7],[1,8],[1,9],
          [2,11],[2,4],[2,3],[2,6],[2,10],[3,4],[3,6],[3,8],[3,9],
          [4,5],[4,9],[4,11],[5,9],[5,11],[6,7],[6,8],[6,10],[7,8],
          [7,10],[8,9],[10,11]
        ];

        function project3D(v, scale, cx, cy) {
          const cosY = Math.cos(rotY);
          const sinY = Math.sin(rotY);
          let x1 = v[0] * cosY + v[2] * sinY;
          let z1 = -v[0] * sinY + v[2] * cosY;

          const cosX = Math.cos(rotX);
          const sinX = Math.sin(rotX);
          let y2 = v[1] * cosX - z1 * sinX;
          let z2 = v[1] * sinX + z1 * cosX;

          const fov = 3.6;
          const pers = fov / (fov + z2 * 0.5);
          return {
            x: cx + x1 * scale * pers,
            y: cy + y2 * scale * pers,
            z: z2,
            pers: pers
          };
        }

        function drawBlueprint() {
          ctx.fillStyle = '#0c0d10';
          ctx.fillRect(0, 0, width, height);

          // Subtle CAD Grid
          ctx.strokeStyle = 'rgba(240, 242, 245, 0.04)';
          ctx.lineWidth = 1;
          const gridSize = 48;
          for (let x = 0; x < width; x += gridSize) {
            ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
          }
          for (let y = 0; y < height; y += gridSize) {
            ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
          }

          const cx = width > 960 ? width * 0.75 : width * 0.5;
          const cy = height * 0.5;

          if (mouse.active && mouse.x !== null) {
            const ndx = (mouse.x - cx) / (width / 2);
            const ndy = (mouse.y - cy) / (height / 2);
            targetRotY = ndx * 2.2;
            targetRotX = -ndy * 1.5;
          } else {
            targetRotY += 0.006;
            targetRotX = Math.sin(performance.now() * 0.001) * 0.22;
          }

          rotX += (targetRotX - rotX) * 0.08;
          rotY += (targetRotY - rotY) * 0.08;

          const scale = Math.min(width, height) * 0.18;
          const projected = ICOSA_VERTICES.map(v => project3D(v, scale, cx, cy));

          // Draw Edges
          ctx.strokeStyle = 'rgba(240, 242, 245, 0.35)';
          ctx.lineWidth = 1.2;
          for (const [i, j] of ICOSA_EDGES) {
            ctx.beginPath();
            ctx.moveTo(projected[i].x, projected[i].y);
            ctx.lineTo(projected[j].x, projected[j].y);
            ctx.stroke();
          }

          // Draw Marathon Signal Orange Vertex Reticles
          for (const p of projected) {
            ctx.fillStyle = '#ff4d00';
            ctx.beginPath();
            ctx.arc(p.x, p.y, 2.8 * p.pers, 0, Math.PI * 2);
            ctx.fill();
          }

          // Live Reticle Target Box on mouse
          if (mouse.active && mouse.x !== null) {
            ctx.strokeStyle = 'rgba(255, 77, 0, 0.7)';
            ctx.strokeRect(mouse.x - 12, mouse.y - 12, 24, 24);
          }
        }

        // -------------------------------------------------------------
        // ATMOSPHERE 03: ATMOSPHERIC SURREALISM (Playdead Fog + Monoliths)
        // -------------------------------------------------------------
        const spores = [];
        const fogWaves = [
          { speed: 0.20, offset: 0, amp: 24, alpha: 0.14, yRatio: 0.55 },
          { speed: 0.35, offset: 40, amp: 32, alpha: 0.20, yRatio: 0.65 },
          { speed: 0.55, offset: 90, amp: 40, alpha: 0.28, yRatio: 0.78 }
        ];

        function initSurrealism() {
          spores.length = 0;
          for (let i = 0; i < 75; i++) {
            spores.push({
              x: Math.random() * width,
              y: Math.random() * height,
              vx: (Math.random() - 0.5) * 0.25,
              vy: -0.15 - Math.random() * 0.3,
              size: Math.random() * 2 + 1,
              alpha: Math.random() * 0.5 + 0.2
            });
          }
        }

        function drawSurrealism() {
          ctx.fillStyle = '#0a0e14';
          ctx.fillRect(0, 0, width, height);

          const time = performance.now() * 0.001;
          const cx = width > 960 ? width * 0.75 : width * 0.5;

          // Monolithic Spire Silhouettes
          ctx.fillStyle = '#101620';
          ctx.fillRect(cx - 100, height * 0.28, 48, height);
          ctx.fillRect(cx + 20, height * 0.18, 64, height);

          // Volumetric Fog Drift
          for (const f of fogWaves) {
            ctx.fillStyle = 'rgba(16, 22, 32, ' + f.alpha + ')';
            ctx.beginPath();
            ctx.moveTo(0, height);
            const baseY = height * f.yRatio;
            for (let x = 0; x <= width; x += 18) {
              const y = baseY + Math.sin((x * 0.004) + (time * f.speed) + f.offset) * f.amp;
              ctx.lineTo(x, y);
            }
            ctx.lineTo(width, height);
            ctx.closePath();
            ctx.fill();
          }

          // Mouse Ethereal Spotlight
          if (mouse.active && mouse.x !== null) {
            const beam = ctx.createRadialGradient(mouse.x, mouse.y, 10, mouse.x, mouse.y, 200);
            beam.addColorStop(0, 'rgba(72, 107, 114, 0.22)');
            beam.addColorStop(1, 'rgba(0, 0, 0, 0)');
            ctx.fillStyle = beam;
            ctx.beginPath();
            ctx.arc(mouse.x, mouse.y, 200, 0, Math.PI * 2);
            ctx.fill();
          }

          // Ambient Spore Dust
          for (const s of spores) {
            s.x += s.vx;
            s.y += s.vy;

            if (mouse.active && mouse.x !== null) {
              const dx = s.x - mouse.x;
              const dy = s.y - mouse.y;
              const dist = Math.sqrt(dx * dx + dy * dy);
              if (dist < 90 && dist > 1) {
                const repulse = (1 - dist / 90) * 1.5;
                s.x += (dx / dist) * repulse;
                s.y += (dy / dist) * repulse;
              }
            }

            if (s.y < -10) s.y = height + 10;
            if (s.x < -10) s.x = width + 10;
            if (s.x > width + 10) s.x = -10;

            ctx.fillStyle = 'rgba(209, 215, 224, ' + s.alpha + ')';
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
            ctx.fill();
          }
        }

        // Master Atmosphere Switcher
        function initAtmosphere() {
          if (currentAtmosphere === 'chiaroscuro') initCosmic();
          else if (currentAtmosphere === 'blueprint') { rotX = 0.45; rotY = 0.65; }
          else if (currentAtmosphere === 'surrealism') initSurrealism();
          updateDocketUI(currentAtmosphere);
        }

        function updateDocketUI(atmo) {
          if (atmo === 'chiaroscuro') {
            if (docketLabel) docketLabel.textContent = 'PHENOMENON // 001';
            if (docketId) docketId.textContent = 'KERR SINGULARITY';
            if (docketOrbitVal) docketOrbitVal.textContent = 'ORBITAL VELOCITY: 0.98c';
            if (docketOrbitHint) docketOrbitHint.textContent = 'MOVE CURSOR TO CURVE SPACETIME';
            if (docketStatK1) docketStatK1.textContent = 'MASS RATIO';
            if (docketStatV1) docketStatV1.innerHTML = '3.14 &times; 10&#8308; M&#9737;';
            if (docketStatK2) docketStatK2.textContent = 'ACCRETION';
            if (docketStatV2) docketStatV2.textContent = 'KEPLERIAN';
            if (telemetryCol4) telemetryCol4.textContent = 'Cosmic Chiaroscuro';
          } else if (atmo === 'blueprint') {
            if (docketLabel) docketLabel.textContent = 'SYSTEM // 002';
            if (docketId) docketId.textContent = '3D ISOMETRIC RASTER';
            if (docketOrbitVal) docketOrbitVal.textContent = 'CAD MATRIX // MARATHON';
            if (docketOrbitHint) docketOrbitHint.textContent = 'CURSOR VELOCITY DRIVES INERTIA';
            if (docketStatK1) docketStatK1.textContent = 'TOPOLOGY';
            if (docketStatV1) docketStatV1.textContent = 'ICOSAHEDRAL';
            if (docketStatK2) docketStatK2.textContent = 'PRECISION';
            if (docketStatV2) docketStatV2.textContent = 'MILLIMETRIC';
            if (telemetryCol4) telemetryCol4.textContent = 'Vector Blueprint';
          } else if (atmo === 'surrealism') {
            if (docketLabel) docketLabel.textContent = 'EXPEDITION // 003';
            if (docketId) docketId.textContent = 'SILENT MONOLITHS';
            if (docketOrbitVal) docketOrbitVal.textContent = 'DRIFT ELEVATION: 410m';
            if (docketOrbitHint) docketOrbitHint.textContent = 'VOLUMETRIC SEARCHLIGHT BEACON';
            if (docketStatK1) docketStatK1.textContent = 'ATMOSPHERE';
            if (docketStatV1) docketStatV1.textContent = 'VOLUMETRIC FOG';
            if (docketStatK2) docketStatK2.textContent = 'DISCIPLINE';
            if (docketStatV2) docketStatV2.textContent = 'SURREAL CRAFT';
            if (telemetryCol4) telemetryCol4.textContent = 'Atmospheric Surrealism';
          }
        }

        function renderFrame() {
          if (currentAtmosphere === 'chiaroscuro') drawCosmic();
          else if (currentAtmosphere === 'blueprint') drawBlueprint();
          else if (currentAtmosphere === 'surrealism') drawSurrealism();
          animId = requestAnimationFrame(renderFrame);
        }

        // Listen for atmosphere change events
        window.addEventListener('pp:atmosphere-changed', function(e) {
          if (e.detail && e.detail.atmosphere) {
            currentAtmosphere = e.detail.atmosphere;
            initAtmosphere();
          }
        });

        resize();
        animId = requestAnimationFrame(renderFrame);
      })();
    </script>
  `.trim();
}
