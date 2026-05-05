import { ConfirmPasswordChangeView } from '@/features/auth/ui/confirm-password-change/confirm-password-change-view';

type Props = {
  searchParams: Promise<{ token?: string | string[] }>;
};

export default async function ConfirmPasswordChangePage({ searchParams }: Props) {
  const { token: tokenRaw } = await searchParams;
  const token = Array.isArray(tokenRaw) ? tokenRaw[0] : (tokenRaw ?? '');

  return <ConfirmPasswordChangeView token={token} />;
}
