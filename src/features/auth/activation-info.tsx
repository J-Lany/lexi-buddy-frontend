'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { CheckCircle, Loader2, XCircle } from 'lucide-react';
import { EActivationStatus } from '@/features/auth/utils/types';
import { EAppRoutes } from '@/lib/routes';
import { Button } from '@/components/ui/button';
import { useActivateMutation } from '@/features/auth/hooks/use-activate';

export function ActivationInfo() {
  const [status, setStatus] = useState(EActivationStatus.LOADING);
  const activate = useActivateMutation();
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token') || '';

  useEffect(() => {
    activate.mutate(token, {
      onSuccess: () => {
        setTimeout(() => {
          setStatus(EActivationStatus.SUCCESS);
        }, 1000);
      },
      onError: () => {
        setStatus(EActivationStatus.ERROR);
      },
    });
  }, [token, activate]);

  return (
    <div className="mx-auto w-full max-w-[360px] text-center">
      {status === EActivationStatus.LOADING && (
        <div className="space-y-4" aria-live="polite">
          <Loader2 className="mx-auto h-10 w-10 animate-spin text-primary/70" />
          <h1 className="text-[22px] leading-tight font-semibold tracking-tight">Activating…</h1>
          <p className="text-[13px] leading-snug text-muted-foreground">
            Please keep this page open.
          </p>
        </div>
      )}

      {status === EActivationStatus.SUCCESS && (
        <div className="space-y-4" aria-live="polite">
          <CheckCircle className="mx-auto h-10 w-10 text-primary" />
          <h1 className="text-[22px] leading-tight font-semibold tracking-tight">
            Account activated
          </h1>
          <p className="text-[13px] leading-snug text-muted-foreground">You can sign in now.</p>

          <div className="pt-2">
            <Button
              onClick={() => router.push(EAppRoutes.LOGIN)}
              className="w-full h-11 rounded-2xl text-[15px] font-semibold"
            >
              Sign in
            </Button>
          </div>
        </div>
      )}

      {status === EActivationStatus.ERROR && (
        <div className="space-y-4" aria-live="polite">
          <XCircle className="mx-auto h-10 w-10 text-destructive/80" />
          <h1 className="text-[22px] leading-tight font-semibold tracking-tight">
            Activation failed
          </h1>
          <p className="text-[13px] leading-snug text-muted-foreground">
            This link is invalid or expired. You can create {'a\u00A0new'} account to continue.
          </p>

          <div className="pt-2">
            <Button
              onClick={() => router.push(EAppRoutes.REGISTRATION)}
              className="w-full h-11 rounded-2xl text-[15px] font-semibold"
            >
              Create account
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
