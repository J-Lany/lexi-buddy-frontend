import type { InstructionLanguage } from '@/shared/domain/instruction-language';

export const INSTRUCTION_LANGUAGE_LABELS: Record<InstructionLanguage, string> = {
  native: 'Native language (L1)',
  target: 'Target language (L2)',
};
