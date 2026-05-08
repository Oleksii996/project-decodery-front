'use client';

import { useState } from 'react';
import Tabs from '../Tabs/Tabs';
import BabyCard from '../BabyCard/BabyCard';
import MomCard from '../MomCard/MomCard';
import styles from './JourneyDetails.module.css';
import { JourneyWeek } from '../../types';
import TasksReminderCard from '@/features/tasks/components/TasksReminderCard/TasksReminderCard';

interface JourneyDeyailsProps {
  data: JourneyWeek;
}

export default function JourneyDetails({ data }: JourneyDeyailsProps) {
  const [tab, setTab] = useState<'baby' | 'mom'>('baby');

  if (!data) return null;

  return (
    <div className={styles.container}>
      <Tabs tab={tab} setTab={setTab} />

      <div className={styles.content}>
        {tab === 'baby' && <BabyCard data={data.baby} />}

        {tab === 'mom' && (
          <div className={styles.grid}>
            <MomCard data={data.mom} />
            <TasksReminderCard isAuth={true} className={styles.smallCard} />
          </div>
        )}
      </div>
    </div>
  );
}
