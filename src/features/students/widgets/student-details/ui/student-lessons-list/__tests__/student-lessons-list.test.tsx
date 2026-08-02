import { render, screen } from '@testing-library/react';
import { type ReactNode, useEffect } from 'react';

import { I18nProvider, type Locale, useI18n } from '@/shared/i18n';

import { StudentLessonsList } from '../student-lessons-list';

function LocaleSetter({ locale, children }: { locale: Locale; children: ReactNode }) {
  const { setLocale } = useI18n();

  useEffect(() => {
    setLocale(locale);
  }, [locale, setLocale]);

  return children;
}

function renderEmptyList(locale: Locale) {
  return render(
    <I18nProvider>
      <LocaleSetter locale={locale}>
        <StudentLessonsList studentId={1} lessons={[]} />
      </LocaleSetter>
    </I18nProvider>,
  );
}

describe('StudentLessonsList', () => {
  it('renders the localized empty state without the raw English text in Russian', () => {
    renderEmptyList('ru');

    expect(screen.getAllByText('Уроков пока нет')).toHaveLength(2);
    expect(screen.queryByText('No lessons yet')).not.toBeInTheDocument();
  });

  it.each([
    ['en', 'No lessons yet'],
    ['es', 'Sin lecciones aún'],
    ['kz', 'Әлі сабақтар жоқ'],
  ] as const)('uses the existing lessons empty-state translation for %s', (locale, label) => {
    renderEmptyList(locale);
    expect(screen.getAllByText(label)).toHaveLength(2);
  });
});
