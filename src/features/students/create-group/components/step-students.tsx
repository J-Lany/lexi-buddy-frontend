'use client';

import { Button } from '@/components/ui/button';
import type { CreateGroupDraft, Student } from '../types';
import { StudentsPicker } from './students-picker';

export function StepStudents({
  students,
  draft,
  onChange,
  onBack,
  onCreate,
  isCreating,
}: {
  students: Student[];
  draft: CreateGroupDraft;
  onChange: (patch: Partial<CreateGroupDraft>) => void;
  onBack: () => void;
  onCreate: () => void;
  isCreating: boolean;
}) {
  const isValid = draft.studentIds.length >= 2;

  return (
    <div className="grid gap-3">
      <StudentsPicker
        students={students}
        value={draft.studentIds}
        onChange={(ids) => onChange({ studentIds: ids })}
      />

      {!isValid && <p className="text-xs text-destructive">Select at least 2 students</p>}

      <div className="flex justify-between gap-2 pt-2">
        <Button type="button" variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button type="button" onClick={onCreate} disabled={!isValid || isCreating}>
          {isCreating ? 'Creating…' : 'Create'}
        </Button>
      </div>
    </div>
  );
}
