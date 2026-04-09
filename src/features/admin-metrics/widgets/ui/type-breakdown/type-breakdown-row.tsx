'use client';

import { cn } from '@/shared/lib/cn';

import { TYPE_BREAKDOWN_COLS } from './type-breakdown.columns';

type Row = {
  type: string;
  attemptsStarted: number;
  attemptsCompleted: number;
  completionRate: number;
};

function pct(x: number) {
  return `${Math.round(x * 100)}%`;
}

export function TypeBreakdownRow({
  row,
  variant = 'table',
}: {
  row: Row;
  variant?: 'table' | 'card';
}) {
  const rate = pct(row.completionRate);

  if (variant === 'table') {
    return (
      <div className="px-6 py-3">
        <div className={cn('grid items-center gap-4', TYPE_BREAKDOWN_COLS)}>
          <div className="min-w-0">
            <div className="ui-title truncate">{row.type}</div>
          </div>

          <div className="ui-meta text-right tabular-nums">{row.attemptsStarted}</div>
          <div className="ui-meta text-right tabular-nums">{row.attemptsCompleted}</div>

          <div className="flex justify-end">
            <span className={cn('ui-pill tabular-nums', row.completionRate < 0.5 && 'opacity-80')}>
              {rate}
            </span>
          </div>
        </div>
      </div>
    );
  }

  // mobile card
  return (
    <div className="ui-card ui-radius-card ui-focus block px-5 sm:px-6 py-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="ui-title truncate">{row.type}</div>
          <div className="mt-2 grid gap-1">
            <div className="ui-meta">
              <span className="text-muted-foreground">Started: </span>
              <span className="text-foreground/80 tabular-nums">{row.attemptsStarted}</span>
            </div>
            <div className="ui-meta">
              <span className="text-muted-foreground">Completed: </span>
              <span className="text-foreground/80 tabular-nums">{row.attemptsCompleted}</span>
            </div>
          </div>
        </div>

        <span className="ui-pill tabular-nums">{rate}</span>
      </div>
    </div>
  );
}
