'use client';

import { Plus, Trash2, X } from 'lucide-react';
import * as React from 'react';

import type { VocabItemDto } from '@/shared/api';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';

const MAX_SYNONYMS = 3;

type Props = {
  item: VocabItemDto;
  index: number;

  onRemove: () => void;
  onChangeTranslation: (value: string) => void;
  onRemoveTranslation: () => void;
  onChangeSynonym: (synonymIndex: number, value: string) => void;
  onRemoveSynonym: (synonymIndex: number) => void;
  onAddSynonym: () => void;
};

export function VocabItemRow({
  item,
  onRemove,
  onChangeTranslation,
  onRemoveTranslation,
  onChangeSynonym,
  onRemoveSynonym,
  onAddSynonym,
}: Props) {
  const [showTranslation, setShowTranslation] = React.useState(item.translation !== null);
  const synonymCount = item.synonyms?.length ?? 0;

  const synonymInputRefs = React.useRef<Array<HTMLInputElement | null>>([]);
  const prevSynonymCount = React.useRef(synonymCount);

  React.useEffect(() => {
    if (synonymCount > prevSynonymCount.current) {
      synonymInputRefs.current[synonymCount - 1]?.focus();
    }

    synonymInputRefs.current = synonymInputRefs.current.slice(0, synonymCount);
    prevSynonymCount.current = synonymCount;
  }, [synonymCount]);

  return (
    <div className="grid gap-3">
      <div className="grid gap-1">
        <div className="flex items-center justify-between gap-2">
          <div className="ui-meta tracking-wide uppercase">Term</div>

          <Button
            type="button"
            variant="ghost"
            onClick={onRemove}
            className="h-9 w-9 rounded-full p-0 text-muted-foreground hover:text-foreground"
            aria-label={`Remove term "${item.term}"`}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>

        <Input value={item.term} readOnly className="h-11 rounded-2xl" />
      </div>

      {showTranslation ? (
        <div className="grid gap-1">
          <div className="flex items-center justify-between gap-2">
            <div className="ui-meta tracking-wide uppercase">Translation</div>

            <Button
              type="button"
              variant="ghost"
              onClick={() => {
                setShowTranslation(false);
                onRemoveTranslation();
              }}
              className="h-7 w-7 rounded-full p-0 text-muted-foreground hover:text-foreground"
              aria-label="Remove translation"
            >
              <X className="h-3.5 w-3.5" />
            </Button>
          </div>

          <Input
            value={item.translation ?? ''}
            onChange={(e) => onChangeTranslation(e.target.value)}
            placeholder="Add translation…"
            className="h-11 rounded-2xl"
          />
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setShowTranslation(true)}
          className="flex items-center gap-1.5 text-[13px] font-medium text-primary/70 hover:text-primary transition-colors py-0.5 w-fit"
        >
          <Plus className="h-3.5 w-3.5" />
          Add translation
        </button>
      )}

      <div className="grid gap-2">
        {synonymCount > 0 && (
          <>
            <div className="ui-meta tracking-wide uppercase">Synonyms</div>

            <div className="grid gap-2">
              {item.synonyms!.map((syn, si) => (
                <div key={si} className="relative">
                  <Input
                    ref={(el) => {
                      synonymInputRefs.current[si] = el;
                    }}
                    value={syn}
                    onChange={(e) => onChangeSynonym(si, e.target.value)}
                    className="h-11 rounded-2xl pr-11"
                  />

                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => onRemoveSynonym(si)}
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full p-0 text-muted-foreground hover:text-foreground"
                    aria-label={`Remove synonym "${syn}"`}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </>
        )}

        {synonymCount < MAX_SYNONYMS && (
          <button
            type="button"
            onClick={onAddSynonym}
            className="flex items-center gap-1.5 text-[13px] font-medium text-primary/70 hover:text-primary transition-colors py-0.5 w-fit"
          >
            <Plus className="h-3.5 w-3.5" />
            Add synonym
          </button>
        )}
      </div>
    </div>
  );
}
