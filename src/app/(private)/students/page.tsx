import { Suspense } from 'react';

import StudentsPageClient from '@/app/(private)/students/students-page-client';

export default function StudentsPage() {
  return (
    <Suspense fallback={null}>
      <StudentsPageClient />
    </Suspense>
  );
}
