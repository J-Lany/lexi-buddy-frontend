import { AgeGroup, ageGroup } from '@/shared/domain/common';

export const AGE_GROUP_LABELS: Record<AgeGroup, string> = {
  [ageGroup.CHILD]: 'Children',
  [ageGroup.TEENAGER]: 'Teenagers',
  [ageGroup.ADULT]: 'Adults',
};
