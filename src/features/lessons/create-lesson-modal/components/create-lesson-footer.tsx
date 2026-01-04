'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';

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
      <div className="flex justify-end">
        <Button
          type="button"
          onClick={onNext}
          disabled={!canNextMeta}
          className="h-11 rounded-xl px-6"
        >
          Next
        </Button>
      </div>
    );
  }

  if (step === 2) {
    return (
      <div className="flex flex-col gap-2 sm:flex-row sm:justify-between">
        <Button type="button" variant="outline" onClick={onBack} className="h-11 rounded-xl px-5">
          Back
        </Button>

        <Button
          type="button"
          onClick={onNext}
          disabled={!canNextVocab}
          className="h-11 rounded-xl px-6"
        >
          Next
        </Button>
      </div>
    );
  }

  if (step === 3) {
    return (
      <div className="flex flex-col gap-2 sm:flex-row sm:justify-between">
        <Button type="button" variant="outline" onClick={onBack} className="h-11 rounded-xl px-5">
          Back
        </Button>

        <Button
          type="button"
          onClick={onSaveLessonAndContinue}
          disabled={!canSaveAssignments || isCreatingLesson}
          className="h-11 rounded-xl px-6"
        >
          {isCreatingLesson ? 'Saving…' : 'Save & continue'}
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:justify-between">
      <Button
        type="button"
        variant="outline"
        onClick={onBack}
        disabled={isAssigning}
        className="h-11 rounded-xl px-5"
      >
        Back
      </Button>

      {nothingSelected ? (
        <Button
          type="button"
          onClick={onSkipFinish}
          disabled={isAssigning}
          className="h-11 rounded-xl px-6"
        >
          Skip & finish
        </Button>
      ) : (
        <Button
          type="button"
          onClick={onFinishAssign}
          disabled={isAssigning}
          className="h-11 rounded-xl px-6"
        >
          {isAssigning ? 'Assigning…' : 'Assign & finish'}
        </Button>
      )}
    </div>
  );
}
