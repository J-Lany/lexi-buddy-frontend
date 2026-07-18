'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';

import { useActivateMutation } from '@/features/auth/model/use-activate';
import { ActivationError } from '@/features/auth/ui/activate/components/activation-error';
import { ActivationPending } from '@/features/auth/ui/activate/components/activation-pending';
import { ActivationSuccess } from '@/features/auth/ui/activate/components/activation-success';
import { routes } from '@/shared/router/routes';
import { Card } from '@/shared/ui/card';

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
    <Card className="w-full p-0 md:ui-auth-sheet md:p-10 border-0 shadow-none bg-transparent">
      <div className="flex flex-col items-center gap-6 px-1 text-center">
        <Link href={routes.main} aria-label="Lexi Buddy home">
          <Image
            src="/icon.webp"
            alt="Lexi Buddy"
            width={64}
            height={64}
            priority
            className="select-none"
          />
        </Link>
        <div className="w-full">
          {!token && <ActivationError onClick={() => router.push(routes.register)} />}
          {isPending && <ActivationPending />}
          {isSuccess && <ActivationSuccess onClick={() => router.push(routes.login)} />}
          {isError && <ActivationError onClick={() => router.push(routes.register)} />}
        </div>
      </div>
    </Card>
  );
}
