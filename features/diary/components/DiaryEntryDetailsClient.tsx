'use client';

import { useMediaQuery } from '@uidotdev/usehooks';
import { useRouter } from 'next/navigation';
import DiaryEntryDetails from './DiaryEntryDetails/DiaryEntryDetails';
interface DiaryEntryDetailsClientProps {
  diaryId: string;
}
function DiaryEntryDetailsClient({ diaryId }: DiaryEntryDetailsClientProps) {
  const router = useRouter();
  const isDesktop = useMediaQuery('only screen and (min-width:1440px)');
  if (isDesktop) {
    router.push('/diary');
    return;
  }
  return <DiaryEntryDetails diaryId={diaryId} />;
}

export default DiaryEntryDetailsClient;
