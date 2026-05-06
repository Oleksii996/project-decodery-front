'use client';

import { useEffect, useState } from 'react';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import Header from '../Header/Header';
import SideBar from '../SideBar/SideBar';
import css from './AppLayout.module.css';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1440px)');

    const handleViewportChange = (event: MediaQueryList | MediaQueryListEvent) => {
      const desktopViewport = event.matches;

      setIsDesktop(desktopViewport);

      if (desktopViewport) {
        setIsSidebarOpen(false);
      }
    };

    handleViewportChange(mediaQuery);
    mediaQuery.addEventListener('change', handleViewportChange);

    return () => {
      mediaQuery.removeEventListener('change', handleViewportChange);
    };
  }, []);

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

  return (
    <div className="container">
      <div className={css.appLayout}>
        <SideBar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        {isSidebarOpen && !isDesktop && (
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
