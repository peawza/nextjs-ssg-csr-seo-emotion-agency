export const aboutContent = {
  hero: {
    eyebrow: 'About Emotion',
    title: 'People remember how things made them feel.',
    description:
      'We’re a studio designing and engineering interfaces people remember, for brands and founders who want to stand out.',
  },
  philosophy: {
    eyebrow: 'The feeling',
    title: 'A good site gets looked at. A great one gets felt.',
    body: 'The space between “nice” and “I can’t look away” is where our work lives. It’s the part we obsess over, and the reason we’re Emotion.',
  },
  approach: {
    eyebrow: 'How we think',
    title: 'It starts with why',
    body: 'Before we touch a pixel, we get to know your business — what it does, who it’s for, what it needs to achieve. Design and code come after. The thinking comes first.',
  },
  team: {
    eyebrow: 'Who we are',
    title: 'A small team, one standard',
    body: 'We build a team around every project but stay hands-on from first idea to final deploy. You’re always in direct contact with the people who own the result. A studio led by two founders, working since 2018 with brands, startups and founders who want to stand out.',
    founders: [
      {
        name: 'Roman Stets',
        role: 'Turns chaos into clarity',
        description:
          'Takes whatever’s tangled in a client’s head and shapes it into a business that stands out. Connection, strategy and presentation all start with “why,” long before the first pixel.',
      },
      {
        name: 'Leonid Kostetskyi',
        role: 'Turns meaning into form',
        description:
          'A rare combination of deep design and code in one person. What others split between two departments, he handles himself, from the first line to the final deploy.',
      },
    ],
  },
  faq: [
    {
      question: 'Who is Emotion?',
      answer:
        'A small design and engineering studio led by two founders, working since 2018 with brands, startups and founders who want to stand out. Recognized by Awwwards and CSS Design Awards.',
    },
    {
      question: 'What does Emotion do?',
      answer:
        'We design and engineer interfaces — marketing sites, brand, product UX and frontend — from the first idea to the final deploy, under one roof.',
    },
    {
      question: 'What kind of clients do you work with?',
      answer: 'Ambitious brands, startups and solo founders across Web2 and Web3, from first-timers to established teams.',
    },
    {
      question: 'What makes Emotion different?',
      answer:
        'We start with why before touching a pixel, we stay personally involved on every project, and we care about the details others skip.',
    },
    {
      question: 'What is Emotion known for?',
      answer: 'Interfaces people remember — award-level craft with the feeling that makes a business impossible to overlook.',
    },
    {
      question: 'How much does a project cost?',
      answer:
        'Every project is scoped individually. Focused launch sites, full marketing sites and product platforms sit in different ranges, and every number comes from a scoping conversation rather than a price list.',
    },
    {
      question: 'What is your tech stack?',
      answer:
        'We prefer Nuxt, Three.js and WebGL for graphics, GSAP for motion and Storyblok or Shopify where a CMS or commerce layer is needed. We also work in Next.js and React when a project calls for it.',
    },
  ],
} as const;
