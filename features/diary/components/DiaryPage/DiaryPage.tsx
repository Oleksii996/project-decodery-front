'use client';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import DiaryList from '../DiaryList/DiaryList';
import { getAllDiaries } from '../../api';
import DiaryEntryDetails from '../DiaryEntryDetails/DiaryEntryDetails';
import css from './DiaryPage.module.css';

export default function DiaryPage() {
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

  return (
    <section>
      
        {/* <GreetingBlock/> */}
        <div className={css.pageContainer}>
          <DiaryList diaries={diaries}></DiaryList>
          <DiaryEntryDetails />
        </div>
     
    </section>
  );
}
