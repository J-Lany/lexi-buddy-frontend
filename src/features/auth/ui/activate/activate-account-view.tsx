'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';

import { useActivateMutation } from '@/features/auth/model/use-activate';
import { ActivationError } from '@/features/auth/ui/activate/components/activation-error';
import { ActivationPending } from '@/features/auth/ui/activate/components/activation-pending';
import { ActivationSuccess } from '@/features/auth/ui/activate/components/activation-success';
import { EAppRoutes } from '@/lib/routes';

type Props = {
  token: string;
};
export function ActivateAccountView({ token }: Props) {
  const router = useRouter();
  const { mutateAsync, isPending, isSuccess, isError } = useActivateMutation();
  const firedForTokenRef = useRef<string | null>(null);

  useEffect(() => {
    if (!token) return;

    if (firedForTokenRef.current === token) return;
    firedForTokenRef.current = token;

    void mutateAsync({ token });
  }, [token, mutateAsync]);

  return (
    <div className="mx-auto w-full max-w-[360px] text-center">
      {isPending && <ActivationPending />}
      {isSuccess && <ActivationSuccess onClick={() => router.push(EAppRoutes.LOGIN)} />}
      {isError && <ActivationError onClick={() => router.push(EAppRoutes.REGISTRATION)} />}
    </div>
  );
}
