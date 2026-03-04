import { LessonDashboardDto } from '@/entities/lessons/api/get-lesson-dashboard';
import { STATUS_ICON_VARIANTS, StatusIcon } from '@/shared/ui/details/question-status-icon';

type Props = {
  question: LessonDashboardDto['assignments'][number]['questions'][number];
};

export function QuestionBlock({ question }: Props) {
  return (
    <div className="space-y-2 rounded-xl bg-sky-50/60 px-3 py-2">
      <div className="font-medium">{question.text}</div>

      <div className="space-y-1">
        {question.answers.map((a) => (
          <div key={a.id} className="flex items-start gap-2">
            <StatusIcon
              variant={a.isCorrect ? STATUS_ICON_VARIANTS.success : STATUS_ICON_VARIANTS.neutral}
              size="sm"
            />

            <div
              className={a.isCorrect ? 'font-semibold text-foreground' : 'text-muted-foreground'}
            >
              {a.text}
            </div>
          </div>
        ))}
      </div>

      {question.explanation && (
        <div className="mt-1 text-xs text-muted-foreground">
          Explanation: {question.explanation}
        </div>
      )}
    </div>
  );
}
