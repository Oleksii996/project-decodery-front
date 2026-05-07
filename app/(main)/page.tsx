import {
  getWeeksDashboard,
  getWeeksDashboardNA,
} from '@/features/dashboard/api';
import DashBoardPage from '@/features/dashboard/components/DashBoardPage/DashBoardPage';
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query';
import { Metadata } from 'next';

interface HomePageProps {
  params: Promise<{ isAuth: boolean }>;
}
export const metadata: Metadata = {
  title: 'Мій день | Головна сторінка додатку Лелека',
  description: 'Головна сторінка з порадами, задачами та інформацією на день.',
  openGraph: {
    title: 'Мій день | Головна сторінка додатку Лелека',
    description:
      'Головна сторінка з порадами, задачами та інформацією на день.',
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
    title: 'Мій день | Головна сторінка додатку Лелека',
    description:
      'Головна сторінка з порадами, задачами та інформацією на день.',
    images: [
      'https://res.cloudinary.com/djhsypsct/image/upload/v1778163291/%D0%9B%D0%B5%D0%BB%D0%B5%D0%BA%D0%B0_%D0%B2_%D0%B3%D0%BD%D1%96%D0%B7%D0%B4%D1%96_yuktei.jpg',
    ],
  },
};
export default async function Home({ params }: HomePageProps) {
  const { isAuth } = await params;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['weeks-dashboard', isAuth],
    queryFn: isAuth ? getWeeksDashboard : getWeeksDashboardNA,
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DashBoardPage />;
    </HydrationBoundary>
  );
}
