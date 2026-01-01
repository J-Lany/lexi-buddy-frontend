'use client';

import { Button } from '@/components/ui/button';
import { CreateLessonDraft } from '@/features/lessons/create-lesson-modal/types';
import { useAssignLesson } from '@/features/lessons/create-lesson-modal/hooks/use-assign-lesson';
import { StudentsGroupsSelector } from '@/features/lessons/lesson-details/components/students-groups-selector';
import { toast } from 'sonner';

type Props = {
  draft: CreateLessonDraft;
  onChange: (patch: Partial<CreateLessonDraft>) => void;
  onNext: () => void;
  onBack: () => void;
};

export function StepStudents({ draft, onChange, onNext, onBack }: Props) {
  const { mutate, isPending } = useAssignLesson();

  const studentIds = draft.studentIds ?? [];
  const groupIds = draft.groupIds ?? [];

  const handleStudentIdsChange = (ids: number[]) => {
    onChange({ studentIds: ids });
  };

  const handleGroupIdsChange = (ids: number[]) => {
    onChange({ groupIds: ids });
  };

  const nothingSelected = studentIds.length === 0 && groupIds.length === 0;

  const handleFinalize = () => {
    if (!draft.lessonId) {
      onNext();
      return;
    }

    if (nothingSelected) {
      onNext();
      return;
    }

    mutate(
      {
        lessonId: draft.lessonId,
        studentIds: studentIds.length ? studentIds : [],
        groupIds: groupIds.length ? groupIds : [],
      },
      {
        onSuccess: () => {
          toast.success('Lesson assign to students 🎉', {
            description: 'The lesson has been added to students list.',
          });
        },
        onError: (e) => {
          const description =
            e instanceof Error ? e.message : 'Something went wrong. Please try again later.';

          toast.error('Failed to assign lesson', { description });
        },
        onSettled: () => {
          onNext();
        },
      },
    );
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
