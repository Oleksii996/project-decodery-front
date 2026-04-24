'use client'

import { useRef } from 'react'
import { toast } from 'sonner'
import { useProfileQuery, useUploadAvatarMutation } from '@/hooks/useProfile'
import { Spinner } from '@/components/ui/Spinner'
import styles from './ProfileAvatar.module.css'

const ACCEPT = 'image/jpeg,image/png,image/webp'

export function ProfileAvatar() {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { data: profile } = useProfileQuery()
  const { mutateAsync: upload, isPending } = useUploadAvatarMutation()

  if (!profile) return null

  const openPicker = () => {
    fileInputRef.current?.click()
  }

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return

    try {
      await upload(file)
      toast.success('Фото профілю оновлено')
    } catch {
      toast.error('Не вдалося оновити фото. Спробуйте ще раз.')
    }
  }

  const initials = profile.name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join('')

  return (
    <section className={styles.root} aria-label="Поточний профіль користувача">
      <div className={styles.row}>
        <div className={styles.imageWrap}>
          {profile.avatarUrl ? (
            <img className={styles.image} src={profile.avatarUrl} alt="" />
          ) : (
            <span className={styles.placeholder}>{initials || '—'}</span>
          )}
        </div>

        <div className={styles.meta}>
          <p className={styles.name}>{profile.name}</p>
          <p className={styles.email}>{profile.email}</p>
          <input
            ref={fileInputRef}
            type="file"
            accept={ACCEPT}
            className={styles.fileInput}
            onChange={onFileChange}
            aria-hidden={true}
            tabIndex={-1}
          />
          <button
            type="button"
            className={styles.upload}
            onClick={openPicker}
            disabled={isPending}
          >
            {isPending ? (
              <span className={styles.uploadInner}>
                <Spinner size="sm" label="Завантаження фото" />
                Завантаження…
              </span>
            ) : (
              'Завантажити нове фото'
            )}
          </button>
        </div>
      </div>
    </section>
  )
}
