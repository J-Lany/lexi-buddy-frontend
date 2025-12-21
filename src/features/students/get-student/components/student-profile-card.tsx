import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { formatDate, formatName } from '@/features/students/utils/helpers';
import type { StudentDashboard } from '@/features/students/utils/types';

export default function StudentProfileCard({
  student,
  groups,
  stats,
}: {
  student: StudentDashboard['student'];
  groups: StudentDashboard['groups'];
  stats: StudentDashboard['stats'];
}) {
  const title = formatName(student);

  return (
    <Card className="rounded-2xl">
      <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <CardTitle className="truncate">{title}</CardTitle>

          <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            {student.level ? <Badge variant="secondary">Level: {student.level}</Badge> : null}
            {student.ageGroup ? <Badge variant="outline">{student.ageGroup}</Badge> : null}
          </div>

          <div className="mt-3 text-sm text-muted-foreground space-y-1">
            <div>
              Telegram ID: <span className="text-blue-600">@{student.username ?? '—'}</span>
            </div>
            <div>
              Last visit:{' '}
              <span className="text-foreground">{formatDate(student.lastVisit) ?? '—'}</span>
            </div>
          </div>
        </div>

        <div className="sm:text-right">
          <div className="text-sm text-muted-foreground">Overall progress</div>
          <div className="text-2xl font-semibold">{stats.progressPercent}%</div>
          <div className="mt-2 w-full sm:w-44">
            <Progress value={stats.progressPercent} />
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="flex flex-wrap gap-2">
          {groups.map((g) => (
            <Badge key={g.id} variant="outline" className="max-w-full truncate">
              {g.name}
              {g.level ? ` · ${g.level}` : ''}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
