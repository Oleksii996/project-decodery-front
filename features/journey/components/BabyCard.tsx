import styles from "./BabyCard.module.css";

export default function BabyCard({ data }: any) {
  return (
    <div className={styles.card}>
      <h2 className={styles.title}>Розвиток малюка</h2>

      <div className={styles.content}>
        {/* LEFT - IMAGE */}
        <div className={styles.imageWrapper}>
          {data.image && (
            <img
              src={data.image}
              alt="baby"
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