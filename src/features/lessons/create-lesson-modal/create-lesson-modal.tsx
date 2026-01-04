'use client';

import * as React from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { ResponsiveModal } from '@/components/ui/responsive-modal';
import { StepProgress } from '@/components/ui/progress-bar';

import { useCreateAssigments } from '@/features/lessons/create-lesson-modal/hooks/use-create-assigments';
import { useCreateLesson } from '@/features/lessons/create-lesson-modal/hooks/use-create-lesson';
import { useAssignLesson } from '@/features/lessons/create-lesson-modal/hooks/use-assign-lesson';

import {
  prepareLessonToSubmit,
  STEP_TITLES,
} from '@/features/lessons/create-lesson-modal/components/step-assignments/utils';
import {
  AssignmentAction,
  assignmentReducer,
} from '@/features/lessons/create-lesson-modal/components/step-assignments/store';

import type {
  Assigment,
  VocabItem,
  CreateLessonDraft,
  EAssigmentType,
  TAssignment,
} from '@/features/lessons/create-lesson-modal/types';
import { ASSIGNMENT_TYPES, EAgeGroup, ELevel } from '@/features/lessons/create-lesson-modal/types';

import { StepLessonMeta } from '@/features/lessons/create-lesson-modal/components/step-lesson-meta';
import { StepVocab } from '@/features/lessons/create-lesson-modal/components/step-vocab';
import { StepStudents } from '@/features/lessons/create-lesson-modal/components/step-students';

import { CreateLessonFooter } from '@/features/lessons/create-lesson-modal/components/create-lesson-footer';
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

type Steps = 1 | 2 | 3 | 4;

