import { Suspense } from 'react';

import LessonsPageClient from '@/app/(private)/lessons/lessons-page-client';

export default function LessonsPage() {
  return (
    <Suspense fallback={null}>
      <LessonsPageClient />
    </Suspense>
  );
}
