'use client';

import { useRouter } from 'next/navigation';
import type { LucideIcon } from 'lucide-react';
import { BookOpen, BookOpenText, GraduationCap, Brain, Sparkles, Star } from 'lucide-react';

import { AGE_LABELS, ELevel, LessonSummary } from '@/features/lessons/create-lesson-modal/types';
import { EAppRoutes } from '@/lib/routes';

export type Lesson = LessonSummary;

const LEVEL_ICONS: Record<ELevel, LucideIcon> = {
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

  const metaParts = [lesson.topic || null, lesson.level || null, ageLabel].filter(
    Boolean,
  ) as string[];
  const meta = metaParts.join(' · ');

  const LevelIcon: LucideIcon | undefined =
    (lesson.level && LEVEL_ICONS[lesson.level as ELevel]) || undefined;

  const handleClick = () => {
    router.push(`${EAppRoutes.LESSONS}/${lesson.id}`);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={`Open lesson ${lesson.title}`}
      className="
        w-full text-left
        rounded-3xl
        bg-white/95 border border-white/80
        px-5 sm:px-6 py-4 sm:py-4.5
        shadow-[0_8px_24px_rgba(15,116,143,0.06)]
        transition
        hover:bg-sky-50/70
        active:translate-y-[1px] active:shadow-[0_4px_16px_rgba(15,116,143,0.06)]
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300
      "
    >
      <div className="flex items-start gap-3 sm:gap-4">
        {/* level thumbnail */}
        <div
          className="
            mt-0.5
            flex h-8 w-8 sm:h-9 sm:w-9
            items-center justify-center
            rounded-2xl
            bg-sky-50 text-sky-700
            shrink-0
          "
        >
          {LevelIcon && <LevelIcon size={18} strokeWidth={2} />}
        </div>

        {/* content */}
        <div className="flex-1 min-w-0">
          {/* 1-я строка: title + stats */}
          <div className="flex items-start justify-between gap-3">
            <span className="font-semibold text-[15px] sm:text-[16px] truncate">
              {lesson.title}
            </span>

            <span className="text-[12px] sm:text-sm font-medium text-slate-900 whitespace-nowrap">
              {stats}
            </span>
          </div>

          {/* 2-я строка: topic · level · age */}
          {meta && (
            <div className="mt-1 text-[11px] sm:text-xs text-muted-foreground leading-snug truncate">
              {meta}
            </div>
          )}
        </div>
      </div>
    </button>
  );
}
