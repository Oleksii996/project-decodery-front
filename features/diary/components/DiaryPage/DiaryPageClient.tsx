'use client';

import dynamic from 'next/dynamic';

const DiaryPageClient = dynamic(() => import('./DiaryPage'), {
  ssr: false,
});

export default DiaryPageClient;
