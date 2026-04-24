'use client'

import { toast } from 'sonner'
import { useProfileQuery } from '@/hooks/useProfile'
import { ProfileAvatar } from './ProfileAvatar'
import { ProfileEditForm } from './ProfileEditForm'
import { PageLoader } from '@/components/ui/PageLoader'
import styles from './ProfileSection.module.css'

/** Екран профілю: аватар з основною інформацією та форма редагування. */
export function ProfileSection() {
  const { data: profile, isLoading, error, refetch, isFetching } =
    useProfileQuery()

  if (isLoading && !profile) {
    return (
      <div className={styles.centered}>
        <PageLoader message="Завантаження профілю…" />
      </div>
    )
  }

  if (error && !profile) {
    return (
      <div className={styles.centered}>
        <p className={styles.status} role="alert">
          Не вдалося завантажити профіль
        </p>
        <button
          type="button"
          className={styles.retry}
          onClick={() => {
            void refetch().then((r) => {
              if (r.isError) toast.error('Повторне завантаження не вдалося')
            })
          }}
        >
          Спробувати знову
        </button>
      </div>
    )
  }

  if (!profile) return null

  const formKey = [
    profile.name,
    profile.email,
    profile.childGender,
    profile.expectedDueDate,
  ].join('|')

  return (
    <div className={styles.root}>
      {isFetching && !isLoading ? (
        <div className={styles.fetching} aria-hidden />
      ) : null}
      <ProfileAvatar />
      <ProfileEditForm key={formKey} profile={profile} />
    </div>
  )
}
