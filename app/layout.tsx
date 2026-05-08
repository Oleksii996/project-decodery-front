import type { Metadata } from 'next';
import { Lato, Comfortaa } from 'next/font/google';
import './globals.css';
import { QueryProvider } from '@/components/providers/QueryProvider';
import { Toaster } from 'react-hot-toast';

import { ModalProvider } from '@/components/providers/ModalProvider';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { AuthProvider } from '@/components/providers/AuthProvider';

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

  icons: {
    icon: '/leleka-meta-logo.svg',
  },

  openGraph: {
    type: 'website',
    url: '',
    title: 'Лелека',
    description:
      'Додаток для майбутніх матусь, зручний інтерфейс для створення задач, ведення щоденника  та отримання корисних порад на кожен день',
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
    title: 'Лелека',
    description:
      'Додаток для майбутніх матусь, зручний інтерфейс для створення задач, ведення щоденника  та отримання корисних порад на кожен день',
    images: [
      'https://res.cloudinary.com/djhsypsct/image/upload/v1778163291/%D0%9B%D0%B5%D0%BB%D0%B5%D0%BA%D0%B0_%D0%B2_%D0%B3%D0%BD%D1%96%D0%B7%D0%B4%D1%96_yuktei.jpg',
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uk">
      <body className={`${lato.variable} ${comfortaa.variable}`}>
        <QueryProvider>
          <ModalProvider>
            <ThemeProvider>
              <AuthProvider>
                <Toaster position="top-left" />
                {children}
              </AuthProvider>
            </ThemeProvider>
          </ModalProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
