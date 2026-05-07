'use client';

import Link from 'next/link';
import styles from './AuthBar.module.css';
import { useAuthStore } from '@/store/authStore';

interface AuthBarProps {
  onClose?: () => void;
}

const AuthBar = ({ onClose }: AuthBarProps) => {
  const isAuth = useAuthStore(s => s.isAuth);
  return (
    <div>
      <div className={styles.dividerAuth}></div>
      <div className={styles.authWrapper}>
        <Link
          href="/auth/register"
          className={styles.registerLink}
          onClick={onClose}
        >
          Зареєструватись
        </Link>

        <Link href="/auth/login" className={styles.loginLink} onClick={onClose}>
          Увійти
        </Link>
      </div>
    </div>
  );
};

export default AuthBar;
