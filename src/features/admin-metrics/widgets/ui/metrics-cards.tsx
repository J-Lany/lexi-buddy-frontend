import { AdminMetricsOverviewResponseDto } from '@/entities/admin-metrics/api/get-admin-metrics-overview';
import { Card } from '@/shared/ui/card';

function StatCard({ title, value }: { title: string; value: string }) {
  return (
    <Card className="p-4">
      <div className="text-sm text-muted-foreground">{title}</div>
      <div className="mt-1 text-2xl font-semibold">{value}</div>
    </Card>
  );
}

export function MetricsCards({ overview }: { overview: AdminMetricsOverviewResponseDto }) {
  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
      <StatCard
        title="Teachers DAU / WAU / MAU"
        value={`${overview.teachers.dau} / ${overview.teachers.wau} / ${overview.teachers.mau}`}
      />
      <StatCard
        title="Students started DAU / WAU / MAU"
        value={`${overview.students.started.dau} / ${overview.students.started.wau} / ${overview.students.started.mau}`}
      />
      <StatCard
        title="Students completed DAU / WAU / MAU"
        value={`${overview.students.completed.dau} / ${overview.students.completed.wau} / ${overview.students.completed.mau}`}
      />
    </div>
  );
}
