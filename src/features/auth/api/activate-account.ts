import { api } from '@/shared/api';

export type ActivationResponse = {
  message: string;
};

export type ActivationParams = {
  token: string;
};

export const activateAccount = async ({ token }: ActivationParams): Promise<ActivationResponse> => {
  const { data } = await api.get<ActivationResponse>('/auth/activate', {
    params: { token },
  });
  return data;
};
