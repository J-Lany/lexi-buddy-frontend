import { authApi } from '@/shared/api/http/auth-api';

let refreshPromise: Promise<void> | null = null;

async function refreshInner() {
  await authApi.post('/auth/refresh');
}

export function refreshAccessToken(): Promise<void> {
  if (!refreshPromise) {
    refreshPromise = refreshInner().finally(() => {
      refreshPromise = null;
    });
  }

  return refreshPromise;
}
