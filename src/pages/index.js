// =============================================================================
// Primordial Paradigm Studio - Homepage Module (Option 3: Living Specimen Atelier)
// =============================================================================

import { renderBaseLayout } from '../layouts/BaseLayout.js';
import { renderLivingSpecimenHero } from '../components/LivingSpecimenHero.js';
import { renderSpecimenReel } from '../components/SpecimenReel.js';

export function renderHomePage() {
  const content = `
    <!-- 1. Playable Living Specimen Hero Viewport -->
    ${renderLivingSpecimenHero()}

    <!-- 2. Architectural Specimen Reel & Engineering Colophon -->
    ${renderSpecimenReel()}
  `.trim();

  return renderBaseLayout({
    title: 'Primordial Paradigm — Independent Game & Creative Systems Studio',
    description: 'Primordial Paradigm is an independent game and creative systems studio designing original interactive experiences, vector physics engines, and deterministic architectures.',
    canonicalPath: '/',
    content
  });
}
