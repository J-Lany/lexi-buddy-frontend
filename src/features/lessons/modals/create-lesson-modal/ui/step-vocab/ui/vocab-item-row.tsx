'use client';

import { Trash2, X } from 'lucide-react';

import type { VocabItemDto } from '@/shared/api';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';

type Props = {
  item: VocabItemDto;
  index: number;

  onRemove: () => void;
  onChangeTranslation: (value: string) => void;
  onChangeSynonym: (synonymIndex: number, value: string) => void;
  onRemoveSynonym: (synonymIndex: number) => void;
};

export function VocabItemRow({
  item,
  onRemove,
  onChangeTranslation,
  onChangeSynonym,
  onRemoveSynonym,
}: Props) {
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

      <div className="grid gap-1">
        <div className="ui-meta tracking-wide uppercase">Translation</div>
        <Input
          value={item.translation ?? ''}
          onChange={(e) => onChangeTranslation(e.target.value)}
          className="h-11 rounded-2xl"
        />
      </div>

      {item.synonyms?.length ? (
        <div className="grid gap-2 pt-1">
          <div className="ui-meta tracking-wide uppercase">Synonyms</div>

          <div className="grid gap-2">
            {item.synonyms.map((syn, si) => (
              <div key={`${syn}-${si}`} className="relative">
                <Input
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
        </div>
      ) : null}
    </div>
  );
}
