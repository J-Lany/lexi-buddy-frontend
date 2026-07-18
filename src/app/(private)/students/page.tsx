import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import type { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = { title: 'Students' };

import StudentsPageClient from '@/app/(private)/students/students-page-client';
import { getMyStudents } from '@/entities/students/api/get-my-students';
import { studentsKeys } from '@/shared/query';

export default async function StudentsPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: studentsKeys.myList(),
    queryFn: getMyStudents,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={null}>
        <StudentsPageClient />
      </Suspense>
    </HydrationBoundary>
  );
}
