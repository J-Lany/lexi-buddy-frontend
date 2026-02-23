import { api } from '@/shared/api';
import { omitUndefined } from '@/shared/lib/omit-undefined';

export type AssignLessonPayload = {
  lessonId: number;
  studentIds?: number[];
  groupIds?: number[];
};
export async function assignLesson(payload: AssignLessonPayload): Promise<void> {
  const { studentIds, groupIds, lessonId } = payload;
  const body = omitUndefined({ studentIds, groupIds });
  await api.post(`/lessons/${lessonId}/assign`, body);
}
