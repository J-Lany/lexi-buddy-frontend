'use client';

import { useMemo } from 'react';
import { useGetStudents } from '@/features/students/hooks/use-get-students';
import { StudentTable } from '@/features/students/students-table/components/student-table';
import { EmptyStateCard } from '@/components/ui/empty-state-card';
import { InviteStudentModal } from '@/features/students/add-student-modal/add-student-modal';
import { Student } from '@/features/groups/create-group-modal/types';
import { User } from 'lucide-react';

export function StudentsFragment({ query }: { query: string }) {
  const { data } = useGetStudents();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!data || !q) return data ?? [];

    return data.filter((s: Student) => {
      const haystack = `${s.name} ${s.username} ${s.groupName} ${s.level}`.toLowerCase();
      return haystack.includes(q);
    });
  }, [data, query]);

  if (data && data.length === 0) {
    return (
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
    );
  }

  return (
    <section className="flex flex-col gap-4">
      {!!filtered.length && <StudentTable students={filtered} />}

      {data && data.length > 0 && filtered.length === 0 && (
        <EmptyStateCard
          surface="canvas"
          title="No results"
          description="Check the spelling or try another keyword."
        />
      )}
    </section>
  );
}
