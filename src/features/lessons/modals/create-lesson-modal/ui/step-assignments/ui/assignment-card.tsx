'use client';

import React, { useEffect, useState } from 'react';

import { AnswerDto, AssignmentPreviewDto } from '@/entities/lessons/api/create-assignments-preview';
import { cn } from '@/shared/lib/cn';
import { Checkbox } from '@/shared/ui/checkbox';
import { Textarea } from '@/shared/ui/textarea';

type AssignmentCardProps = {
  assignment: AssignmentPreviewDto;
  onChange: (updatedAssignment: AssignmentPreviewDto) => void;
};

export function AssignmentCard({ assignment, onChange }: AssignmentCardProps) {
  const [question, setQuestion] = useState(assignment.question);
  const [explanation, setExplanation] = useState(assignment.explanation);
  const [answers, setAnswers] = useState<AnswerDto[]>(assignment.answers);

  useEffect(() => {
    setQuestion(assignment.question);
    setExplanation(assignment.explanation);
    setAnswers(assignment.answers);
  }, [assignment]);

  const triggerChange = (patch: Partial<AssignmentPreviewDto>) => {
    onChange({ ...assignment, ...patch });
  };

  const handleQuestionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
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
        <Textarea
          value={question}
          onChange={handleQuestionChange}
          placeholder="Enter question"
          className="rounded-2xl"
        />
      </div>

      <div className="grid gap-2">
        <div className="flex items-center justify-between">
          <div className="ui-meta tracking-wide uppercase">Answers</div>
          <div className="ui-meta">
            {answers.findIndex((a) => a.isCorrect) >= 0 ? '1 correct' : 'Pick correct'}
          </div>
        </div>

        <div className=" overflow-hidden rounded-3xl">
          {answers.map((answer, idx) => {
            return (
              <div key={idx} className="px-4 py-3.5">
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

                  <Textarea
                    value={answer.text}
                    onChange={(e) => handleAnswerTextChange(idx, e.target.value)}
                    placeholder={`Answer ${idx + 1}`}
                    className="rounded-2xl"
                  />
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
          className="rounded-2xl"
        />
      </div>
    </div>
  );
}
