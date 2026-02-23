'use client';

import { LessonDashboardDto } from '@/entities/lessons/api/get-lesson-dashboard';
import { StatCell } from '@/features/lessons/widgets/lesson-details/ui/lesson-summary/ui/stat-cell';
import { AGE_GROUP_LABELS } from '@/shared/catalogs/age';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';

export function LessonSummary({ lesson }: { lesson: LessonDashboardDto }) {
  const vocabCount = lesson.vocab.length;
  const assignmentsCount = lesson.assignments.length;
  const groupsCount = lesson.groups?.length ?? 0;
  const studentsCount = lesson.students?.length ?? 0;

  return (
    <Card className="ui-card ui-radius-card">
      <CardHeader className="space-y-2">
        <div className="flex items-start justify-between gap-4">
          <CardTitle className="truncate text-xl sm:text-2xl tracking-tight">
            {lesson.title}
          </CardTitle>

          <div className="flex flex-wrap items-center justify-end gap-2">
            {lesson.level ? <span className="ui-pill">{lesson.level}</span> : null}
            {lesson.ageCategory ? (
              <span className="ui-pill">
                {AGE_GROUP_LABELS[lesson.ageCategory] ?? lesson.ageCategory}
              </span>
            ) : null}
          </div>
        </div>

        {lesson.topic ? (
          <div className="ui-meta truncate" title={lesson.topic}>
            Topic: <span className="text-foreground/80">{lesson.topic}</span>
          </div>
        ) : null}

        {lesson.description ? (
          <p className="ui-meta whitespace-pre-line">{lesson.description}</p>
        ) : null}
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <StatCell label="Words" value={vocabCount} />
          <StatCell label="Assignments" value={assignmentsCount} />
          <StatCell label="Groups" value={groupsCount} />
          <StatCell label="Students" value={studentsCount} />
        </div>
      </CardContent>
    </Card>
  );
}
