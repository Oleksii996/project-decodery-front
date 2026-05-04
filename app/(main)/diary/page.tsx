import { getAllDiaries } from '@/features/diary/api';
import DiaryPageClient from '@/features/diary/components/DiaryPage/DiaryPageClient';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

export default async function Diary() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['diaries'],
    queryFn: getAllDiaries,
  }
  )
  return <HydrationBoundary state={dehydrate(queryClient)}><DiaryPageClient /></HydrationBoundary>
  ;
}
