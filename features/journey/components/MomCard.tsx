import styles from "./MomCard.module.css";

export default function MomCard({ data }: any) {
  return (
    <div className={styles.card}>
      <h2 className={styles.title}>Тіло мами</h2>

      {/* Поради */}
      <div className={styles.section}>
        <h3 className={styles.subtitle}>Поради для комфорту</h3>
        <p className={styles.text}>{data.tip}</p>
      </div>

      {/* Відчуття */}
      <div className={styles.section}>
        <h3 className={styles.subtitle}>Як ви можете почуватись</h3>

        <ul className={styles.list}>
          {data.feelings?.map((f: string, i: number) => (
            <li key={i} className={styles.listItem}>
              {f}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}