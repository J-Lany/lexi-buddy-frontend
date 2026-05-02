import { ActivateAccountView } from '@/features/auth/ui/activate/activate-account-view';

type Props = {
  searchParams: Promise<{ token?: string | string[] }>;
};

export default async function ActivatePage({ searchParams }: Props) {
  const { token: tokenRaw } = await searchParams;
  const token = Array.isArray(tokenRaw) ? tokenRaw[0] : (tokenRaw ?? '');

  return <ActivateAccountView token={token} />;
}
