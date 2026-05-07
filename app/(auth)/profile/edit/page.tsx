import OnboardingPage from '@/features/onboarding/components/OnboardingPage/OnboardingPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Онбординг | Лелека',
  description: 'Початкове налаштування профілю в додатку Лелека.',
  openGraph: {
    title: 'Онбординг | Лелека',
    description: 'Початкове налаштування профілю в додатку Лелека.',
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
    title: 'Онбординг | Лелека',
    description: 'Початкове налаштування профілю в додатку Лелека.',
    images: [
      'https://res.cloudinary.com/djhsypsct/image/upload/v1778163291/%D0%9B%D0%B5%D0%BB%D0%B5%D0%BA%D0%B0_%D0%B2_%D0%B3%D0%BD%D1%96%D0%B7%D0%B4%D1%96_yuktei.jpg',
    ],
  },
};

export default function Onboarding() {
  return <OnboardingPage />;
}
