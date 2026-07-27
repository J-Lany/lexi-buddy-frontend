'use client';

import { BookOpen } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { LessonSummaryDto } from '@/entities/lessons/api/get-my-lessons';
import { getLocalizedAgeGroupLabel } from '@/shared/catalogs/age';
import { LEVEL_ICONS } from '@/shared/catalogs/levels';
import { useI18n } from '@/shared/i18n';
import { routes } from '@/shared/router/routes';

export function LessonRow({ lesson }: { lesson: LessonSummaryDto }) {
  const router = useRouter();
  const { t } = useI18n();

  const stats = `${lesson.vocabCount} words · ${lesson.assignmentsCount} tasks`;
  const ageLabel = lesson.ageCategory ? getLocalizedAgeGroupLabel(lesson.ageCategory, t) : null;

  const meta = [lesson.topic || null, lesson.level || null, ageLabel].filter(Boolean).join(' · ');

  const LevelIcon = lesson.level ? LEVEL_ICONS[lesson.level] : BookOpen;

  return (
    <button
      type="button"
      onClick={() => router.push(`${routes.lessons}/${lesson.id}`)}
      className="ui-card ui-radius-card ui-focus w-full text-left px-5 sm:px-6 py-4"
    >
      <div className="flex items-start gap-3 sm:gap-4">
        <div className="ui-thumb h-9 w-9">
          <LevelIcon size={18} strokeWidth={2} className="text-primary" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3">
            <span className="ui-title">{lesson.title}</span>
            <span className="ui-stat">{stats}</span>
          </div>

          {meta && <div className="mt-1 ui-meta">{meta}</div>}
        </div>
      </div>
    </button>
  );
}
