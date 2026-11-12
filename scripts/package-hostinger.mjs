// =============================================================================
// Primordial Paradigm Studio - Hostinger Release Packager
// Creates an audited, production-ready ZIP archive of dist/ for Hostinger upload.
// Zero third-party dependencies; uses pure Node.js standard library (node:zlib, node:crypto).
// =============================================================================

import { readdir, readFile, mkdir, writeFile, stat } from 'node:fs/promises';
import { deflateRawSync, crc32 } from 'node:zlib';
import { createHash } from 'node:crypto';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const CODE_ROOT = path.resolve(__dirname, '..');
const DIST_DIR = path.join(CODE_ROOT, 'dist');
const RELEASE_DIR = path.join(CODE_ROOT, 'release');

console.log('=== Primordial Paradigm Studio: Packaging Release for Hostinger ===');

// 1. Verify dist/ exists and contains critical assets
try {
  const distStat = await stat(DIST_DIR);
  if (!distStat.isDirectory()) throw new Error('dist is not a directory');
} catch (err) {
  console.error('✗ dist/ directory not found. Run npm run build first.');
  process.exit(1);
}

const requiredFiles = ['index.html', '404.html', 'robots.txt', 'sitemap.xml', 'favicon.svg', '.htaccess'];
for (const req of requiredFiles) {
  try {
    await stat(path.join(DIST_DIR, req));
  } catch {
    console.error(`✗ Required production file missing from dist/: ${req}`);
    process.exit(1);
  }
}

// 2. Gather all files in dist/ recursively (including dotfiles like .htaccess)
async function listFiles(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...(await listFiles(fullPath)));
    } else {
      out.push(fullPath);
    }
  }
  return out;
}

const allFiles = (await listFiles(DIST_DIR)).sort();
console.log(`  Found ${allFiles.length} files to package from dist/`);

// 3. Build pure ZIP format in memory
function dosDateTime(d) {
  const time = (d.getHours() << 11) | (d.getMinutes() << 5) | Math.floor(d.getSeconds() / 2);
  const date = ((d.getFullYear() - 1980) << 9) | ((d.getMonth() + 1) << 5) | d.getDate();
  return { time, date };
}

const locals = [];
const centrals = [];
let offset = 0;
const { time, date } = dosDateTime(new Date());

for (const filePath of allFiles) {
  const relPath = path.relative(DIST_DIR, filePath).replaceAll('\\', '/');
  const nameBuffer = Buffer.from(relPath, 'utf8');
  const fileData = await readFile(filePath);
  const deflated = deflateRawSync(fileData, { level: 9 });
  const useDeflate = deflated.length < fileData.length;
  const body = useDeflate ? deflated : fileData;
  const fileCrc = crc32(fileData);

  // Local file header (30 bytes)
  const localHeader = Buffer.alloc(30);
  localHeader.writeUInt32LE(0x04034b50, 0); // Local header signature
  localHeader.writeUInt16LE(20, 4);         // Version needed (2.0)
  localHeader.writeUInt16LE(0x0800, 6);     // General purpose bit flag (UTF-8 filename)
  localHeader.writeUInt16LE(useDeflate ? 8 : 0, 8); // Compression method (8 = deflate, 0 = store)
  localHeader.writeUInt16LE(time, 10);      // Last mod file time
  localHeader.writeUInt16LE(date, 12);      // Last mod file date
  localHeader.writeUInt32LE(fileCrc, 14);    // CRC-32
  localHeader.writeUInt32LE(body.length, 18);// Compressed size
  localHeader.writeUInt32LE(fileData.length, 22); // Uncompressed size
  localHeader.writeUInt16LE(nameBuffer.length, 26); // Filename length
  localHeader.writeUInt16LE(0, 28);         // Extra field length

  locals.push(localHeader, nameBuffer, body);

  // Central directory entry (46 bytes)
  const centralHeader = Buffer.alloc(46);
  centralHeader.writeUInt32LE(0x02014b50, 0); // Central directory signature
  centralHeader.writeUInt16LE(20, 4);          // Version made by
  centralHeader.writeUInt16LE(20, 6);          // Version needed
  centralHeader.writeUInt16LE(0x0800, 8);      // General purpose bit flag (UTF-8)
  centralHeader.writeUInt16LE(useDeflate ? 8 : 0, 10); // Compression method
  centralHeader.writeUInt16LE(time, 12);       // Last mod time
  centralHeader.writeUInt16LE(date, 14);       // Last mod date
  centralHeader.writeUInt32LE(fileCrc, 16);     // CRC-32
  centralHeader.writeUInt32LE(body.length, 20); // Compressed size
  centralHeader.writeUInt32LE(fileData.length, 24); // Uncompressed size
  centralHeader.writeUInt16LE(nameBuffer.length, 28); // Filename length
  centralHeader.writeUInt16LE(0, 30);          // Extra field length
  centralHeader.writeUInt16LE(0, 32);          // File comment length
  centralHeader.writeUInt16LE(0, 34);          // Disk number start
  centralHeader.writeUInt16LE(0, 36);          // Internal file attributes
  centralHeader.writeUInt32LE(0, 38);          // External file attributes
  centralHeader.writeUInt32LE(offset, 42);     // Relative offset of local header

  centrals.push(centralHeader, nameBuffer);

  offset += localHeader.length + nameBuffer.length + body.length;
}

const centralSize = centrals.reduce((n, b) => n + b.length, 0);

// End of central directory record (22 bytes)
const eocd = Buffer.alloc(22);
eocd.writeUInt32LE(0x06054b50, 0);            // EOCD signature
eocd.writeUInt16LE(0, 4);                     // Number of this disk
eocd.writeUInt16LE(0, 6);                     // Disk where central directory starts
eocd.writeUInt16LE(allFiles.length, 8);        // Number of central directory records on this disk
eocd.writeUInt16LE(allFiles.length, 10);       // Total number of central directory records
eocd.writeUInt32LE(centralSize, 12);          // Size of central directory
eocd.writeUInt32LE(offset, 16);               // Offset of start of central directory
eocd.writeUInt16LE(0, 20);                    // Comment length

const zipBuffer = Buffer.concat([...locals, ...centrals, eocd]);

// 4. Ensure release/ directory exists and write archive
await mkdir(RELEASE_DIR, { recursive: true });
const dateStamp = new Date().toISOString().split('T')[0];
const outFileName = `primordial-paradigm-launch-${dateStamp}.zip`;
const outFilePath = path.join(RELEASE_DIR, outFileName);

await writeFile(outFilePath, zipBuffer);

// 5. Compute SHA-256 for release verification audit
const hash = createHash('sha256').update(zipBuffer).digest('hex');
const sizeKb = (zipBuffer.length / 1024).toFixed(1);

console.log(`\n✓ Package created successfully:`);
console.log(`  Path: ${outFilePath}`);
console.log(`  Size: ${sizeKb} KB`);
console.log(`  SHA-256: ${hash}`);
console.log(`\nReady for Hostinger upload into public_html/.`);
