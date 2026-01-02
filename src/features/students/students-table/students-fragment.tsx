'use client';

import { useMemo } from 'react';
import { useGetStudents } from '@/features/students/hooks/use-get-students';
import { StudentTable } from '@/features/students/students-table/components/student-table';
import { EmptyStateCard } from '@/components/ui/empty-state-card';
import { InviteStudentModal } from '@/features/students/add-student-modal/add-student-modal';
import { Student } from '@/features/groups/create-group-modal/types';

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
      <section className="flex flex-col gap-4">
        <EmptyStateCard
          title="No students yet"
          description="Invite your first student to start assigning lessons."
          action={<InviteStudentModal />}
        />
      </section>
    );
  }

  return (
    <section className="flex flex-col gap-4">
      {!!filtered.length && <StudentTable students={filtered} />}

      {data && data.length > 0 && filtered.length === 0 && (
        <EmptyStateCard
          title="No results"
          description="Check the spelling or try another keyword."
        />
      )}
    </section>
  );
}
