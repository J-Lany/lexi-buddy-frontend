import { AdminMetricsOverviewResponseDto } from '@/entities/admin-metrics/api/get-admin-metrics-overview';
import { Card } from '@/shared/ui/card';

function RatioBar({ part, total }: { part: number; total: number }) {
  const width = total > 0 ? Math.min(100, Math.round((part / total) * 100)) : 0;
  return (
    <div className="h-1 w-full rounded-full bg-muted overflow-hidden">
      <div
        className="h-full rounded-full bg-primary transition-all"
        style={{ width: `${width}%` }}
      />
    </div>
  );
}

function DauRow({
  label,
  started,
  completed,
}: {
  label: string;
  started: number;
  completed: number;
}) {
  return (
    <div className="grid grid-cols-[36px_1fr_1fr] items-center gap-2">
      <div className="text-xs font-medium text-muted-foreground">{label}</div>
      <div className="tabular-nums text-sm font-semibold">{started.toLocaleString()}</div>
      <div className="tabular-nums text-sm font-semibold">{completed.toLocaleString()}</div>
    </div>
  );
}

export function StudentEngagementPanel({
  students,
}: {
  students: AdminMetricsOverviewResponseDto['students'];
}) {
  const { started, completed } = students;

  return (
    <Card className="p-5 gap-0">
      <div className="font-medium text-sm mb-4">Student Engagement</div>

      <div className="grid grid-cols-[36px_1fr_1fr] items-center gap-2 mb-3">
        <div />
        <div className="text-xs text-muted-foreground uppercase tracking-wide">Started</div>
        <div className="text-xs text-muted-foreground uppercase tracking-wide">Completed</div>
      </div>

      <div className="space-y-2.5">
        <DauRow label="DAU" started={started.dau} completed={completed.dau} />
        <RatioBar part={completed.dau} total={started.dau} />

        <DauRow label="WAU" started={started.wau} completed={completed.wau} />
        <RatioBar part={completed.wau} total={started.wau} />

        <DauRow label="MAU" started={started.mau} completed={completed.mau} />
        <RatioBar part={completed.mau} total={started.mau} />
      </div>
    </Card>
  );
}
