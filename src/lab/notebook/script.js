// Candidate B: a notebook sketch you can flick.
// The ball glides after release and friction brings it to a stop.
(() => {
  const svg = document.getElementById('flick');
  const ball = document.getElementById('ball');
  const shaft = document.getElementById('arrowShaft');
  const head = document.getElementById('arrowHead');
  const label = document.getElementById('arrowLabel');
  const ghosts = document.getElementById('ghosts');
  const noise = document.getElementById('roughNoise');
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const MIN_X = 60;
  const MAX_X = 500;
  const ARROW_Y = 120;
  const state = { x: 150, v: 0, dragging: false, lastX: 0, lastT: 0 };
  const trail = [];

  // Line boil: redraw the roughness a few times a second, the way hand-drawn animation wobbles.
  if (!reduceMotion) {
    let seed = 2;
    setInterval(() => {
      if (document.hidden) return;
      seed = (seed % 4) + 1;
      noise.setAttribute('seed', String(seed));
    }, 220);
  }

  function toSvgX(clientX) {
    const box = svg.getBoundingClientRect();
    return ((clientX - box.left) / box.width) * 560;
  }

  function render() {
    ball.setAttribute('cx', state.x.toFixed(1));

    // Arrow length follows velocity.
    const len = Math.max(-150, Math.min(150, state.v * 0.22));
    const tip = state.x + len;
    shaft.setAttribute('d', `M${state.x.toFixed(1)} ${ARROW_Y} H${tip.toFixed(1)}`);
    if (Math.abs(len) > 6) {
      const back = len > 0 ? -12 : 12;
      head.setAttribute('d', `M${(tip + back).toFixed(1)} ${ARROW_Y - 9} L${tip.toFixed(1)} ${ARROW_Y} L${(tip + back).toFixed(1)} ${ARROW_Y + 9}`);
      label.textContent = 'velocity';
    } else {
      head.setAttribute('d', `M${tip.toFixed(1)} ${ARROW_Y} l0 0`);
      label.textContent = 'at rest';
    }
    label.setAttribute('x', (state.x + len / 2).toFixed(1));

    // Fading outlines of where the ball has been.
    ghosts.textContent = '';
    trail.forEach((gx, i) => {
      const c = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      c.setAttribute('cx', gx.toFixed(1));
      c.setAttribute('cy', '180');
      c.setAttribute('r', '32');
      c.setAttribute('opacity', (0.15 + 0.6 * (i / trail.length)).toFixed(2));
      ghosts.appendChild(c);
    });
  }

  function remember() {
    const last = trail[trail.length - 1];
    if (last === undefined || Math.abs(state.x - last) > 46) {
      trail.push(state.x);
      if (trail.length > 4) trail.shift();
    }
  }

  let running = false;
  let lastFrame = 0;
  function frame(ms) {
    const now = ms / 1000;
    const dt = Math.min(now - lastFrame, 0.033);
    lastFrame = now;

    if (!state.dragging) {
      state.v *= Math.exp(-1.9 * dt); // friction
      state.x += state.v * dt;
      if (state.x < MIN_X) { state.x = MIN_X; state.v = Math.abs(state.v) * 0.5; }
      if (state.x > MAX_X) { state.x = MAX_X; state.v = -Math.abs(state.v) * 0.5; }
      if (Math.abs(state.v) < 4) state.v = 0;
    }
    remember();
    render();

    if (!state.dragging && state.v === 0) { running = false; return; }
    requestAnimationFrame(frame);
  }
  function wake() {
    if (running) return;
    running = true;
    lastFrame = performance.now() / 1000;
    requestAnimationFrame(frame);
  }

  svg.addEventListener('pointerdown', (e) => {
    state.dragging = true;
    state.v = 0;
    state.lastX = toSvgX(e.clientX);
    state.lastT = performance.now();
    trail.length = 0;
    svg.classList.add('dragging');
    svg.setPointerCapture(e.pointerId);
    wake();
  });

  svg.addEventListener('pointermove', (e) => {
    if (!state.dragging) return;
    const x = toSvgX(e.clientX);
    const t = performance.now();
    const dt = Math.max((t - state.lastT) / 1000, 0.001);
    // Smooth the hand's speed so the release velocity is not one noisy sample.
    state.v = state.v * 0.6 + ((x - state.lastX) / dt) * 0.4;
    state.x = Math.max(MIN_X, Math.min(MAX_X, state.x + (x - state.lastX)));
    state.lastX = x;
    state.lastT = t;
  });

  function release() {
    if (!state.dragging) return;
    state.dragging = false;
    svg.classList.remove('dragging');
    // A hand that stopped before letting go imparts no speed.
    if (performance.now() - state.lastT > 120) state.v = 0;
    state.v = Math.max(-1400, Math.min(1400, state.v));
  }
  svg.addEventListener('pointerup', release);
  svg.addEventListener('pointercancel', release);

  // Opening gesture: one push, so the sketch explains itself.
  if (!reduceMotion) {
    state.v = 620;
    wake();
  } else {
    render();
  }
})();
