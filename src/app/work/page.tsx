import type { Metadata } from 'next';
import Link from 'next/link';
import { homeContent } from '@/content/home';
import styles from '@/styles/sections.module.css';

export const metadata: Metadata = {
  title: 'Work',
  description:
    'Selected projects where design, technology and strategy come together — UI/UX, frontend, WebGL, e-commerce and CMS work.',
  alternates: { canonical: '/work/' },
};

export default function WorkPage() {
  const { work } = homeContent;

  return (
    <main id="main-content" className={styles.pageMain}>
      <div className="container">
        <p className={styles.eyebrow}>{work.eyebrow}</p>
        <h1>{work.title}</h1>
        <p className={styles.bodyCopy}>{work.body}</p>
        <ul className={styles.projectList}>
          {work.projects.map((project) => (
            <li className={styles.projectItem} key={project.title}>
              <span className={styles.projectName}>{project.title}</span>
              <span className={styles.projectTags}>{project.tags.join(' · ')}</span>
            </li>
          ))}
        </ul>
        <Link className={styles.textLink} href="/">
          Back to home
        </Link>
      </div>
    </main>
  );
}
