'use client';

import type { AssignStudentOption } from '../model/types';
import { AssignOptionEmpty } from './assign-option-empty';
import { StudentAssignRow } from './student-assign-row';

type Props = {
  students: AssignStudentOption[];
  selectedIds: number[];
  onToggle: (studentId: number) => void;
};

export function StudentsAssignList({ students, selectedIds, onToggle }: Props) {
  if (students.length === 0) {
    return <AssignOptionEmpty>No students found</AssignOptionEmpty>;
  }

  return (
    <div className="divide-y divide-border/60">
      {students.map((student) => (
        <StudentAssignRow
          key={student.id}
          student={student}
          selected={selectedIds.includes(student.id)}
          onToggle={() => onToggle(student.id)}
        />
      ))}
    </div>
  );
}
