import { api } from '@/shared/api';

export const logout = async (): Promise<void> => {
  await api.post<void>('/auth/logout');
};
