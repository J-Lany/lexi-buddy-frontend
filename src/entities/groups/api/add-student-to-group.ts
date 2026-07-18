import { api } from '@/shared/api';

export type AddStudentToGroupPayload = {
  studentId: number;
  groupId: number;
};

export async function addStudentToGroup(payload: AddStudentToGroupPayload): Promise<void> {
  const { studentId, groupId } = payload;
  await api.post(`/groups/${groupId}/students`, null, {
    params: { studentId },
  });
}
