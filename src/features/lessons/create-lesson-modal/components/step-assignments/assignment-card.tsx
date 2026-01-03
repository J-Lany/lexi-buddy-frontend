'use client';

import React, { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';

import type { TAnswer, TAssignment } from '@/features/lessons/create-lesson-modal/types';

type AssignmentCardProps = {
  assignment: TAssignment;
  onChange: (updatedAssignment: TAssignment) => void;
};

export function AssignmentCard({ assignment, onChange }: AssignmentCardProps) {
  const [question, setQuestion] = useState(assignment.question);
  const [explanation, setExplanation] = useState(assignment.explanation);
  const [answers, setAnswers] = useState<TAnswer[]>(assignment.answers);

  useEffect(() => {
    setQuestion(assignment.question);
    setExplanation(assignment.explanation);
    setAnswers(assignment.answers);
  }, [assignment]);

  const triggerChange = (patch: Partial<TAssignment>) => {
    onChange({ ...assignment, ...patch });
  };

  const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setQuestion(v);
    triggerChange({ question: v });
  };

  const handleExplanationChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const v = e.target.value;
    setExplanation(v);
    triggerChange({ explanation: v });
  };

  const setCorrectAnswer = (index: number) => {
    const updated = answers.map((a, i) => ({ ...a, isCorrect: i === index }));
    setAnswers(updated);
    triggerChange({ answers: updated });
  };

  const handleAnswerTextChange = (index: number, text: string) => {
    const updated = [...answers];
    updated[index] = { ...updated[index], text };
    setAnswers(updated);
    triggerChange({ answers: updated });
  };

  return (
    <div className="grid gap-4">
      <div className="grid gap-1.5">
        <div className="ui-meta tracking-wide uppercase">Question</div>
        <Input
          value={question}
          onChange={handleQuestionChange}
          placeholder="Enter question"
          className="h-11 rounded-2xl"
        />
      </div>

      <div className="grid gap-2">
        <div className="flex items-center justify-between">
          <div className="ui-meta tracking-wide uppercase">Answers</div>
          <div className="ui-meta">
            {answers.findIndex((a) => a.isCorrect) >= 0 ? '1 correct' : 'Pick correct'}
          </div>
        </div>

        <div className="ui-panel overflow-hidden rounded-3xl">
          {answers.map((answer, idx) => {
            const isFirst = idx === 0;

            return (
              <div key={idx} className="px-4 py-3.5">
                {!isFirst ? <div className="-mx-4 mb-3.5 h-px bg-border/60" /> : null}

                <div className="flex items-center gap-3">
                  <Checkbox
                    checked={Boolean(answer.isCorrect)}
                    onCheckedChange={() => setCorrectAnswer(idx)}
                    aria-label={`Mark answer ${idx + 1} as correct`}
                    className={cn(
                      'shrink-0 rounded-full',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                    )}
                  />

                  <Input
                    value={answer.text}
                    onChange={(e) => handleAnswerTextChange(idx, e.target.value)}
                    placeholder={`Answer ${idx + 1}`}
                    className="h-11 rounded-2xl"
                  />

                  <div className="ui-meta shrink-0">{answer.isCorrect ? 'Correct' : ''}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid gap-1.5">
        <div className="ui-meta tracking-wide uppercase">Explanation</div>
        <Textarea
          value={explanation}
          onChange={handleExplanationChange}
          rows={3}
          placeholder="Explanation for student"
          className="min-h-[96px] rounded-3xl"
        />
      </div>
    </div>
  );
}
