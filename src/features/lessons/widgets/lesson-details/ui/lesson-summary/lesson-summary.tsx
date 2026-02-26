'use client';

import { LessonDashboardDto } from '@/entities/lessons/api/get-lesson-dashboard';
import { AGE_GROUP_LABELS } from '@/shared/catalogs/age';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { Dot } from '@/shared/ui/dot';
import { MetaPair } from '@/shared/ui/meta-pair';

export function LessonSummary({ lesson }: { lesson: LessonDashboardDto }) {
  const vocabCount = lesson.vocab.length;
  const assignmentsCount = lesson.assignments.length;
  const groupsCount = lesson.groups?.length ?? 0;
  const studentsCount = lesson.students?.length ?? 0;

  return (
    <Card className="ui-card-static ui-radius-card">
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
        <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-x-3 gap-y-2 text-[12px] sm:text-[13px]">
          <MetaPair label="Words" value={vocabCount} />
          <div className="hidden sm:block">
            <Dot />
          </div>

          <MetaPair label="Assignments" value={assignmentsCount} />
          <div className="hidden sm:block">
            <Dot />
          </div>

          <MetaPair label="Groups" value={groupsCount} />
          <div className="hidden sm:block">
            <Dot />
          </div>

          <MetaPair label="Students" value={studentsCount} />
        </div>
      </CardContent>
    </Card>
  );
}
