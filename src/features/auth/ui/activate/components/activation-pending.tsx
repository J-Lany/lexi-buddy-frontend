import { Loader2 } from 'lucide-react';

import { ActivationCard } from '@/features/auth/ui/activate/components/activation-card';

export const ActivationPending = () => (
  <ActivationCard
    icon={<Loader2 className="mx-auto h-10 w-10 animate-spin text-primary/70" />}
    title="Activating…"
    subtitle="Please keep this page open."
  />
);
