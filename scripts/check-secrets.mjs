// =============================================================================
// Primordial Paradigm Studio - Automated Secret Leak Scanner
// Validates source and build directories for accidental secret disclosures.
// Zero external dependencies; uses native Node.js APIs.
// =============================================================================

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const CODE_ROOT = path.resolve(__dirname, '..');

// High-confidence regex patterns for credentials and secrets
const SECRET_PATTERNS = [
  { name: 'Private Key Block', regex: /-----BEGIN\s+([A-Z\s]+)?PRIVATE\s+KEY-----/i },
  { name: 'AWS Access Key ID', regex: /\b(AKIA|ABIA|ACCA|ASIA)[0-9A-Z]{16}\b/ },
  { name: 'Generic API Key / Secret Assignment', regex: /(?:api[_-]?key|client[_-]?secret|auth[_-]?token|access[_-]?token)\s*[:=]\s*['"][a-zA-Z0-9_\-\.]{16,}['"]/i },
  { name: 'Bearer Token String', regex: /bearer\s+[a-zA-Z0-9_\-\.]{25,}/i },
  { name: 'Hardcoded Password Assignment', regex: /(?:password|passwd|pwd)\s*[:=]\s*['"][^\s'"]{8,}['"]/i },
  { name: 'Hostinger API / OAuth Token', regex: /(?:hostinger[_-]?(?:api[_-]?token|key))\s*[:=]\s*['"][a-zA-Z0-9_\-]{20,}['"]/i },
  { name: 'Google API Key', regex: /AIza[0-9A-Za-z\-_]{35}/ }
];

// Directories to ignore during scanning
const IGNORED_DIRS = new Set([
  'node_modules',
  '.git',
  '.astro',
  '.vscode',
  'scratch',
  'reports'
]);

// File extensions to scan
const SCANNABLE_EXTENSIONS = new Set([
  '.js', '.mjs', '.cjs', '.ts', '.astro',
  '.html', '.json', '.yaml', '.yml', '.md',
  '.css', '.svg', '.txt'
]);

function scanDirectory(dirPath, violations = []) {
  if (!fs.existsSync(dirPath)) return violations;

  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);

    if (entry.isDirectory()) {
      if (!IGNORED_DIRS.has(entry.name)) {
        scanDirectory(fullPath, violations);
      }
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      // Block any .env files immediately
      if (entry.name.startsWith('.env') && entry.name !== '.env.example') {
        violations.push({
          file: path.relative(CODE_ROOT, fullPath),
          rule: 'Prohibited .env file committed in repository'
        });
        continue;
      }

      if (SCANNABLE_EXTENSIONS.has(ext)) {
        try {
          const content = fs.readFileSync(fullPath, 'utf8');
          for (const pattern of SECRET_PATTERNS) {
            if (pattern.regex.test(content)) {
              violations.push({
                file: path.relative(CODE_ROOT, fullPath),
                rule: pattern.name
              });
              break; // One violation per file is enough to flag
            }
          }
        } catch (err) {
          // Ignore unreadable files
        }
      }
    }
  }

  return violations;
}

// Target scanning of src, public, scripts, and dist (if present)
const TARGET_DIRS = ['src', 'public', 'scripts', 'dist'];
let allViolations = [];

for (const target of TARGET_DIRS) {
  const targetPath = path.join(CODE_ROOT, target);
  scanDirectory(targetPath, allViolations);
}

// Report results
console.log('--- Primordial Paradigm Studio: Secret Scanner ---');
if (allViolations.length === 0) {
  console.log('Status: PASS. No secret patterns or private files detected.');
  process.exit(0);
} else {
  console.error(`Status: FAIL. Detected ${allViolations.length} potential secret disclosure(s):`);
  for (const v of allViolations) {
    // Only print filename and rule name - NEVER print matching secret content!
    console.error(`  - [${v.rule}]: ${v.file}`);
  }
  process.exit(1);
}

