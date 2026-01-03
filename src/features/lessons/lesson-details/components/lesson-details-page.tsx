'use client';

import LessonHeaderCard from '@/features/lessons/lesson-details/components/lesson-header/lesson-header-card';
import LessonVocabCard from '@/features/lessons/lesson-details/components/lesson-vocab/lesson-vocab-card';
import LessonAssignmentsCard from '@/features/lessons/lesson-details/components/lesson-assignments/lesson-assignments-card';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useGetLessonDetails } from '@/features/lessons/create-lesson-modal/hooks/use-get-lesson-details';
import { LessonAssigneesCard } from '@/features/lessons/lesson-details/components/lesson-assignees/lesson-assigned-card';
import { NavBack } from '@/components/ui/nav-back';
import { EAppRoutes } from '@/lib/routes';

export default function LessonDetailsPage({ lessonId }: { lessonId: string }) {
  const { data, isLoading, isError } = useGetLessonDetails(lessonId);

  if (isLoading) {
    return (
      <div className="flex w-full max-w-5xl flex-col gap-6 pb-17">
        <Skeleton className="h-40 rounded-3xl" />
        <Skeleton className="h-44 rounded-3xl" />
        <Skeleton className="h-56 rounded-3xl" />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="w-full max-w-5xl pb-17">
        <div className="-mt-1">
          <NavBack href={EAppRoutes.LESSONS} label="Lessons" />
        </div>
        <Card className="rounded-3xl p-6 text-sm text-red-600">Failed to load lesson</Card>
      </div>
    );
  }

  return (
    <div className="flex w-full max-w-5xl flex-col gap-6 pb-17">
      <div className="-mt-1">
        <NavBack href={EAppRoutes.LESSONS} label="Lessons" />
      </div>
      <LessonHeaderCard lesson={data} />
      <LessonAssigneesCard lesson={data} />
      <LessonVocabCard vocab={data.vocab} />
      <LessonAssignmentsCard assignments={data.assignments} />
    </div>
  );
}
