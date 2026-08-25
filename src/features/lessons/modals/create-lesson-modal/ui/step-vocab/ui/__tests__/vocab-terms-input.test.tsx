import { render, screen } from '@testing-library/react';

import { VOCAB_MAX_TERMS } from '@/features/lessons/modals/create-lesson-modal/lib/parse-vocab-terms';
import { I18nProvider } from '@/shared/i18n';

import { VocabTermsInput } from '../vocab-terms-input';

function renderInput(
  count: number,
  overrides: Partial<Parameters<typeof VocabTermsInput>[0]> = {},
) {
  return render(
    <I18nProvider>
      <VocabTermsInput
        value=""
        maxTerms={VOCAB_MAX_TERMS}
        count={count}
        onChange={() => {}}
        onTranslate={() => {}}
        translateDisabled={count === 0 || count > VOCAB_MAX_TERMS}
        isPending={false}
        errorMessage={
          count > VOCAB_MAX_TERMS
            ? `Maximum ${VOCAB_MAX_TERMS} items. Remove ${count - VOCAB_MAX_TERMS} to continue.`
            : null
        }
        {...overrides}
      />
    </I18nProvider>,
  );
}

describe('VocabTermsInput — 15-item boundary', () => {
  it('renders the counter as count / max and enables Translate at exactly the limit', () => {
    renderInput(VOCAB_MAX_TERMS);

    expect(screen.getByText(`${VOCAB_MAX_TERMS} / ${VOCAB_MAX_TERMS}`)).toBeInTheDocument();
    expect(screen.getByText(`${VOCAB_MAX_TERMS} / ${VOCAB_MAX_TERMS}`)).not.toHaveClass(
      'text-destructive',
    );
    expect(
      screen.getByRole('button', { name: /provide translations and synonyms/i }),
    ).toBeEnabled();
    expect(screen.queryByText(/Maximum/)).not.toBeInTheDocument();
  });

  it('turns the counter destructive and disables Translate one item past the limit', () => {
    const over = VOCAB_MAX_TERMS + 1;
    renderInput(over);

    expect(screen.getByText(`${over} / ${VOCAB_MAX_TERMS}`)).toHaveClass('text-destructive');
    expect(
      screen.getByRole('button', { name: /provide translations and synonyms/i }),
    ).toBeDisabled();
    expect(
      screen.getByText(`Maximum ${VOCAB_MAX_TERMS} items. Remove 1 to continue.`),
    ).toBeInTheDocument();
  });

  it('disables Translate with zero terms and shows no over-limit error', () => {
    renderInput(0);

    expect(
      screen.getByRole('button', { name: /provide translations and synonyms/i }),
    ).toBeDisabled();
    expect(screen.queryByText(/Maximum/)).not.toBeInTheDocument();
  });
});
