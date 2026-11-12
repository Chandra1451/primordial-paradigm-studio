# Primordial Paradigm Studio

> Independent game development, creative technology, and systems architecture studio.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![WCAG 2.2 AAA](https://img.shields.io/badge/Accessibility-WCAG%202.2%20AAA-brightgreen.svg)]()
[![Pure ESM](https://img.shields.io/badge/Architecture-Pure%20ESM-black.svg)]()
[![Playwright / CDP](https://img.shields.io/badge/Tests-132%20Passed-success.svg)]()

Canonical website: **[https://primordialparadigm.com](https://primordialparadigm.com)**

---

## Overview

This repository houses the official static website and digital hub for **Primordial Paradigm Studio**. Built from first principles, the architecture prioritizes performance, zero runtime overhead, accessibility, and complete security isolation.

### Key Architectural Pillars

- **Pure Node.js ESM Compiler:** Zero native C++/Rust binary bindings (`.node` DLLs); completely compliant with OS-level Application Control (WDAC) environments.
- **Subdirectory Routing Architecture:** Apex domain authority pooling across `/games/`, `/learn/`, `/services/`, and `/about/`.
- **Zero-Dependency Interactive Canvas:** In-browser 2D vector kinematics physics simulation with dynamic trajectory trails, interactive controls, and WCAG AAA contrast.
- **Privacy & Telemetry Baseline:** Google Consent Mode v2 default-denied architecture with zero unconsented telemetry tracking.
- **Multi-Viewport Browser Verification:** Automated Chrome DevTools Protocol (CDP) test suite executing 132 automated assertions across 4 viewports (1440px desktop, 768px tablet, 390px mobile, 320px compact).
- **Automated Security Gates:** Pre-build and post-build automated scanning for credential leaks (`check-secrets.mjs`), prompt injection defense (`check-external-skill.mjs`), and static claim verification (`check-claims.mjs`).

---

## Directory Structure

```
primordial-paradigm-studio/
├── public/                # Static assets, favicon, and hardened .htaccess
├── scripts/               # Pure ESM build compiler, secret scanner, test gates
│   ├── build.mjs          # Static generator & Markdown pipeline
│   ├── check-secrets.mjs  # Secret leak detection scanner
│   ├── check-claims.mjs   # Brand claim assertion verifier
│   ├── check-external-skill.mjs # Prompt injection defense gate
│   ├── package-hostinger.mjs   # Pure Node.js release packager
│   └── preview.mjs        # Local HTTP preview server
├── src/
│   ├── components/        # Header, Footer, Monogram, Canvas Widget, Hero Field
│   ├── content/           # Devlogs & Systems Architecture Markdown collections
│   ├── layouts/           # BaseLayout, ArticleLayout
│   ├── pages/             # File-based page renderers (Home, Games, Learn, Services, About, 404)
│   ├── styles/            # Obsidian Cosmos design tokens & global CSS
│   └── utils/             # Frontmatter parser & reading time estimators
└── tests/
    └── verify-site.mjs    # Multi-viewport Chrome headless test suite
```

---

## Local Development & Verification

### Prerequisites
- Node.js (v18.0.0 or higher)

### Quick Start

```bash
# Install minimal pure-JavaScript dependencies (marked)
npm install

# Run static compilation
npm run build

# Start local preview server (http://127.0.0.1:4321/)
npm run preview

# Run full test suite (Secrets + Build + Claim Assertion + 132 Browser Tests)
npm test

# Generate production release zip for Hostinger
npm run package
```

---

## Production Deployment

- **Hosting Platform:** Hostinger Web Hosting (LiteSpeed / Apache)
- **Deployment Flow:** Automated Git deployment via the `production` branch into `/public_html`.
- **Security Headers:** Hardened `.htaccess` providing HSTS (`max-age=31536000`), CSP (`frame-ancestors 'none'`), `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, and defense-in-depth source file protection.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
