'use client';

import { useRef } from 'react';
import toast from 'react-hot-toast';
import { useUploadAvatarMutation } from '../../hooks';
import type { UserProfile } from '../../types';
import css from './ProfileAvatar.module.css';

type Props = {
  profile: UserProfile;
};

export default function ProfileAvatar({ profile }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { mutateAsync: uploadAvatar, isPending } = useUploadAvatarMutation();
  const avatarSrc = profile.avatarUrl ?? profile.avatar ?? null;

  const initials = profile.name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map(part => part[0]?.toUpperCase())
    .join('');

  const onPick = () => fileInputRef.current?.click();

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;

    try {
      await uploadAvatar(file);
      toast.success('Фото профілю оновлено');
    } catch {
      toast.error('Не вдалося оновити фото');
    }
  };

  return (
    <section className={css.container}>
      <div className={css.avatarWrap}>
        {avatarSrc ? (
          <img
            src={avatarSrc}
            alt="Аватар профілю"
            className={css.avatar}
          />
        ) : (
          <span className={css.avatarPlaceholder}>{initials || '—'}</span>
        )}
      </div>
      <div className={css.info}>
        <p className={css.name}>{profile.name}</p>
        <p className={css.email}>{profile.email}</p>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className={css.fileInput}
          onChange={onFileChange}
        />
        <button
          type="button"
          className={css.uploadButton}
          onClick={onPick}
          disabled={isPending}
        >
          {isPending ? 'Завантаження...' : 'Завантажити нове фото'}
        </button>
      </div>
    </section>
  );
}
