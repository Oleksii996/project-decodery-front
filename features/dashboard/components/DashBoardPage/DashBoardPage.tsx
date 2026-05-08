'use client';

import { useQuery } from '@tanstack/react-query';

import {
  getWeeksDashboard,
  getBabyWeekData,
  getWeeksDashboardNA,
} from '../../api';

import Loader from '@/components/common/Loader/Loader';
import DashBoardContent from './DashBoardContent';
import { useAuthStore } from '@/store/authStore';
import type { BabyCardData } from '../../types';

export default function DashBoardPage() {
  const isAuth = useAuthStore(state => state.isAuth);
  const isAuthReady = useAuthStore(state => state.isAuthReady);

  const {
    data: dashboardData,
    isLoading: isDashboardLoading,
    isError: isDashboardError,
  } = useQuery({
    queryKey: ['weeks-dashboard', isAuth],
    queryFn: isAuth ? getWeeksDashboard : getWeeksDashboardNA,
    enabled: isAuthReady,
    retry: false,
    refetchOnMount: false,
  });

  const {
    data: babyData,
    isLoading: isBabyLoading,
    isError: isBabyError,
  } = useQuery({
    queryKey: ['baby-week'],
    queryFn: getBabyWeekData,
    enabled: isAuthReady && isAuth,
    retry: false,
    refetchOnMount: false,
  });

  const isLoading = isDashboardLoading || (isAuth && isBabyLoading);

  if (isLoading) return <Loader />;

  if (
    isDashboardError ||
    (isAuth && isBabyError) ||
    !dashboardData ||
    (isAuth && !babyData)
  ) {
    return null;
  }

  const babyForCard: BabyCardData = isAuth
    ? {
        image: babyData!.image,
        babySize: babyData!.babySize,
        babyWeight: babyData!.babyWeight,
        babyActivity: babyData!.babyActivity,
        babyDevelopment: babyData!.babyDevelopment,
      }
    : {
        image: dashboardData.baby.image,
        babySize: dashboardData.baby.babySize,
        babyWeight: dashboardData.baby.babyWeight,
        babyActivity: dashboardData.baby.interestingFact,
        babyDevelopment: dashboardData.baby.interestingFact,
      };

  return (
    <DashBoardContent
      isAuth={isAuth}
      dashboardData={dashboardData}
      babyData={babyForCard}
    />
  );
}
