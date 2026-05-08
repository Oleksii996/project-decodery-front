import Image from 'next/image';
import styles from './MomCard.module.css';
import type { MomData } from '@/features/journey/types';

interface MomCardProps {
  data: MomData;
}
//  функція для іконок
const getIcon = (category: string) => {
  switch (category) {
    case 'Харчування':
      return <Image src="/icons/food.svg" alt="food" width={24} height={24} />;
    case 'Активність':
      return (
        <Image
          src="/icons/activity.svg"
          alt="activity"
          width={24}
          height={24}
        />
      );
    case 'Відпочинок та комфорт':
      return <Image src="/icons/rest.svg" alt="rest" width={24} height={24} />;
    default:
      return null;
  }
};

export default function MomCard({ data }: MomCardProps) {
  return (
    <div className={styles.wrapper}>
      {/* БЛОК 1 */}
      <div className={styles.card}>
        <h3 className={styles.subtitle}>Як ви можете почуватись</h3>

        <div className={styles.states}>
          {data.states?.map((state: string, i: number) => (
            <span key={i} className={styles.stateItem}>
              {state}
            </span>
          ))}
        </div>

        <p className={styles.text}>{data.description}</p>
      </div>

      {/* БЛОК 2 */}
      <div className={styles.card}>
        <h3 className={styles.subtitle}>Поради для вашого комфорту</h3>

        {data.tips?.map((item, i: number) => (
          <div key={i} className={styles.tipItem}>
            {/*  ІКОНКА + КАТЕГОРІЯ */}
            <p className={styles.tipTitle}>
              {getIcon(item.category)}
              <span>{item.category}</span>
            </p>

            <p className={styles.tipText}>{item.tip}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
