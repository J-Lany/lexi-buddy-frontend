'use client';

import { Book } from 'lucide-react';

import type { StudentDashboardDto } from '@/entities/students/api/get-student-dashboard';
import { STUDENT_LESSONS_TABLE_COLS } from '@/features/students/widgets/student-details/ui/student-lessons-list/student-lessons-list.columns';
import { LEVEL_ICONS } from '@/shared/catalogs/levels';
import { cn } from '@/shared/lib/cn';
import { routes } from '@/shared/router/routes';
import { RowLink } from '@/shared/ui/row-link';

type Lesson = StudentDashboardDto['lessons'][number];

type Props = {
  lesson: Lesson;
  variant?: 'card' | 'table';
};

export function StudentLessonsListRow({ lesson, variant = 'card' }: Props) {
  const title = lesson.title?.trim() || 'Untitled lesson';
  const topic = lesson.topic?.trim() || '—';

  const level = lesson.level;
  const LevelIcon = level ? LEVEL_ICONS[level] : Book;
  const levelLabel = level ?? '—';

  const done = lesson.progress?.assignmentsDone ?? 0;
  const total = lesson.progress?.assignmentsTotal ?? 0;
  const doneLabel = `${done}/${total}`;

  // Пока без query params — вы потом централизованно поправите routes.
  const href = `${routes.lessons}/${lesson.id}`;

  if (variant === 'table') {
    return (
      <RowLink href={href}>
        <div className={cn('grid items-center gap-4', STUDENT_LESSONS_TABLE_COLS)}>
          <div className="flex items-center gap-3 min-w-0">
            <LevelIcon className="h-5 w-5 text-muted-foreground shrink-0" aria-hidden />
            <div className="ui-title truncate">{title}</div>
          </div>

          <div className="ui-meta truncate">{topic}</div>

          <div className="flex justify-end">
            <span className={cn('ui-pill', levelLabel === '—' && 'opacity-70')}>{levelLabel}</span>
          </div>

          <div className="flex justify-end">
            <span className="ui-meta tabular-nums">{doneLabel}</span>
          </div>
        </div>
      </RowLink>
    );
  }

  return (
    <RowLink href={href} className="ui-card ui-radius-card ui-focus px-5 sm:px-6 py-4">
      <div className="flex items-start gap-3">
        <div className="shrink-0 pt-0.5">
          <LevelIcon className="h-6 w-6 text-muted-foreground" aria-hidden />
        </div>

        <div className="flex-1 min-w-0">
          <div className="ui-title truncate">{title}</div>
          <div className="mt-1 ui-meta truncate">{topic}</div>
        </div>

        <div className="shrink-0 flex flex-col items-end gap-1 pl-2">
          <span className={cn('ui-pill', levelLabel === '—' && 'opacity-70')}>{levelLabel}</span>
          <span className="ui-meta tabular-nums">{doneLabel}</span>
        </div>
      </div>
    </RowLink>
  );
}
