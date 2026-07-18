'use client';

import { useAssigneesOptionsQuery } from '@/entities/lessons/model/query/assignees-options';
import type {
  CreateLessonDraft,
  DraftPatch,
} from '@/features/lessons/modals/create-lesson-modal/model/types';
import { StudentsGroupsSelector } from '@/features/lessons/ui/students-groups-selector/students-groups-selector';
import { Skeleton } from '@/shared/ui/skeleton';

type Props = {
  draft: CreateLessonDraft;
  onChange: (patch: DraftPatch) => void;
};

export function StepStudents({ draft, onChange }: Props) {
  const { students, groups, isLoading, isError } = useAssigneesOptionsQuery();

  if (isLoading) {
    return (
      <div className="space-y-5">
        <Skeleton className="h-40 rounded-2xl" />
        <Skeleton className="h-40 rounded-2xl" />
      </div>
    );
  }

  if (isError) {
    return <div className="text-sm text-destructive">Failed to load students/groups.</div>;
  }

  return (
    <div className="space-y-4">
      <StudentsGroupsSelector
        students={students}
        groups={groups}
        selectedStudentIds={draft.studentIds}
        selectedGroupIds={draft.groupIds}
        onChangeStudentIds={(ids) => onChange({ studentIds: ids })}
        onChangeGroupIds={(ids) => onChange({ groupIds: ids })}
      />
    </div>
  );
}
