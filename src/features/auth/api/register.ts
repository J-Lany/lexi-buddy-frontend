import { api } from '@/lib/api-client';

export type RegisterParams = {
  email: string;
  password: string;
};

export const register = async (payload: RegisterParams): Promise<void> => {
  await api.post('/auth/register', payload);
};
