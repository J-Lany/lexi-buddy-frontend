import { LessonDashboardDto } from '@/entities/lessons/api/get-lesson-dashboard';
import { QuestionBlock } from '@/features/lessons/widgets/lesson-details/ui/lesson-assignments/ui/question-block';
import { ASSIGNMENT_TYPE_LABELS } from '@/shared/catalogs/assignment';
import { Badge } from '@/shared/ui/badge';

type Props = {
  assignment: LessonDashboardDto['assignments'][number];
};

export function AssignmentBlock({ assignment }: Props) {
  const label = ASSIGNMENT_TYPE_LABELS[assignment.type.name];

  return (
    <div className="space-y-2 rounded-2xl border border-sky-100 px-3 py-2.5">
      <div className="flex items-center justify-between gap-2">
        <div className="font-medium">{label}</div>
        <Badge variant="secondary">{assignment.questions.length} questions</Badge>
      </div>

      <div className="space-y-2">
        {assignment.questions.map((q) => (
          <QuestionBlock key={q.id} question={q} />
        ))}
      </div>
    </div>
  );
}
