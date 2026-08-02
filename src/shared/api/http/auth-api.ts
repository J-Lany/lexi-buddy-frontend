import axios from 'axios';

import {
  attachErrorNormalizationInterceptor,
  attachRequestIdInterceptor,
} from '@/shared/api/http/interceptors';

const baseURL = process.env.NEXT_PUBLIC_API_URL;

// See api.ts for why this matters: `api`'s 401 interceptor awaits
// `refreshAccessToken()` (which calls this client) before resolving the
// original request — if a refresh call hangs with no timeout, every request
// waiting on it hangs too, not just this one.
export const authApi = axios.create({
  baseURL,
  withCredentials: true,
  timeout: 10_000,
});

attachRequestIdInterceptor(authApi);
attachErrorNormalizationInterceptor(authApi);
