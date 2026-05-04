import { getDiaryById } from '@/features/diary/api';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import DiaryEntryDetailsClient from '@/features/diary/components/DiaryEntryDetailsClient/DiaryEntryDetailsClient';
interface DiaryEntryDetailsPageProps {
  params: Promise<{ entryId: string }>;
}
export default async function DiaryEntryDetailsPage({
  params,
}: DiaryEntryDetailsPageProps) {
  const { entryId } = await params;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['diary', entryId],
    queryFn: () => getDiaryById(entryId),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
        <DiaryEntryDetailsClient diaryId={entryId} />
    </HydrationBoundary>
  );
}
