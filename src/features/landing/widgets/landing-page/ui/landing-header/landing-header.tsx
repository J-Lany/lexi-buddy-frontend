'use client';

import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';

import { type Locale, LOCALE_LABELS, useI18n } from '@/shared/i18n';
import { routes } from '@/shared/router/routes';

const LOCALES: Locale[] = ['en', 'ru', 'kz', 'es'];

const LOCALE_FLAGS: Record<Locale, string> = {
  en: '🇬🇧',
  ru: '🇷🇺',
  kz: '🇰🇿',
  es: '🇪🇸',
};

export function LandingHeader({ isLoggedIn }: { isLoggedIn: boolean }) {
  const { t, locale, setLocale } = useI18n();
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <nav id="nav">
      <Link href={routes.main} className="nav-logo">
        <Image src="/icon.webp" alt="Lexi Buddy" width={38} height={38} priority unoptimized />
        <span className="ui-brand">Lexi buddy</span>
      </Link>

      <div className="nav-center">
        <Link href="#telegram">Telegram</Link>
        <Link href="#how">{t('landing.nav.how')}</Link>
        <Link href="#features">{t('landing.nav.features')}</Link>
        <Link href="#tasks">{t('landing.nav.tasks')}</Link>
        <Link href="#testimonials">{t('landing.nav.testimonials')}</Link>
        <span className="nav-sep" aria-hidden />
        <Link href={routes.help} className="nav-help">
          {t('landing.nav.help')}
        </Link>
      </div>

      <div className="nav-right">
        <Link href={routes.help} className="nav-help-mobile">
          {t('landing.nav.helpMobile')}
        </Link>

        {/* Language badge */}
        <div ref={ref} className="nav-lang-wrap">
          <button
            type="button"
            className="nav-lang-btn"
            onClick={() => setOpen((v) => !v)}
            aria-label="Change language"
          >
            <span className="nav-lang-flag">{LOCALE_FLAGS[locale]}</span>
            <span className="nav-lang-code">{locale.toUpperCase()}</span>
          </button>

          {open && (
            <div className="nav-lang-dropdown">
              {LOCALES.map((l) => (
                <button
                  key={l}
                  type="button"
                  className={`nav-lang-option${l === locale ? ' active' : ''}`}
                  onClick={() => {
                    setLocale(l);
                    setOpen(false);
                  }}
                >
                  <span>{LOCALE_FLAGS[l]}</span>
                  <span>{LOCALE_LABELS[l]}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {isLoggedIn ? (
          <Link href={routes.students} className="nav-cta">
            {t('landing.nav.openApp')}
          </Link>
        ) : (
          <>
            <Link href={routes.login} className="nav-login">
              {t('landing.nav.login')}
            </Link>
            <Link href={routes.register} className="nav-cta">
              {t('landing.nav.getStarted')}
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
