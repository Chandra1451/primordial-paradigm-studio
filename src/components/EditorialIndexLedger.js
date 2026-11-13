// =============================================================================
// Primordial Paradigm Studio - Option 1: Editorial Index Ledger & Broad-Sheet
// Replaces generic 3-box cards with an archival editorial ledger
// and asymmetrical broad-sheet colophon.
// =============================================================================

export function renderEditorialIndexLedger() {
  return `
    <!-- SECTION 1: ARCHIVAL PROJECT LEDGER -->
    <section class="ledger-section" id="ledger">
      <div class="container">
        
        <div class="ledger-header-lockup">
          <div class="ledger-eyebrow">
            <span class="ledger-code">[INDEX // ARCHIVAL REGISTER]</span>
            <span class="ledger-rule"></span>
            <span class="ledger-note">CATALOGUE OF ACTIVE RESEARCH & SYSTEMS</span>
          </div>
          <h2 class="ledger-title">Current Works & Monograph Index</h2>
        </div>

        <!-- The Expandable Horizontal Ledger Table -->
        <div class="ledger-table" role="table" aria-label="Studio Project Index">
          
          <!-- Ledger Row 01: Games Devlog -->
          <a href="/games/systemic-movement-prototype/" class="ledger-row" role="row">
            <div class="ledger-col-id" role="cell">
              <span class="col-num">01</span>
              <span class="col-tag">ALPHA // PLAYABLE</span>
            </div>

            <div class="ledger-col-primary" role="cell">
              <h3 class="ledger-item-title">Systemic Movement Prototype</h3>
              <p class="ledger-item-desc">
                A pure 2D deterministic vector kinematics engine built without external runtime dependencies. Explores momentum accumulation, surface friction transitions, and in-browser canvas playability.
              </p>
            </div>

            <div class="ledger-col-discipline" role="cell">
              <span class="disc-label">DISCIPLINE</span>
              <span class="disc-val">Vector Kinematics</span>
            </div>

            <div class="ledger-col-date" role="cell">
              <span class="date-label">RECORDED</span>
              <span class="date-val">2026.11</span>
            </div>

            <div class="ledger-col-arrow" role="cell">
              <span class="ledger-arrow">&rarr;</span>
            </div>
          </a>

          <!-- Ledger Row 02: Systems Monograph -->
          <a href="/learn/systems-architecture-first-principles/" class="ledger-row" role="row">
            <div class="ledger-col-id" role="cell">
              <span class="col-num">02</span>
              <span class="col-tag">MONOGRAPH</span>
            </div>

            <div class="ledger-col-primary" role="cell">
              <h3 class="ledger-item-title">First Principles & Emergence</h3>
              <p class="ledger-item-desc">
                Exhaustive technical study on building deterministic state machines, spatial memory caching, and zero-native pure ESM static architectures for mission-critical software.
              </p>
            </div>

            <div class="ledger-col-discipline" role="cell">
              <span class="disc-label">DISCIPLINE</span>
              <span class="disc-val">Systems Architecture</span>
            </div>

            <div class="ledger-col-date" role="cell">
              <span class="date-label">RECORDED</span>
              <span class="date-val">2026.11</span>
            </div>

            <div class="ledger-col-arrow" role="cell">
              <span class="ledger-arrow">&rarr;</span>
            </div>
          </a>

          <!-- Ledger Row 03: Advisory -->
          <a href="/services/" class="ledger-row" role="row">
            <div class="ledger-col-id" role="cell">
              <span class="col-num">03</span>
              <span class="col-tag">SELECTIVE</span>
            </div>

            <div class="ledger-col-primary" role="cell">
              <h3 class="ledger-item-title">Executive Systems Advisory</h3>
              <p class="ledger-item-desc">
                Bespoke enterprise dashboards, high-performance database modeling, and mission-critical business intelligence architectures delivered with obsessive craftsmanship.
              </p>
            </div>

            <div class="ledger-col-discipline" role="cell">
              <span class="disc-label">DISCIPLINE</span>
              <span class="disc-val">Strategic Computation</span>
            </div>

            <div class="ledger-col-date" role="cell">
              <span class="date-label">STATUS</span>
              <span class="date-val">ACTIVE</span>
            </div>

            <div class="ledger-col-arrow" role="cell">
              <span class="ledger-arrow">&rarr;</span>
            </div>
          </a>

        </div>

      </div>
    </section>

    <!-- SECTION 2: EDITORIAL BROADSHEET COLOPHON -->
    <section class="broadsheet-section" id="broadsheetColophon">
      <div class="container">
        
        <div class="broadsheet-grid">
          
          <!-- Left Column: Editorial Manifesto with Drop Cap -->
          <div class="broadsheet-prose-col">
            <div class="broadsheet-section-meta">
              <span class="broadsheet-kicker">[ESSAY // THE FOUNDER DIRECTIVE]</span>
            </div>

            <div class="broadsheet-lead-statement">
              The Architecture of Restraint
            </div>

            <p class="broadsheet-dropcap-paragraph">
              <span class="dropcap">W</span>e reject the templated mediocrity and corporate bloat that characterizes the modern web. In an era dominated by sprawling dependencies, fragile runtimes, and superficial visual trends, Primordial Paradigm operates under an uncompromising principle: every computational artifact must be built from first principles.
            </p>

            <p class="broadsheet-body-prose">
              Real interactive experiences are not assembled from off-the-shelf templates. They are discovered through mathematical rigor, deliberate art direction, and exhaustive experimentation. Whether constructing a deterministic vector physics engine for an independent video game or designing an executive intelligence architecture, we prioritize zero runtime overhead, complete accessibility, and lasting aesthetic integrity.
            </p>

            <div class="broadsheet-signature-block">
              <div class="signature-line"></div>
              <span class="signature-title">PRIMORDIAL PARADIGM STUDIO</span>
              <span class="signature-subtitle">Independent Game & Creative Systems Atelier</span>
            </div>
          </div>

          <!-- Right Column: Archival Standards & Colophon Box -->
          <div class="broadsheet-specs-col">
            <div class="archival-specs-box">
              <div class="specs-box-header">
                <span class="box-index">COLOPHON // 2026</span>
                <span class="box-status">STANDARDS SPECIFICATION</span>
              </div>

              <div class="specs-detail-list">
                <div class="detail-item">
                  <span class="detail-label">COMPILATION ENGINE</span>
                  <span class="detail-val">Pure Node.js ESM Static Architecture</span>
                </div>
                <div class="detail-item">
                  <span class="detail-label">NATIVE BINARY OVERHEAD</span>
                  <span class="detail-val">0.0 KB (Zero .node DLL dependencies)</span>
                </div>
                <div class="detail-item">
                  <span class="detail-label">ACCESSIBILITY AUDIT</span>
                  <span class="detail-val">WCAG 2.2 AAA Contrast (> 11.2:1 Body, 17.5:1 Titles)</span>
                </div>
                <div class="detail-item">
                  <span class="detail-label">TELEMETRY BASELINE</span>
                  <span class="detail-val">Google Consent Mode v2 (Default: Denied / Zero Telemetry)</span>
                </div>
                <div class="detail-item">
                  <span class="detail-label">HOSTING INFRASTRUCTURE</span>
                  <span class="detail-val">Hostinger LiteSpeed Edge + Automated Git CI/CD</span>
                </div>
              </div>

              <div class="specs-box-footer">
                <a href="/about/" class="broadsheet-link-btn">
                  <span>Read Detailed Studio Philosophy</span>
                  <span class="btn-arrow">&rarr;</span>
                </a>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>

    <style>
      /* =============================================================================
         Option 1: Archival Project Ledger Styles
         ============================================================================= */
      .ledger-section {
        padding-top: clamp(4.5rem, 7vw, 7rem);
        padding-bottom: clamp(4.5rem, 7vw, 7rem);
        background: #06070a;
        border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      }

      .ledger-header-lockup {
        margin-bottom: 3.5rem;
      }

      .ledger-eyebrow {
        display: flex;
        align-items: center;
        gap: 0.85rem;
        font-family: var(--font-mono);
        font-size: 0.75rem;
        margin-bottom: 0.75rem;
      }

      .ledger-code {
        color: var(--accent-amber);
        font-weight: 700;
        letter-spacing: 0.08em;
      }

      .ledger-rule {
        flex: 0 0 35px;
        height: 1px;
        background: rgba(255, 255, 255, 0.15);
      }

      .ledger-note {
        color: var(--text-muted);
        letter-spacing: 0.06em;
      }

      .ledger-title {
        font-family: Georgia, Cambria, 'Times New Roman', serif;
        font-size: clamp(2rem, 3.8vw, 3rem);
        font-weight: 400;
        letter-spacing: -0.02em;
        color: var(--text-primary);
      }

      /* Ledger Table & Rows */
      .ledger-table {
        display: flex;
        flex-direction: column;
        border-top: 1px solid rgba(255, 255, 255, 0.12);
      }

      .ledger-row {
        display: grid;
        grid-template-columns: 140px 1.8fr 1fr 120px 60px;
        gap: 1.5rem;
        align-items: center;
        padding: 2.25rem 1rem;
        border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        text-decoration: none;
        transition: all 200ms cubic-bezier(0.16, 1, 0.3, 1);
        position: relative;
      }

      .ledger-row:hover {
        background: rgba(245, 158, 11, 0.03);
        border-bottom-color: var(--accent-amber);
        padding-left: 1.5rem;
        text-decoration: none;
      }

      .ledger-col-id {
        display: flex;
        flex-direction: column;
        gap: 4px;
        font-family: var(--font-mono);
      }

      .col-num {
        font-size: 1.25rem;
        font-weight: 700;
        color: var(--accent-amber);
      }

      .col-tag {
        font-size: 0.65rem;
        color: var(--text-muted);
        letter-spacing: 0.08em;
      }

      .ledger-col-primary {
        display: flex;
        flex-direction: column;
        gap: 0.4rem;
      }

      .ledger-item-title {
        font-size: 1.45rem;
        font-weight: 600;
        color: var(--text-primary);
        letter-spacing: -0.015em;
        transition: color 150ms ease;
      }

      .ledger-row:hover .ledger-item-title {
        color: var(--accent-amber);
      }

      .ledger-item-desc {
        font-size: 0.925rem;
        color: var(--text-secondary);
        line-height: 1.55;
        max-width: 650px;
      }

      .ledger-col-discipline, .ledger-col-date {
        display: flex;
        flex-direction: column;
        gap: 3px;
        font-family: var(--font-mono);
      }

      .disc-label, .date-label {
        font-size: 0.65rem;
        color: var(--text-muted);
        letter-spacing: 0.06em;
      }

      .disc-val, .date-val {
        font-size: 0.8rem;
        color: var(--text-primary);
        font-weight: 600;
      }

      .ledger-col-arrow {
        display: flex;
        justify-content: flex-end;
      }

      .ledger-arrow {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 38px;
        height: 38px;
        border-radius: 50%;
        border: 1px solid rgba(255, 255, 255, 0.12);
        color: var(--text-primary);
        font-family: var(--font-mono);
        font-size: 1.1rem;
        transition: all 200ms ease;
      }

      .ledger-row:hover .ledger-arrow {
        background: var(--accent-amber);
        border-color: var(--accent-amber);
        color: #06070a;
        transform: translateX(4px);
      }

      /* =============================================================================
         Editorial Broadsheet Colophon Styles
         ============================================================================= */
      .broadsheet-section {
        padding-top: clamp(4.5rem, 7vw, 7rem);
        padding-bottom: clamp(4.5rem, 7vw, 7rem);
        background: #040508;
      }

      .broadsheet-grid {
        display: grid;
        grid-template-columns: 1.25fr 0.75fr;
        gap: clamp(3rem, 6vw, 5rem);
        align-items: start;
      }

      .broadsheet-section-meta {
        margin-bottom: 1.25rem;
      }

      .broadsheet-kicker {
        font-family: var(--font-mono);
        font-size: 0.75rem;
        letter-spacing: 0.1em;
        color: var(--accent-amber);
        font-weight: 600;
      }

      .broadsheet-lead-statement {
        font-family: Georgia, Cambria, 'Times New Roman', serif;
        font-size: clamp(2rem, 3.5vw, 2.75rem);
        font-weight: 400;
        letter-spacing: -0.02em;
        line-height: 1.15;
        color: var(--text-primary);
        margin-bottom: 1.75rem;
      }

      .broadsheet-dropcap-paragraph {
        font-size: 1.15rem;
        line-height: 1.75;
        color: var(--text-primary);
        margin-bottom: 1.5rem;
      }

      .dropcap {
        float: left;
        font-family: Georgia, Cambria, 'Times New Roman', serif;
        font-size: 4.2rem;
        line-height: 0.8;
        padding-top: 4px;
        padding-right: 12px;
        padding-bottom: 4px;
        color: var(--accent-amber);
        font-weight: 700;
      }

      .broadsheet-body-prose {
        font-size: 1.05rem;
        line-height: 1.75;
        color: var(--text-secondary);
        margin-bottom: 2.5rem;
      }

      .broadsheet-signature-block {
        display: flex;
        flex-direction: column;
        gap: 4px;
        font-family: var(--font-mono);
      }

      .signature-line {
        width: 60px;
        height: 1px;
        background: var(--accent-amber);
        margin-bottom: 0.75rem;
      }

      .signature-title {
        font-size: 0.85rem;
        font-weight: 700;
        color: var(--text-primary);
        letter-spacing: 0.08em;
      }

      .signature-subtitle {
        font-size: 0.75rem;
        color: var(--text-muted);
      }

      /* Archival Specs Box (Right Column) */
      .archival-specs-box {
        background: rgba(10, 12, 18, 0.75);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: var(--radius-md);
        padding: clamp(1.5rem, 3vw, 2rem);
        backdrop-filter: blur(12px);
      }

      .specs-box-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-bottom: 0.85rem;
        margin-bottom: 1.5rem;
        border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        font-family: var(--font-mono);
        font-size: 0.7rem;
      }

      .box-index {
        color: var(--accent-amber);
        font-weight: 700;
      }

      .box-status {
        color: var(--text-muted);
      }

      .specs-detail-list {
        display: flex;
        flex-direction: column;
        gap: 1.25rem;
        margin-bottom: 2rem;
      }

      .detail-item {
        display: flex;
        flex-direction: column;
        gap: 3px;
        padding-bottom: 0.75rem;
        border-bottom: 1px solid rgba(255, 255, 255, 0.04);
      }

      .detail-label {
        font-family: var(--font-mono);
        font-size: 0.65rem;
        color: var(--text-muted);
        letter-spacing: 0.06em;
      }

      .detail-val {
        font-family: var(--font-mono);
        font-size: 0.8rem;
        color: var(--text-primary);
        font-weight: 600;
      }

      .specs-box-footer {
        padding-top: 0.5rem;
      }

      .broadsheet-link-btn {
        display: inline-flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        padding: 0.85rem 1.25rem;
        border-radius: var(--radius-sm);
        background: rgba(255, 255, 255, 0.04);
        border: 1px solid rgba(255, 255, 255, 0.12);
        color: var(--text-primary);
        font-family: var(--font-mono);
        font-size: 0.78rem;
        font-weight: 600;
        text-decoration: none;
        transition: all 180ms ease;
      }

      .broadsheet-link-btn:hover {
        background: var(--accent-amber);
        border-color: var(--accent-amber);
        color: #06070a;
        text-decoration: none;
      }

      /* Responsive Rules */
      @media (max-width: 960px) {
        .ledger-row {
          grid-template-columns: 80px 1fr 40px;
          gap: 1rem;
        }
        .ledger-col-discipline, .ledger-col-date {
          display: none;
        }
        .broadsheet-grid {
          grid-template-columns: 1fr;
          gap: 2.5rem;
        }
      }

      @media (max-width: 480px) {
        .ledger-row {
          grid-template-columns: 1fr;
          gap: 0.75rem;
          padding: 1.5rem 0.5rem;
        }
        .ledger-col-arrow {
          display: none;
        }
      }
    </style>
  `.trim();
}

