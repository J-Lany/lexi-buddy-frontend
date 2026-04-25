import type { AxiosError, AxiosInstance } from 'axios';

import { HttpError } from '@/shared/api/errors/http-error';
import { refreshAccessToken } from '@/shared/api/http/refresh';
import type { ApiErrorResponse } from '@/shared/api/http/types';
import { routes } from '@/shared/router/routes';

import { getRequestId } from './request-id';

function toHttpError(error: AxiosError<ApiErrorResponse>): HttpError {
  const message = error.response?.data?.message ?? error.message ?? 'Something went wrong';

  return new HttpError(message, {
    status: error.response?.status,
    code: error.code,
  });
}

const retriedConfigs = new WeakSet<object>();

export function attachAuthRefreshInterceptor(apiInstance: AxiosInstance) {
  apiInstance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError<ApiErrorResponse>) => {
      const status = error.response?.status;
      const originalConfig = error.config;

      if (status !== 401 || !originalConfig) {
        return Promise.reject(toHttpError(error));
      }

      if (retriedConfigs.has(originalConfig)) {
        return Promise.reject(toHttpError(error));
      }

      retriedConfigs.add(originalConfig);

      try {
        await refreshAccessToken();
        return apiInstance.request(originalConfig);
      } catch {
        window.location.href = routes.login;
        return Promise.reject(toHttpError(error));
      }
    },
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
