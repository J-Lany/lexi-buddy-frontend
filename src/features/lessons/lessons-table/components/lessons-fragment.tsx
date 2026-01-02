'use client';

import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { LessonTable } from '@/features/lessons/lessons-table/components/lesson-table';
import { CreateLessonModal } from '@/features/lessons/create-lesson-modal/create-lesson-modal';
import { Skeleton } from '@/components/ui/skeleton';
import { useGetLessons } from '@/features/lessons/create-lesson-modal/hooks/use-get-lessons';

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
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold">Lessons</h1>
        <CreateLessonModal />
      </div>

      <Input
        placeholder="Search lessons"
        className="w-full md:w-[384px]"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

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
