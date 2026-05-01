'use client';

import { cn } from '@/shared/lib/cn';

import { MiniLineChart } from '../mini-line-chart';
import { TYPE_BREAKDOWN_COLS } from './type-breakdown.columns';

export type BreakdownRowData = {
  type: string;
  attemptsStarted: number;
  attemptsCompleted: number;
  completionRate: number;
  sparkPoints?: number[];
};

function pct(x: number) {
  return `${Math.round(x * 100)}%`;
}

function rateBarColor(rate: number) {
  if (rate >= 0.8) return 'bg-[#2dc75c]';
  if (rate >= 0.6) return 'bg-amber-400';
  return 'bg-[#ff6464]';
}

function rateTextColor(rate: number) {
  if (rate >= 0.8) return 'text-[#2dc75c]';
  if (rate >= 0.6) return 'text-amber-500';
  return 'text-[#ff6464]';
}

export function TypeBreakdownRow({
  row,
  variant = 'table',
}: {
  row: BreakdownRowData;
  variant?: 'table' | 'card';
}) {
  const rateStr = pct(row.completionRate);

  if (variant === 'table') {
    return (
      <div className="px-6 py-3">
        <div className={cn('grid items-center gap-4', TYPE_BREAKDOWN_COLS)}>
          <div className="min-w-0">
            <div className="ui-title truncate">{row.type}</div>
          </div>

          <div className="ui-meta text-right tabular-nums">{row.attemptsStarted}</div>
          <div className="ui-meta text-right tabular-nums">{row.attemptsCompleted}</div>

          <div className="space-y-1">
            <div
              className={cn(
                'text-xs font-medium tabular-nums text-right',
                rateTextColor(row.completionRate),
              )}
            >
              {rateStr}
            </div>
            <div className="h-1.5 rounded-full bg-muted overflow-hidden">
              <div
                className={cn('h-full rounded-full', rateBarColor(row.completionRate))}
                style={{ width: rateStr }}
              />
            </div>
          </div>

          <div style={{ color: 'var(--color-primary)', opacity: 0.7 }}>
            {row.sparkPoints && row.sparkPoints.length > 1 ? (
              <MiniLineChart points={row.sparkPoints} height={30} />
            ) : (
              <div className="h-[30px]" />
            )}
          </div>
        </div>
      </div>
    );
  }

  // mobile card
  return (
    <div className="ui-card ui-radius-card ui-focus block px-5 sm:px-6 py-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
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
          {row.sparkPoints && row.sparkPoints.length > 1 && (
            <div className="mt-2" style={{ color: 'var(--color-primary)', opacity: 0.7 }}>
              <MiniLineChart points={row.sparkPoints} height={26} />
            </div>
          )}
        </div>

        <div className="text-right shrink-0">
          <div
            className={cn('text-sm font-semibold tabular-nums', rateTextColor(row.completionRate))}
          >
            {rateStr}
          </div>
          <div className="mt-1.5 h-1.5 w-14 rounded-full bg-muted overflow-hidden">
            <div
              className={cn('h-full rounded-full', rateBarColor(row.completionRate))}
              style={{ width: rateStr }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
