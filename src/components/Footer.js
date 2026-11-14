// =============================================================================
// Primordial Paradigm Studio - Footer Component
// Architectural multi-column footer with studio thesis, full directory index,
// systems & research links, operational telemetry, and back-to-top smooth anchor.
// =============================================================================

import { renderFirstFormMonogram } from './FirstFormMonogram.js';

export function renderFooter() {
  const currentYear = new Date().getFullYear();

  return `
    <footer class="studio-footer" role="contentinfo">
      <div class="container footer-container">
        
        <!-- Top Architectural Banner: Thesis & Brand Lockup -->
        <div class="footer-hero-band">
          <div class="footer-brand-lockup">
            <a href="/" class="footer-brand-link" aria-label="Primordial Paradigm Homepage">
              ${renderFirstFormMonogram({ size: 30 })}
              <span class="footer-brand-title">PRIMORDIAL PARADIGM</span>
            </a>
            <p class="footer-thesis">
              An independent game and creative systems studio crafting deterministic vector physics, original interactive worlds, and computational architecture from first principles.
            </p>
          </div>

          <div class="footer-telemetry-badge">
            <span class="telemetry-beacon-dot"></span>
            <div class="telemetry-badge-content">
              <span class="telemetry-badge-title">STUDIO NODE // PRODUCTION</span>
              <span class="telemetry-badge-detail">SECTOR: 01 &bull; BANGALORE &bull; UTC+5:30</span>
            </div>
          </div>
        </div>

        <!-- Middle Section: 4-Column Directory Grid -->
        <div class="footer-columns-grid">
          
          <!-- Column 1: Studio Directory -->
          <div class="footer-nav-col">
            <h4 class="footer-col-header">
              <span class="col-index">[01]</span>
              <span class="col-title">Studio Directory</span>
            </h4>
            <ul class="footer-links-list">
              <li><a href="/games/">Games &amp; Devlogs</a></li>
              <li><a href="/learn/">Systems Learning Hub</a></li>
              <li><a href="/services/">Advisory &amp; Engineering</a></li>
              <li><a href="/about/">Philosophy &amp; Ethos</a></li>
            </ul>
          </div>

          <!-- Column 2: Systems & Prototypes -->
          <div class="footer-nav-col">
            <h4 class="footer-col-header">
              <span class="col-index">[02]</span>
              <span class="col-title">Systems &amp; Research</span>
            </h4>
            <ul class="footer-links-list">
              <li><a href="/games/systemic-movement-prototype/">Vector Kinematics Prototype</a></li>
              <li><a href="/learn/systems-architecture-first-principles/">First Principles Monograph</a></li>
              <li><a href="/explore/">Motion &amp; Physics Lab</a></li>
              <li><a href="/specimen/">Living Specimen Atelier</a></li>
            </ul>
          </div>

          <!-- Column 3: Architecture & Integrity -->
          <div class="footer-nav-col">
            <h4 class="footer-col-header">
              <span class="col-index">[03]</span>
              <span class="col-title">Architecture Standards</span>
            </h4>
            <ul class="footer-links-list">
              <li><a href="/about/#colophon">Studio Colophon</a></li>
              <li><a href="/sitemap.xml">XML Machine Sitemap</a></li>
              <li><span class="footer-spec-item">Pure Static ESM Compiler</span></li>
              <li><span class="footer-spec-item">Zero Native DLL Binaries</span></li>
            </ul>
          </div>

          <!-- Column 4: Operational Telemetry -->
          <div class="footer-nav-col">
            <h4 class="footer-col-header">
              <span class="col-index">[04]</span>
              <span class="col-title">Production Telemetry</span>
            </h4>
            <div class="footer-telemetry-docket">
              <div class="telemetry-entry">
                <span class="entry-kicker">HOSTING</span>
                <span class="entry-data">Hostinger High-Performance Cloud</span>
              </div>
              <div class="telemetry-entry">
                <span class="entry-kicker">DEPLOY PIPELINE</span>
                <span class="entry-data">Git Auto-Deploy (production)</span>
              </div>
              <div class="telemetry-entry">
                <span class="entry-kicker">ACCESSIBILITY</span>
                <span class="entry-data">WCAG 2.2 AAA Contrast</span>
              </div>
              <div class="telemetry-entry">
                <span class="entry-kicker">TELEMETRY</span>
                <span class="entry-data highlight-amber">Zero Unconsented Tracking</span>
              </div>
            </div>
          </div>

        </div>

        <!-- Bottom Ground Bar: Legal & Back to Top -->
        <div class="footer-bottom-bar">
          <div class="footer-legal-copy">
            <p class="copyright-text">
              &copy; ${currentYear} Primordial Paradigm. All rights reserved.
            </p>
            <p class="privacy-text">
              Zero tracking cookies. Zero client telemetry without explicit consent. Built with pure static craft.
            </p>
          </div>

          <a href="#studioHeader" class="footer-back-to-top" id="footerBackToTop" aria-label="Back to top of page">
            <span>Back to Top</span>
            <span class="back-arrow" aria-hidden="true">&uarr;</span>
          </a>
        </div>

      </div>
    </footer>
  `.trim();
}
