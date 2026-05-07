'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import UserBar from '../UserBar/UserBar';
import AuthBar from '../AuthBar/AuthBar';
import css from './SideBar.module.css';
import { useUserStore } from '@/store/userStore';
import { useEffect, useState } from 'react';
// import css from '../SideBar/SideBar.module.css';

interface SideBarProps {
  onClose?: () => void;
  isOpen?: boolean;
}

const SideBar = ({ onClose, isOpen }: SideBarProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const isAuth = useUserStore(state => state.isAuth);
  const [week, setWeek] = useState(1);

  useEffect(() => {
    if (!isAuth) {
      return;
    }

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
  }, [isAuth]);
  const navItems = [
    { label: 'Мій день', href: '/', icon: 'icon-today' },

    {
      label: 'Подорож',
      href: `/journey/${week}`,
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
    <aside className={`${css.sidebar} ${isOpen ? css.open : ''}`}>
      <div className={css.menuTop}>
        <Link href="/" className={css.logo} onClick={onClose}>
          <Image
            src="/Company Logo.svg"
            alt="Company logo"
            width={105}
            height={45}
            loading="eager"
          />
        </Link>
        <button
          type="button"
          className={css.closeBtn}
          onClick={onClose}
          aria-label="Закрити сайдбар меню"
        >
          <svg className={css.closeIcon} width="32" height="32">
            <use href="/leleka-sprite.svg#icon-close" />
          </svg>
        </button>
      </div>

      <div className={css.topContent}>
        <nav className={css.navigation}>
          <ul className={css.navList}>
            {navItems.map(item => (
              <li
                key={item.href}
                className={pathname === item.href ? css.active : css.navItem}
              >
                <Link
                  href={item.href}
                  className={css.link}
                  onClick={handleLinkClick}
                >
                  <svg className={css.icon} width="24" height="24">
                    <use href={`/leleka-sprite.svg#${item.icon}`} />
                  </svg>
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className={css.bottomContent}>
        {isAuth ? <UserBar onClose={onClose} /> : <AuthBar onClose={onClose} />}
      </div>
    </aside>
  );
};

export default SideBar;
