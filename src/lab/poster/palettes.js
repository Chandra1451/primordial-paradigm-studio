// Lab only: switch between colour combinations to compare them.
// The colours themselves live in style.css under [data-palette="..."].
(() => {
  const PALETTES = [
    { id: 'plum', name: 'Plum' },
    { id: 'limestone', name: 'Limestone' },
    { id: 'lichen', name: 'Lichen' },
    { id: 'ember', name: 'Ember' },
    { id: 'ink', name: 'Ink' },
    { id: 'clay', name: 'Clay' }
  ];
  const holder = document.getElementById('labPalettes');
  const label = document.createElement('span');
  label.className = 'lab-palette-name';

  function apply(id) {
    const palette = PALETTES.find((p) => p.id === id) || PALETTES[0];
    document.body.dataset.palette = palette.id;
    label.textContent = palette.name;
    for (const b of holder.querySelectorAll('button')) b.setAttribute('aria-pressed', String(b.dataset.palette === palette.id));
    history.replaceState(null, '', '#' + palette.id);
    document.dispatchEvent(new Event('palettechange'));
  }

  PALETTES.forEach((palette, i) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.dataset.palette = palette.id;
    b.title = `${i + 1}. ${palette.name}`;
    b.setAttribute('aria-label', `${palette.name} colours`);
    b.appendChild(document.createElement('i'));
    b.addEventListener('click', () => apply(palette.id));
    holder.appendChild(b);
  });
  holder.appendChild(label);

  window.addEventListener('keydown', (e) => {
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    const n = Number(e.key);
    if (n >= 1 && n <= PALETTES.length) apply(PALETTES[n - 1].id);
  });

  apply(location.hash.slice(1));
})();
