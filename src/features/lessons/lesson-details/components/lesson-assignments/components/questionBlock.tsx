import { LessonDetails } from '@/features/lessons/create-lesson-modal/types';

type QuestionBlockProps = {
  question: LessonDetails['assignments'][number]['questions'][number];
};

export function QuestionBlock({ question }: QuestionBlockProps) {
  return (
    <div className="space-y-1 rounded-xl bg-sky-50/60 px-3 py-2">
      <div className="font-medium">{question.text}</div>
      <ul className="ml-4 list-disc space-y-0.5">
        {question.answers.map((a) => (
          <li key={a.id} className={a.isCorrect ? 'font-semibold text-foreground' : undefined}>
            {a.text}
            {a.isCorrect ? ' (correct)' : ''}
          </li>
        ))}
      </ul>
      {question.explanation && (
        <div className="mt-1 text-xs text-muted-foreground">
          Explanation: {question.explanation}
        </div>
      )}
    </div>
  );
}
