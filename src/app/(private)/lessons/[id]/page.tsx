import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { Suspense } from 'react';

import { getLessonDashboard } from '@/entities/lessons/api/get-lesson-dashboard';
import { LessonDetailsWidget } from '@/features/lessons/widgets/lesson-details/lesson-details-widget';
import { lessonsKeys } from '@/shared/query';

export default async function LessonPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const lessonId = Number(id);

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: lessonsKeys.dashboard(lessonId),
    queryFn: () => getLessonDashboard(lessonId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={null}>
        <LessonDetailsWidget lessonId={lessonId} />
      </Suspense>
    </HydrationBoundary>
  );
}
