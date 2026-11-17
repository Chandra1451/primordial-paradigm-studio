// Loads Markdown content files: front matter + body rendered to HTML.
// Required fields are enforced here so a missing title or date fails the build
// instead of shipping an empty page.

import fs from 'node:fs';
import path from 'node:path';
import { marked } from 'marked';
import { parseFrontmatter } from '../utils/frontmatter.js';

marked.setOptions({ gfm: true, breaks: false });

// review: "pending" while the owner has not approved the text; "approved" once they have.
// The deploy script refuses to ship anything still pending.
const REVIEW_VALUES = new Set(['pending', 'approved']);

export function loadFile(file, required = []) {
  const raw = fs.readFileSync(file, 'utf8');
  const { metadata, content } = parseFrontmatter(raw);
  for (const key of ['title', 'review', ...required]) {
    if (!metadata[key]) throw new Error(`${file}: missing front matter field "${key}"`);
  }
  if (!REVIEW_VALUES.has(metadata.review)) {
    throw new Error(`${file}: review must be "pending" or "approved", got "${metadata.review}"`);
  }
  return { ...metadata, slug: path.basename(file, '.md'), file, bodyHtml: marked.parse(content) };
}

// All .md files in a folder, newest date first (then by slug, for a stable order).
export function loadFolder(dir, required = []) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .map((f) => loadFile(path.join(dir, f), required))
    .sort((a, b) => String(b.date || '').localeCompare(String(a.date || '')) || a.slug.localeCompare(b.slug));
}
