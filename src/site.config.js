// Site-wide facts. Every value here must be listed in
// specs/10_brief/verified-brand-and-claims.md. Change a fact here and every page follows.

export const site = {
  // Public identity: the persona only (owner rule, 2026-11-17). No personal information.
  name: 'Primordial Paradigm',
  tagline: 'An independent game studio',
  url: 'https://primordialparadigm.com',
  email: 'contact@primordialparadigm.com',
  locale: 'en',

  // Plain links only: no embedded feeds or tracking widgets.
  // LinkedIn is added when the owner creates the page and supplies its URL.
  social: [
    { name: 'YouTube', url: 'https://www.youtube.com/@PrimordialParadigm' },
    { name: 'Instagram', url: 'https://www.instagram.com/primordialparadigm' }
  ],

  nav: [
    { label: 'Games', href: '/games/' },
    { label: 'Writing', href: '/learn/' },
    { label: 'Work for hire', href: '/services/' },
    { label: 'About', href: '/about/' }
  ]
};
