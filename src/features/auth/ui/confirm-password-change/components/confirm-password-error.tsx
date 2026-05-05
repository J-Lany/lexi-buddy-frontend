import { XCircle } from 'lucide-react';

import { ActivationCard } from '@/features/auth/ui/activate/components/activation-card';
import { useI18n } from '@/shared/i18n';
import { Button } from '@/shared/ui/button';

type Props = {
  onClick: () => void;
};

export const ConfirmPasswordError = ({ onClick }: Props) => {
  const { t } = useI18n();
  return (
    <ActivationCard
      icon={<XCircle className="mx-auto h-10 w-10 text-destructive/80" />}
      title={t('settings.confirmPasswordChange.errorTitle')}
      subtitle={t('settings.confirmPasswordChange.errorSubtitle')}
    >
      <div className="pt-2">
        <Button onClick={onClick} className="w-full h-11 text-[15px] font-semibold">
          {t('settings.confirmPasswordChange.goToSettings')}
        </Button>
      </div>
    </ActivationCard>
  );
};
