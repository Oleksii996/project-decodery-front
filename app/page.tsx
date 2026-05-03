import DashBoardPage from '@/features/dashboard/components/DashBoardPage/DashBoardPage';

import Header from '@/components/layout/Header/Header';
import Breadcrumbs from '@/components/layout/Breadcrumbs/Breadcrumbs';
import TasksReminderCard from "@/features/tasks/components/TasksReminderCard/TasksReminderCard";
export default function Home() {
  return (
    <>
      <Header />
      <Breadcrumbs />
      <DashBoardPage />
       <TasksReminderCard isAuth={true} />
    </>
  );
}
