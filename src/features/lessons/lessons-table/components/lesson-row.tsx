'use client';

import { useRouter } from 'next/navigation';
import { LessonSummary } from '@/features/lessons/create-lesson-modal/types';
import { EAppRoutes } from '@/lib/routes';

export type Lesson = LessonSummary;

export function LessonRow({ lesson }: { lesson: Lesson }) {
  const router = useRouter();
  const statsText = `${lesson.vocabCount} words · ${lesson.assignmentsCount} tasks`;

  const handleClick = () => {
    router.push(`${EAppRoutes.LESSONS}/${lesson.id}`);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="
        w-full rounded-full bg-white/95 border border-white/80
        px-4 py-3 sm:px-6
        shadow-[0_8px_24px_rgba(15,116,143,0.06)]
        hover:bg-muted cursor-pointer
        transition
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300
      "
    >
      <div
        className="
          grid gap-y-1 gap-x-4
          text-left text-sm
          sm:grid-cols-[minmax(0,2.5fr)_minmax(0,2fr)_minmax(0,1.5fr)_minmax(0,1.5fr)]
          sm:items-center
        "
      >
        <div className="flex flex-col">
          <span className="font-medium truncate">{lesson.title}</span>
          <span className="text-xs text-muted-foreground sm:hidden">
            {lesson.topic || 'No topic'}
          </span>
        </div>

        <div className="hidden sm:block truncate text-sm text-muted-foreground">
          {lesson.topic || '—'}
        </div>

        <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
          {lesson.level && (
            <span className="inline-flex items-center justify-center rounded-full border border-sky-200 bg-sky-50 px-2.5 py-0.5 text-[11px] font-medium text-sky-800">
              {lesson.level}
            </span>
          )}
          {lesson.ageCategory && (
            <span className="truncate text-[11px] sm:text-xs uppercase tracking-wide text-muted-foreground/80">
              {lesson.ageCategory}
            </span>
          )}
        </div>

        <div className="text-xs sm:text-sm text-muted-foreground sm:text-right">{statsText}</div>
      </div>

      <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-muted-foreground sm:hidden">
        {lesson.topic && <span className="truncate">Topic: {lesson.topic}</span>}
        <span>{statsText}</span>
      </div>
    </button>
  );
}
