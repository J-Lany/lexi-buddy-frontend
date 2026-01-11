'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LessonDetails } from '@/features/lessons/create-lesson-modal/types';
import { AGE_LABELS } from '@/lib/consts';

function StatCell({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="ui-row rounded-2xl px-4 py-3">
      <div className="ui-meta">{label}</div>
      <div className="mt-1 text-2xl font-semibold leading-none tabular-nums">{value}</div>
    </div>
  );
}

export default function LessonHeaderCard({ lesson }: { lesson: LessonDetails }) {
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

          {/* Apple-like: pills, тихо и компактно */}
          <div className="flex flex-wrap items-center justify-end gap-2">
            {lesson.level ? <span className="ui-pill">{lesson.level}</span> : null}
            {lesson.ageCategory ? (
              <span className="ui-pill">{AGE_LABELS[lesson.ageCategory]}</span>
            ) : null}
          </div>
        </div>

        {/* Одна мета-строка */}
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
