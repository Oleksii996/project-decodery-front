import ProfilePage from '@/features/profile/components/ProfilePage/ProfilePage';
import { getCurrentProfile } from '@/features/profile/api';
import { profileQueryKey } from '@/features/profile/hooks';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

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
