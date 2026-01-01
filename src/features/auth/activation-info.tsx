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
        }, 2000);
      },
      onError: () => {
        setStatus(EActivationStatus.ERROR);
      },
    });
  }, [token, activate]);

  return (
    <div className="w-full max-w-md space-y-6 text-center">
      {status === EActivationStatus.LOADING && (
        <>
          <Loader2 className="h-20 w-20 mx-auto animate-spin text-primary" />
          <h2 className="text-2xl font-semibold">Validating activation link...</h2>
        </>
      )}
      {status === EActivationStatus.SUCCESS && (
        <>
          <CheckCircle className="h-20 w-20 mx-auto text-green-500" />
          <h2 className="text-2xl font-semibold">Your account is activated</h2>
          <p className="text-muted-foreground leading-relaxed">
            Everything is ready — you can now sign in and start using the platform.
          </p>
          <Button onClick={() => router.push(EAppRoutes.LOGIN)} className="w-full h-11">
            Go to Login
          </Button>
        </>
      )}
      {status === EActivationStatus.ERROR && (
        <>
          <XCircle className="h-20 w-20 mx-auto text-red-500" />
          <h2 className="text-2xl font-semibold">We couldn’t activate your account</h2>
          <p className="text-muted-foreground leading-relaxed">
            The activation link is invalid or has expired. You can request a new one or create a new
            account.
          </p>
          <div className="space-y-6">
            <Button onClick={() => router.push(EAppRoutes.REGISTRATION)} className="w-full h-11">
              Register Again
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
