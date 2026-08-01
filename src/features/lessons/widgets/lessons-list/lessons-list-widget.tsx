'use client';

import { BookOpen } from 'lucide-react';
import { useMemo } from 'react';

import { useMyLessonsQuery } from '@/entities/lessons/model/query/get-my-lessons';
import { CreateLessonModal } from '@/features/lessons/modals/create-lesson-modal/create-lesson-modal';
import { filterLessonsByQuery } from '@/features/lessons/widgets/lessons-list/lib/filter-lessons';
import { LessonList } from '@/features/lessons/widgets/lessons-list/ui/lesson-list';
import { LessonsListSkeleton } from '@/features/lessons/widgets/lessons-list/ui/lessons-list-skeleton';
import { useI18n } from '@/shared/i18n';
import { getListViewState } from '@/shared/lib/list-view-state';
import { EmptyStateCard } from '@/shared/ui/empty-state-card';
import { emptyStatePrimaryActionClassName, EmptyStateV2 } from '@/shared/ui/empty-state-v2';

type Props = {
  query: string;
};

export function LessonsListWidget({ query }: Props) {
  const { t } = useI18n();
  const { data, isPending, isError } = useMyLessonsQuery();

  const filtered = useMemo(() => {
    return filterLessonsByQuery(data ?? [], query);
  }, [data, query]);

  const lessonsCount = data?.length ?? 0;

  const view = getListViewState({
    isPending,
    isError,
    totalCount: lessonsCount,
    filteredCount: filtered.length,
  });

  return (
    <section className="flex flex-col gap-4">
      {view === 'loading' && <LessonsListSkeleton />}

      {view === 'list' && <LessonList lessons={filtered} />}

      {view === 'error' && (
        <EmptyStateCard
          surface="canvas"
          icon={<BookOpen className="h-5 w-5 sm:h-6 sm:w-6 text-destructive" aria-hidden />}
          title={t('lessons.list.error')}
          description={t('lessons.list.errorDesc')}
        />
      )}

      {view === 'empty' && (
        <EmptyStateV2
          icon={<BookOpen strokeWidth={1.4} />}
          title={t('lessons.list.empty')}
          description={t('lessons.list.emptyDesc')}
          steps={[
            {
              id: 'details',
              title: t('lessons.list.emptyStep1Title'),
              desc: t('lessons.list.emptyStep1Desc'),
            },
            {
              id: 'vocabulary',
              title: t('lessons.list.emptyStep2Title'),
              desc: t('lessons.list.emptyStep2Desc'),
            },
            {
              id: 'assign',
              title: t('lessons.list.emptyStep3Title'),
              desc: t('lessons.list.emptyStep3Desc'),
            },
          ]}
          primaryAction={
            <CreateLessonModal
              triggerProps={{
                variant: 'default',
                size: 'lg',
                className: emptyStatePrimaryActionClassName,
              }}
            />
          }
          pinTopLeft="A1–C2"
          pinBottomRight="ИИ"
        />
      )}

      {view === 'no-results' && (
        <EmptyStateCard
          surface="canvas"
          title={t('lessons.list.noResults')}
          description={t('lessons.list.noResultsDesc')}
        />
      )}
    </section>
  );
}
