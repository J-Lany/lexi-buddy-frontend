import { CheckCircle2, Circle, XCircle } from 'lucide-react';

import type { StudentLessonProgressAttemptQuestionDto } from '@/entities/students/api/get-student-lesson-progress';
import { formatStudentAnswer } from '@/features/students/widgets/student-lesson-progress/lib/format-answer';

export function QuestionRow({ q }: { q: StudentLessonProgressAttemptQuestionDto }) {
  return (
    <div className="rounded-2xl border border-border/30 bg-muted/[0.06] px-4 py-4">
      <div className="flex items-start gap-3">
        <div className="shrink-0 pt-0.5">
          {q.isCorrect === true ? (
            <CheckCircle2 className="h-5 w-5" />
          ) : q.isCorrect === false ? (
            <XCircle className="h-5 w-5" />
          ) : (
            <Circle className="h-5 w-5 text-muted-foreground" />
          )}
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
