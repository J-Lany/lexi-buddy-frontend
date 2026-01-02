import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatDate } from '@/features/students/utils/helpers';
import type { StudentDashboard } from '@/features/students/utils/types';

export default function StudentStatsGrid({
  stats,
  lessonsTotal,
}: {
  stats: StudentDashboard['stats'];
  lessonsTotal: number;
}) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      <Card className="rounded-2xl">
        <CardHeader className="pb-2">
          <CardTitle className="text-xs font-medium text-muted-foreground">Lessons</CardTitle>
        </CardHeader>
        <CardContent className="text-2xl font-semibold">{lessonsTotal}</CardContent>
      </Card>

      <Card className="rounded-2xl">
        <CardHeader className="pb-2">
          <CardTitle className="text-xs font-medium text-muted-foreground">Assignments</CardTitle>
        </CardHeader>
        <CardContent className="text-2xl font-semibold">
          {stats.assignmentsDone}/{stats.assignmentsTotal}
        </CardContent>
      </Card>

      <Card className="rounded-2xl">
        <CardHeader className="pb-2">
          <CardTitle className="text-xs font-medium text-muted-foreground">Avg score</CardTitle>
        </CardHeader>
        <CardContent className="text-2xl font-semibold">
          {typeof stats.avgScore === 'number' ? stats.avgScore.toFixed(2) : '—'}
        </CardContent>
      </Card>

      <Card className="rounded-2xl">
        <CardHeader className="pb-2">
          <CardTitle className="text-xs font-medium text-muted-foreground">
            Last submission
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm font-medium text-foreground">
          {formatDate(stats.lastSubmittedAt) ?? '—'}
        </CardContent>
      </Card>
    </div>
  );
}
