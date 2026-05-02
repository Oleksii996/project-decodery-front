'use client';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import DiaryList from '../DiaryList/DiaryList';
import { getAllDiaries } from '../../api';

export default function DiaryPage() {
  const { data: diaries = [], isLoading, isError } = useQuery({
    queryKey: ['diaries'],
    queryFn:  getAllDiaries,
    placeholderData: keepPreviousData,
    refetchOnMount: false,
    retry: false,
  });

  return (
      <div className='container'>
    <section>
    
      {/* <GreetingBlock/> */}
     
        <DiaryList diaries={diaries}></DiaryList>

    </section>
     </div>
  );
}
