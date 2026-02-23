'use client';

import type { StudentDto } from '@/entities/students/api/get-my-students';
import { StudentsPicker } from '@/features/groups/modals/create-group/ui/students-picker';

import type { CreateGroupDraft } from '../types';

type Props = {
  students: readonly StudentDto[];
  draft: CreateGroupDraft;
  onChange: (patch: Partial<CreateGroupDraft>) => void;
};

export function StepStudents({ students, draft, onChange }: Props) {
  const isValid = draft.studentIds.length >= 2;

  return (
    <div className="grid gap-4">
      <StudentsPicker
        students={students}
        value={draft.studentIds}
        onChange={(ids) => onChange({ studentIds: ids })}
      />

      {!isValid ? (
        <p className="text-[12px] text-muted-foreground">
          Select at least 2 students to create a group.
        </p>
      ) : null}
    </div>
  );
}
