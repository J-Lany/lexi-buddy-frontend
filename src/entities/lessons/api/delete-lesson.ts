import { api } from '@/shared/api';
import { DeleteLessonScope } from '@/shared/api/contracts/lesson';

type DeleteLessonParams = {
  lessonId: number;
  scope: DeleteLessonScope;
};

export type DeleteLessonResponse = {
  ok: true;
};

export async function deleteLesson(params: DeleteLessonParams): Promise<void> {
  const { scope, lessonId } = params;

  await api.delete<DeleteLessonResponse>(`/lessons/${lessonId}`, {
    params: { scope },
  });
}
