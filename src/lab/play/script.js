// Candidate A: the studio name as physical objects.
// A disc with inertia and friction knocks the letters about; springs pull them home.
(() => {
  const stage = document.getElementById('stage');
  const disc = document.getElementById('disc');
  const canvas = document.getElementById('ink');
  const ctx = canvas.getContext('2d');
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Split each line into letters. Without this script the name is plain text.
  const letters = [];
  document.querySelectorAll('.word .line').forEach((line) => {
    const text = line.textContent.trim();
    line.textContent = '';
    line.setAttribute('aria-hidden', 'true');
    for (const ch of text) {
      const el = document.createElement('span');
      el.className = 'l';
      el.textContent = ch;
      line.appendChild(el);
      letters.push({ el, x: 0, y: 0, r: 0, vx: 0, vy: 0, vr: 0, cx: 0, cy: 0, hw: 0, hh: 0 });
    }
  });

  let W = 0;
  let H = 0;
  let R = 20;
  const p = { x: 0, y: 0, vx: 0, vy: 0 };
  const trail = [];
  const TRAIL_LIFE = 5; // seconds

  function measure() {
    const box = stage.getBoundingClientRect();
    W = box.width;
    H = box.height;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    R = disc.offsetWidth / 2;
    for (const L of letters) L.el.style.transform = '';
    for (const L of letters) {
      const r = L.el.getBoundingClientRect();
      L.cx = r.left - box.left + r.width / 2;
      L.cy = r.top - box.top + r.height / 2;
      L.hw = r.width * 0.46;
      L.hh = r.height * 0.36;
    }
  }

  // Input: held keys push the disc; a pressed pointer pulls it.
  const keys = { up: false, down: false, left: false, right: false };
  const keyMap = {
    w: 'up', a: 'left', s: 'down', d: 'right',
    arrowup: 'up', arrowleft: 'left', arrowdown: 'down', arrowright: 'right'
  };
  const pointer = { active: false, x: 0, y: 0 };

  window.addEventListener('keydown', (e) => {
    const dir = keyMap[e.key.toLowerCase()];
    if (!dir || e.ctrlKey || e.metaKey || e.altKey) return;
    const isArrow = e.key.startsWith('Arrow');
    // Arrow keys move the disc only while the stage has focus, so they still scroll the page otherwise.
    if (isArrow && document.activeElement !== stage) return;
    if (isArrow) e.preventDefault();
    keys[dir] = true;
    wake();
  });
  window.addEventListener('keyup', (e) => {
    const dir = keyMap[e.key.toLowerCase()];
    if (dir) keys[dir] = false;
  });
  window.addEventListener('blur', () => {
    keys.up = keys.down = keys.left = keys.right = false;
    pointer.active = false;
  });

  function pointAt(e) {
    const box = stage.getBoundingClientRect();
    pointer.x = e.clientX - box.left;
    pointer.y = e.clientY - box.top;
  }
  stage.addEventListener('pointerdown', (e) => {
    if (e.target.closest('a')) return;
    pointer.active = true;
    pointAt(e);
    wake();
  });
  stage.addEventListener('pointermove', (e) => {
    if (pointer.active) pointAt(e);
  });
  for (const type of ['pointerup', 'pointercancel', 'pointerleave']) {
    stage.addEventListener(type, () => { pointer.active = false; });
  }

  function step(dt) {
    // Acceleration from input.
    let ax = (keys.right ? 1 : 0) - (keys.left ? 1 : 0);
    let ay = (keys.down ? 1 : 0) - (keys.up ? 1 : 0);
    const push = 2600;
    ax *= push;
    ay *= push;
    if (pointer.active) {
      const dx = pointer.x - p.x;
      const dy = pointer.y - p.y;
      const dist = Math.hypot(dx, dy) || 1;
      const pull = Math.min(dist * 14, push);
      ax += (dx / dist) * pull;
      ay += (dy / dist) * pull;
    }

    // Inertia, then friction.
    p.vx += ax * dt;
    p.vy += ay * dt;
    const friction = Math.exp(-2.4 * dt);
    p.vx *= friction;
    p.vy *= friction;
    p.x += p.vx * dt;
    p.y += p.vy * dt;

    // Walls.
    if (p.x < R) { p.x = R; p.vx = Math.abs(p.vx) * 0.6; }
    if (p.x > W - R) { p.x = W - R; p.vx = -Math.abs(p.vx) * 0.6; }
    if (p.y < R) { p.y = R; p.vy = Math.abs(p.vy) * 0.6; }
    if (p.y > H - R) { p.y = H - R; p.vy = -Math.abs(p.vy) * 0.6; }

    // Letters: collide with the disc, then spring home.
    for (const L of letters) {
      const lx = L.cx + L.x;
      const ly = L.cy + L.y;
      const nearX = Math.max(lx - L.hw, Math.min(p.x, lx + L.hw));
      const nearY = Math.max(ly - L.hh, Math.min(p.y, ly + L.hh));
      let nx = p.x - nearX;
      let ny = p.y - nearY;
      let dist = Math.hypot(nx, ny);
      if (dist < R) {
        if (dist < 0.001) { nx = p.x - lx; ny = p.y - ly; dist = Math.hypot(nx, ny) || 1; }
        nx /= dist;
        ny /= dist;
        const overlap = R - Math.min(dist, R);
        const into = p.vx * nx + p.vy * ny; // negative when the disc moves into the letter
        L.x -= nx * overlap * 0.5;
        L.y -= ny * overlap * 0.5;
        p.x += nx * overlap * 0.5;
        p.y += ny * overlap * 0.5;
        if (into < 0) {
          L.vx += nx * into * 0.9;
          L.vy += ny * into * 0.9;
          // Off-centre hits spin the letter.
          const armX = nearX - lx;
          const armY = nearY - ly;
          L.vr += (armX * ny - armY * nx) * into * 0.0009;
          p.vx -= nx * into * 1.3;
          p.vy -= ny * into * 1.3;
        }
      }
      const k = 55;
      const c = 6;
      L.vx += (-k * L.x - c * L.vx) * dt;
      L.vy += (-k * L.y - c * L.vy) * dt;
      L.vr += (-k * L.r - c * L.vr) * dt;
      L.x += L.vx * dt;
      L.y += L.vy * dt;
      L.r += L.vr * dt;
    }
  }

  function draw(now) {
    disc.style.transform = `translate(${p.x.toFixed(1)}px, ${p.y.toFixed(1)}px)`;
    for (const L of letters) {
      L.el.style.transform =
        `translate(${L.x.toFixed(1)}px, ${L.y.toFixed(1)}px) rotate(${L.r.toFixed(3)}rad)`;
    }

    // The disc leaves a line that fades, like a pen running dry.
    const last = trail[trail.length - 1];
    if (!last || Math.hypot(p.x - last.x, p.y - last.y) > 3) trail.push({ x: p.x, y: p.y, t: now });
    while (trail.length && now - trail[0].t > TRAIL_LIFE) trail.shift();

    ctx.clearRect(0, 0, W, H);
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#0b7189';
    for (let i = 1; i < trail.length; i++) {
      const a = trail[i - 1];
      const b = trail[i];
      const age = (now - b.t) / TRAIL_LIFE;
      ctx.globalAlpha = (1 - age) * 0.55;
      ctx.lineWidth = 1 + (1 - age) * 3;
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
  }

  // At rest once nothing has visibly moved for half a second. The disc may come to rest
  // lodged among the letters, which then lean around it.
  let quietFrames = 0;
  const lastPose = { x: 0, y: 0 };
  function atRest() {
    if (pointer.active || keys.up || keys.down || keys.left || keys.right) { quietFrames = 0; return false; }
    let moved = Math.abs(p.x - lastPose.x) + Math.abs(p.y - lastPose.y);
    lastPose.x = p.x;
    lastPose.y = p.y;
    for (const L of letters) moved = Math.max(moved, (Math.abs(L.vx) + Math.abs(L.vy)) / 60, Math.abs(L.vr));
    quietFrames = moved < 0.05 ? quietFrames + 1 : 0;
    return quietFrames > 30 && trail.length <= 1;
  }

  // The loop sleeps when nothing is moving.
  let running = false;
  let lastTime = 0;
  function frame(ms) {
    const now = ms / 1000;
    const dt = Math.min(now - lastTime, 0.033);
    lastTime = now;
    step(dt);
    draw(now);
    if (atRest()) { running = false; return; }
    requestAnimationFrame(frame);
  }
  function wake() {
    if (running) return;
    running = true;
    lastTime = performance.now() / 1000;
    requestAnimationFrame(frame);
  }

  function start() {
    measure();
    disc.style.visibility = 'visible';
    if (reduceMotion) {
      // No motion until the visitor asks for it.
      p.x = W / 2;
      p.y = H * 0.82;
    } else {
      // Roll in from the left and nudge the first letter.
      const first = letters[0];
      p.x = R;
      p.y = first.cy;
      p.vx = Math.min(W * 1.1, 1500);
    }
    draw(performance.now() / 1000);
    wake();
  }

  let resizeTimer = 0;
  new ResizeObserver(() => {
    if (!W) return; // not started yet
    const box = stage.getBoundingClientRect();
    if (Math.abs(box.width - W) < 1 && Math.abs(box.height - H) < 1) return; // nothing changed
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      for (const L of letters) { L.x = L.y = L.r = L.vx = L.vy = L.vr = 0; }
      trail.length = 0;
      measure();
      p.x = Math.min(Math.max(p.x, R), W - R);
      p.y = Math.min(Math.max(p.y, R), H - R);
      wake();
    }, 150);
  }).observe(stage);

  if (document.fonts && document.fonts.ready) document.fonts.ready.then(start);
  else start();
})();
