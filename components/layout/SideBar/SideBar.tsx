'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import UserBar from '../UserBar/UserBar';
import AuthBar from '../AuthBar/AuthBar';
import styles from './SideBar.module.css';
import { useUserStore } from '@/store/userStore';

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
    if (!isLoggedIn) {
      e.preventDefault();
      router.push('/auth/login');
    }
    if (onClose) onClose();
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.topContent}>
        <Link href="/" className={styles.logo} onClick={onClose}>
          <Image
            src="/Company Logo.svg"
            alt="Logo"
            width={100}
            height={100}
          />
        </Link>

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
