'use client';

import { User } from 'lucide-react';
import { useMemo } from 'react';

import { useMyStudentsQuery } from '@/entities/students/model/queries/get-my-students';
import { InviteStudentModal } from '@/features/students';
import { filterStudentsByQuery } from '@/features/students/lib/filter-students';
import { StudentsTable } from '@/features/students/widgets/students-list/ui/students-table/students-table';
import { StudentsTableSkeleton } from '@/features/students/widgets/students-list/ui/students-table/students-table-skeleton';
import { useI18n } from '@/shared/i18n';
import { getListViewState } from '@/shared/lib/list-view-state';
import { EmptyStateCard } from '@/shared/ui/empty-state-card';
import { emptyStatePrimaryActionClassName, EmptyStateV2 } from '@/shared/ui/empty-state-v2';

export function StudentsListWidget({ query }: { query: string }) {
  const { t } = useI18n();
  const { data, isPending, isError } = useMyStudentsQuery();

  const filtered = useMemo(() => {
    return filterStudentsByQuery(data ?? [], query);
  }, [data, query]);

  const studentsCount = data?.length ?? 0;

  const view = getListViewState({
    isPending,
    isError,
    totalCount: studentsCount,
    filteredCount: filtered.length,
  });

  return (
    <section className="flex flex-col gap-4">
      {view === 'loading' && <StudentsTableSkeleton />}
      {view === 'list' && <StudentsTable students={filtered} />}
      {view === 'error' && (
        <EmptyStateCard
          surface="canvas"
          title={t('students.list.error')}
          description={t('students.list.errorDesc')}
        />
      )}
      {view === 'empty' && (
        <EmptyStateV2
          icon={<User strokeWidth={1.4} />}
          title={t('students.list.empty')}
          description={t('students.list.emptyDesc')}
          steps={[
            {
              id: 'find',
              title: t('students.list.emptyStep1Title'),
              desc: t('students.list.emptyStep1Desc'),
            },
            {
              id: 'invite',
              title: t('students.list.emptyStep2Title'),
              desc: t('students.list.emptyStep2Desc'),
            },
            {
              id: 'assign',
              title: t('students.list.emptyStep3Title'),
              desc: t('students.list.emptyStep3Desc'),
            },
          ]}
          primaryAction={
            <InviteStudentModal
              triggerProps={{
                variant: 'default',
                size: 'lg',
                className: emptyStatePrimaryActionClassName,
              }}
            />
          }
          pinTopLeft="@username"
          pinBottomRight="A1–C2"
        />
      )}
      {view === 'no-results' && (
        <EmptyStateCard
          surface="canvas"
          title={t('students.list.noResults')}
          description={t('students.list.noResultsDesc')}
        />
      )}
    </section>
  );
}
