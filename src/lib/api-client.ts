import axios, { AxiosError, AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';

type ApiErrorResponse = { message?: string };

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

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

const authApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

let refreshPromise: Promise<void> | null = null;

export async function refreshAccessToken() {
  await authApi.post('/auth/refresh');
}

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<ApiErrorResponse>) => {
    const status = error.response?.status;
    const originalConfig = error.config as
      | (InternalAxiosRequestConfig & { _retry?: boolean })
      | undefined;

    if (status === 401 && originalConfig && !originalConfig._retry) {
      originalConfig._retry = true;

      if (!refreshPromise) {
        refreshPromise = refreshAccessToken().finally(() => {
          refreshPromise = null;
        });
      }

      try {
        await refreshPromise;
        return api(originalConfig satisfies AxiosRequestConfig);
      } catch {}
    }

    const message: string =
      error.response?.data?.message ?? error.message ?? 'Something went wrong';

    return Promise.reject(
      new HttpError(message, {
        status: error.response?.status,
        code: error.code,
      }),
    );
  },
);
