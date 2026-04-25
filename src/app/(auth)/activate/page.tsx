import { ActivateAccountView } from '@/features/auth/ui/activate/activate-account-view';

type Props = {
  searchParams: Promise<{ token?: string | string[] }>;
};

export default async function ActivatePage({ searchParams }: Props) {
  const { token: tokenRaw } = await searchParams;
  const token = Array.isArray(tokenRaw) ? tokenRaw[0] : (tokenRaw ?? '');

  return (
    <main className="ui-auth-shell">
      <div className="ui-auth-scroll">
        <div className="ui-auth-center">
          <section className="w-full p-6 sm:p-8 md:p-10">
            <ActivateAccountView token={token} />
          </section>
        </div>
      </div>
    </main>
  );
}
