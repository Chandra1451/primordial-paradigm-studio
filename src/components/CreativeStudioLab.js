// =============================================================================
// Primordial Paradigm Studio - Creative Direction & Motion Lab
// Interactive visual sandbox allowing real-time testing of:
// 1. Gravitational Singularity (Accretion Lens)
// 2. Procedural Vector Flow Field (Curl-Noise Fluid)
// 3. Kinetic Sacred Geometry (3D Isometric Wireframe)
// =============================================================================

export function renderCreativeStudioLab() {
  return `
    <div class="creative-lab-container" id="creativeLab">
      <!-- Top Control Deck -->
      <div class="lab-controls-deck">
        <div class="lab-badge">
          <span class="lab-dot"></span>
          CREATIVE LAB // EXPERIMENTAL SHADERS & MOTION
        </div>

        <div class="lab-mode-switch" role="tablist" aria-label="Creative Animation Modes">
          <button type="button" class="mode-btn active" data-mode="singularity" role="tab" aria-selected="true">
            <span class="mode-num">01</span>
            <span class="mode-label">Gravitational Singularity</span>
          </button>
          <button type="button" class="mode-btn" data-mode="flowfield" role="tab" aria-selected="false">
            <span class="mode-num">02</span>
            <span class="mode-label">Procedural Flow Field</span>
          </button>
          <button type="button" class="mode-btn" data-mode="geometry" data-role="tab" aria-selected="false">
            <span class="mode-num">03</span>
            <span class="mode-label">Kinetic Sacred Geometry</span>
          </button>
        </div>

        <div class="lab-telemetry">
          <span class="telemetry-item" id="labFps">FPS: 60</span>
          <span class="telemetry-sep">|</span>
          <span class="telemetry-item" id="labParticles">ENTITIES: 250</span>
        </div>
      </div>

      <!-- Main Interactive Viewport -->
      <div class="lab-viewport-wrapper">
        <canvas id="labCanvas"></canvas>

        <!-- Dynamic Overlay Information -->
        <div class="lab-hud-overlay">
          <div class="hud-top-left">
            <div class="hud-title" id="modeTitle">MODE 01 // GRAVITATIONAL SINGULARITY</div>
            <div class="hud-desc" id="modeDesc">
              Simulating Schwarzschild gravitational accretion. Particles orbit a central black core; light curves along spacetime curvature. Cursor exerts secondary gravitational attraction.
            </div>
          </div>

          <div class="hud-bottom-right">
            <div class="hud-hint">
              <span class="hint-icon">✦</span> Move cursor across viewport to interact with the physics field
            </div>
          </div>
        </div>
      </div>

      <!-- Interactive Parameter Sliders -->
      <div class="lab-parameters-bar">
        <div class="param-group">
          <label for="speedSlider">Simulation Velocity</label>
          <input type="range" id="speedSlider" min="0.2" max="2.5" step="0.1" value="1.0" />
        </div>
        <div class="param-group">
          <label for="densitySlider">Entity Density</label>
          <input type="range" id="densitySlider" min="50" max="600" step="50" value="250" />
        </div>
        <div class="param-group">
          <button type="button" id="labResetBtn" class="lab-btn">Reset Vectors</button>
        </div>
      </div>
    </div>

    <style>
      .creative-lab-container {
        position: relative;
        background: #06070a;
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: var(--radius-lg);
        overflow: hidden;
        margin: var(--space-xl) 0;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.7);
      }

      .lab-controls-deck {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: var(--space-sm) var(--space-md);
        background: rgba(15, 18, 26, 0.85);
        border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        flex-wrap: wrap;
        gap: var(--space-sm);
      }

      .lab-badge {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        font-family: var(--font-mono);
        font-size: 0.75rem;
        letter-spacing: 0.08em;
        color: var(--accent-amber);
        text-transform: uppercase;
        font-weight: 600;
      }

      .lab-dot {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: var(--accent-amber);
        box-shadow: 0 0 8px var(--accent-amber);
        animation: labPulse 2s infinite ease-in-out;
      }

      @keyframes labPulse {
        0%, 100% { opacity: 0.4; transform: scale(0.9); }
        50% { opacity: 1; transform: scale(1.15); }
      }

      .lab-mode-switch {
        display: flex;
        gap: 6px;
        background: rgba(8, 9, 13, 0.9);
        padding: 4px;
        border-radius: var(--radius-sm);
        border: 1px solid rgba(255, 255, 255, 0.06);
      }

      .mode-btn {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        background: transparent;
        border: none;
        color: var(--text-muted);
        padding: 6px 12px;
        border-radius: 4px;
        font-family: var(--font-mono);
        font-size: 0.75rem;
        cursor: pointer;
        transition: all 180ms ease;
      }

      .mode-btn:hover {
        color: var(--text-primary);
        background: rgba(255, 255, 255, 0.04);
      }

      .mode-btn.active {
        background: rgba(245, 158, 11, 0.15);
        color: var(--accent-amber);
        border: 1px solid rgba(245, 158, 11, 0.3);
      }

      .mode-num {
        font-weight: 700;
        opacity: 0.7;
      }

      .lab-telemetry {
        font-family: var(--font-mono);
        font-size: 0.75rem;
        color: var(--text-muted);
        display: flex;
        gap: 8px;
        align-items: center;
      }

      .lab-viewport-wrapper {
        position: relative;
        width: 100%;
        height: 520px;
        background: #040508;
        cursor: crosshair;
        overflow: hidden;
      }

      #labCanvas {
        display: block;
        width: 100%;
        height: 100%;
      }

      .lab-hud-overlay {
        position: absolute;
        inset: 0;
        pointer-events: none;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: var(--space-md);
      }

      .hud-title {
        font-family: var(--font-mono);
        font-size: 0.85rem;
        font-weight: 700;
        letter-spacing: 0.06em;
        color: var(--text-primary);
        margin-bottom: 4px;
      }

      .hud-desc {
        font-size: 0.825rem;
        color: var(--text-secondary);
        max-width: 480px;
        line-height: 1.45;
        background: rgba(6, 7, 10, 0.75);
        backdrop-filter: blur(8px);
        padding: 8px 12px;
        border-radius: var(--radius-sm);
        border-left: 2px solid var(--accent-amber);
      }

      .hud-hint {
        align-self: flex-end;
        font-family: var(--font-mono);
        font-size: 0.75rem;
        color: var(--text-muted);
        background: rgba(6, 7, 10, 0.75);
        backdrop-filter: blur(8px);
        padding: 6px 12px;
        border-radius: var(--radius-sm);
        border: 1px solid rgba(255, 255, 255, 0.06);
      }

      .hint-icon {
        color: var(--accent-amber);
      }

      .lab-parameters-bar {
        display: flex;
        align-items: center;
        gap: var(--space-lg);
        padding: var(--space-sm) var(--space-md);
        background: rgba(15, 18, 26, 0.95);
        border-top: 1px solid rgba(255, 255, 255, 0.08);
        flex-wrap: wrap;
      }

      .param-group {
        display: flex;
        align-items: center;
        gap: 10px;
        font-family: var(--font-mono);
        font-size: 0.75rem;
        color: var(--text-secondary);
      }

      .param-group input[type="range"] {
        accent-color: var(--accent-amber);
        cursor: pointer;
      }

      .lab-btn {
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.12);
        color: var(--text-primary);
        font-family: var(--font-mono);
        font-size: 0.75rem;
        padding: 5px 12px;
        border-radius: 4px;
        cursor: pointer;
        transition: all 150ms ease;
      }

      .lab-btn:hover {
        background: rgba(245, 158, 11, 0.15);
        border-color: var(--accent-amber);
        color: var(--accent-amber);
      }

      @media (max-width: 680px) {
        .lab-viewport-wrapper { height: 380px; }
        .hud-desc { display: none; }
      }
    </style>

    <script>
      (function() {
        const canvas = document.getElementById('labCanvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const container = document.getElementById('creativeLab');

        let width = 0;
        let height = 0;
        let dpr = window.devicePixelRatio || 1;
        let currentMode = 'singularity';
        let speedMultiplier = 1.0;
        let entityCount = 250;

        const mouse = { x: null, y: null, active: false };
        let animationFrameId = null;
        let lastTime = performance.now();
        let frameCount = 0;
        let fpsTimer = 0;

        // UI elements
        const fpsEl = document.getElementById('labFps');
        const particlesEl = document.getElementById('labParticles');
        const modeTitle = document.getElementById('modeTitle');
        const modeDesc = document.getElementById('modeDesc');
        const speedSlider = document.getElementById('speedSlider');
        const densitySlider = document.getElementById('densitySlider');
        const resetBtn = document.getElementById('labResetBtn');

        // Mode Data Descriptions
        const MODE_INFO = {
          singularity: {
            title: 'MODE 01 // GRAVITATIONAL SINGULARITY',
            desc: 'Simulating Schwarzschild gravitational accretion. Luminous photons and dark matter particles spiral along Keplerian orbits into the void core. Mouse cursor acts as a moving gravitational mass.'
          },
          flowfield: {
            title: 'MODE 02 // PROCEDURAL VECTOR FLOW FIELD',
            desc: 'Curl-noise vector fluid simulation. Phosphor particles follow continuous trigonometric force lines across obsidian space. Cursor imparts hydrodynamic turbulence and fluid eddies.'
          },
          geometry: {
            title: 'MODE 03 // KINETIC SACRED GEOMETRY',
            desc: '3D isometric matrix wireframe of the First Form core. Rotates through higher dimensions with inertial physics, chromatic edge fringing, and dynamic light vertices.'
          }
        };

        // -------------------------------------------------------------
        // ENGINE 1: GRAVITATIONAL SINGULARITY
        // -------------------------------------------------------------
        const singularityParticles = [];

        function initSingularity() {
          singularityParticles.length = 0;
          const cx = width / 2;
          const cy = height / 2;
          for (let i = 0; i < entityCount; i++) {
            const angle = Math.random() * Math.PI * 2;
            const dist = Math.random() * (Math.min(width, height) * 0.45) + 30;
            singularityParticles.push({
              x: cx + Math.cos(angle) * dist,
              y: cy + Math.sin(angle) * dist,
              vx: -Math.sin(angle) * (1.2 + Math.random() * 0.8),
              vy: Math.cos(angle) * (1.2 + Math.random() * 0.8),
              size: Math.random() < 0.2 ? 2.2 : 1.2,
              hue: Math.random() < 0.35 ? 38 : 190, // amber vs cyan
              brightness: Math.random() * 0.6 + 0.4,
              life: Math.random() * 200 + 50
            });
          }
        }

        function updateAndDrawSingularity(dt) {
          // Semi-transparent fade for cosmic motion blur
          ctx.fillStyle = 'rgba(4, 5, 8, 0.18)';
          ctx.fillRect(0, 0, width, height);

          const cx = width / 2;
          const cy = height / 2;
          const eventHorizon = 28;

          // Draw Central Singularity & Event Horizon Corona
          const coreGrad = ctx.createRadialGradient(cx, cy, 2, cx, cy, 75);
          coreGrad.addColorStop(0, 'rgba(0, 0, 0, 1)');
          coreGrad.addColorStop(0.35, 'rgba(10, 12, 18, 0.95)');
          coreGrad.addColorStop(0.42, 'rgba(245, 158, 11, 0.45)');
          coreGrad.addColorStop(0.55, 'rgba(6, 182, 212, 0.2)');
          coreGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

          ctx.fillStyle = coreGrad;
          ctx.beginPath();
          ctx.arc(cx, cy, 75, 0, Math.PI * 2);
          ctx.fill();

          // Black core void
          ctx.fillStyle = '#020305';
          ctx.beginPath();
          ctx.arc(cx, cy, eventHorizon, 0, Math.PI * 2);
          ctx.fill();

          // Event Horizon Ring
          ctx.strokeStyle = 'rgba(245, 158, 11, 0.65)';
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.arc(cx, cy, eventHorizon + 1, 0, Math.PI * 2);
          ctx.stroke();

          // Orbiting particles
          for (const p of singularityParticles) {
            const dx = cx - p.x;
            const dy = cy - p.y;
            const distSq = dx * dx + dy * dy;
            const dist = Math.sqrt(distSq);

            // Gravitational pull towards center (inverse square)
            const force = (950 / Math.max(distSq, 400)) * speedMultiplier;
            p.vx += (dx / dist) * force;
            p.vy += (dy / dist) * force;

            // Secondary gravitational pull from mouse
            if (mouse.active && mouse.x !== null) {
              const mdx = mouse.x - p.x;
              const mdy = mouse.y - p.y;
              const mdistSq = mdx * mdx + mdy * mdy;
              if (mdistSq < 40000 && mdistSq > 100) {
                const mdist = Math.sqrt(mdistSq);
                const mforce = (600 / mdistSq) * speedMultiplier;
                p.vx += (mdx / mdist) * mforce;
                p.vy += (mdy / mdist) * mforce;
              }
            }

            // Damping / terminal velocity
            p.vx *= 0.988;
            p.vy *= 0.988;

            p.x += p.vx * speedMultiplier;
            p.y += p.vy * speedMultiplier;

            // Render photon / particle
            const alpha = Math.min(p.brightness, (dist - eventHorizon) / 30);
            if (alpha > 0.02) {
              ctx.fillStyle = p.hue === 38
                ? \`rgba(245, 158, 11, \${alpha})\`
                : \`rgba(6, 182, 212, \${alpha})\`;
              ctx.beginPath();
              ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
              ctx.fill();
            }

            // Respawn particle if consumed by event horizon or offscreen
            if (dist < eventHorizon || p.x < -50 || p.x > width + 50 || p.y < -50 || p.y > height + 50) {
              const spawnAngle = Math.random() * Math.PI * 2;
              const spawnDist = Math.min(width, height) * 0.42 + Math.random() * 60;
              p.x = cx + Math.cos(spawnAngle) * spawnDist;
              p.y = cy + Math.sin(spawnAngle) * spawnDist;
              p.vx = -Math.sin(spawnAngle) * (1.1 + Math.random() * 0.9);
              p.vy = Math.cos(spawnAngle) * (1.1 + Math.random() * 0.9);
            }
          }
        }

        // -------------------------------------------------------------
        // ENGINE 2: PROCEDURAL FLOW FIELD (CURL NOISE FLUID)
        // -------------------------------------------------------------
        const flowParticles = [];

        function initFlowField() {
          flowParticles.length = 0;
          for (let i = 0; i < entityCount; i++) {
            flowParticles.push({
              x: Math.random() * width,
              y: Math.random() * height,
              vx: 0,
              vy: 0,
              size: Math.random() < 0.2 ? 1.8 : 1.0,
              age: Math.random() * 100,
              maxAge: 80 + Math.random() * 120,
              hue: Math.random() < 0.4 ? 38 : 185
            });
          }
        }

        function updateAndDrawFlowField(dt) {
          ctx.fillStyle = 'rgba(4, 5, 8, 0.12)';
          ctx.fillRect(0, 0, width, height);

          const time = performance.now() * 0.0003 * speedMultiplier;

          for (const p of flowParticles) {
            // Trigonometric curl-noise field approximation
            const scale = 0.0045;
            const angle =
              Math.sin(p.x * scale + time) * Math.cos(p.y * scale + time) * Math.PI * 2 +
              Math.sin(p.y * scale * 2 - time) * 0.8;

            const fx = Math.cos(angle) * 1.5;
            const fy = Math.sin(angle) * 1.5;

            p.vx = p.vx * 0.92 + fx * 0.08;
            p.vy = p.vy * 0.92 + fy * 0.08;

            // Mouse fluid impulse
            if (mouse.active && mouse.x !== null) {
              const dx = p.x - mouse.x;
              const dy = p.y - mouse.y;
              const dist = Math.sqrt(dx * dx + dy * dy);
              if (dist < 120 && dist > 1) {
                const repulse = (1 - dist / 120) * 3.5 * speedMultiplier;
                p.vx += (dx / dist) * repulse;
                p.vy += (dy / dist) * repulse;
              }
            }

            p.x += p.vx * speedMultiplier;
            p.y += p.vy * speedMultiplier;
            p.age += 1;

            // Alpha curve: fade in, hold, fade out
            const lifeRatio = p.age / p.maxAge;
            const alpha = Math.sin(lifeRatio * Math.PI) * 0.75;

            if (alpha > 0.01) {
              ctx.fillStyle = p.hue === 38
                ? \`rgba(245, 158, 11, \${alpha})\`
                : \`rgba(56, 189, 248, \${alpha})\`;
              ctx.beginPath();
              ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
              ctx.fill();
            }

            if (p.age >= p.maxAge || p.x < 0 || p.x > width || p.y < 0 || p.y > height) {
              p.x = Math.random() * width;
              p.y = Math.random() * height;
              p.vx = 0;
              p.vy = 0;
              p.age = 0;
            }
          }
        }

        // -------------------------------------------------------------
        // ENGINE 3: KINETIC SACRED GEOMETRY (3D WIREFRAME CORE)
        // -------------------------------------------------------------
        let rotX = 0.4;
        let rotY = 0.6;
        let rotZ = 0;
        let targetRotX = 0.4;
        let targetRotY = 0.6;

        // Hypercube & Nested Octahedron vertices in 3D (-1 to 1)
        const CUBE_VERTICES = [
          [-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1],
          [-1, -1, 1],  [1, -1, 1],  [1, 1, 1],  [-1, 1, 1]
        ];

        const CUBE_EDGES = [
          [0,1], [1,2], [2,3], [3,0],
          [4,5], [5,6], [6,7], [7,4],
          [0,4], [1,5], [2,6], [3,7]
        ];

        const OCTA_VERTICES = [
          [0, -1.4, 0], [0, 1.4, 0],
          [-1.4, 0, 0], [1.4, 0, 0],
          [0, 0, -1.4], [0, 0, 1.4]
        ];

        const OCTA_EDGES = [
          [0,2], [0,3], [0,4], [0,5],
          [1,2], [1,3], [1,4], [1,5],
          [2,4], [4,3], [3,5], [5,2]
        ];

        function project3D(v, scale) {
          // Rotation Y
          const cosY = Math.cos(rotY);
          const sinY = Math.sin(rotY);
          let x1 = v[0] * cosY + v[2] * sinY;
          let z1 = -v[0] * sinY + v[2] * cosY;

          // Rotation X
          const cosX = Math.cos(rotX);
          const sinX = Math.sin(rotX);
          let y2 = v[1] * cosX - z1 * sinX;
          let z2 = v[1] * sinX + z1 * cosX;

          // Perspective projection
          const fov = 3.5;
          const pers = fov / (fov + z2);
          return {
            x: width / 2 + x1 * scale * pers,
            y: height / 2 + y2 * scale * pers,
            z: z2,
            pers
          };
        }

        function updateAndDrawGeometry(dt) {
          ctx.fillStyle = '#040508';
          ctx.fillRect(0, 0, width, height);

          // Subtle ambient coordinate grid in background
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
          ctx.lineWidth = 1;
          const gridSize = 40;
          for (let gx = 0; gx < width; gx += gridSize) {
            ctx.beginPath(); ctx.moveTo(gx, 0); ctx.lineTo(gx, height); ctx.stroke();
          }
          for (let gy = 0; gy < height; gy += gridSize) {
            ctx.beginPath(); ctx.moveTo(0, gy); ctx.lineTo(width, gy); ctx.stroke();
          }

          // Inertial rotation
          if (mouse.active && mouse.x !== null) {
            const ndx = (mouse.x - width / 2) / (width / 2);
            const ndy = (mouse.y - height / 2) / (height / 2);
            targetRotY = ndx * 1.5;
            targetRotX = -ndy * 1.2;
          } else {
            targetRotY += 0.006 * speedMultiplier;
            targetRotX = Math.sin(performance.now() * 0.001) * 0.3;
          }

          rotX += (targetRotX - rotX) * 0.06;
          rotY += (targetRotY - rotY) * 0.06;

          const baseScale = Math.min(width, height) * 0.22;

          // 1. Render Outer Cube Wireframe
          const cubeProj = CUBE_VERTICES.map(v => project3D(v, baseScale));
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.18)';
          ctx.lineWidth = 1.2;
          for (const [i, j] of CUBE_EDGES) {
            ctx.beginPath();
            ctx.moveTo(cubeProj[i].x, cubeProj[i].y);
            ctx.lineTo(cubeProj[j].x, cubeProj[j].y);
            ctx.stroke();
          }

          // 2. Render Inner Octahedron (Amber Primordial Core)
          const octaProj = OCTA_VERTICES.map(v => project3D(v, baseScale * 0.7));
          ctx.strokeStyle = 'rgba(245, 158, 11, 0.65)';
          ctx.lineWidth = 1.8;
          for (const [i, j] of OCTA_EDGES) {
            ctx.beginPath();
            ctx.moveTo(octaProj[i].x, octaProj[i].y);
            ctx.lineTo(octaProj[j].x, octaProj[j].y);
            ctx.stroke();
          }

          // 3. Render Glowing Core Spark & Vertex Nodes
          for (const p of octaProj) {
            ctx.fillStyle = 'rgba(245, 158, 11, 0.9)';
            ctx.beginPath();
            ctx.arc(p.x, p.y, 3 * p.pers, 0, Math.PI * 2);
            ctx.fill();
          }

          // Central primordial focal spark
          const center = project3D([0, 0, 0], baseScale);
          const sparkGrad = ctx.createRadialGradient(center.x, center.y, 1, center.x, center.y, 32);
          sparkGrad.addColorStop(0, 'rgba(245, 158, 11, 1)');
          sparkGrad.addColorStop(0.3, 'rgba(245, 158, 11, 0.5)');
          sparkGrad.addColorStop(1, 'rgba(245, 158, 11, 0)');
          ctx.fillStyle = sparkGrad;
          ctx.beginPath();
          ctx.arc(center.x, center.y, 32, 0, Math.PI * 2);
          ctx.fill();
        }

        // -------------------------------------------------------------
        // MAIN ANIMATION LOOP
        // -------------------------------------------------------------
        function loop(timestamp) {
          const dt = (timestamp - lastTime) / 1000;
          lastTime = timestamp;

          // FPS calculation
          frameCount++;
          fpsTimer += dt;
          if (fpsTimer >= 0.5) {
            const fps = Math.round(frameCount / fpsTimer);
            if (fpsEl) fpsEl.textContent = \`FPS: \${fps}\`;
            frameCount = 0;
            fpsTimer = 0;
          }

          if (currentMode === 'singularity') {
            updateAndDrawSingularity(dt);
          } else if (currentMode === 'flowfield') {
            updateAndDrawFlowField(dt);
          } else if (currentMode === 'geometry') {
            updateAndDrawGeometry(dt);
          }

          animationFrameId = requestAnimationFrame(loop);
        }

        function resize() {
          const rect = canvas.getBoundingClientRect();
          width = rect.width;
          height = rect.height;
          dpr = window.devicePixelRatio || 1;

          canvas.width = width * dpr;
          canvas.height = height * dpr;
          ctx.scale(dpr, dpr);

          if (currentMode === 'singularity') initSingularity();
          else if (currentMode === 'flowfield') initFlowField();
        }

        resize();
        window.addEventListener('resize', resize, { passive: true });

        // Mouse interactions
        canvas.addEventListener('pointerenter', () => { mouse.active = true; });
        canvas.addEventListener('pointerleave', () => { mouse.active = false; mouse.x = null; mouse.y = null; });
        canvas.addEventListener('pointermove', (e) => {
          const rect = canvas.getBoundingClientRect();
          mouse.x = e.clientX - rect.left;
          mouse.y = e.clientY - rect.top;
          mouse.active = true;
        });

        // Mode switching controls
        const modeButtons = container.querySelectorAll('.mode-btn');
        modeButtons.forEach(btn => {
          btn.addEventListener('click', () => {
            modeButtons.forEach(b => {
              b.classList.remove('active');
              b.setAttribute('aria-selected', 'false');
            });
            btn.classList.add('active');
            btn.setAttribute('aria-selected', 'true');

            currentMode = btn.dataset.mode;
            modeTitle.textContent = MODE_INFO[currentMode].title;
            modeDesc.textContent = MODE_INFO[currentMode].desc;

            // Reset canvas state
            ctx.clearRect(0, 0, width, height);
            if (currentMode === 'singularity') initSingularity();
            else if (currentMode === 'flowfield') initFlowField();
          });
        });

        // Parameter sliders
        speedSlider.addEventListener('input', (e) => {
          speedMultiplier = parseFloat(e.target.value);
        });

        densitySlider.addEventListener('input', (e) => {
          entityCount = parseInt(e.target.value, 10);
          if (particlesEl) particlesEl.textContent = \`ENTITIES: \${entityCount}\`;
          if (currentMode === 'singularity') initSingularity();
          else if (currentMode === 'flowfield') initFlowField();
        });

        resetBtn.addEventListener('click', () => {
          ctx.clearRect(0, 0, width, height);
          if (currentMode === 'singularity') initSingularity();
          else if (currentMode === 'flowfield') initFlowField();
        });

        // Initialize mode
        initSingularity();
        animationFrameId = requestAnimationFrame(loop);
      })();
    </script>
  `.trim();
}
