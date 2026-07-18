const STORAGE_KEY = 'lexi.cookie-consent';

/** Bump when the Cookie Policy or the category model materially changes, to re-prompt users. */
export const CONSENT_VERSION = 2;

export type ConsentCategories = {
  necessary: true;
  functional: boolean;
};

export type ConsentRecord = {
  version: number;
  date: string; // ISO 8601
  categories: ConsentCategories;
};

export type SaveConsentResult = { ok: true; record: ConsentRecord } | { ok: false; error: unknown };

function isValidConsentRecord(value: unknown): value is ConsentRecord {
  if (!value || typeof value !== 'object') return false;
  const record = value as Record<string, unknown>;
  if (typeof record.version !== 'number') return false;
  if (typeof record.date !== 'string') return false;
  if (!record.categories || typeof record.categories !== 'object') return false;
  const categories = record.categories as Record<string, unknown>;
  if (categories.necessary !== true) return false;
  if (typeof categories.functional !== 'boolean') return false;
  return true;
}

export function getConsent(): ConsentRecord | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    return isValidConsentRecord(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

/** True if we should show the banner (no record yet, a stale version, or a corrupted record). */
export function needsConsent(): boolean {
  const c = getConsent();
  return !c || c.version !== CONSENT_VERSION;
}

/** Non-necessary cookies (e.g. persisting the language choice) may only be set once this is true. */
export function hasFunctionalConsent(): boolean {
  return getConsent()?.categories.functional === true;
}

export function saveConsent(categories: { functional: boolean }): SaveConsentResult {
  const record: ConsentRecord = {
    version: CONSENT_VERSION,
    date: new Date().toISOString(),
    categories: { necessary: true, functional: categories.functional },
  };
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
    return { ok: true, record };
  } catch (error) {
    return { ok: false, error };
  }
}

export function acceptAllConsent(): SaveConsentResult {
  return saveConsent({ functional: true });
}

export function rejectNonEssentialConsent(): SaveConsentResult {
  return saveConsent({ functional: false });
}

/** Lets any page (e.g. the footer) reopen the cookie settings dialog later. */
export const OPEN_COOKIE_SETTINGS_EVENT = 'lexi:open-cookie-settings';

export function requestOpenCookieSettings() {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new Event(OPEN_COOKIE_SETTINGS_EVENT));
}
