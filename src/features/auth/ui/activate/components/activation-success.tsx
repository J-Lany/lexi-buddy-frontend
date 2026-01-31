import { CheckCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { ActivationCard } from '@/features/auth/ui/activate/components/activation-card';

type Props = {
  onClick: () => void;
};

export const ActivationSuccess = ({ onClick }: Props) => (
  <ActivationCard
    icon={<CheckCircle className="mx-auto h-10 w-10 text-primary" />}
    title="Account activated"
    subtitle="You can sign in now."
  >
    <div className="pt-2">
      <Button onClick={onClick} className="w-full h-11 rounded-2xl text-[15px] font-semibold">
        Sign in
      </Button>
    </div>
  </ActivationCard>
);
