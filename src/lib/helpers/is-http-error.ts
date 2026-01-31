import { HttpError } from '@/lib/api-client';

export function isHttpError(err: unknown): err is HttpError {
  return err instanceof HttpError;
}
