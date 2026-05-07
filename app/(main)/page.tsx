import { getWeeksDashboard, getWeeksDashboardNA } from '@/features/dashboard/api';
import DashBoardPage from '@/features/dashboard/components/DashBoardPage/DashBoardPage';
import { QueryClient, HydrationBoundary, dehydrate } from '@tanstack/react-query';

interface HomePageProps {
  params: Promise<{ isAuth: boolean }>;
}
export default async function Home({params}: HomePageProps) {
  const {isAuth} = await params;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['weeks-dashboard', isAuth],
        queryFn: isAuth ? getWeeksDashboard : getWeeksDashboardNA,
  })
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DashBoardPage />;
    </HydrationBoundary>
  )
  
}
