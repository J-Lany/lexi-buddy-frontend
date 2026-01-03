'use client';

import { StudentsGroupsSelector } from '@/features/lessons/lesson-details/components/students-groups-selector';
import type { CreateLessonDraft } from '@/features/lessons/create-lesson-modal/types';

type Props = {
  draft: CreateLessonDraft;
  onChange: (patch: Partial<CreateLessonDraft>) => void;
};

export function StepStudents({ draft, onChange }: Props) {
  const studentIds = draft.studentIds ?? [];
  const groupIds = draft.groupIds ?? [];

  return (
    <div className="space-y-4">
      <StudentsGroupsSelector
        selectedStudentIds={studentIds}
        selectedGroupIds={groupIds}
        onChangeStudentIds={(ids) => onChange({ studentIds: ids })}
        onChangeGroupIds={(ids) => onChange({ groupIds: ids })}
      />
    </div>
  );
}
