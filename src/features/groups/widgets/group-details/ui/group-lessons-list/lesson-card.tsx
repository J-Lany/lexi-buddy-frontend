import { GroupLesson } from '@/entities/groups/api/get-group-dashboard';
import { Progress } from '@/shared/ui/progress';

export function LessonCard({ lesson }: { lesson: GroupLesson }) {
  return (
    <div
      className="
        ui-card ui-radius-card
        px-5 py-4
        cursor-pointer
        transition
        active:scale-[0.99]
      "
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="ui-title">{lesson.title}</div>
          <div className="ui-meta mt-1">
            {lesson.progress.studentsDone}/{lesson.progress.studentsTotal} students done
          </div>
        </div>

        <div className="ui-stat">{lesson.progress.percentDone}%</div>
      </div>

      <Progress value={lesson.progress.percentDone} className="mt-3" />
    </div>
  );
}
