import { Suspense } from 'react';
import StudentsPageClient from '@/features/students/students-page-client';

export default function StudentsPage() {
  return (
    <Suspense fallback={null}>
      <StudentsPageClient />
    </Suspense>
  );
}
