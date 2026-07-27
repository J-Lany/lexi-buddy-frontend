import { AgeGroup, ageGroup } from '@/shared/domain/common';

export const AGE_GROUP_TRANSLATION_KEYS = {
  [ageGroup.CHILD]: 'common.ageGroups.child',
  [ageGroup.TEENAGER]: 'common.ageGroups.teenager',
  [ageGroup.ADULT]: 'common.ageGroups.adult',
} as const satisfies Record<AgeGroup, string>;
