import { useMutation } from '@tanstack/react-query';

import { translateVocab, TranslateVocabPayload } from '@/entities/lessons/api/translate-vocab';
import type { HttpError, VocabItemDto } from '@/shared/api';

export function useTranslateVocabPreviewMutation() {
  return useMutation<VocabItemDto[], HttpError, TranslateVocabPayload>({
    mutationFn: translateVocab,
  });
}
