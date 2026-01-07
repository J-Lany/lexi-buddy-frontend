'use client';

import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { LessonTable } from '@/features/lessons/lessons-table/components/lesson-table';
import { CreateLessonModal } from '@/features/lessons/create-lesson-modal/create-lesson-modal';
import { Skeleton } from '@/components/ui/skeleton';
import { useGetLessons } from '@/features/lessons/create-lesson-modal/hooks/use-get-lessons';
import { SegmentedControl } from '@/components/ui/segmented-control';
import { EStudentsTab, STUDENTS_TABS } from '@/features/students/utils/consts';

export function LessonsFragment() {
  const { data, isLoading, isError } = useGetLessons();
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    if (!data) return [];
    const q = search.trim().toLowerCase();
    if (!q) return data;

    return data.filter((lesson) => {
      return (
        lesson.title.toLowerCase().includes(q) ||
        (lesson.topic && lesson.topic.toLowerCase().includes(q))
      );
    });
  }, [data, search]);

  return (
    <section className="flex flex-col gap-4">
      <div className="ui-panel ui-radius-card p-4 sm:p-5">
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap items-stretch sm:items-center gap-3 min-w-0">
            <Input
              placeholder="Search lessons"
              className="w-full sm:flex-1 sm:min-w-[260px] sm:w-auto sm:max-w-[clamp(320px,40vw,560px)]"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className="w-full sm:w-auto shrink-0">
              {' '}
              <CreateLessonModal />
            </div>
          </div>
        </div>
      </div>

      {isLoading && (
        <div className="space-y-3">
          <Skeleton className="h-12 rounded-2xl" />
          <Skeleton className="h-12 rounded-2xl" />
          <Skeleton className="h-12 rounded-2xl" />
        </div>
      )}

      {isError && !isLoading && <div className="text-sm text-red-600">Failed to load lessons</div>}

      {data && !isLoading && filtered.length === 0 && (
        <div className="text-sm text-muted-foreground">No lessons found</div>
      )}

      {filtered.length > 0 && <LessonTable lessons={filtered} />}
    </section>
  );
}
