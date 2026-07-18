'use client';

import { cn } from '@/shared/lib/cn';
import { ResponsiveTableLayout } from '@/shared/ui/responsive-table-layout';
import { Skeleton } from '@/shared/ui/skeleton';
import { TableHeader } from '@/shared/ui/table-header';

import { STUDENTS_TABLE_COLS, STUDENTS_TABLE_COLUMNS } from './students-table.columns';

type Props = {
  rows?: number;
};

export function StudentsTableSkeleton({ rows = 8 }: Props) {
  return (
    <ResponsiveTableLayout
      header={<TableHeader colsClassName={STUDENTS_TABLE_COLS} columns={STUDENTS_TABLE_COLUMNS} />}
      desktopBody={
        <div className="divide-y divide-border/60">
          {Array.from({ length: rows }).map((_, i) => (
            <StudentTableRowSkeleton key={i} />
          ))}
        </div>
      }
      mobileBody={
        <div className="grid gap-4">
          {Array.from({ length: Math.min(rows, 6) }).map((_, i) => (
            <StudentCardSkeleton key={i} />
          ))}
        </div>
      }
    />
  );
}

function StudentTableRowSkeleton() {
  return (
    <div className="px-6 py-4">
      <div className={cn('grid items-center gap-4', STUDENTS_TABLE_COLS)}>
        <div className="flex items-center gap-3 min-w-0">
          <Skeleton className="h-9 w-9 rounded-full shrink-0" />
          <div className="min-w-0 flex-1">
            <Skeleton className="h-4 w-[60%]" />
            <Skeleton className="mt-2 h-3 w-[38%]" />
          </div>
        </div>

        <Skeleton className="h-4 w-[70%]" />
        <Skeleton className="h-4 w-[65%]" />

        <div className="flex justify-end">
          <Skeleton className="h-6 w-12 rounded-md" />
        </div>
      </div>
    </div>
  );
}

function StudentCardSkeleton() {
  return (
    <div className="ui-panel p-4">
      <div className="flex items-start gap-3">
        <Skeleton className="h-10 w-10 rounded-full shrink-0" />

        <div className="flex-1 min-w-0">
          <Skeleton className="h-4 w-[55%]" />
          <Skeleton className="mt-2 h-3 w-[40%]" />

          <div className="mt-4 grid gap-2">
            <div className="flex items-center justify-between gap-3">
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-4 w-32" />
            </div>

            <div className="flex items-center justify-between gap-3">
              <Skeleton className="h-3 w-14" />
              <Skeleton className="h-4 w-28" />
            </div>

            <div className="flex items-center justify-between gap-3">
              <Skeleton className="h-3 w-12" />
              <Skeleton className="h-6 w-12 rounded-md" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
