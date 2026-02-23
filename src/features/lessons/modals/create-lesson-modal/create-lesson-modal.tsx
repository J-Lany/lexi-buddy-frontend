'use client';

import * as React from 'react';
import { toast } from 'sonner';

import { AssignmentPreviewDto } from '@/entities/lessons/api/create-assignments-preview';
import { useAssignLessonMutation } from '@/entities/lessons/model/mutation/assign-lesson';
import { useCreateAssignmentsPreviewMutation } from '@/entities/lessons/model/mutation/create-assignments-preview';
import { useCreateLessonMutation } from '@/entities/lessons/model/mutation/create-lesson';
import { initExpandedTypes } from '@/features/lessons/modals/create-lesson-modal/lib/init-expanded-types';
import { prepareLessonToSubmit } from '@/features/lessons/modals/create-lesson-modal/lib/prepare-lesson-to-submit';
import { STEP_TITLES } from '@/features/lessons/modals/create-lesson-modal/lib/step-titles';
import {
  AssignmentAction,
  assignmentReducer,
} from '@/features/lessons/modals/create-lesson-modal/model/assignments-store';
import {
  CreateLessonDraft,
  DraftPatch,
} from '@/features/lessons/modals/create-lesson-modal/model/types';
import { CreateLessonFooter } from '@/features/lessons/modals/create-lesson-modal/ui/create-lesson-footer';
import { StepAssignments } from '@/features/lessons/modals/create-lesson-modal/ui/step-assignments/step-assigments';
import { StepLessonMeta } from '@/features/lessons/modals/create-lesson-modal/ui/step-lesson-meta/step-lesson-meta';
import { StepStudents } from '@/features/lessons/modals/create-lesson-modal/ui/step-students/step-students';
import { StepVocab } from '@/features/lessons/modals/create-lesson-modal/ui/step-vocab/step-vocab';
import { AssignmentType } from '@/shared/domain/assignment';
import { ageGroup, level } from '@/shared/domain/common';
import { getErrorMessage } from '@/shared/lib/get-error-message';
import { Button } from '@/shared/ui/button';
import { ResponsiveModal } from '@/shared/ui/responsive-modal';

const initialDraft: CreateLessonDraft = {
  title: '',
  level: level.A1,
  topic: '',
  ageCategory: ageGroup.ADULT,
  description: '',
  vocabItems: [],
  assignments: [],
  studentIds: [],
  groupIds: [],
};

type Steps = 1 | 2 | 3 | 4;

export function CreateLessonModal() {
  const [open, setOpen] = React.useState(false);
  const [step, setStep] = React.useState<Steps>(1);
  const [draft, setDraft] = React.useState(initialDraft);

  const patchDraft = (patch: DraftPatch) => setDraft((d) => ({ ...d, ...patch }));

  const [generatedAssignments, dispatch] = React.useReducer(assignmentReducer, {});
  const [expandedTypes, setExpandedTypes] = React.useState<Record<AssignmentType, boolean>>(() =>
    initExpandedTypes(),
  );

  const [loadingType, setLoadingType] = React.useState<AssignmentType | null>(null);
  const {
    mutate: generateAssignments,
    isError: isGenError,
    error: genError,
  } = useCreateAssignmentsPreviewMutation();

  const { mutate: createLesson, isPending: isCreatingLesson } = useCreateLessonMutation();
  const { mutate: assignLesson, isPending: isAssigning } = useAssignLessonMutation();

  const reset = () => {
    setStep(1);
    setDraft(initialDraft);
    dispatch({ type: 'RESET_ASSIGNMENTS' });
    setLoadingType(null);
    setExpandedTypes(initExpandedTypes());
  };

  const canNextMeta =
    draft.title.trim().length > 0 &&
    Boolean(draft.level) &&
    draft.topic.trim().length > 0 &&
    Boolean(draft.ageCategory);

  const canNextVocab = canNextMeta && (draft.vocabItems?.length ?? 0) > 0;

  const canSaveAssignments = Object.values(generatedAssignments).some(
    (arr) => arr && arr.length > 0,
  );

  const studentIds = draft.studentIds ?? [];
  const groupIds = draft.groupIds ?? [];
  const nothingSelected = studentIds.length === 0 && groupIds.length === 0;

  const goNext = () => setStep((s: Steps) => Math.min(4, s + 1) as Steps);
  const goBack = () => setStep((s: Steps) => Math.max(1, s - 1) as Steps);

  const handleGenerateAssignments = (assignmentType: AssignmentType) => {
    setLoadingType(assignmentType);

    generateAssignments(
      {
        level: draft.level,
        topic: draft.topic,
        ageGroup: draft.ageCategory,
        terms: (draft.vocabItems ?? []).map((t) => t.term),
        questionsCount: (draft.vocabItems ?? []).length,
        type: assignmentType,
      },
      {
        onSuccess: (data) => {
          const dataWithType = data.map((q) => ({
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

  const handleAssignmentChange = (
    type: AssignmentType,
    index: number,
    updated: AssignmentPreviewDto,
  ) => {
    const current = generatedAssignments[type] ?? [];
    const next = [...current];
    next[index] = updated;

    dispatch({
      type: 'SET_ASSIGNMENTS',
      payload: { typeKey: type, data: next },
    });
  };

  const toggleExpanded = (type: AssignmentType) => {
    setExpandedTypes((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  const handleSaveLessonAndContinue = () => {
    const finalLesson = prepareLessonToSubmit(draft, generatedAssignments);

    createLesson(finalLesson, {
      onSuccess: (data) => {
        toast.success('Lesson created 🎉', {
          description: 'The lesson has been added to your list.',
        });
        patchDraft({ lessonId: data.lessonId });
        setStep(4);
      },
      onError: (error) => {
        toast.error('Failed to create lesson', { description: getErrorMessage(error) });
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
        onError: (error) => {
          toast.error('Failed to assign lesson', { description: getErrorMessage(error) });
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
        <Button
          type="button"
          variant="outline"
          className="rounded-full whitespace-nowrap px-5 w-full sm:w-auto"
        >
          + New lesson
        </Button>
      }
      maxWidthClassName="sm:max-w-[640px]"
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
          onToggleExpandedAction={toggleExpanded}
          onGenerateAction={handleGenerateAssignments}
          onAssignmentChangeAction={handleAssignmentChange}
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
