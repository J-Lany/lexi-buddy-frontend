import { ageGroup } from '@/shared/domain/common';

import { AGE_GROUP_LABELS } from './labels';

export const AGE_GROUP_OPTIONS = Object.values(ageGroup).map((a) => ({
  value: a,
  label: AGE_GROUP_LABELS[a],
}));
