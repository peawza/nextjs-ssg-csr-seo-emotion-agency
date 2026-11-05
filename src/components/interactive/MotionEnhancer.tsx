'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import styles from './MotionEnhancer.module.css';

export function MotionEnhancer() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    const revealElements = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
    const observers: IntersectionObserver[] = [];

    if (!reduceMotion.matches) {
      for (const element of revealElements) {
        if (element.getBoundingClientRect().top < window.innerHeight * 0.92) {
          element.dataset.visible = 'true';
        }
      }
      root.dataset.motion = 'ready';
      const revealObserver = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              (entry.target as HTMLElement).dataset.visible = 'true';
              revealObserver.unobserve(entry.target);
            }
          }
        },
        { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
      );
      for (const element of revealElements) revealObserver.observe(element);
      observers.push(revealObserver);
    }

    const cursor = cursorRef.current;
    if (!cursor || !finePointer.matches || reduceMotion.matches) {
      return () => {
        delete root.dataset.motion;
        for (const observer of observers) observer.disconnect();
      };
    }

    root.dataset.cursor = 'active';
    let frame = 0;
    let currentX = window.innerWidth / 2;
    let currentY = window.innerHeight / 2;
    let targetX = currentX;
    let targetY = currentY;

    const draw = () => {
      currentX += (targetX - currentX) * 0.18;
      currentY += (targetY - currentY) * 0.18;
      cursor.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      frame = window.requestAnimationFrame(draw);
    };
    const onPointerMove = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
      cursor.dataset.visible = 'true';
    };
    const onPointerOver = (event: PointerEvent) => {
      const target = event.target;
      cursor.dataset.hover = target instanceof Element && Boolean(target.closest('a, button')) ? 'true' : 'false';
    };
    const onPointerLeave = () => {
      cursor.dataset.visible = 'false';
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerover', onPointerOver, { passive: true });
    document.documentElement.addEventListener('mouseleave', onPointerLeave);
    frame = window.requestAnimationFrame(draw);

    return () => {
      delete root.dataset.motion;
      delete root.dataset.cursor;
      for (const observer of observers) observer.disconnect();
      window.cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerover', onPointerOver);
      document.documentElement.removeEventListener('mouseleave', onPointerLeave);
    };
  }, [pathname]);

  return (
    <div ref={cursorRef} className={styles.cursor} data-visible="false" data-hover="false" aria-hidden="true">
      <span className={styles.cursorDot} />
    </div>
  );
}
