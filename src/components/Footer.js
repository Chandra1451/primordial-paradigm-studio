// =============================================================================
// Primordial Paradigm Studio - Footer Component
// =============================================================================

import { renderFirstFormMonogram } from './FirstFormMonogram.js';

export function renderFooter() {
  const currentYear = new Date().getFullYear();

  return `
    <footer class="studio-footer">
      <div class="container footer-inner">
        <div class="footer-top">
          <div class="footer-brand">
            <div class="brand-line">
              ${renderFirstFormMonogram({ size: 24 })}
              <span class="brand-title">PRIMORDIAL PARADIGM</span>
            </div>
            <p class="brand-desc">
              Independent game & creative technology studio. Exploring systems architecture, interactive craft, and computational design.
            </p>
          </div>

          <div class="footer-nav-groups">
            <div class="footer-col">
              <span class="col-title">Studio</span>
              <ul class="col-links">
                <li><a href="/games/">Games & Devlogs</a></li>
                <li><a href="/learn/">Learning Hub</a></li>
                <li><a href="/services/">Consulting</a></li>
                <li><a href="/about/">Philosophy & Ethos</a></li>
              </ul>
            </div>
            <div class="footer-col">
              <span class="col-title">Architecture</span>
              <ul class="col-links">
                <li><a href="/sitemap.xml">Sitemap</a></li>
                <li><a href="/about/#colophon">Colophon</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div class="footer-bottom">
          <p class="copyright">
            &copy; ${currentYear} Primordial Paradigm. All rights reserved. Zero telemetry without consent.
          </p>
          <p class="legal-note">
            Built with pure static craft. Hosted on Hostinger.
          </p>
        </div>
      </div>
    </footer>
  `.trim();
}

