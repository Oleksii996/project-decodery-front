import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';

import JourneyPageClient from '@/features/journey/components/JourneyPageClient/JourneyPageClient';
import { getJourneyWeek } from '@/features/journey/api';

type Props = {
  params: Promise<{
    weekNumber: string;
  }>;
};

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
