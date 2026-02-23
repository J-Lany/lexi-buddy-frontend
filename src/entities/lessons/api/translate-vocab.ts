import { api, VocabItemDto } from '@/shared/api';
import type { AgeGroup, Level } from '@/shared/domain/common';

export type TranslateVocabPayload = {
  level: Level;
  topic: string;
  ageGroup: AgeGroup;
  terms: string[];
};

export async function translateVocab(payload: TranslateVocabPayload): Promise<VocabItemDto[]> {
  const { data } = await api.post<VocabItemDto[]>('/lessons/vocab/preview', payload);
  return data;
}
