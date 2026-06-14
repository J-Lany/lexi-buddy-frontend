/**
 * @jest-environment node
 *
 * Tests for attachAuthRefreshInterceptor.
 *
 * We use the Node environment (not jsdom) so we can freely define
 * global.window with a mock location — jsdom marks window.location as
 * non-configurable and prevents any kind of spy/override.
 *
 * Strategy: build a minimal mock AxiosInstance that captures the error
 * handler from interceptors.response.use, then invoke it directly with
 * controlled AxiosError shapes — no real HTTP needed.
 *
 * Module state (isRedirectingToLogin, retriedConfigs) resets between tests
 * via jest.isolateModules().
 */

import type { AxiosInstance } from 'axios';

// ─── helpers ────────────────────────────────────────────────────────────────

/** Returns a fresh module + captured error handler on each call. */
function setup(mocks: { refreshRejects?: boolean } = {}) {
  let errorHandler!: (err: unknown) => Promise<unknown>;
  const mockRequest = jest.fn().mockResolvedValue({ data: 'retried' });

  // minimal AxiosInstance stub
  const instance = {
    interceptors: {
      response: {
        use: (_ok: unknown, onErr: unknown) => {
          errorHandler = onErr as typeof errorHandler;
          return 0;
        },
      },
    },
    request: mockRequest,
  } as unknown as AxiosInstance;

  let refreshAccessToken!: jest.Mock;
  let authApiPost!: jest.Mock;
  let attachFn!: (inst: AxiosInstance) => void;

  jest.isolateModules(() => {
    jest.mock('@/shared/api/http/refresh', () => ({
      refreshAccessToken: jest.fn(
        mocks.refreshRejects
          ? () => Promise.reject(new Error('refresh failed'))
          : () => Promise.resolve(),
      ),
    }));
    jest.mock('@/shared/api/http/auth-api', () => ({
      authApi: { post: jest.fn().mockResolvedValue({}) },
    }));

    /* eslint-disable @typescript-eslint/no-require-imports, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access */
    refreshAccessToken = require('@/shared/api/http/refresh').refreshAccessToken;
    authApiPost = require('@/shared/api/http/auth-api').authApi.post;
    attachFn = require('@/shared/api/http/interceptors').attachAuthRefreshInterceptor;
    /* eslint-enable @typescript-eslint/no-require-imports, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access */
  });

  attachFn(instance);

  return { errorHandler, mockRequest, refreshAccessToken, authApiPost };
}

/** Builds a minimal AxiosError shape the interceptor inspects. */
function make401(config: object = { url: '/api/test' }) {
  return { response: { status: 401 }, config, message: 'Unauthorized', isAxiosError: true };
}

function makeNon401(status: number) {
  return {
    response: { status },
    config: { url: '/api/test' },
    message: 'Error',
    isAxiosError: true,
  };
}

// ─── window.location mock ────────────────────────────────────────────────────
// Node env has no window; we define it so the interceptor's
// `typeof window === 'undefined'` guard doesn't bail out early.

const mockReplace = jest.fn();

beforeAll(() => {
  (global as Record<string, unknown>).window = { location: { replace: mockReplace } };
});

afterAll(() => {
  delete (global as Record<string, unknown>).window;
});

beforeEach(() => mockReplace.mockClear());

// ─── tests ───────────────────────────────────────────────────────────────────

describe('attachAuthRefreshInterceptor', () => {
  describe('non-401 errors', () => {
    it('rejects immediately without refresh attempt', async () => {
      const { errorHandler, refreshAccessToken } = setup();
      await expect(errorHandler(makeNon401(403))).rejects.toBeDefined();
      expect(refreshAccessToken).not.toHaveBeenCalled();
    });

    it('rejects immediately for 500', async () => {
      const { errorHandler, refreshAccessToken } = setup();
      await expect(errorHandler(makeNon401(500))).rejects.toBeDefined();
      expect(refreshAccessToken).not.toHaveBeenCalled();
    });
  });

  describe('401 + successful refresh', () => {
    it('calls refreshAccessToken and retries the original request', async () => {
      const { errorHandler, mockRequest, refreshAccessToken } = setup();
      const config = { url: '/api/data' };

      const result = await errorHandler(make401(config));

      expect(refreshAccessToken).toHaveBeenCalledTimes(1);
      expect(mockRequest).toHaveBeenCalledWith(config);
      expect(result).toEqual({ data: 'retried' });
      expect(mockReplace).not.toHaveBeenCalled();
    });
  });

  describe('401 + failed refresh', () => {
    it('calls logout API and redirects to /login', async () => {
      const { errorHandler, authApiPost } = setup({ refreshRejects: true });

      await expect(errorHandler(make401())).rejects.toBeDefined();

      expect(authApiPost).toHaveBeenCalledWith('/auth/logout');
      expect(mockReplace).toHaveBeenCalledWith('/login');
    });

    it('does not retry the original request', async () => {
      const { errorHandler, mockRequest } = setup({ refreshRejects: true });

      await expect(errorHandler(make401())).rejects.toBeDefined();

      expect(mockRequest).not.toHaveBeenCalled();
    });
  });

  describe('duplicate 401 (already in retriedConfigs)', () => {
    it('rejects immediately without calling refresh again', async () => {
      const { errorHandler, refreshAccessToken } = setup();
      const config = { url: '/api/shared' };
      const error = make401(config);

      // First call — succeeds and adds config to WeakSet
      await errorHandler(error);
      refreshAccessToken.mockClear();

      // Second call with the same config object → already retried
      await expect(errorHandler(error)).rejects.toBeDefined();
      expect(refreshAccessToken).not.toHaveBeenCalled();
    });
  });

  describe('concurrent 401s', () => {
    it('calls logout only once even with two simultaneous 401s', async () => {
      const { errorHandler, authApiPost } = setup({ refreshRejects: true });

      // Two different config objects to avoid the retriedConfigs guard
      const [p1, p2] = await Promise.allSettled([
        errorHandler(make401({ url: '/api/a' })),
        errorHandler(make401({ url: '/api/b' })),
      ]);

      expect(p1.status).toBe('rejected');
      expect(p2.status).toBe('rejected');
      expect(authApiPost).toHaveBeenCalledTimes(1);
      expect(mockReplace).toHaveBeenCalledTimes(1);
    });
  });
});
