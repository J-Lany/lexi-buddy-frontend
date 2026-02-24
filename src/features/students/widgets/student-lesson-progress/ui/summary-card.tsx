import { formatDate } from '@/features/students/lib/helpers';
import { Card } from '@/shared/ui/card';
import { StudentAvatar } from '@/shared/ui/student-avatar';

export function SummaryCard({
  lessonTitle,
  student,
  overall,
}: {
  lessonTitle: string;
  student: {
    username: string | null;
    avatarUrl?: string | null;
  };
  overall: {
    completedCount: number;
    totalCount: number;
    avgScore: number | null;
    lastActivityAt: string | null;
  };
}) {
  const avgScoreLabel = typeof overall.avgScore === 'number' ? overall.avgScore.toFixed(2) : '—';

  const lastActivityLabel = formatDate(overall.lastActivityAt) ?? '—';

  return (
    <Card className="ui-card-static ui-radius-card px-5 sm:px-6 py-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-[20px] font-semibold truncate tracking-tight">{lessonTitle}</div>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Metric label="Done" value={`${overall.completedCount}/${overall.totalCount}`} />
            <Metric label="Avg score" value={avgScoreLabel} />
            <Metric label="Last activity" value={lastActivityLabel} />
          </div>
        </div>

        <StudentAvatar
          username={student.username ?? null}
          avatarUrl={student.avatarUrl ?? null}
          size={40}
        />
      </div>
    </Card>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0 rounded-2xl border border-border/30 bg-muted/[0.15] px-4 py-3">
      <div className="text-[12px] text-muted-foreground">{label}</div>
      <div className="mt-1 text-[14px] font-medium tabular-nums truncate" title={value}>
        {value}
      </div>
    </div>
  );
}
