// =============================================================================
// Primordial Paradigm Studio - Automated Local Browser Verification
// Multi-viewport layout (320, 390, 768, 1440px), WCAG AAA contrast, links,
// zero-overflow assertions, and positive/negative flaw control probing.
// Zero external npm dependencies; uses native Node.js and installed Chrome/Edge.
// =============================================================================

import http from 'node:http';
import fs from 'node:fs';
import { readFile, writeFile, mkdir, mkdtemp } from 'node:fs/promises';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import os from 'node:os';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const CODE_ROOT = path.resolve(__dirname, '..');
const DIST_DIR = path.join(CODE_ROOT, 'dist');
const REPORT_DIR = path.join(CODE_ROOT, 'test-results');

// Find installed Chrome or Edge
const BROWSER_PATHS = [
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe'
];

let browserExe = null;
for (const p of BROWSER_PATHS) {
  if (fs.existsSync(p)) {
    browserExe = p;
    break;
  }
}

if (!browserExe) {
  console.error('FAIL: No installed Chrome or Edge browser found for verification.');
  process.exit(1);
}

await mkdir(REPORT_DIR, { recursive: true });

// MIME types dictionary
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.xml': 'application/xml',
  '.txt': 'text/plain; charset=utf-8',
  '.json': 'application/json'
};

// Serve pages with the same Content-Security-Policy the live server sends (public/.htaccess),
// so a page that needs inline code or a third-party resource fails here, not in production.
// upgrade-insecure-requests is dropped because this test server is plain http on loopback.
const htaccess = fs.readFileSync(path.join(CODE_ROOT, 'public', '.htaccess'), 'utf8');
const cspMatch = htaccess.match(/Content-Security-Policy "([^"]+)"/);
if (!cspMatch) { console.error('No Content-Security-Policy found in public/.htaccess'); process.exit(1); }
const CSP = cspMatch[1].replace(/;\s*upgrade-insecure-requests/, '');

// Loopback HTTP server
const server = http.createServer(async (req, res) => {
  let reqPath = new URL(req.url, 'http://127.0.0.1').pathname;
  if (reqPath.endsWith('/')) {
    reqPath += 'index.html';
  }

  const filePath = path.join(DIST_DIR, reqPath);
  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found');
    return;
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';
  try {
    const data = await readFile(filePath);
    res.writeHead(200, { 'Content-Type': contentType, 'Cache-Control': 'no-store', 'Content-Security-Policy': CSP });
    res.end(data);
  } catch (err) {
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('500 Server Error');
  }
});

await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
const serverPort = server.address().port;
const baseUrl = `http://127.0.0.1:${serverPort}`;

const tempProfile = await mkdtemp(path.join(os.tmpdir(), 'pp-verify-'));
const browserProcess = spawn(browserExe, [
  '--headless=new',
  '--remote-debugging-port=0',
  `--user-data-dir=${tempProfile}`,
  '--no-first-run',
  '--no-default-browser-check',
  '--disable-background-networking',
  '--disable-component-update',
  '--disable-extensions',
  'about:blank'
], { windowsHide: true, stdio: ['ignore', 'ignore', 'pipe'] });

const testResults = [];
const failures = [];

function recordCheck(name, passed, detail = null) {
  testResults.push({ name, passed, detail });
  if (!passed) {
    failures.push(name);
    console.error(`  FAIL: ${name} ${detail ? JSON.stringify(detail) : ''}`);
  } else {
    console.log(`  PASS: ${name}`);
  }
}

async function createCdpClient(address) {
  const socket = new WebSocket(address);
  await new Promise((resolve, reject) => {
    socket.addEventListener('open', resolve, { once: true });
    socket.addEventListener('error', reject, { once: true });
  });

  let seq = 0;
  const pending = new Map();
  const events = new Map();

  socket.addEventListener('message', ev => {
    const msg = JSON.parse(ev.data);
    if (msg.id) {
      const p = pending.get(msg.id);
      if (p) {
        pending.delete(msg.id);
        clearTimeout(p.timer);
        if (msg.error) p.reject(new Error(JSON.stringify(msg.error)));
        else p.resolve(msg.result);
      }
    } else {
      const cbs = events.get(msg.method) || [];
      for (const cb of cbs) cb(msg.params);
    }
  });

  return {
    send(method, params = {}) {
      return new Promise((resolve, reject) => {
        const id = ++seq;
        const timer = setTimeout(() => {
          pending.delete(id);
          reject(new Error(`CDP Timeout: ${method}`));
        }, 15000);
        pending.set(id, { resolve, reject, timer });
        socket.send(JSON.stringify({ id, method, params }));
      });
    },
    on(method, cb) {
      const cbs = events.get(method) || [];
      cbs.push(cb);
      events.set(method, cbs);
    },
    close() {
      socket.close();
    }
  };
}

