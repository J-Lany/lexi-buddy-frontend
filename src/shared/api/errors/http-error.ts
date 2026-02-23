export class HttpError extends Error {
  status?: number;
  code?: string;

  constructor(message: string, opts?: { status?: number; code?: string }) {
    super(message);
    this.name = 'HttpError';
    this.status = opts?.status;
    this.code = opts?.code;
  }
}
export const isHttpError = (e: unknown): e is HttpError => e instanceof HttpError;
