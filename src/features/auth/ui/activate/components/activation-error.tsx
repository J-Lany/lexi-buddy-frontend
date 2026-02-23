import { XCircle } from 'lucide-react';

import { ActivationCard } from '@/features/auth/ui/activate/components/activation-card';
import { Button } from '@/shared/ui/button';

type Props = {
  onClick: () => void;
};

export const ActivationError = ({ onClick }: Props) => (
  <ActivationCard
    icon={<XCircle className="mx-auto h-10 w-10 text-destructive/80" />}
    title="Activation failed"
    subtitle="This link is invalid or expired. You can create {'a\u00A0new'} account to continue."
  >
    <div className="pt-2">
      <Button onClick={onClick} className="w-full h-11 rounded-2xl text-[15px] font-semibold">
        Create account
      </Button>
    </div>
  </ActivationCard>
);
