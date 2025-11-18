import axios, { AxiosError } from 'axios';

type ApiErrorResponse = {
  message?: string;
};

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiErrorResponse>) => {
    const message = error.response?.data?.message ?? error.message ?? 'Something went wrong';

    return Promise.reject(new AxiosError(message, error.code, error.request, error.response));
  },
);
