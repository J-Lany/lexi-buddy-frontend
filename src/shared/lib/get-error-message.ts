import { isHttpError } from '@/shared/api/errors/http-error';

export function getErrorMessage(e: unknown): string {
  if (isHttpError(e)) {
    return e.message;
  }

  if (e instanceof Error) {
    return e.message;
  }

  return 'Something went wrong';
}
