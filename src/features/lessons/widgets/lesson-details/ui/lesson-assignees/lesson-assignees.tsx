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
import { useI18n } from '@/shared/i18n';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';

type Props = {
  lesson: LessonDashboardDto;
};

export function LessonAssignees({ lesson }: Props) {
  const { t } = useI18n();
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
          <CardTitle>{t('lessons.details.assignedTitle')}</CardTitle>
          <div className="shrink-0">
            <AssignLessonModal
              lessonId={lesson.id}
              studentIdsInLesson={studentIds}
              groupsIdsInLesson={groupsIds}
            />
          </div>
        </div>
      </CardHeader>

      {!hasAnything ? (
        <EmptyState />
      ) : (
        <CardContent className="!pt-0">
          <div className="space-y-4 w-full">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="ui-stat font-medium">{t('lessons.details.students')}</span>
                <span className="ui-stat text-muted-foreground">{studentsCount}</span>
              </div>

              <AssigneesStudentsToolbar
                query={query}
                onQueryChange={setQuery}
                filter={filter}
                onFilterChange={setFilter}
                options={STUDENT_FILTERS}
              />

              <StudentsSection students={filteredStudents} />
            </div>

            <div className="border-t border-(--border-soft)" />

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="ui-stat font-medium">{t('lessons.details.groups')}</span>
                <span className="ui-stat text-muted-foreground">{groupsCount}</span>
              </div>
              <GroupsSection groups={lesson.groups ?? []} />
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
}
