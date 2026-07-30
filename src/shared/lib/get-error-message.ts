import { isHttpError } from '@/shared/api/errors/http-error';

/** @deprecated Prefer `getErrorI18nKey` + `t()` for user-facing text; this returns an untranslated, non-localized message. */
export function getErrorMessage(e: unknown): string {
  if (isHttpError(e)) {
    return e.message;
  }

  if (e instanceof Error) {
    return e.message;
  }

  return 'Something went wrong';
}
