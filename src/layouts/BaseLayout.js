// =============================================================================
// Primordial Paradigm Studio - Base Layout
// Generates accessible, SEO-optimized, WCAG AAA compliant HTML documents.
// =============================================================================

import { renderHeader } from '../components/Header.js';
import { renderFooter } from '../components/Footer.js';
import { renderCraftSwitcher } from '../components/CraftSwitcher.js';

export function renderBaseLayout({
  title = 'Primordial Paradigm — Independent Game & Creative Tech Studio',
  description = 'Primordial Paradigm is an independent game and creative technology studio exploring systems architecture, interactive craft, and computational design.',
  canonicalPath = '/',
  ogType = 'website',
  noindex = false,
  content = ''
} = {}) {
  const canonicalURL = canonicalPath.endsWith('.html') 
    ? `https://primordialparadigm.com${canonicalPath.startsWith('/') ? canonicalPath : '/' + canonicalPath}`
    : `https://primordialparadigm.com${canonicalPath.endsWith('/') ? canonicalPath : canonicalPath + '/'}`;

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Primordial Paradigm",
    "url": "https://primordialparadigm.com",
    "logo": "https://primordialparadigm.com/favicon.svg",
    "description": description
  };

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${title}</title>
    <meta name="description" content="${description}" />
    ${noindex ? '<meta name="robots" content="noindex, follow" />' : ''}
    <link rel="canonical" href="${canonicalURL}" />

    <!-- Security & Resource Directives -->
    <meta name="color-scheme" content="dark" />
    <meta name="referrer" content="strict-origin-when-cross-origin" />
    <meta http-equiv="X-Content-Type-Options" content="nosniff" />

    <!-- OpenGraph Tags -->
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:url" content="${canonicalURL}" />
    <meta property="og:site_name" content="Primordial Paradigm" />
    <meta property="og:type" content="${ogType}" />

    <!-- Twitter Cards -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${description}" />

    <!-- Favicon -->
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />

    <!-- Design System Tokens & Global Styles -->
    <link rel="stylesheet" href="/styles/tokens.css" />
    <link rel="stylesheet" href="/styles/global.css" />

    <!-- Immediate Atmosphere Token Initialization (Zero FOUC) -->
    <script>
      (function() {
        try {
          var saved = localStorage.getItem('pp_atmosphere');
          if (saved && (saved === 'chiaroscuro' || saved === 'blueprint' || saved === 'surrealism')) {
            document.documentElement.setAttribute('data-atmosphere', saved);
          } else {
            document.documentElement.setAttribute('data-atmosphere', 'chiaroscuro');
          }
        } catch(e) {}
      })();
    </script>

    <!-- Google Consent Mode v2 (Default: Denied / Zero Telemetry) -->
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('consent', 'default', {
        'ad_storage': 'denied',
        'analytics_storage': 'denied',
        'ad_user_data': 'denied',
        'ad_personalization': 'denied',
        'wait_for_update': 500
      });
    </script>

    <!-- Structured Data (Schema.org JSON-LD) -->
    <script type="application/ld+json">
${JSON.stringify(schemaData, null, 2)}
    </script>
  </head>
  <body>
    ${renderHeader(canonicalPath)}
    <main id="main-content">
      ${content}
    </main>
    ${renderCraftSwitcher()}
    ${renderFooter()}

    <!-- Site-Wide Atmosphere Synchronization Controller -->
    <script>
      (function() {
        function setAtmosphere(atmo) {
          if (!['chiaroscuro', 'blueprint', 'surrealism'].includes(atmo)) return;
          document.documentElement.setAttribute('data-atmosphere', atmo);
          try { localStorage.setItem('pp_atmosphere', atmo); } catch(e) {}
          
          document.querySelectorAll('[data-atmo]').forEach(function(btn) {
            var isActive = btn.getAttribute('data-atmo') === atmo;
            btn.classList.toggle('active', isActive);
            btn.classList.toggle('is-active', isActive);
            btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
          });

          window.dispatchEvent(new CustomEvent('pp:atmosphere-changed', { detail: { atmosphere: atmo } }));
        }

        window.__setAtmosphere = setAtmosphere;

        // Attach click listeners to all atmosphere buttons
        document.addEventListener('click', function(e) {
          var btn = e.target.closest('[data-atmo]');
          if (btn) {
            e.preventDefault();
            var atmo = btn.getAttribute('data-atmo');
            if (atmo) setAtmosphere(atmo);
          }
        });

        // Initialize active button states
        var current = document.documentElement.getAttribute('data-atmosphere') || 'chiaroscuro';
        setAtmosphere(current);
      })();
    </script>
  </body>
</html>`.trim();
}

