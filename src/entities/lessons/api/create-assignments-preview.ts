import { api } from '@/shared/api';
import type { AssignmentType, QuestionType } from '@/shared/domain/assignment';
import type { AgeGroup, Level } from '@/shared/domain/common';
import type { InstructionLanguage } from '@/shared/domain/instruction-language';
import type { Language } from '@/shared/domain/language';

const AI_GENERATION_TIMEOUT_MS = 60_000;

export type CreateAssignmentsPayload = {
  type: AssignmentType;
  questionsCount: number;
  terms: string[];
  topic: string;
  targetLanguage: Language;
  nativeLanguage: Language;
  instructionLanguage: InstructionLanguage;
  level: Level;
  ageGroup: AgeGroup;
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
  const { data } = await api.post<AssignmentPreviewDto[]>('/lessons/assignments/preview', payload, {
    timeout: AI_GENERATION_TIMEOUT_MS,
  });
  return data;
}
