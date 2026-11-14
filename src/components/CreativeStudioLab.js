// =============================================================================
// Primordial Paradigm Studio - Creative Direction & Atmospheric Motion Lab
// Interactive visual sandbox providing full-stage previews of three bespoke
// creative directions for the studio:
// 1. Cinematic Cosmic Chiaroscuro (Remedy / Control + Interstellar)
// 2. Tactile Vector Blueprint / Industrial Atelier (Bungie Marathon + Kurppa Hosk)
// 3. Eerie Atmospheric Surrealism (Playdead Inside / Limbo + Fumito Ueda)
// =============================================================================

export function renderCreativeStudioLab() {
  return `
    <div class="creative-lab-stage" id="creativeLab">
      <!-- Master Mood Selector Bar -->
      <div class="lab-mood-bar">
        <div class="mood-bar-kicker">
          <span class="mood-indicator-pip"></span>
          <span class="mood-bar-title">CREATIVE MOOD COMPARATOR //</span>
        </div>

        <div class="lab-mode-switch" role="tablist" aria-label="Creative Atmosphere Directions">
          <button type="button" class="mode-tab active" data-mode="chiaroscuro" role="tab" aria-selected="true" id="tabChiaroscuro">
            <span class="tab-num">01</span>
            <span class="tab-text">COSMIC CHIAROSCURO</span>
            <span class="tab-badge">REMEDY // NOLAN</span>
          </button>
          <button type="button" class="mode-tab" data-mode="blueprint" role="tab" aria-selected="false" id="tabBlueprint">
            <span class="tab-num">02</span>
            <span class="tab-text">VECTOR BLUEPRINT</span>
            <span class="tab-badge">MARATHON // HOSK</span>
          </button>
          <button type="button" class="mode-tab" data-mode="surrealism" role="tab" aria-selected="false" id="tabSurrealism">
            <span class="tab-num">03</span>
            <span class="tab-text">ATMOSPHERIC SURREALISM</span>
            <span class="tab-badge">PLAYDEAD // INSIDE</span>
          </button>
        </div>

        <div class="lab-telemetry-cluster">
          <span class="telemetry-pill" id="labFps">60 FPS</span>
          <span class="telemetry-pill" id="labCoords">LOC: 0.0, 0.0</span>
        </div>
      </div>

      <!-- Main Stage Viewport -->
      <div class="lab-viewport-container" id="labViewportContainer">
        <canvas id="labCanvas"></canvas>

        <!-- Dynamic Texture & Grid Overlays -->
        <div class="lab-grain-overlay" id="labGrainOverlay" aria-hidden="true"></div>
        <div class="lab-cad-grid" id="labCadGrid" aria-hidden="true"></div>

        <!-- Atmospheric Typography & Editorial Overlay -->
        <div class="lab-stage-overlay">
          <!-- Mode 01: Cosmic Chiaroscuro Overlay Content -->
          <div class="mood-overlay-pane active" id="paneChiaroscuro">
            <div class="pane-docket">
              <span class="docket-tag">[DIRECTION 01 // COSMIC CHIAROSCURO]</span>
              <span class="docket-sep">//</span>
              <span class="docket-meta">KERR SINGULARITY &bull; 0.98c ACCRETION</span>
            </div>
            <h2 class="pane-headline serif-headline">
              Crafting Worlds from the Void. <br />
              <span class="accent-headline">Computational Play.</span>
            </h2>
            <p class="pane-lead">
              Deep volumetric atmosphere, analog film grain, and gravitational spacetime lensing. The game universe directly reacts to human presence—light and matter bend around your cursor.
            </p>
            <div class="pane-action-bar">
              <span class="pane-hint">✦ Move cursor across canvas to bend spacetime curvature</span>
            </div>
          </div>

          <!-- Mode 02: Vector Blueprint Overlay Content -->
          <div class="mood-overlay-pane" id="paneBlueprint">
            <div class="pane-docket">
              <span class="docket-tag" style="color: var(--accent-amber);">[DIRECTION 02 // VECTOR BLUEPRINT]</span>
              <span class="docket-sep">//</span>
              <span class="docket-meta">CAD RASTER &bull; 3D ISOMETRIC MESH</span>
            </div>
            <h2 class="pane-headline mono-headline">
              PRIMORDIAL_PARADIGM.SYS <br />
              <span style="color: #f4f4f5; font-size: 0.75em;">// PHYSICAL COMPUTATION & RIGOR</span>
            </h2>
            <p class="pane-lead mono-lead">
              Hyper-precise technical schematics, real-time rotating 3D wireframe polyhedra, and live cursor reticle tracking. An uncompromising skunkworks atelier where games are forged from mathematics.
            </p>
            <div class="pane-action-bar">
              <span class="pane-hint">✦ Cursor velocity drives 3D mesh inertia; reticle computes azimuth</span>
            </div>
          </div>

          <!-- Mode 03: Atmospheric Surrealism Overlay Content -->
          <div class="mood-overlay-pane" id="paneSurrealism">
            <div class="pane-docket">
              <span class="docket-tag" style="color: #cbd5e1;">[DIRECTION 03 // ATMOSPHERIC SURREALISM]</span>
              <span class="docket-sep">//</span>
              <span class="docket-meta">VOLUMETRIC MIST &bull; SILENT MONOLITHS</span>
            </div>
            <h2 class="pane-headline surreal-headline">
              In the Silence of the Void, <br />
              <em>Worlds Await.</em>
            </h2>
            <p class="pane-lead">
              Haunting procedural fog drifting across silhouetted monoliths, ambient dust motes, and poetic spatial tension. Speaks with eerie quiet authority and cinematic atmosphere.
            </p>
            <div class="pane-action-bar">
              <span class="pane-hint">✦ Mouse emits a volumetric beacon through the mist; dust particles scatter</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Parameter & Direction Anatomy Footer -->
      <div class="lab-anatomy-bar">
        <div class="anatomy-metric">
          <span class="metric-label">ATMOSPHERIC MOOD:</span>
          <span class="metric-value" id="currentMoodName">Cinematic Cosmic Chiaroscuro</span>
        </div>
        <div class="anatomy-metric">
          <span class="metric-label">CORE INFLUENCE:</span>
          <span class="metric-value" id="currentMoodInfluence">Remedy Entertainment, Christopher Nolan</span>
        </div>
        <div class="anatomy-metric">
          <span class="metric-label">VISUAL KEYWORDS:</span>
          <span class="metric-value" id="currentMoodKeywords">Volumetric Glow &bull; Spacetime Lensing &bull; Film Grain &bull; Monumental Serif</span>
        </div>
      </div>
    </div>

    <style>
      .creative-lab-stage {
        position: relative;
        background: #040507;
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 0px;
        overflow: hidden;
        margin: var(--space-xl) 0;
        box-shadow: 0 30px 60px rgba(0, 0, 0, 0.85);
      }

      /* Master Mood Bar */
      .lab-mood-bar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.75rem 1.25rem;
        background: #08090d;
        border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        flex-wrap: wrap;
        gap: 1rem;
      }

      .mood-bar-kicker {
        display: inline-flex;
        align-items: center;
        gap: 0.6rem;
        font-family: var(--font-mono);
        font-size: 0.72rem;
        letter-spacing: 0.1em;
        color: #f4f4f5;
        font-weight: 700;
      }

      .mood-indicator-pip {
        width: 6px;
        height: 6px;
        background: var(--accent-amber);
        border-radius: 0px;
      }

      .lab-mode-switch {
        display: flex;
        gap: 0.4rem;
        background: #020304;
        padding: 3px;
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 0px;
      }

      .mode-tab {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        background: transparent;
        border: 1px solid transparent;
        color: var(--text-muted);
        padding: 0.5rem 0.85rem;
        border-radius: 0px;
        font-family: var(--font-mono);
        font-size: 0.72rem;
        letter-spacing: 0.04em;
        cursor: pointer;
        transition: all 150ms ease;
      }

      .mode-tab:hover {
        color: #f4f4f5;
        background: rgba(255, 255, 255, 0.04);
      }

      .mode-tab.active {
        background: #0f1118;
        color: #f4f4f5;
        border-color: rgba(255, 255, 255, 0.2);
      }

      .tab-num {
        color: var(--accent-amber);
        font-weight: 700;
      }

      .tab-badge {
        font-size: 0.62rem;
        opacity: 0.6;
        padding-left: 0.25rem;
        border-left: 1px solid rgba(255, 255, 255, 0.15);
      }

      .lab-telemetry-cluster {
        display: flex;
        gap: 0.5rem;
      }

      .telemetry-pill {
        font-family: var(--font-mono);
        font-size: 0.68rem;
        color: var(--text-muted);
        padding: 3px 8px;
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid rgba(255, 255, 255, 0.06);
        border-radius: 0px;
      }

      /* Viewport Stage */
      .lab-viewport-container {
        position: relative;
        width: 100%;
        height: 560px;
        background: #030406;
        overflow: hidden;
        cursor: crosshair;
      }

      #labCanvas {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        display: block;
      }

      /* Atmospheric Textures */
      .lab-grain-overlay {
        position: absolute;
        inset: 0;
        pointer-events: none;
        opacity: 0.04;
        background-image: radial-gradient(#fff 1px, transparent 1px);
        background-size: 4px 4px;
        mix-blend-mode: overlay;
        display: block;
      }

      .lab-cad-grid {
        position: absolute;
        inset: 0;
        pointer-events: none;
        opacity: 0;
        background-image: 
          linear-gradient(to right, rgba(255, 255, 255, 0.04) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(255, 255, 255, 0.04) 1px, transparent 1px);
        background-size: 48px 48px;
        transition: opacity 300ms ease;
      }

      .lab-cad-grid.is-visible {
        opacity: 1;
      }

      /* Stage Overlay */
      .lab-stage-overlay {
        position: absolute;
        inset: 0;
        pointer-events: none;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        padding: clamp(1.5rem, 4vw, 3rem);
        background: linear-gradient(to top, rgba(3, 4, 6, 0.85) 0%, rgba(3, 4, 6, 0.2) 60%, transparent 100%);
      }

      .mood-overlay-pane {
        display: none;
        max-width: 680px;
        animation: fadeInPane 300ms ease forwards;
      }

      .mood-overlay-pane.active {
        display: block;
      }

      @keyframes fadeInPane {
        from { opacity: 0; transform: translateY(8px); }
        to { opacity: 1; transform: translateY(0); }
      }

      .pane-docket {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        font-family: var(--font-mono);
        font-size: 0.72rem;
        letter-spacing: 0.08em;
        margin-bottom: 0.75rem;
      }

      .docket-tag {
        color: var(--accent-amber);
        font-weight: 700;
      }

      .docket-sep {
        opacity: 0.3;
      }

      .docket-meta {
        color: var(--text-muted);
      }

      .pane-headline {
        margin: 0 0 0.85rem 0;
        color: #f4f4f5;
        line-height: 1.15;
      }

      .serif-headline {
        font-family: var(--font-serif);
        font-size: clamp(1.8rem, 4vw, 2.75rem);
        font-weight: 400;
        letter-spacing: -0.02em;
      }

      .mono-headline {
        font-family: var(--font-mono);
        font-size: clamp(1.3rem, 3vw, 2rem);
        font-weight: 700;
        letter-spacing: 0.05em;
      }

      .surreal-headline {
        font-family: var(--font-serif);
        font-size: clamp(1.8rem, 4.2vw, 2.9rem);
        font-weight: 300;
        letter-spacing: 0.02em;
        font-style: italic;
      }

      .accent-headline {
        color: #f4f4f5;
      }

      .pane-lead {
        font-size: 0.95rem;
        color: var(--text-secondary);
        line-height: 1.6;
        margin: 0 0 1.25rem 0;
      }

      .mono-lead {
        font-family: var(--font-mono);
        font-size: 0.82rem;
        color: #94a3b8;
      }

      .pane-action-bar {
        display: flex;
        align-items: center;
        gap: 1rem;
      }

      .pane-hint {
        font-family: var(--font-mono);
        font-size: 0.72rem;
        color: var(--text-muted);
        background: rgba(8, 9, 13, 0.8);
        border: 1px solid rgba(255, 255, 255, 0.08);
        padding: 4px 10px;
      }

      /* Anatomy Bar */
      .lab-anatomy-bar {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(min(100%, 260px), 1fr));
        gap: 1.25rem;
        padding: 1rem 1.25rem;
        background: #06070a;
        border-top: 1px solid rgba(255, 255, 255, 0.08);
      }

      .anatomy-metric {
        display: flex;
        flex-direction: column;
        gap: 0.2rem;
      }

      .metric-label {
        font-family: var(--font-mono);
        font-size: 0.65rem;
        letter-spacing: 0.1em;
        color: var(--text-muted);
      }

      .metric-value {
        font-family: var(--font-mono);
        font-size: 0.78rem;
        color: #f4f4f5;
        font-weight: 600;
      }

      @media (max-width: 768px) {
        .lab-viewport-container { height: 440px; }
        .lab-mode-switch { flex-direction: column; width: 100%; }
        .mode-tab { width: 100%; }
        .tab-badge { display: none; }
      }
    </style>

    <script>
      (function() {
        const canvas = document.getElementById('labCanvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const container = document.getElementById('labViewportContainer');
        const cadGrid = document.getElementById('labCadGrid');

        let width = 0;
        let height = 0;
        let currentMode = 'chiaroscuro';
        const mouse = { x: null, y: null, active: false };
        let animationFrameId = null;
        let lastFrameTime = performance.now();
        let frameCounter = 0;
        let fpsTimer = 0;

        // UI Elements
        const fpsEl = document.getElementById('labFps');
        const coordsEl = document.getElementById('labCoords');
        const moodNameEl = document.getElementById('currentMoodName');
        const moodInfluenceEl = document.getElementById('currentMoodInfluence');
        const moodKeywordsEl = document.getElementById('currentMoodKeywords');

        const tabs = {
          chiaroscuro: document.getElementById('tabChiaroscuro'),
          blueprint: document.getElementById('tabBlueprint'),
          surrealism: document.getElementById('tabSurrealism')
        };

        const panes = {
          chiaroscuro: document.getElementById('paneChiaroscuro'),
          blueprint: document.getElementById('paneBlueprint'),
          surrealism: document.getElementById('paneSurrealism')
        };

        const MOOD_DATA = {
          chiaroscuro: {
            name: 'Cinematic Cosmic Chiaroscuro',
            influence: 'Remedy Entertainment, Christopher Nolan (Interstellar)',
            keywords: 'Volumetric Glow &bull; Spacetime Lensing &bull; Film Grain &bull; Monumental Serif'
          },
          blueprint: {
            name: 'Tactile Vector Blueprint / Industrial Atelier',
            influence: 'Bungie Marathon, Kurppa Hosk, Teenage Engineering',
            keywords: 'CAD Coordinate Grid &bull; 3D Inertial Wireframe &bull; Live Reticle &bull; Monospace Rigor'
          },
          surrealism: {
            name: 'Eerie Atmospheric Surrealism',
            influence: 'Playdead (Inside, Limbo), Fumito Ueda (Shadow of the Colossus)',
            keywords: 'Layered Drifting Fog &bull; Silhouette Monoliths &bull; Ambient Spores &bull; Poetic Space'
          }
        };

        // Resize Canvas
        function resize() {
          const rect = container.getBoundingClientRect();
          width = rect.width;
          height = rect.height;
          const dpr = window.devicePixelRatio || 1;
          canvas.width = Math.floor(width * dpr);
          canvas.height = Math.floor(height * dpr);
          ctx.setTransform(1, 0, 0, 1, 0, 0);
          ctx.scale(dpr, dpr);
          initCurrentMode();
        }

        window.addEventListener('resize', resize, { passive: true });

        // Mouse listeners
        container.addEventListener('mousemove', e => {
          const rect = container.getBoundingClientRect();
          mouse.x = e.clientX - rect.left;
          mouse.y = e.clientY - rect.top;
          mouse.active = true;
          if (coordsEl) {
            coordsEl.textContent = 'LOC: ' + Math.round(mouse.x) + '.0, ' + Math.round(mouse.y) + '.0';
          }
        });

        container.addEventListener('mouseleave', () => {
          mouse.active = false;
        });

        // =============================================================
        // ENGINE 01: COSMIC CHIAROSCURO (Gravitational Singularity)
        // =============================================================
        const cosmicParticles = [];
        function initChiaroscuro() {
          cosmicParticles.length = 0;
          const count = 320;
          const cx = width / 2;
          const cy = height * 0.42;
          for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const dist = Math.random() * (Math.min(width, height) * 0.5) + 35;
            cosmicParticles.push({
              x: cx + Math.cos(angle) * dist,
              y: cy + Math.sin(angle) * dist,
              vx: -Math.sin(angle) * (1.1 + Math.random() * 0.9),
              vy: Math.cos(angle) * (1.1 + Math.random() * 0.9),
              size: Math.random() < 0.25 ? 2.0 : 1.1,
              isAmber: Math.random() < 0.4,
              brightness: Math.random() * 0.7 + 0.3
            });
          }
        }

        function drawChiaroscuro() {
          ctx.fillStyle = 'rgba(3, 4, 6, 0.22)';
          ctx.fillRect(0, 0, width, height);

          const cx = width / 2;
          const cy = height * 0.42;
          const eventHorizon = 26;

          // Horizon ambient glow
          const glowGrad = ctx.createRadialGradient(cx, cy, 2, cx, cy, Math.min(width, height) * 0.45);
          glowGrad.addColorStop(0, 'rgba(0, 0, 0, 1)');
          glowGrad.addColorStop(0.35, 'rgba(229, 155, 32, 0.22)');
          glowGrad.addColorStop(0.65, 'rgba(15, 18, 26, 0.15)');
          glowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
          ctx.fillStyle = glowGrad;
          ctx.beginPath();
          ctx.arc(cx, cy, Math.min(width, height) * 0.45, 0, Math.PI * 2);
          ctx.fill();

          // Black hole core
          ctx.fillStyle = '#020204';
          ctx.beginPath();
          ctx.arc(cx, cy, eventHorizon, 0, Math.PI * 2);
          ctx.fill();

          // Gold Event Horizon Ring
          ctx.strokeStyle = 'rgba(229, 155, 32, 0.85)';
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.arc(cx, cy, eventHorizon + 1, 0, Math.PI * 2);
          ctx.stroke();

          // Accretion particles with spacetime bending on mouse
          for (const p of cosmicParticles) {
            const dx = cx - p.x;
            const dy = cy - p.y;
            const distSq = dx * dx + dy * dy;
            const dist = Math.sqrt(distSq);

            const force = 1100 / Math.max(distSq, 500);
            p.vx += (dx / dist) * force;
            p.vy += (dy / dist) * force;

            // Spacetime curvature on mouse
            if (mouse.active && mouse.x !== null) {
              const mdx = mouse.x - p.x;
              const mdy = mouse.y - p.y;
              const mdistSq = mdx * mdx + mdy * mdy;
              if (mdistSq < 50000 && mdistSq > 100) {
                const mdist = Math.sqrt(mdistSq);
                const mforce = 750 / mdistSq;
                p.vx += (mdx / mdist) * mforce;
                p.vy += (mdy / mdist) * mforce;
              }
            }

            p.vx *= 0.985;
            p.vy *= 0.985;
            p.x += p.vx;
            p.y += p.vy;

            const alpha = Math.min(p.brightness, (dist - eventHorizon) / 30);
            if (alpha > 0.03) {
              ctx.fillStyle = p.isAmber ? 'rgba(229, 155, 32, ' + alpha + ')' : 'rgba(244, 244, 245, ' + alpha + ')';
              ctx.beginPath();
              ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
              ctx.fill();
            }

            if (dist < eventHorizon || p.x < -40 || p.x > width + 40 || p.y < -40 || p.y > height + 40) {
              const spawnAngle = Math.random() * Math.PI * 2;
              const spawnDist = Math.min(width, height) * 0.44 + Math.random() * 50;
              p.x = cx + Math.cos(spawnAngle) * spawnDist;
              p.y = cy + Math.sin(spawnAngle) * spawnDist;
              p.vx = -Math.sin(spawnAngle) * (1.2 + Math.random() * 0.8);
              p.vy = Math.cos(spawnAngle) * (1.2 + Math.random() * 0.8);
            }
          }
        }

        // =============================================================
        // ENGINE 02: TACTILE VECTOR BLUEPRINT (3D Wireframe + Reticle)
        // =============================================================
        let rotX = 0.45;
        let rotY = 0.7;
        let targetRotX = 0.45;
        let targetRotY = 0.7;

        // 3D Icosahedron Vertices & Edges
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

        function initBlueprint() {
          rotX = 0.45;
          rotY = 0.7;
        }

        function drawBlueprint() {
          ctx.fillStyle = '#030406';
          ctx.fillRect(0, 0, width, height);

          const cx = width / 2;
          const cy = height * 0.42;

          // Interactive 3D Rotation driven by mouse
          if (mouse.active && mouse.x !== null) {
            const ndx = (mouse.x - cx) / (width / 2);
            const ndy = (mouse.y - cy) / (height / 2);
            targetRotY = ndx * 2.2;
            targetRotX = -ndy * 1.5;
          } else {
            targetRotY += 0.007;
            targetRotX = Math.sin(performance.now() * 0.001) * 0.25;
          }

          rotX += (targetRotX - rotX) * 0.08;
          rotY += (targetRotY - rotY) * 0.08;

          const scale = Math.min(width, height) * 0.16;
          const projected = ICOSA_VERTICES.map(v => project3D(v, scale, cx, cy));

          // Draw 3D Edges
          ctx.strokeStyle = 'rgba(244, 244, 245, 0.45)';
          ctx.lineWidth = 1.2;
          for (const [i, j] of ICOSA_EDGES) {
            ctx.beginPath();
            ctx.moveTo(projected[i].x, projected[i].y);
            ctx.lineTo(projected[j].x, projected[j].y);
            ctx.stroke();
          }

          // Draw Vertex Reticles
          for (const p of projected) {
            ctx.fillStyle = 'rgba(229, 155, 32, 0.95)';
            ctx.beginPath();
            ctx.arc(p.x, p.y, 2.5 * p.pers, 0, Math.PI * 2);
            ctx.fill();
          }

          // Real-time Mouse Reticle Crosshairs (Marathon Style)
          if (mouse.active && mouse.x !== null) {
            ctx.strokeStyle = 'rgba(229, 155, 32, 0.35)';
            ctx.lineWidth = 1;
            ctx.setLineDash([4, 4]);

            // Horizontal hairline
            ctx.beginPath();
            ctx.moveTo(0, mouse.y);
            ctx.lineTo(width, mouse.y);
            ctx.stroke();

            // Vertical hairline
            ctx.beginPath();
            ctx.moveTo(mouse.x, 0);
            ctx.lineTo(mouse.x, height);
            ctx.stroke();

            ctx.setLineDash([]);

            // Reticle Target Box
            ctx.strokeStyle = 'rgba(229, 155, 32, 0.8)';
            ctx.strokeRect(mouse.x - 14, mouse.y - 14, 28, 28);

            // Coordinates Tag
            ctx.fillStyle = '#e59b20';
            ctx.font = '10px monospace';
            ctx.fillText('[' + Math.round(mouse.x) + ', ' + Math.round(mouse.y) + ']', mouse.x + 18, mouse.y - 6);
          }

          // Bottom Oscilloscope Waveform
          ctx.strokeStyle = 'rgba(244, 244, 245, 0.25)';
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          const waveY = height - 20;
          for (let x = 0; x < width; x += 6) {
            const freq = (x * 0.015) + (performance.now() * 0.003);
            const amp = Math.sin(freq) * Math.cos(freq * 0.5) * 12;
            if (x === 0) ctx.moveTo(x, waveY + amp);
            else ctx.lineTo(x, waveY + amp);
          }
          ctx.stroke();
        }

        // =============================================================
        // ENGINE 03: ATMOSPHERIC SURREALISM (Fog Drift & Silhouettes)
        // =============================================================
        const spores = [];
        const fogWaves = [
          { speed: 0.25, offset: 0, amp: 28, alpha: 0.12, yRatio: 0.52 },
          { speed: 0.40, offset: 40, amp: 35, alpha: 0.18, yRatio: 0.62 },
          { speed: 0.65, offset: 90, amp: 45, alpha: 0.26, yRatio: 0.75 }
        ];

        function initSurrealism() {
          spores.length = 0;
          for (let i = 0; i < 90; i++) {
            spores.push({
              x: Math.random() * width,
              y: Math.random() * height,
              vx: (Math.random() - 0.5) * 0.3,
              vy: -0.2 - Math.random() * 0.4,
              size: Math.random() * 2 + 1,
              alpha: Math.random() * 0.6 + 0.2
            });
          }
        }

        function drawSurrealism() {
          // Deep Charcoal Void
          ctx.fillStyle = '#040507';
          ctx.fillRect(0, 0, width, height);

          const time = performance.now() * 0.001;

          // Monolithic Architecture Silhouettes in background
          ctx.fillStyle = '#090b10';
          const spireWidth = 44;
          const cx = width / 2;
          ctx.fillRect(cx - 180, height * 0.25, spireWidth, height);
          ctx.fillRect(cx - 30, height * 0.15, spireWidth * 1.5, height);
          ctx.fillRect(cx + 140, height * 0.32, spireWidth * 0.9, height);

          // Volumetric Mist / Fog Layers
          for (const f of fogWaves) {
            ctx.fillStyle = 'rgba(15, 20, 28, ' + f.alpha + ')';
            ctx.beginPath();
            ctx.moveTo(0, height);
            const baseY = height * f.yRatio;
            for (let x = 0; x <= width; x += 15) {
              const y = baseY + Math.sin((x * 0.004) + (time * f.speed) + f.offset) * f.amp;
              ctx.lineTo(x, y);
            }
            ctx.lineTo(width, height);
            ctx.closePath();
            ctx.fill();
          }

          // Cursor Atmospheric Spotlight Beam
          if (mouse.active && mouse.x !== null) {
            const beamGrad = ctx.createRadialGradient(mouse.x, mouse.y, 10, mouse.x, mouse.y, 220);
            beamGrad.addColorStop(0, 'rgba(244, 244, 245, 0.15)');
            beamGrad.addColorStop(0.5, 'rgba(229, 155, 32, 0.05)');
            beamGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
            ctx.fillStyle = beamGrad;
            ctx.beginPath();
            ctx.arc(mouse.x, mouse.y, 220, 0, Math.PI * 2);
            ctx.fill();
          }

          // Drifting Spores / Dust Motes
          for (const s of spores) {
            s.x += s.vx;
            s.y += s.vy;

            // Mouse fluid repulsion
            if (mouse.active && mouse.x !== null) {
              const dx = s.x - mouse.x;
              const dy = s.y - mouse.y;
              const dist = Math.sqrt(dx * dx + dy * dy);
              if (dist < 100 && dist > 1) {
                const repulse = (1 - dist / 100) * 1.8;
                s.x += (dx / dist) * repulse;
                s.y += (dy / dist) * repulse;
              }
            }

            if (s.y < -10) s.y = height + 10;
            if (s.x < -10) s.x = width + 10;
            if (s.x > width + 10) s.x = -10;

            ctx.fillStyle = 'rgba(244, 244, 245, ' + s.alpha + ')';
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
            ctx.fill();
          }
        }

        // Master Animation Loop
        function initCurrentMode() {
          if (currentMode === 'chiaroscuro') initChiaroscuro();
          else if (currentMode === 'blueprint') initBlueprint();
          else if (currentMode === 'surrealism') initSurrealism();
        }

        function renderFrame() {
          if (currentMode === 'chiaroscuro') drawChiaroscuro();
          else if (currentMode === 'blueprint') drawBlueprint();
          else if (currentMode === 'surrealism') drawSurrealism();

          // FPS counter
          frameCounter++;
          const now = performance.now();
          if (now - fpsTimer >= 1000) {
            if (fpsEl) fpsEl.textContent = frameCounter + ' FPS';
            frameCounter = 0;
            fpsTimer = now;
          }

          animationFrameId = requestAnimationFrame(renderFrame);
        }

        // Mode Switching Handler
        function setMode(mode) {
          if (!MOOD_DATA[mode]) return;
          currentMode = mode;

          // Update Tabs
          Object.keys(tabs).forEach(m => {
            if (tabs[m]) {
              const isActive = m === mode;
              tabs[m].classList.toggle('active', isActive);
              tabs[m].setAttribute('aria-selected', isActive ? 'true' : 'false');
            }
          });

          // Update Panes
          Object.keys(panes).forEach(m => {
            if (panes[m]) {
              panes[m].classList.toggle('active', m === mode);
            }
          });

          // Update Overlays
          if (cadGrid) {
            cadGrid.classList.toggle('is-visible', mode === 'blueprint');
          }

          // Update Anatomy Data
          const data = MOOD_DATA[mode];
          if (moodNameEl) moodNameEl.textContent = data.name;
          if (moodInfluenceEl) moodInfluenceEl.textContent = data.influence;
          if (moodKeywordsEl) moodKeywordsEl.innerHTML = data.keywords;

          initCurrentMode();
        }

        // Bind Mode Tabs
        Object.keys(tabs).forEach(m => {
          if (tabs[m]) {
            tabs[m].addEventListener('click', () => setMode(m));
          }
        });

        // Initialize
        resize();
        animationFrameId = requestAnimationFrame(renderFrame);

        // Expose to window for testing / automated capture
        window.__setCreativeMood = setMode;
      })();
    </script>
  `.trim();
}
