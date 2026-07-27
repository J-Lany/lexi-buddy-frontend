import { AgeGroup, ageGroup } from '@/shared/domain/common';

export const AGE_GROUP_TRANSLATION_KEYS = {
  [ageGroup.CHILD]: 'students.about.ageGroups.child',
  [ageGroup.TEENAGER]: 'students.about.ageGroups.teenager',
  [ageGroup.ADULT]: 'students.about.ageGroups.adult',
} as const satisfies Record<AgeGroup, string>;

export const AGE_GROUP_LABELS: Record<AgeGroup, string> = {
  [ageGroup.CHILD]: 'Children',
  [ageGroup.TEENAGER]: 'Teenagers',
  [ageGroup.ADULT]: 'Adults',
};
