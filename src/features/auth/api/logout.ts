import { api } from '@/lib/api-client';

export const logout = async (): Promise<void> => {
  await api.post<void>('/auth/logout');
};
