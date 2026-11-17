// Lab only: choose the display face and the text face independently (two menus, bottom left).
// The choice is kept when moving between lab pages. Pages listen for "typechange".
// Display faces marked labels: false are too decorative for small labels; labels then use the text face.
(() => {
  const DISPLAY = [
    { id: 'bricolage', name: 'Bricolage Grotesque', family: "'Bricolage Grotesque'", weight: 800, labels: true },
    { id: 'unbounded', name: 'Unbounded', family: "'Unbounded'", weight: 900, labels: true },
    { id: 'archivo', name: 'Archivo Black', family: "'Archivo Black'", weight: 400, labels: true },
    { id: 'syne', name: 'Syne', family: "'Syne'", weight: 800, labels: true },
    { id: 'bungee', name: 'Bungee', family: "'Bungee'", weight: 400, labels: true },
    { id: 'pixelify', name: 'Pixelify Sans', family: "'Pixelify Sans'", weight: 700, labels: false },
    { id: 'tektur', name: 'Tektur', family: "'Tektur'", weight: 900, labels: true },
    { id: 'dela', name: 'Dela Gothic One', family: "'Dela Gothic One'", weight: 400, labels: true },
    { id: 'shoulders', name: 'Big Shoulders Display', family: "'Big Shoulders Display'", weight: 900, labels: true },
    { id: 'anybody', name: 'Anybody', family: "'Anybody'", weight: 900, labels: true },
    { id: 'monoton', name: 'Monoton', family: "'Monoton'", weight: 400, labels: false },
    { id: 'krona', name: 'Krona One', family: "'Krona One'", weight: 400, labels: true },
    { id: 'rubikmono', name: 'Rubik Mono One', family: "'Rubik Mono One'", weight: 400, labels: true },
    { id: 'zendots', name: 'Zen Dots', family: "'Zen Dots'", weight: 400, labels: true },
    { id: 'bowlby', name: 'Bowlby One', family: "'Bowlby One'", weight: 400, labels: true },
    { id: 'system', name: 'System (before)', family: "'Segoe UI Black', 'Arial Black', Impact", weight: 900, labels: true }
  ];
  const TEXT = [
    { id: 'fraunces', name: 'Fraunces', family: "'Fraunces'" },
    { id: 'literata', name: 'Literata', family: "'Literata'" },
    { id: 'sourceserif', name: 'Source Serif 4', family: "'Source Serif 4'" },
    { id: 'newsreader', name: 'Newsreader', family: "'Newsreader'" },
    { id: 'spectral', name: 'Spectral', family: "'Spectral'" },
    { id: 'atkinson', name: 'Atkinson Hyperlegible Next', family: "'Atkinson Hyperlegible Next'" },
    { id: 'figtree', name: 'Figtree', family: "'Figtree'" },
    { id: 'system', name: 'Georgia (before)', family: 'Georgia' }
  ];
  const KEY = 'pp-lab-type-2';

  const holder = document.createElement('div');
  holder.className = 'lab-types';
  holder.setAttribute('role', 'group');
  holder.setAttribute('aria-label', 'Typefaces (lab only)');

  function menu(id, label, options) {
    const wrap = document.createElement('label');
    wrap.textContent = label + ' ';
    const select = document.createElement('select');
    select.id = id;
    for (const o of options) {
      const opt = document.createElement('option');
      opt.value = o.id;
      opt.textContent = o.name;
      select.appendChild(opt);
    }
    wrap.appendChild(select);
    holder.appendChild(wrap);
    return select;
  }
  const displaySelect = menu('labDisplay', 'Display', DISPLAY);
  const textSelect = menu('labText', 'Text', TEXT);

  function apply(announce) {
    const d = DISPLAY.find((o) => o.id === displaySelect.value) || DISPLAY[0];
    const t = TEXT.find((o) => o.id === textSelect.value) || TEXT[0];
    const body = document.body.style;
    const textStack = `${t.family}, Georgia, serif`;
    body.setProperty('--display', `${d.family}, 'Arial Black', sans-serif`);
    body.setProperty('--display-weight', String(d.weight));
    body.setProperty('--body', textStack);
    body.setProperty('--body-font', textStack);
    body.setProperty('--label-font', d.labels ? `${d.family}, 'Arial Black', sans-serif` : textStack);
    body.setProperty('--label-weight', d.labels ? String(d.weight) : '700');
    document.body.dataset.display = d.id;
    document.body.dataset.text = t.id;
    try { localStorage.setItem(KEY, JSON.stringify({ display: d.id, text: t.id })); } catch (e) { /* storage blocked: lasts for this page only */ }
    if (announce) document.dispatchEvent(new Event('typechange'));
  }

  let saved = {};
  try { saved = JSON.parse(localStorage.getItem(KEY) || '{}') || {}; } catch (e) { saved = {}; }
  if (DISPLAY.some((o) => o.id === saved.display)) displaySelect.value = saved.display;
  if (TEXT.some((o) => o.id === saved.text)) textSelect.value = saved.text;
  displaySelect.addEventListener('change', () => apply(true));
  textSelect.addEventListener('change', () => apply(true));
  apply(false);
  document.body.appendChild(holder);
})();
