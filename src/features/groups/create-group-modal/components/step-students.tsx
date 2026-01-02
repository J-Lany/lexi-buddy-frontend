'use client';

import { StudentsPicker } from '@/features/groups/create-group-modal/components/students-picker';
import type { CreateGroupDraft, Student } from '../types';

export function StepStudents({
  students,
  draft,
  onChange,
}: {
  students: Student[];
  draft: CreateGroupDraft;
  onChange: (patch: Partial<CreateGroupDraft>) => void;
}) {
  const isValid = draft.studentIds.length >= 2;

  return (
    <div className="grid gap-4">
      <StudentsPicker
        students={students}
        value={draft.studentIds}
        onChange={(ids) => onChange({ studentIds: ids })}
      />

      {!isValid && (
        <p className="text-[12px] text-muted-foreground">
          Select at least 2 students to create a group.
        </p>
      )}
    </div>
  );
}
