'use client';

import { toast } from 'sonner';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useAssignLesson } from '@/features/lessons/create-lesson-modal/hooks/use-assign-lesson';
import { StudentsGroupsSelector } from '@/features/lessons/lesson-details/components/students-groups-selector';

type Props = {
  lessonId: number;
  groupsIdsInLesson: number[];
  studentIdsInLesson: number[];
};

export function AssignLessonModal({ lessonId, groupsIdsInLesson, studentIdsInLesson }: Props) {
  const [open, setOpen] = useState(false);
  const [studentIds, setStudentIds] = useState<number[]>([]);
  const [groupIds, setGroupIds] = useState<number[]>([]);
  const { mutate, isPending } = useAssignLesson();

  const handleAssign = () => {
    mutate(
      { lessonId, studentIds, groupIds },
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
          setOpen(false);
        },
      },
    );
  };

  const disabled = isPending || (studentIds.length === 0 && groupIds.length === 0);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Assign to students
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Assign lesson</DialogTitle>
        </DialogHeader>

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
      </DialogContent>
    </Dialog>
  );
}
