'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import * as React from 'react';
import {
  Assigment,
  CreateLessonDraft,
  EAgeGroup,
  ELevel,
  VocabItem,
} from '@/features/lessons/create-lesson-modal/types';
import { StepVocab } from '@/features/lessons/create-lesson-modal/components/step-vocab';
import { StepStudents } from '@/features/lessons/create-lesson-modal/components/step-students';
import { StepProgress } from '@/components/ui/progress-bar';
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
    setDraft((prev) => ({
      ...prev,
      ...patch,
    }));
  };

  const reset = () => {
    setDraft(initialDraft);
    setStep(1);
  };

  const handleFinish = () => {
    setOpen(false);
    reset();
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        setOpen(v);
        if (!v) reset();
      }}
    >
      <DialogTrigger asChild>
        <Button type="button" variant="outline" className="rounded-full w-48">
          New lesson
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[560px] max-h-[80vh] overflow-y-auto">
        <DialogHeader className="space-y-3">
          <DialogTitle className="text-base">Create lesson</DialogTitle>
          <StepProgress
            currentStep={step}
            steps={[
              { label: 'Lesson metadata' },
              { label: 'Vocabulary translation' },
              { label: 'Assignments' },
              { label: 'Students & publishing' },
            ]}
          />
        </DialogHeader>
        <div className="overflow-y-auto">
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
      </DialogContent>
    </Dialog>
  );
}
