'use client'

import { useEffect } from 'react'
import { useProfileQuery } from '@/hooks/useProfile'
import { ProfileSection } from '@/components/ProfileSection'
import styles from './ProfileWorkspace.module.css'

export function ProfileWorkspace() {
  const { data: profile } = useProfileQuery()

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

  return (
    <div className={styles.layout}>
      <section className={styles.content}>
        <div className="container">
          <p className={styles.breadcrumb}>Лелека  <span>›</span>  Профіль</p>
          <ProfileSection />
        </div>
      </section>
    </div>
  )
}
