'use client';

import { Student, StudentRow } from '@/features/students/students-table/components/student-row';

export function StudentTable({ students }: { students: Student[] }) {
  return (
    <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
      {students.map((student) => (
        <StudentRow key={student.id} student={student} />
      ))}
    </div>
  );
}
