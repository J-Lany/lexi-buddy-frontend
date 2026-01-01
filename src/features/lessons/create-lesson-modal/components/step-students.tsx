'use client';

import { Button } from '@/components/ui/button';
import { CreateLessonDraft } from '@/features/lessons/create-lesson-modal/types';
import { useAssignLesson } from '@/features/lessons/create-lesson-modal/hooks/use-assign-lesson';
import { StudentsGroupsSelector } from '@/features/lessons/lesson-details/components/students-groups-selector';

type Props = {
  draft: CreateLessonDraft;
  onChange: (patch: Partial<CreateLessonDraft>) => void;
  onNext: () => void;
  onBack: () => void;
};

export function StepStudents({ draft, onChange, onNext, onBack }: Props) {
  const { mutateAsync, isPending } = useAssignLesson();

  const studentIds = draft.studentIds ?? [];
  const groupIds = draft.groupIds ?? [];

  const handleStudentIdsChange = (ids: number[]) => {
    onChange({ studentIds: ids });
  };

  const handleGroupIdsChange = (ids: number[]) => {
    onChange({ groupIds: ids });
  };

  const nothingSelected = studentIds.length === 0 && groupIds.length === 0;

  const handleFinalize = async () => {
    if (!draft.lessonId) {
      onNext();
      return;
    }

    if (nothingSelected) {
      onNext();
      return;
    }

    await mutateAsync({
      lessonId: draft.lessonId,
      studentIds: studentIds.length ? studentIds : undefined,
      groupIds: groupIds.length ? groupIds : undefined,
    });

    onNext();
  };

  return (
    <div className="space-y-4">
      <StudentsGroupsSelector
        selectedStudentIds={studentIds}
        selectedGroupIds={groupIds}
        onChangeStudentIds={handleStudentIdsChange}
        onChangeGroupIds={handleGroupIdsChange}
      />

      <div className="flex justify-between gap-2 pt-2">
        <Button type="button" variant="outline" onClick={onBack} disabled={isPending}>
          Back
        </Button>
        <Button type="button" onClick={handleFinalize} disabled={isPending}>
          {isPending ? 'Assigning...' : nothingSelected ? 'Skip & finish' : 'Assign & finish'}
        </Button>
      </div>
    </div>
  );
}
