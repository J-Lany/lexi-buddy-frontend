'use client';

import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as React from 'react';

import { type Locale, LOCALE_LABELS, useI18n } from '@/shared/i18n';
import { cn } from '@/shared/lib/cn';
import { routes } from '@/shared/router/routes';
import { Button } from '@/shared/ui/button';
import { Drawer, DrawerContent, DrawerTitle, DrawerTrigger } from '@/shared/ui/drawer';

const LOCALES: Locale[] = ['en', 'ru', 'kz', 'es'];

const LOCALE_FLAGS: Record<Locale, string> = {
  en: '🇬🇧',
  ru: '🇷🇺',
  kz: '🇰🇿',
  es: '🇪🇸',
};

export function LandingHeader({ isLoggedIn }: { isLoggedIn: boolean }) {
  const { t, locale, setLocale } = useI18n();
  const pathname = usePathname();
  const isQaPage = pathname === routes.help;
  const [langOpen, setLangOpen] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const langRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <Drawer open={menuOpen} onOpenChange={setMenuOpen} direction="right">
      <nav id="nav">
        <Link href={routes.main} className="nav-logo">
          <Image src="/icon.webp" alt="Lexi Buddy" width={38} height={38} priority unoptimized />
          <span className="ui-brand">Lexi buddy</span>
        </Link>

        {!isQaPage && (
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
        )}

        <div className="nav-right">
          {/* Language badge — hides on mobile, moves into drawer */}
          <div ref={langRef} className="nav-lang-wrap max-[980px]:hidden">
            <button
              type="button"
              className="nav-lang-btn"
              onClick={() => setLangOpen((v) => !v)}
              aria-label="Change language"
            >
              <span className="nav-lang-flag">{LOCALE_FLAGS[locale]}</span>
              <span className="nav-lang-code">{locale.toUpperCase()}</span>
            </button>

            {langOpen && (
              <div className="nav-lang-dropdown">
                {LOCALES.map((l) => (
                  <button
                    key={l}
                    type="button"
                    className={`nav-lang-option${l === locale ? ' active' : ''}`}
                    onClick={() => {
                      setLocale(l);
                      setLangOpen(false);
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
              {/* Login — hides on mobile, moves into drawer */}
              <Link href={routes.login} className="nav-login max-[980px]:hidden">
                {t('landing.nav.login')}
              </Link>
              <Link href={routes.register} className="nav-cta">
                {t('landing.nav.getStarted')}
              </Link>
            </>
          )}

          {/* Burger — visible only on mobile (≤980px) */}
          <DrawerTrigger asChild>
            <button
              type="button"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              className="hidden max-[980px]:flex items-center justify-center w-9 h-9 rounded-xl transition-colors shrink-0"
              style={{ color: 'var(--ink)', background: 'transparent' }}
            >
              {menuOpen ? <X size={22} strokeWidth={2} /> : <Menu size={22} strokeWidth={2} />}
            </button>
          </DrawerTrigger>
        </div>
      </nav>

      <DrawerContent className="flex flex-col gap-0 p-0 overflow-y-auto">
        <DrawerTitle className="sr-only">Navigation menu</DrawerTitle>
        {!isQaPage && (
          <>
            {/* Section nav links */}
            <div className="flex flex-col p-3">
              <Link href="#telegram" className="header-menu-row rounded-xl" onClick={closeMenu}>
                Telegram
              </Link>
              <Link href="#how" className="header-menu-row rounded-xl" onClick={closeMenu}>
                {t('landing.nav.how')}
              </Link>
              <Link href="#features" className="header-menu-row rounded-xl" onClick={closeMenu}>
                {t('landing.nav.features')}
              </Link>
              <Link href="#tasks" className="header-menu-row rounded-xl" onClick={closeMenu}>
                {t('landing.nav.tasks')}
              </Link>
              <Link href="#testimonials" className="header-menu-row rounded-xl" onClick={closeMenu}>
                {t('landing.nav.testimonials')}
              </Link>
              <Link href={routes.help} className="header-menu-row rounded-xl" onClick={closeMenu}>
                {t('landing.nav.help')}
              </Link>
            </div>

            <div className="h-px bg-border mx-3" />
          </>
        )}

        {/* Language switcher */}
        <div className="flex flex-col p-3">
          {LOCALES.map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => {
                setLocale(l);
                closeMenu();
              }}
              className={cn(
                'header-menu-row rounded-xl',
                l === locale && 'text-primary font-semibold',
              )}
            >
              <span className="text-[14px] leading-none">{LOCALE_FLAGS[l]}</span>
              <span>{LOCALE_LABELS[l]}</span>
              {l === locale && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
              )}
            </button>
          ))}
        </div>

        <div className="h-px bg-border mx-3" />

        {/* CTA buttons */}
        <div className="p-4 flex flex-col gap-2">
          {isLoggedIn ? (
            <Button asChild size="lg">
              <Link href={routes.students} onClick={closeMenu}>
                {t('landing.nav.openApp')}
              </Link>
            </Button>
          ) : (
            <>
              <Button asChild variant="outline" size="lg">
                <Link href={routes.login} onClick={closeMenu}>
                  {t('landing.nav.login')}
                </Link>
              </Button>
              <Button asChild size="lg">
                <Link href={routes.register} onClick={closeMenu}>
                  {t('landing.nav.getStarted')}
                </Link>
              </Button>
            </>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
