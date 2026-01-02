'use client';

import { useReducer, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  getTypeLabel,
  prepareLessonToSubmit,
} from '@/features/lessons/create-lesson-modal/components/step-assignments/utils';
import { assignmentReducer } from '@/features/lessons/create-lesson-modal/components/step-assignments/store';
import { useCreateAssigments } from '@/features/lessons/create-lesson-modal/hooks/use-create-assigments';
import { useCreateLesson } from '@/features/lessons/create-lesson-modal/hooks/use-create-lesson';
import {
  CreateLessonDraft,
  EAssigmentType,
  TAssignment,
} from '@/features/lessons/create-lesson-modal/types';
import { AssignmentCard } from '@/features/lessons/create-lesson-modal/components/step-assignments/assignment-card';

type Props = {
  draft: CreateLessonDraft;
  onChange: (patch: Partial<CreateLessonDraft>) => void;
  onNext: () => void;
  onBack: () => void;
};

const ASSIGNMENT_TYPES: EAssigmentType[] = [
  EAssigmentType.DEFINITION_QUIZ,
  EAssigmentType.GAP_FILLING,
  EAssigmentType.PHRASE_FAIL,
  EAssigmentType.COLLOCATION_CHECK,
];

export function StepAssignments({ draft, onNext, onBack, onChange }: Props) {
  const [generatedAssignments, dispatch] = useReducer(assignmentReducer, {});
  const { mutate: generateAssignments, isError, error } = useCreateAssigments();
  const { mutate: createLesson, isPending: isCreating } = useCreateLesson();

  const [expandedTypes, setExpandedTypes] = useState<Record<EAssigmentType, boolean>>({
    [EAssigmentType.DEFINITION_QUIZ]: false,
    [EAssigmentType.GAP_FILLING]: false,
    [EAssigmentType.PHRASE_FAIL]: false,
    [EAssigmentType.COLLOCATION_CHECK]: false,
  });

  const [loadingType, setLoadingType] = useState<EAssigmentType | null>(null);

  const canNext = Object.values(generatedAssignments).some((arr) => arr && arr.length > 0);

  const toggleExpanded = (type: EAssigmentType) => {
    setExpandedTypes((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  const handleCreateClick = (assignmentType: EAssigmentType) => {
    setLoadingType(assignmentType);

    generateAssignments(
      {
        level: draft.level,
        topic: draft.topic,
        ageGroup: draft.ageGroup,
        terms: draft.vocabItems.map((term) => term.term),
        questionsCount: draft.vocabItems.length,
        type: assignmentType,
      },
      {
        onSuccess: (data) => {
          const dataWithType = data.map((question: Partial<TAssignment>) => ({
            ...question,
            assignmentType,
          }));

          dispatch({
            type: 'SET_ASSIGNMENTS',
            payload: {
              typeKey: assignmentType,
              data: dataWithType,
            },
          });
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

  const handleNext = () => {
    const finalLesson = prepareLessonToSubmit(draft, generatedAssignments);

    createLesson(finalLesson, {
      onSuccess: (data) => {
        toast.success('Lesson created 🎉', {
          description: 'The lesson has been added to your list.',
        });
        onChange({ lessonId: data.id });
        onNext();
      },
      onError: (e) => {
        toast.error('Failed to create lesson', {
          description: e.message,
        });
      },
    });
  };

  const handleBackClick = () => {
    dispatch({ type: 'RESET_ASSIGNMENTS' });
    onBack();
  };

  const errorMessage =
    isError && error ? (error instanceof Error ? error.message : 'An error occurred.') : null;

  return (
    <div className="space-y-6">
      {ASSIGNMENT_TYPES.map((type) => {
        const assignments = generatedAssignments[type] || [];
        const isExpanded = expandedTypes[type];
        const hasAssignments = assignments.length > 0;

        const isLoading = loadingType === type;
        const isAnyLoading = loadingType !== null;

        return (
          <div key={type} className="space-y-4 rounded-md border p-4">
            <div className="flex items-center justify-between">
              <span className="font-medium">{getTypeLabel(type)}</span>

              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() => handleCreateClick(type)}
                  disabled={isAnyLoading}
                >
                  {isLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : hasAssignments ? (
                    'Regenerate'
                  ) : (
                    'Generate'
                  )}
                </Button>

                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleExpanded(type)}
                >
                  {isExpanded ? 'Hide' : 'Show'}
                </Button>
              </div>
            </div>

            {errorMessage && <div className="text-sm text-red-500">{errorMessage}</div>}

            {isExpanded && (
              <div className="mt-4 space-y-4">
                {hasAssignments ? (
                  assignments.map((assignment, index) => (
                    <AssignmentCard
                      key={`${type}-${index}`}
                      assignment={assignment}
                      onChange={(updated) => {
                        const updatedAssignments = [...assignments];
                        updatedAssignments[index] = updated;

                        dispatch({
                          type: 'SET_ASSIGNMENTS',
                          payload: { typeKey: type, data: updatedAssignments },
                        });
                      }}
                    />
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">No assignments generated yet.</p>
                )}
              </div>
            )}
          </div>
        );
      })}

      <div className="flex justify-between gap-2 pt-4">
        <Button type="button" variant="outline" onClick={handleBackClick}>
          Back
        </Button>

        <Button type="button" onClick={handleNext} disabled={!canNext || isCreating}>
          {isCreating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            'Save and continue assign lesson'
          )}
        </Button>
      </div>
    </div>
  );
}
