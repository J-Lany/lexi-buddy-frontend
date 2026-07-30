import axios from 'axios';

import {
  attachAuthRefreshInterceptor,
  attachErrorNormalizationInterceptor,
  attachRequestIdInterceptor,
} from '@/shared/api/http/interceptors';

const baseURL = process.env.NEXT_PUBLIC_API_URL;

export const api = axios.create({
  baseURL,
  withCredentials: true,
});

attachRequestIdInterceptor(api);
// Order matters: refresh must see the raw AxiosError before normalization runs.
attachAuthRefreshInterceptor(api);
attachErrorNormalizationInterceptor(api);
