'use client';

import * as React from 'react';

import { AdminMetricsDailyResponseDto } from '@/entities/admin-metrics/api/get-admin-metrics-daily';
import { Button } from '@/shared/ui/button';
import { Card } from '@/shared/ui/card';

type Mode = 'attempts' | 'students';

const SVG_W = 520;
const SVG_H = 190;
const PAD_T = 12;
const PAD_B = 32;
const PAD_L = 44;
const PAD_R = 12;
const DRAW_W = SVG_W - PAD_L - PAD_R;
const DRAW_H = SVG_H - PAD_T - PAD_B;

function xAt(i: number, len: number): number {
  return PAD_L + (len <= 1 ? 0 : (i / (len - 1)) * DRAW_W);
}

function buildPaths(points: number[], max: number): { line: string; area: string } {
  if (points.length === 0) return { line: '', area: '' };
  const yAt = (v: number) => PAD_T + (1 - v / max) * DRAW_H;
  const len = points.length;
  const segs = points.map(
    (v, i) => `${i === 0 ? 'M' : 'L'} ${xAt(i, len).toFixed(1)} ${yAt(v).toFixed(1)}`,
  );
  const line = segs.join(' ');
  const bottom = (PAD_T + DRAW_H).toFixed(1);
  const area = `${line} L ${xAt(len - 1, len).toFixed(1)} ${bottom} L ${PAD_L.toFixed(1)} ${bottom} Z`;
  return { line, area };
}

