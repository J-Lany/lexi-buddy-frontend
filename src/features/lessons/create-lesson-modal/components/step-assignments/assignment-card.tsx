'use client';

import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { TAnswer, TAssignment } from '@/features/lessons/create-lesson-modal/types';

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

  const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuestion = e.target.value;
    setQuestion(newQuestion);
    triggerChange({ question: newQuestion });
  };

  const handleExplanationChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newExplanation = e.target.value;
    setExplanation(newExplanation);
    triggerChange({ explanation: newExplanation });
  };

  const handleAnswerChange = (
    index: number,
    field: 'text' | 'isCorrect',
    value: string | boolean,
  ) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = {
      ...updatedAnswers[index],
      [field]: value,
    };

    if (field === 'isCorrect' && value === true) {
      for (let i = 0; i < updatedAnswers.length; i++) {
        updatedAnswers[i].isCorrect = i === index;
      }
    }

    setAnswers(updatedAnswers);
    triggerChange({ answers: updatedAnswers });
  };

  const triggerChange = (patch: Partial<TAssignment>) => {
    onChange({
      ...assignment,
      ...patch,
    });
  };

  return (
    <div className="border rounded p-4 mb-4 bg-white shadow-sm">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Question</label>
        <Input value={question} onChange={handleQuestionChange} placeholder="Enter question" />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Answers</label>
        <div className="space-y-2">
          {answers.map((answer, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <Input
                value={answer.text}
                onChange={(e) => handleAnswerChange(idx, 'text', e.target.value)}
                placeholder="Answer text"
              />
              <label className="flex items-center gap-1 text-sm">
                <input
                  type="checkbox"
                  checked={answer.isCorrect}
                  onChange={(e) => handleAnswerChange(idx, 'isCorrect', e.target.checked)}
                  className="h-4 w-4"
                />
                Correct
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Explanation</label>
        <Textarea
          value={explanation}
          onChange={handleExplanationChange}
          rows={3}
          placeholder="Explanation for student"
        />
      </div>
    </div>
  );
}
