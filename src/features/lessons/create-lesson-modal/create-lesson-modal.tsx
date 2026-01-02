'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { ResponsiveModal } from '@/components/ui/responsive-modal';
import { StepProgress } from '@/components/ui/progress-bar';

import {
  Assigment,
  CreateLessonDraft,
  EAgeGroup,
  ELevel,
  VocabItem,
} from '@/features/lessons/create-lesson-modal/types';

import { StepVocab } from '@/features/lessons/create-lesson-modal/components/step-vocab';
import { StepStudents } from '@/features/lessons/create-lesson-modal/components/step-students';
import { StepLessonMeta } from '@/features/lessons/create-lesson-modal/components/step-lesson-meta';
import { StepAssignments } from '@/features/lessons/create-lesson-modal/components/step-assignments/step-assigments';

const initialDraft: CreateLessonDraft = {
  title: '',
  level: ELevel.A1,
  topic: '',
  ageGroup: EAgeGroup.UNDER_18,
  description: '',
  vocabItems: [] as VocabItem[],
  assignments: [] as Assigment[],
};

export function CreateLessonModal() {
  const [open, setOpen] = React.useState(false);
  const [draft, setDraft] = React.useState<CreateLessonDraft>(initialDraft);
  const [step, setStep] = React.useState<1 | 2 | 3 | 4>(1);

  const handleDraftChange = (patch: Partial<CreateLessonDraft>) => {
    setDraft((prev) => ({ ...prev, ...patch }));
  };

  const reset = () => {
    setDraft(initialDraft);
    setStep(1);
  };

  const handleFinish = () => {
    setOpen(false);
    reset();
  };

  const header = (
    <div className="space-y-3">
      <div className="text-base font-semibold">Create lesson</div>
      <StepProgress
        currentStep={step}
        steps={[
          { label: 'Lesson metadata' },
          { label: 'Vocabulary translation' },
          { label: 'Assignments' },
          { label: 'Students & publishing' },
        ]}
      />
    </div>
  );

  return (
    <ResponsiveModal
      trigger={
        <Button type="button" variant="outline" className="rounded-full w-48">
          + New lesson
        </Button>
      }
      // controlled
      open={open}
      onOpenChange={(v) => {
        setOpen(v);
        if (!v) reset();
      }}
      // header replaces title/subtitle
      header={header}
      desktopMaxWidthClassName="sm:max-w-[560px]"
      // IMPORTANT:
      // не ставь overflow на Desktop DialogContent (он уже сам),
      // а скролл пусть живет в children-обертке ниже
    >
      {/* единый scroll контейнер (и для мобилки Drawer, и для desktop Dialog) */}
      <div className="max-h-[78dvh] overflow-y-auto">
        {step === 1 && (
          <StepLessonMeta draft={draft} onChange={handleDraftChange} onNext={() => setStep(2)} />
        )}

        {step === 2 && (
          <StepVocab
            draft={draft}
            onChange={handleDraftChange}
            onNext={() => setStep(3)}
            onBack={() => setStep(1)}
          />
        )}

        {step === 3 && (
          <StepAssignments
            draft={draft}
            onChange={handleDraftChange}
            onNext={() => setStep(4)}
            onBack={() => setStep(2)}
          />
        )}

        {step === 4 && (
          <StepStudents
            draft={draft}
            onChange={handleDraftChange}
            onNext={handleFinish}
            onBack={() => setStep(3)}
          />
        )}
      </div>
    </ResponsiveModal>
  );
}
