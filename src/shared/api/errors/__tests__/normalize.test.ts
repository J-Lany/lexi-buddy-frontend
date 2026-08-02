import { HttpError } from '@/shared/api/errors/http-error';
import { normalizeApiError } from '@/shared/api/errors/normalize';
import { saveConsent } from '@/shared/lib/cookie-consent';

function makeAxiosError(opts: {
  response?: { status: number; data?: { message?: string; code?: string } };
  code?: string;
  message?: string;
  headers?: Record<string, string>;
}) {
  return {
    isAxiosError: true,
    message: opts.message ?? 'Request failed',
    code: opts.code,
    response: opts.response,
    config: { headers: opts.headers ?? {} },
  };
}

describe('normalizeApiError', () => {
  it('returns an existing HttpError without reprocessing it', () => {
    const original = new HttpError('already normalized', { status: 401, code: 'SOME_CODE' });
    expect(normalizeApiError(original)).toBe(original);
  });

  it('maps an AxiosError without a response to NETWORK_ERROR', () => {
    const error = makeAxiosError({ code: 'ERR_NETWORK', message: 'Network Error' });
    const result = normalizeApiError(error);

    expect(result).toBeInstanceOf(HttpError);
    expect(result.code).toBe('NETWORK_ERROR');
    expect(result.status).toBeUndefined();
  });

  it('maps an AxiosError with ECONNABORTED to TIMEOUT', () => {
    const error = makeAxiosError({ code: 'ECONNABORTED', message: 'timeout of 5000ms exceeded' });
    const result = normalizeApiError(error);

    expect(result.code).toBe('TIMEOUT');
  });

  it('maps ETIMEDOUT to TIMEOUT too', () => {
    const error = makeAxiosError({ code: 'ETIMEDOUT' });
    expect(normalizeApiError(error).code).toBe('TIMEOUT');
  });

  it('produces a safe generic fallback for a 401 without a backend code', () => {
    const error = makeAxiosError({
      response: { status: 401, data: { message: 'Invalid credentials' } },
    });
    const result = normalizeApiError(error);

    expect(result.status).toBe(401);
    expect(result.code).toBeUndefined();
    expect(result.message).not.toContain('Invalid credentials');
  });

  it('uses response.data.code when the backend already returns a machine code', () => {
    const error = makeAxiosError({
      response: { status: 409, data: { code: 'AUTH_EMAIL_ALREADY_EXISTS', message: 'ignored' } },
    });
    const result = normalizeApiError(error);

    expect(result.code).toBe('AUTH_EMAIL_ALREADY_EXISTS');
    expect(result.status).toBe(409);
  });

  it('never surfaces the backend message anywhere on the HttpError', () => {
    const error = makeAxiosError({
      response: { status: 500, data: { message: 'Stack trace: NullPointerException at line 42' } },
    });
    const result = normalizeApiError(error);

    expect(result.message).not.toContain('NullPointerException');
    expect(result.message).not.toContain('Stack trace');
  });

  it('never uses raw AxiosError.message as the resulting message', () => {
    const error = makeAxiosError({
      response: { status: 400 },
      message: 'Request failed with status code 400',
    });
    const result = normalizeApiError(error);

    expect(result.message).not.toBe('Request failed with status code 400');
  });

  it('preserves the request id from the outgoing request headers', () => {
    const error = makeAxiosError({
      response: { status: 500 },
      headers: { 'X-Request-Id': 'req-123' },
    });
    const result = normalizeApiError(error);

    expect(result.requestId).toBe('req-123');
  });

  it('falls back to a generic HttpError for a non-Axios unknown error', () => {
    const result = normalizeApiError(new Error('boom'));

    expect(result).toBeInstanceOf(HttpError);
    expect(result.status).toBeUndefined();
    expect(result.code).toBeUndefined();
    expect(result.message).not.toBe('boom');
  });

  it('falls back to a generic HttpError for a completely unknown thrown value', () => {
    const result = normalizeApiError('just a string');
    expect(result).toBeInstanceOf(HttpError);
  });

  describe('locale-aware fallback message (non-auth call-sites read HttpError.message directly)', () => {
    afterEach(() => window.localStorage.clear());

    it('produces a Russian message when the active locale is ru, not an English default', () => {
      saveConsent({ functional: true });
      window.localStorage.setItem('ui-locale', 'ru');

      const error = makeAxiosError({ response: { status: 404 } });
      const result = normalizeApiError(error);

      expect(result.message).toBe('Не удалось найти запрошенные данные.');
      expect(result.message).not.toMatch(/[a-zA-Z]/);
    });

    it('produces a Kazakh network-error message when the active locale is kz', () => {
      saveConsent({ functional: true });
      window.localStorage.setItem('ui-locale', 'kz');

      const error = makeAxiosError({ code: 'ERR_NETWORK' });
      const result = normalizeApiError(error);

      expect(result.message).toBe(
        'Байланыс мәселесі. Интернет байланысын тексеріп, қайталап көріңіз.',
      );
    });
  });
});
