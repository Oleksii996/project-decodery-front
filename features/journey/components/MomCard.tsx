import styles from "./MomCard.module.css";

export default function MomCard({ data }: any) {
  return (
    <div className={styles.card}>
      <h2 className={styles.title}>Тіло мами</h2>

      {/* Поради */}
      <div className={styles.section}>
        <h3 className={styles.subtitle}>Поради для комфорту</h3>

        <ul className={styles.list}>
          {data.tips?.map((tip: string, i: number) => (
            <li key={i} className={styles.listItem}>
              {tip}
            </li>
          ))}
        </ul>
      </div>

      {/* Відчуття */}
      <div className={styles.section}>
        <h3 className={styles.subtitle}>Як ви можете почуватись</h3>

        <p className={styles.text}>{data.description}</p>
      </div>
    </div>
  );
}