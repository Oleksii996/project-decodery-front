import styles from './Spinner.module.css'

type SpinnerProps = {
  label?: string
  size?: 'sm' | 'md' | 'lg'
}

export function Spinner({ label = 'Завантаження', size = 'md' }: SpinnerProps) {
  return (
    <span
      className={styles.wrap}
      role="status"
      aria-live="polite"
      aria-label={label}
    >
      <span className={`${styles.ring} ${styles[`ring_${size}`]}`} aria-hidden />
    </span>
  )
}
