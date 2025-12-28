import {
  CreateLessonDraft,
  EAssigmentType,
  TAnswer,
  TAssignment,
} from '@/features/lessons/create-lesson-modal/types';

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

export const prepareLessonToSubmit = (draft: Partial<CreateLessonDraft>, generatedAssignments) => {
  if (!generatedAssignments) return;

  const assignments = Object.entries(generatedAssignments).map(
    ([type, questions]: [string, TAssignment]) => {
      return {
        type: type,
        questions: questions.map((q: TAssignment) => ({
          text: q.question,
          questionType: q.questionType,
          explanation: q.explanation,
          answers: q.answers.map((a: TAnswer) => ({
            text: a.text,
            isCorrect: a.isCorrect,
          })),
        })),
      };
    },
  );

  return {
    title: draft.title,
    level: draft.level,
    ageCategory: draft.ageGroup,
    topic: draft.topic,
    vocabItems: draft.vocabItems,
    assignments,
  };
};
