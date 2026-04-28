'use client';

import { CreateLessonModal } from '@/features/lessons/modals/create-lesson-modal/create-lesson-modal';
import { LessonsListWidget } from '@/features/lessons/widgets/lessons-list/lessons-list-widget';
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

  return (
    <main>
      <section className="max-w-5xl flex flex-col gap-6">
        <div className="ui-panel ui-radius-card p-4 sm:p-5">
          <div className="flex flex-wrap items-stretch sm:items-center gap-3 min-w-0">
            <Input
              value={query}
              onChange={(e) => navigateWith({ [queryKeys.q]: e.target.value })}
              placeholder={t('lessons.page.search')}
              className="w-full sm:flex-1 sm:min-w-[260px] sm:w-auto"
            />
            <div className="w-full sm:w-auto shrink-0">
              <CreateLessonModal />
            </div>
          </div>
        </div>

        <LessonsListWidget query={query} />
      </section>
    </main>
  );
}
