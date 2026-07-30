export class HttpError extends Error {
  status?: number;
  code?: string;
  requestId?: string;

  constructor(message: string, opts?: { status?: number; code?: string; requestId?: string }) {
    super(message);
    this.name = 'HttpError';
    this.status = opts?.status;
    this.code = opts?.code;
    this.requestId = opts?.requestId;
  }
}
export const isHttpError = (e: unknown): e is HttpError => e instanceof HttpError;
