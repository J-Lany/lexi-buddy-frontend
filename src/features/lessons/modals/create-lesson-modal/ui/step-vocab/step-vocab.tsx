'use client';

import { useEffect, useMemo, useState } from 'react';

import { useTranslateVocabPreviewMutation } from '@/entities/lessons/model/mutation/translate-vocab-preview';
import {
  parseVocabTerms,
  VOCAB_MAX_TERMS,
} from '@/features/lessons/modals/create-lesson-modal/lib/parse-vocab-terms';
import type {
  CreateLessonDraft,
  DraftPatch,
} from '@/features/lessons/modals/create-lesson-modal/model/types';
import type { VocabItemDto } from '@/shared/api';
import { getErrorMessage } from '@/shared/lib/get-error-message';

import { VocabItemsList } from './ui/vocab-items-list';
import { VocabTermsInput } from './ui/vocab-terms-input';

type Props = {
  draft: CreateLessonDraft;
  onChange: (patch: DraftPatch) => void;
};

export function StepVocab({ draft, onChange }: Props) {
  const [termsRaw, setTermsRaw] = useState<string>('');
  const [vocabItems, setVocabItems] = useState<VocabItemDto[]>(draft.vocabItems);

  const { mutate, isPending, isError, error } = useTranslateVocabPreviewMutation();

  useEffect(() => {
    setVocabItems(draft.vocabItems);

    const nextTerms = draft.vocabItems.length ? draft.vocabItems.map((i) => i.term).join('. ') : '';
    setTermsRaw(nextTerms);
  }, [draft.vocabItems]);

  const setVocabItemsSafe = (updater: (prev: VocabItemDto[]) => VocabItemDto[]) => {
    setVocabItems((prev) => {
      const next = updater(prev);
      onChange({ vocabItems: next });
      return next;
    });
  };

  const { terms, normalized } = useMemo(() => parseVocabTerms(termsRaw), [termsRaw]);

  const normalizeTerms = () => {
    if (termsRaw !== normalized) setTermsRaw(normalized);
  };

  const handleTranslate = () => {
    setVocabItemsSafe(() => []);

    mutate(
      {
        level: draft.level,
        topic: draft.topic,
        ageGroup: draft.ageCategory,
        terms,
      },
      {
        onSuccess: (items) => {
          setVocabItemsSafe(() => items);
        },
      },
    );
  };

  const handleChangeTranslation = (index: number, value: string) => {
    setVocabItemsSafe((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], translation: value.trim() ? value : null };
      return next;
    });
  };

  const handleChangeSynonym = (index: number, synonymIndex: number, value: string) => {
    setVocabItemsSafe((prev) => {
      const next = [...prev];
      const current = next[index];
      const synonyms = [...(current.synonyms ?? [])];
      synonyms[synonymIndex] = value;
      next[index] = { ...current, synonyms };
      return next;
    });
  };

  const handleRemoveItem = (index: number) => {
    setVocabItemsSafe((prev) => prev.filter((_, i) => i !== index));
  };

  const handleRemoveSynonym = (index: number, synonymIndex: number) => {
    setVocabItemsSafe((prev) => {
      const next = [...prev];
      const current = next[index];
      const synonyms = (current.synonyms ?? []).filter((_, si) => si !== synonymIndex);
      next[index] = { ...current, synonyms };
      return next;
    });
  };

  const canTranslate = !isPending && terms.length > 0;

  return (
    <div className="grid gap-4">
      <VocabTermsInput
        value={termsRaw}
        maxTerms={VOCAB_MAX_TERMS}
        onChange={setTermsRaw}
        onBlurNormalize={normalizeTerms}
        onTranslate={handleTranslate}
        translateDisabled={!canTranslate}
        isPending={isPending}
        errorMessage={isError ? getErrorMessage(error) : null}
      />

      {vocabItems.length > 0 ? (
        <VocabItemsList
          items={vocabItems}
          onRemoveItem={handleRemoveItem}
          onChangeTranslation={handleChangeTranslation}
          onChangeSynonym={handleChangeSynonym}
          onRemoveSynonym={handleRemoveSynonym}
        />
      ) : null}
    </div>
  );
}
