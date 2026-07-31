import { authApi } from '@/shared/api/http/auth-api';

export type ResetPasswordResponse = {
  ok: boolean;
};

export type ResetPasswordParams = {
  token: string;
  password: string;
  confirmPassword: string;
};

export const resetPassword = async (
  payload: ResetPasswordParams,
): Promise<ResetPasswordResponse> => {
  const { data } = await authApi.post<ResetPasswordResponse>('/auth/reset-password', payload);
  return data;
};