export function ActivityChart({
  daily,
  rangeDays,
}: {
  daily: AdminMetricsDailyResponseDto | null;
  rangeDays: number;
}) {
  const [mode, setMode] = React.useState<Mode>('attempts');
  const [hoverIdx, setHoverIdx] = React.useState<number | null>(null);

  if (!daily || daily.series.length === 0) {
    return (
      <Card className="p-5 gap-0 flex items-center justify-center h-[240px]">
        <p className="text-sm text-muted-foreground">No activity data</p>
      </Card>
    );
  }

  const { series } = daily;
  const len = series.length;

  const s1 =
    mode === 'attempts'
      ? series.map((p) => p.attemptsStarted)
      : series.map((p) => p.uniqueStudentsStarted);

  const s2 =
    mode === 'attempts'
      ? series.map((p) => p.attemptsCompleted)
      : series.map((p) => p.uniqueStudentsCompleted);

  const max = Math.max(1, ...s1, ...s2);
  const { line: line1, area: area1 } = buildPaths(s1, max);
  const { line: line2, area: area2 } = buildPaths(s2, max);

  const gridTicks = [0.25, 0.5, 0.75, 1].map((t) => ({
    value: Math.round(t * max),
    y: PAD_T + (1 - t) * DRAW_H,
  }));

  const step = Math.max(1, Math.ceil(len / 6));
  const xLabels = series
    .map((p, i) => ({ i, label: p.date.slice(5) }))
    .filter(({ i }) => i % step === 0 || i === len - 1);

  const hovered = hoverIdx !== null ? series[hoverIdx] : null;
  const colWidth = DRAW_W / len;

  return (
    <Card className="p-5 gap-0">
      <div className="flex items-start justify-between gap-2 mb-3">
        <div>
          <div className="font-medium text-sm">{rangeDays}d Activity</div>
          <div className="text-xs text-muted-foreground mt-0.5">
            {mode === 'attempts'
              ? 'Attempts started vs completed'
              : 'Unique students started vs completed'}
          </div>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <Button
            size="sm"
            variant={mode === 'attempts' ? 'default' : 'outline'}
            className="h-7 px-3 text-xs"
            onClick={() => setMode('attempts')}
          >
            Attempts
          </Button>
          <Button
            size="sm"
            variant={mode === 'students' ? 'default' : 'outline'}
            className="h-7 px-3 text-xs"
            onClick={() => setMode('students')}
          >
            Students
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-4 mb-2">
        <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <span className="inline-block w-3 h-px bg-primary opacity-40" />
          {mode === 'attempts' ? 'Started' : 'Unique started'}
        </span>
        <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <span
            className="inline-block w-3 h-0.5 rounded-full"
            style={{ background: 'var(--color-primary)' }}
          />
          {mode === 'attempts' ? 'Completed' : 'Unique completed'}
        </span>
      </div>

      <div className="relative" onMouseLeave={() => setHoverIdx(null)}>
        <svg
          viewBox={`0 0 ${SVG_W} ${SVG_H}`}
          className="w-full h-auto"
          style={{ overflow: 'visible' }}
        >
          <defs>
            <linearGradient id="act-grad1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.12" />
              <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="act-grad2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.28" />
              <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Y-axis gridlines + labels */}
          {gridTicks.map(({ value, y }, i) => (
            <g key={i}>
              <line
                x1={PAD_L}
                x2={SVG_W - PAD_R}
                y1={y}
                y2={y}
                stroke="var(--color-border)"
                strokeWidth="0.5"
                strokeDasharray="3 4"
              />
              <text
                x={PAD_L - 6}
                y={y + 4}
                textAnchor="end"
                fontSize="9"
                fill="var(--color-muted-foreground)"
              >
                {value}
              </text>
            </g>
          ))}

          {/* Baseline */}
          <line
            x1={PAD_L}
            x2={SVG_W - PAD_R}
            y1={PAD_T + DRAW_H}
            y2={PAD_T + DRAW_H}
            stroke="var(--color-border)"
            strokeWidth="0.5"
          />

          {/* Area fills */}
          {area1 && <path d={area1} fill="url(#act-grad1)" />}
          {area2 && <path d={area2} fill="url(#act-grad2)" />}

          {/* Lines */}
          {line1 && (
            <path
              d={line1}
              fill="none"
              stroke="var(--color-primary)"
              strokeWidth="1.5"
              strokeOpacity="0.4"
            />
          )}
          {line2 && <path d={line2} fill="none" stroke="var(--color-primary)" strokeWidth="2" />}

          {/* Hover cursor */}
          {hoverIdx !== null && (
            <line
              x1={xAt(hoverIdx, len)}
              x2={xAt(hoverIdx, len)}
              y1={PAD_T}
              y2={PAD_T + DRAW_H}
              stroke="var(--color-muted-foreground)"
              strokeWidth="1"
              strokeDasharray="3 3"
            />
          )}

          {/* X-axis labels */}
          {xLabels.map(({ i, label }) => (
            <text
              key={i}
              x={xAt(i, len)}
              y={SVG_H - 4}
              textAnchor="middle"
              fontSize="9"
              fill="var(--color-muted-foreground)"
            >
              {label}
            </text>
          ))}

          {/* Invisible hover hit areas */}
          {series.map((_, i) => (
            <rect
              key={i}
              x={xAt(i, len) - colWidth / 2}
              y={PAD_T}
              width={colWidth}
              height={DRAW_H}
              fill="transparent"
              onMouseEnter={() => setHoverIdx(i)}
            />
          ))}
        </svg>

        {hovered !== null && hoverIdx !== null && (
          <div
            className="pointer-events-none absolute top-2 z-10 rounded-lg border bg-popover px-3 py-2 text-xs shadow-md"
            style={{
              left: `${(xAt(hoverIdx, len) / SVG_W) * 100}%`,
              transform: hoverIdx > len * 0.65 ? 'translateX(-110%)' : 'translateX(8px)',
            }}
          >
            <div className="font-medium mb-1 text-popover-foreground">{hovered.date}</div>
            <div className="text-muted-foreground">
              {mode === 'attempts' ? 'Started' : 'Uniq. started'}:{' '}
              <span className="text-popover-foreground tabular-nums font-medium">
                {mode === 'attempts' ? hovered.attemptsStarted : hovered.uniqueStudentsStarted}
              </span>
            </div>
            <div className="text-muted-foreground">
              {mode === 'attempts' ? 'Completed' : 'Uniq. completed'}:{' '}
              <span className="tabular-nums font-medium" style={{ color: 'var(--color-primary)' }}>
                {mode === 'attempts' ? hovered.attemptsCompleted : hovered.uniqueStudentsCompleted}
              </span>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
