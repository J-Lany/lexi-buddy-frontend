import { useQuery } from '@tanstack/react-query';

import {
  getStudentLessonProgress,
  StudentLessonProgressDto,
} from '@/entities/students/api/get-student-lesson-progress';
import { HttpError } from '@/shared/api';
import { studentsKeys } from '@/shared/query';

export function useStudentLessonProgressQuery(studentId?: number, lessonId?: number) {
  const enabled = studentId !== undefined && lessonId !== undefined;

  const queryKey = enabled ? studentsKeys.lessonProgress(studentId, lessonId) : studentsKeys.all;

  return useQuery<StudentLessonProgressDto, HttpError>({
    queryKey,
    enabled,
    queryFn: () => getStudentLessonProgress({ studentId: studentId!, lessonId: lessonId! }),
  });
}
