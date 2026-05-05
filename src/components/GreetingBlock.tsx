import styles from './GreetingBlock.module.css'

export function GreetingBlock() {
  return (
    <div className={styles.bar} aria-label="Бренд Leleka">
      <span className={styles.logoMark} aria-hidden />
      <span className={styles.brandText}>Лелека</span>
    </div>
  )
}
