import { ageGroup } from '@/shared/domain/common';

import { AGE_GROUP_TRANSLATION_KEYS } from './labels';

type Translate = (key: string) => string;

export function getLocalizedAgeGroupLabel(
  value: keyof typeof AGE_GROUP_TRANSLATION_KEYS,
  t: Translate,
) {
  return t(AGE_GROUP_TRANSLATION_KEYS[value]);
}

export function getLocalizedAgeGroupOptions(t: Translate) {
  return Object.values(ageGroup).map((value) => ({
    value,
    label: getLocalizedAgeGroupLabel(value, t),
  }));
}
