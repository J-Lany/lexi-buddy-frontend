import { formatDate } from '@/features/students/lib/helpers';
import { Card } from '@/shared/ui/card';
import { Dot } from '@/shared/ui/dot';
import { MetaPair } from '@/shared/ui/meta-pair';
import { StudentAvatar } from '@/shared/ui/student-avatar';

export function SummaryCard({
  lessonTitle,
  student,
  overall,
}: {
  lessonTitle: string;
  student: { username: string | null; avatarUrl?: string | null };
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
        <div className="min-w-0">
          <div className="ui-card-title truncate">{lessonTitle}</div>

          <div className="mt-1 ui-meta truncate">
            {student.username ? `@${student.username}` : 'Student'}
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-[12px] sm:text-[13px]">
            <MetaPair label="Done" value={`${overall.completedCount}/${overall.totalCount}`} />
            <Dot />
            <MetaPair label="Avg score" value={avgScoreLabel} />
            <Dot />
            <MetaPair label="Last activity" value={lastActivityLabel} />
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
