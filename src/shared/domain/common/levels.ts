export const level = {
  A1: 'A1',
  A2: 'A2',
  B1: 'B1',
  B2: 'B2',
  C1: 'C1',
  C2: 'C2',
} as const;

export type Level = (typeof level)[keyof typeof level];

export const ALL_LEVELS = Object.values(level) as Level[];
