import Image from 'next/image';
import { BabyData } from '../../types';
import styles from './BabyCard.module.css';

interface BabyCardProps {
  data: BabyData;
}
export default function BabyCard({ data }: BabyCardProps) {
  return (
    <div className={styles.card}>
      <h2 className={styles.title}>Розвиток малюка</h2>

      <div className={styles.content}>
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
        </div>

        {/* RIGHT - TEXT */}
        <div className={styles.textBlock}>
          <p className={styles.description}>{data.description}</p>

          <p className={styles.size}>
            <span className={styles.label}>Розмір:</span> {data.size}
          </p>

          <div className={styles.facts}>
            <p className={styles.subtitle}>Цікаві факти:</p>

            <ul className={styles.list}>
              {data.facts?.map((fact: string, i: number) => (
                <li key={i} className={styles.listItem}>
                  {fact}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
