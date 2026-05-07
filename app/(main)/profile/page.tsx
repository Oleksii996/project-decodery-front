import ProfilePage from '@/features/profile/components/ProfilePage/ProfilePage';
import { getCurrentProfile } from '@/features/profile/api';
import { profileQueryKey } from '@/features/profile/hooks';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Профіль | Лелека',
  description: 'Ваш профіль та персональні налаштування у додатку Лелека.',
  openGraph: {
    title: 'Профіль | Лелека',
    description: 'Ваш профіль та персональні налаштування у додатку Лелека.',
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
    title: 'Профіль | Лелека',
    description: 'Ваш профіль та персональні налаштування у додатку Лелека.',
    images: [
      'https://res.cloudinary.com/djhsypsct/image/upload/v1778163291/%D0%9B%D0%B5%D0%BB%D0%B5%D0%BA%D0%B0_%D0%B2_%D0%B3%D0%BD%D1%96%D0%B7%D0%B4%D1%96_yuktei.jpg',
    ],
  },
};

export default async function Profile() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: profileQueryKey,
    queryFn: getCurrentProfile,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProfilePage />
    </HydrationBoundary>
  );
}
