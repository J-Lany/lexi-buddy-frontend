'use client';

import type { VocabItemDto } from '@/shared/api';

import { VocabItemRow } from './vocab-item-row';

type Props = {
  items: VocabItemDto[];
  onRemoveItem: (index: number) => void;
  onChangeTranslation: (index: number, value: string) => void;
  onRemoveTranslation: (index: number) => void;
  onChangeSynonym: (index: number, synonymIndex: number, value: string) => void;
  onRemoveSynonym: (index: number, synonymIndex: number) => void;
  onAddSynonym: (index: number) => void;
};

export function VocabItemsList({
  items,
  onRemoveItem,
  onChangeTranslation,
  onRemoveTranslation,
  onChangeSynonym,
  onRemoveSynonym,
  onAddSynonym,
}: Props) {
  return (
    <div className="space-y-3">
      <div className="ui-panel overflow-hidden">
        {items.map((item, i) => (
          <div key={`${item.term}-${i}`} className="px-4 py-4">
            {i !== 0 ? <div className="-mx-4 mb-4 h-px bg-border/60" /> : null}

            <VocabItemRow
              item={item}
              index={i}
              onRemove={() => onRemoveItem(i)}
              onChangeTranslation={(value) => onChangeTranslation(i, value)}
              onRemoveTranslation={() => onRemoveTranslation(i)}
              onChangeSynonym={(synIndex, value) => onChangeSynonym(i, synIndex, value)}
              onRemoveSynonym={(synIndex) => onRemoveSynonym(i, synIndex)}
              onAddSynonym={() => onAddSynonym(i)}
            />
          </div>
        ))}
      </div>

      <p className="text-[12px] text-muted-foreground">
        Tip: translations and synonyms are editable.
      </p>
    </div>
  );
}
