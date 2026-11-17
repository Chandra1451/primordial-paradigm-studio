// Lab only: switch typeface pairings with the buttons at the bottom left, keys 1 to 9, or 0 for system fonts.
// The choice is kept when moving between lab pages. Pages listen for "typechange".
(() => {
  const SETS = [
    { id: 'bricolage', name: 'Bricolage + Fraunces' },
    { id: 'unbounded', name: 'Unbounded + Literata' },
    { id: 'archivo', name: 'Archivo Black + Source Serif 4' },
    { id: 'syne', name: 'Syne + Fraunces' },
    { id: 'bungee', name: 'Bungee + Literata' },
    { id: 'pixelify', name: 'Pixelify Sans + Source Serif 4' },
    { id: 'tektur', name: 'Tektur + Literata' },
    { id: 'dela', name: 'Dela Gothic One + Fraunces' },
    { id: 'shoulders', name: 'Big Shoulders + Source Serif 4' },
    { id: 'system', name: 'System (before)' }
  ];
  const KEY = 'pp-lab-type';

  const holder = document.createElement('div');
  holder.className = 'lab-types';
  holder.setAttribute('role', 'group');
  holder.setAttribute('aria-label', 'Typeface pairing (lab only)');

  function apply(id, announce) {
    const set = SETS.find((s) => s.id === id) || SETS[0];
    document.body.dataset.type = set.id;
    for (const b of holder.querySelectorAll('button')) b.setAttribute('aria-pressed', String(b.dataset.type === set.id));
    try { localStorage.setItem(KEY, set.id); } catch (e) { /* storage blocked: choice lasts for this page only */ }
    if (announce) document.dispatchEvent(new Event('typechange'));
  }

  SETS.forEach((set, i) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.dataset.type = set.id;
    b.textContent = `${(i + 1) % 10} ${set.name}`;
    b.addEventListener('click', () => apply(set.id, true));
    holder.appendChild(b);
  });

  window.addEventListener('keydown', (e) => {
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    if (!/^[0-9]$/.test(e.key)) return;
    const index = e.key === '0' ? 9 : Number(e.key) - 1;
    if (SETS[index]) apply(SETS[index].id, true);
  });

  let saved = '';
  try { saved = localStorage.getItem(KEY) || ''; } catch (e) { saved = ''; }
  apply(saved, false);
  document.body.appendChild(holder);
})();
