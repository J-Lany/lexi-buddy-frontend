import type { Level } from '@/shared/domain/common';

export type CreateGroupDraft = {
  name: string;
  level: Level;
  description: string;
  studentIds: number[];
};
