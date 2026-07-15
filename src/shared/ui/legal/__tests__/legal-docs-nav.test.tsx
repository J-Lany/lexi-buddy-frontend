import { render, screen } from '@testing-library/react';
import React, { useEffect } from 'react';

import { I18nProvider, type Locale, useI18n } from '@/shared/i18n';
import { routes } from '@/shared/router/routes';

import { LegalDocsNav } from '../legal-docs-nav';

function LocaleSetter({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  const { setLocale } = useI18n();
  useEffect(() => {
    setLocale(locale);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <>{children}</>;
}

function renderNav(
  current: (typeof routes)['privacy' | 'terms' | 'cookiePolicy' | 'pdnConsent'],
  locale: Locale = 'en',
) {
  return render(
    <I18nProvider>
      <LocaleSetter locale={locale}>
        <LegalDocsNav current={current} />
      </LocaleSetter>
    </I18nProvider>,
  );
}

describe('LegalDocsNav', () => {
  it('marks the active document with aria-current="page" and no other link', () => {
    renderNav(routes.privacy);

    const active = screen.getByRole('link', { name: 'Privacy Policy' });
    expect(active).toHaveAttribute('aria-current', 'page');

    for (const name of ['Terms of Use', 'Cookie Policy', 'Personal Data Consent']) {
      const link = screen.getByRole('link', { name });
      expect(link).not.toHaveAttribute('aria-current');
    }
  });

  it('links every document to its route', () => {
    renderNav(routes.terms);

    expect(screen.getByRole('link', { name: 'Privacy Policy' })).toHaveAttribute(
      'href',
      routes.privacy,
    );
    expect(screen.getByRole('link', { name: 'Terms of Use' })).toHaveAttribute(
      'href',
      routes.terms,
    );
    expect(screen.getByRole('link', { name: 'Cookie Policy' })).toHaveAttribute(
      'href',
      routes.cookiePolicy,
    );
    expect(screen.getByRole('link', { name: 'Personal Data Consent' })).toHaveAttribute(
      'href',
      routes.pdnConsent,
    );
  });

  it('follows the current locale for labels and the nav aria-label', () => {
    renderNav(routes.privacy, 'ru');

    expect(screen.getByRole('navigation', { name: 'Правовые документы' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Политика конфиденциальности' })).toHaveAttribute(
      'aria-current',
      'page',
    );
    expect(screen.getByRole('link', { name: 'Пользовательское соглашение' })).toBeInTheDocument();
  });

  it('renders every document as an interactive link, including the active one', () => {
    renderNav(routes.cookiePolicy);

    // The active item must still be a real, focusable link (not a plain span),
    // per the requirement that inactive items look interactive and active state
    // is conveyed via styling/aria-current rather than removing interactivity.
    expect(screen.getAllByRole('link')).toHaveLength(4);
  });
});
