import { api, IsoDateString, StudentIdentityDto } from '@/shared/api';
import { AssignmentType } from '@/shared/domain/assignment';
import type { QuestionType } from '@/shared/domain/assignment/question-type';

export type StudentAssignmentStatus = 'PENDING' | 'COMPLETED' | 'GRADED';

export type StudentLessonProgressAttemptQuestionDto = {
  id: number;
  text: string;
  questionType: QuestionType;
  explanation: string | null;

  studentAnswer: unknown;
  isCorrect: boolean | null;

  correctAnswerText: string | null;
};

export type StudentLessonProgressAttemptDto = {
  id: number;
  attemptNo: number;
  status: StudentAssignmentStatus;
  score: number | null;

  startedAt: IsoDateString | null;
  submittedAt: IsoDateString | null;
  gradedAt: IsoDateString | null;

  questions: StudentLessonProgressAttemptQuestionDto[];
};

export type StudentLessonProgressAssignmentDto = {
  id: number;
  type: { id: number; name: AssignmentType };
  attempts: StudentLessonProgressAttemptDto[];
};

export type StudentLessonProgressDto = {
  lesson: { id: number; title: string };

  student: StudentIdentityDto & {
    avatarUrl: string | null;
  };

  overall: {
    completedCount: number;
    totalCount: number;
    avgScore: number | null;
    lastActivityAt: IsoDateString | null;
  };

  assignments: StudentLessonProgressAssignmentDto[];
};

export async function getStudentLessonProgress(params: {
  studentId: number;
  lessonId: number;
}): Promise<StudentLessonProgressDto> {
  const { studentId, lessonId } = params;

  const { data } = await api.get<StudentLessonProgressDto>(
    `/students/${studentId}/lessons/${lessonId}/progress`,
  );

  return data;
}
