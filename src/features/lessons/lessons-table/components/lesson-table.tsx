'use client';

import { LessonRow } from './lesson-row';
import { LessonSummary } from '@/features/lessons/create-lesson-modal/types';

export function LessonTable({ lessons }: { lessons: LessonSummary[] }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="hidden sm:grid grid-cols-4 py-1 px-6 font-semibold bg-table-header rounded-full">
        <span>Title</span>
        <span>Topic</span>
        <span>Level / Age</span>
        <span>Stats</span>
      </div>
      <div className="flex flex-col gap-3">
        {lessons.map((lesson) => (
          <LessonRow key={lesson.id} lesson={lesson} />
        ))}
      </div>
    </div>
  );
}
