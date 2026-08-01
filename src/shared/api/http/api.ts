import axios from 'axios';

import {
  attachAuthRefreshInterceptor,
  attachErrorNormalizationInterceptor,
  attachRequestIdInterceptor,
} from '@/shared/api/http/interceptors';

const baseURL = process.env.NEXT_PUBLIC_API_URL;

// Without a timeout, a request the server never responds to leaves its
// promise permanently unsettled — React Query's `isPending` then never
// resolves either, so a loading skeleton has no way to ever leave the
// screen. normalizeApiError already maps ECONNABORTED/ETIMEDOUT to a
// localized "TIMEOUT" error; this is what actually triggers that path.
export const api = axios.create({
  baseURL,
  withCredentials: true,
  timeout: 10_000,
});

attachRequestIdInterceptor(api);
// Order matters: refresh must see the raw AxiosError before normalization runs.
attachAuthRefreshInterceptor(api);
attachErrorNormalizationInterceptor(api);
