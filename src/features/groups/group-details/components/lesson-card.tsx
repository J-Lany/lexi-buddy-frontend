import { GroupLesson } from '@/features/groups/utils/types';
import { Progress } from '@/components/ui/progress';

export function LessonCard({ lesson }: { lesson: GroupLesson }) {
  return (
    <div
      className="
        w-64 shrink-0 snap-start
        rounded-xl border bg-white p-4
        cursor-pointer transition
        sm:hover:bg-muted/40
        active:scale-[0.99]
      "
      role="button"
      tabIndex={0}
    >
      <div className="font-semibold truncate">{lesson.title}</div>

      <div className="text-sm text-muted-foreground mt-1">
        {lesson.progress.studentsDone}/{lesson.progress.studentsTotal} students done
      </div>

      <Progress value={lesson.progress.percentDone} className="mt-3" />

      <div className="text-right text-sm font-semibold mt-2">{lesson.progress.percentDone}%</div>
    </div>
  );
}
