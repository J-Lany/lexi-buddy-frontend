import { LessonDashboardDto } from '@/entities/lessons/api/get-lesson-dashboard';
import { QuestionBlock } from '@/features/lessons/widgets/lesson-details/ui/lesson-assignments/ui/question-block';
import { ASSIGNMENT_TYPE_LABELS } from '@/shared/catalogs/assignment';

type Props = {
  assignment: LessonDashboardDto['assignments'][number];
};

export function AssignmentBlock({ assignment }: Props) {
  const label = ASSIGNMENT_TYPE_LABELS[assignment.type.name];

  return (
    <div className="space-y-2 rounded-2xl border border-[var(--border-soft)] px-3 py-2.5">
      <div className="flex items-center justify-between gap-2">
        <div className="ui-meta">{label}</div>
        <span className="ui-pill">{assignment.questions.length} questions</span>
      </div>

      <div className="space-y-2">
        {assignment.questions.map((q) => (
          <QuestionBlock key={q.id} question={q} />
        ))}
      </div>
    </div>
  );
}
