'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { LessonDetails } from '@/features/lessons/create-lesson-modal/types';
import { AssignLessonModal } from '@/features/lessons/lesson-details/components/assign-lesson-modal';
import { GroupsSection } from '@/features/lessons/lesson-details/components/lesson-assignees/components/group-section';
import { Divider } from '@/components/ui/divider';
import { StudentsSection } from '@/features/lessons/lesson-details/components/lesson-assignees/components/student-section';
import { EmptyState } from '@/features/lessons/lesson-details/components/lesson-assignees/components/empty-state';

type Props = {
  lesson: LessonDetails;
};

export function LessonAssigneesCard({ lesson }: Props) {
  const groups = lesson.groups ?? [];
  const students = lesson.students ?? [];
  const hasAnything = groups.length > 0 || students.length > 0;

  const studentIds = students.map((s) => s.id);
  const groupsIds = groups.map((g) => g.id);
  return (
    <Card className="rounded-3xl border border-sky-100/70 bg-white/95 shadow-[0_8px_24px_rgba(15,116,143,0.06)]">
      <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <CardTitle>Assigned to</CardTitle>
        <AssignLessonModal
          lessonId={lesson.id}
          studentIdsInLesson={studentIds}
          groupsIdsInLesson={groupsIds}
        />
      </CardHeader>

      {!hasAnything ? (
        <EmptyState />
      ) : (
        <CardContent className="flex flex-col gap-4 text-sm">
          <GroupsSection groups={groups} />
          <Divider />
          <StudentsSection students={students} />
        </CardContent>
      )}
    </Card>
  );
}
