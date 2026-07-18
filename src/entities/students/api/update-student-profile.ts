import { api } from '@/shared/api';
import type { AgeGroup, Level } from '@/shared/domain/common';
import { omitUndefined } from '@/shared/lib/omit-undefined';

export type UpdateStudentProfilePayload = {
  studentId: number;
  firstName?: string;
  lastName?: string;
  level?: Level;
  ageGroup?: AgeGroup;
};
export async function updateStudentProfile(payload: UpdateStudentProfilePayload): Promise<void> {
  const { studentId, ...body } = payload;

  const cleanBody = omitUndefined(body);

  await api.patch(`/students/${studentId}`, cleanBody);
}
