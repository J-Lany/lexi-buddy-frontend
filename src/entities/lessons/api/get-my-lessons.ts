import { api } from '@/shared/api';
import type { AgeGroup, Level } from '@/shared/domain/common';

export type LessonSummaryDto = {
  id: number;
  title: string;
  topic: string | null;
  level: Level | null;
  ageCategory: AgeGroup | null;
  vocabCount: number;
  assignmentsCount: number;
};

export async function getMyLessons(): Promise<LessonSummaryDto[]> {
  const { data } = await api.get<LessonSummaryDto[]>('/lessons');
  return data;
}
