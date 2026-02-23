export const ageGroup = {
  CHILD: 'child',
  TEENAGER: 'teenager',
  ADULT: 'adult',
} as const;

export type AgeGroup = (typeof ageGroup)[keyof typeof ageGroup];

export const ALL_AGE_GROUPS = Object.values(ageGroup);
