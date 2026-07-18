import { render, screen } from '@testing-library/react';
import fs from 'fs';
import path from 'path';
import React, { useEffect } from 'react';

import { I18nProvider, type Locale, useI18n } from '@/shared/i18n';

import CookiePolicyPage, { metadata as cookiePolicyMetadata } from '../cookie-policy/page';
import PdnConsentPage, { metadata as pdnConsentMetadata } from '../pdn-consent/page';
import PrivacyPage, { metadata as privacyMetadata } from '../privacy/page';
import TermsPage, { metadata as termsMetadata } from '../terms/page';

function LocaleSetter({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  const { setLocale } = useI18n();
  useEffect(() => {
    setLocale(locale);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <>{children}</>;
}

function renderPage(Component: React.ComponentType, locale: Locale) {
  return render(
    <I18nProvider>
      <LocaleSetter locale={locale}>
        <Component />
      </LocaleSetter>
    </I18nProvider>,
  );
}

const PAGES = [
  {
    name: 'Privacy',
    Component: PrivacyPage,
    file: 'privacy/page.tsx',
    originalTitle: 'Политика конфиденциальности и обработки персональных данных',
    localizedTitleEn: 'Privacy Policy',
    navLabelEn: 'Privacy Policy',
  },
  {
    name: 'Terms',
    Component: TermsPage,
    file: 'terms/page.tsx',
    originalTitle: 'Пользовательское соглашение (Публичная оферта)',
    localizedTitleEn: 'Terms of Use',
    navLabelEn: 'Terms of Use',
  },
  {
    name: 'Cookie Policy',
    Component: CookiePolicyPage,
    file: 'cookie-policy/page.tsx',
    originalTitle: 'Политика в отношении файлов cookie',
    localizedTitleEn: 'Cookie Policy',
    navLabelEn: 'Cookie Policy',
  },
  {
    name: 'PDN Consent',
    Component: PdnConsentPage,
    file: 'pdn-consent/page.tsx',
    originalTitle: 'Согласие на сбор и обработку персональных данных',
    localizedTitleEn: 'Personal Data Consent',
    navLabelEn: 'Personal Data Consent',
  },
] as const;

describe.each(PAGES)(
  '$name legal page',
  ({ Component, originalTitle, localizedTitleEn, navLabelEn }) => {
    it('shows a localized page title for a non-Russian locale', () => {
      renderPage(Component, 'en');
      expect(screen.getByRole('heading', { level: 1, name: localizedTitleEn })).toBeInTheDocument();
    });

    it('shows the Russian-only notice for a non-Russian locale', () => {
      renderPage(Component, 'en');
      expect(screen.getByText(/available in Russian only/)).toBeInTheDocument();
    });

    it('shows the "Official Russian text" label for a non-Russian locale', () => {
      renderPage(Component, 'en');
      expect(screen.getByText('Official Russian text')).toBeInTheDocument();
    });

    it('does not show the notice or the official-text label for the Russian locale, and does not duplicate the title', () => {
      renderPage(Component, 'ru');
      expect(screen.queryByText(/available in Russian only/)).toBeNull();
      expect(screen.queryByText('Official Russian text')).toBeNull();
      expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
    });

    it('keeps the original Russian document heading unchanged for every locale', () => {
      for (const locale of ['en', 'ru', 'es', 'kz'] as const) {
        const { unmount } = renderPage(Component, locale);
        expect(screen.getByText(originalTitle)).toBeInTheDocument();
        unmount();
      }
    });

    it('marks the active document in the nav with aria-current="page"', () => {
      renderPage(Component, 'en');
      expect(screen.getByRole('link', { name: navLabelEn })).toHaveAttribute(
        'aria-current',
        'page',
      );
    });
  },
);

describe('legal pages — original document body is unchanged', () => {
  it('the Privacy policy body keeps its exact Russian wording across locales', () => {
    for (const locale of ['en', 'ru', 'es', 'kz'] as const) {
      const { unmount } = renderPage(PrivacyPage, locale);
      expect(
        screen.getByText(/1\.4\. Платформа предназначена для лиц, достигших 18 лет\./),
      ).toBeInTheDocument();
      unmount();
    }
  });
});

describe('legal pages metadata — brand appears exactly once via the root layout template', () => {
  it.each([
    ['privacy', privacyMetadata],
    ['terms', termsMetadata],
    ['cookie-policy', cookiePolicyMetadata],
    ['pdn-consent', pdnConsentMetadata],
  ])('%s page title does not itself contain "Lexi Buddy"', (_name, metadata) => {
    expect(metadata.title as string).not.toContain('Lexi Buddy');
  });
});

describe('legal pages — internal links use next/link, external/mailto links stay plain <a>', () => {
  const pagesDir = path.join(__dirname, '..');

  it.each(PAGES.map((p) => p.file))('%s has no plain <a> pointing at an internal route', (file) => {
    const source = fs.readFileSync(path.join(pagesDir, file), 'utf8');
    expect(source).not.toMatch(/<a\s+href=\{routes\./);
  });

  it.each(PAGES.map((p) => p.file))('%s still uses plain <a> for external/mailto links', (file) => {
    const source = fs.readFileSync(path.join(pagesDir, file), 'utf8');
    expect(source).toMatch(/<a href="https:\/\/|<a href=\{`mailto:/);
  });
});
