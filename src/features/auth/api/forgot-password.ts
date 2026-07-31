import { authApi } from '@/shared/api/http/auth-api';

export type ForgotPasswordResponse = {
  ok: boolean;
};

export type ForgotPasswordParams = {
  email: string;
};

export const forgotPassword = async (
  payload: ForgotPasswordParams,
): Promise<ForgotPasswordResponse> => {
  const { data } = await authApi.post<ForgotPasswordResponse>('/auth/forgot-password', payload);
  return data;
};
