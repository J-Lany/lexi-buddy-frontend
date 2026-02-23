import { api } from '@/shared/api';

export type LoginResponse = {
  firstName: string | null;
  lastName: string | null;
  email: string;
};

export type LoginParams = {
  email: string;
  password: string;
};

export const login = async (payload: LoginParams): Promise<LoginResponse> => {
  const { data } = await api.post<LoginResponse>('/auth/login', payload);
  return data;
};
