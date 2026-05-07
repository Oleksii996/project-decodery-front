'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import styles from './WeekSelector.module.css';

type Props = {
  currentWeek: number; // обраний
  userWeek: number; // реальний
};

export default function WeekSelector({ currentWeek, userWeek }: Props) {
  const router = useRouter();

  const containerRef = useRef<HTMLDivElement | null>(null);

  const weeks = Array.from({ length: 42 }, (_, i) => i + 1);

  //  авто-скрол до активного тижня
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const activeEl = container.querySelector(`.${styles.active}`);

    if (activeEl) {
      activeEl.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest',
      });
    }
  }, [currentWeek]);

  return (
    <div
      ref={containerRef}
      className={styles.container}
      onWheel={e => {
        e.currentTarget.scrollLeft += e.deltaY; //   горизонтальний скрол
      }}
    >
      {weeks.map(week => {
        const isActive = week === currentWeek;
        const isPast = week < userWeek;
        const isFuture = week > userWeek;

        return (
          <button
            key={week}
            type="button"
            disabled={isFuture}
            onClick={() => router.push(`/journey/${week}`)}
            className={`${styles.card}
    ${isActive ? styles.active : ''}
    ${isPast ? styles.past : ''}
    ${isFuture ? styles.future : ''}`}
          >
            <span className={styles.number}>{week}</span>
            <span className={styles.label}>тиждень</span>
          </button>
        );
      })}
    </div>
  );
}
