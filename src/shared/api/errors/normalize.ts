import type { AxiosError } from 'axios';

import { HttpError, isHttpError } from '@/shared/api/errors/http-error';
import { localizedFallbackMessage } from '@/shared/api/errors/localized-fallback';
import type { ApiErrorResponse } from '@/shared/api/http/types';

const TIMEOUT_ERROR_CODES = new Set(['ECONNABORTED', 'ETIMEDOUT']);

function isAxiosErrorLike(error: unknown): error is AxiosError<ApiErrorResponse> {
  return (
    typeof error === 'object' &&
    error !== null &&
    (error as { isAxiosError?: unknown }).isAxiosError === true
  );
}

function extractRequestId(config: unknown): string | undefined {
  const headers = (config as { headers?: Record<string, unknown> } | undefined)?.headers;
  if (!headers) return undefined;
  const value = headers['X-Request-Id'] ?? headers['x-request-id'];
  return typeof value === 'string' ? value : undefined;
}

export function normalizeApiError(error: unknown): HttpError {
  if (isHttpError(error)) return error;

  if (isAxiosErrorLike(error)) {
    const requestId = extractRequestId(error.config);

    if (!error.response) {
      const isTimeout = TIMEOUT_ERROR_CODES.has(error.code ?? '');
      const code = isTimeout ? 'TIMEOUT' : 'NETWORK_ERROR';
      return new HttpError(localizedFallbackMessage(undefined, code), { code, requestId });
    }

    const status = error.response.status;
    const backendCode = error.response.data?.code;

    return new HttpError(localizedFallbackMessage(status), {
      status,
      code: backendCode,
      requestId,
    });
  }

  return new HttpError(localizedFallbackMessage());
}
