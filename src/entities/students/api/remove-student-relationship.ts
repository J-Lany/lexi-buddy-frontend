import { api } from '@/shared/api';

export type RemoveStudentRelationshipParams = {
  studentId: number;
};

export type RemoveStudentRelationshipResponse = {
  removedFromGroups: number;
  revokedAssignments: number;
  expiredPendingInvites: number;
  affectedGroupIds: number[];
};

export async function removeStudentRelationship({
  studentId,
}: RemoveStudentRelationshipParams): Promise<RemoveStudentRelationshipResponse> {
  const { data } = await api.delete<RemoveStudentRelationshipResponse>(
    `/students/${studentId}/relationship`,
  );

  return data;
}
