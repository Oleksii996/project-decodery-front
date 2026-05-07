'use client';

import { isAxiosError } from 'axios';
import { useEffect, useRef, useState } from 'react';
import { ColorRing } from 'react-loader-spinner';
import toast from 'react-hot-toast';
import { useUploadAvatarMutation } from '../../hooks';
import type { UserProfile } from '../../types';
import css from './ProfileAvatar.module.css';

type Props = {
  profile: UserProfile;
};

export default function ProfileAvatar({ profile }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [localPreview, setLocalPreview] = useState<string | null>(null);
  const { mutateAsync: uploadAvatar, isPending } = useUploadAvatarMutation();
  const avatarSrc = profile.avatarUrl ?? profile.avatar ?? null;
  const displaySrc = localPreview ?? avatarSrc;

  useEffect(() => {
    return () => {
      if (localPreview) {
        URL.revokeObjectURL(localPreview);
      }
    };
  }, [localPreview]);

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

    const preview = URL.createObjectURL(file);
    setLocalPreview(prev => {
      if (prev) URL.revokeObjectURL(prev);
      return preview;
    });

    try {
      await uploadAvatar(file);
      toast.success('Фото профілю оновлено');
      setLocalPreview(prev => {
        if (prev) URL.revokeObjectURL(prev);
        return null;
      });
    } catch (error: unknown) {
      setLocalPreview(prev => {
        if (prev) URL.revokeObjectURL(prev);
        return null;
      });
      let message: string | null = null;
      if (isAxiosError(error)) {
        const data = error.response?.data;
        if (data && typeof data === 'object') {
          if ('message' in data && typeof data.message === 'string') {
            message = data.message;
          } else if ('error' in data && typeof data.error === 'string') {
            message = data.error;
          }
        }
        message = message ?? error.message;
      }
      toast.error(message?.trim() || 'Не вдалося оновити фото');
    }
  };

  return (
    <section className={css.container}>
      <div className={css.avatarWrap}>
        {displaySrc ? (
          <img
            src={displaySrc}
            alt="Аватар профілю"
            className={css.avatar}
          />
        ) : (
          <span className={css.avatarPlaceholder}>{initials || '—'}</span>
        )}
        {isPending ? (
          <div className={css.avatarLoading} aria-busy="true" aria-live="polite">
            <ColorRing
              visible
              height="48"
              width="48"
              ariaLabel="Завантаження фото"
              colors={['#feeccc', '#FEF1DB', '#FFCBD3', '#FFDAE0', '#C4F2FE']}
            />
          </div>
        ) : null}
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
