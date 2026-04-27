"use client";

import { useRouter } from "next/navigation";
import styles from "./WeekSelector.module.css";

type Props = {
  currentWeek: number;
};

export default function WeekSelector({ currentWeek }: Props) {
  const router = useRouter();

  //  42 тижні
  const weeks = Array.from({ length: 42 }, (_, i) => i + 1);

  //  гарантуємо число
  const current = Number(currentWeek);

  return (
    <div className={styles.container}>
      {weeks.map((week) => {
        const isActive = week === current;
        const isPast = week < current;
        const isFuture = week > current;

        return (
          <div
            key={week}
            onClick={() => {
              if (!isFuture) {
                router.push(`/journey/${week}`);
              }
            }}
            className={`${styles.card}
              ${isActive ? styles.active : ""}
              ${isPast ? styles.past : ""}
              ${isFuture ? styles.future : ""}`}
          >
            <div className={styles.number}>{week}</div>
            <div className={styles.label}>тиждень</div>
          </div>
        );
      })}
    </div>
  );
}