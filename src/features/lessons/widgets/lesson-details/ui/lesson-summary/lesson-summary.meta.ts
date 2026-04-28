import { LANGUAGE_LABELS } from '@/shared/catalogs/language';
import type { InstructionLanguage } from '@/shared/domain/instruction-language';
import type { Language } from '@/shared/domain/language';

const INSTRUCTION_LANGUAGE_LABELS: Record<InstructionLanguage, string> = {
  native: 'Native language',
  target: 'Target language',
};

export function getLanguageLabel(language: Language | null) {
  if (!language) return '—';
  return LANGUAGE_LABELS[language] ?? language;
}

export function getInstructionLanguageLabel(language: InstructionLanguage | null) {
  if (!language) return '—';
  return INSTRUCTION_LANGUAGE_LABELS[language] ?? language;
}
