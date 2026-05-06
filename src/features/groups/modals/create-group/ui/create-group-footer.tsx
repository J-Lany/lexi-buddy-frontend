'use client';

import { useI18n } from '@/shared/i18n';
import { Button } from '@/shared/ui/button';

export function CreateGroupFooter({
  step,
  canNext,
  canCreate,
  isCreating,
  onNext,
  onBack,
  onCreate,
}: {
  step: 1 | 2;
  canNext: boolean;
  canCreate: boolean;
  isCreating: boolean;
  onNext: () => void;
  onBack: () => void;
  onCreate: () => void;
}) {
  const { t } = useI18n();

  if (step === 1) {
    return (
      <div className="flex justify-center">
        <Button type="button" onClick={onNext} disabled={!canNext} className="w-full sm:w-52">
          {t('groups.create.next')}
        </Button>
      </div>
    );
  }

  return (
    <div className="flex gap-3.5">
      <Button type="button" variant="outline" onClick={onBack} className="flex-1 min-w-0">
        {t('groups.create.back')}
      </Button>

      <Button type="button" onClick={onCreate} disabled={!canCreate} className="flex-1 min-w-0">
        {isCreating ? t('groups.create.creating') : t('groups.create.create')}
      </Button>
    </div>
  );
}
