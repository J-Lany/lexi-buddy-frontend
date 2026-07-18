import { api } from '@/shared/api';

export type RequestPasswordChangeParams = {
  password: string;
  confirmPassword: string;
  email?: string;
};

export type RequestPasswordChangeResponse = {
  message: string;
};

export const requestPasswordChange = async (
  params: RequestPasswordChangeParams,
): Promise<RequestPasswordChangeResponse> => {
  const { data } = await api.post<RequestPasswordChangeResponse>(
    '/auth/request-password-change',
    params,
  );
  return data;
};
