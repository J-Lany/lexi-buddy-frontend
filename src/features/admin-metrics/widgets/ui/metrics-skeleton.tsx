import { Skeleton } from '@/shared/ui/skeleton';

export function MetricsSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-10 w-48" />
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        <Skeleton className="h-[92px]" />
        <Skeleton className="h-[92px]" />
        <Skeleton className="h-[92px]" />
      </div>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
        <Skeleton className="h-[92px]" />
        <Skeleton className="h-[92px]" />
        <Skeleton className="h-[92px]" />
        <Skeleton className="h-[92px]" />
      </div>
      <Skeleton className="h-40" />
      <Skeleton className="h-[220px]" />
    </div>
  );
}
