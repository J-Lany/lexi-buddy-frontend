'use client';

import { useMyLessonsQuery } from '@/entities/lessons/model/query/get-my-lessons';
import { CreateLessonModal } from '@/features/lessons/modals/create-lesson-modal/create-lesson-modal';
import { LessonsListWidget } from '@/features/lessons/widgets/lessons-list/lessons-list-widget';
import { useClearStaleQuery } from '@/shared/hooks/use-clear-stale-query';
import { useMergedQuery } from '@/shared/hooks/use-merged-query';
import { useI18n } from '@/shared/i18n';
import { Input } from '@/shared/ui/input';

const queryKeys = {
  q: 'q',
} as const;

export default function LessonsPageClient() {
  const { t } = useI18n();
  const { getOr, navigateWith } = useMergedQuery();
  const query = getOr(queryKeys.q, '');

  const { data, isPending, isError } = useMyLessonsQuery();
  const lessonsCount = data?.length ?? 0;
  const lessonsEmpty = !isPending && !isError && lessonsCount === 0;

  useClearStaleQuery({
    queryKey: queryKeys.q,
    query,
    sourceCount: lessonsCount,
    isLoading: isPending,
    isError,
    navigateWith,
  });

  return (
    <main>
      <section className="max-w-5xl flex flex-col gap-6">
        <div className="ui-panel ui-radius-card p-4 sm:p-5" data-testid="entity-list-toolbar">
          <div className="flex flex-wrap items-stretch sm:items-center gap-3 min-w-0">
            <Input
              value={query}
              onChange={(e) => navigateWith({ [queryKeys.q]: e.target.value })}
              placeholder={t('lessons.page.search')}
              className="w-full sm:flex-1 sm:min-w-[260px] sm:w-auto"
            />
            {!lessonsEmpty && (
              <div className="w-full sm:w-auto shrink-0">
                <CreateLessonModal />
              </div>
            )}
          </div>
        </div>

        <LessonsListWidget query={query} />
      </section>
    </main>
  );
}
