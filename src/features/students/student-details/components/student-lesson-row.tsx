'use client';

import Link from 'next/link';
import type { StudentDashboard } from '@/features/students/utils/types';
import { cn } from '@/lib/utils';
import { Book } from 'lucide-react';
import { ELevel } from '@/lib/enums';
import { LEVEL_ICONS } from '@/features/lessons/lessons-table/components/lesson-row';

type Props = {
  lesson: StudentDashboard['lessons'][number];
  variant?: 'card' | 'table';
};

export function StudentLessonRow({ lesson, variant = 'card' }: Props) {
  const title = lesson.title?.trim() || 'Untitled lesson';
  const topic = lesson.topic?.trim() || '—';
  const level = (lesson.level as ELevel | null) ?? null;

  const done = lesson.progress?.assignmentsDone ?? 0;
  const total = lesson.progress?.assignmentsTotal ?? 0;

  const LessonIcon = level ? LEVEL_ICONS[level] : Book;
  const href = `/lessons/${lesson.id}`;

  if (variant === 'table') {
    return (
      <Link
        href={href}
        className={cn(
          'block px-6 py-4',
          'transition-colors',
          'hover:bg-[color-mix(in_oklch,var(--foreground)_3%,white_97%)]',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        )}
      >
        <div className="grid grid-cols-[2fr_1.5fr_120px_100px] gap-4 items-center">
          <div className="flex items-center gap-3 min-w-0">
            <LessonIcon className="h-5 w-5 text-muted-foreground shrink-0" />
            <div className="ui-title truncate">{title}</div>
          </div>

          <div className="ui-meta truncate">{topic}</div>

          <div className="flex justify-end">
            <span className={cn('ui-pill', !level && 'opacity-70')}>{level ?? '—'}</span>
          </div>

          {/* Done */}
          <div className="flex justify-end">
            <span className="ui-meta tabular-nums">
              {done}/{total}
            </span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={href} className="ui-card ui-radius-card ui-focus block px-5 py-4">
      <div className="flex items-start gap-3">
        {/* LEFT: lesson icon */}
        <div className="shrink-0 pt-0.5">
          <LessonIcon className="h-6 w-6 text-muted-foreground" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="ui-title truncate">{title}</div>
          <div className="mt-1 ui-meta truncate">{topic}</div>
        </div>

        <div className="shrink-0 flex flex-col items-end gap-1 pl-2">
          <span className={cn('ui-pill', !level && 'opacity-70')}>{level ?? '—'}</span>

          <span className="ui-meta tabular-nums">
            {done}/{total}
          </span>
        </div>
      </div>
    </Link>
  );
}
