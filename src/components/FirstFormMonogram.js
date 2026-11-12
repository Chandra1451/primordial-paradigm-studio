// =============================================================================
// Primordial Paradigm Studio - First Form Monogram Component
// =============================================================================

export function renderFirstFormMonogram({
  size = 32,
  className = '',
  sparkColor = 'var(--accent-amber)'
} = {}) {
  return `
    <svg
      width="${size}"
      height="${size}"
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      class="monogram ${className}"
      aria-label="Primordial Paradigm Monogram"
      role="img"
    >
      <title>Primordial Paradigm</title>
      <path
        d="M29 101V45C29 24 42 12 63 12C86 12 101 27 101 48C101 70 85 84 63 84H54V65H63C75 65 82 59 82 48C82 38 75 31 64 31C54 31 48 37 48 47V101Z"
        fill="currentColor"
      />
      <circle cx="64" cy="48" r="7" fill="${sparkColor}" />
    </svg>
  `.trim();
}

