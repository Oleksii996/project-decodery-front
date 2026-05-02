'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import UserBar from '../UserBar/UserBar';
import AuthBar from '../AuthBar/AuthBar';
import styles from './SideBar.module.css';
import { useUserStore } from '@/store/userStore';

import css from '../SideBar/SideBar.module.css';

interface SideBarProps {
  onClose?: () => void;
}

const SideBar = ({ onClose }: SideBarProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const { isLoggedIn } = useAuthStore();
  const isAuth = useUserStore(state => state.isAuth);

  const navItems = [
    { label: 'Мій день', href: '/' },
    { label: 'Подорож', href: '/journey' },
    { label: 'Щоденник', href: '/diary' },
    { label: 'Профіль', href: '/profile' },
  ];

  const handleLinkClick = (e: React.MouseEvent) => {
    if (!isAuth) {
      e.preventDefault();
      router.push('/auth/login');
    }
    if (onClose) onClose();
  };

  return (
    <aside className={styles.sidebar}>
      <div className={css.menuTop}>
        <Link href="/" className={css.logo} onClick={onClose}>
          <Image
            src="/Company Logo.svg"
            alt="Company logo"
            width={105}
            height={45}
          />
        </Link>
      </div>

      <div className={styles.topContent}>
        <nav className={styles.navigation}>
          <ul className={styles.navList}>
            {navItems.map(item => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={
                    pathname === item.href ? styles.active : styles.link
                  }
                  onClick={handleLinkClick}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className={styles.bottomContent}>
        {isAuth ? <UserBar onClose={onClose} /> : <AuthBar onClose={onClose} />}
      </div>
    </aside>
  );
};

export default SideBar;
