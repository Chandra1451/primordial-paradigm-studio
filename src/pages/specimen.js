// =============================================================================
// Primordial Paradigm Studio - Option 3: Living Specimen Atelier
// Preserved as an alternate preview route for comparative evaluation.
// =============================================================================

import { renderBaseLayout } from '../layouts/BaseLayout.js';
import { renderLivingSpecimenHero } from '../components/LivingSpecimenHero.js';
import { renderSpecimenReel } from '../components/SpecimenReel.js';

export function renderSpecimenPage() {
  const content = `
    <!-- 1. Playable Living Specimen Hero Viewport -->
    ${renderLivingSpecimenHero()}

    <!-- 2. Architectural Specimen Reel & Engineering Colophon -->
    ${renderSpecimenReel()}
  `.trim();

  return renderBaseLayout({
    title: 'Option 3: Living Specimen Atelier — Primordial Paradigm Studio',
    description: 'Living Specimen Atelier preview exploring deterministic cellular simulation, floating specimen reel, and interactive physical automata.',
    canonicalPath: '/specimen/',
    content
  });
}
