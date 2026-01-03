'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useEffect, useRef, useState } from 'react';
import { useTranslateMutation } from '@/features/lessons/create-lesson-modal/hooks/use-translate';
import { Loader } from 'lucide-react';
import { CreateLessonDraft, VocabItem } from '@/features/lessons/create-lesson-modal/types';

type Props = {
  draft: CreateLessonDraft;
  onChange: (patch: Partial<CreateLessonDraft>) => void;
};
export function StepVocab({ draft, onChange }: Props) {
  const initialTerms = draft?.vocabItems.map((i) => i.term).join('. ');

  const [terms, setTerms] = useState(initialTerms);
  const { mutate, isPending, isError, error } = useTranslateMutation();
  const [vocabItems, setVocabItems] = useState<VocabItem[]>(draft.vocabItems ?? []);

  const onChangeRef = useRef(onChange);
  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    onChangeRef.current({ vocabItems });
  }, [vocabItems]);

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
        },
      },
    );
  };

  const handleChangeTranslation = (index: number, value: string) => {
    setVocabItems((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], translation: value };
      return next;
    });
  };

  const handleChangeSynonym = (index: number, synonymIndex: number, value: string) => {
    setVocabItems((prev) => {
      const next = [...prev];
      const synonyms = [...(next[index].synonyms ?? [])];
      synonyms[synonymIndex] = value;
      next[index] = { ...next[index], synonyms };
      return next;
    });
  };

  return (
    <div className="grid gap-4">
      <Textarea
        name="vocab"
        className="min-h-[110px] rounded-3xl"
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

      {vocabItems.length > 0 ? (
        <div className="space-y-3">
          <div className="ui-panel overflow-hidden">
            {vocabItems.map((item, i) => (
              <div key={i} className="px-4 py-4">
                {i !== 0 ? <div className="-mx-4 mb-4 h-px bg-border/60" /> : null}

                <div className="grid gap-3">
                  <div className="grid gap-1">
                    <div className="ui-meta tracking-wide uppercase">Term</div>
                    <Input value={item.term} readOnly className="h-11 rounded-2xl" />
                  </div>

                  <div className="grid gap-1">
                    <div className="ui-meta tracking-wide uppercase">Translation</div>
                    <Input
                      value={item.translation}
                      onChange={(e) => handleChangeTranslation(i, e.target.value)}
                      className="h-11 rounded-2xl"
                    />
                  </div>

                  {item.synonyms?.length ? (
                    <div className="grid gap-2 pt-1">
                      <div className="ui-meta tracking-wide uppercase">Synonyms</div>

                      <div className="grid gap-2">
                        {item.synonyms.map((syn, si) => (
                          <Input
                            key={si}
                            value={syn}
                            onChange={(e) => handleChangeSynonym(i, si, e.target.value)}
                            className="h-11 rounded-2xl"
                          />
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            ))}
          </div>

          <p className="text-[12px] text-muted-foreground">
            Tip: translations and synonyms are editable.
          </p>
        </div>
      ) : null}
    </div>
  );
}
