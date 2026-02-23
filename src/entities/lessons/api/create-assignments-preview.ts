import { api } from '@/shared/api';
import type { AssignmentType, QuestionType } from '@/shared/domain/assignment';
import type { AgeGroup, Level } from '@/shared/domain/common';

export type CreateAssignmentsPayload = {
  level: Level;
  topic: string;
  ageGroup: AgeGroup;
  terms: string[];
  questionsCount: number;
  type: AssignmentType;
};

export type AnswerDto = {
  text: string;
  isCorrect: boolean;
};

export type AssignmentPreviewDto = {
  question: string;
  questionType: QuestionType;
  answers: AnswerDto[];
  explanation: string;
  assignmentType: AssignmentType;
};

export async function createAssignmentsPreview(
  payload: CreateAssignmentsPayload,
): Promise<AssignmentPreviewDto[]> {
  const { data } = await api.post<AssignmentPreviewDto[]>('/lessons/assignments/preview', payload);
  return data;
}
