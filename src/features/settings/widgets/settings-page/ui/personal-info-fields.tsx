import { useI18n } from '@/shared/i18n';
import { Input } from '@/shared/ui/input';

type Props = {
  firstName: string;
  lastName: string;
  disabled: boolean;
  onFirstNameChange: (value: string) => void;
  onLastNameChange: (value: string) => void;
};

export function PersonalInfoFields({
  firstName,
  lastName,
  disabled,
  onFirstNameChange,
  onLastNameChange,
}: Props) {
  const { t } = useI18n();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-foreground">
          {t('settings.profile.firstName')}
        </label>
        <Input
          value={firstName}
          onChange={(e) => onFirstNameChange(e.target.value)}
          placeholder={t('settings.profile.firstName')}
          disabled={disabled}
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-medium text-foreground">
          {t('settings.profile.lastName')}
        </label>
        <Input
          value={lastName}
          onChange={(e) => onLastNameChange(e.target.value)}
          placeholder={t('settings.profile.lastName')}
          disabled={disabled}
        />
      </div>
    </div>
  );
}
