import { EAssigmentType } from '@/lib/enums';
import { TAssignment } from '@/lib/types';

export type AssignmentState = {
  [key in EAssigmentType]?: TAssignment[];
};

export type AssignmentAction =
  | { type: 'SET_ASSIGNMENTS'; payload: { typeKey: EAssigmentType; data: TAssignment[] } }
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
