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
  // A. Play: press on the middle of the name and hold; the disc should arrive and move letters.
  await open('play', vp, 100);
  const maxShift = `Math.max(...[...document.querySelectorAll('.word .l')].map(l => { const m = new DOMMatrix(getComputedStyle(l).transform); return Math.hypot(m.e, m.f); }))`;
  let intro = 0;
  for (let i = 0; i < 20; i++) { intro = Math.max(intro, await evaluate(maxShift)); await sleep(100); }
  check(`play/${vp.name}: opening roll moves a letter`, intro > 0.5, `max shift ${intro.toFixed(1)}px`);
  await sleep(1500);
  const box = await evaluate(`(() => { const r = document.querySelector('.word').getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; })()`);
  await mouse('mousePressed', box.x, box.y);
  await sleep(700);
  await mouse('mouseMoved', box.x + vp.width * 0.2, box.y + 20);
  await sleep(500);
  const held = await evaluate(maxShift);
  await shot(`play-${vp.name}`);
  await mouse('mouseReleased', box.x + vp.width * 0.2, box.y + 20);
  check(`play/${vp.name}: dragging knocks letters about`, held > 3, `max shift ${held.toFixed(1)}px`);
  await sleep(8000);
  const settledA = await evaluate(maxShift);
  await sleep(700);
  const settledB = await evaluate(maxShift);
  check(`play/${vp.name}: everything comes to rest`, Math.abs(settledA - settledB) < 0.2, `max shift ${settledA.toFixed(2)}px then ${settledB.toFixed(2)}px`);
  const disc = await evaluate(`(() => { const r = document.getElementById('disc').getBoundingClientRect(); return r.left >= -1 && r.top >= -1 && r.right <= innerWidth + 1 && r.bottom <= innerHeight + 1; })()`);
  check(`play/${vp.name}: disc stays inside the stage`, disc === true);

  // B. Notebook: drag the ball to the right and release; it should keep gliding, then stop.
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

  // C. Poster: growth should finish and cover the whole name; a click should restart it.
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
}

check('no JavaScript exceptions', errors.length === 0, errors.slice(0, 3).join(' | '));

ws.close();
chrome.kill();
const failed = results.filter((r) => !r.ok).length;
console.log(`\n${results.length - failed} / ${results.length} passed`);
process.exit(failed ? 1 : 0);
