'use client';

import { keepPreviousData, useQuery } from '@tanstack/react-query';
import DiaryList from '../DiaryList/DiaryList';
import { getAllDiaries } from '../../api';
import DiaryEntryDetails from '../DiaryEntryDetails/DiaryEntryDetails';
import css from './DiaryPage.module.css';
import { useMediaQuery } from '@uidotdev/usehooks';
import { useState } from 'react';

export default function DiaryPage() {
  const isDesktop = useMediaQuery('min-width: 1440px');
  const [userSelectedDiaryId, seUserSelectedDiaryId] = useState<string | null>(
    null
  );
  const {
    data: diaries = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['diaries'],
    queryFn: getAllDiaries,
    placeholderData: keepPreviousData,
    refetchOnMount: false,
    retry: false,
  });

  const selectedDiaryId =
    userSelectedDiaryId ??
    (isDesktop && diaries.length > 0 ? diaries[0]._id : null);
  if (isDesktop === undefined) return null;
  if (isLoading) return null;
  if (isError) return null;
  return (
    <section>
      {/* <GreetingBlock/> */}
      <div className={css.pageContainer}>
        <DiaryList
          diaries={diaries}
          selectedDiaryId={selectedDiaryId}
          onSelectDiary={seUserSelectedDiaryId}
          isDesktop={isDesktop}
        ></DiaryList>
        {isDesktop && <DiaryEntryDetails diaryId={selectedDiaryId as string} />}
      </div>
    </section>
  );
}
