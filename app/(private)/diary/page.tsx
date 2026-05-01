import { getAllDiaries } from '@/features/diary/api';
import DiaryPage from '@/features/diary/components/DiaryPage/DiaryPage';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

export default async function Diary() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['diaries'],
    queryFn:() => getAllDiaries(),
  }
  )
  return <HydrationBoundary state={dehydrate(queryClient)}><DiaryPage /></HydrationBoundary>
  ;
}
