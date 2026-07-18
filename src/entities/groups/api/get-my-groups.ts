import { api } from '@/shared/api';
import type { Level } from '@/shared/domain/common';

export type GroupStudentPreviewDto = {
  id: number;
  name: string;
  level: Level | null;
  telegramValue: string;
};

export type GroupDto = {
  id: number;
  name: string;
  level: Level | null;
  students: GroupStudentPreviewDto[];
};

export async function getMyGroups(): Promise<GroupDto[]> {
  const { data } = await api.get<GroupDto[]>('/groups/my');

  return data;
}
