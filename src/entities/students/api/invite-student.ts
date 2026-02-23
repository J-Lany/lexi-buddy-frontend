import { api } from '@/shared/api';

export type InviteStudentPayload = {
  studentId: number;
  message?: string;
};

export async function inviteStudent(payload: InviteStudentPayload): Promise<void> {
  await api.post('/teacher-requests', payload);
}
