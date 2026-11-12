// =============================================================================
// Primordial Paradigm Studio - Header Component
// =============================================================================

import { renderFirstFormMonogram } from './FirstFormMonogram.js';

export function renderHeader(activePath = '/') {
  const navLinks = [
    { href: '/games', label: 'Games' },
    { href: '/learn', label: 'Learn' },
    { href: '/services', label: 'Services' },
    { href: '/about', label: 'About' },
  ];

  const linksHtml = navLinks.map(link => {
    const isActive = activePath.startsWith(link.href);
    return `
      <li class="nav-item">
        <a
          href="${link.href}/"
          class="nav-link ${isActive ? 'is-active' : ''}"
          ${isActive ? 'aria-current="page"' : ''}
        >
          ${link.label}
        </a>
      </li>
    `;
  }).join('');

  return `
    <header class="studio-header">
      <div class="container header-inner">
        <a href="/" class="brand-masthead" aria-label="Primordial Paradigm Home">
          ${renderFirstFormMonogram({ size: 28 })}
          <span class="brand-text">
            <span class="brand-name">PRIMORDIAL PARADIGM</span>
            <span class="brand-sub">STUDIO</span>
          </span>
        </a>

        <nav class="nav-menu" aria-label="Main Navigation">
          <ul class="nav-list">
            ${linksHtml}
          </ul>
        </nav>
      </div>
    </header>
  `.trim();
}

