import { api, VocabItemDto } from '@/shared/api';
import { AssignmentType, QuestionType } from '@/shared/domain/assignment';
import type { AgeGroup, Level } from '@/shared/domain/common';
import type { InstructionLanguage } from '@/shared/domain/instruction-language';
import type { Language } from '@/shared/domain/language';
import { omitUndefined } from '@/shared/lib/omit-undefined';

export type SaveAssignmentAnswerDto = {
  id?: number;
  text: string;
  isCorrect: boolean;
};

export type SaveAssignmentQuestionDto = {
  id?: number;
  text: string;
  questionType: QuestionType;
  answers: SaveAssignmentAnswerDto[];
  explanation?: string;
};

export type SaveAssignmentDto = {
  type: AssignmentType;
  questions: SaveAssignmentQuestionDto[];
};

export type CreateLessonPayload = {
  title: string;
  level?: Level;
  ageCategory?: AgeGroup;
  topic?: string;
  description?: string;
  targetLanguage?: Language;
  nativeLanguage?: Language;
  instructionLanguage?: InstructionLanguage;
  additionalInstructions?: string;
  materialLinks?: string[];
  vocabItems?: VocabItemDto[];
  assignments?: SaveAssignmentDto[];
};

export type CreateLessonResponseDto = {
  lessonId: number;
};

export async function createLesson(payload: CreateLessonPayload): Promise<CreateLessonResponseDto> {
  const body = omitUndefined(payload);
  const { data } = await api.post<CreateLessonResponseDto>('/lessons', body);
  return data;
}
