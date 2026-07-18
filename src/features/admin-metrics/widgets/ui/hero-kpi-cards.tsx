import { AdminMetricsDailyResponseDto } from '@/entities/admin-metrics/api/get-admin-metrics-daily';
import { AdminMetricsOverviewResponseDto } from '@/entities/admin-metrics/api/get-admin-metrics-overview';
import { pct } from '@/features/admin-metrics/lib/pct';
import { cn } from '@/shared/lib/cn';
import { Card } from '@/shared/ui/card';

import { DonutRing } from './donut-ring';
import { MiniLineChart } from './mini-line-chart';

function rateTextColor(rate: number) {
  if (rate >= 0.8) return 'text-[var(--success)]';
  if (rate >= 0.6) return 'text-amber-500';
  return 'text-[var(--danger)]';
}

function Sparkline({ points }: { points: number[] }) {
  if (points.length < 2) return <div className="w-20 h-10" />;
  return (
    <div className="w-20 h-10 text-primary">
      <MiniLineChart points={points} height={40} />
    </div>
  );
}

type Props = {
  overview: AdminMetricsOverviewResponseDto;
  daily: AdminMetricsDailyResponseDto | null;
};

export function HeroKpiCards({ overview, daily }: Props) {
  const rate = overview.totals.attemptCompletionRate;
  const series = daily?.series ?? [];

  const startedPoints = series.map((p) => p.attemptsStarted);
  const assignedPoints = series.map((p) => p.assignmentsAssigned);
  const lessonsPoints = series.map((p) => p.lessonsCreated);

  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      <Card className="ui-card-static ui-radius-card p-5 sm:p-6 gap-0">
        <div className="ui-meta">Completion Rate</div>
        <div className="mt-3 flex items-center justify-between gap-2">
          <div
            className={cn(
              'text-2xl font-semibold tracking-tight tabular-nums',
              rateTextColor(rate),
            )}
          >
            {pct(rate)}
          </div>
          <DonutRing rate={rate} size={52} strokeWidth={6} />
        </div>
      </Card>

      <Card className="ui-card-static ui-radius-card p-5 sm:p-6 gap-0">
        <div className="ui-meta">Attempts Started</div>
        <div className="mt-3 flex items-end justify-between gap-2">
          <div className="text-2xl font-semibold tracking-tight tabular-nums">
            {overview.totals.assignmentAttemptsStarted.toLocaleString()}
          </div>
          <Sparkline points={startedPoints} />
        </div>
      </Card>

      <Card className="ui-card-static ui-radius-card p-5 sm:p-6 gap-0">
        <div className="ui-meta">Assigned</div>
        <div className="mt-3 flex items-end justify-between gap-2">
          <div className="text-2xl font-semibold tracking-tight tabular-nums">
            {overview.totals.assignmentsAssigned.toLocaleString()}
          </div>
          <Sparkline points={assignedPoints} />
        </div>
      </Card>

      <Card className="ui-card-static ui-radius-card p-5 sm:p-6 gap-0">
        <div className="ui-meta">Lessons Created</div>
        <div className="mt-3 flex items-end justify-between gap-2">
          <div className="text-2xl font-semibold tracking-tight tabular-nums">
            {overview.totals.lessonsCreated.toLocaleString()}
          </div>
          <Sparkline points={lessonsPoints} />
        </div>
      </Card>
    </div>
  );
}
