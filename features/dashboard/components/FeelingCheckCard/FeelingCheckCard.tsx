'use client';

import { useState } from 'react';
import styles from './FeelingCheckCard.module.css';
import AddDiaryEntryModal from '../../../diary/components/AddDiaryEntryModal/AddDiaryEntryModal';

type Props = {
  isAuth: boolean;
};

export default function FeelingCheckCard({ isAuth }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    if (!isAuth) {
      window.location.href = '/auth/register';
      return;
    }

    setIsOpen(true);
  };

  return (
    <section className={styles.infoText}>
      <div className={styles.card}>
        <h3 className={styles.title}>Як ви себе почуваєте?</h3>

        <p className={styles.text}>Рекомендація на сьогодні:</p>

        <p className={styles.text2}>Занотуйте незвичні відчуття у тілі.</p>

        <button className={styles.button} onClick={handleClick}>
          Зробити запис у щоденник
        </button>
      </div>

      {isOpen && <AddDiaryEntryModal onClose={() => setIsOpen(false)} />}
    </section>
  );
}
