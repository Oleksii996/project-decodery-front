'use client';
import { useQuery } from '@tanstack/react-query';
import BabyTodayCard from '../BabyTodayCard/BabyTodayCard';
import MomTipCard from '../MomTipCard/MomTipCard';
import StatusBlock from '../StatusBlock/StatusBlock';
import FeelingCheckCard from '../FeelingCheckCard/FeelingCheckCard';
import { getWeeksDashboard, getBabyWeekData } from '../../api';
import css from './DashBoardPage.module.css';

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

  // 🔄 loading
  if (isDashboardLoading || isBabyLoading) {
    return <p>Завантаження...</p>;
  }

  // ❌ error
  if (isDashboardError || isBabyError || !dashboardData || !babyData) {
    return <p>Помилка при завантаженні</p>;
  }

  return (
    <main className={css.dashboard}>
      <div className="container">
        <div className={css.content}>
          <div className={css.leftColumn}>
            <StatusBlock />

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
      </div>
    </main>
  );
}
