import styles from "./BabyCard.module.css";

export default function BabyCard({ data }: any) {
  return (
    <div className={styles.card}>
      <h2 className={styles.title}>Розвиток малюка</h2>

      {/* 🖼 КАРТИНКА */}
   <div className={styles.imageWrapper}>
  {data.image && (
    <img
      src={data.image}
      alt="baby"
      className={styles.image}
    />
  )}
</div>

      <div className={styles.section}>
        <p className={styles.description}>{data.description}</p>
      </div>

      <div className={styles.section}>
        <span className={styles.label}>Розмір:</span>
        <span className={styles.value}>{data.size}</span>
      </div>

      <div className={styles.section}>
        <h3 className={styles.subtitle}>Цікаві факти:</h3>

        <ul className={styles.list}>
          {data.facts?.map((fact: string, i: number) => (
            <li key={i} className={styles.listItem}>
              {fact}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}