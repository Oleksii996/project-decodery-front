'use client';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import DiaryList from '../DiaryList/DiaryList';
import { getAllDiaries } from '../../api';

export default function DiaryPage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['diaries'],
    queryFn: () => getAllDiaries(),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
    retry: false,
  });
  const diaries = data?.diaries ?? [];
  return (
    <section>
      {/* <GreetingBlock/> */}
     
        <DiaryList diaries={diaries}></DiaryList>
 
    </section>
  );
}
