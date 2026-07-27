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
