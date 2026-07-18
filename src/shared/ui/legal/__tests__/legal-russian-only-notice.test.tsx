import { render, screen } from '@testing-library/react';
import React, { useEffect } from 'react';

import { I18nProvider, type Locale, useI18n } from '@/shared/i18n';

import { LegalRussianOnlyNotice } from '../legal-russian-only-notice';

function LocaleSetter({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  const { setLocale } = useI18n();
  useEffect(() => {
    setLocale(locale);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <>{children}</>;
}

function renderNotice(locale: Locale) {
  return render(
    <I18nProvider>
      <LocaleSetter locale={locale}>
        <LegalRussianOnlyNotice />
      </LocaleSetter>
    </I18nProvider>,
  );
}

describe('LegalRussianOnlyNotice', () => {
  it('does not render for the Russian locale (Russian is the source document)', () => {
    const { container } = renderNotice('ru');
    expect(container).toBeEmptyDOMElement();
  });

  it.each(['en', 'es', 'kz'] as const)(
    'shows a localized Russian-only notice for the %s locale',
    (locale) => {
      renderNotice(locale);
      expect(screen.getByText(/Russian|ruso|орыс/i)).toBeInTheDocument();
    },
  );

  it('never claims the Russian body is a localized legal version', () => {
    renderNotice('en');
    const text = screen.getByText(/Russian/i).textContent ?? '';
    expect(text.toLowerCase()).not.toMatch(/english (version|legal)/);
  });
});
