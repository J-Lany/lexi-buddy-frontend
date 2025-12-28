'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { useTranslateMutation } from '@/features/lessons/create-lesson-modal/hooks/use-translate';
import { Loader } from 'lucide-react';
import { CreateLessonDraft, VocabItem } from '@/features/lessons/create-lesson-modal/types';

export function StepVocab({
  draft,
  onChange,
  onNext,
  onBack,
}: {
  draft: CreateLessonDraft;
  onChange: (patch: Partial<CreateLessonDraft>) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const initialTerms = draft?.vocabItems.map((i) => i.term).join('. ');

  const [terms, setTerms] = useState(initialTerms);
  const { mutate, isPending, isError, error } = useTranslateMutation();
  const [vocabItems, setVocabItems] = useState<VocabItem[]>(draft.vocabItems ?? []);

  const canNext =
    draft.title.trim().length > 0 &&
    draft.level &&
    draft.topic.trim().length > 0 &&
    vocabItems.length > 0;

  const handleTranslate = () => {
    setVocabItems([]);

    const termsArray = terms
      .split('.')
      .map((t) => t.trim())
      .filter(Boolean);

    mutate(
      {
        level: draft.level,
        topic: draft.topic,
        ageGroup: draft.ageGroup,
        terms: termsArray,
      },
      {
        onSuccess: (items) => {
          setVocabItems(items);
          onChange({ vocabItems: items });
        },
      },
    );
  };

  const handleChangeTranslation = (index: number, value: string) => {
    setVocabItems((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], translation: value };
      onChange({ vocabItems: next });
      return next;
    });
  };

  const handleChangeSynonym = (index: number, synonymIndex: number, value: string) => {
    setVocabItems((prev) => {
      const next = [...prev];
      const synonyms = [...(next[index].synonyms ?? [])];
      synonyms[synonymIndex] = value;
      next[index] = { ...next[index], synonyms };
      onChange({ vocabItems: next });
      return next;
    });
  };

  return (
    <div className="grid gap-4">
      <Textarea
        name="vocab"
        placeholder="Enter up to 15 words separated by dots. Any extra words will be truncated."
        value={terms}
        onChange={(e) => {
          const value = e.target.value;
          const words = value.split('.');
          if (words.length > 15) {
            const trimmed = words.slice(0, 15).join('.');
            setTerms(trimmed);
          } else {
            setTerms(value);
          }
        }}
      />

      <Button type="button" onClick={handleTranslate} disabled={isPending}>
        {isPending ? 'Translating...' : 'Translate'}
      </Button>

      {isError && (
        <div className="text-red-500 mt-2">
          {error instanceof Error ? error.message : 'An error occurred.'}
        </div>
      )}

      {isPending && (
        <div className="flex justify-center mt-4">
          <Loader className="animate-spin text-xl" />
        </div>
      )}

      {vocabItems.length > 0 &&
        vocabItems.map((item, i) => (
          <div key={i} className="border-b border-slate-200 py-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
              <div className="flex-1 flex flex-col">
                <span className="text-xs font-medium text-slate-500">Term</span>
                <Input value={item.term} className="mt-1" readOnly />
              </div>

              <div className="flex-[2] flex flex-col">
                <span className="text-xs font-medium text-slate-500">Translation</span>
                <Input
                  value={item.translation}
                  className="mt-1"
                  onChange={(e) => handleChangeTranslation(i, e.target.value)}
                />
              </div>
            </div>

            {item.synonyms && (
              <div className="mt-2 sm:pl-8">
                <span className="text-xs font-medium text-slate-500">Synonyms</span>
                {item.synonyms?.map((synonym, si) => (
                  <Input
                    key={si}
                    value={synonym}
                    className="mt-1"
                    onChange={(e) => handleChangeSynonym(i, si, e.target.value)}
                  />
                ))}
              </div>
            )}
          </div>
        ))}

      <div className="flex justify-between gap-2 pt-2">
        <Button type="button" variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button type="button" onClick={onNext} disabled={!canNext}>
          Next
        </Button>
      </div>
    </div>
  );
}
