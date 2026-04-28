import { api } from '@/shared/api';
import type { Language } from '@/shared/domain/language';
import { omitUndefined } from '@/shared/lib/omit-undefined';

import type { TeacherProfileDto } from './get-teacher-profile';

export type UpdateTeacherProfilePayload = {
  firstName?: string;
  lastName?: string;
  defaultLanguage?: Language;
};

export async function updateTeacherProfile(
  payload: UpdateTeacherProfilePayload,
): Promise<TeacherProfileDto> {
  const body = omitUndefined(payload);
  const { data } = await api.patch<TeacherProfileDto>('/auth/me', body);
  return data;
}