export function CreateLessonModal() {
  const [open, setOpen] = React.useState(false);
  const [step, setStep] = React.useState<Steps>(1);
  const [draft, setDraft] = React.useState<CreateLessonDraft>(initialDraft);

  const patchDraft = (patch: Partial<CreateLessonDraft>) => setDraft((d) => ({ ...d, ...patch }));

  const [generatedAssignments, dispatch] = React.useReducer(assignmentReducer, {});
  const [expandedTypes, setExpandedTypes] = React.useState<Record<string, boolean>>(() => {
    const init: Record<string, boolean> = {};
    ASSIGNMENT_TYPES.forEach((t) => (init[String(t)] = false));
    return init;
  });

  const [loadingType, setLoadingType] = React.useState<EAssigmentType | null>(null);
  const {
    mutate: generateAssignments,
    isError: isGenError,
    error: genError,
  } = useCreateAssigments();

  const { mutate: createLesson, isPending: isCreatingLesson } = useCreateLesson();
  const { mutate: assignLesson, isPending: isAssigning } = useAssignLesson();

  const reset = () => {
    setStep(1);
    setDraft(initialDraft);
    dispatch({ type: 'RESET_ASSIGNMENTS' });
    setLoadingType(null);
    setExpandedTypes(() => {
      const init: Record<string, boolean> = {};
      ASSIGNMENT_TYPES.forEach((t) => (init[String(t)] = false));
      return init;
    });
  };

  const canNextMeta =
    draft.title.trim().length > 0 &&
    Boolean(draft.level) &&
    draft.topic.trim().length > 0 &&
    Boolean(draft.ageGroup);

  const canNextVocab = canNextMeta && (draft.vocabItems?.length ?? 0) > 0;

  const canSaveAssignments = Object.values(generatedAssignments).some(
    (arr) => arr && arr.length > 0,
  );

  const studentIds = draft.studentIds ?? [];
  const groupIds = draft.groupIds ?? [];
  const nothingSelected = studentIds.length === 0 && groupIds.length === 0;

  const goNext = () => setStep((s: Steps) => Math.min(4, s + 1) as Steps);
  const goBack = () => setStep((s: Steps) => Math.max(1, s - 1) as Steps);

  const handleGenerateAssignments = (assignmentType: EAssigmentType) => {
    setLoadingType(assignmentType);

    generateAssignments(
      {
        level: draft.level,
        topic: draft.topic,
        ageGroup: draft.ageGroup,
        terms: (draft.vocabItems ?? []).map((t) => t.term),
        questionsCount: (draft.vocabItems ?? []).length,
        type: assignmentType,
      },
      {
        onSuccess: (data: TAssignment[]) => {
          const dataWithType = data.map((q: Partial<TAssignment>) => ({
            ...q,
            assignmentType,
          }));

          dispatch({
            type: 'SET_ASSIGNMENTS',
            payload: {
              typeKey: assignmentType,
              data: dataWithType,
            },
          } as AssignmentAction);
        },
        onError: (e) => {
          toast.error('Failed to generate assignments', {
            description: e instanceof Error ? e.message : 'An error occurred.',
          });
        },
        onSettled: () => {
          setLoadingType(null);
        },
      },
    );
  };

  const handleAssignmentChange = (type: EAssigmentType, index: number, updated: TAssignment) => {
    const current = generatedAssignments[type] || [];
    const next = [...current];
    next[index] = updated;

    dispatch({
      type: 'SET_ASSIGNMENTS',
      payload: { typeKey: type, data: next },
    });
  };

  const toggleExpanded = (type: EAssigmentType) => {
    setExpandedTypes((prev) => ({ ...prev, [String(type)]: !prev[String(type)] }));
  };

  const handleSaveLessonAndContinue = () => {
    const finalLesson = prepareLessonToSubmit(draft, generatedAssignments);

    createLesson(finalLesson, {
      onSuccess: (data) => {
        toast.success('Lesson created 🎉', {
          description: 'The lesson has been added to your list.',
        });
        patchDraft({ lessonId: data.id });
        setStep(4);
      },
      onError: (error, _variables, _onMutateResult, _context) => {
        const message =
          error instanceof Error
            ? error.message
            : typeof error === 'string'
              ? error
              : 'Unknown error';

        toast.error('Failed to create lesson', { description: message });
      },
    });
  };

  const handleFinishAssign = () => {
    if (!draft.lessonId) {
      setOpen(false);
      reset();
      return;
    }

    if (nothingSelected) {
      setOpen(false);
      reset();
      return;
    }

    assignLesson(
      {
        lessonId: draft.lessonId,
        studentIds: studentIds.length ? studentIds : [],
        groupIds: groupIds.length ? groupIds : [],
      },
      {
        onSuccess: () => {
          toast.success('Lesson assigned 🎉', {
            description: 'The lesson has been added to students list.',
          });
        },
        onError: (error, _variables, _onMutateResult, _context) => {
          const message =
            error instanceof Error
              ? error.message
              : typeof error === 'string'
                ? error
                : 'Unknown error';

          toast.error('Failed to assign lesson', { description: message });
        },
        onSettled: () => {
          setOpen(false);
          reset();
        },
      },
    );
  };

  const footer = (
    <CreateLessonFooter
      step={step}
      canNextMeta={canNextMeta}
      canNextVocab={canNextVocab}
      canSaveAssignments={canSaveAssignments}
      isCreatingLesson={isCreatingLesson}
      isAssigning={isAssigning}
      nothingSelected={nothingSelected}
      onBack={goBack}
      onNext={goNext}
      onSaveLessonAndContinue={handleSaveLessonAndContinue}
      onFinishAssign={handleFinishAssign}
      onSkipFinish={() => {
        setOpen(false);
        reset();
      }}
    />
  );

  return (
    <ResponsiveModal
      open={open}
      onOpenChange={(v) => {
        setOpen(v);
        if (!v) reset();
      }}
      trigger={
        <Button type="button" variant="outline" className="w-48 rounded-full">
          + New lesson
        </Button>
      }
      maxWidthClassName="sm:max-w-[860px]"
      title={STEP_TITLES[step]}
      right={`${step} / 4`}
      footer={footer}
    >
      {step === 1 ? (
        <StepLessonMeta draft={draft} onChange={patchDraft} />
      ) : step === 2 ? (
        <StepVocab draft={draft} onChange={patchDraft} />
      ) : step === 3 ? (
        <StepAssignments
          draft={draft}
          generatedAssignments={generatedAssignments}
          expandedTypes={expandedTypes}
          loadingType={loadingType}
          isAnyLoading={loadingType !== null}
          onToggleExpanded={toggleExpanded}
          onGenerate={handleGenerateAssignments}
          onAssignmentChange={handleAssignmentChange}
          errorMessage={
            isGenError && genError
              ? genError instanceof Error
                ? genError.message
                : 'An error occurred.'
              : null
          }
        />
      ) : (
        <StepStudents draft={draft} onChange={patchDraft} />
      )}
    </ResponsiveModal>
  );
}
