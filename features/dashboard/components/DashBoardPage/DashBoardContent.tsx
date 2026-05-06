'use client';

import GreetingBlock from '@/components/shared/GreetingBlock/GreetingBlock';
import BabyTodayCard from '../BabyTodayCard/BabyTodayCard';
import MomTipCard from '../MomTipCard/MomTipCard';
import StatusBlock from '../StatusBlock/StatusBlock';
import FeelingCheckCard from '../FeelingCheckCard/FeelingCheckCard';
import TasksReminderCard from '@/features/tasks/components/TasksReminderCard/TasksReminderCard';

import css from './DashBoardPage.module.css';
import type { BabyCardData, WeeksDashboardData } from '../../types';

interface DashBoardContentProps {
  isAuth: boolean;
  dashboardData: WeeksDashboardData;
  babyData: BabyCardData;
}

export default function DashBoardContent({
  isAuth,
  dashboardData,
  babyData,
}: DashBoardContentProps) {
  return (
    <main>
      <div className={css.dashboard}>
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
            <TasksReminderCard isAuth={isAuth} />
            <FeelingCheckCard isAuth={isAuth} />
          </div>
        </div>
      </div>
    </main>
  );
}
