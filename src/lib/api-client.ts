import axios, { AxiosError, AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';
import { ApiError } from 'next/dist/server/api-utils';

type ApiErrorResponse = {
  message?: string;
};

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

const authApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

let refreshPromise: Promise<void> | null = null;

async function refreshAccessToken() {
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
        return api(originalConfig as AxiosRequestConfig);
      } catch {}
    }

    const message = error.response?.data?.message ?? error.message ?? 'Something went wrong';

    return Promise.reject(
      new ApiError(message, { status: error.response?.status, code: error.code }),
    );
  },
);
