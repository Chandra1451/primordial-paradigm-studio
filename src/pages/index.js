// =============================================================================
// Primordial Paradigm Studio - Homepage Module (Option 1: Editorial Broad-Sheet)
// Inspirations: Playdead, Remedy (Alan Wake 2), Awwwards Editorial Winners.
// High-contrast typography, celestial accretion singularity, and archival telemetry.
// =============================================================================

import { renderBaseLayout } from '../layouts/BaseLayout.js';
import { renderEditorialBroadSheetHero } from '../components/EditorialBroadSheetHero.js';
import { renderEditorialIndexLedger } from '../components/EditorialIndexLedger.js';
import { renderCraftSwitcher } from '../components/CraftSwitcher.js';

export function renderHomePage() {
  const content = `
    <!-- 1. Editorial Broad-Sheet Hero with Gravitational Singularity Canvas -->
    ${renderEditorialBroadSheetHero()}

    <!-- 2. Archival Project Ledger & Broadsheet Colophon -->
    ${renderEditorialIndexLedger()}

    <!-- 3. Discrete Floating Creative Direction Switcher Dock -->
    ${renderCraftSwitcher('01')}
  `.trim();

  return renderBaseLayout({
    title: 'Primordial Paradigm — Independent Game & Creative Systems Studio',
    description: 'Primordial Paradigm is an independent game and creative systems studio designing original interactive experiences, vector physics engines, and deterministic architectures.',
    canonicalPath: '/',
    content
  });
}
