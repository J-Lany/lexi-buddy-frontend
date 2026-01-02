import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { GroupLesson } from '@/features/groups/utils/types';
import { LessonCard } from '@/features/groups/group-details/components/lesson-card';
import { ViewAllLessonsDialog } from '@/features/groups/group-details/modals/view-all-lessons';

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
