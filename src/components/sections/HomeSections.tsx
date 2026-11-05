import Link from 'next/link';
import { homeContent } from '@/content/home';
import { siteConfig } from '@/config/site';
import styles from '@/styles/sections.module.css';

export function HomeSections() {
  const { approach, services, work, awards, contact } = homeContent;

  return (
    <>
      <section id="about" className={`${styles.section} ${styles.approachSection}`} aria-labelledby="about-title">
        <div className="container">
          <div className={styles.sectionIntro} data-reveal>
            <p className={styles.eyebrow}>{approach.eyebrow}</p>
            <p className={styles.sectionNumber}>01</p>
          </div>
          <h2 id="about-title" className={styles.displayHeading} data-reveal>{approach.title}</h2>
          <p className={styles.leadStatement} data-reveal>{approach.body}</p>
          <div className={styles.pillarStack}>
            {approach.pillars.map((pillar, index) => (
              <article className={styles.pillar} key={pillar.title} data-reveal>
                <span className={styles.pillarNumber}>0{index + 1}</span>
                <h3>{pillar.title}</h3>
                <p>{pillar.description}</p>
              </article>
            ))}
          </div>
          <Link className={styles.arrowLink} href="/about/" data-reveal>
            More about us <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>

      <section id="services" className={`${styles.sectionAlt} ${styles.servicesSection}`} aria-labelledby="services-title">
        <div className="container">
          <div className={styles.sectionIntro} data-reveal>
            <p className={styles.eyebrow}>What we do</p>
            <p className={styles.sectionNumber}>02</p>
          </div>
          <div className={styles.splitHeading} data-reveal>
            <h2 id="services-title">Design and engineering, under one roof</h2>
            <p>We start with why, then design and build the rest — from launch sites to full-scale products.</p>
          </div>
          <ol className={styles.serviceList}>
            {services.map((service) => (
              <li className={styles.serviceItem} key={service.id} data-reveal>
                <span className={styles.serviceIndex}>({service.id})</span>
                <span className={styles.serviceName}>{service.title}</span>
                <span className={styles.serviceArrow} aria-hidden="true">↗</span>
              </li>
            ))}
          </ol>
          <Link className={styles.arrowLink} href="/services/" data-reveal>
            All capabilities <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>

      <section id="work" className={`${styles.section} ${styles.workSection}`} aria-labelledby="work-title">
        <div className="container">
          <div className={styles.sectionIntro} data-reveal>
            <p className={styles.eyebrow}>{work.eyebrow}</p>
            <p className={styles.sectionNumber}>03</p>
          </div>
          <h2 id="work-title" className={styles.displayHeading} data-reveal>{work.title}</h2>
          <p className={styles.bodyCopy} data-reveal>{work.body}</p>
          <div className={styles.projectGrid}>
            {work.projects.map((project, index) => (
              <article className={styles.projectCard} key={project.title} data-reveal>
                <div className={styles.projectVisual} data-tone={(index % 4) + 1} aria-hidden="true">
                  <span className={styles.projectGlyph}>{String(index + 1).padStart(2, '0')}</span>
                  <span className={styles.projectOrb} />
                </div>
                <div className={styles.projectMeta}>
                  <h3>{project.title}</h3>
                  <p>{project.tags.join(' · ')}</p>
                </div>
              </article>
            ))}
          </div>
          <Link className={styles.arrowLink} href="/work/" data-reveal>
            View all projects <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>

      <section id="awards" className={`${styles.sectionAlt} ${styles.awardsSection}`} aria-labelledby="awards-title">
        <div className="container">
          <div className={styles.sectionIntro} data-reveal>
            <p className={styles.eyebrow}>{awards.eyebrow}</p>
            <p className={styles.sectionNumber}>04</p>
          </div>
          <div className={styles.awardsHeadline} data-reveal>
            <h2 id="awards-title">{awards.title}</h2>
            <p className={styles.awardsTotal}><strong>{awards.total}</strong><span>total recognitions</span></p>
          </div>
          <p className={styles.bodyCopy} data-reveal>{awards.body}</p>
          <ul className={styles.awardList}>
            {awards.items.map((item) => (
              <li className={styles.awardItem} key={item.label} data-reveal>
                <span>{item.label}</span>
                <span className={styles.awardCount}>{item.count}×</span>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.awardTicker} aria-hidden="true">
          <div className={styles.tickerTrack}>
            <span>AWARD-WINNING DIGITAL EXPERIENCES</span><span>INTERFACES PEOPLE REMEMBER</span>
            <span>AWARD-WINNING DIGITAL EXPERIENCES</span><span>INTERFACES PEOPLE REMEMBER</span>
          </div>
        </div>
      </section>

      <section id="contact" className={`${styles.section} ${styles.contactSection}`} aria-labelledby="contact-title">
        <div className="container">
          <div className={styles.sectionIntro} data-reveal>
            <p className={styles.eyebrow}>{contact.eyebrow}</p>
            <p className={styles.sectionNumber}>05</p>
          </div>
          <h2 id="contact-title" data-reveal>{contact.title}</h2>
          <p className={styles.contactCopy} data-reveal>{contact.body}</p>
          <a className={styles.contactAction} href={`mailto:${siteConfig.email}`} data-reveal>
            <span>{contact.cta}</span><span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>
    </>
  );
}
