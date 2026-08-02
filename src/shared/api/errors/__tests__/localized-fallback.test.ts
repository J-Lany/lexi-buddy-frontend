import { localizedFallbackMessage } from '@/shared/api/errors/localized-fallback';
import { saveConsent } from '@/shared/lib/cookie-consent';

function setLocale(locale: string) {
  saveConsent({ functional: true });
  window.localStorage.setItem('ui-locale', locale);
}

describe('localizedFallbackMessage', () => {
  afterEach(() => {
    window.localStorage.clear();
  });

  it('defaults to English when no locale is stored', () => {
    expect(localizedFallbackMessage()).toBe('Something went wrong. Please try again.');
  });

  it('returns Russian text when the stored locale is ru', () => {
    setLocale('ru');
    expect(localizedFallbackMessage()).toBe('Что-то пошло не так. Попробуйте ещё раз.');
    expect(localizedFallbackMessage()).not.toMatch(/[a-zA-Z]/);
  });

  it('returns Kazakh text for a 404 when the stored locale is kz', () => {
    setLocale('kz');
    expect(localizedFallbackMessage(404)).toBe('Сұралған деректер табылмады.');
  });

  it('returns Spanish text for a network error when the stored locale is es', () => {
    setLocale('es');
    expect(localizedFallbackMessage(undefined, 'NETWORK_ERROR')).toBe(
      'Problema de conexión. Comprueba tu conexión a internet e inténtalo de nuevo.',
    );
  });

  it('maps known statuses to their category, in the active locale', () => {
    setLocale('ru');
    expect(localizedFallbackMessage(400)).toBe('Проверьте введённые данные.');
    expect(localizedFallbackMessage(401)).toBe('Необходимо войти в систему, чтобы продолжить.');
    expect(localizedFallbackMessage(403)).toBe('У вас нет прав для выполнения этого действия.');
    expect(localizedFallbackMessage(409)).toBe('Конфликт с существующими данными.');
    expect(localizedFallbackMessage(429)).toBe(
      'Слишком много попыток. Подождите немного и попробуйте снова.',
    );
    expect(localizedFallbackMessage(500)).toBe('Проблема на нашей стороне. Попробуйте позже.');
    expect(localizedFallbackMessage(502)).toBe('Проблема на нашей стороне. Попробуйте позже.');
  });

  it('falls back to the generic category for an unmapped status below 500', () => {
    setLocale('ru');
    expect(localizedFallbackMessage(418)).toBe('Что-то пошло не так. Попробуйте ещё раз.');
  });

  it('falls back to English if functional consent was never granted, even with a locale key present', () => {
    // writeStoredLocale/readStoredLocaleRaw are gated on functional consent —
    // without it, the raw localStorage value must not be trusted.
    window.localStorage.setItem('ui-locale', 'ru');
    expect(localizedFallbackMessage()).toBe('Something went wrong. Please try again.');
  });
});
