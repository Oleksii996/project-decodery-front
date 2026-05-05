'use client';
import { useQuery } from '@tanstack/react-query';
import GreetingBlock from '@/components/shared/GreetingBlock/GreetingBlock';
import BabyTodayCard from '../BabyTodayCard/BabyTodayCard';
import MomTipCard from '../MomTipCard/MomTipCard';
import StatusBlock from '../StatusBlock/StatusBlock';
import FeelingCheckCard from '../FeelingCheckCard/FeelingCheckCard';
import { getWeeksDashboard, getBabyWeekData } from '../../api';
import css from './DashBoardPage.module.css';
import Loader from '@/components/common/Loader/Loader';

export default function DashBoardPage() {
  const {
    data: dashboardData,
    isLoading: isDashboardLoading,
    isError: isDashboardError,
  } = useQuery({
    queryKey: ['weeks-dashboard'],
    queryFn: getWeeksDashboard,
  });

  const {
    data: babyData,
    isLoading: isBabyLoading,
    isError: isBabyError,
  } = useQuery({
    queryKey: ['baby-week'],
    queryFn: getBabyWeekData,
  });
  const isLoading = isDashboardLoading || isBabyLoading;
  const isError =
    isDashboardError || isBabyError || !dashboardData || !babyData;

  return (
    <main>
      <div className={css.dashboard}>
        {isLoading && <Loader />}

        {!isLoading && isError && <p>Помилка при завантаженні.</p>}

        {!isLoading && !isError && (
          <>
            <div className={css.greeting}>
              <GreetingBlock />
            </div>
            <div className={css.contentDB}>
              <div className={css.leftColumn}>
                <StatusBlock
                  week={dashboardData.weekNumber}
                  daysToMeet={dashboardData.daysUntilDueDate}
                />

                <BabyTodayCard
                  image={babyData.image}
                  babySize={babyData.babySize}
                  babyWeight={babyData.babyWeight}
                  babyActivity={babyData.babyActivity}
                  babyDevelopment={babyData.babyDevelopment}
                />
                <MomTipCard momTip={dashboardData.momTip} />
              </div>

              <div className={css.rightColumn}>
                <FeelingCheckCard />
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
