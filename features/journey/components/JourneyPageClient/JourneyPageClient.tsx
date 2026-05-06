'use client';

import { keepPreviousData, useQuery } from '@tanstack/react-query';

import WeekSelector from '@/features/journey/components/WeekSelector/WeekSelector';
import GreetingBlock from '@/components/shared/GreetingBlock/GreetingBlock';
import JourneyDetails from '@/features/journey/components/JourneyDetails/JourneyDetails';
import { getJourneyWeek } from '@/features/journey/api';
import TasksReminderCard from '@/features/tasks/components/TasksReminderCard/TasksReminderCard';
import FeelingCheckCard from '@/features/dashboard/components/FeelingCheckCard/FeelingCheckCard';

type Props = {
  currentWeek: number;
};

export default function JourneyPageClient({ currentWeek }: Props) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['journey-week', currentWeek],
    queryFn: () => getJourneyWeek(currentWeek),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });
  if (isLoading) return null;
  if (isError || !data) return null;

  return (
    <main className="dashboard">
      <div className="container">
        <GreetingBlock />
        <WeekSelector currentWeek={currentWeek} userWeek={data.userWeek} />
        <JourneyDetails data={data} />
        <TasksReminderCard isAuth={true} />
        <FeelingCheckCard isAuth={true} />
      </div>
    </main>
  );
}
