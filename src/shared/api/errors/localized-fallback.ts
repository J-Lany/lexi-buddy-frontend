import { readStoredLocaleRaw } from '@/shared/i18n/locale-storage';
import { en, es, kz, ru, type Translations } from '@/shared/i18n/locales';

type Locale = 'en' | 'ru' | 'kz' | 'es';
type ErrorCategory = Exclude<keyof Translations['errors'], 'codes'>;

const dictionaries: Record<Locale, Translations> = { en, ru, kz, es };

const STATUS_CATEGORY: Record<number, ErrorCategory> = {
  400: 'validation',
  401: 'unauthorized',
  403: 'forbidden',
  404: 'notFound',
  409: 'conflict',
  429: 'rateLimited',
};

function resolveLocale(): Locale {
  const stored = readStoredLocaleRaw();
  return stored === 'en' || stored === 'ru' || stored === 'kz' || stored === 'es' ? stored : 'en';
}

function resolveCategory(status?: number, code?: string): ErrorCategory {
  if (code === 'NETWORK_ERROR') return 'network';
  if (code === 'TIMEOUT') return 'timeout';
  if (status !== undefined && STATUS_CATEGORY[status]) return STATUS_CATEGORY[status];
  if (status !== undefined && status >= 500) return 'server';
  return 'generic';
}

/**
 * A safe, non-technical fallback for `HttpError.message`, localized to the
 * caller's current UI locale — never derived from a backend message or raw
 * Axios text. Used by call-sites that predate `getErrorI18nKey` and still
 * read `HttpError.message` directly (via the deprecated `getErrorMessage`).
 */
export function localizedFallbackMessage(status?: number, code?: string): string {
  const category = resolveCategory(status, code);
  return dictionaries[resolveLocale()].errors[category];
}
