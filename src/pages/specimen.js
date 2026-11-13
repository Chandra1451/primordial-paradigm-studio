// =============================================================================
// Primordial Paradigm Studio - Option 3: Living Specimen Atelier
// Preserved as an alternate preview route for comparative evaluation.
// =============================================================================

import { renderBaseLayout } from '../layouts/BaseLayout.js';
import { renderLivingSpecimenHero } from '../components/LivingSpecimenHero.js';
import { renderSpecimenReel } from '../components/SpecimenReel.js';

export function renderSpecimenPage() {
  const content = `
    <!-- Notice Bar for Option 3 Preview -->
    <div style="background: rgba(6, 182, 212, 0.08); border-bottom: 1px solid rgba(6, 182, 212, 0.2); padding: 0.6rem 1rem; font-family: var(--font-mono); font-size: 0.72rem; color: #06b6d4; text-align: center; letter-spacing: 0.05em;">
      [PREVIEW ARCHIVE // OPTION 3: LIVING SPECIMEN ATELIER] &mdash; <a href="/" style="color: #f59e0b; text-decoration: underline; margin-left: 0.5rem; font-weight: 600;">Switch to Option 1: Editorial Broad-Sheet &rarr;</a>
    </div>

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

