'use client';

import * as React from 'react';

import { useI18n } from '@/shared/i18n';
import { Button } from '@/shared/ui/button';

type Props = {
  step: 1 | 2 | 3 | 4 | 5;

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
  const { t } = useI18n();

  if (step === 1) {
    return (
      <Button
        type="button"
        onClick={onNext}
        disabled={!canNextMeta}
        className="w-full h-11 font-semibold"
      >
        {t('lessons.footer.next')}
      </Button>
    );
  }

  if (step === 2) {
    return (
      <div className="flex gap-3">
        <Button type="button" variant="outline" onClick={onBack} className="flex-1 h-11">
          {t('lessons.footer.back')}
        </Button>

        <Button type="button" onClick={onNext} className="flex-1 h-11 font-semibold">
          {t('lessons.footer.next')}
        </Button>
      </div>
    );
  }

  if (step === 3) {
    return (
      <div className="flex gap-3">
        <Button type="button" variant="outline" onClick={onBack} className="flex-1 h-11">
          {t('lessons.footer.back')}
        </Button>

        <Button
          type="button"
          onClick={onNext}
          disabled={!canNextVocab}
          className="flex-1 h-11 font-semibold"
        >
          {t('lessons.footer.next')}
        </Button>
      </div>
    );
  }

  if (step === 4) {
    return (
      <div className="flex gap-3">
        <Button type="button" variant="outline" onClick={onBack} className="flex-1 h-11">
          {t('lessons.footer.back')}
        </Button>

        <Button
          type="button"
          onClick={onSaveLessonAndContinue}
          disabled={!canSaveAssignments || isCreatingLesson}
          className="flex-1 h-11 font-semibold"
        >
          {isCreatingLesson ? t('lessons.footer.saving') : t('lessons.footer.saveAndContinue')}
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
        {t('lessons.footer.back')}
      </Button>

      {nothingSelected ? (
        <Button
          type="button"
          onClick={onSkipFinish}
          disabled={isAssigning}
          className="flex-1 h-11 font-semibold"
        >
          {t('lessons.footer.skipAndFinish')}
        </Button>
      ) : (
        <Button
          type="button"
          onClick={onFinishAssign}
          disabled={isAssigning}
          className="flex-1 h-11 font-semibold"
        >
          {isAssigning ? t('lessons.footer.assigning') : t('lessons.footer.assignAndFinish')}
        </Button>
      )}
    </div>
  );
}
