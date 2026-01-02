'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { StatTile } from '@/features/lessons/lesson-details/components/lesson-header/components/stat-title';
import { LessonDetails } from '@/features/lessons/create-lesson-modal/types';

export default function LessonHeaderCard({ lesson }: { lesson: LessonDetails }) {
  const vocabCount = lesson.vocab.length;
  const assignmentsCount = lesson.assignments.length;
  const groupsCount = lesson.groups?.length ?? 0;
  const studentsCount = lesson.students?.length ?? 0;

  return (
    <Card className="rounded-3xl border border-sky-100/70 bg-white/95 shadow-[0_10px_32px_rgba(15,116,143,0.10)]">
      <CardHeader className="space-y-3">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle className="truncate text-xl sm:text-2xl">{lesson.title}</CardTitle>

          <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            {lesson.level ? (
              <Badge variant="secondary" className="rounded-full">
                Level: {lesson.level}
              </Badge>
            ) : null}
            {lesson.ageCategory ? (
              <Badge variant="outline" className="rounded-full">
                {lesson.ageCategory}
              </Badge>
            ) : null}
            {lesson.topic ? (
              <Badge variant="outline" className="max-w-full truncate rounded-full">
                Topic: {lesson.topic}
              </Badge>
            ) : null}
          </div>
        </div>

        {lesson.description ? (
          <p className="text-sm text-muted-foreground whitespace-pre-line">{lesson.description}</p>
        ) : null}
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <StatTile label="Words" value={vocabCount} />
          <StatTile label="Assignments" value={assignmentsCount} />
          <StatTile label="Groups" value={groupsCount} />
          <StatTile label="Students" value={studentsCount} />
        </div>
      </CardContent>
    </Card>
  );
}
