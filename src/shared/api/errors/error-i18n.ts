import { normalizeApiError } from '@/shared/api/errors/normalize';

export const GENERIC_ERROR_I18N_KEY = 'errors.generic';

const CODE_I18N_KEY: Record<string, string> = {
  NETWORK_ERROR: 'errors.network',
  TIMEOUT: 'errors.timeout',
  AUTH_INVALID_CREDENTIALS: 'errors.codes.AUTH_INVALID_CREDENTIALS',
  AUTH_SESSION_EXPIRED: 'errors.codes.AUTH_SESSION_EXPIRED',
  AUTH_EMAIL_ALREADY_EXISTS: 'errors.codes.AUTH_EMAIL_ALREADY_EXISTS',
  AUTH_INVALID_TOKEN: 'errors.codes.AUTH_INVALID_TOKEN',
  AUTH_TOKEN_EXPIRED: 'errors.codes.AUTH_TOKEN_EXPIRED',
  AUTH_PASSWORDS_DO_NOT_MATCH: 'errors.codes.AUTH_PASSWORDS_DO_NOT_MATCH',
};

const STATUS_I18N_KEY: Record<number, string> = {
  400: 'errors.validation',
  401: 'errors.unauthorized',
  403: 'errors.forbidden',
  404: 'errors.notFound',
  409: 'errors.conflict',
  429: 'errors.rateLimited',
  500: 'errors.server',
};

/** Maps an HTTP status to a screen-specific i18n key, e.g. login's 401 → invalid credentials. */
export type ErrorI18nStatusOverrides = Partial<Record<number, string>>;

/**
 * Resolution order: known backend `code` → contextual `overrides` for the
 * current screen → global fallback by HTTP status → `errors.generic`.
 */
export function getErrorI18nKey(error: unknown, overrides?: ErrorI18nStatusOverrides): string {
  const httpError = normalizeApiError(error);

  if (httpError.code && CODE_I18N_KEY[httpError.code]) {
    return CODE_I18N_KEY[httpError.code];
  }

  if (httpError.status !== undefined && overrides?.[httpError.status]) {
    return overrides[httpError.status]!;
  }

  if (httpError.status !== undefined && STATUS_I18N_KEY[httpError.status]) {
    return STATUS_I18N_KEY[httpError.status];
  }

  if (httpError.status !== undefined && httpError.status >= 500) {
    return STATUS_I18N_KEY[500];
  }

  return GENERIC_ERROR_I18N_KEY;
}
