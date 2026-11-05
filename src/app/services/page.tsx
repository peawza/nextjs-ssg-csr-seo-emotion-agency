import type { Metadata } from 'next';
import Link from 'next/link';
import { homeContent } from '@/content/home';
import styles from '@/styles/sections.module.css';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Marketing websites, landing pages, brand identity, product UX, web and mobile apps, e-commerce, SaaS dashboards, motion, 3D and design systems.',
  alternates: { canonical: '/services/' },
};

export default function ServicesPage() {
  return (
    <main id="main-content" className={styles.pageMain}>
      <div className="container">
        <p className={styles.eyebrow}>Services</p>
        <h1>What we do</h1>
        <p className={styles.bodyCopy}>
          We design and engineer digital products for ambitious teams — from focused launch sites to full-scale platforms.
          We start with why, then design and build the rest.
        </p>
        <div className={styles.cards}>
          {homeContent.services.map((service) => (
            <article className={styles.card} key={service.id}>
              <span className={styles.serviceIndex}>{service.id}</span>
              <h2>{service.title}</h2>
              <p>{service.description}</p>
            </article>
          ))}
        </div>
        <Link className={styles.textLink} href="/">
          Back to home
        </Link>
      </div>
    </main>
  );
}
