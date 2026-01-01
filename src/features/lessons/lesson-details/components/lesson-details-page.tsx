'use client';

import LessonHeaderCard from '@/features/lessons/lesson-details/components/lesson-header/lesson-header-card';
import LessonVocabCard from '@/features/lessons/lesson-details/components/lesson-vocab/lesson-vocab-card';
import LessonAssignmentsCard from '@/features/lessons/lesson-details/components/lesson-assignments/lesson-assignments-card';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useGetLessonDetails } from '@/features/lessons/create-lesson-modal/hooks/use-get-lesson-details';
import { LessonAssigneesCard } from '@/features/lessons/lesson-details/components/lesson-assignees/lesson-assigned-card';

export default function LessonDetailsPage({ lessonId }: { lessonId: string }) {
  const { data, isLoading, isError } = useGetLessonDetails(lessonId);
  console.log('data, isLoading, isError', data, isLoading, isError);
  if (isLoading) {
    return (
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 pb-17">
        <Skeleton className="h-40 rounded-3xl" />
        <Skeleton className="h-44 rounded-3xl" />
        <Skeleton className="h-56 rounded-3xl" />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="mx-auto w-full max-w-5xl pb-17">
        <Card className="rounded-3xl p-6 text-sm text-red-600">Failed to load lesson</Card>
      </div>
    );
  }

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 pb-17">
      <LessonHeaderCard lesson={data} />
      <LessonAssigneesCard lesson={data} />
      <LessonVocabCard vocab={data.vocab} />
      <LessonAssignmentsCard assignments={data.assignments} />
    </div>
  );
}
