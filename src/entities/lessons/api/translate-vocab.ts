import { api, VocabItemDto } from '@/shared/api';
import type { AgeGroup, Level } from '@/shared/domain/common';
import type { InstructionLanguage } from '@/shared/domain/instruction-language';
import type { Language } from '@/shared/domain/language';

export type TranslateVocabPayload = {
  terms: string[];
  topic: string;
  targetLanguage: Language;
  nativeLanguage: Language;
  instructionLanguage: InstructionLanguage;
  level: Level;
  ageGroup: AgeGroup;
};

export async function translateVocab(payload: TranslateVocabPayload): Promise<VocabItemDto[]> {
  // Backend does 1 AI call with a 90s timeout (ai.service.ts) — 90s + 30s headroom.
  const { data } = await api.post<VocabItemDto[]>('/lessons/vocab/preview', payload, {
    timeout: 120_000,
  });
  return data;
}
