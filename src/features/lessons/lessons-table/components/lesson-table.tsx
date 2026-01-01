'use client';

import { LessonRow } from './lesson-row';
import { LessonSummary } from '@/features/lessons/create-lesson-modal/types';
export function LessonTable({ lessons }: { lessons: LessonSummary[] }) {
  return (
    <div className="w-full flex">
      <div
        className="
          grid gap-4
          w-full max-w-6xl
          grid-cols-1
          xl:grid-cols-2
        "
      >
        {lessons.map((lesson) => (
          <LessonRow key={lesson.id} lesson={lesson} />
        ))}
      </div>
    </div>
  );
}
