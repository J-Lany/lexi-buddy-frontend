import { ALL_LEVELS, type Level } from '@/shared/domain/common/levels';

export type SelectOption<T extends string> = {
  value: T;
  label: string;
};

export const LEVEL_OPTIONS: readonly SelectOption<Level>[] = ALL_LEVELS.map((v) => ({
  value: v,
  label: v,
}));
