import { ageGroup } from '@/shared/domain/common';

import { AGE_GROUP_LABELS, AGE_GROUP_TRANSLATION_KEYS } from './labels';

export const AGE_GROUP_OPTIONS = Object.values(ageGroup).map((a) => ({
  value: a,
  label: AGE_GROUP_LABELS[a],
}));

export function getLocalizedAgeGroupOptions(t: (key: string) => string) {
  return Object.values(ageGroup).map((value) => ({
    value,
    label: t(AGE_GROUP_TRANSLATION_KEYS[value]),
  }));
}
