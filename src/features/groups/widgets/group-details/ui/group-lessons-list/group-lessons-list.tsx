import { GroupLesson } from '@/entities/groups/api/get-group-dashboard';
import { ViewAllLessonsDialog } from '@/features/groups/modals/view-all-lessons';
import { LessonCard } from '@/features/groups/widgets/group-details/ui/group-lessons-list/lesson-card';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';

export default function GroupLessonsList({ lessons }: { lessons: GroupLesson[] }) {
  return (
    <Card className="rounded-2xl">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Lessons</CardTitle>
        <ViewAllLessonsDialog lessons={lessons} title="All lessons" />
      </CardHeader>

      <CardContent className="overflow-x-auto px-6 pb-2">
        <div className="flex gap-4 w-max snap-x snap-mandatory">
          {lessons.length === 0 ? (
            <div className="text-sm text-muted-foreground">Nothing here</div>
          ) : (
            lessons.map((l) => (
              <div key={l.id} className="w-64 shrink-0 snap-start">
                <LessonCard lesson={l} />
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
