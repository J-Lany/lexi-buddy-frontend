import { Skeleton } from '@/shared/ui/skeleton';

function LessonRowSkeleton() {
  return (
    <div className="ui-card ui-radius-card w-full px-5 sm:px-6 py-4">
      <div className="flex items-start gap-3 sm:gap-4">
        <Skeleton className="h-9 w-9 rounded-2xl shrink-0" />
        <div className="flex-1 min-w-0 space-y-2">
          <div className="flex items-start justify-between gap-3">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-3 w-20 shrink-0" />
          </div>
          <Skeleton className="h-3 w-56" />
        </div>
      </div>
    </div>
  );
}

export function LessonsListSkeleton() {
  return (
    <div className="w-full flex">
      <div className="grid gap-4 w-full max-w-6xl grid-cols-1 xl:grid-cols-2">
        <LessonRowSkeleton />
        <LessonRowSkeleton />
        <LessonRowSkeleton />
        <LessonRowSkeleton />
      </div>
    </div>
  );
}
