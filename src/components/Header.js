// =============================================================================
// Primordial Paradigm Studio - Header Component
// Minimalist architectural masthead: sharp hairline rule, solid bone typography,
// quiet monospace directory links, and accessible mobile drawer (zero SaaS capsules).
// =============================================================================

import { renderFirstFormMonogram } from './FirstFormMonogram.js';

export function renderHeader(activePath = '/') {
  const navLinks = [
    { href: '/games/', label: 'GAMES' },
    { href: '/learn/', label: 'LEARN' },
    { href: '/services/', label: 'SERVICES' },
    { href: '/about/', label: 'ABOUT' }
  ];

  const linksHtml = navLinks.map(link => {
    const linkBase = link.href.replace(/\/$/, '');
    const isActive = activePath === link.href || (linkBase.length > 1 && activePath.startsWith(linkBase));
    return `
      <li class="nav-item">
        <a
          href="${link.href}"
          class="nav-link ${isActive ? 'is-active' : ''}"
          ${isActive ? 'aria-current="page"' : ''}
        >
          <span class="nav-link-text">${link.label}</span>
          ${isActive ? '<span class="nav-active-rule" aria-hidden="true"></span>' : ''}
        </a>
      </li>
    `;
  }).join('');

  const mobileLinksHtml = navLinks.map((link, idx) => {
    const linkBase = link.href.replace(/\/$/, '');
    const isActive = activePath === link.href || (linkBase.length > 1 && activePath.startsWith(linkBase));
    return `
      <li class="mobile-nav-item">
        <a
          href="${link.href}"
          class="mobile-nav-link ${isActive ? 'is-active' : ''}"
          ${isActive ? 'aria-current="page"' : ''}
        >
          <span class="mobile-link-index">[0${idx + 1}]</span>
          <span class="mobile-link-label">${link.label}</span>
          <span class="mobile-link-arrow" aria-hidden="true">&rarr;</span>
        </a>
      </li>
    `;
  }).join('');

  return `
    <!-- Accessibility Skip Link -->
    <a href="#main-content" class="skip-link">Skip to main content</a>

    <header class="studio-header" id="studioHeader">
      <div class="container header-inner">
        
        <!-- Architectural Brand Masthead -->
        <a href="/" class="brand-masthead" aria-label="Primordial Paradigm Homepage">
          <div class="brand-icon-wrap" aria-hidden="true">
            ${renderFirstFormMonogram({ size: 26, sparkColor: '#f4f4f5' })}
          </div>
          <div class="brand-text">
            <span class="brand-name">PRIMORDIAL PARADIGM</span>
            <span class="brand-tag">STUDIO // SYSTEMS ATELIER</span>
          </div>
        </a>

        <!-- Desktop Navigation Menu -->
        <nav class="nav-menu" aria-label="Main Navigation">
          <ul class="nav-list">
            ${linksHtml}
          </ul>
        </nav>

        <!-- Right Utility & Mobile Toggle -->
        <div class="header-dock">
          <!-- Minimalist Atmosphere Selector in Header -->
          <div class="header-atmosphere-controls" role="group" aria-label="Visual Atmosphere">
            <span class="atmo-indicator-label">ATMO //</span>
            <button type="button" class="header-atmo-btn" data-atmo="chiaroscuro" title="Mode 01: Cosmic Chiaroscuro">01</button>
            <button type="button" class="header-atmo-btn" data-atmo="blueprint" title="Mode 02: Vector Blueprint">02</button>
            <button type="button" class="header-atmo-btn" data-atmo="surrealism" title="Mode 03: Atmospheric Surrealism">03</button>
          </div>

          <!-- Mobile Hamburger Toggle Button -->
          <button
            type="button"
            class="mobile-nav-toggle"
            id="mobileNavToggle"
            aria-label="Toggle navigation menu"
            aria-expanded="false"
            aria-controls="mobileNavDrawer"
          >
            <span class="toggle-icon-box" aria-hidden="true">
              <span class="toggle-bar bar-1"></span>
              <span class="toggle-bar bar-2"></span>
              <span class="toggle-bar bar-3"></span>
            </span>
          </button>
        </div>
      </div>

      <!-- Mobile Navigation Drawer -->
      <div
        class="mobile-nav-drawer"
        id="mobileNavDrawer"
        aria-hidden="true"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation"
      >
        <div class="mobile-drawer-backdrop" id="mobileDrawerBackdrop" aria-hidden="true"></div>
        <div class="mobile-drawer-panel">
          <div class="mobile-drawer-header">
            <div class="drawer-meta-title">[STUDIO DIRECTORY]</div>
            <button
              type="button"
              class="mobile-drawer-close"
              id="mobileDrawerClose"
              aria-label="Close navigation menu"
            >
              &times;
            </button>
          </div>

          <nav class="mobile-drawer-nav" aria-label="Mobile Navigation Menu">
            <ul class="mobile-nav-list">
              ${mobileLinksHtml}
            </ul>
          </nav>

          <!-- Mobile Drawer Atmosphere Selection -->
          <div class="drawer-atmo-section">
            <div class="drawer-atmo-title">[CREATIVE ATMOSPHERE]</div>
            <div class="drawer-atmo-grid">
              <button type="button" class="drawer-atmo-option" data-atmo="chiaroscuro">
                <span class="option-num">01</span>
                <span class="option-name">Cosmic Chiaroscuro</span>
              </button>
              <button type="button" class="drawer-atmo-option" data-atmo="blueprint">
                <span class="option-num">02</span>
                <span class="option-name">Vector Blueprint</span>
              </button>
              <button type="button" class="drawer-atmo-option" data-atmo="surrealism">
                <span class="option-num">03</span>
                <span class="option-name">Atmospheric Surrealism</span>
              </button>
            </div>
          </div>

          <div class="mobile-drawer-footer">
            <div class="drawer-telemetry-row">
              <span class="telemetry-label">SECTOR</span>
              <span class="telemetry-val">01 // DEEP SYSTEMS</span>
            </div>
            <div class="drawer-telemetry-row">
              <span class="telemetry-label">LOCATION</span>
              <span class="telemetry-val">BANGALORE // UTC+5:30</span>
            </div>
            <div class="drawer-telemetry-row">
              <span class="telemetry-label">ARCHITECTURE</span>
              <span class="telemetry-val text-bone">DETERMINISTIC</span>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Header & Mobile Drawer Interaction Logic -->
    <script>
      (function() {
        const toggleBtn = document.getElementById('mobileNavToggle');
        const closeBtn = document.getElementById('mobileDrawerClose');
        const drawer = document.getElementById('mobileNavDrawer');
        const backdrop = document.getElementById('mobileDrawerBackdrop');
        const header = document.getElementById('studioHeader');

        if (!toggleBtn || !drawer) return;

        function openDrawer() {
          drawer.classList.add('is-open');
          toggleBtn.classList.add('is-active');
          toggleBtn.setAttribute('aria-expanded', 'true');
          drawer.setAttribute('aria-hidden', 'false');
          document.body.classList.add('drawer-locked');
          if (closeBtn) closeBtn.focus();
        }

        function closeDrawer() {
          drawer.classList.remove('is-open');
          toggleBtn.classList.remove('is-active');
          toggleBtn.setAttribute('aria-expanded', 'false');
          drawer.setAttribute('aria-hidden', 'true');
          document.body.classList.remove('drawer-locked');
          toggleBtn.focus();
        }

        toggleBtn.addEventListener('click', function() {
          const isOpen = drawer.classList.contains('is-open');
          if (isOpen) closeDrawer();
          else openDrawer();
        });

        if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
        if (backdrop) backdrop.addEventListener('click', closeDrawer);

        // Close on ESC key
        document.addEventListener('keydown', function(e) {
          if (e.key === 'Escape' && drawer.classList.contains('is-open')) {
            closeDrawer();
          }
        });

        // Close when a link inside mobile drawer is clicked
        drawer.querySelectorAll('a').forEach(function(link) {
          link.addEventListener('click', function() {
            closeDrawer();
          });
        });

        // Sticky header hairline shadow on scroll
        window.addEventListener('scroll', function() {
          if (window.scrollY > 16) {
            header.classList.add('is-scrolled');
          } else {
            header.classList.remove('is-scrolled');
          }
        }, { passive: true });
      })();
    </script>
  `.trim();
}
