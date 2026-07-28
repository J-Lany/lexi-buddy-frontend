'use client';

import { GROUPS_TABLE_COLS } from '@/features/groups/widgets/groups-list/ui/groups-table/groups-table.columns';
import { cn } from '@/shared/lib/cn';

function SkeletonRow() {
  return (
    <div className="px-6 py-4">
      <div className={cn('grid items-center gap-4', GROUPS_TABLE_COLS)}>
        <div className="flex items-center gap-3 min-w-0">
          <div className="h-9 w-9 rounded-2xl bg-muted animate-pulse" />
          <div className="min-w-0 flex flex-col gap-2">
            <div className="h-4 w-40 bg-muted animate-pulse rounded" />
            <div className="h-3 w-24 bg-muted animate-pulse rounded" />
          </div>
        </div>

        <div className="h-4 w-14 bg-muted animate-pulse rounded" />

        <div className="flex justify-end">
          <div className="h-6 w-10 bg-muted animate-pulse rounded-full" />
        </div>
      </div>
    </div>
  );
}

export function GroupsTableSkeleton() {
  return (
    <div className="hidden sm:block">
      <div className="ui-panel overflow-hidden">
        <div className="sticky top-0 z-10 border-b border-border/60 bg-background/80 backdrop-blur">
          <div className="px-6 py-3">
            <div className={cn('grid items-center gap-4', GROUPS_TABLE_COLS)}>
              <div className="h-3 w-16 bg-muted animate-pulse rounded" />
              <div className="h-3 w-12 bg-muted animate-pulse rounded" />
              <div className="h-3 w-16 bg-muted animate-pulse rounded ml-auto" />
            </div>
          </div>
        </div>

        <div className="divide-y divide-border/60">
          <SkeletonRow />
          <SkeletonRow />
          <SkeletonRow />
          <SkeletonRow />
        </div>
      </div>
    </div>
  );
}
