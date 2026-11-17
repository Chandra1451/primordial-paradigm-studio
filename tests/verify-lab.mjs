// Drives the redesign lab candidates in headless Chrome with real input, at desktop and phone width.
// Run with: npm run test:lab (builds the lab first). Screenshots go to test-results/lab/.
import { spawn } from 'node:child_process';
import { writeFile, mkdtemp, mkdir } from 'node:fs/promises';
import { pathToFileURL, fileURLToPath } from 'node:url';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';

const CODE_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distDir = path.join(CODE_ROOT, 'dist');
const outDir = path.join(CODE_ROOT, 'test-results', 'lab');
await mkdir(outDir, { recursive: true });
if (!fs.existsSync(path.join(distDir, 'LAB_BUILD'))) {
  console.error('No lab build in dist/. Run "npm run build:lab" first.');
  process.exit(1);
}
const CHROME = [
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe'
].find((p) => fs.existsSync(p));
if (!CHROME) { console.error('Chrome or Edge not found.'); process.exit(1); }
const PORT = 9347;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const profile = await mkdtemp(path.join(os.tmpdir(), 'labcheck-'));
const chrome = spawn(CHROME, ['--headless=new', '--disable-gpu', `--remote-debugging-port=${PORT}`, `--user-data-dir=${profile}`, 'about:blank'], { stdio: 'ignore' });

let target;
for (let i = 0; i < 50 && !target; i++) {
  await sleep(200);
  try {
    const list = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json();
    target = list.find((t) => t.type === 'page');
  } catch {}
}
if (!target) { console.error('Chrome did not start'); chrome.kill(); process.exit(1); }

const ws = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((r) => ws.addEventListener('open', r));
let seq = 0;
const pending = new Map();
const errors = [];
ws.addEventListener('message', (ev) => {
  const msg = JSON.parse(ev.data);
  if (msg.id && pending.has(msg.id)) { pending.get(msg.id)(msg.result || msg.error); pending.delete(msg.id); }
  if (msg.method === 'Runtime.exceptionThrown') errors.push(msg.params.exceptionDetails.exception?.description || msg.params.exceptionDetails.text);
});
const send = (method, params = {}) => new Promise((resolve) => { const id = ++seq; pending.set(id, resolve); ws.send(JSON.stringify({ id, method, params })); });
const evaluate = async (expression) => (await send('Runtime.evaluate', { expression, returnByValue: true })).result?.value;
const mouse = (type, x, y, extra = {}) => send('Input.dispatchMouseEvent', { type, x, y, button: 'left', buttons: type === 'mouseReleased' ? 0 : 1, clickCount: 1, ...extra });
const shot = async (name) => {
  const { data } = await send('Page.captureScreenshot', { format: 'png' });
  await writeFile(path.join(outDir, name + '.png'), Buffer.from(data, 'base64'));
};

await send('Runtime.enable');
await send('Page.enable');

const VIEWPORTS = [
  { name: 'desktop', width: 1440, height: 900, mobile: false },
  { name: 'phone', width: 390, height: 844, mobile: true }
];

// Contrast of each selector's text colour against the page ground (WCAG formula).
const contrastOf = (selectors) => `(() => {
  const lum = (c) => { const [r, g, b] = c.match(/[0-9.]+/g).slice(0, 3).map((v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }); return 0.2126 * r + 0.7152 * g + 0.0722 * b; };
  const ground = getComputedStyle(document.body).backgroundColor;
  const out = {};
  for (const sel of ${JSON.stringify(selectors)}) {
    const el = document.querySelector(sel);
    if (!el) { out[sel] = 0; continue; }
    const [hi, lo] = [lum(getComputedStyle(el).color), lum(ground)].sort((x, y) => y - x);
    out[sel] = (hi + 0.05) / (lo + 0.05);
  }
  return out;
})()`;

