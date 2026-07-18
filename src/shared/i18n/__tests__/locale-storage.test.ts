import { acceptAllConsent, rejectNonEssentialConsent } from '@/shared/lib/cookie-consent';

import {
  clearStoredLocale,
  LOCALE_STORAGE_KEY,
  readStoredLocaleRaw,
  writeStoredLocale,
} from '../locale-storage';

describe('locale-storage', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('does not read a stored locale without functional consent', () => {
    window.localStorage.setItem(LOCALE_STORAGE_KEY, 'ru');
    expect(readStoredLocaleRaw()).toBeNull();
  });

  it('reads a stored locale once functional consent is granted', () => {
    acceptAllConsent();
    window.localStorage.setItem(LOCALE_STORAGE_KEY, 'ru');
    expect(readStoredLocaleRaw()).toBe('ru');
  });

  it('does not write a locale without functional consent', () => {
    writeStoredLocale('ru');
    expect(window.localStorage.getItem(LOCALE_STORAGE_KEY)).toBeNull();
  });

  it('writes a locale once functional consent is granted', () => {
    acceptAllConsent();
    writeStoredLocale('ru');
    expect(window.localStorage.getItem(LOCALE_STORAGE_KEY)).toBe('ru');
  });

  it('clears a previously stored locale regardless of consent state', () => {
    acceptAllConsent();
    writeStoredLocale('ru');
    rejectNonEssentialConsent();
    clearStoredLocale();
    expect(window.localStorage.getItem(LOCALE_STORAGE_KEY)).toBeNull();
  });

  it('rejecting non-essential consent alone does not clear a previously stored locale (caller must explicitly clear it)', () => {
    acceptAllConsent();
    writeStoredLocale('ru');
    rejectNonEssentialConsent();
    // rejectNonEssentialConsent only updates the consent record; clearing the
    // locale value itself is the caller's responsibility (see CookieConsentModal).
    expect(window.localStorage.getItem(LOCALE_STORAGE_KEY)).toBe('ru');
    expect(readStoredLocaleRaw()).toBeNull();
  });

  describe('exception safety', () => {
    it('readStoredLocaleRaw returns null instead of throwing when localStorage.getItem throws', () => {
      acceptAllConsent();
      const spy = jest.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
        throw new Error('storage disabled');
      });

      expect(() => readStoredLocaleRaw()).not.toThrow();
      expect(readStoredLocaleRaw()).toBeNull();

      spy.mockRestore();
    });

    it('writeStoredLocale returns ok:false instead of throwing when localStorage.setItem throws', () => {
      acceptAllConsent();
      const spy = jest.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
        throw new Error('quota exceeded');
      });

      let result: ReturnType<typeof writeStoredLocale> | undefined;
      expect(() => {
        result = writeStoredLocale('ru');
      }).not.toThrow();

      expect(result?.ok).toBe(false);
      if (result && !result.ok) {
        expect(result.error).toBeInstanceOf(Error);
      }

      spy.mockRestore();
    });

    it('clearStoredLocale returns ok:false instead of throwing when localStorage.removeItem throws', () => {
      const spy = jest.spyOn(Storage.prototype, 'removeItem').mockImplementation(() => {
        throw new Error('storage disabled');
      });

      let result: ReturnType<typeof clearStoredLocale> | undefined;
      expect(() => {
        result = clearStoredLocale();
      }).not.toThrow();

      expect(result?.ok).toBe(false);
      if (result && !result.ok) {
        expect(result.error).toBeInstanceOf(Error);
      }

      spy.mockRestore();
    });

    it('writeStoredLocale returns ok:true as a no-op without functional consent, even if storage would throw', () => {
      const spy = jest.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
        throw new Error('quota exceeded');
      });

      const result = writeStoredLocale('ru');
      expect(result.ok).toBe(true);

      spy.mockRestore();
    });
  });
});
