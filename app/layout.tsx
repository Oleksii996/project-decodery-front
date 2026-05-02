import type { Metadata } from 'next';
import { Lato, Comfortaa } from 'next/font/google';
import './globals.css';
import { QueryProvider } from '@/components/providers/QueryProvider';
import { Toaster } from 'react-hot-toast';

import Header from '@/components/layout/Header/Header';
import Breadcrumbs from '@/components/layout/Breadcrumbs/Breadcrumbs';
import { ModalProvider } from "@/components/providers/ModalProvider";

const lato = Lato({
  weight: ['400', '700', '900'],
  style: 'normal',
  variable: '--font-lato',
  subsets: ['latin', 'latin-ext'],
});

const comfortaa = Comfortaa({
  weight: ['600', '700'],
  style: 'normal',
  variable: '--font-comfortaa',
  subsets: ['latin'],
});

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk">
      <body className={`${lato.variable} ${comfortaa.variable}`}>
        <QueryProvider>
          <ModalProvider>
          <Toaster position="top-right" />
          <Header />
          <Breadcrumbs />
          {children}
          </ModalProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
