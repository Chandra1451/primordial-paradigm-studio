// =============================================================================
// Primordial Paradigm Studio - Services Page Module
// =============================================================================

import { renderBaseLayout } from '../layouts/BaseLayout.js';

export function renderServicesPage() {
  const content = `
    <div class="container page-content">
      <div class="page-header">
        <span class="mono-label">DIVISION // ADVISORY</span>
        <h1>Systems Consulting & Dashboards</h1>
        <p class="lead">
          Bespoke executive dashboards, business intelligence platforms, and data architecture delivered with uncompromising craft.
        </p>
      </div>

      <div class="services-grid">
        <div class="service-box">
          <div class="service-meta">
            <span class="service-index">[01]</span>
            <span class="service-tag">INTERFACE ARCHITECTURE</span>
          </div>
          <h3>Executive Dashboards</h3>
          <p>Custom analytics interfaces engineered for low cognitive load, aesthetic elegance, and rapid decision velocity.</p>
        </div>
        <div class="service-box">
          <div class="service-meta">
            <span class="service-index">[02]</span>
            <span class="service-tag">PIPELINE DESIGN</span>
          </div>
          <h3>Data Architecture</h3>
          <p>Robust data modeling, automated pipeline transformation, and analytics infrastructure built for resilience.</p>
        </div>
      </div>
    </div>
  `.trim();

  return renderBaseLayout({
    title: 'Systems Consulting & Executive Dashboards — Primordial Paradigm',
    description: 'High-craft executive dashboards, business intelligence systems, and bespoke data architecture.',
    canonicalPath: '/services/',
    content
  });
}
