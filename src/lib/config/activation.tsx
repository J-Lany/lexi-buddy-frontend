import { CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import { ReactNode } from 'react';
import { AppRouterInstance } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { EAppRoutes } from '@/lib/constants/routes';
import { EActivationStatus } from '@/lib/constants/auth';

export interface ActivationStateConfig {
  icon: ReactNode;
  title: string;
  description: string;
  button?: ReactNode;
  glow: string;
  bg: string;
}

export const getActivationConfig = (
  status: EActivationStatus,
  router: AppRouterInstance,
): ActivationStateConfig => {
  const base: Record<EActivationStatus, ActivationStateConfig> = {
    [EActivationStatus.LOADING]: {
      icon: <Loader2 className="w-12 h-12 text-primary animate-spin" />,
      title: 'Activating your account...',
      description: 'Please wait while we verify your activation link.',
      bg: 'bg-card',
      glow: 'shadow-primary/10',
    },
    [EActivationStatus.SUCCESS]: {
      icon: <CheckCircle2 className="w-14 h-14 text-green-500" />,
      title: 'Account Activated 🎉',
      description: 'Your LexiBuddy account is ready. You can now log in and start exploring!',
      button: (
        <Button onClick={() => router.push(EAppRoutes.LOGIN)} className="w-full h-11">
          Go to Login
        </Button>
      ),
      bg: 'bg-card',
      glow: 'shadow-green-100 dark:shadow-green-900/30',
    },
    [EActivationStatus.ERROR]: {
      icon: <XCircle className="w-14 h-14 text-destructive" />,
      title: 'Link Invalid or Expired',
      description: 'The activation link is invalid or has expired. Please register again.',
      button: (
        <Button
          variant="outline"
          onClick={() => router.push(EAppRoutes.REGISTRATION)}
          className="w-full h-11"
        >
          Register Again
        </Button>
      ),
      bg: 'bg-card',
      glow: 'shadow-red-100 dark:shadow-red-900/30',
    },
  };

  return base[status];
};
