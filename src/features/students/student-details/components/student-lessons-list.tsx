'use client';

import type { StudentDashboard } from '@/features/students/utils/types';
import { Card } from '@/components/ui/card';
import { StudentLessonRow } from '@/features/students/student-details/components/student-lesson-row';

export default function StudentLessonsList({ lessons }: { lessons: StudentDashboard['lessons'] }) {
  return (
    <div className="grid gap-3">
      {/* Desktop/table */}
      <div className="hidden sm:block">
        <div className="ui-panel overflow-hidden">
          <div className="sticky top-0 z-10 border-b border-border/60 bg-background/80 backdrop-blur">
            <div className="px-6 py-3">
              <div className="grid items-center gap-4 grid-cols-[2fr_1.5fr_120px_100px]">
                <div className="ui-meta tracking-wide uppercase">Lesson</div>
                <div className="ui-meta tracking-wide uppercase">Topic</div>
                <div className="ui-meta tracking-wide uppercase text-right">Level</div>
                <div className="ui-meta tracking-wide uppercase text-right">Done</div>
              </div>
            </div>
          </div>

          <div className="divide-y divide-border/60 overflow-y-auto ui-scroll">
            {lessons.map((lesson) => (
              <StudentLessonRow key={lesson.id} lesson={lesson} variant="table" />
            ))}
          </div>
        </div>
      </div>

      {/* Mobile/cards */}
      <div className="grid gap-4 sm:hidden">
        {lessons.length === 0 ? (
          <Card className="ui-card ui-radius-card px-5 py-4">
            <div className="ui-meta">No lessons yet</div>
          </Card>
        ) : (
          lessons.map((lesson) => (
            <StudentLessonRow key={lesson.id} lesson={lesson} variant="card" />
          ))
        )}
      </div>
    </div>
  );
}
