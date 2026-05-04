'use client';

import { useMediaQuery } from '@uidotdev/usehooks';
import { useRouter } from 'next/navigation';
import DiaryEntryDetails from '../DiaryEntryDetails/DiaryEntryDetails';
import { useEffect } from 'react';
import css from './DiaryEntryDetailsClient.module.css';

interface DiaryEntryDetailsClientProps {
  diaryId: string;
}

function DiaryEntryDetailsClient({ diaryId }: DiaryEntryDetailsClientProps) {
  const router = useRouter();
  const isDesktop = useMediaQuery('only screen and (min-width:1440px)');
  useEffect(() => {
    if (isDesktop) {
      router.replace('/diary');
    }
  }, [isDesktop, router]);

  if (isDesktop === undefined) return null;

  return (
    <div className={css.pageContainer}>
      <button
        type="button"
        className={css.goBackBtn}
        onClick={() => router.push('/diary')}
      >
        <svg width={24} height={24} className={css.icon}>
          <use href="/leleka-sprite.svg#icon-keyboard_arrow_up"></use>
        </svg>
      </button>
      <DiaryEntryDetails diaryId={diaryId} />
    </div>
  );
}

export default DiaryEntryDetailsClient;
