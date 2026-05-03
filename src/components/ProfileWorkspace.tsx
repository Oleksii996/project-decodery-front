'use client'

import { useEffect, useState } from 'react'
import { useProfileQuery } from '@/hooks/useProfile'
import { ProfileSection } from '@/components/ProfileSection'
import styles from './ProfileWorkspace.module.css'

export function ProfileWorkspace() {
  const { data: profile } = useProfileQuery()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    if (!sidebarOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSidebarOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [sidebarOpen])

  useEffect(() => {
    const root = document.documentElement
    const gender = profile?.childGender
    if (gender === 'male') {
      root.dataset.theme = 'boy'
    } else if (gender === 'female') {
      root.dataset.theme = 'girl'
    } else {
      delete root.dataset.theme
    }
    return () => {
      delete root.dataset.theme
    }
  }, [profile?.childGender])

  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [sidebarOpen])

  const closeSidebar = () => setSidebarOpen(false)

  return (
    <div className={styles.layout}>
      <header className={styles.mobileBar}>
        <img
          src="/img/company_logo_both.svg"
          alt="Лелека"
          className={styles.mobileLogo}
        />
        <button
          type="button"
          className={styles.menuButton}
          aria-expanded={sidebarOpen}
          aria-controls="workspace-sidebar"
          aria-label={sidebarOpen ? 'Закрити меню' : 'Відкрити меню'}
          onClick={() => setSidebarOpen((o) => !o)}
        >
          <span className={styles.menuIcon} aria-hidden />
        </button>
      </header>

      {sidebarOpen ? (
        <button
          type="button"
          className={styles.backdrop}
          aria-label="Закрити меню"
          onClick={closeSidebar}
        />
      ) : null}

      <aside
        id="workspace-sidebar"
        className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarOpen : ''}`}
      >
        <div className={styles.sidebarHeader}>
          <div className={styles.brandRow}>
            <img
              src="/img/company_logo_both.svg"
              alt="Логотип Лелека"
              className={styles.logo}
            />
          </div>
          <button
            type="button"
            className={styles.sidebarClose}
            aria-label="Закрити меню"
            onClick={closeSidebar}
          >
            ×
          </button>
        </div>

        <nav className={styles.nav} aria-label="Пункти меню">
          <button type="button" className={styles.navItem} onClick={closeSidebar}>
            Мій день
          </button>
          <button type="button" className={styles.navItem} onClick={closeSidebar}>
            Подорож
          </button>
          <button type="button" className={styles.navItem} onClick={closeSidebar}>
            Щоденник
          </button>
          <button
            type="button"
            className={`${styles.navItem} ${styles.navItemActive}`}
            onClick={closeSidebar}
          >
            Профіль
          </button>
        </nav>

        <div className={styles.sidebarFooter}>
          <div className={styles.footerAvatar} aria-hidden>
            {profile?.avatarUrl ? (
              <img
                src={profile.avatarUrl}
                alt=""
                className={styles.footerAvatarImage}
              />
            ) : (
              profile?.name?.[0]?.toUpperCase() ?? 'Г'
            )}
          </div>
          <div className={styles.footerMeta}>
            <p className={styles.footerName}>{profile?.name ?? 'Ганна'}</p>
            <p className={styles.footerEmail}>{profile?.email ?? 'hanna@gmail.com'}</p>
          </div>
          <img
            src="/logout.svg"
            alt="Вийти з профілю"
            className={styles.logoutIcon}
          />
        </div>
      </aside>

      <section className={styles.content}>
        <div className="container">
          <p className={styles.breadcrumb}>Лелека  <span>›</span>  Профіль</p>
          <ProfileSection />
        </div>
      </section>
    </div>
  )
}
