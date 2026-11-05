import Link from 'next/link';
import { CinematicScene } from '@/components/interactive/CinematicScene';
import { homeContent } from '@/content/home';
import styles from '@/styles/sections.module.css';

export function HeroSection() {
  const titleWithoutLead = homeContent.hero.title.replace(/^Where\s+/i, '');

  return (
    <section id="home" className={styles.hero} aria-labelledby="hero-title">
      <CinematicScene />
      <div className={`container ${styles.heroInner}`}>
        <p className={styles.heroEyebrow} data-reveal>{homeContent.hero.eyebrow}</p>
        <p className={styles.heroLead} data-reveal>{homeContent.hero.description}</p>
        <h1 id="hero-title" aria-label={homeContent.hero.title} data-reveal>
          <span className={styles.heroLeadWord}>Where</span>
          <span className={styles.heroStatement}>{titleWithoutLead}</span>
        </h1>
        <Link className={styles.roundAction} href="/services/" aria-label={homeContent.hero.cta}>
          <span>{homeContent.hero.cta}</span>
          <span aria-hidden="true">↘</span>
        </Link>
        <p className={styles.heroScroll} aria-hidden="true">Move to explore</p>
      </div>
    </section>
  );
}
