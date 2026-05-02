import DashBoardPage from '@/features/dashboard/components/DashBoardPage/DashBoardPage';

import Header from '@/components/layout/Header/Header';
import Breadcrumbs from '@/components/layout/Breadcrumbs/Breadcrumbs';
import SideBar from '@/components/layout/SideBar/SideBar';

export default function Home() {
  return (
    <>
      <Header />
      <Breadcrumbs />
      <SideBar />
      <DashBoardPage />
    </>
  );
}