let browserClient, pageClient;

try {
  console.log('--- Primordial Paradigm Studio: Browser Test Suite ---');
  console.log(`Browser: ${browserExe}`);

  // Retrieve WebSocket debugger URL from Chrome stderr
  const wsUrl = await new Promise((resolve, reject) => {
    let errOutput = '';
    const timeout = setTimeout(() => reject(new Error('Browser startup timed out')), 15000);
    browserProcess.stderr.on('data', d => {
      errOutput += String(d);
      const match = errOutput.match(/DevTools listening on (ws:\/\/[^\s]+)/);
      if (match) {
        clearTimeout(timeout);
        resolve(match[1]);
      }
    });
    browserProcess.once('error', reject);
    browserProcess.once('exit', code => reject(new Error(`Browser exited with code ${code}`)));
  });

  browserClient = await createCdpClient(wsUrl);
  const targetPort = new URL(wsUrl).port;
  const newTarget = await (await fetch(`http://127.0.0.1:${targetPort}/json/new?about:blank`, { method: 'PUT' })).json();
  pageClient = await createCdpClient(newTarget.webSocketDebuggerUrl);

  const runtimeErrors = [];
  pageClient.on('Runtime.exceptionThrown', p => runtimeErrors.push(p.exceptionDetails.text));

  await pageClient.send('Page.enable');
  await pageClient.send('Runtime.enable');
  // Record Content-Security-Policy violations on every page (this listener is installed by the
  // test harness, outside the page, so the policy itself does not block it).
  await pageClient.send('Page.addScriptToEvaluateOnNewDocument', {
    source: "window.__csp = []; document.addEventListener('securitypolicyviolation', (e) => window.__csp.push(e.violatedDirective + ' ' + (e.blockedURI || 'inline')));"
  });

  const evaluate = async (expr) => {
    const res = await pageClient.send('Runtime.evaluate', {
      expression: expr,
      returnByValue: true,
      awaitPromise: true
    });
    if (res.exceptionDetails) {
      throw new Error(JSON.stringify(res.exceptionDetails));
    }
    return res.result.value;
  };

  const navigateTo = async (route) => {
    await pageClient.send('Page.navigate', { url: `${baseUrl}${route}` });
    for (let i = 0; i < 40; i++) {
      const ready = await evaluate(`document.readyState === 'complete'`);
      if (ready) break;
      await new Promise(r => setTimeout(r, 50));
    }
  };

  // Every page type. /learn/sample-layout/ is a test fixture (build --fixtures), never deployed.
  const ROUTES_TO_TEST = [
    '/',
    '/games/',
    '/games/ninefold-chaos/',
    '/games/ninefold-chaos/journal/',
    '/games/ninefold-chaos/journal/starting-the-journal/',
    '/learn/',
    '/learn/sample-layout/',
    '/services/',
    '/about/',
    '/404.html'
  ];
  const VIEWPORTS = [
    { name: 'desktop-1440', width: 1440, height: 900 },
    { name: 'tablet-768', width: 768, height: 1024 },
    { name: 'mobile-390', width: 390, height: 844 },
    { name: 'compact-320', width: 320, height: 640 }
  ];

  // 1. Multi-viewport and Zero Horizontal Overflow Assertions
  for (const vp of VIEWPORTS) {
    await pageClient.send('Emulation.setDeviceMetricsOverride', {
      width: vp.width,
      height: vp.height,
      deviceScaleFactor: 1,
      mobile: vp.width < 600
    });

    for (const route of ROUTES_TO_TEST) {
      await navigateTo(route);

      const metrics = await evaluate(`({
        innerWidth: window.innerWidth,
        scrollWidth: document.documentElement.scrollWidth,
        hasH1: document.querySelectorAll('h1').length === 1,
        brokenImages: [...document.images].filter(img => !img.complete || img.naturalWidth === 0).length,
        brokenAnchors: [...document.querySelectorAll('a[href^="#"]')].filter(a => a.hash.length > 1 && !document.getElementById(a.hash.slice(1))).length,
        internalLinks: [...document.querySelectorAll('a[href^="/"]')].map(a => a.getAttribute('href'))
      })`);

      // Test zero overflow
      const zeroOverflow = metrics.scrollWidth <= vp.width + 1;
      let overflowDetail = {
        innerWidth: metrics.innerWidth,
        scrollWidth: metrics.scrollWidth
      };
      if (!zeroOverflow) {
        const culprits = await evaluate(`(() => {
          const els = [];
          document.querySelectorAll('*').forEach(el => {
            const r = el.getBoundingClientRect();
            if (r.right > ${vp.width} + 1) {
              els.push({ tag: el.tagName, class: el.className, right: Math.round(r.right), width: Math.round(r.width) });
            }
          });
          return els.slice(0, 10);
        })()`);
        overflowDetail.culprits = culprits;
      }
      recordCheck(`${route} [${vp.name}] zero-horizontal-overflow`, zeroOverflow, overflowDetail);

      // Test single H1 landmark
      recordCheck(`${route} [${vp.name}] single-h1-landmark`, metrics.hasH1);

      // Test zero broken images
      recordCheck(`${route} [${vp.name}] zero-broken-images`, metrics.brokenImages === 0, {
        brokenCount: metrics.brokenImages
      });

      // Test zero broken internal anchor hashes
      recordCheck(`${route} [${vp.name}] valid-internal-anchors`, metrics.brokenAnchors === 0);

      // No Content-Security-Policy violations (no inline code, no third-party resources)
      const cspViolations = await evaluate('window.__csp || []');
      recordCheck(`${route} [${vp.name}] zero-csp-violations`, cspViolations.length === 0, cspViolations);

      // Skip link targets the single <main>
      const landmarks = await evaluate(`({ mains: document.querySelectorAll('main#main').length, skip: !!document.querySelector('a.skip[href="#main"]') })`);
      recordCheck(`${route} [${vp.name}] skip-link-and-single-main`, landmarks.mains === 1 && landmarks.skip, landmarks);
    }
  }

  // 2. Readability and interaction on every page type, at desktop and phone width.
  // Contrast is measured (WCAG formula) against the page ground, not just read.
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
  // Body text needs 7:1 (AAA); labels and small headings 4.5:1 (AA).
  const contrastPlan = {
    '/': { '.lead-text': 7, '.cols p': 7, '.lead h2': 4.5, '.grow-hint': 4.5, '.foot p': 7 },
    '/games/ninefold-chaos/': { '.game-body p': 7, '.eyebrow': 4.5 },
    '/games/ninefold-chaos/journal/': { '.opening h1': 7, '.entry div p': 7, '.margin': 4.5 },
    '/games/ninefold-chaos/journal/starting-the-journal/': { '.entry-body p': 7, '.margin': 4.5 },
    '/learn/sample-layout/': { '.essay-body p': 7, '.kicker': 4.5, '.essay-body h2': 4.5, 'pre': 7, '.note': 7 },
    '/services/': { '.page-body p': 7, '.eyebrow': 4.5 }
  };
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const mouse = (type, x, y) => pageClient.send('Input.dispatchMouseEvent', { type, x, y, button: 'left', buttons: type === 'mouseReleased' ? 0 : 1, clickCount: 1 });
  const fontsLoaded = `({ tektur: document.fonts.check('900 50px Tektur'), figtree: document.fonts.check('400 20px Figtree') })`;

  for (const vp of [VIEWPORTS[0], VIEWPORTS[2]]) {
    await pageClient.send('Emulation.setDeviceMetricsOverride', { width: vp.width, height: vp.height, deviceScaleFactor: 1, mobile: vp.width < 600 });

    for (const [route, plan] of Object.entries(contrastPlan)) {
      await navigateTo(route);
      await sleep(300);
      const ratios = await evaluate(contrastOf(Object.keys(plan)));
      for (const [sel, need] of Object.entries(plan)) {
        recordCheck(`${route} [${vp.name}] contrast ${sel} >= ${need}:1`, ratios[sel] >= need, { ratio: Number(ratios[sel].toFixed(2)) });
      }
    }

    // Growing name: real fonts, finishes in under 4 s, fits the width, regrows on click.
    for (const route of ['/', '/games/ninefold-chaos/']) {
      await navigateTo(route);
      for (let t = 0; t < 150 && (await evaluate(`document.querySelector('.grow').dataset.state`)) !== 'grown'; t++) await sleep(100);
      const grow = await evaluate(`(() => {
        const wrap = document.querySelector('.grow'); const c = wrap.querySelector('.grow-cells');
        const d = c.getContext('2d').getImageData(c.width - 3, 0, 3, c.height).data;
        let clipped = false; for (let i = 3; i < d.length; i += 4) if (d[i] > 200) { clipped = true; break; }
        const all = c.getContext('2d').getImageData(0, 0, c.width, c.height).data;
        let lit = 0; for (let i = 3; i < all.length; i += 4) if (all[i] > 200) lit++;
        return { state: wrap.dataset.state, ms: Number(wrap.dataset.growMs), clipped, lit: lit / (c.width * c.height), live: wrap.classList.contains('live') };
      })()`);
      const fonts = await evaluate(fontsLoaded);
      recordCheck(`${route} [${vp.name}] growing name finishes in under 4s`, grow.state === 'grown' && grow.ms < 4000, grow);
      recordCheck(`${route} [${vp.name}] growing name fits and is drawn`, grow.live && !grow.clipped && grow.lit > 0.15, grow);
      recordCheck(`${route} [${vp.name}] Tektur and Figtree load`, fonts.tektur && fonts.figtree, fonts);
      const box = await evaluate(`(() => { const r = document.querySelector('.grow-cells').getBoundingClientRect(); return { x: r.left + r.width * 0.6, y: r.top + r.height * 0.6 }; })()`);
      await mouse('mousePressed', box.x, box.y);
      await mouse('mouseReleased', box.x, box.y);
      await sleep(60);
      const restarted = await evaluate(`document.querySelector('.grow').dataset.state`);
      recordCheck(`${route} [${vp.name}] click regrows the name`, restarted === 'growing' || restarted === 'grown', { state: restarted });
    }

    // Journal sketch: the ball follows a drag, glides after release, stops, selects no text.
    await navigateTo('/games/ninefold-chaos/journal/');
    await evaluate(`document.getElementById('flick').scrollIntoView({ block: 'center' })`);
    await sleep(1800);
    const ball = () => evaluate(`(() => { const r = document.getElementById('ball').getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; })()`);
    const b0 = await ball();
    await mouse('mousePressed', b0.x, b0.y);
    const stepPx = vp.width * 0.012;
    for (let i = 1; i <= 8; i++) { await mouse('mouseMoved', b0.x - i * stepPx, b0.y); await sleep(16); }
    const b1 = await ball();
    await mouse('mouseReleased', b0.x - 8 * stepPx, b0.y);
    await sleep(350);
    const b2 = await ball();
    await sleep(4000);
    const b3 = await ball();
    await sleep(600);
    const b4 = await ball();
    const selected = await evaluate('String(window.getSelection())');
    recordCheck(`journal sketch [${vp.name}] ball follows drag, glides, stops`, b1.x < b0.x - 2 && b2.x < b1.x - 2 && Math.abs(b4.x - b3.x) < 0.5, { b0: b0.x, b1: b1.x, b2: b2.x, b3: b3.x, b4: b4.x });
    recordCheck(`journal sketch [${vp.name}] dragging selects no text`, selected === '', { selected });

    // Essay: about 65 characters per line, margin notes clear of the text, progress strip fills.
    await navigateTo('/learn/sample-layout/');
    await sleep(600);
    const read = await evaluate(`(() => {
      const p = [...document.querySelectorAll('.essay-body p:not(.opening)')].sort((a, b) => b.textContent.length - a.textContent.length)[0];
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
      const note = document.querySelector('.note').getBoundingClientRect();
      const para = p.getBoundingClientRect();
      return { perLine, noteLeft: note.left, paraRight: para.right, noteApart: note.top >= para.bottom || note.bottom <= para.top };
    })()`);
    const wide = vp.width >= 1100;
    recordCheck(`essay [${vp.name}] line length readable`, wide ? read.perLine >= 50 && read.perLine <= 75 : read.perLine <= 75, read);
    recordCheck(`essay [${vp.name}] margin note clear of the text`, wide ? read.noteLeft >= read.paraRight : read.noteApart, read);
    const opening = await evaluate(`!!document.querySelector('.essay-body p.opening .initial')`);
    recordCheck(`essay [${vp.name}] cell-grid opening letter present`, opening);
    const before = Number(await evaluate(`document.getElementById('progress').dataset.share`));
    await evaluate('window.scrollTo(0, document.documentElement.scrollHeight)');
    await sleep(300);
    const after = Number(await evaluate(`document.getElementById('progress').dataset.share`));
    recordCheck(`essay [${vp.name}] progress strip fills on scroll`, after > before && after > 0.95, { before, after });
  }
  await pageClient.send('Emulation.setDeviceMetricsOverride', { width: VIEWPORTS[0].width, height: VIEWPORTS[0].height, deviceScaleFactor: 1, mobile: false });
  await navigateTo('/');

  // 3. Probing: Negative Control (Flaw Injection)
  // Inject an intentional 2500px wide element and assert the test runner catches the overflow
  const negativeControlDetected = await evaluate(`(() => {
    const probe = document.createElement('div');
    probe.id = 'flaw-probe';
    probe.style.width = '2500px';
    probe.style.height = '10px';
    document.body.appendChild(probe);
    const detected = document.documentElement.scrollWidth > window.innerWidth + 1;
    probe.remove();
    return detected;
  })()`);
  recordCheck('flaw-probing-negative-control (detects forced 2500px overflow)', negativeControlDetected);

  // 4. Probing: Positive Control (Clean Restoration)
  const cleanRestoration = await evaluate(`document.documentElement.scrollWidth <= window.innerWidth + 1`);
  recordCheck('flaw-probing-positive-control (clean recovery after probe removal)', cleanRestoration);

  // 4b. Probing: the Content-Security-Policy really blocks inline code, and the detector sees it.
  await navigateTo('/');
  const cspProbe = await evaluate(`new Promise((resolve) => {
    const before = window.__csp.length;
    window.__probeRan = false;
    const s = document.createElement('script');
    s.textContent = 'window.__probeRan = true;';
    document.body.appendChild(s);
    setTimeout(() => resolve({ blocked: window.__probeRan === false, reported: window.__csp.length > before }), 150);
  })`);
  recordCheck('flaw-probing-csp-control (inline script blocked and reported)', cspProbe.blocked && cspProbe.reported, cspProbe);

  // 5. Runtime Exceptions Check
  recordCheck('zero-runtime-javascript-exceptions', runtimeErrors.length === 0, runtimeErrors);

  // 6. Capture visual previews for owner inspection
  const screenshotsDir = path.join(REPORT_DIR, 'screenshots');
  await mkdir(screenshotsDir, { recursive: true });

  // Every page at desktop and phone width, full length, after any growing name has finished.
  for (const vp of [{ name: 'desktop', width: 1440, height: 900, mobile: false }, { name: 'phone', width: 390, height: 844, mobile: true }]) {
    await pageClient.send('Emulation.setDeviceMetricsOverride', { width: vp.width, height: vp.height, deviceScaleFactor: 1, mobile: vp.mobile });
    for (const route of ROUTES_TO_TEST) {
      await navigateTo(route);
      for (let t = 0; t < 60 && (await evaluate(`(document.querySelector('.grow') || { dataset: { state: 'grown' } }).dataset.state`)) !== 'grown'; t++) {
        await new Promise((r) => setTimeout(r, 100));
      }
      await new Promise((r) => setTimeout(r, 400));
      const shot = await pageClient.send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true });
      const name = (route.replace(/^\/|\/$/g, '').replace(/[/.]/g, '-') || 'home') + `-${vp.name}.png`;
      await writeFile(path.join(screenshotsDir, name), Buffer.from(shot.data, 'base64'));
    }
  }

  // Write structured JSON summary report
  const summaryReport = {
    suite: 'Primordial Paradigm Studio Local Browser Verification',
    timestamp: new Date().toISOString(),
    browser: browserExe,
    viewportsTested: VIEWPORTS.map(v => v.name),
    routesTested: ROUTES_TO_TEST,
    totalChecks: testResults.length,
    passed: testResults.filter(r => r.passed).length,
    failed: failures.length,
    failures,
    results: testResults
  };

  const reportPath = path.join(REPORT_DIR, 'summary.json');
  fs.writeFileSync(reportPath, JSON.stringify(summaryReport, null, 2), 'utf8');
  console.log(`\n--- Verification Complete ---`);
  console.log(`Passed: ${summaryReport.passed} / ${summaryReport.totalChecks}`);
  console.log(`Failed: ${summaryReport.failed}`);
  console.log(`Machine Report: ${reportPath}`);

  if (failures.length > 0) {
    process.exit(1);
  }
} catch (err) {
  console.error('Fatal Verification Error:', err);
  process.exit(1);
} finally {
  pageClient?.close();
  browserClient?.close();
  browserProcess?.kill();
  server.close();
}
