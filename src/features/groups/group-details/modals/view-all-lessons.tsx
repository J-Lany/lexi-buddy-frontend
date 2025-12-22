'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import type { GroupLesson } from '@/features/groups/utils/types';
import { LessonCard } from '@/features/groups/group-details/components/lesson-card';

export function ViewAllLessonsDialog({
  lessons,
  title = 'All lessons',
}: {
  lessons: GroupLesson[];
  title?: string;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {lessons.length > 2 && (
          <Button variant="ghost" className="ml-auto">
            View all
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="max-w-lg sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[70vh] pr-4">
          <div className="grid gap-4 sm:grid-cols-2">
            {lessons.length === 0 ? (
              <div className="text-sm text-muted-foreground">Nothing here</div>
            ) : (
              lessons.map((l) => <LessonCard key={l.id} lesson={l} />)
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
