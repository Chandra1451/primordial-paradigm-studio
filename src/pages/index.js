// =============================================================================
// Primordial Paradigm Studio - Homepage Module (Option 1: Editorial Broad-Sheet)
// Inspirations: Playdead, Remedy (Alan Wake 2), Awwwards Editorial Winners.
// High-contrast typography, celestial accretion singularity, and archival telemetry.
// =============================================================================

import { renderBaseLayout } from '../layouts/BaseLayout.js';
import { renderEditorialBroadSheetHero } from '../components/EditorialBroadSheetHero.js';
import { renderEditorialIndexLedger } from '../components/EditorialIndexLedger.js';

export function renderHomePage() {
  const content = `
    <!-- Top Comparative Notice Bar -->
    <div style="background: rgba(245, 158, 11, 0.08); border-bottom: 1px solid rgba(245, 158, 11, 0.2); padding: 0.6rem 1rem; font-family: var(--font-mono); font-size: 0.72rem; color: #f59e0b; text-align: center; letter-spacing: 0.05em;">
      [ACTIVE DIRECTION: OPTION 1 &mdash; THE EDITORIAL BROAD-SHEET] &mdash; 
      <a href="/specimen/" style="color: #06b6d4; text-decoration: underline; margin-left: 0.5rem; font-weight: 600;">Compare with Option 3: Living Specimen Atelier &rarr;</a>
      <span style="color: rgba(255,255,255,0.25); margin: 0 0.5rem;">|</span>
      <a href="/explore/" style="color: var(--text-muted); text-decoration: underline; font-weight: 500;">Motion Lab (/explore/) &rarr;</a>
    </div>

    <!-- 1. Editorial Broad-Sheet Hero with Gravitational Singularity Canvas -->
    ${renderEditorialBroadSheetHero()}

    <!-- 2. Archival Project Ledger & Broadsheet Colophon -->
    ${renderEditorialIndexLedger()}
  `.trim();

  return renderBaseLayout({
    title: 'Primordial Paradigm — Independent Game & Creative Systems Studio',
    description: 'Primordial Paradigm is an independent game and creative systems studio designing original interactive experiences, vector physics engines, and deterministic architectures.',
    canonicalPath: '/',
    content
  });
}
