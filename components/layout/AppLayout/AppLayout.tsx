import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import Header from '../Header/Header';
import SideBar from '../SideBar/SideBar';
import css from './AppLayout.module.css';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container">
      {' '}
      <div className={css.appLayout}>
        <SideBar />
        <main className={css.mainContent}>
          <Header />
          <Breadcrumbs />
          {children}
        </main>
      </div>
    </div>
  );
}
