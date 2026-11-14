// =============================================================================
// Primordial Paradigm Studio - Atmospheric Visitor Switcher Dock
// Sleek, sharp architectural dock allowing visitors to switch between 2
// luminous, human-crafted creative atmospheres site-wide:
// 1. Luminous Limestone (High-Key Warm Gallery Paper #f4f1ea)
// 2. Warm Titanium (Architectural Mid-Tone Slate #1e222b + Signal Vermilion)
// =============================================================================

export function renderCraftSwitcher() {
  return `
    <aside class="craft-switcher-dock" id="craftSwitcherDock" aria-label="Studio Creative Atmosphere Switcher">
      <div class="switcher-inner">
        <div class="switcher-meta">
          <span class="switcher-title">LUMINOSITY //</span>
        </div>
        <div class="switcher-pills" role="toolbar" aria-label="Atmosphere Modes">
          <button
            type="button"
            class="switcher-pill"
            data-atmo="limestone"
            title="Mode 01: Luminous Limestone (High-Key Warm Gallery Paper)"
          >
            <span class="pill-num">01</span>
            <span class="pill-label">LIMESTONE</span>
          </button>
          <button
            type="button"
            class="switcher-pill"
            data-atmo="titanium"
            title="Mode 02: Warm Titanium (Architectural Mid-Tone Slate)"
          >
            <span class="pill-num">02</span>
            <span class="pill-label">TITANIUM</span>
          </button>
        </div>
      </div>
    </aside>
  `.trim();
}
