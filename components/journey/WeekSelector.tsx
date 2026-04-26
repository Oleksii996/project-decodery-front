"use client";

import { useRouter } from "next/navigation";
import styles from "./WeekSelector.module.css";

type Props = {
  currentWeek: number;
};

export default function WeekSelector({ currentWeek }: Props) {
  const router = useRouter();

  const weeks = Array.from({ length: 40 }, (_, i) => i + 1);

  return (
    <div className={styles.container}>
      {weeks.map((week) => {
        const current = Number(currentWeek);


        const isActive = week === currentWeek;
        const isPast = week < currentWeek;
        const isFuture = week > currentWeek;

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