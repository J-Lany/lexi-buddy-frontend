import { api } from '@/shared/api';
import type { Level } from '@/shared/domain/common';

export type CreateGroupPayload = {
  name: string;
  level: Level;
  description?: string;
  studentIds: number[];
};

export async function createGroup(payload: CreateGroupPayload): Promise<void> {
  await api.post('/groups/my', payload);
}
