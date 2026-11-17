// =============================================================================
// Primordial Paradigm Studio - Git Auto-Deployment Script
// Builds, verifies, and pushes the production static distribution directly
// to the 'production' branch on GitHub for automated Hostinger deployment.
// =============================================================================

import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const CODE_ROOT = path.resolve(__dirname, '..');
const DIST_DIR = path.join(CODE_ROOT, 'dist');
const REMOTE_URL = 'https://github.com/Chandra1451/primordial-paradigm-studio.git';

console.log('=== Primordial Paradigm Studio: Deploying to Production Branch ===');

function run(cmd, cwd = CODE_ROOT) {
  console.log(`\n$ ${cmd} (in ${path.relative(CODE_ROOT, cwd) || '.'})`);
  const res = spawnSync(cmd, { cwd, shell: true, stdio: 'inherit' });
  if (res.status !== 0) {
    console.error(`✗ Command failed with exit code ${res.status}: ${cmd}`);
    process.exit(1);
  }
}

// 0. Deploy only committed code from main, so every release can be rebuilt.
function capture(args) {
  const res = spawnSync('git', args, { cwd: CODE_ROOT, encoding: 'utf8' });
  if (res.status !== 0) {
    console.error(`ERROR: git ${args.join(' ')} failed`);
    process.exit(1);
  }
  return res.stdout.trim();
}
const branch = capture(['rev-parse', '--abbrev-ref', 'HEAD']);
if (branch !== 'main') {
  console.error(`ERROR: deploys run from main only (current branch: ${branch}).`);
  process.exit(1);
}
if (capture(['status', '--porcelain']) !== '') {
  console.error('ERROR: working tree has uncommitted changes. Commit or stash them before deploying.');
  process.exit(1);
}
const sourceCommit = capture(['rev-parse', '--short', 'HEAD']);
console.log(`Source commit: ${sourceCommit}`);

// 0b. Every content file must be approved by the owner (front matter "review: approved").
const pendingReview = [];
(function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walk(full);
    else if (e.name.endsWith('.md') && !/^review:\s*approved\s*$/m.test(fs.readFileSync(full, 'utf8'))) {
      pendingReview.push(path.relative(CODE_ROOT, full));
    }
  }
})(path.join(CODE_ROOT, 'src', 'content'));
if (pendingReview.length) {
  console.error('ERROR: content not yet approved by the owner (set "review: approved" after review):');
  for (const f of pendingReview) console.error(`  - ${f}`);
  process.exit(1);
}

// 1. Run full verification suite (secrets, build, claims, links, browser tests).
// npm test ends with a clean production build in dist/.
console.log('\n[1/4] Running full verification pipeline...');
run('npm test', CODE_ROOT);

// 2. Ensure dist directory exists and contains critical assets
console.log('\n[2/4] Verifying production distribution integrity...');
for (const artifact of ['FIXTURE_BUILD', 'LAB_BUILD', 'lab', 'explore', 'specimen', 'learn/sample-layout']) {
  if (fs.existsSync(path.join(DIST_DIR, artifact))) {
    console.error(`ERROR: test or lab artifact found in production build: dist/${artifact}`);
    process.exit(1);
  }
}
const criticalFiles = ['index.html', '404.html', '.htaccess', 'favicon.svg', 'robots.txt', 'sitemap.xml'];
for (const file of criticalFiles) {
  if (!fs.existsSync(path.join(DIST_DIR, file))) {
    console.error(`✗ Missing critical production file: dist/${file}`);
    process.exit(1);
  }
}

// 3. Initialize / update git repository inside dist/
console.log('\n[3/4] Packaging static assets for production branch...');
const distGitDir = path.join(DIST_DIR, '.git');
if (fs.existsSync(distGitDir)) {
  fs.rmSync(distGitDir, { recursive: true, force: true });
}

run('git init -b production', DIST_DIR);
run('git config user.name "Chandra1451"', DIST_DIR);
run('git config user.email "49201353+Chandra1451@users.noreply.github.com"', DIST_DIR);
run('git add -A', DIST_DIR);

const timestamp = new Date().toISOString();
run(`git commit -m "deploy: release production build ${timestamp} (source ${sourceCommit})"`, DIST_DIR);
run(`git remote add origin ${REMOTE_URL}`, DIST_DIR);

// 4. Force push production branch to origin
console.log('\n[4/4] Pushing to GitHub (origin/production)...');
run('git push --force origin production', DIST_DIR);

// Clean up .git inside dist so it doesn't affect local workspace
if (fs.existsSync(distGitDir)) {
  fs.rmSync(distGitDir, { recursive: true, force: true });
}

console.log('\n✓ Production branch deployed successfully!');
// Mark the deployed source so a previous release can be checked out and redeployed.
const releaseTag = `deploy-${timestamp.replace(/[:.]/g, '-')}`;
run(`git tag ${releaseTag}`, CODE_ROOT);
console.log(`  Release tag (local): ${releaseTag}`);
console.log('  Branch: production');
console.log('  Target: https://github.com/Chandra1451/primordial-paradigm-studio/tree/production');
console.log('\nHostinger Git Auto-Deployment will now pull the latest production release.');

