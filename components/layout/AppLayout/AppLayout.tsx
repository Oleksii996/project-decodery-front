'use client';

import { useState } from 'react';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import Header from '../Header/Header';
import SideBar from '../SideBar/SideBar';
import css from './AppLayout.module.css';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="container">
      <div className={css.appLayout}>
        <SideBar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        <main className={css.mainContent}>
          <Header onMenuClick={() => setIsSidebarOpen(true)} />
          <Breadcrumbs />
          {children}
        </main>
      </div>
    </div>
  );
}
