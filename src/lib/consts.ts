import { EAgeGroup } from '@/lib/enums';

export const LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'].map((v) => ({ value: v, label: v }));

export const AGE_LABELS: Record<EAgeGroup, string> = {
  [EAgeGroup.CHILD]: 'Children',
  [EAgeGroup.TEENAGER]: 'Teenagers',
  [EAgeGroup.ADULT]: 'Adults',
};

export const AGE_SELECTORS = Object.values(EAgeGroup).map((a) => ({
  value: a,
  label: AGE_LABELS[a],
}));
