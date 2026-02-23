'use client';

import { User } from 'lucide-react';
import { useMemo } from 'react';

import { useMyStudentsQuery } from '@/entities/students/model/queries/get-my-students';
import { filterStudentsByQuery } from '@/features/students/lib/filter-students';
import { StudentsTable } from '@/features/students/widgets/students-list/ui/students-table/students-table';
import { StudentsTableSkeleton } from '@/features/students/widgets/students-list/ui/students-table/students-table-skeleton';
import { EmptyStateCard } from '@/shared/ui/empty-state-card';

export function StudentsListWidget({ query }: { query: string }) {
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
          title="Something went wrong"
          description="Try refreshing the page."
        />
      )}
      {showEmpty && (
        <EmptyStateCard
          icon={
            <User
              className="h-5 w-5 sm:h-6 sm:w-6 text-[color:color-mix(in_oklch,var(--primary)_55%,black_45%)]"
              aria-hidden
            />
          }
          title="No students yet"
          description="Invite your first student to start assigning lessons."
          hint="Tap “Add a student” above"
        />
      )}
      {showNoResults && (
        <EmptyStateCard
          surface="canvas"
          title="No results"
          description="Check the spelling or try another keyword."
        />
      )}
    </section>
  );
}
