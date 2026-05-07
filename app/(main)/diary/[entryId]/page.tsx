import { getDiaryById } from '@/features/diary/api';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import DiaryEntryDetailsClient from '@/features/diary/components/DiaryEntryDetailsClient/DiaryEntryDetailsClient';
import { Metadata } from 'next';
interface DiaryEntryDetailsPageProps {
  params: Promise<{ entryId: string }>;
}
export const metadata: Metadata = {
  title: 'Запис щоденника | Лелека',
  description: 'Деталі запису щоденника.',
  openGraph: {
    title: 'Запис щоденника | Лелека',
    description: 'Деталі запису щоденника.',
    images: [
      {
        url: 'https://res.cloudinary.com/djhsypsct/image/upload/v1778163291/%D0%9B%D0%B5%D0%BB%D0%B5%D0%BA%D0%B0_%D0%B2_%D0%B3%D0%BD%D1%96%D0%B7%D0%B4%D1%96_yuktei.jpg',
        width: 1200,
        height: 630,
        alt: 'Логотип додатку Лелека',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Запис щоденника | Лелека',
    description: 'Деталі запису щоденника.',
    images: [
      'https://res.cloudinary.com/djhsypsct/image/upload/v1778163291/%D0%9B%D0%B5%D0%BB%D0%B5%D0%BA%D0%B0_%D0%B2_%D0%B3%D0%BD%D1%96%D0%B7%D0%B4%D1%96_yuktei.jpg',
    ],
  },
};
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
