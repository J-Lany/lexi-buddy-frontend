import { api } from '@/shared/api';
import type { Language } from '@/shared/domain/language';

export type TeacherProfileDto = {
  id: number;
  firstName: string | null;
  lastName: string | null;
  username: string | null;
  avatarUrl: string | null;
  defaultLanguage: Language;
};

export async function getTeacherProfile(): Promise<TeacherProfileDto> {
  const { data } = await api.get<TeacherProfileDto>('/auth/me');
  return data;
}
