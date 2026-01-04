'use client';

import * as React from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { ResponsiveModal } from '@/components/ui/responsive-modal';
import { useAssignLesson } from '@/features/lessons/create-lesson-modal/hooks/use-assign-lesson';
import { StudentsGroupsSelector } from '@/features/lessons/lesson-details/components/students-groups-selector';

type Props = {
  lessonId: number;
  groupsIdsInLesson: number[];
  studentIdsInLesson: number[];
};

export function AssignLessonModal({ lessonId, groupsIdsInLesson, studentIdsInLesson }: Props) {
  const [open, setOpen] = React.useState(false);
  const [studentIds, setStudentIds] = React.useState<number[]>([]);
  const [groupIds, setGroupIds] = React.useState<number[]>([]);
  const { mutate, isPending } = useAssignLesson();

  const reset = () => {
    setStudentIds([]);
    setGroupIds([]);
  };

  const handleAssign = () => {
    mutate(
      { lessonId, studentIds, groupIds },
      {
        onSuccess: () => {
          toast.success('Lesson assign to students 🎉', {
            description: 'The lesson has been added to students list.',
          });
          setOpen(false);
          reset();
        },
        onError: (e) => {
          const description =
            e instanceof Error ? e.message : 'Something went wrong. Please try again later.';
          toast.error('Failed to assign lesson', { description });
        },
      },
    );
  };

  const disabled = isPending || (studentIds.length === 0 && groupIds.length === 0);

  return (
    <ResponsiveModal
      trigger={
        <Button variant="outline" size="sm">
          Assign to students
        </Button>
      }
      title="Assign lesson"
      open={open}
      onOpenChange={(v) => {
        setOpen(v);
        if (!v) reset();
      }}
    >
      <div className="space-y-4">
        <StudentsGroupsSelector
          selectedStudentIds={studentIds}
          selectedGroupIds={groupIds}
          onChangeStudentIds={setStudentIds}
          onChangeGroupIds={setGroupIds}
          selectedBeforeStudents={studentIdsInLesson}
          selectedBeforeGroups={groupsIdsInLesson}
        />

        <div className="flex justify-end gap-2 pt-2">
          <Button
            variant="outline"
            type="button"
            onClick={() => setOpen(false)}
            disabled={isPending}
          >
            Cancel
          </Button>

          <Button type="button" onClick={handleAssign} disabled={disabled}>
            {isPending ? 'Assigning...' : 'Assign'}
          </Button>
        </div>
      </div>
    </ResponsiveModal>
  );
}
