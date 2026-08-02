import type { AxiosInstance } from 'axios';

import { HttpError, isHttpError } from '@/shared/api/errors/http-error';
import { attachErrorNormalizationInterceptor } from '@/shared/api/http/interceptors';

/** Minimal AxiosInstance stub that captures the rejection handler registered via `.use()`. */
function setup() {
  let errorHandler!: (err: unknown) => Promise<unknown>;
  const instance = {
    interceptors: {
      response: {
        use: (_ok: unknown, onErr: unknown) => {
          errorHandler = onErr as typeof errorHandler;
          return 0;
        },
      },
    },
  } as unknown as AxiosInstance;

  attachErrorNormalizationInterceptor(instance);
  return { errorHandler };
}

describe('attachErrorNormalizationInterceptor', () => {
  it('turns a raw AxiosError into a normalized HttpError (this is what authApi rejects with)', async () => {
    const { errorHandler } = setup();
    const rawAxiosError = {
      isAxiosError: true,
      message: 'Request failed with status code 401',
      response: { status: 401, data: { message: 'Invalid credentials' } },
      config: { headers: {} },
    };

    expect.assertions(4);
    try {
      await errorHandler(rawAxiosError);
    } catch (err) {
      expect(isHttpError(err)).toBe(true);
      expect((err as HttpError).message).not.toBe('Request failed with status code 401');
      expect((err as HttpError).message).not.toContain('Invalid credentials');
      expect((err as HttpError).status).toBe(401);
    }
  });

  it('passes an already-normalized HttpError through unchanged', async () => {
    const { errorHandler } = setup();
    const httpError = new HttpError('already normalized', { status: 500 });

    await expect(errorHandler(httpError)).rejects.toBe(httpError);
  });
});
