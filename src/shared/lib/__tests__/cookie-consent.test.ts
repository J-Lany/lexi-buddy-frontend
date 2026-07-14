import {
  acceptAllConsent,
  CONSENT_VERSION,
  getConsent,
  hasFunctionalConsent,
  needsConsent,
  rejectNonEssentialConsent,
  saveConsent,
} from '../cookie-consent';

const STORAGE_KEY = 'lexi.cookie-consent';

describe('cookie-consent storage', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  describe('getConsent — runtime validation', () => {
    it('returns null when nothing is stored', () => {
      expect(getConsent()).toBeNull();
    });

    it('returns null for invalid JSON', () => {
      window.localStorage.setItem(STORAGE_KEY, 'not json');
      expect(getConsent()).toBeNull();
    });

    it('returns null when categories is missing', () => {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ version: 2, date: new Date().toISOString() }),
      );
      expect(getConsent()).toBeNull();
    });

    it('returns null when version is not a number', () => {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          version: '2',
          date: new Date().toISOString(),
          categories: { necessary: true, functional: true },
        }),
      );
      expect(getConsent()).toBeNull();
    });

    it('returns null when date is not a string', () => {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          version: 2,
          date: 12345,
          categories: { necessary: true, functional: true },
        }),
      );
      expect(getConsent()).toBeNull();
    });

    it('returns null when categories.necessary is not exactly true', () => {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          version: 2,
          date: new Date().toISOString(),
          categories: { necessary: false, functional: true },
        }),
      );
      expect(getConsent()).toBeNull();
    });

    it('returns null when categories.functional is not a boolean', () => {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          version: 2,
          date: new Date().toISOString(),
          categories: { necessary: true, functional: 'yes' },
        }),
      );
      expect(getConsent()).toBeNull();
    });

    it('returns the record when it is well-formed', () => {
      const result = saveConsent({ functional: true });
      expect(result.ok).toBe(true);
      const consent = getConsent();
      expect(consent?.categories.functional).toBe(true);
      expect(consent?.categories.necessary).toBe(true);
      expect(consent?.version).toBe(CONSENT_VERSION);
    });
  });

  describe('needsConsent', () => {
    it('is true with no record', () => {
      expect(needsConsent()).toBe(true);
    });

    it('is false right after saving a valid, current-version record', () => {
      saveConsent({ functional: false });
      expect(needsConsent()).toBe(false);
    });

    it('is true when the stored version is stale', () => {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          version: CONSENT_VERSION - 1,
          date: new Date().toISOString(),
          categories: { necessary: true, functional: true },
        }),
      );
      expect(needsConsent()).toBe(true);
    });

    it('is true when the stored record is corrupted', () => {
      window.localStorage.setItem(STORAGE_KEY, '{not valid json');
      expect(needsConsent()).toBe(true);
    });
  });

  describe('hasFunctionalConsent', () => {
    it('is false with no record', () => {
      expect(hasFunctionalConsent()).toBe(false);
    });

    it('is true after acceptAllConsent', () => {
      acceptAllConsent();
      expect(hasFunctionalConsent()).toBe(true);
    });

    it('is false after rejectNonEssentialConsent', () => {
      rejectNonEssentialConsent();
      expect(hasFunctionalConsent()).toBe(false);
    });
  });

  describe('saveConsent — write failure', () => {
    it('returns ok:false and does not throw when localStorage.setItem throws', () => {
      const spy = jest.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
        throw new Error('quota exceeded');
      });

      const result = saveConsent({ functional: true });

      expect(result.ok).toBe(false);
      if (!result.ok) {
        expect(result.error).toBeInstanceOf(Error);
      }

      spy.mockRestore();
    });

    it('leaves needsConsent true when the write failed', () => {
      const spy = jest.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
        throw new Error('quota exceeded');
      });

      saveConsent({ functional: true });
      expect(needsConsent()).toBe(true);

      spy.mockRestore();
    });
  });
});
