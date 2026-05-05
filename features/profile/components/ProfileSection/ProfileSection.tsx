'use client';

import toast from 'react-hot-toast';
import ProfileAvatar from '../ProfileAvatar/ProfileAvatar';
import ProfileEditForm from '../ProfileEditForm/ProfileEditForm';
import { useProfileQuery } from '../../hooks';
import css from './ProfileSection.module.css';

export default function ProfileSection() {
  const { data: profile, isLoading, error, refetch } = useProfileQuery();

  if (isLoading) {
    return <p className={css.status}>Завантаження профілю...</p>;
  }

  if (error || !profile) {
    return (
      <div className={css.fallback}>
        <p className={css.status}>Не вдалося завантажити профіль</p>
        <button
          type="button"
          className={css.retryButton}
          onClick={async () => {
            const result = await refetch();
            if (result.isError) {
              toast.error('Повторне завантаження не вдалося');
            }
          }}
        >
          Спробувати знову
        </button>
      </div>
    );
  }

  return (
    <div className={css.wrapper}>
      <ProfileAvatar profile={profile} />
      <ProfileEditForm profile={profile} />
    </div>
  );
}
