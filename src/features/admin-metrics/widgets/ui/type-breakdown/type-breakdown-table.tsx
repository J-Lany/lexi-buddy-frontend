'use client';

import * as React from 'react';

import { AdminMetricsDailyResponseDto } from '@/entities/admin-metrics/api/get-admin-metrics-daily';
import { AdminMetricsOverviewResponseDto } from '@/entities/admin-metrics/api/get-admin-metrics-overview';
import { cn } from '@/shared/lib/cn';
import { ResponsiveTableLayout } from '@/shared/ui/responsive-table-layout';

import { TYPE_BREAKDOWN_COLS } from './type-breakdown.columns';
import { BreakdownRowData, TypeBreakdownRow } from './type-breakdown-row';

type OverviewRow = AdminMetricsOverviewResponseDto['byAssignmentType'][number];
type SortKey = 'attemptsStarted' | 'attemptsCompleted' | 'completionRate';

function buildSparkMap(
  byTypeSeries: AdminMetricsDailyResponseDto['byAssignmentTypeSeries'],
): Map<string, number[]> {
  const map = new Map<string, number[]>();
  for (const s of byTypeSeries) {
    map.set(
      s.type,
      s.points.map((p) => p.attemptsCompleted),
    );
  }
  return map;
}

type SortHeaderCellProps = {
  label: string;
  align?: 'left' | 'right';
  sortKey?: SortKey;
  currentSort: SortKey;
  dir: 'asc' | 'desc';
  onSort: (key: SortKey) => void;
};

function SortHeaderCell({
  label,
  align = 'left',
  sortKey,
  currentSort,
  dir,
  onSort,
}: SortHeaderCellProps) {
  const active = sortKey !== undefined && currentSort === sortKey;
  const baseCls = cn(
    'ui-meta tracking-wide uppercase',
    align === 'right' && 'text-right',
    active && 'text-foreground',
  );

  if (!sortKey) {
    return <div className={baseCls}>{label}</div>;
  }

  return (
    <button
      type="button"
      onClick={() => onSort(sortKey)}
      className={cn(
        baseCls,
        'cursor-pointer hover:text-foreground transition-colors',
        align === 'right' && 'w-full block',
      )}
    >
      {label}
      {active && (
        <span className="ml-0.5" style={{ color: 'var(--color-primary)' }}>
          {dir === 'desc' ? ' ↓' : ' ↑'}
        </span>
      )}
    </button>
  );
}

export function TypeBreakdownTable({
  rows,
  byAssignmentTypeSeries,
}: {
  rows: OverviewRow[];
  byAssignmentTypeSeries: AdminMetricsDailyResponseDto['byAssignmentTypeSeries'];
}) {
  const [sortBy, setSortBy] = React.useState<SortKey>('attemptsStarted');
  const [sortDir, setSortDir] = React.useState<'asc' | 'desc'>('desc');

  const sparkMap = React.useMemo(
    () => buildSparkMap(byAssignmentTypeSeries),
    [byAssignmentTypeSeries],
  );

  const sorted = React.useMemo<BreakdownRowData[]>(
    () =>
      [...rows]
        .sort((a, b) => {
          const diff = a[sortBy] - b[sortBy];
          return sortDir === 'desc' ? -diff : diff;
        })
        .map((row) => ({ ...row, sparkPoints: sparkMap.get(row.type) })),
    [rows, sortBy, sortDir, sparkMap],
  );

  const toggleSort = (key: SortKey) => {
    if (sortBy === key) setSortDir((d) => (d === 'desc' ? 'asc' : 'desc'));
    else {
      setSortBy(key);
      setSortDir('desc');
    }
  };

  if (rows.length === 0) {
    return (
      <div className="ui-panel flex items-center justify-center py-12">
        <p className="text-sm text-muted-foreground">No assignment type data available.</p>
      </div>
    );
  }

  const header = (
    <div className={cn('grid items-center gap-4', TYPE_BREAKDOWN_COLS)}>
      <SortHeaderCell label="TYPE" currentSort={sortBy} dir={sortDir} onSort={toggleSort} />
      <SortHeaderCell
        label="STARTED"
        align="right"
        sortKey="attemptsStarted"
        currentSort={sortBy}
        dir={sortDir}
        onSort={toggleSort}
      />
      <SortHeaderCell
        label="COMPLETED"
        align="right"
        sortKey="attemptsCompleted"
        currentSort={sortBy}
        dir={sortDir}
        onSort={toggleSort}
      />
      <SortHeaderCell
        label="RATE"
        align="right"
        sortKey="completionRate"
        currentSort={sortBy}
        dir={sortDir}
        onSort={toggleSort}
      />
      <div className="ui-meta tracking-wide uppercase text-right">30D</div>
    </div>
  );

  return (
    <ResponsiveTableLayout
      header={header}
      desktopBody={sorted.map((row) => (
        <div key={row.type} className="divide-y divide-border/60">
          <TypeBreakdownRow row={row} variant="table" />
        </div>
      ))}
      mobileBody={sorted.map((row) => (
        <TypeBreakdownRow key={row.type} row={row} variant="card" />
      ))}
    />
  );
}
