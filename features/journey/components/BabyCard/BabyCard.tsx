import Image from 'next/image';
import { BabyData } from '../../types';
import styles from './BabyCard.module.css';

interface BabyCardProps {
  data: BabyData;
}

export default function BabyCard({ data }: BabyCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.row}>
        {/* LEFT - IMAGE */}
        <div className={styles.imageWrapper}>
          {data.image && (
            <Image
              src={data.image}
              alt="baby"
              width={461}
              height={379}
              className={styles.image}
            />
          )}
          <p className={styles.imageCaption}>
            Ваш малюк зараз розміром з «{data.size}»
          </p>
        </div>

        <div className={styles.textBlock}>
          <p className={styles.description}>{data.description}</p>

          <p className={styles.size}>
            <span className={styles.label}>Розмір:</span> {data.size}
          </p>

          <div className={styles.factBox}>
            <div className={styles.factHeader}>
              <img src="/icons/star.svg" alt="star" />
              <p className={styles.factTitle}>Цікавий факт тижня</p>
            </div>

            <p className={styles.factText}>{data.facts?.[0]}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
