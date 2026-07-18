'use client';

import { useRouter } from 'next/navigation';

import { useLessonDashboardQuery } from '@/entities/lessons/model/query/get-lesson-dashboard';
import { DeleteLessonButton } from '@/features/lessons/widgets/lesson-details/ui/delete-lesson-button';
import { LessonAdditionalInfo } from '@/features/lessons/widgets/lesson-details/ui/lesson-additional-info';
import { LessonAssignees } from '@/features/lessons/widgets/lesson-details/ui/lesson-assignees/lesson-assignees';
import { LessonAssignments } from '@/features/lessons/widgets/lesson-details/ui/lesson-assignments/lesson-assignments';
import { LessonSummary } from '@/features/lessons/widgets/lesson-details/ui/lesson-summary/lesson-summary';
import { LessonVocab } from '@/features/lessons/widgets/lesson-details/ui/lesson-vocab/lesson-vocab';
import { routes } from '@/shared/router/routes';
import { DetailsErrorCard } from '@/shared/ui/details/details-error-card';
import DetailsLayoutSkeleton from '@/shared/ui/details/details-layout-skeleton';
import { NavBack } from '@/shared/ui/nav-back';

type Props = {
  lessonId: number;
};

export function LessonDetailsWidget({ lessonId }: Props) {
  const { data, isLoading, isError } = useLessonDashboardQuery(lessonId);
  const router = useRouter();

  if (isLoading) {
    return <DetailsLayoutSkeleton />;
  }

  if (isError || !data) {
    return (
      <div className="w-full max-w-5xl pb-17">
        <DetailsErrorCard
          backHref={routes.lessons}
          backLabel="Lessons"
          title="Failed to load lesson"
        />
      </div>
    );
  }

  return (
    <div className="flex w-full max-w-5xl flex-col gap-6">
      <div className="-mt-1">
        <NavBack href={routes.lessons} label="Lessons" />
      </div>

      <LessonSummary
        lesson={data}
        actionSlot={
          <DeleteLessonButton lessonId={data.id} onDeleted={() => router.push(routes.lessons)} />
        }
      />
      <LessonAssignees lesson={data} />
      <LessonVocab vocab={data.vocab} />
      <LessonAdditionalInfo
        additionalInstructions={data.additionalInstructions}
        materialLinks={data.materialLinks}
      />
      <LessonAssignments assignments={data.assignments} />
    </div>
  );
}
