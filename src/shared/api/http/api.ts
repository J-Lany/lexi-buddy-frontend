import axios from 'axios';

import {
  attachAuthRefreshInterceptor,
  attachRequestIdInterceptor,
} from '@/shared/api/http/interceptors';

const baseURL = process.env.NEXT_PUBLIC_API_URL;

export const api = axios.create({
  baseURL,
  withCredentials: true,
});

attachRequestIdInterceptor(api);
attachAuthRefreshInterceptor(api);
