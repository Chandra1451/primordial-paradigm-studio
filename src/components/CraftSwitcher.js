// =============================================================================
// Primordial Paradigm Studio - Floating Craft Switcher Dock
// Discrete, high-craft switcher dock allowing owner & visitors to effortlessly
// compare Option 1 (Editorial Broad-Sheet), Option 3 (Specimen Atelier), and Motion Lab.
// Replaces crude yellow development notice banners with an intentional UI element.
// =============================================================================

export function renderCraftSwitcher(currentActive = '01') {
  return `
    <aside class="craft-switcher-dock" id="craftSwitcherDock" aria-label="Studio Creative Directions Switcher">
      <div class="switcher-inner">
        <div class="switcher-meta">
          <span class="switcher-spark" aria-hidden="true"></span>
          <span class="switcher-title">DIRECTION COMPARATOR</span>
        </div>
        <div class="switcher-pills" role="navigation" aria-label="Creative Variations">
          <a
            href="/"
            class="switcher-pill ${currentActive === '01' ? 'is-active' : ''}"
            title="Option 1: Editorial Broad-Sheet with Singularity Canvas"
          >
            <span class="pill-num">01</span>
            <span class="pill-label">Editorial</span>
          </a>
          <a
            href="/specimen/"
            class="switcher-pill ${currentActive === '02' ? 'is-active' : ''}"
            title="Option 3: Living Specimen Atelier with Playable Craft"
          >
            <span class="pill-num">02</span>
            <span class="pill-label">Specimen</span>
          </a>
          <a
            href="/explore/"
            class="switcher-pill ${currentActive === '03' ? 'is-active' : ''}"
            title="Motion Lab: Real-time 3-Physics Engine Playground"
          >
            <span class="pill-num">03</span>
            <span class="pill-label">Lab</span>
          </a>
        </div>
      </div>
    </aside>
  `.trim();
}
