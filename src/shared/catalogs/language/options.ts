import { ALL_LANGUAGES, type Language } from '@/shared/domain/language';

import { LANGUAGE_LABELS } from './labels';

export const LANGUAGE_OPTIONS = ALL_LANGUAGES.map((l) => ({
  value: l,
  label: LANGUAGE_LABELS[l],
})) satisfies { value: Language; label: string }[];
