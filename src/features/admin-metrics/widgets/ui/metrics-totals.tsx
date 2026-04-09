import { pct } from '@/features/admin-metrics/lib/pct';
import { Card } from '@/shared/ui/card';

function StatCard({ title, value, hint }: { title: string; value: string; hint?: string }) {
  return (
    <Card className="p-4">
      <div className="text-sm text-muted-foreground">{title}</div>
      <div className="mt-1 text-2xl font-semibold">{value}</div>
      {hint ? <div className="mt-1 text-xs text-muted-foreground">{hint}</div> : null}
    </Card>
  );
}

type Totals = {
  lessonsCreated: number;
  assignmentsAssigned: number;
  assignmentAttemptsStarted: number;
  assignmentAttemptsCompleted: number;
  attemptCompletionRate: number;
};

export function MetricsTotals({ totals }: { totals: Totals }) {
  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
      <StatCard title="Lessons created" value={`${totals.lessonsCreated}`} />
      <StatCard title="Assigned" value={`${totals.assignmentsAssigned}`} />
      <StatCard title="Attempts started" value={`${totals.assignmentAttemptsStarted}`} />
      <StatCard
        title="Attempts completed"
        value={`${totals.assignmentAttemptsCompleted}`}
        hint={`Completion: ${pct(totals.attemptCompletionRate)}`}
      />
    </div>
  );
}
