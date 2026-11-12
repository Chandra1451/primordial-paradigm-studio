// =============================================================================
// Primordial Paradigm Studio - Local Preview Server
// Serves static compiled output in dist/ for local visual inspection.
// Zero dependencies; native Node.js.
// =============================================================================

import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const CODE_ROOT = path.resolve(__dirname, '..');
const DIST_DIR = path.join(CODE_ROOT, 'dist');
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 4321;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.xml': 'application/xml',
  '.txt': 'text/plain; charset=utf-8',
  '.json': 'application/json'
};

if (!fs.existsSync(DIST_DIR)) {
  console.error('Error: dist/ directory not found. Please run "npm run build" first.');
  process.exit(1);
}

const server = http.createServer((req, res) => {
  let reqPath = new URL(req.url, `http://127.0.0.1:${PORT}`).pathname;
  if (reqPath.endsWith('/')) {
    reqPath += 'index.html';
  }

  let filePath = path.join(DIST_DIR, reqPath);

  // If path doesn't have an extension, try path/index.html
  if (!path.extname(filePath)) {
    filePath = path.join(filePath, 'index.html');
  }

  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end('<h1>404 Not Found</h1><p><a href="/">Return to Home</a></p>');
    return;
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  try {
    const data = fs.readFileSync(filePath);
    res.writeHead(200, {
      'Content-Type': contentType,
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff'
    });
    res.end(data);
  } catch (err) {
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('500 Server Error');
  }
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`\n=============================================================`);
  console.log(`  Primordial Paradigm Studio — Local Preview Server Active`);
  console.log(`  Local Address: http://127.0.0.1:${PORT}/`);
  console.log(`=============================================================`);
  console.log(`\nAvailable Preview Routes:`);
  console.log(`  - Home:        http://127.0.0.1:${PORT}/`);
  console.log(`  - Games Hub:   http://127.0.0.1:${PORT}/games/`);
  console.log(`  - Devlog:      http://127.0.0.1:${PORT}/games/systemic-movement-prototype/`);
  console.log(`  - Learn Hub:   http://127.0.0.1:${PORT}/learn/`);
  console.log(`  - Essay:       http://127.0.0.1:${PORT}/learn/systems-architecture-first-principles/`);
  console.log(`  - Services:    http://127.0.0.1:${PORT}/services/`);
  console.log(`  - About:       http://127.0.0.1:${PORT}/about/`);
  console.log(`  - Sitemap:     http://127.0.0.1:${PORT}/sitemap.xml`);
  console.log(`\nPress Ctrl+C to stop the preview server.\n`);
});

