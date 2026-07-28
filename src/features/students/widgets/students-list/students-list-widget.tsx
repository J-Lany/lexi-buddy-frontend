'use client';

import { User } from 'lucide-react';
import { useMemo } from 'react';

import { useMyStudentsQuery } from '@/entities/students/model/queries/get-my-students';
import { InviteStudentModal } from '@/features/students';
import { filterStudentsByQuery } from '@/features/students/lib/filter-students';
import { StudentsTable } from '@/features/students/widgets/students-list/ui/students-table/students-table';
import { StudentsTableSkeleton } from '@/features/students/widgets/students-list/ui/students-table/students-table-skeleton';
import { useI18n } from '@/shared/i18n';
import { EmptyStateCard } from '@/shared/ui/empty-state-card';
import { emptyStatePrimaryActionClassName, EmptyStateV2 } from '@/shared/ui/empty-state-v2';

export function StudentsListWidget({ query }: { query: string }) {
  const { t } = useI18n();
  const { data, isLoading, isError } = useMyStudentsQuery();

  const filtered = useMemo(() => {
    return filterStudentsByQuery(data ?? [], query);
  }, [data, query]);

  const studentsCount = data?.length ?? 0;

  const showSkeleton = isLoading;
  const showError = isError;
  const showEmpty = !isLoading && !isError && studentsCount === 0;
  const showNoResults = !isLoading && !isError && studentsCount > 0 && filtered.length === 0;
  const showTable = !isLoading && !isError && filtered.length > 0;

  return (
    <section className="flex flex-col gap-4">
      {showSkeleton && <StudentsTableSkeleton />}
      {showTable && <StudentsTable students={filtered} />}
      {showError && (
        <EmptyStateCard
          surface="canvas"
          title={t('students.list.error')}
          description={t('students.list.errorDesc')}
        />
      )}
      {showEmpty && (
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
      {showNoResults && (
        <EmptyStateCard
          surface="canvas"
          title={t('students.list.noResults')}
          description={t('students.list.noResultsDesc')}
        />
      )}
    </section>
  );
}
