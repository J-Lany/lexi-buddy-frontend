'use client';

import { ArrowRight, Languages } from 'lucide-react';

import type { LessonDashboardDto } from '@/entities/lessons/api/get-lesson-dashboard';
import { useI18n } from '@/shared/i18n';

import { getInstructionLanguageLabel, getLanguageLabel } from './lesson-summary.meta';

type Props = {
  lesson: LessonDashboardDto;
};

export function LessonSummaryLanguageRow({ lesson }: Props) {
  const { t } = useI18n();

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3 min-w-0">
        <div className="h-11 w-11 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
          <Languages className="h-5 w-5 text-primary" />
        </div>

        <div className="min-w-0">
          <div className="text-sm font-semibold text-foreground">
            {t('lessons.details.languageRow')}
          </div>
          <div className="mt-0.5 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <span className="text-foreground/80">{getLanguageLabel(lesson.targetLanguage)}</span>
            <ArrowRight className="h-3.5 w-3.5" />
            <span className="text-foreground/80">{getLanguageLabel(lesson.nativeLanguage)}</span>
          </div>
        </div>
      </div>

      <div className="rounded-full bg-primary/5 px-3.5 py-2 text-sm text-muted-foreground sm:text-right">
        {t('lessons.details.instructions')}{' '}
        <span className="font-medium text-foreground/80">
          {getInstructionLanguageLabel(lesson.instructionLanguage)}
        </span>
      </div>
    </div>
  );
}
