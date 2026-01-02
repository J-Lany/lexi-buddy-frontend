import { LessonDetails } from '@/features/lessons/create-lesson-modal/types';
import { Badge } from '@/components/ui/badge';
import { ASSIGNMENT_TYPE_LABELS } from '@/features/lessons/lesson-details/utils/consts';
import { QuestionBlock } from '@/features/lessons/lesson-details/components/lesson-assignments/components/questionBlock';

type AssignmentBlockProps = {
  assignment: LessonDetails['assignments'][number];
};

export function AssignmentBlock({ assignment }: AssignmentBlockProps) {
  return (
    <div className="space-y-2 rounded-2xl border border-sky-100 px-3 py-2.5">
      <div className="flex items-center justify-between gap-2">
        <div className="font-medium">
          {ASSIGNMENT_TYPE_LABELS[assignment.type.name] ?? assignment.type.name}
        </div>
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
