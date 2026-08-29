import { GENERIC_ERROR_I18N_KEY, getErrorI18nKey } from '@/shared/api/errors/error-i18n';
import { HttpError } from '@/shared/api/errors/http-error';

function makeAxiosError(opts: {
  response?: { status: number; data?: { code?: string } };
  code?: string;
}) {
  return {
    isAxiosError: true,
    message: 'Request failed',
    code: opts.code,
    response: opts.response,
    config: { headers: {} },
  };
}

describe('getErrorI18nKey', () => {
  it('returns errors.generic for a totally unknown error', () => {
    expect(getErrorI18nKey(new Error('boom'))).toBe(GENERIC_ERROR_I18N_KEY);
  });

  it('maps a network error to errors.network', () => {
    const error = makeAxiosError({ code: 'ERR_NETWORK' });
    expect(getErrorI18nKey(error)).toBe('errors.network');
  });

  it('maps a timeout to errors.timeout', () => {
    const error = makeAxiosError({ code: 'ECONNABORTED' });
    expect(getErrorI18nKey(error)).toBe('errors.timeout');
  });

  it('maps a plain 401 (no backend code) to the generic errors.unauthorized fallback', () => {
    const error = makeAxiosError({ response: { status: 401 } });
    expect(getErrorI18nKey(error)).toBe('errors.unauthorized');
  });

  it('prefers a known backend code over the HTTP status fallback', () => {
    const error = makeAxiosError({
      response: { status: 409, data: { code: 'AUTH_EMAIL_ALREADY_EXISTS' } },
    });
    expect(getErrorI18nKey(error)).toBe('errors.codes.AUTH_EMAIL_ALREADY_EXISTS');
  });

  it('applies a contextual status override when provided, without a backend code', () => {
    const error = makeAxiosError({ response: { status: 401 } });
    const key = getErrorI18nKey(error, { 401: 'errors.codes.AUTH_INVALID_CREDENTIALS' });
    expect(key).toBe('errors.codes.AUTH_INVALID_CREDENTIALS');
  });

  it('does not apply an override outside the status it targets', () => {
    const error = makeAxiosError({ response: { status: 403 } });
    const key = getErrorI18nKey(error, { 401: 'errors.codes.AUTH_INVALID_CREDENTIALS' });
    expect(key).toBe('errors.forbidden');
  });

  it('does not leak an override onto a request that already carries a backend code', () => {
    const error = makeAxiosError({
      response: { status: 401, data: { code: 'AUTH_SESSION_EXPIRED' } },
    });
    const key = getErrorI18nKey(error, { 401: 'errors.codes.AUTH_INVALID_CREDENTIALS' });
    expect(key).toBe('errors.codes.AUTH_SESSION_EXPIRED');
  });

  it('is idempotent for an already-normalized HttpError', () => {
    const httpError = new HttpError('generic', { status: 500 });
    expect(getErrorI18nKey(httpError)).toBe('errors.server');
  });

  it('falls back to the safe server key — never the raw code — for an unrecognized backend code with a 500 status', () => {
    const error = makeAxiosError({
      response: { status: 500, data: { code: 'SOME_FUTURE_UNKNOWN_CODE' } },
    });
    expect(getErrorI18nKey(error)).toBe('errors.server');
  });

  it('falls back to errors.generic for an unrecognized backend code with an unmapped status', () => {
    const error = makeAxiosError({
      response: { status: 418, data: { code: 'SOME_FUTURE_UNKNOWN_CODE' } },
    });
    expect(getErrorI18nKey(error)).toBe(GENERIC_ERROR_I18N_KEY);
  });

  // Every backend error code from the shared contract must resolve to *some*
  // i18n key — either a dedicated errors.codes.* entry or, for the generic
  // category codes, the matching HTTP-status fallback. None may fall through
  // to errors.generic (that would mean the code silently isn't recognized).
  it.each([
    ['AUTH_INVALID_CREDENTIALS', 401, 'errors.codes.AUTH_INVALID_CREDENTIALS'],
    ['AUTH_UNAUTHENTICATED', 401, 'errors.unauthorized'],
    ['AUTH_SESSION_EXPIRED', 401, 'errors.codes.AUTH_SESSION_EXPIRED'],
    ['AUTH_EMAIL_ALREADY_EXISTS', 409, 'errors.codes.AUTH_EMAIL_ALREADY_EXISTS'],
    ['AUTH_INVALID_TOKEN', 400, 'errors.codes.AUTH_INVALID_TOKEN'],
    ['AUTH_TOKEN_EXPIRED', 400, 'errors.codes.AUTH_TOKEN_EXPIRED'],
    ['AUTH_PASSWORDS_DO_NOT_MATCH', 400, 'errors.codes.AUTH_PASSWORDS_DO_NOT_MATCH'],
    ['TEACHER_REQUEST_ALREADY_PENDING', 409, 'errors.codes.TEACHER_REQUEST_ALREADY_PENDING'],
    ['VALIDATION_FAILED', 400, 'errors.validation'],
    ['FORBIDDEN', 403, 'errors.forbidden'],
    ['NOT_FOUND', 404, 'errors.notFound'],
    ['CONFLICT', 409, 'errors.conflict'],
    ['RATE_LIMITED', 429, 'errors.rateLimited'],
    ['INTERNAL_ERROR', 500, 'errors.server'],
  ] as const)('resolves backend code %s (status %i) to %s', (code, status, expectedKey) => {
    const error = makeAxiosError({ response: { status, data: { code } } });
    expect(getErrorI18nKey(error)).toBe(expectedKey);
  });
});
