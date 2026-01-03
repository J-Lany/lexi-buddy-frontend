'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import type { GroupLesson } from '@/features/groups/utils/types';
import { LessonCard } from '@/features/groups/group-details/components/lesson-card';
import { ResponsiveModal } from '@/components/ui/responsive-modal';

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
      subtitle={`${lessons.length} lessons`}
      desktopMaxWidthClassName="sm:max-w-2xl"
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
