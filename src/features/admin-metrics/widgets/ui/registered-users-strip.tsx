import { AdminMetricsOverviewResponseDto } from '@/entities/admin-metrics/api/get-admin-metrics-overview';
import { Card } from '@/shared/ui/card';

export function RegisteredUsersStrip({
  totals,
}: {
  totals: AdminMetricsOverviewResponseDto['totals'];
}) {
  return (
    <Card className="px-5 py-4 gap-0">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
        <div className="flex items-center gap-2 shrink-0">
          <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Registered Users
          </div>
          <span className="text-[10px] font-medium text-muted-foreground bg-muted rounded-full px-2 py-0.5 leading-none">
            All time
          </span>
        </div>

        <div className="flex items-center gap-6 text-sm">
          <span>
            <span className="text-xs text-muted-foreground">Students </span>
            <span className="font-semibold tabular-nums">
              {totals.totalRegisteredStudents.toLocaleString()}
            </span>
          </span>
          <span>
            <span className="text-xs text-muted-foreground">Teachers </span>
            <span className="font-semibold tabular-nums">
              {totals.totalRegisteredTeachers.toLocaleString()}
            </span>
          </span>
        </div>
      </div>
    </Card>
  );
}
