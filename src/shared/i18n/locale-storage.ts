import { hasFunctionalConsent } from '@/shared/lib/cookie-consent';

export const LOCALE_STORAGE_KEY = 'ui-locale';

export type LocaleStorageResult = { ok: true } | { ok: false; error: unknown };

/** Returns the stored locale (unvalidated string), or null if unset, without consent, or on error. */
export function readStoredLocaleRaw(): string | null {
  if (typeof window === 'undefined') return null;
  if (!hasFunctionalConsent()) return null;
  try {
    return window.localStorage.getItem(LOCALE_STORAGE_KEY);
  } catch {
    return null;
  }
}

/** Persists the locale choice. No-op (ok:true) without functional consent. */
export function writeStoredLocale(locale: string): LocaleStorageResult {
  if (typeof window === 'undefined') return { ok: true };
  if (!hasFunctionalConsent()) return { ok: true };
  try {
    window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
    return { ok: true };
  } catch (error) {
    return { ok: false, error };
  }
}

/** Removes any previously persisted locale, e.g. after rejecting functional cookies. */
export function clearStoredLocale(): LocaleStorageResult {
  if (typeof window === 'undefined') return { ok: true };
  try {
    window.localStorage.removeItem(LOCALE_STORAGE_KEY);
    return { ok: true };
  } catch (error) {
    return { ok: false, error };
  }
}
