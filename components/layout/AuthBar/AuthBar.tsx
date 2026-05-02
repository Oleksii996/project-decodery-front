'use client';

import Link from 'next/link';
import styles from './AuthBar.module.css';

interface AuthBarProps {
  onClose?: () => void;
}

const AuthBar = ({ onClose }: AuthBarProps) => {
  return (
    <div className={styles.authWrapper}>
      <Link
        href="/auth/register"
        className={styles.registerLink}
        onClick={onClose}
      >
        Зареєструватися
      </Link>

      <Link href="/auth/login" className={styles.loginLink} onClick={onClose}>
        Увійти
      </Link>
    </div>
  );
};

export default AuthBar;
