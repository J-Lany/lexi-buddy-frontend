import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GroupLesson } from '@/features/groups/utils/types';

export default function GroupStatsGrid({
  studentsCount,
  lessonsCount,
  lessons,
}: {
  studentsCount: number;
  lessonsCount: number;
  lessons: GroupLesson[];
}) {
  const avgCompletion =
    lessonsCount > 0
      ? Math.round(lessons.reduce((a, l) => a + l.progress.percentDone, 0) / lessonsCount)
      : 0;

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      <Stat title="Students" value={studentsCount} />
      <Stat title="Lessons" value={lessonsCount} />
      <Stat title="Avg progress" value={`${avgCompletion}%`} />
      <Stat
        title="Completed lessons"
        value={lessons.filter((l) => l.progress.studentsDone > 0).length}
      />
    </div>
  );
}

function Stat({ title, value }: { title: string; value: string | number }) {
  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <CardTitle className="text-sm text-muted-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent className="text-2xl font-semibold">{value}</CardContent>
    </Card>
  );
}
