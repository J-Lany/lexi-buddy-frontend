import { CheckCircle } from 'lucide-react';

import { ActivationCard } from '@/features/auth/ui/activate/components/activation-card';
import { useI18n } from '@/shared/i18n';
import { Button } from '@/shared/ui/button';

type Props = {
  onClick: () => void;
};

export const ConfirmPasswordSuccess = ({ onClick }: Props) => {
  const { t } = useI18n();
  return (
    <ActivationCard
      icon={<CheckCircle className="mx-auto h-10 w-10 text-primary" />}
      title={t('settings.confirmPasswordChange.successTitle')}
      subtitle={t('settings.confirmPasswordChange.successSubtitle')}
    >
      <div className="pt-2">
        <Button onClick={onClick} className="w-full h-11 text-[15px] font-semibold">
          {t('settings.confirmPasswordChange.goToLogin')}
        </Button>
      </div>
    </ActivationCard>
  );
};
