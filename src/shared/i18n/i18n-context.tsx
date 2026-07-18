'use client';

import * as React from 'react';

import { readStoredLocaleRaw, writeStoredLocale } from './locale-storage';
import { en, es, kz, ru, type Translations } from './locales';

export type Locale = 'en' | 'ru' | 'kz' | 'es';

export const LOCALE_LABELS: Record<Locale, string> = {
  en: 'English',
  ru: 'Русский',
  kz: 'Қазақша',
  es: 'Español',
};

const dictionaries: Record<Locale, Translations> = { en, ru, kz, es };

function getNestedValue(obj: Record<string, unknown>, path: string): string {
  const result = path.split('.').reduce<unknown>((acc, key) => {
    if (acc && typeof acc === 'object') return (acc as Record<string, unknown>)[key];
    return undefined;
  }, obj);
  return typeof result === 'string' ? result : path;
}

type I18nContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
};

const I18nContext = React.createContext<I18nContextValue>({
  locale: 'en',
  setLocale: () => {},
  t: (key) => key,
});

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = React.useState<Locale>('en');

  React.useEffect(() => {
    const saved = readStoredLocaleRaw();
    if (saved && saved in dictionaries) setLocaleState(saved as Locale);
  }, []);

  const setLocale = React.useCallback((next: Locale) => {
    setLocaleState(next);
    // Language is a "functional" cookie/storage category — writeStoredLocale is a
    // no-op without functional consent.
    writeStoredLocale(next);
  }, []);

  const t = React.useCallback(
    (key: string) => {
      const dict = dictionaries[locale] as unknown as Record<string, unknown>;
      const result = getNestedValue(dict, key);
      if (result !== key) return result;
      // fallback to English
      const fallback = dictionaries.en as unknown as Record<string, unknown>;
      return getNestedValue(fallback, key);
    },
    [locale],
  );

  const value = React.useMemo(() => ({ locale, setLocale, t }), [locale, setLocale, t]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  return React.useContext(I18nContext);
}
