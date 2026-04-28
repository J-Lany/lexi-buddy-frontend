'use client';

import { ClipboardCheck, GraduationCap, Layers3, UsersRound } from 'lucide-react';

import type { LessonDashboardDto } from '@/entities/lessons/api/get-lesson-dashboard';
import { useI18n } from '@/shared/i18n';

type Props = {
  lesson: LessonDashboardDto;
};

export function LessonSummaryStatGrid({ lesson }: Props) {
  const { t } = useI18n();

  const stats = [
    { label: t('lessons.details.words'), value: lesson.vocab.length, icon: Layers3 },
    {
      label: t('lessons.details.assignments'),
      value: lesson.assignments.length,
      icon: ClipboardCheck,
    },
    { label: t('lessons.details.groups'), value: lesson.groups?.length ?? 0, icon: GraduationCap },
    { label: t('lessons.details.students'), value: lesson.students?.length ?? 0, icon: UsersRound },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.label}
            className="rounded-2xl border border-border/60 bg-background/60 px-4 py-3"
          >
            <div className="flex items-center justify-between gap-3">
              <span className="text-xs font-medium text-muted-foreground">{stat.label}</span>
              <Icon className="h-4 w-4 text-primary/80" />
            </div>

            <div className="mt-2 text-2xl font-semibold tracking-tight">{stat.value}</div>
          </div>
        );
      })}
    </div>
  );
}
