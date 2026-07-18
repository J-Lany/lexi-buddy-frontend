import { api } from '@/shared/api';
import type { AgeGroup, Level } from '@/shared/domain/common';
import type { InstructionLanguage } from '@/shared/domain/instruction-language';
import type { Language } from '@/shared/domain/language';

export type LessonSummaryDto = {
  id: number;
  title: string;
  topic: string | null;
  level: Level | null;
  ageCategory: AgeGroup | null;
  targetLanguage: Language | null;
  nativeLanguage: Language | null;
  instructionLanguage: InstructionLanguage | null;
  vocabCount: number;
  assignmentsCount: number;
};

export async function getMyLessons(): Promise<LessonSummaryDto[]> {
  const { data } = await api.get<LessonSummaryDto[]>('/lessons');
  return data;
}
