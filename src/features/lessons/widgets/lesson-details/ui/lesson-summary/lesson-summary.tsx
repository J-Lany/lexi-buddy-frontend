'use client';

import type { ReactNode } from 'react';

import type { LessonDashboardDto } from '@/entities/lessons/api/get-lesson-dashboard';
import { Card, CardContent } from '@/shared/ui/card';

import { LessonSummaryHeader } from './lesson-summary-header';
import { LessonSummaryLanguageRow } from './lesson-summary-language-row';
import { LessonSummaryStatGrid } from './lesson-summary-stat-grid';

type LessonSummaryProps = {
  lesson: LessonDashboardDto;
  actionSlot?: ReactNode;
};

export function LessonSummary({ lesson, actionSlot }: LessonSummaryProps) {
  return (
    <Card className="ui-card-static ui-radius-card overflow-hidden">
      <CardContent className="p-5 sm:p-6 lg:p-7">
        <div className="flex flex-col gap-6">
          <LessonSummaryHeader lesson={lesson} actionSlot={actionSlot} />

          <div className="h-px w-full bg-border/60" />

          <LessonSummaryLanguageRow lesson={lesson} />

          <LessonSummaryStatGrid lesson={lesson} />
        </div>
      </CardContent>
    </Card>
  );
}
