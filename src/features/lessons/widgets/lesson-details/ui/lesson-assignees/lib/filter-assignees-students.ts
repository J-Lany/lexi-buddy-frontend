import type { LessonDashboardDto } from '@/entities/lessons/api/get-lesson-dashboard';

type Student = NonNullable<LessonDashboardDto['students']>[number];

export type AssigneesFilterKey = 'ALL' | 'NOT_STARTED' | 'PENDING' | 'COMPLETED';

export function filterAssigneesStudents(
  students: Student[],
  query: string,
  filter: AssigneesFilterKey,
): Student[] {
  const q = query.trim().toLowerCase();

  return students
    .filter((s) => (filter === 'ALL' ? true : s.status === filter))
    .filter((s) => {
      if (!q) return true;

      const name = [s.firstName, s.lastName].filter(Boolean).join(' ').toLowerCase();
      const username = (s.username ?? '').toLowerCase();

      return name.includes(q) || username.includes(q);
    });
}
