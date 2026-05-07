import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';

import JourneyPageClient from '@/features/journey/components/JourneyPageClient/JourneyPageClient';
import { getJourneyWeek } from '@/features/journey/api';
import { Metadata } from 'next';

type Props = {
  params: Promise<{
    weekNumber: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { weekNumber } = await params;

  return {
    title: `Тиждень ${weekNumber} | Лелека`,
    description: `Інформація та поради для ${weekNumber} тижня вагітності.`,
    openGraph: {
      title: `Тиждень ${weekNumber} | Лелека`,
      description: `Інформація та поради для ${weekNumber} тижня вагітності.`,
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
      title: `Тиждень ${weekNumber} | Лелека`,
      description: `Інформація та поради для ${weekNumber} тижня вагітності.`,
      images: [
        'https://res.cloudinary.com/djhsypsct/image/upload/v1778163291/%D0%9B%D0%B5%D0%BB%D0%B5%D0%BA%D0%B0_%D0%B2_%D0%B3%D0%BD%D1%96%D0%B7%D0%B4%D1%96_yuktei.jpg',
      ],
    },
  };
}

export default async function JourneyPage({ params }: Props) {
  const { weekNumber } = await params;
  const currentWeek = Number(weekNumber);

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['journey-week', currentWeek],
    queryFn: () => getJourneyWeek(currentWeek),
  });

  return (
    <HydrationBoundary key={currentWeek} state={dehydrate(queryClient)}>
      <JourneyPageClient currentWeek={currentWeek} />
    </HydrationBoundary>
  );
}
