import type { StudentDto } from '@/entities/students/api/get-my-students';

type Params = {
  students: readonly StudentDto[];
  existingStudentIds: readonly number[];
  query: string;
};

export function filterAvailableStudents({ students, existingStudentIds, query }: Params) {
  const blocked = new Set(existingStudentIds);

  const q = query.trim().toLowerCase();
  const hasQuery = q.length > 0;

  return students
    .filter((s) => !blocked.has(s.id))
    .filter((s) => {
      if (!hasQuery) return true;

      const haystack = [s.name, s.username, s.level].filter(Boolean).join(' ').toLowerCase();

      return haystack.includes(q);
    });
}
