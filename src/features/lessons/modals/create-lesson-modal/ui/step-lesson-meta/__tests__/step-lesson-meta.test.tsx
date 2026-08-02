import { fireEvent, render, screen } from '@testing-library/react';
import { type ReactNode, useEffect } from 'react';

import type { CreateLessonDraft } from '@/features/lessons/modals/create-lesson-modal/model/types';
import { ageGroup } from '@/shared/domain/common';
import { instructionLanguage } from '@/shared/domain/instruction-language';
import { language } from '@/shared/domain/language';
import { I18nProvider, useI18n } from '@/shared/i18n';

import { StepLessonMeta } from '../step-lesson-meta';

jest.mock('@/shared/ui/responsive-select', () => ({
  ResponsiveSelect: ({
    options,
    onValueChange,
  }: {
    options: ReadonlyArray<{ value: string; label: string }>;
    onValueChange: (value: string) => void;
  }) => (
    <div>
      {options.map((option) => (
        <button key={option.value} type="button" onClick={() => onValueChange(option.value)}>
          {option.label}
        </button>
      ))}
    </div>
  ),
}));

const draft: CreateLessonDraft = {
  title: '',
  level: 'A1',
  ageCategory: ageGroup.ADULT,
  description: '',
  targetLanguage: language.english,
  nativeLanguage: language.russian,
  instructionLanguage: instructionLanguage.native,
  additionalInstructions: '',
  materialLinks: [],
  vocabItems: [],
  assignments: [],
  studentIds: [],
  groupIds: [],
};

function LocaleController({ children }: { children: ReactNode }) {
  const { setLocale } = useI18n();

  useEffect(() => {
    setLocale('ru');
  }, [setLocale]);

  return (
    <>
      <button type="button" onClick={() => setLocale('en')}>
        English locale
      </button>
      {children}
    </>
  );
}

describe('StepLessonMeta age-group field', () => {
  it('localizes every option, emits a domain value, and updates labels with the locale', () => {
    const onChange = jest.fn();

    render(
      <I18nProvider>
        <LocaleController>
          <StepLessonMeta draft={draft} onChange={onChange} />
        </LocaleController>
      </I18nProvider>,
    );

    for (const label of ['Дети', 'Подростки', 'Взрослые']) {
      expect(screen.getByRole('button', { name: label })).toBeInTheDocument();
    }
    for (const rawLabel of ['Children', 'Teenagers', 'Adults']) {
      expect(screen.queryByRole('button', { name: rawLabel })).not.toBeInTheDocument();
    }

    fireEvent.click(screen.getByRole('button', { name: 'Дети' }));
    expect(onChange).toHaveBeenCalledWith({ ageCategory: ageGroup.CHILD });

    fireEvent.click(screen.getByRole('button', { name: 'English locale' }));
    for (const label of ['Children', 'Teenagers', 'Adults']) {
      expect(screen.getByRole('button', { name: label })).toBeInTheDocument();
    }
    for (const oldLabel of ['Дети', 'Подростки', 'Взрослые']) {
      expect(screen.queryByRole('button', { name: oldLabel })).not.toBeInTheDocument();
    }
  });
});

describe('StepLessonMeta field tooltips', () => {
  it('opens each field tooltip with its own text via the shared FieldTooltip fix', async () => {
    render(
      <I18nProvider>
        <StepLessonMeta draft={draft} onChange={jest.fn()} />
      </I18nProvider>,
    );

    const tooltipTexts = [
      'The lesson name shown to students in the bot. Not passed to the AI.',
      'Difficulty level (A1–C2). AI uses it to calibrate task complexity and vocabulary.',
      'AI picks age-appropriate vocabulary and examples based on this.',
      'Sent directly to the AI as lesson context — the more specific, the better the tasks.',
    ];

    const triggers = screen.getAllByRole('button', { name: 'More information' });
    expect(triggers).toHaveLength(tooltipTexts.length);

    for (const [index, text] of tooltipTexts.entries()) {
      fireEvent.click(triggers[index]);
      expect(await screen.findByText(text)).toBeInTheDocument();

      const previousText = tooltipTexts[index - 1];
      if (previousText) {
        expect(screen.queryByText(previousText)).not.toBeInTheDocument();
      }
    }
  });
});
