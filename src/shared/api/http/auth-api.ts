import axios from 'axios';

import {
  attachErrorNormalizationInterceptor,
  attachRequestIdInterceptor,
} from '@/shared/api/http/interceptors';

const baseURL = process.env.NEXT_PUBLIC_API_URL;

export const authApi = axios.create({
  baseURL,
  withCredentials: true,
});

attachRequestIdInterceptor(authApi);
attachErrorNormalizationInterceptor(authApi);
