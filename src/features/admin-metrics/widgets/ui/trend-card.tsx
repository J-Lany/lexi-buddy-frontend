import { AdminMetricsDailyResponseDto } from '@/entities/admin-metrics/api/get-admin-metrics-daily';
import { Button } from '@/shared/ui/button';
import { Card } from '@/shared/ui/card';
import { Skeleton } from '@/shared/ui/skeleton';

import { MiniLineChart } from './mini-line-chart';

type Props = {
  daily: AdminMetricsDailyResponseDto | null;
  mode: 'started' | 'completed';
  onModeChange: (m: 'started' | 'completed') => void;
};

export function TrendCard({ daily, mode, onModeChange }: Props) {
  const points = daily
    ? daily.series.map((p) => (mode === 'completed' ? p.attemptsCompleted : p.attemptsStarted))
    : [];

  return (
    <Card className="p-4 space-y-3">
      <div className="flex items-center justify-between gap-2">
        <div>
          <div className="font-medium">30d trend</div>
          <div className="text-xs text-muted-foreground">
            {mode === 'completed' ? 'Attempts completed/day' : 'Attempts started/day'}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant={mode === 'completed' ? 'default' : 'outline'}
            onClick={() => onModeChange('completed')}
          >
            Completed
          </Button>
          <Button
            size="sm"
            variant={mode === 'started' ? 'default' : 'outline'}
            onClick={() => onModeChange('started')}
          >
            Started
          </Button>
        </div>
      </div>

      {!daily ? <Skeleton className="h-[120px]" /> : <MiniLineChart points={points} />}
    </Card>
  );
}
