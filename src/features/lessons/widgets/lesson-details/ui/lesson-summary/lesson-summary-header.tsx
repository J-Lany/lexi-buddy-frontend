'use client';

import type { ReactNode } from 'react';

import type { LessonDashboardDto } from '@/entities/lessons/api/get-lesson-dashboard';
import { AGE_GROUP_LABELS } from '@/shared/catalogs/age';

type Props = {
  lesson: LessonDashboardDto;
  actionSlot?: ReactNode;
};

export function LessonSummaryHeader({ lesson, actionSlot }: Props) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div className="min-w-0">
        <h1 className="ui-page-title truncate">{lesson.title}</h1>

        {lesson.topic ? (
          <p className="mt-2 ui-meta truncate">
            Topic: <span className="text-foreground/75">{lesson.topic}</span>
          </p>
        ) : null}

        {lesson.description ? (
          <p className="mt-3 max-w-2xl ui-meta leading-6 whitespace-pre-line">
            {lesson.description}
          </p>
        ) : null}
      </div>

      <div className="flex shrink-0 items-center gap-2 sm:justify-end">
        {lesson.level ? <span className="ui-pill">{lesson.level}</span> : null}

        {lesson.ageCategory ? (
          <span className="ui-pill">
            {AGE_GROUP_LABELS[lesson.ageCategory] ?? lesson.ageCategory}
          </span>
        ) : null}

        {actionSlot ? <div className="ml-1 shrink-0">{actionSlot}</div> : null}
      </div>
    </div>
  );
}
