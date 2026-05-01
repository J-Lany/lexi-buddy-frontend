import { AdminMetricsOverviewResponseDto } from '@/entities/admin-metrics/api/get-admin-metrics-overview';
import { Card } from '@/shared/ui/card';

export function TeacherActivityStrip({
  teachers,
}: {
  teachers: AdminMetricsOverviewResponseDto['teachers'];
}) {
  const { dau, wau, mau } = teachers;
  const base = Math.max(1, mau);

  // Stacked segments: DAU (solid), WAU-only (mid), MAU-only (faint)
  const dauPct = (dau / base) * 100;
  const wauOnlyPct = ((wau - dau) / base) * 100;
  const mauOnlyPct = ((mau - wau) / base) * 100;

  return (
    <Card className="px-5 py-4 gap-0">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
        <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide shrink-0">
          Teacher Activity
        </div>

        <div className="flex items-center gap-5 text-sm">
          <span>
            <span className="text-xs text-muted-foreground">DAU </span>
            <span className="font-semibold tabular-nums">{dau}</span>
          </span>
          <span>
            <span className="text-xs text-muted-foreground">WAU </span>
            <span className="font-semibold tabular-nums">{wau}</span>
          </span>
          <span>
            <span className="text-xs text-muted-foreground">MAU </span>
            <span className="font-semibold tabular-nums">{mau}</span>
          </span>
        </div>

        <div className="flex-1 min-w-0">
          <div className="h-2 w-full sm:max-w-[180px] rounded-full overflow-hidden bg-muted flex">
            <div
              className="h-full bg-primary"
              style={{ width: `${dauPct}%` }}
              title={`DAU: ${dau}`}
            />
            <div
              className="h-full bg-primary opacity-40"
              style={{ width: `${Math.max(0, wauOnlyPct)}%` }}
              title={`WAU (non-daily): ${wau - dau}`}
            />
            <div
              className="h-full bg-primary opacity-15"
              style={{ width: `${Math.max(0, mauOnlyPct)}%` }}
              title={`MAU (non-weekly): ${mau - wau}`}
            />
          </div>
        </div>
      </div>
    </Card>
  );
}
