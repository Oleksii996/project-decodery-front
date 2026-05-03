import DashBoardPage from '@/features/dashboard/components/DashBoardPage/DashBoardPage';

<<<<<<< HEAD:app/page.tsx
import Header from '@/components/layout/Header/Header';
import Breadcrumbs from '@/components/layout/Breadcrumbs/Breadcrumbs';
import TasksReminderCard from "@/features/tasks/components/TasksReminderCard/TasksReminderCard";
=======
>>>>>>> ea33dcf83c9135e91d4ded36a1ec2398ce0533a5:app/(main)/page.tsx
export default function Home() {
  return (
    <>
      <DashBoardPage />
       <TasksReminderCard isAuth={true} />
    </>
  );
}
