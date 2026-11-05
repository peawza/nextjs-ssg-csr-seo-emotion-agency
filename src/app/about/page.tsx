import type { Metadata } from 'next';
import Link from 'next/link';
import { aboutContent } from '@/content/about';
import { serializeJsonLd } from '@/lib/seo/json-ld';
import styles from '@/styles/sections.module.css';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Emotion is a design and engineering studio led by two founders, building interfaces people remember since 2018.',
  alternates: { canonical: '/about/' },
};

export default function AboutPage() {
  const { hero, philosophy, approach, team, faq } = aboutContent;

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };

  return (
    <main id="main-content" className={styles.pageMain}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(faqJsonLd) }} />
      <div className="container">
        <p className={styles.eyebrow}>{hero.eyebrow}</p>
        <h1>{hero.title}</h1>
        <p className={styles.bodyCopy}>{hero.description}</p>
      </div>

      <section className={styles.section} aria-labelledby="about-feeling-title">
        <div className="container">
          <p className={styles.eyebrow}>{philosophy.eyebrow}</p>
          <h2 id="about-feeling-title">{philosophy.title}</h2>
          <p className={styles.bodyCopy}>{philosophy.body}</p>
        </div>
      </section>

      <section className={styles.sectionAlt} aria-labelledby="about-approach-title">
        <div className="container">
          <p className={styles.eyebrow}>{approach.eyebrow}</p>
          <h2 id="about-approach-title">{approach.title}</h2>
          <p className={styles.bodyCopy}>{approach.body}</p>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="about-team-title">
        <div className="container">
          <p className={styles.eyebrow}>{team.eyebrow}</p>
          <h2 id="about-team-title">{team.title}</h2>
          <p className={styles.bodyCopy}>{team.body}</p>
          <div className={styles.cards}>
            {team.founders.map((founder) => (
              <article className={styles.card} key={founder.name}>
                <h3>{founder.name}</h3>
                <p className={styles.founderRole}>{founder.role}</p>
                <p>{founder.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className={styles.sectionAlt} aria-labelledby="about-faq-title">
        <div className="container">
          <p className={styles.eyebrow}>FAQ</p>
          <h2 id="about-faq-title">Common questions</h2>
          <div className={styles.faqs}>
            {faq.map((item) => (
              <article key={item.question}>
                <h3>{item.question}</h3>
                <p>{item.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <div className="container">
        <Link className={styles.textLink} href="/">
          Back to home
        </Link>
      </div>
    </main>
  );
}
