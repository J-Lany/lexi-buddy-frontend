import { fireEvent, render, screen } from '@testing-library/react';
import { useState } from 'react';

import type { VocabItemDto } from '@/shared/api';

import { VocabItemRow } from '../vocab-item-row';

function VocabItemRowHarness({ initialItem }: { initialItem: VocabItemDto }) {
  const [item, setItem] = useState(initialItem);

  return (
    <VocabItemRow
      item={item}
      index={0}
      onRemove={() => {}}
      onChangeTranslation={(value) => setItem((prev) => ({ ...prev, translation: value }))}
      onRemoveTranslation={() => setItem((prev) => ({ ...prev, translation: null }))}
      onChangeSynonym={(synonymIndex, value) =>
        setItem((prev) => {
          const synonyms = [...(prev.synonyms ?? [])];
          synonyms[synonymIndex] = value;
          return { ...prev, synonyms };
        })
      }
      onRemoveSynonym={(synonymIndex) =>
        setItem((prev) => ({
          ...prev,
          synonyms: (prev.synonyms ?? []).filter((_, i) => i !== synonymIndex),
        }))
      }
      onAddSynonym={() =>
        setItem((prev) => ({ ...prev, synonyms: [...(prev.synonyms ?? []), ''] }))
      }
    />
  );
}

function typeCharByChar(input: HTMLElement, text: string) {
  let value = '';
  for (const char of text) {
    value += char;
    fireEvent.change(input, { target: { value } });
  }
}

describe('VocabItemRow — synonym input focus', () => {
  it('focuses the new synonym input on add and keeps focus while typing', () => {
    render(<VocabItemRowHarness initialItem={{ term: 'cat', translation: 'кот', synonyms: [] }} />);

    fireEvent.click(screen.getByText('Add synonym'));

    const synonymInput = screen.getAllByRole('textbox').at(-1)!;
    expect(synonymInput).toHaveFocus();

    typeCharByChar(synonymInput, 'kitty');

    // Same DOM node must still be mounted and focused — a remount (the bug)
    // would swap in a new node and drop document.activeElement.
    expect(document.activeElement).toBe(synonymInput);
    expect(synonymInput).toHaveValue('kitty');
  });

  it('supports adding multiple synonyms without losing existing values', () => {
    render(<VocabItemRowHarness initialItem={{ term: 'cat', translation: 'кот', synonyms: [] }} />);

    fireEvent.click(screen.getByText('Add synonym'));
    typeCharByChar(screen.getAllByRole('textbox').at(-1)!, 'kitty');

    fireEvent.click(screen.getByText('Add synonym'));
    typeCharByChar(screen.getAllByRole('textbox').at(-1)!, 'feline');

    const inputs = screen.getAllByRole('textbox');
    expect(inputs).toHaveLength(4); // term + translation + 2 synonyms
    expect(inputs[2]).toHaveValue('kitty');
    expect(inputs[3]).toHaveValue('feline');
  });

  it('keeps refs consistent and focus working after removing a synonym', () => {
    render(<VocabItemRowHarness initialItem={{ term: 'cat', translation: 'кот', synonyms: [] }} />);

    fireEvent.click(screen.getByText('Add synonym'));
    typeCharByChar(screen.getAllByRole('textbox').at(-1)!, 'kitty');

    fireEvent.click(screen.getByText('Add synonym'));
    typeCharByChar(screen.getAllByRole('textbox').at(-1)!, 'feline');

    fireEvent.click(screen.getByRole('button', { name: 'Remove synonym "kitty"' }));

    const remaining = screen.getAllByRole('textbox');
    expect(remaining).toHaveLength(3); // term + translation + 1 synonym
    expect(remaining[2]).toHaveValue('feline');

    fireEvent.click(screen.getByText('Add synonym'));
    const newSynonymInput = screen.getAllByRole('textbox').at(-1)!;
    expect(newSynonymInput).toHaveFocus();

    typeCharByChar(newSynonymInput, 'lion');

    expect(document.activeElement).toBe(newSynonymInput);
    expect(newSynonymInput).toHaveValue('lion');

    const finalInputs = screen.getAllByRole('textbox');
    expect(finalInputs).toHaveLength(4); // term + translation + 2 synonyms
    expect(finalInputs[2]).toHaveValue('feline');
    expect(finalInputs[3]).toHaveValue('lion');
  });
});
