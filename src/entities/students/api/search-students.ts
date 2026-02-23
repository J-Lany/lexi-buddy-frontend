import { api, StudentIdentityDto } from '@/shared/api';
import { Level } from '@/shared/domain/common';

export type StudentBySearchDto = StudentIdentityDto & { level: Level };

export async function searchStudents(query: string): Promise<StudentBySearchDto[]> {
  const { data } = await api.get<StudentBySearchDto[]>(`/students/search`, {
    params: { q: query },
  });
  return data;
}
