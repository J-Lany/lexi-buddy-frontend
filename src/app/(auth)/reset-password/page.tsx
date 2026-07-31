import { ResetPasswordForm } from '@/features/auth/ui/reset-password/reset-password-form';

type Props = {
  searchParams: Promise<{ token?: string | string[] }>;
};

export default async function ResetPasswordPage({ searchParams }: Props) {
  const { token: tokenRaw } = await searchParams;
  const token = Array.isArray(tokenRaw) ? tokenRaw[0] : (tokenRaw ?? '');

  return <ResetPasswordForm token={token} />;
}
