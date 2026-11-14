// =============================================================================
// Primordial Paradigm Studio - Atmospheric Visitor Switcher Dock
// Sleek, sharp architectural dock allowing visitors to switch between the 3
// human-crafted creative atmospheres site-wide (Cosmic, Blueprint, Surrealism).
// Zero 9999px bubble capsules; pure Swiss architectural framing.
// =============================================================================

export function renderCraftSwitcher() {
  return `
    <aside class="craft-switcher-dock" id="craftSwitcherDock" aria-label="Studio Creative Atmosphere Switcher">
      <div class="switcher-inner">
        <div class="switcher-meta">
          <span class="switcher-title">ATMOSPHERE //</span>
        </div>
        <div class="switcher-pills" role="toolbar" aria-label="Atmosphere Modes">
          <button
            type="button"
            class="switcher-pill"
            data-atmo="chiaroscuro"
            title="Mode 01: Cosmic Chiaroscuro (Remedy / Control + Christopher Nolan)"
          >
            <span class="pill-num">01</span>
            <span class="pill-label">COSMIC</span>
          </button>
          <button
            type="button"
            class="switcher-pill"
            data-atmo="blueprint"
            title="Mode 02: Vector Blueprint (Bungie Marathon + Kurppa Hosk)"
          >
            <span class="pill-num">02</span>
            <span class="pill-label">BLUEPRINT</span>
          </button>
          <button
            type="button"
            class="switcher-pill"
            data-atmo="surrealism"
            title="Mode 03: Atmospheric Surrealism (Playdead Inside + Fumito Ueda)"
          >
            <span class="pill-num">03</span>
            <span class="pill-label">SURREALISM</span>
          </button>
        </div>
      </div>
    </aside>
  `.trim();
}
