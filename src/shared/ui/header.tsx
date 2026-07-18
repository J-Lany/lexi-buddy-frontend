'use client';

import { ChevronDown, Globe, LogOut, Settings, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';

import { useTeacherProfileQuery } from '@/entities/teacher';
import { useLogoutMutation } from '@/features/auth/model/use-logout';
import { type Locale, LOCALE_LABELS, useI18n } from '@/shared/i18n';
import { cn } from '@/shared/lib/cn';
import { routes } from '@/shared/router/routes';

const LOCALES: Locale[] = ['en', 'ru', 'kz', 'es'];
const LOCALE_SHORT: Record<Locale, string> = { en: 'EN', ru: 'RU', kz: 'KZ', es: 'ES' };

const LOCALE_FLAGS: Record<Locale, string> = {
  en: '🇬🇧',
  ru: '🇷🇺',
  kz: '🇰🇿',
  es: '🇪🇸',
};

/* Shared pill button shape */
const pill = (active: boolean) =>
  cn(
    'inline-flex items-center gap-1.5 h-9 px-3 rounded-full border select-none cursor-pointer',
    'text-[13px] font-medium transition-all duration-150',
    'border-border/60 bg-background hover:bg-accent/40 hover:border-border',
    active && 'bg-accent/50 border-border shadow-sm',
  );

/* Dropdown container */
const menuBox = cn(
  'absolute right-0 top-[calc(100%+8px)] z-50 overflow-hidden',
  'rounded-[14px] bg-white border border-black/[0.07]',
  'shadow-[0_0_0_1px_rgba(0,0,0,0.06),0_4px_8px_rgba(0,0,0,0.05),0_16px_40px_-4px_rgba(15,116,143,0.15)]',
);

export function Header() {
  const { mutate: logout } = useLogoutMutation();
  const { t, locale, setLocale } = useI18n();
  const { data: profile } = useTeacherProfileQuery();

  const [langOpen, setLangOpen] = React.useState(false);
  const [userOpen, setUserOpen] = React.useState(false);
  const langRef = React.useRef<HTMLDivElement>(null);
  const userRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false);
      if (userRef.current && !userRef.current.contains(e.target as Node)) setUserOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const initials = profile
    ? `${profile.firstName?.[0] ?? ''}${profile.lastName?.[0] ?? ''}`.toUpperCase() || null
    : null;

  const firstName = profile?.firstName ?? null;

  return (
    <header className="h-full flex items-center justify-between ui-content-pad">
      <Link href={routes.main} className="flex items-center gap-2 shrink-0">
        <Image src="/icon.webp" alt="Lexi Buddy" width={36} height={36} priority unoptimized />
        <span className="ui-brand">Lexi buddy</span>
      </Link>

      <div className="flex items-center gap-2">
        {/* ── Language pill: 🌐 RU ∨ ── */}
        <div ref={langRef} className="relative">
          <button
            type="button"
            onClick={() => {
              setLangOpen((v) => !v);
              setUserOpen(false);
            }}
            aria-label="Change language"
            className={pill(langOpen)}
          >
            <Globe className="w-[14px] h-[14px] text-muted-foreground" strokeWidth={1.75} />
            <span className="text-foreground font-semibold">{LOCALE_SHORT[locale]}</span>
            <ChevronDown
              className={cn(
                'w-3.5 h-3.5 text-muted-foreground transition-transform duration-150',
                langOpen && 'rotate-180',
              )}
              strokeWidth={2}
            />
          </button>

          {langOpen && (
            <div
              className={cn(menuBox, 'w-48')}
              style={{ animation: 'headerMenuIn 0.14s cubic-bezier(0.2,0,0,1) both' }}
            >
              <div className="flex flex-col py-1.5">
                {LOCALES.map((l) => (
                  <button
                    key={l}
                    type="button"
                    onClick={() => {
                      setLocale(l);
                      setLangOpen(false);
                    }}
                    className={cn('header-menu-row', l === locale && 'text-primary font-semibold')}
                  >
                    <span className="text-[14px] leading-none">{LOCALE_FLAGS[l]}</span>
                    <span>{LOCALE_LABELS[l]}</span>
                    {l === locale && (
                      <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ── User pill: [KB] Кристина ∨ ── */}
        <div ref={userRef} className="relative">
          <button
            type="button"
            onClick={() => {
              setUserOpen((v) => !v);
              setLangOpen(false);
            }}
            aria-label="Account menu"
            className={pill(userOpen)}
          >
            {/* Mini avatar — initials only, no photo (teachers have no avatars) */}
            <span
              className={cn(
                'flex items-center justify-center w-6 h-6 rounded-full shrink-0',
                'text-[10px] font-bold',
                'bg-primary/10 text-primary',
              )}
            >
              {initials ?? <User className="w-3 h-3" strokeWidth={1.75} />}
            </span>
            <span className="text-foreground font-semibold max-w-24 truncate">
              {firstName ?? t('nav.user')}
            </span>
            <ChevronDown
              className={cn(
                'w-3.5 h-3.5 text-muted-foreground transition-transform duration-150',
                userOpen && 'rotate-180',
              )}
              strokeWidth={2}
            />
          </button>

          {userOpen && (
            <div
              className={cn(menuBox, 'w-52')}
              style={{ animation: 'headerMenuIn 0.14s cubic-bezier(0.2,0,0,1) both' }}
            >
              {/* Identity header */}
              {profile && (
                <div className="px-3.5 py-3 border-b border-black/[0.06]">
                  <p className="text-[13px] font-semibold text-gray-900 truncate leading-tight">
                    {[profile.firstName, profile.lastName].filter(Boolean).join(' ') || '—'}
                  </p>
                  {profile.username && (
                    <p className="text-[11.5px] text-gray-400 mt-0.5 leading-tight">
                      @{profile.username}
                    </p>
                  )}
                </div>
              )}

              <div className="py-1.5">
                <Link
                  href={routes.profile}
                  onClick={() => setUserOpen(false)}
                  className="header-menu-row"
                >
                  <Settings
                    width={14}
                    height={14}
                    strokeWidth={1.75}
                    style={{ color: '#bbb', flexShrink: 0 }}
                  />
                  {t('nav.settings')}
                </Link>

                <div style={{ height: 1, background: 'rgba(0,0,0,0.06)', margin: '4px 0' }} />

                <button
                  type="button"
                  onClick={() => {
                    logout();
                    setUserOpen(false);
                  }}
                  className="header-menu-row header-menu-row--danger"
                >
                  <LogOut width={14} height={14} strokeWidth={1.75} style={{ flexShrink: 0 }} />
                  {t('nav.logout')}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
