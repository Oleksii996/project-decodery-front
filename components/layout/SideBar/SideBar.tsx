'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import UserBar from '../UserBar/UserBar';
import AuthBar from '../AuthBar/AuthBar';
import styles from './SideBar.module.css';
import { useUserStore } from '@/store/userStore';
import { useEffect, useState } from 'react';
import css from '../SideBar/SideBar.module.css';

interface SideBarProps {
  onClose?: () => void;
  isOpen?: boolean;
}

const SideBar = ({ onClose, isOpen }: SideBarProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const isAuth = useUserStore(state => state.isAuth);
  const [week, setWeek] = useState<number | null>(null);

   useEffect(() => {
  fetch('/api/weeks/me')
    .then(res => res.json())
    .then(data => {
      if (data?.weekNumber) {
        setWeek(data.weekNumber);
      } else {
        setWeek(1);
      }
    })
    .catch(() => setWeek(1));
}, []);

  const navItems = [
    { label: 'Мій день', href: '/', icon: 'icon-today' },

{
  label: 'Подорож',
  href: week ? `/journey/${week}` : `/journey/1`,
  icon: 'icon-conversion_path',
},

    { label: `Щоденник`, href: '/diary', icon: 'icon-book' },
    { label: 'Профіль', href: '/profile', icon: 'icon-account_circle' },
  ];

  const handleLinkClick = (e: React.MouseEvent) => {
    if (!isAuth) {
      e.preventDefault();
      router.push('/auth/login');
    }
    if (onClose) onClose();
  };

  return (
    <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
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
              <li key={item.href} className={styles.navItem}>
                <Link
                  href={item.href}
                  className={
                    pathname === item.href ? styles.active : styles.link
                  }
                  onClick={handleLinkClick}
                >
                  <svg className={styles.icon} width="24" height="24">
                    <use href={`/leleka-sprite.svg#${item.icon}`} />
                  </svg>
                  <span>{item.label}</span>
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
