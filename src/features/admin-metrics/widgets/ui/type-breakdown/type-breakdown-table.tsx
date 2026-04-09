'use client';

import { ResponsiveTableLayout } from '@/shared/ui/responsive-table-layout';
import { TableHeader } from '@/shared/ui/table-header';

import { TYPE_BREAKDOWN_COLS, TYPE_BREAKDOWN_COLUMNS } from './type-breakdown.columns';
import { TypeBreakdownRow } from './type-breakdown-row';

type Row = {
  type: string;
  attemptsStarted: number;
  attemptsCompleted: number;
  completionRate: number;
};

export function TypeBreakdownTable({ rows }: { rows: Row[] }) {
  return (
    <ResponsiveTableLayout
      header={<TableHeader columns={TYPE_BREAKDOWN_COLUMNS} colsClassName={TYPE_BREAKDOWN_COLS} />}
      desktopBody={rows.map((row) => (
        <div key={row.type} className="divide-y divide-border/60">
          <TypeBreakdownRow row={row} variant="table" />
        </div>
      ))}
      mobileBody={rows.map((row) => (
        <TypeBreakdownRow key={row.type} row={row} variant="card" />
      ))}
    />
  );
}
