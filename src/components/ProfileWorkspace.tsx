'use client'

import { useProfileQuery } from '@/hooks/useProfile'
import { ProfileSection } from '@/components/ProfileSection'
import styles from './ProfileWorkspace.module.css'

export function ProfileWorkspace() {
  const { data: profile } = useProfileQuery()

  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar}>
        <div className={styles.brandRow}>
          <img
            src="/logo-leleka.svg"
            alt="Логотип Лелека"
            className={styles.logo}
          />
        </div>

        <nav className={styles.nav} aria-label="Пункти меню">
          <button type="button" className={styles.navItem}>Мій день</button>
          <button type="button" className={styles.navItem}>Подорож</button>
          <button type="button" className={styles.navItem}>Щоденник</button>
          <button type="button" className={`${styles.navItem} ${styles.navItemActive}`}>Профіль</button>
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
        <p className={styles.breadcrumb}>Лелека  <span>›</span>  Профіль</p>
        <ProfileSection />
      </section>
    </div>
  )
}
