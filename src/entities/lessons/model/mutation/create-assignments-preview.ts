import { useMutation } from '@tanstack/react-query';

import {
  AssignmentPreviewDto,
  CreateAssignmentsPayload,
  createAssignmentsPreview,
} from '@/entities/lessons/api/create-assignments-preview';
import { HttpError } from '@/shared/api';

export function useCreateAssignmentsPreviewMutation() {
  return useMutation<AssignmentPreviewDto[], HttpError, CreateAssignmentsPayload>({
    mutationFn: createAssignmentsPreview,
  });
}
