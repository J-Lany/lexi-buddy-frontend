import { EAgeGroup } from '@/lib/enums';

export const LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'].map((v) => ({ value: v, label: v }));

export const AGE_LABELS: Record<string, string> = {
  UNDER_18: 'Kids & Teens (Under 18)',
  BETWEEN_18_35: 'Young Adults (18–35)',
  OVER_35: 'Adults 35+',
};

export const AGE_SHORT_LABELS: Record<string, string> = {
  UNDER_18: 'Under 18',
  BETWEEN_18_35: '18–35',
  OVER_35: '35+',
};

export const AGE_SELECTORS = Object.values(EAgeGroup).map((a) => ({
  value: a,
  label: AGE_LABELS[a],
}));
