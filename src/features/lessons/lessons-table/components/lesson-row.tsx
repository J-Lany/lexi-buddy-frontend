'use client';

import { useRouter } from 'next/navigation';
import type { LucideIcon } from 'lucide-react';
import { BookOpen, BookOpenText, GraduationCap, Brain, Sparkles, Star } from 'lucide-react';

import { LessonSummary } from '@/features/lessons/create-lesson-modal/types';
import { EAppRoutes } from '@/lib/routes';
import { ELevel } from '@/lib/enums';
import { AGE_LABELS } from '@/lib/consts';

export type Lesson = LessonSummary;

export const LEVEL_ICONS: Record<ELevel, LucideIcon> = {
  [ELevel.A1]: BookOpen,
  [ELevel.A2]: BookOpenText,
  [ELevel.B1]: GraduationCap,
  [ELevel.B2]: Brain,
  [ELevel.C1]: Sparkles,
  [ELevel.C2]: Star,
};

export function LessonRow({ lesson }: { lesson: Lesson }) {
  const router = useRouter();

  const stats = `${lesson.vocabCount} words · ${lesson.assignmentsCount} tasks`;
  const ageLabel = lesson.ageCategory
    ? (AGE_LABELS[lesson.ageCategory] ?? lesson.ageCategory)
    : null;

  const meta = [lesson.topic || null, lesson.level || null, ageLabel].filter(Boolean).join(' · ');

  const LevelIcon = LEVEL_ICONS[lesson.level as ELevel] ?? BookOpen;

  return (
    <button
      type="button"
      onClick={() => router.push(`${EAppRoutes.LESSONS}/${lesson.id}`)}
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
