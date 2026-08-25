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
import { useI18n } from '@/shared/i18n';
import { getErrorMessage } from '@/shared/lib/get-error-message';

import { VocabItemsList } from './ui/vocab-items-list';
import { VocabTermsInput } from './ui/vocab-terms-input';

type Props = {
  draft: CreateLessonDraft;
  onChange: (patch: DraftPatch) => void;
};

export function StepVocab({ draft, onChange }: Props) {
  const { t } = useI18n();
  const [termsRaw, setTermsRaw] = useState<string>('');
  const [vocabItems, setVocabItems] = useState<VocabItemDto[]>(draft.vocabItems);

  const { mutate, isPending, isError, error } = useTranslateVocabPreviewMutation();

  useEffect(() => {
    setVocabItems(draft.vocabItems);

    const nextTerms = draft.vocabItems.length ? draft.vocabItems.map((i) => i.term).join('. ') : '';
    setTermsRaw(nextTerms);
  }, [draft.vocabItems]);

  useEffect(() => {
    onChange({ vocabItems });
  }, [vocabItems, onChange]);

  const { terms, normalized } = useMemo(() => parseVocabTerms(termsRaw), [termsRaw]);
  const overLimit = terms.length > VOCAB_MAX_TERMS;

  const normalizeTerms = () => {
    if (termsRaw !== normalized) setTermsRaw(normalized);
  };

  const handleTranslate = () => {
    setVocabItems([]);

    mutate(
      {
        terms,
        topic: draft.topic ?? '',
        targetLanguage: draft.targetLanguage,
        nativeLanguage: draft.nativeLanguage,
        instructionLanguage: draft.instructionLanguage,
        level: draft.level,
        ageGroup: draft.ageCategory,
      },
      {
        onSuccess: (items) => {
          setVocabItems(items);
        },
      },
    );
  };

  const handleChangeTranslation = (index: number, value: string) => {
    setVocabItems((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], translation: value.trim() ? value : null };
      return next;
    });
  };

  const handleChangeSynonym = (index: number, synonymIndex: number, value: string) => {
    setVocabItems((prev) => {
      const next = [...prev];
      const current = next[index];
      const synonyms = [...(current.synonyms ?? [])];
      synonyms[synonymIndex] = value;
      next[index] = { ...current, synonyms };
      return next;
    });
  };

  const handleRemoveItem = (index: number) => {
    setVocabItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleRemoveSynonym = (index: number, synonymIndex: number) => {
    setVocabItems((prev) => {
      const next = [...prev];
      const current = next[index];
      const synonyms = (current.synonyms ?? []).filter((_, si) => si !== synonymIndex);
      next[index] = { ...current, synonyms };
      return next;
    });
  };

  const handleRemoveTranslation = (index: number) => {
    setVocabItems((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], translation: null };
      return next;
    });
  };

  const handleAddSynonym = (index: number) => {
    setVocabItems((prev) => {
      const next = [...prev];
      const current = next[index];
      next[index] = { ...current, synonyms: [...(current.synonyms ?? []), ''] };
      return next;
    });
  };

  const canTranslate = !isPending && terms.length > 0 && !overLimit;

  const maxWordsError = overLimit
    ? t('lessons.vocab.maxWordsError')
        .replace('{max}', String(VOCAB_MAX_TERMS))
        .replace('{count}', String(terms.length - VOCAB_MAX_TERMS))
    : null;

  return (
    <div className="grid gap-5">
      <VocabTermsInput
        value={termsRaw}
        maxTerms={VOCAB_MAX_TERMS}
        count={terms.length}
        onChange={setTermsRaw}
        onBlurNormalize={normalizeTerms}
        onTranslate={handleTranslate}
        translateDisabled={!canTranslate}
        isPending={isPending}
        errorMessage={maxWordsError ?? (isError ? getErrorMessage(error) : null)}
      />

      {vocabItems.length > 0 ? (
        <VocabItemsList
          items={vocabItems}
          onRemoveItem={handleRemoveItem}
          onChangeTranslation={handleChangeTranslation}
          onRemoveTranslation={handleRemoveTranslation}
          onChangeSynonym={handleChangeSynonym}
          onRemoveSynonym={handleRemoveSynonym}
          onAddSynonym={handleAddSynonym}
        />
      ) : null}
    </div>
  );
}
