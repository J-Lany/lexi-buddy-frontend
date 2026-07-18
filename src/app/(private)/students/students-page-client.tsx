'use client';

import { useMyStudentsQuery } from '@/entities/students/model/queries/get-my-students';
import { InviteStudentModal, StudentsListWidget } from '@/features/students';
import { useMergedQuery } from '@/shared/hooks/use-merged-query';
import { useI18n } from '@/shared/i18n';
import { Input } from '@/shared/ui/input';

const queryKeys = {
  q: 'q',
} as const;

export default function StudentsPageClient() {
  const { t } = useI18n();
  const { getOr, navigateWith } = useMergedQuery();
  const query = getOr(queryKeys.q, '');

  const { data, isLoading, isError } = useMyStudentsQuery();
  const studentsEmpty = !isLoading && !isError && (data?.length ?? 0) === 0 && !query;

  return (
    <main>
      <section className="max-w-5xl flex flex-col gap-6">
        <div className="ui-panel ui-radius-card p-4 sm:p-5">
          <div className="flex flex-wrap items-stretch sm:items-center gap-3 min-w-0">
            <Input
              value={query}
              onChange={(e) => navigateWith({ [queryKeys.q]: e.target.value })}
              placeholder={t('students.page.searchStudents')}
              className="w-full sm:flex-1 sm:min-w-[260px] sm:w-auto"
            />
            {!studentsEmpty && (
              <div className="w-full sm:w-auto shrink-0">
                <InviteStudentModal />
              </div>
            )}
          </div>
        </div>

        <StudentsListWidget query={query} />
      </section>
    </main>
  );
}
