import AppLayout from '@/components/layout/AppLayout/AppLayout';
import type { Metadata } from 'next';

import Header from '@/components/layout/Header/Header';
import Breadcrumbs from '@/components/layout/Breadcrumbs/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Лелека',
  description:
    'Додаток для майбутніх матусь, зручний інтерфейс для створення задач, ведення щоденника  та отримання корисних порад на кожен день',
  openGraph: {
    type: 'website',
    url: '',
    title: 'Лелека',
    description:
      'Додаток для майбутніх матусь, зручний інтерфейс для створення задач, ведення щоденника  та отримання корисних порад на кожен день',
    images: [
      {
        url: '',
        width: 600,
        height: 300,
        alt: 'Логотип додатку Лелека',
      },
    ],
  },
};
export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppLayout>
      <Header />
      <Breadcrumbs />
      {children}
    </AppLayout>
  );
}
