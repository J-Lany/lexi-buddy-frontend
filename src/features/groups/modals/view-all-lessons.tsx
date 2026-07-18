'use client';

import * as React from 'react';

import { GroupLesson } from '@/entities/groups/api/get-group-dashboard';
import { LessonCard } from '@/features/groups/widgets/group-details/ui/group-lessons-list/lesson-card';
import { Button } from '@/shared/ui/button';
import { ResponsiveModal } from '@/shared/ui/responsive-modal';

export function ViewAllLessonsDialog({
  lessons,
  title = 'All lessons',
}: {
  lessons: GroupLesson[];
  title?: string;
}) {
  if (lessons.length <= 2) return null;

  return (
    <ResponsiveModal
      trigger={
        <Button variant="ghost" className="ml-auto">
          View all
        </Button>
      }
      title={title}
    >
      {lessons.length === 0 ? (
        <div className="py-6 text-sm text-muted-foreground">Nothing here</div>
      ) : (
        <div className="grid gap-3 sm:gap-4 sm:grid-cols-2">
          {lessons.map((l) => (
            <LessonCard key={l.id} lesson={l} />
          ))}
        </div>
      )}
    </ResponsiveModal>
  );
}
