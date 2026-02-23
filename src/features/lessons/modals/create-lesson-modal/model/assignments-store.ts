import { AssignmentPreviewDto } from '@/entities/lessons/api/create-assignments-preview';
import { AssignmentType } from '@/shared/domain/assignment';

export type AssignmentState = Partial<Record<AssignmentType, AssignmentPreviewDto[]>>;

export type AssignmentAction =
  | { type: 'SET_ASSIGNMENTS'; payload: { typeKey: AssignmentType; data: AssignmentPreviewDto[] } }
  | { type: 'RESET_ASSIGNMENTS' };

export const assignmentReducer = (
  state: AssignmentState,
  action: AssignmentAction,
): AssignmentState => {
  switch (action.type) {
    case 'SET_ASSIGNMENTS':
      return {
        ...state,
        [action.payload.typeKey]: action.payload.data,
      };
    case 'RESET_ASSIGNMENTS':
      return {};
    default:
      return state;
  }
};
