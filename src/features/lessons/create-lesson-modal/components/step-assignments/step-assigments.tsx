'use client';
import { Button } from '@/components/ui/button';
import { useReducer, useState } from 'react';
import { Loader2 } from 'lucide-react';
import {
  getTypeLabel,
  prepareLessonToSubmit,
} from '@/features/lessons/create-lesson-modal/components/step-assignments/utils';
import { assignmentReducer } from '@/features/lessons/create-lesson-modal/components/step-assignments/store';
import { useCreateAssigments } from '@/features/lessons/create-lesson-modal/hooks/use-create-assigments';
import {
  CreateLessonDraft,
  EAssigmentType,
  TAssignment,
} from '@/features/lessons/create-lesson-modal/types';
import { AssignmentCard } from '@/features/lessons/create-lesson-modal/components/step-assignments/assignment-card';
import { useCreateLesson } from '@/features/lessons/create-lesson-modal/hooks/use-create-lesson';
import { toast } from 'sonner';

type Props = {
  draft: CreateLessonDraft;
  onChange: (patch: Partial<CreateLessonDraft>) => void;
  onNext: () => void;
  onBack: () => void;
};

export function StepAssignments({ draft, onNext, onBack }: Props) {
  const [generatedAssignments, dispatch] = useReducer(assignmentReducer, {});
  const { mutate, isPending, isError, error } = useCreateAssigments();
  const { mutate: createLesson, isPending: isCreating } = useCreateLesson();

  const [expandedTypes, setExpandedTypes] = useState<Record<EAssigmentType, boolean>>({
    [EAssigmentType.DEFINITION_QUIZ]: false,
    [EAssigmentType.GAP_FILLING]: false,
    [EAssigmentType.PHRASE_FAIL]: false,
    [EAssigmentType.COLLOCATION_CHECK]: false,
  });

  const toggleExpanded = (type: EAssigmentType) => {
    setExpandedTypes((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  const canNext = Object.values(generatedAssignments).some((arr) => arr?.length > 0);

  const handleCreateClick = (assignmentType: EAssigmentType) => {
    mutate(
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
      },
    );
  };

  const handleNext = () => {
    const finalLesson = prepareLessonToSubmit(draft, generatedAssignments);
    createLesson(finalLesson, {
      onSuccess: () => {
        toast.success('Lesson created 🎉', {
          description: 'The lesson has been added to your list.',
        });
        onNext();
      },
      onError: (e) => {
        toast.error('Failed to create lesson', { description: e.message });
      },
    });
  };

  const handleBackClick = () => {
    dispatch({ type: 'RESET_ASSIGNMENTS' });
    onBack();
  };

  return (
    <div className="space-y-6">
      {[
        EAssigmentType.DEFINITION_QUIZ,
        EAssigmentType.GAP_FILLING,
        EAssigmentType.PHRASE_FAIL,
        EAssigmentType.COLLOCATION_CHECK,
      ].map((type) => {
        const assignments = generatedAssignments[type] || [];
        const isExpanded = expandedTypes[type];

        return (
          <div key={type} className="border rounded-md p-4 space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-medium">{getTypeLabel(type)}</span>
              <div className="flex gap-2 items-center">
                {isPending ? (
                  <Button variant="outline" size="sm" disabled>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  </Button>
                ) : (
                  <Button type="button" size="sm" onClick={() => handleCreateClick(type)}>
                    {assignments.length ? 'Regenerate' : 'Generate'}
                  </Button>
                )}
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

            {isError && error && (
              <div className="text-sm text-red-500">
                {error instanceof Error ? error.message : 'An error occurred.'}
              </div>
            )}

            {isExpanded && !isPending && (
              <div className="mt-4 space-y-4">
                {assignments.length ? (
                  assignments.map((assignment, index) => (
                    <AssignmentCard
                      key={index}
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
        <Button type="button" onClick={handleNext} disabled={!canNext}>
          {isCreating ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            'Save and continue assign lesson'
          )}
        </Button>
      </div>
    </div>
  );
}
