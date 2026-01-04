import { EAssigmentType } from '@/lib/enums';

export type TAnswer = {
  text: string;
  isCorrect: boolean;
};

export type TAssignment = {
  question: string;
  questionType: 'multiple_choice' | 'gap_fill' | 'open_text';
  answers: TAnswer[];
  explanation: string;
  assignmentType: EAssigmentType;
};
