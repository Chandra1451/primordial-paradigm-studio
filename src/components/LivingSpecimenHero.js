// =============================================================================
// Primordial Paradigm Studio - Living Specimen Hero Viewport
// High-craft, playable in-situ game simulation viewport.
// Pure vanilla HTML5 Canvas + WebGL-style vector mathematics.
// Zero native dependencies. WCAG AAA contrast compliant.
// =============================================================================

export function renderLivingSpecimenHero() {
  return `
    <section class="specimen-hero-viewport" id="specimenHero">
      <!-- Architectural Canvas Background -->
      <canvas id="specimenCanvas" class="specimen-canvas" aria-label="Interactive Game Engine Physics Viewport"></canvas>

      <!-- Analog Film Grain / Texture Overlay -->
      <div class="analog-texture-overlay" aria-hidden="true"></div>

      <!-- Live Top Telemetry Bar (CAD / Avionics Style) -->
      <div class="hero-telemetry-strip">
        <div class="container telemetry-flex">
          <div class="telemetry-left">
            <span class="telemetry-pill">
              <span class="telemetry-dot"></span>
              PRIMORDIAL ENGINE v1.2
            </span>
            <span class="telemetry-coord">COORD: [37.77° N, -122.41° W]</span>
            <span class="telemetry-coord desktop-only">SECTOR: 01 // FIRST FORM</span>
          </div>

          <div class="telemetry-right">
            <span class="telemetry-stat" id="heroFps">60 FPS</span>
            <span class="telemetry-stat desktop-only" id="heroEntities">ENTITIES: 120</span>
            <button type="button" id="heroMotionBtn" class="telemetry-btn" aria-label="Toggle simulation motion" title="Pause or resume simulation">
              <span class="btn-indicator">&bull;</span>
              <span class="btn-text">RUNNING</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Monumental Editorial Hero Content Layer -->
      <div class="container hero-content-layer">
        <div class="hero-grid-lockup">
          
          <!-- Left / Primary: Monumental Display Typography -->
          <div class="hero-title-column">
            <div class="hero-index-tag">
              <span class="tag-index">[SEC-00]</span>
              <span class="tag-label">INDEPENDENT GAME & SYSTEMS ATELIER</span>
            </div>

            <h1 class="hero-monumental-title">
              Computational <br />
              <span class="title-accent">Worlds.</span> <br />
              Systemic Play.
            </h1>

            <p class="hero-manifesto-lead">
              We design original video games, research emergent physics architectures, and craft precision software from first principles. Zero engine bloat. Pure mechanical craft.
            </p>

            <div class="hero-action-cluster">
              <a href="/games/" class="action-tile action-primary">
                <span class="tile-num">01</span>
                <div class="tile-info">
                  <span class="tile-title">Explore Games & Devlogs</span>
                  <span class="tile-sub">Playable Alpha & Physics Research &rarr;</span>
                </div>
              </a>

              <a href="/learn/" class="action-tile action-secondary">
                <span class="tile-num">02</span>
                <div class="tile-info">
                  <span class="tile-title">Read Systems Essays</span>
                  <span class="tile-sub">Deterministic Architecture &rarr;</span>
                </div>
              </a>
            </div>
          </div>

          <!-- Right / Interactive HUD Deck: Real-Time Engine Telemetry -->
          <div class="hero-hud-column">
            <div class="engine-hud-card">
              <div class="hud-card-header">
                <div class="hud-header-title">
                  <span class="crosshair">+</span>
                  <span>LIVE SPECIMEN: KINEMATICS ENGINE</span>
                </div>
                <span class="hud-status-badge">INTERACTIVE</span>
              </div>

              <div class="hud-card-body">
                <p class="hud-micro-copy">
                  The canvas below is a live 60 FPS vector simulation. Steer the vessel with your cursor or drag to impart velocity and observe momentum damping.
                </p>

                <!-- Interactive Mode Selector -->
                <div class="hud-modes-row" role="group" aria-label="Simulation Mode Selector">
                  <button type="button" class="specimen-mode-btn active" data-specimen="vessel">
                    <span>✦ Kinematic Vessel</span>
                  </button>
                  <button type="button" class="specimen-mode-btn" data-specimen="gravity">
                    <span>◎ Singularity Lens</span>
                  </button>
                  <button type="button" class="specimen-mode-btn" data-specimen="flow">
                    <span>∿ Fluid Vectors</span>
                  </button>
                </div>

                <!-- Live Vector Telemetry Readouts -->
                <div class="hud-telemetry-grid">
                  <div class="telemetry-box">
                    <span class="box-label">VELOCITY (v)</span>
                    <span class="box-value" id="hudVelocity">0.00 px/f</span>
                  </div>
                  <div class="telemetry-box">
                    <span class="box-label">TRAJECTORY (θ)</span>
                    <span class="box-value" id="hudHeading">0.00 rad</span>
                  </div>
                  <div class="telemetry-box">
                    <span class="box-label">SURFACE COEFF (μ)</span>
                    <span class="box-value">0.982 (Standard)</span>
                  </div>
                  <div class="telemetry-box">
                    <span class="box-label">THRUST MAGNITUDE</span>
                    <span class="box-value">1.45G</span>
                  </div>
                </div>

                <div class="hud-interaction-hint">
                  <span class="crosshair">+</span>
                  <span>Click and drag on the background to launch kinetic energy particles</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>

    <style>
      /* =============================================================================
         Specimen Hero Section Styles (Living Atelier)
         ============================================================================= */
      .specimen-hero-viewport {
        position: relative;
        min-height: calc(100vh - var(--nav-height));
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        background: #040508;
        overflow: hidden;
        border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      }

      .specimen-canvas {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        display: block;
        z-index: 0;
      }

      .analog-texture-overlay {
        position: absolute;
        inset: 0;
        pointer-events: none;
        z-index: 1;
        opacity: 0.035;
        background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
      }

      /* Telemetry Strip */
      .hero-telemetry-strip {
        position: relative;
        z-index: 2;
        border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        background: rgba(4, 5, 8, 0.85);
        backdrop-filter: blur(12px);
        padding: 0.65rem 0;
      }

      .telemetry-flex {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-family: var(--font-mono);
        font-size: 0.75rem;
      }

      .telemetry-left, .telemetry-right {
        display: flex;
        align-items: center;
        gap: 1.25rem;
      }

      .telemetry-pill {
        display: inline-flex;
        align-items: center;
        gap: 7px;
        color: var(--accent-amber);
        font-weight: 600;
        letter-spacing: 0.05em;
      }

      .telemetry-dot {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: var(--accent-amber);
        box-shadow: 0 0 8px var(--accent-amber);
        animation: telemetryPulse 2s infinite ease-in-out;
      }

      @keyframes telemetryPulse {
        0%, 100% { opacity: 0.4; }
        50% { opacity: 1; }
      }

      .telemetry-coord {
        color: var(--text-muted);
      }

      .telemetry-stat {
        color: var(--text-muted);
      }

      .telemetry-btn {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        background: rgba(255, 255, 255, 0.04);
        border: 1px solid rgba(255, 255, 255, 0.1);
        color: var(--text-secondary);
        font-family: var(--font-mono);
        font-size: 0.7rem;
        padding: 3px 8px;
        border-radius: 4px;
        cursor: pointer;
        transition: all 150ms ease;
      }

      .telemetry-btn:hover {
        background: rgba(245, 158, 11, 0.12);
        border-color: var(--accent-amber);
        color: var(--accent-amber);
      }

      .telemetry-btn.is-paused .btn-indicator {
        color: var(--status-error);
      }

      /* Hero Content Layer */
      .hero-content-layer {
        position: relative;
        z-index: 2;
        padding-top: clamp(2.5rem, 5vw, 4rem);
        padding-bottom: clamp(3rem, 6vw, 5rem);
        pointer-events: none; /* Let canvas capture mouse, re-enable on interactive elements */
      }

      .hero-grid-lockup {
        display: grid;
        grid-template-columns: 1.15fr 0.85fr;
        gap: clamp(2rem, 5vw, 4.5rem);
        align-items: center;
      }

      .hero-title-column {
        pointer-events: auto;
      }

      .hero-index-tag {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        font-family: var(--font-mono);
        font-size: 0.75rem;
        margin-bottom: 1.25rem;
      }

      .tag-index {
        color: var(--accent-amber);
        font-weight: 700;
      }

      .tag-label {
        color: var(--text-muted);
        letter-spacing: 0.1em;
      }

      .hero-monumental-title {
        font-size: clamp(2.75rem, 5.5vw, 5.25rem);
        line-height: 0.95;
        font-weight: 700;
        letter-spacing: -0.04em;
        color: var(--text-primary);
        margin-bottom: 1.75rem;
      }

      .title-accent {
        color: var(--accent-amber);
        text-shadow: 0 0 40px rgba(245, 158, 11, 0.25);
      }

      .hero-manifesto-lead {
        font-size: clamp(1.05rem, 1.8vw, 1.25rem);
        line-height: 1.6;
        color: var(--text-secondary);
        max-width: 580px;
        margin-bottom: 2.5rem;
      }

      /* Action Tiles */
      .hero-action-cluster {
        display: flex;
        flex-direction: column;
        gap: 0.85rem;
        max-width: 500px;
      }

      .action-tile {
        display: flex;
        align-items: center;
        gap: 1.25rem;
        padding: 1rem 1.35rem;
        border-radius: var(--radius-md);
        text-decoration: none;
        transition: all 200ms cubic-bezier(0.16, 1, 0.3, 1);
        border: 1px solid rgba(255, 255, 255, 0.08);
        background: rgba(10, 13, 20, 0.8);
        backdrop-filter: blur(10px);
      }

      .action-primary {
        border-color: rgba(245, 158, 11, 0.3);
      }

      .action-primary:hover {
        background: rgba(245, 158, 11, 0.12);
        border-color: var(--accent-amber);
        transform: translateX(6px);
      }

      .action-secondary:hover {
        background: rgba(255, 255, 255, 0.06);
        border-color: rgba(255, 255, 255, 0.2);
        transform: translateX(6px);
      }

      .tile-num {
        font-family: var(--font-mono);
        font-size: 0.85rem;
        font-weight: 700;
        color: var(--accent-amber);
      }

      .tile-info {
        display: flex;
        flex-direction: column;
      }

      .tile-title {
        font-weight: 600;
        font-size: 1rem;
        color: var(--text-primary);
      }

      .tile-sub {
        font-family: var(--font-mono);
        font-size: 0.75rem;
        color: var(--text-muted);
      }

      /* Interactive HUD Card (Right Column) */
      .hero-hud-column {
        pointer-events: auto;
      }

      .engine-hud-card {
        background: rgba(8, 11, 16, 0.85);
        border: 1px solid rgba(255, 255, 255, 0.12);
        border-radius: var(--radius-lg);
        padding: clamp(1.25rem, 3vw, 1.75rem);
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.85);
        backdrop-filter: blur(16px);
      }

      .hud-card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-bottom: 0.85rem;
        margin-bottom: 1rem;
        border-bottom: 1px solid rgba(255, 255, 255, 0.06);
      }

      .hud-header-title {
        display: flex;
        align-items: center;
        gap: 8px;
        font-family: var(--font-mono);
        font-size: 0.75rem;
        font-weight: 600;
        color: var(--text-primary);
        letter-spacing: 0.06em;
      }

      .crosshair {
        color: var(--accent-amber);
        font-weight: bold;
      }

      .hud-status-badge {
        font-family: var(--font-mono);
        font-size: 0.65rem;
        padding: 2px 7px;
        border-radius: 3px;
        background: rgba(16, 185, 129, 0.15);
        color: var(--status-success);
        border: 1px solid rgba(16, 185, 129, 0.3);
      }

      .hud-micro-copy {
        font-size: 0.85rem;
        color: var(--text-secondary);
        line-height: 1.5;
        margin-bottom: 1.25rem;
      }

      .hud-modes-row {
        display: flex;
        gap: 6px;
        margin-bottom: 1.25rem;
        background: rgba(4, 5, 8, 0.8);
        padding: 4px;
        border-radius: var(--radius-sm);
        border: 1px solid rgba(255, 255, 255, 0.06);
      }

      .specimen-mode-btn {
        flex: 1;
        background: transparent;
        border: none;
        color: var(--text-muted);
        font-family: var(--font-mono);
        font-size: 0.7rem;
        padding: 6px 8px;
        border-radius: 4px;
        cursor: pointer;
        transition: all 150ms ease;
        text-align: center;
        white-space: nowrap;
      }

      .specimen-mode-btn:hover {
        color: var(--text-primary);
        background: rgba(255, 255, 255, 0.04);
      }

      .specimen-mode-btn.active {
        background: rgba(245, 158, 11, 0.18);
        color: var(--accent-amber);
        border: 1px solid rgba(245, 158, 11, 0.35);
      }

      .hud-telemetry-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 8px;
        margin-bottom: 1.25rem;
      }

      .telemetry-box {
        background: rgba(4, 5, 8, 0.6);
        border: 1px solid rgba(255, 255, 255, 0.05);
        border-radius: 4px;
        padding: 8px 10px;
        display: flex;
        flex-direction: column;
        gap: 3px;
      }

      .box-label {
        font-family: var(--font-mono);
        font-size: 0.65rem;
        color: var(--text-muted);
        letter-spacing: 0.05em;
      }

      .box-value {
        font-family: var(--font-mono);
        font-size: 0.8rem;
        color: var(--text-primary);
        font-weight: 600;
      }

      .hud-interaction-hint {
        display: flex;
        align-items: center;
        gap: 8px;
        font-family: var(--font-mono);
        font-size: 0.7rem;
        color: var(--text-muted);
        border-top: 1px solid rgba(255, 255, 255, 0.06);
        padding-top: 0.85rem;
      }

      /* Responsive Rules */
      @media (max-width: 960px) {
        .hero-grid-lockup {
          grid-template-columns: 1fr;
          gap: 2.5rem;
        }
        .hero-monumental-title {
          font-size: clamp(2.5rem, 8vw, 3.75rem);
        }
      }

      @media (max-width: 600px) {
        .desktop-only { display: none; }
        .hero-action-cluster { width: 100%; }
        .hud-modes-row { flex-direction: column; }
      }
    </style>

    <script>
      (function() {
        const canvas = document.getElementById('specimenCanvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const section = document.getElementById('specimenHero');

        let width = 0;
        let height = 0;
        let dpr = window.devicePixelRatio || 1;
        let isRunning = true;
        let activeMode = 'vessel'; // 'vessel' | 'gravity' | 'flow'
        let animId = null;

        // Telemetry UI DOM
        const fpsEl = document.getElementById('heroFps');
        const hudVelocity = document.getElementById('hudVelocity');
        const hudHeading = document.getElementById('hudHeading');
        const motionBtn = document.getElementById('heroMotionBtn');
        const modeButtons = document.querySelectorAll('.specimen-mode-btn');

        // Physics State: Interactive Vessel
        const vessel = {
          x: 200,
          y: 200,
          vx: 0,
          vy: 0,
          angle: 0,
          thrust: false,
          radius: 12,
          history: [] // vector trail points
        };

        const mouse = { x: null, y: null, isDown: false, lastX: 0, lastY: 0 };
        const particles = [];
        let lastFrameTime = performance.now();
        let frameCounter = 0;
        let fpsTimer = 0;

        // -------------------------------------------------------------
        // Particle Initializer
        // -------------------------------------------------------------
        function initEntities() {
          particles.length = 0;
          for (let i = 0; i < 90; i++) {
            particles.push({
              x: Math.random() * width,
              y: Math.random() * height,
              vx: (Math.random() - 0.5) * 0.8,
              vy: (Math.random() - 0.5) * 0.8,
              size: Math.random() < 0.25 ? 2.0 : 1.0,
              hue: Math.random() < 0.4 ? 38 : 190,
              alpha: Math.random() * 0.6 + 0.2
            });
          }
        }

        function resize() {
          if (!section) return;
          const rect = section.getBoundingClientRect();
          width = rect.width;
          height = rect.height;
          dpr = window.devicePixelRatio || 1;

          canvas.width = width * dpr;
          canvas.height = height * dpr;
          ctx.scale(dpr, dpr);

          if (vessel.x === 200 && vessel.y === 200) {
            vessel.x = width * 0.35;
            vessel.y = height * 0.45;
          }
          if (particles.length === 0) initEntities();
        }

        resize();
        window.addEventListener('resize', resize, { passive: true });

        // -------------------------------------------------------------
        // Pointer / Mouse Listeners
        // -------------------------------------------------------------
        window.addEventListener('pointermove', (e) => {
          const rect = canvas.getBoundingClientRect();
          mouse.x = e.clientX - rect.left;
          mouse.y = e.clientY - rect.top;
        }, { passive: true });

        window.addEventListener('pointerdown', (e) => {
          if (e.target.closest('a') || e.target.closest('button')) return;
          mouse.isDown = true;
          // Spawn kinetic energy pulse at click
          for (let i = 0; i < 14; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 3 + 1.5;
            particles.push({
              x: mouse.x || width / 2,
              y: mouse.y || height / 2,
              vx: Math.cos(angle) * speed,
              vy: Math.sin(angle) * speed,
              size: 2.2,
              hue: 38,
              alpha: 1.0,
              decay: 0.025
            });
          }
        });

        window.addEventListener('pointerup', () => { mouse.isDown = false; });

        // -------------------------------------------------------------
        // Main Render Loop
        // -------------------------------------------------------------
        function render(now) {
          const dt = (now - lastFrameTime) / 1000;
          lastFrameTime = now;

          // FPS Update
          frameCounter++;
          fpsTimer += dt;
          if (fpsTimer >= 0.5) {
            if (fpsEl) fpsEl.textContent = \`\${Math.round(frameCounter / fpsTimer)} FPS\`;
            frameCounter = 0;
            fpsTimer = 0;
          }

          if (isRunning) {
            // Background clear with slight motion persistence
            ctx.fillStyle = 'rgba(4, 5, 8, 0.28)';
            ctx.fillRect(0, 0, width, height);

            // Subtle background coordinate grid
            drawCoordinateGrid();

            if (activeMode === 'vessel') {
              updateAndDrawVessel();
            } else if (activeMode === 'gravity') {
              updateAndDrawGravity();
            } else if (activeMode === 'flow') {
              updateAndDrawFlow(now);
            }

            // Universal ambient particles
            updateAndDrawParticles();
          }

          animId = requestAnimationFrame(render);
        }

        // Draw Architectural Grid
        function drawCoordinateGrid() {
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.025)';
          ctx.lineWidth = 1;
          const step = 80;
          for (let x = 0; x < width; x += step) {
            ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
          }
          for (let y = 0; y < height; y += step) {
            ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
          }
        }

        // -------------------------------------------------------------
        // MODE 1: KINEMATIC VESSEL SIMULATION
        // -------------------------------------------------------------
        function updateAndDrawVessel() {
          // If mouse is active, steer towards mouse
          if (mouse.x !== null && mouse.y !== null) {
            const dx = mouse.x - vessel.x;
            const dy = mouse.y - vessel.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            vessel.angle = Math.atan2(dy, dx);

            if (dist > 30) {
              const accel = Math.min(dist * 0.0035, 0.65);
              vessel.vx += Math.cos(vessel.angle) * accel;
              vessel.vy += Math.sin(vessel.angle) * accel;
              vessel.thrust = true;
            } else {
              vessel.thrust = false;
            }
          }

          // Inertia damping
          vessel.vx *= 0.965;
          vessel.vy *= 0.965;

          vessel.x += vessel.vx;
          vessel.y += vessel.vy;

          // Boundary bounce with damping
          if (vessel.x < 20) { vessel.x = 20; vessel.vx *= -0.5; }
          if (vessel.x > width - 20) { vessel.x = width - 20; vessel.vx *= -0.5; }
          if (vessel.y < 20) { vessel.y = 20; vessel.vy *= -0.5; }
          if (vessel.y > height - 20) { vessel.y = height - 20; vessel.vy *= -0.5; }

          // Record trajectory trail
          const speed = Math.sqrt(vessel.vx * vessel.vx + vessel.vy * vessel.vy);
          vessel.history.push({ x: vessel.x, y: vessel.y, speed });
          if (vessel.history.length > 36) vessel.history.shift();

          // Update HUD telemetry
          if (hudVelocity) hudVelocity.textContent = \`\${speed.toFixed(2)} px/f\`;
          if (hudHeading) hudHeading.textContent = \`\${vessel.angle.toFixed(2)} rad\`;

          // Draw Trajectory Vector Ribbon
          if (vessel.history.length > 2) {
            ctx.beginPath();
            ctx.moveTo(vessel.history[0].x, vessel.history[0].y);
            for (let i = 1; i < vessel.history.length; i++) {
              ctx.lineTo(vessel.history[i].x, vessel.history[i].y);
            }
            ctx.strokeStyle = 'rgba(245, 158, 11, 0.35)';
            ctx.lineWidth = 1.8;
            ctx.stroke();

            // Glow line
            ctx.strokeStyle = 'rgba(245, 158, 11, 0.12)';
            ctx.lineWidth = 5;
            ctx.stroke();
          }

          // Draw Vessel (Geometric Dart)
          ctx.save();
          ctx.translate(vessel.x, vessel.y);
          ctx.rotate(vessel.angle);

          // Thruster flame if accelerating
          if (vessel.thrust && speed > 0.5) {
            ctx.beginPath();
            ctx.moveTo(-10, -4);
            ctx.lineTo(-20 - Math.random() * 8, 0);
            ctx.lineTo(-10, 4);
            ctx.closePath();
            ctx.fillStyle = 'rgba(245, 158, 11, 0.85)';
            ctx.shadowColor = 'rgba(245, 158, 11, 0.8)';
            ctx.shadowBlur = 12;
            ctx.fill();
            ctx.shadowBlur = 0;
          }

          // Ship body
          ctx.beginPath();
          ctx.moveTo(14, 0);
          ctx.lineTo(-10, -9);
          ctx.lineTo(-5, 0);
          ctx.lineTo(-10, 9);
          ctx.closePath();
          ctx.fillStyle = '#0f121a';
          ctx.fill();
          ctx.strokeStyle = 'rgba(245, 158, 11, 0.85)';
          ctx.lineWidth = 1.5;
          ctx.stroke();

          // Cockpit node
          ctx.fillStyle = 'var(--accent-cyan)';
          ctx.beginPath();
          ctx.arc(2, 0, 2.5, 0, Math.PI * 2);
          ctx.fill();

          ctx.restore();
        }

        // -------------------------------------------------------------
        // MODE 2: GRAVITATIONAL SINGULARITY
        // -------------------------------------------------------------
        function updateAndDrawGravity() {
          const cx = width * 0.65;
          const cy = height * 0.5;
          const coreRadius = 24;

          // Event Horizon Aura
          const grad = ctx.createRadialGradient(cx, cy, 2, cx, cy, 80);
          grad.addColorStop(0, '#000');
          grad.addColorStop(0.35, 'rgba(10, 12, 18, 0.9)');
          grad.addColorStop(0.5, 'rgba(245, 158, 11, 0.4)');
          grad.addColorStop(1, 'transparent');

          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(cx, cy, 80, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = '#020305';
          ctx.beginPath();
          ctx.arc(cx, cy, coreRadius, 0, Math.PI * 2);
          ctx.fill();

          ctx.strokeStyle = 'rgba(245, 158, 11, 0.7)';
          ctx.lineWidth = 1.5;
          ctx.stroke();

          // Pull particles
          for (const p of particles) {
            const dx = cx - p.x;
            const dy = cy - p.y;
            const distSq = dx * dx + dy * dy;
            const dist = Math.sqrt(distSq);
            if (dist > coreRadius) {
              const f = 750 / Math.max(distSq, 300);
              p.vx += (dx / dist) * f;
              p.vy += (dy / dist) * f;
            } else {
              p.x = cx + (Math.random() - 0.5) * 300;
              p.y = cy + (Math.random() - 0.5) * 300;
              p.vx = (Math.random() - 0.5) * 1.5;
              p.vy = (Math.random() - 0.5) * 1.5;
            }
          }
        }

        // -------------------------------------------------------------
        // MODE 3: FLUID CURL VECTORS
        // -------------------------------------------------------------
        function updateAndDrawFlow(now) {
          const t = now * 0.0004;
          for (const p of particles) {
            const angle = Math.sin(p.x * 0.005 + t) * Math.cos(p.y * 0.005 + t) * Math.PI * 2;
            p.vx = p.vx * 0.94 + Math.cos(angle) * 0.35;
            p.vy = p.vy * 0.94 + Math.sin(angle) * 0.35;
          }
        }

        // -------------------------------------------------------------
        // Particle Simulation
        // -------------------------------------------------------------
        function updateAndDrawParticles() {
          for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];
            p.x += p.vx;
            p.y += p.vy;

            if (p.decay) {
              p.alpha -= p.decay;
              if (p.alpha <= 0) {
                particles.splice(i, 1);
                continue;
              }
            }

            // Wrap around
            if (p.x < -10) p.x = width + 10;
            if (p.x > width + 10) p.x = -10;
            if (p.y < -10) p.y = height + 10;
            if (p.y > height + 10) p.y = -10;

            ctx.fillStyle = p.hue === 38
              ? \`rgba(245, 158, 11, \${p.alpha})\`
              : \`rgba(6, 182, 212, \${p.alpha})\`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
          }
        }

        // -------------------------------------------------------------
        // Mode Controls
        // -------------------------------------------------------------
        modeButtons.forEach(btn => {
          btn.addEventListener('click', () => {
            modeButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeMode = btn.dataset.specimen;
            ctx.clearRect(0, 0, width, height);
          });
        });

        if (motionBtn) {
          motionBtn.addEventListener('click', () => {
            isRunning = !isRunning;
            const text = motionBtn.querySelector('.btn-text');
            if (isRunning) {
              text.textContent = 'RUNNING';
              motionBtn.classList.remove('is-paused');
            } else {
              text.textContent = 'PAUSED';
              motionBtn.classList.add('is-paused');
            }
          });
        }

        animId = requestAnimationFrame(render);
      })();
    </script>
  `.trim();
}
