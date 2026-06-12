const STORAGE_KEY = 'lexi.cookie-consent';

/** Bump when the Privacy/Cookie policy materially changes to re-prompt users. */
export const CONSENT_VERSION = 1;

export type ConsentRecord = {
  accepted: true;
  version: number;
  date: string; // ISO 8601
};

export function getConsent(): ConsentRecord | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ConsentRecord;
    return parsed?.accepted ? parsed : null;
  } catch {
    return null;
  }
}

/** True if we should show the modal (no record, or stale version). */
export function needsConsent(): boolean {
  const c = getConsent();
  return !c || c.version !== CONSENT_VERSION;
}

export function acceptConsent(): ConsentRecord {
  const record: ConsentRecord = {
    accepted: true,
    version: CONSENT_VERSION,
    date: new Date().toISOString(),
  };
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
  } catch {
    /* storage unavailable — ignore */
  }
  return record;
}
