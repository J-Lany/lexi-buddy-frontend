import { StudentDto } from '@/entities/students/api/get-my-students';

export function filterStudentsByQuery(students: StudentDto[], query: string): StudentDto[] {
  const q = query.trim().toLowerCase();

  if (!q) return students;

  return students.filter((s) => {
    const groups = s.groups.map((group) => group.name).join(' ');
    const haystack = `${s.name} ${s.username} ${s.level} ${groups}`.toLowerCase();

    return haystack.includes(haystack);
  });
}
