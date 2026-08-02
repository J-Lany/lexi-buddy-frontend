'use client';

import {
  GROUPS_TABLE_COLS,
  GROUPS_TABLE_COLUMNS,
} from '@/features/groups/widgets/groups-list/ui/groups-table/groups-table.columns';
import { cn } from '@/shared/lib/cn';
import { ResponsiveTableLayout } from '@/shared/ui/responsive-table-layout';
import { Skeleton } from '@/shared/ui/skeleton';
import { TableHeader } from '@/shared/ui/table-header';

function TableRowSkeleton() {
  return (
    <div className="px-6 py-4">
      <div className={cn('grid items-center gap-4', GROUPS_TABLE_COLS)}>
        <div className="flex items-center gap-3 min-w-0">
          <Skeleton className="h-9 w-9 rounded-2xl shrink-0" />
          <div className="min-w-0 flex flex-col gap-2">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-3 w-24" />
          </div>
        </div>

        <Skeleton className="h-4 w-14" />

        <div className="flex justify-end">
          <Skeleton className="h-6 w-10 rounded-full" />
        </div>
      </div>
    </div>
  );
}

function CardRowSkeleton() {
  return (
    <div className="ui-card ui-radius-card px-5 sm:px-6 py-4">
      <div className="flex items-start gap-3 sm:gap-4">
        <Skeleton className="h-9 w-9 rounded-2xl shrink-0" />
        <div className="flex-1 min-w-0 space-y-2">
          <div className="flex items-start justify-between gap-3">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-5 w-8 rounded-full shrink-0" />
          </div>
          <Skeleton className="h-3 w-40" />
        </div>
      </div>
    </div>
  );
}

export function GroupsTableSkeleton() {
  return (
    <ResponsiveTableLayout
      header={<TableHeader columns={GROUPS_TABLE_COLUMNS} colsClassName={GROUPS_TABLE_COLS} />}
      desktopBody={
        <div className="divide-y divide-border/60">
          <TableRowSkeleton />
          <TableRowSkeleton />
          <TableRowSkeleton />
          <TableRowSkeleton />
        </div>
      }
      mobileBody={
        <div className="grid gap-4">
          <CardRowSkeleton />
          <CardRowSkeleton />
          <CardRowSkeleton />
        </div>
      }
    />
  );
}
