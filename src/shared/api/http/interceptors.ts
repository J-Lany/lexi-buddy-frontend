import type { AxiosError, AxiosInstance } from 'axios';

import { normalizeApiError } from '@/shared/api/errors/normalize';
import { authApi } from '@/shared/api/http/auth-api';
import { refreshAccessToken } from '@/shared/api/http/refresh';
import type { ApiErrorResponse } from '@/shared/api/http/types';
import { routes } from '@/shared/router/routes';

import { getRequestId } from './request-id';

const retriedConfigs = new WeakSet<object>();
let isRedirectingToLogin = false;

// Must run before attachErrorNormalizationInterceptor so it sees the raw
// AxiosError (and its status) rather than an already-normalized HttpError.
export function attachAuthRefreshInterceptor(apiInstance: AxiosInstance) {
  apiInstance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError<ApiErrorResponse>) => {
      const status = error.response?.status;
      const originalConfig = error.config;

      if (status !== 401 || !originalConfig) {
        return Promise.reject(error);
      }

      if (typeof window === 'undefined') {
        return Promise.reject(error);
      }

      if (retriedConfigs.has(originalConfig)) {
        return Promise.reject(error);
      }

      retriedConfigs.add(originalConfig);

      try {
        await refreshAccessToken();
      } catch {
        // Only one concurrent 401 handler should trigger logout + redirect.
        if (!isRedirectingToLogin) {
          isRedirectingToLogin = true;
          await authApi.post('/auth/logout').catch(() => {});
          window.location.replace(routes.login);
        }
        return Promise.reject(error);
      }

      // Retry is intentionally outside the try block: if the retry itself
      // fails, it should propagate as a regular error — not trigger logout.
      return apiInstance.request(originalConfig);
    },
  );
}

export function attachErrorNormalizationInterceptor(apiInstance: AxiosInstance) {
  apiInstance.interceptors.response.use(
    (response) => response,
    (error: unknown) => Promise.reject(normalizeApiError(error)),
  );
}

export function attachRequestIdInterceptor(apiInstance: AxiosInstance) {
  apiInstance.interceptors.request.use((config) => {
    config.headers = config.headers ?? {};

    const has = 'X-Request-Id' in config.headers || 'x-request-id' in config.headers;

    if (!has) {
      (config.headers as Record<string, string>)['X-Request-Id'] = getRequestId();
    }

    return config;
  });
}
