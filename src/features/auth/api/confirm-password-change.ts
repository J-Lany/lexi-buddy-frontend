import { authApi } from '@/shared/api/http/auth-api';

export type ConfirmPasswordChangeResponse = {
  message: string;
};

export type ConfirmPasswordChangeParams = {
  token: string;
};

export const confirmPasswordChange = async ({
  token,
}: ConfirmPasswordChangeParams): Promise<ConfirmPasswordChangeResponse> => {
  const { data } = await authApi.post<ConfirmPasswordChangeResponse>(
    '/auth/confirm-password-change',
    null,
    { params: { token } },
  );
  return data;
};
