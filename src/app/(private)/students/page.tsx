import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { Suspense } from 'react';

import StudentsPageClient from '@/app/(private)/students/students-page-client';
import { getMyGroups } from '@/entities/groups/api/get-my-groups';
import { getMyStudents } from '@/entities/students/api/get-my-students';
import { studentsKeys } from '@/shared/query';
import { groupsKeys } from '@/shared/query';

export default async function StudentsPage() {
  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: studentsKeys.myList(),
      queryFn: getMyStudents,
    }),
    queryClient.prefetchQuery({
      queryKey: groupsKeys.myList(),
      queryFn: getMyGroups,
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={null}>
        <StudentsPageClient />
      </Suspense>
    </HydrationBoundary>
  );
}
