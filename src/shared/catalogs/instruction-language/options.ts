import {
  ALL_INSTRUCTION_LANGUAGES,
  type InstructionLanguage,
} from '@/shared/domain/instruction-language';

import { INSTRUCTION_LANGUAGE_LABELS } from './labels';

export const INSTRUCTION_LANGUAGE_OPTIONS = ALL_INSTRUCTION_LANGUAGES.map((l) => ({
  value: l,
  label: INSTRUCTION_LANGUAGE_LABELS[l],
})) satisfies { value: InstructionLanguage; label: string }[];
