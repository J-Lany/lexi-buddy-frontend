import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import type { StudentDashboard } from '@/features/students/api/use-get-student-dashboard';
import { formatDate } from '@/features/students/utils/helpers';

export default function StudentLessonItem({
  lesson,
}: {
  lesson: StudentDashboard['lessons'][number];
}) {
  return (
    <div
      className="
        rounded-xl border bg-white p-4 transition-colors
        sm:hover:bg-muted/40
      "
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="font-semibold truncate">{lesson.title}</div>
          <div className="mt-1 text-sm text-muted-foreground flex flex-wrap gap-2">
            {lesson.topic ? <span>{lesson.topic}</span> : null}
            {lesson.level ? <Badge variant="secondary">Level: {lesson.level}</Badge> : null}
            <span>Last: {formatDate(lesson.progress.lastSubmittedAt) ?? '—'}</span>
          </div>
        </div>

        <div className="shrink-0 text-right">
          <div className="text-sm text-muted-foreground">Progress</div>
          <div className="font-semibold">
            {lesson.progress.assignmentsDone}/{lesson.progress.assignmentsTotal}
          </div>
        </div>
      </div>

      <div className="mt-3 flex items-center gap-3">
        <div className="flex-1">
          <Progress value={lesson.progress.percent} />
        </div>
        <div className="w-14 text-right text-sm text-muted-foreground">
          {lesson.progress.percent}%
        </div>
      </div>

      {typeof lesson.progress.avgScore === 'number' ? (
        <div className="mt-2 text-sm text-muted-foreground">
          Avg score: <span className="text-foreground">{lesson.progress.avgScore.toFixed(2)}</span>
        </div>
      ) : null}
    </div>
  );
}
