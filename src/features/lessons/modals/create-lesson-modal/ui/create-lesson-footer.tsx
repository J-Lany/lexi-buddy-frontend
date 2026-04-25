'use client';

import * as React from 'react';

import { Button } from '@/shared/ui/button';

type Props = {
  step: 1 | 2 | 3 | 4;

  canNextMeta: boolean;
  canNextVocab: boolean;
  canSaveAssignments: boolean;

  isCreatingLesson: boolean;
  isAssigning: boolean;

  nothingSelected: boolean;

  onBack: () => void;
  onNext: () => void;

  onSaveLessonAndContinue: () => void;
  onFinishAssign: () => void;
  onSkipFinish: () => void;
};

export function CreateLessonFooter({
  step,
  canNextMeta,
  canNextVocab,
  canSaveAssignments,
  isCreatingLesson,
  isAssigning,
  nothingSelected,
  onBack,
  onNext,
  onSaveLessonAndContinue,
  onFinishAssign,
  onSkipFinish,
}: Props) {
  if (step === 1) {
    return (
      <Button
        type="button"
        onClick={onNext}
        disabled={!canNextMeta}
        className="w-full h-11 font-semibold"
      >
        Next
      </Button>
    );
  }

  if (step === 2) {
    return (
      <div className="flex gap-3">
        <Button type="button" variant="outline" onClick={onBack} className="flex-1 h-11">
          Back
        </Button>

        <Button
          type="button"
          onClick={onNext}
          disabled={!canNextVocab}
          className="flex-1 h-11 font-semibold"
        >
          Next
        </Button>
      </div>
    );
  }

  if (step === 3) {
    return (
      <div className="flex gap-3">
        <Button type="button" variant="outline" onClick={onBack} className="flex-1 h-11">
          Back
        </Button>

        <Button
          type="button"
          onClick={onSaveLessonAndContinue}
          disabled={!canSaveAssignments || isCreatingLesson}
          className="flex-1 h-11 font-semibold"
        >
          {isCreatingLesson ? 'Saving…' : 'Save & continue'}
        </Button>
      </div>
    );
  }

  return (
    <div className="flex gap-3">
      <Button
        type="button"
        variant="outline"
        onClick={onBack}
        disabled={isAssigning}
        className="flex-1 h-11"
      >
        Back
      </Button>

      {nothingSelected ? (
        <Button
          type="button"
          onClick={onSkipFinish}
          disabled={isAssigning}
          className="flex-1 h-11 font-semibold"
        >
          Skip & finish
        </Button>
      ) : (
        <Button
          type="button"
          onClick={onFinishAssign}
          disabled={isAssigning}
          className="flex-1 h-11 font-semibold"
        >
          {isAssigning ? 'Assigning…' : 'Assign & finish'}
        </Button>
      )}
    </div>
  );
}
