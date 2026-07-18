import { api } from '@/shared/api';

export type RemoveStudentFromGroupPayload = {
  studentId: number;
  groupId: number;
};

export async function removeStudentFromGroup(
  payload: RemoveStudentFromGroupPayload,
): Promise<void> {
  const { studentId, groupId } = payload;
  await api.delete(`/groups/${groupId}/students/${studentId}`);
}