const results = [];
const check = (name, ok, detail = '') => { results.push({ name, ok }); console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${detail ? '  (' + detail + ')' : ''}`); };

async function open(candidate, vp, wait = 2600) {
  await send('Emulation.setDeviceMetricsOverride', { width: vp.width, height: vp.height, deviceScaleFactor: 1, mobile: vp.mobile });
  await send('Page.navigate', { url: pathToFileURL(path.join(distDir, 'lab', candidate, 'index.html')).href });
  await sleep(wait);
  const overflow = await evaluate('document.documentElement.scrollWidth - window.innerWidth');
  check(`${candidate}/${vp.name}: no horizontal overflow`, overflow <= 0, `scrollWidth - innerWidth = ${overflow}`);
}

for (const vp of VIEWPORTS) {
  // Notebook: drag the ball to the right and release; it should keep gliding, then stop.
  await open('notebook', vp);
  await evaluate(`document.getElementById('flick').scrollIntoView({ block: 'center' })`);
  await sleep(1800);
  const ball = async () => evaluate(`(() => { const r = document.getElementById('ball').getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; })()`);
  const b0 = await ball();
  await mouse('mousePressed', b0.x, b0.y);
  const stepPx = vp.width * 0.012;
  for (let i = 1; i <= 8; i++) { await mouse('mouseMoved', b0.x - i * stepPx, b0.y); await sleep(16); }
  const b1 = await ball();
  await mouse('mouseReleased', b0.x - 8 * stepPx, b0.y);
  await sleep(350);
  const b2 = await ball();
  await shot(`notebook-${vp.name}`);
  await sleep(4000);
  const b3 = await ball();
  await sleep(600);
  const b4 = await ball();
  check(`notebook/${vp.name}: ball follows the drag`, b1.x < b0.x - 2, `${b0.x.toFixed(0)} -> ${b1.x.toFixed(0)}`);
  check(`notebook/${vp.name}: ball glides after release`, b2.x < b1.x - 2, `${b1.x.toFixed(0)} -> ${b2.x.toFixed(0)}`);
  check(`notebook/${vp.name}: friction brings it to rest`, Math.abs(b4.x - b3.x) < 0.5, `${b3.x.toFixed(1)} -> ${b4.x.toFixed(1)}`);
  const selected = await evaluate('String(window.getSelection())');
  check(`notebook/${vp.name}: dragging selects no text`, selected === '', selected ? `selected "${selected.slice(0, 30)}"` : '');
  const nb = await evaluate(contrastOf(['h1', '.entry div p', '.margin', '.top nav a']));
  for (const [sel, ratio] of Object.entries(nb)) {
    const need = sel === '.margin' || sel === '.top nav a' ? 4.5 : 7;
    check(`notebook/${vp.name}: ${sel} contrast`, ratio >= need, `${ratio.toFixed(1)}:1, needs ${need}:1`);
  }

  // Poster: growth should finish and cover the whole name; a click should restart it.
  await open('poster', vp, 250);
  const lit = `(() => { const c = document.getElementById('cells'); const d = c.getContext('2d').getImageData(0, 0, c.width, c.height).data; let n = 0; for (let i = 3; i < d.length; i += 4) if (d[i] > 200) n++; return n / (c.width * c.height); })()`;
  const early = await evaluate(lit);
  await sleep(900);
  await shot(`poster-${vp.name}-growing`);
  await sleep(7000);
  const full = await evaluate(lit);
  await shot(`poster-${vp.name}`);
  check(`poster/${vp.name}: name grows over time`, full > early && full > 0.2, `lit ${Math.round(early * 100)}% -> ${Math.round(full * 100)}%`);
  const edge = await evaluate(`(() => { const c = document.getElementById('cells'); const d = c.getContext('2d').getImageData(c.width - 3, 0, 3, c.height).data; for (let i = 3; i < d.length; i += 4) if (d[i] > 200) return true; return false; })()`);
  check(`poster/${vp.name}: last letter is not clipped at the right edge`, edge === false);
  const cb = await evaluate(`(() => { const r = document.getElementById('cells').getBoundingClientRect(); return { x: r.left + r.width * 0.7, y: r.top + r.height * 0.7 }; })()`);
  await mouse('mousePressed', cb.x, cb.y);
  await mouse('mouseReleased', cb.x, cb.y);
  await sleep(120);
  const restarted = await evaluate(lit);
  check(`poster/${vp.name}: click restarts growth`, restarted < full * 0.5, `lit ${Math.round(restarted * 100)}%`);

  // Readability of the Clay palette on the poster: body text, labels, and the lead paragraph.
  await sleep(6500); // let the regrow from the click finish before the screenshot
  const poster = await evaluate(contrastOf(['.cols p', '.lead h2', '.lead-text', '.hint']));
  for (const [sel, ratio] of Object.entries(poster)) {
    const need = sel === '.lead h2' || sel === '.hint' ? 4.5 : 7;
    check(`poster/${vp.name}: ${sel} contrast`, ratio >= need, `${ratio.toFixed(1)}:1, needs ${need}:1`);
  }
  await shot(`poster-${vp.name}-final`);
  const leadFirst = await evaluate(`document.querySelector('.lead').getBoundingClientRect().top < document.querySelector('.cols').getBoundingClientRect().top`);
  check(`poster/${vp.name}: games block comes before the other sections`, leadFirst === true);

  // Typefaces (two lab menus). Browsers load a face only when text uses it, so each page is
  // checked for the faces it shows: every display face on the poster, every text face on the
  // notebook and essay pages.
  const fontState = `(() => {
    const css = getComputedStyle(document.body);
    const first = (stack) => stack.split(',')[0].trim();
    const display = first(css.getPropertyValue('--display'));
    const weight = css.getPropertyValue('--display-weight').trim();
    const body = first(css.getPropertyValue('--body-font'));
    return { display: document.body.dataset.display, text: document.body.dataset.text, displayFamily: display, bodyFamily: body,
      displayOk: document.fonts.check(weight + ' 50px ' + display),
      bodyOk: document.fonts.check('400 20px ' + body),
      italicOk: document.fonts.check('italic 400 20px ' + body) };
  })()`;
  const optionsOf = (id) => evaluate(`[...document.getElementById('${id}').options].map(o => o.value)`);
  const choose = (id, value) => evaluate(`(() => { const s = document.getElementById('${id}'); s.value = '${value}'; s.dispatchEvent(new Event('change')); })()`);
  const overflowNow = () => evaluate('document.documentElement.scrollWidth - window.innerWidth');

  // Poster: every display face (text face fixed).
  await open('poster', vp, 400);
  const displays = await optionsOf('labDisplay');
  check(`poster/${vp.name}: 16 display faces offered`, displays.length === 16, `${displays.length} found`);
  for (const id of displays) {
    await choose('labDisplay', id);
    await sleep(300);
    for (let t = 0; t < 150 && (await evaluate(`document.getElementById('grow').dataset.state`)) !== 'grown'; t++) await sleep(100);
    const growMs = Number(await evaluate(`document.getElementById('grow').dataset.growMs`));
    const st = await evaluate(fontState);
    const clipped = await evaluate(`(() => { const c = document.getElementById('cells'); const d = c.getContext('2d').getImageData(c.width - 3, 0, 3, c.height).data; for (let i = 3; i < d.length; i += 4) if (d[i] > 200) return true; return false; })()`);
    const overflow = await overflowNow();
    const ok = (id === 'system' || st.displayOk) && overflow <= 0 && !clipped && growMs < 4000;
    check(`poster/${vp.name}: display ${id} loads, fits, grows in under 4s`, ok, `${st.displayFamily}, overflow ${overflow}, clipped ${clipped}, grown in ${growMs}ms`);
    await shot(`poster-${vp.name}-display-${id}`);
  }

  // Notebook and essay: every text face (display face fixed).
  for (const page of ['notebook', 'essay']) {
    await open(page, vp, 400);
    const texts = await optionsOf('labText');
    check(`${page}/${vp.name}: 8 text faces offered`, texts.length === 8, `${texts.length} found`);
    for (const id of texts) {
      await choose('labText', id);
      await sleep(900);
      const st = await evaluate(fontState);
      const overflow = await overflowNow();
      const ok = (id === 'system' || (st.bodyOk && st.italicOk)) && overflow <= 0;
      check(`${page}/${vp.name}: text ${id} loads and fits`, ok, `${st.bodyFamily}, regular ${st.bodyOk}, italic ${st.italicOk}, overflow ${overflow}`);
      await shot(`${page}-${vp.name}-text-${id}`);
    }
  }

  // Essay reading checks (default faces).
  await choose('labText', 'fraunces');
  await sleep(600);
  const read = await evaluate(`(() => {
    const p = [...document.querySelectorAll('.essay-body p:not(.opening)')].sort((a, b) => b.textContent.length - a.textContent.length)[0];
    // Exact count: characters whose box sits on the paragraph's first line.
    const node = [...p.childNodes].find(n => n.nodeType === 3);
    const range = document.createRange();
    let firstTop = null, perLine = 0;
    for (let i = 0; i < node.length; i++) {
      range.setStart(node, i); range.setEnd(node, i + 1);
      const r = range.getBoundingClientRect();
      if (r.width === 0 && r.height === 0) continue;
      if (firstTop === null) firstTop = Math.round(r.top);
      if (Math.abs(Math.round(r.top) - firstTop) > 2) break;
      perLine++;
    }
    range.selectNodeContents(p);
    const lines = new Set([...range.getClientRects()].map(r => Math.round(r.top))).size;
    const note = document.querySelector('.note').getBoundingClientRect();
    const para = p.getBoundingClientRect();
    return { perLine, lines, noteLeft: note.left, paraRight: para.right, noteBelow: note.top >= para.bottom || note.bottom <= para.top };
  })()`);
  const wide = vp.width >= 1100;
  check(`essay/${vp.name}: line length readable`, wide ? read.perLine <= 75 && read.perLine >= 50 : read.perLine <= 75,
    `about ${Math.round(read.perLine)} characters per line over ${read.lines} lines`);
  check(`essay/${vp.name}: margin note clear of the text`, wide ? read.noteLeft >= read.paraRight : read.noteBelow,
    wide ? `note starts ${Math.round(read.noteLeft - read.paraRight)}px right of the text` : 'note sits between paragraphs');
  const essayContrast = await evaluate(contrastOf(['.essay-body p', '.kicker', 'h2', 'pre', '.note']));
  for (const [sel, ratio] of Object.entries(essayContrast)) {
    const need = sel === '.kicker' || sel === 'h2' ? 4.5 : 7;
    check(`essay/${vp.name}: ${sel} contrast`, ratio >= need, `${ratio.toFixed(1)}:1, needs ${need}:1`);
  }
  const before = Number(await evaluate(`document.getElementById('progress').dataset.share`));
  await evaluate('window.scrollTo(0, document.documentElement.scrollHeight)');
  await sleep(300);
  const after = Number(await evaluate(`document.getElementById('progress').dataset.share`));
  check(`essay/${vp.name}: progress strip fills on scroll`, after > before && after > 0.95, `${before} -> ${after}`);
  await evaluate('window.scrollTo(0, 0)');
  await sleep(200);
  await shot(`essay-${vp.name}`);
}

check('no JavaScript exceptions', errors.length === 0, errors.slice(0, 3).join(' | '));

ws.close();
chrome.kill();
const failed = results.filter((r) => !r.ok).length;
console.log(`\n${results.length - failed} / ${results.length} passed`);
process.exit(failed ? 1 : 0);
