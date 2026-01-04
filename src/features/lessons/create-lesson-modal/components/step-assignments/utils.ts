import { CreateLessonDraft } from '@/features/lessons/create-lesson-modal/types';
import { CreateLessonPayload } from '@/features/lessons/create-lesson-modal/hooks/use-create-lesson';
import { AssignmentState } from '@/features/lessons/create-lesson-modal/components/step-assignments/store';
import { EAssigmentType } from '@/lib/enums';
import { TAnswer, TAssignment } from '@/lib/types';

export const getTypeLabel = (type: EAssigmentType): string => {
  switch (type) {
    case EAssigmentType.DEFINITION_QUIZ:
      return 'Definition Quiz';
    case EAssigmentType.GAP_FILLING:
      return 'Gap Filling';
    case EAssigmentType.PHRASE_FAIL:
      return 'Phrase Fail';
    case EAssigmentType.COLLOCATION_CHECK:
      return 'Collocation Check';
    default:
      return 'Unknown Type';
  }
};

export const prepareLessonToSubmit = (
  draft: Partial<CreateLessonDraft>,
  generatedAssignments: AssignmentState,
): CreateLessonPayload => {
  const assignments = Object.entries(generatedAssignments)
    .filter(([, questions]) => Array.isArray(questions) && questions.length > 0)
    .map(([type, questions]) => ({
      type: type as EAssigmentType,
      questions: (questions as TAssignment[]).map((q) => ({
        text: q.question,
        questionType: q.questionType,
        explanation: q.explanation,
        answers: q.answers.map((a: TAnswer) => ({
          text: a.text,
          isCorrect: a.isCorrect,
        })),
      })),
    }));

  return {
    title: draft.title,
    level: draft.level,
    ageCategory: draft.ageGroup,
    topic: draft.topic,
    vocabItems: draft.vocabItems,
    assignments,
  } as CreateLessonPayload;
};

export const STEP_TITLES = {
  1: 'Lesson details',
  2: 'Vocabulary',
  3: 'Assignments',
  4: 'Assign lesson',
};
