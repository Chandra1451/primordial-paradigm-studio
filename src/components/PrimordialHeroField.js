// =============================================================================
// Primordial Paradigm Studio - Ambient Cosmic Hero Field
// Generative particle & constellation background for the studio hero.
// Pure vanilla HTML5 Canvas. Zero external dependencies.
// WCAG 2.2 compliant: auto-pauses offscreen, supports manual pause/resume,
// and respects prefers-reduced-motion.
// =============================================================================

export function renderPrimordialHeroField() {
  return `
    <div class="hero-field-wrapper" aria-hidden="true">
      <canvas id="heroFieldCanvas"></canvas>
    </div>

    <style>
      .hero-field-wrapper {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        pointer-events: none;
        z-index: 0;
      }

      #heroFieldCanvas {
        display: block;
        width: 100%;
        height: 100%;
        opacity: 0.85;
      }
    </style>

    <script>
      (function() {
        const canvas = document.getElementById('heroFieldCanvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const heroSection = canvas.closest('.hero-section');

        let width = 0;
        let height = 0;
        let dpr = window.devicePixelRatio || 1;
        let animationFrameId = null;
        let isRunning = true;
        let isOffscreen = false;

        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        let isReduced = mediaQuery.matches;

        // Node definitions
        const NODE_COUNT = 48;
        const CONNECTION_DIST = 115;
        const nodes = [];
        const mouse = { x: null, y: null, radius: 130 };

        function initNodes() {
          nodes.length = 0;
          for (let i = 0; i < NODE_COUNT; i++) {
            nodes.push({
              x: Math.random() * width,
              y: Math.random() * height,
              vx: (Math.random() - 0.5) * 0.35,
              vy: (Math.random() - 0.5) * 0.35,
              radius: Math.random() < 0.2 ? 2.5 : 1.5,
              baseAlpha: Math.random() * 0.5 + 0.2,
              isSpark: Math.random() < 0.15 // 15% are amber primordial sparks
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

          if (nodes.length === 0) {
            initNodes();
          } else {
            // Keep nodes within bounds
            for (const n of nodes) {
              if (n.x > width) n.x = width;
              if (n.y > height) n.y = height;
            }
          }
        }

        resize();
        window.addEventListener('resize', resize, { passive: true });

        // Mouse tracking on hero section
        if (heroSection) {
          heroSection.addEventListener('pointermove', (e) => {
            const rect = heroSection.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
          }, { passive: true });

          heroSection.addEventListener('pointerleave', () => {
            mouse.x = null;
            mouse.y = null;
          }, { passive: true });
        }

        function update() {
          for (const n of nodes) {
            n.x += n.vx;
            n.y += n.vy;

            // Bounce on boundaries
            if (n.x < 0 || n.x > width) n.vx *= -1;
            if (n.y < 0 || n.y > height) n.vy *= -1;

            // Subtle interaction with mouse
            if (mouse.x !== null && mouse.y !== null) {
              const dx = mouse.x - n.x;
              const dy = mouse.y - n.y;
              const dist = Math.hypot(dx, dy);
              if (dist < mouse.radius && dist > 1) {
                const force = (1 - dist / mouse.radius) * 0.4;
                n.x -= (dx / dist) * force;
                n.y -= (dy / dist) * force;
              }
            }
          }
        }

        function render() {
          ctx.clearRect(0, 0, width, height);

          // 1. Draw connections between nearby nodes
          for (let i = 0; i < nodes.length; i++) {
            const a = nodes[i];
            for (let j = i + 1; j < nodes.length; j++) {
              const b = nodes[j];
              const dx = a.x - b.x;
              const dy = a.y - b.y;
              const dist = Math.hypot(dx, dy);

              if (dist < CONNECTION_DIST) {
                const alpha = (1 - dist / CONNECTION_DIST) * 0.18;
                const isSparkConnection = a.isSpark || b.isSpark;

                if (isSparkConnection) {
                  ctx.strokeStyle = 'rgba(245, 158, 11, ' + (alpha * 0.8) + ')';
                } else {
                  ctx.strokeStyle = 'rgba(45, 55, 77, ' + alpha + ')';
                }

                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(a.x, a.y);
                ctx.lineTo(b.x, b.y);
                ctx.stroke();
              }
            }
          }

          // 2. Draw nodes
          for (const n of nodes) {
            ctx.beginPath();
            ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);

            if (n.isSpark) {
              ctx.fillStyle = 'rgba(245, 158, 11, ' + (n.baseAlpha + 0.3) + ')';
              ctx.shadowColor = 'rgba(245, 158, 11, 0.4)';
              ctx.shadowBlur = 6;
            } else {
              ctx.fillStyle = 'rgba(148, 163, 184, ' + n.baseAlpha + ')';
              ctx.shadowColor = 'transparent';
              ctx.shadowBlur = 0;
            }

            ctx.fill();
          }

          // Reset shadow
          ctx.shadowColor = 'transparent';
          ctx.shadowBlur = 0;
        }

        function frame() {
          if (!isRunning || isOffscreen) return;
          if (!isReduced) {
            update();
          }
          render();
          if (!isReduced) {
            animationFrameId = requestAnimationFrame(frame);
          }
        }

        // Start animation
        if (!isReduced) {
          frame();
        } else {
          // Render a single static composition
          render();
        }

        // Reduced motion listener
        mediaQuery.addEventListener('change', (e) => {
          isReduced = e.matches;
          if (isReduced) {
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
            render();
          } else if (isRunning && !isOffscreen) {
            frame();
          }
        });

        // IntersectionObserver: Pause when hero is out of view
        if ('IntersectionObserver' in window && heroSection) {
          const observer = new IntersectionObserver((entries) => {
            for (const entry of entries) {
              isOffscreen = !entry.isIntersecting;
              if (entry.isIntersecting && isRunning && !isReduced) {
                if (!animationFrameId) frame();
              } else if (!entry.isIntersecting && animationFrameId) {
                cancelAnimationFrame(animationFrameId);
                animationFrameId = null;
              }
            }
          }, { threshold: 0.05 });
          observer.observe(heroSection);
        }

        // Visibility API: Pause when tab is hidden
        document.addEventListener('visibilitychange', () => {
          if (document.hidden) {
            if (animationFrameId) {
              cancelAnimationFrame(animationFrameId);
              animationFrameId = null;
            }
          } else if (isRunning && !isOffscreen && !isReduced) {
            if (!animationFrameId) frame();
          }
        });

        // Manual Motion Toggle Button support
        window.addEventListener('pp:toggle-motion', (e) => {
          isRunning = e.detail ? e.detail.running : !isRunning;
          if (isRunning && !isOffscreen && !isReduced) {
            if (!animationFrameId) frame();
          } else {
            if (animationFrameId) {
              cancelAnimationFrame(animationFrameId);
              animationFrameId = null;
            }
          }
        });
      })();
    </script>
  `.trim();
}
