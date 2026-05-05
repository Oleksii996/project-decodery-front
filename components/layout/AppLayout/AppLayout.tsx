'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import Header from '../Header/Header';
import SideBar from '../SideBar/SideBar';
import css from './AppLayout.module.css';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();
  const isProfilePage = pathname === '/profile';

  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isSidebarOpen]);

  if (isProfilePage) {
    return (
      <div className="container">
        <main className={css.mainContent}>{children}</main>
      </div>
    );
  }

  return (
    <div className="container">
      <div className={css.appLayout}>
        <SideBar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        {isSidebarOpen && (
          <div
            className={css.overlay}
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        <main className={css.mainContent}>
          <Header onMenuClick={() => setIsSidebarOpen(true)} />
          <Breadcrumbs />
          {children}
        </main>
      </div>
    </div>
  );
}
