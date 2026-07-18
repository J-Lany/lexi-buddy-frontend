import { api } from '@/shared/api';

export type RegisterParams = {
  email: string;
  password: string;
  consentAccepted: boolean;
  consentVersion: number;
};

export const register = async (payload: RegisterParams): Promise<void> => {
  await api.post('/auth/register', payload);
};
