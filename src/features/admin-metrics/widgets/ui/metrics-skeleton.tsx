import { Skeleton } from '@/shared/ui/skeleton';

export function MetricsSkeleton() {
  return (
    <div className="space-y-4">
      {/* Hero KPI row */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Skeleton className="h-[104px]" />
        <Skeleton className="h-[104px]" />
        <Skeleton className="h-[104px]" />
        <Skeleton className="h-[104px]" />
      </div>

      {/* Activity chart + engagement panel */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Skeleton className="lg:col-span-2 h-[268px]" />
        <Skeleton className="h-[268px]" />
      </div>

      {/* Teacher strip */}
      <Skeleton className="h-14" />

      {/* Breakdown table */}
      <Skeleton className="h-60" />
    </div>
  );
}
