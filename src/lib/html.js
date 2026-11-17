// Escaping helpers. Every value placed into HTML from content files or config goes
// through esc(); Markdown bodies are rendered separately by marked (owner-written only).

const ENTITIES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };

export function esc(value) {
  return String(value ?? '').replace(/[&<>"']/g, (ch) => ENTITIES[ch]);
}

// JSON for <script type="application/ld+json">: "<" is escaped so the data can never
// close the script element early.
export function jsonForScript(data) {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

// "2026-11-17" -> "17 November 2026" (fixed, locale-independent output).
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
export function formatDate(iso) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(iso || ''));
  if (!m) throw new Error(`Invalid date "${iso}": use YYYY-MM-DD`);
  return `${Number(m[3])} ${MONTHS[Number(m[2]) - 1]} ${m[1]}`;
}
