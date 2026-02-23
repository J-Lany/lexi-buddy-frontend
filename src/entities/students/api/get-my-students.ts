import { api, GroupPreviewDto } from '@/shared/api';
import type { Level } from '@/shared/domain/common';

export type StudentDto = {
  id: number;
  name: string;
  username: string;
  avatarUrl: string | null;
  groups: GroupPreviewDto[];
  level: Level;
};

export async function getMyStudents(): Promise<StudentDto[]> {
  const { data } = await api.get<StudentDto[]>('/students/my');
  return data;
}
