export const navigation = [
  { label: 'Home', href: '/#home' },
  { label: 'About', href: '/about/' },
  { label: 'Services', href: '/services/' },
  { label: 'Work', href: '/work/' },
  { label: 'Contact', href: '/#contact' },
] as const;

export const homeContent = {
  hero: {
    eyebrow: 'Design & engineering studio',
    title: 'Where ambitious ideas become interfaces people remember.',
    description:
      'Award-winning websites and digital products for the brands of tomorrow. We build experiences where technology and creativity speak the same language.',
    cta: 'See our services',
  },
  approach: {
    eyebrow: 'Approach',
    title: 'More than websites and products',
    body: 'We create digital experiences where technology and creativity work together, turning code into feeling, motion into meaning, and interaction into memory.',
    pillars: [
      {
        title: 'Technology as emotion',
        description: 'We turn code into feeling and interaction into something worth remembering.',
      },
      {
        title: 'Beauty with a reason',
        description: 'Every pixel has a purpose. We design to solve real problems and create value.',
      },
      {
        title: 'Built with people who care',
        description: 'Our best work comes back to one thing — building with people who care how things feel.',
      },
    ],
  },
  services: [
    { id: '001', title: 'Marketing Websites', description: 'Conversion-focused marketing sites that tell a clear story.' },
    { id: '002', title: 'Landing Pages & Launches', description: 'High-impact pages built around a single launch moment.' },
    { id: '003', title: 'Brand Identity Systems', description: 'Cohesive identity systems that scale across touchpoints.' },
    { id: '004', title: 'Product UX & Design', description: 'Thoughtful product experiences grounded in user needs.' },
    { id: '005', title: 'Web Applications', description: 'Robust web apps engineered for real-world scale.' },
    { id: '006', title: 'Mobile Applications', description: 'Mobile experiences that feel native and considered.' },
    { id: '007', title: 'E-commerce Platforms', description: 'Commerce experiences that convert and retain.' },
    { id: '008', title: 'SaaS Dashboards', description: 'Clear, data-dense dashboards teams actually enjoy using.' },
    { id: '009', title: 'Custom Motion & Animation', description: 'Motion design that gives interfaces meaning and rhythm.' },
    { id: '010', title: '3D & Interactive Experiences', description: 'Immersive WebGL and interactive work that stands out.' },
    { id: '011', title: 'Design Systems', description: 'Reusable systems that keep product and brand consistent.' },
  ],
  work: {
    eyebrow: 'Work',
    title: 'Selected projects',
    body: 'A selection of projects where design, technology and strategy come together.',
    projects: [
      { title: 'E Promo', tags: ['UI/UX', 'Frontend', 'WebGL'] },
      { title: 'Flashform', tags: ['UI/UX', 'Frontend', 'WebGL'] },
      { title: 'Sofia Shcherbak', tags: ['UI/UX', 'Frontend', 'WebGL'] },
      { title: 'Relive by Coco', tags: ['UI/UX', 'Frontend', 'E-commerce'] },
      { title: 'smp fnnc.', tags: ['UI/UX', 'Frontend', 'Backend'] },
      { title: 'Ksh Design', tags: ['Frontend', 'CMS'] },
      { title: 'Aura', tags: ['Frontend', 'Web3'] },
      { title: 'Kairos Capital', tags: ['UI/UX', 'Frontend', 'CMS'] },
    ],
  },
  awards: {
    eyebrow: 'Awards & recognition',
    title: 'Recognized by leading design platforms',
    body: 'Our work has been recognized by leading design platforms and trusted by clients worldwide.',
    total: 76,
    items: [
      { label: 'Studio of the year nominee', count: 2 },
      { label: 'Developer of the year nominee', count: 1 },
      { label: 'Mobile site of the year nominee', count: 3 },
      { label: 'Site of the day', count: 5 },
      { label: 'Developer Award', count: 5 },
      { label: 'Honorable mention', count: 15 },
      { label: 'Mobile of the week', count: 3 },
      { label: 'Special Kudos', count: 12 },
      { label: 'UI, UX, Innovation', count: 12 },
      { label: 'XD Gallery', count: 2 },
      { label: 'Featured', count: 3 },
    ],
  },
  contact: {
    eyebrow: 'Contact',
    title: 'Let’s build something people remember',
    body: 'The best projects start when someone cares about how it looks, how it works and how it makes people feel. If you have something you’re excited about, we’d love to help shape it.',
    cta: 'Start a conversation',
  },
} as const;
