import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import type { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = { title: 'Lessons' };

import LessonsPageClient from '@/app/(private)/lessons/lessons-page-client';
import { getMyLessons } from '@/entities/lessons/api/get-my-lessons';
import { lessonsKeys } from '@/shared/query';

export default async function LessonsPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: lessonsKeys.myList(),
    queryFn: getMyLessons,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={null}>
        <LessonsPageClient />
      </Suspense>
    </HydrationBoundary>
  );
}
