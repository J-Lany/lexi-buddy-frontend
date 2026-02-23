'use client';

import { useMemo, useState } from 'react';

import type { LessonDashboardDto } from '@/entities/lessons/api/get-lesson-dashboard';
import { AssignLessonModal } from '@/features/lessons/modals/assign-lesson-modal';
import {
  AssigneesFilterKey,
  filterAssigneesStudents,
} from '@/features/lessons/widgets/lesson-details/ui/lesson-assignees/lib/filter-assignees-students';
import { EmptyState } from '@/features/lessons/widgets/lesson-details/ui/lesson-assignees/ui/empty-state';
import { GroupsSection } from '@/features/lessons/widgets/lesson-details/ui/lesson-assignees/ui/group-section';
import { StudentsSection } from '@/features/lessons/widgets/lesson-details/ui/lesson-assignees/ui/student-section';
import {
  AssigneesStudentsToolbar,
  STUDENT_FILTERS,
} from '@/features/lessons/widgets/lesson-details/ui/lesson-assignees/ui/students-toolbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';

type Props = {
  lesson: LessonDashboardDto;
};

export function LessonAssignees({ lesson }: Props) {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<AssigneesFilterKey>('ALL');

  const filteredStudents = useMemo(() => {
    return filterAssigneesStudents(lesson.students ?? [], query, filter);
  }, [lesson.students, query, filter]);

  const studentIds = (lesson.students ?? []).map((s) => s.id);
  const groupsIds = (lesson.groups ?? []).map((g) => g.id);

  const studentsCount = lesson.students?.length ?? 0;
  const groupsCount = lesson.groups?.length ?? 0;

  const hasAnything = studentsCount > 0 || groupsCount > 0;

  return (
    <Card className="ui-panel ui-radius-card">
      <CardHeader className="space-y-2">
        <div className="flex items-center justify-between gap-3">
          <CardTitle className="text-base sm:text-lg">Assigned</CardTitle>
          <div className="shrink-0">
            <AssignLessonModal
              lessonId={lesson.id}
              studentIdsInLesson={studentIds}
              groupsIdsInLesson={groupsIds}
            />
          </div>
        </div>

        <div className="ui-meta">
          {studentsCount} students · {groupsCount} groups
        </div>
      </CardHeader>

      {!hasAnything ? (
        <EmptyState />
      ) : (
        <CardContent>
          <div className="w-full max-w-4xl space-y-6">
            <div className="space-y-3">
              <div className="ui-meta uppercase tracking-wide">Students</div>

              <AssigneesStudentsToolbar
                query={query}
                onQueryChange={setQuery}
                filter={filter}
                onFilterChange={setFilter}
                options={STUDENT_FILTERS}
              />

              <StudentsSection students={filteredStudents} />
            </div>

            <div className="border-t" style={{ borderColor: 'var(--border-soft)' }} />

            <div className="space-y-3">
              <div className="ui-meta uppercase tracking-wide">Groups</div>
              <GroupsSection groups={lesson.groups ?? []} />
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
}
