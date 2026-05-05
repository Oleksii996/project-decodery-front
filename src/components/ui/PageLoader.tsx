import { Spinner } from './Spinner'
import styles from './PageLoader.module.css'

type PageLoaderProps = {
  message?: string
}

export function PageLoader({ message = 'Завантаження…' }: PageLoaderProps) {
  return (
    <div className={styles.root} role="status" aria-live="polite">
      <Spinner size="lg" label={message} />
      <p className={styles.text}>{message}</p>
    </div>
  )
}
