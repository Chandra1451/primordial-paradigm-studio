// =============================================================================
// Primordial Paradigm Studio - Interactive Vector Kinematics Sandbox
// Embedded interactive physics simulation for devlogs.
// Pure vanilla HTML5 Canvas + JS. Zero dependencies. Fully accessible & responsive.
// =============================================================================

export function renderKinematicsSandbox() {
  return `
    <div class="sandbox-wrapper" role="region" aria-label="Interactive Vector Kinematics Sandbox">
      <div class="sandbox-header">
        <div class="sandbox-title-wrap">
          <span class="sandbox-badge">INTERACTIVE EXPERIMENT</span>
          <h3 class="sandbox-title">2D Vector Kinematics Sandbox</h3>
        </div>
        <div class="sandbox-presets" role="group" aria-label="Friction Presets">
          <button type="button" class="preset-btn active" data-surface="standard">Standard Ground</button>
          <button type="button" class="preset-btn" data-surface="ice">Inertial Ice</button>
          <button type="button" class="preset-btn" data-surface="rubber">High-Tack</button>
        </div>
      </div>

      <div class="canvas-container">
        <canvas id="kinematicsCanvas" width="700" height="380" tabindex="0" aria-label="Kinematics simulation canvas. Use arrow keys or click/drag to guide the physics probe."></canvas>
        <div class="canvas-overlay-hint">Click & drag or use WASD/Arrows to steer &bull; Space to brake</div>
      </div>

      <div class="sandbox-controls">
        <div class="control-col">
          <label for="frictionSlider" class="control-label">
            <span>Friction Damping (&mu;)</span>
            <span id="frictionVal" class="control-val">0.92</span>
          </label>
          <input type="range" id="frictionSlider" min="0.80" max="0.99" step="0.01" value="0.92" class="sandbox-slider" />
        </div>

        <div class="control-col">
          <label for="thrustSlider" class="control-label">
            <span>Thrust Force (F)</span>
            <span id="thrustVal" class="control-val">1.20</span>
          </label>
          <input type="range" id="thrustSlider" min="0.5" max="3.0" step="0.1" value="1.2" class="sandbox-slider" />
        </div>

        <div class="telemetry-col">
          <div class="telemetry-item">
            <span class="telemetry-label">Velocity</span>
            <span id="telVel" class="telemetry-val">0.0 px/s</span>
          </div>
          <div class="telemetry-item">
            <span class="telemetry-label">Heading</span>
            <span id="telAngle" class="telemetry-val">0&deg;</span>
          </div>
          <button type="button" id="resetBtn" class="sandbox-reset-btn" title="Reset probe to origin">Reset Origin</button>
        </div>
      </div>
    </div>

    <style>
      .sandbox-wrapper {
        background-color: var(--bg-surface);
        border: 1px solid var(--border-subtle);
        border-radius: var(--radius-lg);
        padding: 1.5rem;
        margin: 2.5rem 0;
        box-shadow: 0 4px 24px rgba(0, 0, 0, 0.4);
      }

      .sandbox-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        gap: 1rem;
        margin-bottom: 1.25rem;
      }

      .sandbox-badge {
        font-family: var(--font-mono);
        font-size: 0.7rem;
        letter-spacing: 0.12em;
        color: var(--accent-amber);
        display: block;
        margin-bottom: 0.25rem;
      }

      .sandbox-title {
        font-size: 1.15rem;
        color: var(--text-primary);
        margin: 0;
      }

      .sandbox-presets {
        display: flex;
        gap: 0.5rem;
        flex-wrap: wrap;
      }

      .preset-btn {
        font-family: var(--font-mono);
        font-size: 0.75rem;
        background-color: var(--bg-canvas);
        color: var(--text-secondary);
        border: 1px solid var(--border-subtle);
        padding: 0.35rem 0.75rem;
        border-radius: var(--radius-sm);
        cursor: pointer;
        transition: all var(--transition-fast);
      }

      .preset-btn:hover {
        border-color: var(--accent-amber);
        color: var(--text-primary);
      }

      .preset-btn.active {
        background-color: var(--accent-amber);
        color: var(--bg-canvas);
        border-color: var(--accent-amber);
        font-weight: 600;
      }

      .canvas-container {
        position: relative;
        width: 100%;
        background-color: #050608;
        border: 1px solid var(--border-strong);
        border-radius: var(--radius-md);
        overflow: hidden;
      }

      #kinematicsCanvas {
        display: block;
        width: 100%;
        height: auto;
        aspect-ratio: 700 / 380;
        cursor: crosshair;
      }

      #kinematicsCanvas:focus-visible {
        outline: 2px solid var(--accent-amber);
        outline-offset: -2px;
      }

      .canvas-overlay-hint {
        position: absolute;
        bottom: 10px;
        left: 12px;
        font-family: var(--font-mono);
        font-size: 0.7rem;
        color: rgba(203, 213, 225, 0.6);
        pointer-events: none;
        user-select: none;
      }

      .sandbox-controls {
        display: grid;
        grid-template-columns: 1fr 1fr auto;
        gap: 1.5rem;
        margin-top: 1.25rem;
        align-items: center;
      }

      @media (max-width: 720px) {
        .sandbox-controls {
          grid-template-columns: 1fr;
          gap: 1rem;
        }
      }

      .control-col {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }

      .control-label {
        display: flex;
        justify-content: space-between;
        font-family: var(--font-mono);
        font-size: 0.8rem;
        color: var(--text-secondary);
      }

      .control-val {
        color: var(--accent-amber);
        font-weight: 600;
      }

      .sandbox-slider {
        -webkit-appearance: none;
        appearance: none;
        width: 100%;
        height: 6px;
        background: var(--bg-canvas);
        border-radius: 3px;
        border: 1px solid var(--border-subtle);
        outline: none;
      }

      .sandbox-slider::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background: var(--accent-amber);
        cursor: pointer;
        box-shadow: 0 0 6px rgba(245, 158, 11, 0.4);
      }

      .telemetry-col {
        display: flex;
        align-items: center;
        gap: 1.25rem;
        background-color: var(--bg-canvas);
        padding: 0.5rem 1rem;
        border-radius: var(--radius-sm);
        border: 1px solid var(--border-subtle);
        flex-wrap: wrap;
      }

      .telemetry-item {
        display: flex;
        flex-direction: column;
        gap: 2px;
      }

      .telemetry-label {
        font-family: var(--font-mono);
        font-size: 0.65rem;
        color: var(--text-muted);
        text-transform: uppercase;
      }

      .telemetry-val {
        font-family: var(--font-mono);
        font-size: 0.85rem;
        color: var(--text-primary);
        font-weight: 600;
      }

      .sandbox-reset-btn {
        font-family: var(--font-mono);
        font-size: 0.75rem;
        padding: 0.35rem 0.65rem;
        background: transparent;
        border: 1px solid var(--border-strong);
        color: var(--text-secondary);
        border-radius: var(--radius-sm);
        cursor: pointer;
        transition: all var(--transition-fast);
      }

      .sandbox-reset-btn:hover {
        border-color: var(--accent-amber);
        color: var(--text-primary);
      }
    </style>

    <script>
      (function() {
        const canvas = document.getElementById('kinematicsCanvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        // Physics State
        const state = {
          pos: { x: 350, y: 190 },
          vel: { x: 0, y: 0 },
          acc: { x: 0, y: 0 },
          friction: 0.92,
          thrust: 1.2,
          radius: 9,
          trail: [],
          maxTrail: 32,
          target: null,
          keys: {}
        };

        const presets = {
          standard: { friction: 0.92, thrust: 1.2 },
          ice: { friction: 0.985, thrust: 0.8 },
          rubber: { friction: 0.83, thrust: 1.6 }
        };

        // UI elements
        const frictionSlider = document.getElementById('frictionSlider');
        const frictionVal = document.getElementById('frictionVal');
        const thrustSlider = document.getElementById('thrustSlider');
        const thrustVal = document.getElementById('thrustVal');
        const telVel = document.getElementById('telVel');
        const telAngle = document.getElementById('telAngle');
        const resetBtn = document.getElementById('resetBtn');
        const presetBtns = document.querySelectorAll('.preset-btn');

        function updateSliderLabels() {
          frictionVal.textContent = parseFloat(state.friction).toFixed(3);
          thrustVal.textContent = parseFloat(state.thrust).toFixed(1);
          frictionSlider.value = state.friction;
          thrustSlider.value = state.thrust;
        }

        frictionSlider.addEventListener('input', (e) => {
          state.friction = parseFloat(e.target.value);
          frictionVal.textContent = state.friction.toFixed(2);
          presetBtns.forEach(b => b.classList.remove('active'));
        });

        thrustSlider.addEventListener('input', (e) => {
          state.thrust = parseFloat(e.target.value);
          thrustVal.textContent = state.thrust.toFixed(1);
          presetBtns.forEach(b => b.classList.remove('active'));
        });

        presetBtns.forEach(btn => {
          btn.addEventListener('click', () => {
            const presetName = btn.getAttribute('data-surface');
            if (presets[presetName]) {
              state.friction = presets[presetName].friction;
              state.thrust = presets[presetName].thrust;
              updateSliderLabels();
              presetBtns.forEach(b => b.classList.remove('active'));
              btn.classList.add('active');
            }
          });
        });

        resetBtn.addEventListener('click', () => {
          state.pos = { x: canvas.width / 2, y: canvas.height / 2 };
          state.vel = { x: 0, y: 0 };
          state.trail = [];
          state.target = null;
        });

        // Input Listeners
        window.addEventListener('keydown', (e) => {
          if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'w', 'a', 's', 'd', ' '].includes(e.key)) {
            if (document.activeElement === canvas) {
              e.preventDefault();
            }
          }
          state.keys[e.key.toLowerCase()] = true;
        });

        window.addEventListener('keyup', (e) => {
          state.keys[e.key.toLowerCase()] = false;
        });

        function getCanvasCoords(clientX, clientY) {
          const rect = canvas.getBoundingClientRect();
          const scaleX = canvas.width / rect.width;
          const scaleY = canvas.height / rect.height;
          return {
            x: (clientX - rect.left) * scaleX,
            y: (clientY - rect.top) * scaleY
          };
        }

        let isPointerDown = false;
        canvas.addEventListener('pointerdown', (e) => {
          isPointerDown = true;
          canvas.focus();
          state.target = getCanvasCoords(e.clientX, e.clientY);
        });

        window.addEventListener('pointermove', (e) => {
          if (isPointerDown) {
            state.target = getCanvasCoords(e.clientX, e.clientY);
          }
        });

        window.addEventListener('pointerup', () => {
          isPointerDown = false;
          state.target = null;
        });

        // Simulation Step
        function updatePhysics() {
          state.acc = { x: 0, y: 0 };

          // Keyboard steering
          if (state.keys['arrowup'] || state.keys['w']) state.acc.y -= state.thrust;
          if (state.keys['arrowdown'] || state.keys['s']) state.acc.y += state.thrust;
          if (state.keys['arrowleft'] || state.keys['a']) state.acc.x -= state.thrust;
          if (state.keys['arrowright'] || state.keys['d']) state.acc.x += state.thrust;

          // Spacebar brake
          if (state.keys[' ']) {
            state.vel.x *= 0.8;
            state.vel.y *= 0.8;
          }

          // Target (mouse/touch) steering
          if (state.target) {
            const dx = state.target.x - state.pos.x;
            const dy = state.target.y - state.pos.y;
            const dist = Math.hypot(dx, dy);
            if (dist > 8) {
              const nx = dx / dist;
              const ny = dy / dist;
              state.acc.x += nx * state.thrust * 1.2;
              state.acc.y += ny * state.thrust * 1.2;
            }
          }

          // Integrate acceleration into velocity
          state.vel.x += state.acc.x;
          state.vel.y += state.acc.y;

          // Apply friction damping curve
          state.vel.x *= state.friction;
          state.vel.y *= state.friction;

          // Integrate velocity into position
          state.pos.x += state.vel.x;
          state.pos.y += state.vel.y;

          // Screen wrap-around boundaries
          if (state.pos.x < 0) state.pos.x = canvas.width;
          if (state.pos.x > canvas.width) state.pos.x = 0;
          if (state.pos.y < 0) state.pos.y = canvas.height;
          if (state.pos.y > canvas.height) state.pos.y = 0;

          // Append to trail
          state.trail.push({ x: state.pos.x, y: state.pos.y });
          if (state.trail.length > state.maxTrail) {
            state.trail.shift();
          }

          // Telemetry
          const speed = Math.hypot(state.vel.x, state.vel.y) * 60; // converted to px/s approx
          telVel.textContent = speed.toFixed(1) + ' px/s';
          const deg = (Math.atan2(state.vel.y, state.vel.x) * (180 / Math.PI) + 360) % 360;
          telAngle.textContent = Math.round(deg) + '\u00B0';
        }

        // Render Step
        function draw() {
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          // 1. Draw subtle coordinate grid
          ctx.strokeStyle = '#121620';
          ctx.lineWidth = 1;
          const gridSize = 35;
          for (let x = 0; x <= canvas.width; x += gridSize) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, canvas.height);
            ctx.stroke();
          }
          for (let y = 0; y <= canvas.height; y += gridSize) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(canvas.width, y);
            ctx.stroke();
          }

          // 2. Target indicator
          if (state.target) {
            ctx.strokeStyle = 'rgba(245, 158, 11, 0.35)';
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.arc(state.target.x, state.target.y, 14, 0, Math.PI * 2);
            ctx.stroke();
          }

          // 3. Motion trail
          for (let i = 0; i < state.trail.length; i++) {
            const pt = state.trail[i];
            const alpha = (i / state.trail.length) * 0.45;
            const r = state.radius * (0.3 + (i / state.trail.length) * 0.7);
            ctx.fillStyle = 'rgba(245, 158, 11, ' + alpha + ')';
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, r, 0, Math.PI * 2);
            ctx.fill();
          }

          // 4. Primary probe body (Obsidian core with Amber spark)
          ctx.fillStyle = '#08090d';
          ctx.beginPath();
          ctx.arc(state.pos.x, state.pos.y, state.radius, 0, Math.PI * 2);
          ctx.fill();

          ctx.strokeStyle = '#f59e0b';
          ctx.lineWidth = 2;
          ctx.stroke();

          // Core spark
          ctx.fillStyle = '#f59e0b';
          ctx.beginPath();
          ctx.arc(state.pos.x, state.pos.y, 3, 0, Math.PI * 2);
          ctx.fill();

          // 5. Velocity Vector Arrow
          const speed = Math.hypot(state.vel.x, state.vel.y);
          if (speed > 0.3) {
            const vectorLen = Math.min(speed * 8, 45);
            const angle = Math.atan2(state.vel.y, state.vel.x);
            const headX = state.pos.x + Math.cos(angle) * vectorLen;
            const headY = state.pos.y + Math.sin(angle) * vectorLen;

            ctx.strokeStyle = 'rgba(6, 182, 212, 0.85)'; // Cyan velocity vector
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(state.pos.x, state.pos.y);
            ctx.lineTo(headX, headY);
            ctx.stroke();

            // Arrow head
            const arrowAngle = 0.4;
            const arrowHeadLen = 6;
            ctx.beginPath();
            ctx.moveTo(headX, headY);
            ctx.lineTo(
              headX - arrowHeadLen * Math.cos(angle - arrowAngle),
              headY - arrowHeadLen * Math.sin(angle - arrowAngle)
            );
            ctx.moveTo(headX, headY);
            ctx.lineTo(
              headX - arrowHeadLen * Math.cos(angle + arrowAngle),
              headY - arrowHeadLen * Math.sin(angle + arrowAngle)
            );
            ctx.stroke();
          }
        }

        // Loop Runner (Respects prefers-reduced-motion)
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        let isReduced = mediaQuery.matches;
        mediaQuery.addEventListener('change', (e) => {
          isReduced = e.matches;
        });

        function loop() {
          if (!isReduced || isPointerDown || Object.values(state.keys).some(Boolean)) {
            updatePhysics();
          }
          draw();
          requestAnimationFrame(loop);
        }

        requestAnimationFrame(loop);
      })();
    </script>
  `.trim();
}

