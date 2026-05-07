'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import styles from './WeekSelector.module.css';

type Props = {
  currentWeek: number; // активний тиждень із props
  userWeek: number; // доступний користувачу тиждень
};

export default function WeekSelector({ currentWeek, userWeek }: Props) {
  const router = useRouter();

  const containerRef = useRef<HTMLDivElement | null>(null);

  // окремий state для натиснутої картки
  const [clickedWeek, setClickedWeek] = useState<number | null>(null);

  const weeks = Array.from({ length: 42 }, (_, i) => i + 1);

  // авто-скрол до active
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
        e.currentTarget.scrollLeft += e.deltaY;
      }}
    >
      {weeks.map(week => {
        const isActive = week === currentWeek;
        const isClicked = week === clickedWeek;
        const isPast = week < userWeek;
        const isFuture = week > userWeek;

        return (
          <button
            key={week}
            type="button"
            disabled={isFuture}
            onClick={() => {
              setClickedWeek(week);

              router.push(`/journey/${week}`);
            }}
            className={`${styles.card}
              ${isActive ? styles.active : ''}
              ${isClicked ? styles.clicked : ''}
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
