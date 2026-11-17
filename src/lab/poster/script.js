// Candidate C: the name grows cell by cell.
// One rule: a filled cell may fill a neighbour. Colour records how far each cell is from the seed,
// which leaves growth rings. Cells inside the letters are bright; cells outside are barely visible.
(() => {
  const wrap = document.getElementById('grow');
  const canvas = document.getElementById('cells');
  const hint = document.getElementById('hint');
  const ctx = canvas.getContext('2d');
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // The display face and weight come from CSS (--display, --display-weight), so the canvas
  // name always matches the heading it replaces.
  let FONT = 'sans-serif';
  let WEIGHT = '900';
  function readType() {
    const css = getComputedStyle(document.body);
    FONT = css.getPropertyValue('--display').trim() || 'sans-serif';
    WEIGHT = css.getPropertyValue('--display-weight').trim() || '900';
  }
  // Wait for the face itself; a canvas does not trigger font loading on its own.
  function fontReady() {
    readType();
    return document.fonts && document.fonts.load ? document.fonts.load(`${WEIGHT} 100px ${FONT}`).catch(() => {}) : Promise.resolve();
  }
  const LINES = ['PRIMORDIAL', 'PARADIGM'];
  let RING = [];   // the four ring colours, read from style.css
  let dim = 0.09;  // opacity of cells outside the letters
  const RING_SPAN = 34; // generations between one colour and the next
  const GROW_MS = 2200; // growth finishes in about this time on any screen size

  let W = 0;
  let H = 0;
  let cell = 6;
  let cols = 0;
  let rows = 0;
  let mask = null;      // 1 where a cell is inside a letter
  let filled = null;    // 1 once a cell has grown
  let generation = null;
  let frontier = [];
  let raf = 0;

  function readPalette() {
    const css = getComputedStyle(document.body);
    RING = [1, 2, 3, 4].map((n) => {
      const hex = css.getPropertyValue(`--ring-${n}`).trim().replace('#', '');
      return [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16));
    });
    dim = parseFloat(css.getPropertyValue('--dim')) || 0.09;
  }

  function ringColour(gen) {
    // Walk through the four ring colours and back again.
    const steps = RING.length - 1;
    let t = (gen / RING_SPAN) % (steps * 2);
    if (t > steps) t = steps * 2 - t;
    const i = Math.min(Math.floor(t), steps - 1);
    const f = t - i;
    const a = RING[i];
    const b = RING[i + 1];
    return [
      Math.round(a[0] + (b[0] - a[0]) * f),
      Math.round(a[1] + (b[1] - a[1]) * f),
      Math.round(a[2] + (b[2] - a[2]) * f)
    ];
  }

  function layout() {
    W = wrap.clientWidth - parseFloat(getComputedStyle(wrap).paddingLeft) * 2;
    cell = W < 700 ? 4 : 6;

    // Fit each line to the full width on its own, using the real edges of the glyphs,
    // so the shorter word is set larger, as on a letterpress poster.
    const probe = document.createElement('canvas').getContext('2d');
    const inner = W - cell * 4;
    let top = cell;
    const set = LINES.map((text) => {
      probe.font = `${WEIGHT} 200px ${FONT}`;
      let m = probe.measureText(text);
      const size = (200 * inner) / (m.actualBoundingBoxLeft + m.actualBoundingBoxRight);
      probe.font = `${WEIGHT} ${size}px ${FONT}`;
      m = probe.measureText(text);
      const line = { text, size, x: cell * 2 + m.actualBoundingBoxLeft, baseline: top + m.actualBoundingBoxAscent };
      top = line.baseline + m.actualBoundingBoxDescent + size * 0.09;
      return line;
    });
    H = Math.ceil(top - set[set.length - 1].size * 0.09 + cell);

    cols = Math.floor(W / cell);
    rows = Math.floor(H / cell);

    // Draw the name once, off screen, and sample it at each cell centre.
    const off = document.createElement('canvas');
    off.width = Math.ceil(W);
    off.height = H;
    const o = off.getContext('2d', { willReadFrequently: true });
    o.textBaseline = 'alphabetic';
    o.fillStyle = '#fff';
    for (const line of set) {
      o.font = `${WEIGHT} ${line.size}px ${FONT}`;
      o.fillText(line.text, line.x, line.baseline);
    }
    const px = o.getImageData(0, 0, off.width, off.height).data;

    mask = new Uint8Array(cols * rows);
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const sx = Math.min(off.width - 1, Math.floor(x * cell + cell / 2));
        const sy = Math.min(off.height - 1, Math.floor(y * cell + cell / 2));
        if (px[(sy * off.width + sx) * 4 + 3] > 127) mask[y * cols + x] = 1;
      }
    }

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(cols * cell * dpr);
    canvas.height = Math.round(rows * cell * dpr);
    canvas.style.aspectRatio = `${cols} / ${rows}`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function paint(index) {
    const x = index % cols;
    const y = (index - x) / cols;
    const [r, g, b] = ringColour(generation[index]);
    ctx.fillStyle = mask[index] ? `rgb(${r}, ${g}, ${b})` : `rgba(${r}, ${g}, ${b}, ${dim})`;
    ctx.fillRect(x * cell, y * cell, cell - 1, cell - 1);
  }


  function growOne() {
    // Pick a random cell on the edge of the growth and fill it.
    const pick = Math.floor(Math.random() * frontier.length);
    const index = frontier[pick];
    frontier[pick] = frontier[frontier.length - 1];
    frontier.pop();
    paint(index);

    const x = index % cols;
    const y = (index - x) / cols;
    const next = generation[index] + 1;
    if (x > 0) claim(index - 1, next);
    if (x < cols - 1) claim(index + 1, next);
    if (y > 0) claim(index - cols, next);
    if (y < rows - 1) claim(index + cols, next);
  }

  function claim(index, gen) {
    if (filled[index]) return;
    filled[index] = 1;
    generation[index] = gen;
    frontier.push(index);
  }

  function seed(cx, cy) {
    cancelAnimationFrame(raf);
    filled = new Uint8Array(cols * rows);
    generation = new Uint16Array(cols * rows);
    frontier = [];
    ctx.clearRect(0, 0, cols * cell, rows * cell);
    const x = Math.max(0, Math.min(cols - 1, Math.floor(cx / cell)));
    const y = Math.max(0, Math.min(rows - 1, Math.floor(cy / cell)));
    claim(y * cols + x, 0);
    // State is exposed on the element so tests can wait for the real end of growth.
    wrap.dataset.state = 'growing';
    const startedAt = performance.now();
    const done = () => { wrap.dataset.state = 'grown'; wrap.dataset.growMs = String(Math.round(performance.now() - startedAt)); };

    if (reduceMotion) {
      while (frontier.length) growOne();
      done();
      return;
    }
    // Each frame fills a share of all cells in proportion to the time elapsed, so a wide
    // screen grows as quickly as a narrow one.
    const total = cols * rows;
    let last = performance.now();
    const tick = (now) => {
      const dt = Math.min(Math.max(now - last, 0), 50);
      last = now;
      const count = Math.max(24, Math.ceil((total * dt) / GROW_MS));
      for (let i = 0; i < count && frontier.length; i++) growOne();
      if (frontier.length) raf = requestAnimationFrame(tick);
      else done();
    };
    raf = requestAnimationFrame(tick);
  }

  function start() {
    wrap.classList.add('live');
    hint.hidden = false;
    readPalette();
    layout();
    // First growth starts in the bowl of the first P.
    seed(W * 0.05, H * 0.25);
  }

  canvas.addEventListener('pointerdown', (e) => {
    const box = canvas.getBoundingClientRect();
    seed(((e.clientX - box.left) / box.width) * cols * cell, ((e.clientY - box.top) / box.height) * rows * cell);
  });

  let resizeTimer = 0;
  let lastWidth = window.innerWidth;
  window.addEventListener('resize', () => {
    if (window.innerWidth === lastWidth) return; // ignore mobile address-bar height changes
    lastWidth = window.innerWidth;
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => { layout(); seed(W * 0.05, H * 0.25); }, 200);
  });

  // A new typeface (lab switcher) re-lays the name and grows it again.
  document.addEventListener('typechange', () => {
    fontReady().then(() => { layout(); seed(W * 0.05, H * 0.25); });
  });

  fontReady().then(start);
})();
