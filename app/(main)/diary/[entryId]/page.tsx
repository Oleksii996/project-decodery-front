import { getDiaryById } from '@/features/diary/api';
import DiaryEntryDetails from '@/features/diary/components/DiaryEntryDetails/DiaryEntryDetails';

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
interface DiaryEntryDetailsProps {
  params: Promise<{ id: string }>;
}
export async function DiaryEntryDetail({ params }: DiaryEntryDetailsProps) {
  const { id } = await params;
  const queryClient = new QueryClient();
  queryClient.prefetchQuery({
    queryKey: ['diary'],
    queryFn: () => getDiaryById(id),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DiaryEntryDetails />
    </HydrationBoundary>
  );
}
