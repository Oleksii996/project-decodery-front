import styles from "./MomCard.module.css";

export default function MomCard({ data }: any) {
  return (
    <div className={styles.card}>
      <h2 className={styles.title}>Тіло мами</h2>

      {/* Як ви можете почуватись */}
      <div className={styles.section}>
        <h3 className={styles.subtitle}>Як ви можете почуватись</h3>
        <p className={styles.text}>{data.description}</p>
      </div>

      {/* Поради */}
      <div className={styles.section}>
        <h3 className={styles.subtitle}>Поради для вашого комфорту</h3>

        {data.tips?.map((item: any, i: number) => (
          <div key={i} className={styles.tipItem}>
            <p className={styles.tipTitle}>{item.category}</p>
            <p className={styles.tipText}>{item.tip}</p>
          </div>
        ))}
      </div>
    </div>
  );
}