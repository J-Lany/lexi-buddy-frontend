import type { StudentLessonProgressAttemptQuestionDto } from '@/entities/students/api/get-student-lesson-progress';
import { formatStudentAnswer } from '@/features/students/widgets/student-lesson-progress/lib/format-answer';
import { cn } from '@/shared/lib/cn';
import { STATUS_ICON_VARIANTS, StatusIcon } from '@/shared/ui/details/question-status-icon';

export function QuestionRow({ q }: { q: StudentLessonProgressAttemptQuestionDto }) {
  const isCorrect = q.isCorrect === true;

  return (
    <div
      className={cn(
        'rounded-2xl border px-4 py-4',
        isCorrect ? 'ui-surface-success' : 'ui-surface-danger',
      )}
    >
      <div className="flex items-start gap-3">
        <div className="shrink-0 pt-0.5">
          <StatusIcon
            variant={isCorrect ? STATUS_ICON_VARIANTS.success : STATUS_ICON_VARIANTS.danger}
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="ui-title !whitespace-normal break-words">{q.text}</div>

          <div className="mt-3 grid gap-2">
            <div className="ui-meta !whitespace-normal min-w-0">
              <span className="text-muted-foreground font-bold">Student: </span>
              <span className="break-words">{formatStudentAnswer(q.studentAnswer)}</span>
            </div>

            <div className="ui-meta !whitespace-normal min-w-0">
              <span className="text-muted-foreground font-bold">Correct: </span>
              <span className="break-words">{q.correctAnswerText ?? '—'}</span>
            </div>

            {q.explanation ? (
              <div className="ui-meta !whitespace-normal pt-2 break-words">
                <span className="text-muted-foreground font-bold">Explanation:</span>{' '}
                {q.explanation}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
