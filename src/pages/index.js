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
    <!-- 1. Editorial Broad-Sheet Hero with Multi-Atmosphere Engine -->
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
