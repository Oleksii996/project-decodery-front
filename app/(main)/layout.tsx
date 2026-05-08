import AppLayout from '@/components/layout/AppLayout/AppLayout';


export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppLayout>{children}</AppLayout>;
}
