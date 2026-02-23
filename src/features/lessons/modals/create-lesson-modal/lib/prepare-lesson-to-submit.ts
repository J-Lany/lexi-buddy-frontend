import { AssignmentPreviewDto } from '@/entities/lessons/api/create-assignments-preview';
import type { CreateLessonPayload, SaveAssignmentDto } from '@/entities/lessons/api/create-lesson';
import { AssignmentState } from '@/features/lessons/modals/create-lesson-modal/model/assignments-store';
import type { CreateLessonDraft } from '@/features/lessons/modals/create-lesson-modal/model/types';
import type { AssignmentType } from '@/shared/domain/assignment';

export function prepareLessonToSubmit(
  draft: CreateLessonDraft,
  generatedAssignments: AssignmentState,
): CreateLessonPayload {
  const assignments: SaveAssignmentDto[] = Object.entries(generatedAssignments)
    .filter(
      (entry): entry is [AssignmentType, AssignmentPreviewDto[]] =>
        Array.isArray(entry[1]) && entry[1].length > 0,
    )
    .map(([type, questions]) => ({
      type,
      questions: questions.map((q) => ({
        text: q.question,
        questionType: q.questionType,
        explanation: q.explanation || undefined,
        answers: q.answers.map((a) => ({
          text: a.text,
          isCorrect: a.isCorrect,
        })),
      })),
    }));

  return {
    title: draft.title,
    level: draft.level,
    ageCategory: draft.ageCategory,
    topic: draft.topic || undefined,
    description: draft.description || undefined,
    vocabItems: draft.vocabItems,
    assignments: assignments.length > 0 ? assignments : undefined,
  };
}
