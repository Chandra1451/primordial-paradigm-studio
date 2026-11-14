// =============================================================================
// Primordial Paradigm Studio - Atmosphere Screenshot Capturer
// Captures crisp, full-fidelity viewport screenshots across all 3 atmospheres:
// 1. Luminous Limestone (Mode 01)
// 2. Chromatic Twilight (Mode 02)
// 3. Warm Titanium (Mode 03)
// =============================================================================

import fs from 'node:fs';
import { mkdir, mkdtemp } from 'node:fs/promises';
import { spawn } from 'node:child_process';
import path from 'node:path';
import os from 'node:os';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const CODE_ROOT = path.resolve(__dirname, '..');
const SCREENSHOTS_DIR = path.join(CODE_ROOT, 'screenshots');
const ARTIFACT_DIR = 'C:\\Users\\Iron\\.gemini\\antigravity\\brain\\2223d087-b4a5-42a3-bd91-2ae73c14a0d4\\screenshots';

await mkdir(SCREENSHOTS_DIR, { recursive: true });
if (fs.existsSync(path.dirname(ARTIFACT_DIR))) {
  await mkdir(ARTIFACT_DIR, { recursive: true });
}

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
  console.error('No browser found.');
  process.exit(1);
}

const tempProfile = await mkdtemp(path.join(os.tmpdir(), 'pp-capture-'));
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
    close() {
      socket.close();
    }
  };
}

const targetPort = new URL(wsUrl).port;
const newTarget = await (await fetch(`http://127.0.0.1:${targetPort}/json/new?about:blank`, { method: 'PUT' })).json();
const pageClient = await createCdpClient(newTarget.webSocketDebuggerUrl);

await pageClient.send('Page.enable');
await pageClient.send('Runtime.enable');

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

async function capture(filename, atmo, route = '/', width = 1440, height = 900) {
  await pageClient.send('Emulation.setDeviceMetricsOverride', {
    width,
    height,
    deviceScaleFactor: 1,
    mobile: width < 600
  });

  await pageClient.send('Page.navigate', { url: `http://127.0.0.1:4321${route}` });
  for (let i = 0; i < 40; i++) {
    const ready = await evaluate(`document.readyState === 'complete'`);
    if (ready) break;
    await new Promise(r => setTimeout(r, 50));
  }

  // Switch atmosphere
  await evaluate(`window.__setAtmosphere('${atmo}')`);
  
  // Wait for canvas physics, fonts, and render loop
  await new Promise(r => setTimeout(r, 700));

  const screenshot = await pageClient.send('Page.captureScreenshot', {
    format: 'png',
    captureBeyondViewport: false
  });

  const buffer = Buffer.from(screenshot.data, 'base64');
  const localPath = path.join(SCREENSHOTS_DIR, filename);
  fs.writeFileSync(localPath, buffer);
  console.log(`Saved: ${localPath}`);

  if (fs.existsSync(path.dirname(ARTIFACT_DIR))) {
    const artifactPath = path.join(ARTIFACT_DIR, filename);
    fs.writeFileSync(artifactPath, buffer);
    console.log(`Copied to artifact: ${artifactPath}`);
  }
}

try {
  console.log('Capturing Mode 01: Luminous Limestone (Home)...');
  await capture('homepage-atmosphere-01-limestone.png', 'limestone', '/', 1440, 900);

  console.log('Capturing Mode 02: Chromatic Twilight (Home)...');
  await capture('homepage-atmosphere-02-twilight.png', 'twilight', '/', 1440, 900);

  console.log('Capturing Mode 03: Warm Titanium (Home)...');
  await capture('homepage-atmosphere-03-titanium.png', 'titanium', '/', 1440, 900);

  console.log('Capturing Mobile Mode 01: Limestone (390px)...');
  await capture('homepage-mobile-390-limestone.png', 'limestone', '/', 390, 844);

  console.log('Capturing Games Page: Limestone...');
  await capture('games-atmosphere-01-limestone.png', 'limestone', '/games/', 1440, 900);

  console.log('Capturing Services Page: Limestone...');
  await capture('services-atmosphere-01-limestone.png', 'limestone', '/services/', 1440, 900);

  console.log('All screenshots captured successfully.');
} catch (err) {
  console.error('Capture error:', err);
} finally {
  pageClient.close();
  browserProcess.kill();
  try {
    fs.rmSync(tempProfile, { recursive: true, force: true });
  } catch (e) {}
}
