export const questionType = {
  MULTIPLE_CHOICE: 'multiple_choice',
  GAP_FILL: 'gap_fill',
  OPEN_TEXT: 'open_text',
};

export type QuestionType = (typeof questionType)[keyof typeof questionType];

export const ALL_QUESTION_TYPES = Object.values(questionType);
