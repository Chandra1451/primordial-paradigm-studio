// =============================================================================
// Primordial Paradigm Studio - Static Claim & Hallucination Checker
// Enforces specs/10_brief/verified-brand-and-claims.md against dist/*.html.
// Zero external dependencies; native Node.js.
// =============================================================================

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const CODE_ROOT = path.resolve(__dirname, '..');
const DIST_DIR = path.join(CODE_ROOT, 'dist');

// Prohibited terms and unverified marketing claims per verified-brand-and-claims.md
const PROHIBITED_CLAIMS = [
  { name: 'Unverified Steam / Storefront Release', regex: /\b(?:wishlist\s+on\s+steam|available\s+on\s+steam|buy\s+on\s+steam|play\s+now|download\s+demo|early\s+access\s+release)\b/i },
  { name: 'Unverified Console Announcement', regex: /\b(?:playstation|ps5|xbox\s+series|nintendo\s+switch)\b/i },
  { name: 'Unverified Team Size Claim', regex: /\b(?:team\s+of\s+\d+|global\s+team\s+of|our\s+\d+\s+engineers|over\s+\d+\s+employees)\b/i },
  { name: 'Unverified Enterprise Social Proof', regex: /\b(?:trusted\s+by\s+fortune\s+500|industry-leading\s+enterprise|award-winning\s+studio|over\s+\d+\s+million\s+users)\b/i },
  { name: 'Unverified Legal Incorporation Claim', regex: /\b(?:primordial\s+paradigm\s+(?:inc|llc|corp|ltd|pvt\s+ltd))\b/i },
  { name: 'Fictional Pricing or Money-Back Guarantee', regex: /\b(?:money-back\s+guarantee|100%\s+satisfaction\s+guaranteed|pricing\s+starts\s+at\s+\$)\b/i },
  // Added 2026-11-17 from owner decisions (specs/10_brief/verified-brand-and-claims.md):
  { name: 'Retired Test Content (not authentic)', regex: /\b(?:systemic\s+movement|low-cognitive\s+load|vector\s+kinematics)\b/i },
  { name: 'Unannounced Game Genre (game is an action-adventure; styles undecided)', regex: /\b(?:shoot[\s-]*'?em[\s-]*up|shmup|side-scrolling\s+shooter|bullet[\s-]hell)\b/i },
  { name: 'Invented Map Coordinates', regex: /\d{1,3}\.\d+\s*°\s*[NSEW]\b/ },
  { name: 'Unlabelled Placeholder Text in a Production Build', regex: /\b(?:placeholder|lorem\s+ipsum)\b/i }
];

// The only email address the site may show (owner-supplied, persona only).
const ALLOWED_EMAILS = new Set(['contact@primordialparadigm.com']);
const EMAIL_PATTERN = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi;

console.log('--- Primordial Paradigm Studio: Static Claim Checker ---');

if (!fs.existsSync(DIST_DIR)) {
  console.error('FAIL: dist/ directory not found. Run npm run build first.');
  process.exit(1);
}

const violations = [];

function checkHtmlFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const relativePath = path.relative(DIST_DIR, filePath);

  for (const claim of PROHIBITED_CLAIMS) {
    if (claim.regex.test(content)) {
      violations.push({
        file: relativePath,
        claim: claim.name
      });
    }
  }
  for (const email of content.match(EMAIL_PATTERN) || []) {
    if (!ALLOWED_EMAILS.has(email.toLowerCase())) {
      // The address itself is not printed: it may be personal.
      violations.push({ file: relativePath, claim: 'Email address other than the approved contact address' });
    }
  }
}

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full);
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      checkHtmlFile(full);
    }
  }
}

walk(DIST_DIR);

if (violations.length === 0) {
  console.log('Status: PASS. All rendered pages adhere strictly to verified brand claims.');
  process.exit(0);
} else {
  console.error(`Status: FAIL. Detected ${violations.length} prohibited/unverified claim(s):`);
  for (const v of violations) {
    console.error(`  - [${v.claim}] in dist/${v.file}`);
  }
  process.exit(1);
}

