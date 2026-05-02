import { getDiaryById } from '@/features/diary/api';
import DiaryEntryDetails from '@/features/diary/components/DiaryEntryDetails/DiaryEntryDetails';

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
interface DiaryEntryDetailProps  {
  params: Promise<{ entryId: string }>;
};
export default async function DiaryEntryDetail({params}: DiaryEntryDetailProps) {
  const {entryId} = await params;
  const queryClient = new QueryClient();
 await queryClient.prefetchQuery({
    queryKey: ['diary', entryId],
    queryFn: () => getDiaryById(entryId),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DiaryEntryDetails diaryId={entryId} />
    </HydrationBoundary>
  );
}
