import { render, screen } from '@testing-library/react';
import { type ReactNode, useEffect } from 'react';

import { I18nProvider, type Locale, useI18n } from '@/shared/i18n';

import { AboutSection } from '../about-section';

jest.mock('@/shared/ui/responsive-select', () => ({
  ResponsiveSelect: ({ options }: { options: ReadonlyArray<{ value: string; label: string }> }) => (
    <div>
      {options.map((option) => (
        <span key={option.value}>{option.label}</span>
      ))}
    </div>
  ),
}));

function LocaleSetter({ locale, children }: { locale: Locale; children: ReactNode }) {
  const { setLocale } = useI18n();

  useEffect(() => {
    setLocale(locale);
  }, [locale, setLocale]);

  return children;
}

describe('AboutSection', () => {
  it('shows every age group in Russian without exposing the raw Adults label', () => {
    render(
      <I18nProvider>
        <LocaleSetter locale="ru">
          <AboutSection
            levelValue=""
            ageGroupValue="adult"
            telegramLabel="—"
            lastVisitLabel="—"
            onChangeLevel={jest.fn()}
            onChangeAgeGroup={jest.fn()}
          />
        </LocaleSetter>
      </I18nProvider>,
    );

    expect(screen.getByText('Дети')).toBeInTheDocument();
    expect(screen.getByText('Подростки')).toBeInTheDocument();
    expect(screen.getByText('Взрослые')).toBeInTheDocument();
    expect(screen.queryByText('Adults')).not.toBeInTheDocument();
  });
});
