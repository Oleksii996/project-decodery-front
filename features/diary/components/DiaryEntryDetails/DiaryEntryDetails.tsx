'use client';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import css from './DiaryEntryDetails.module.css'
import { getDiaryById } from '../../api';
import { useParams } from 'next/navigation';

export default function DiaryEntryDetails() {
  const {entryId} = useParams< {entryId: string}>();
  const { data: diary = {}, isLoading, isError } = useQuery({
    queryKey: ['diary'],
    queryFn: () => getDiaryById(entryId),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
    retry: false,
  });

  return <div className={css.pageContainer}>


  </div>;
}
