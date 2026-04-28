import { LANGUAGE_OPTIONS } from '@/shared/catalogs/language';
import type { Language } from '@/shared/domain/language';
import { useI18n } from '@/shared/i18n';
import { ResponsiveSelect } from '@/shared/ui/responsive-select';

type Props = {
  value: Language;
  onChange: (value: Language) => void;
};

export function TeachingDefaultsFields({ value, onChange }: Props) {
  const { t } = useI18n();

  return (
    <div className="flex gap-4 flex-col">
      <div>
        <div className="text-[15px] font-semibold tracking-tight">
          {t('settings.teaching.title')}
        </div>
        <p className="ui-meta mt-1">{t('settings.teaching.subtitle')}</p>
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-medium text-foreground">
          {t('settings.teaching.defaultLanguage')}
        </label>
        <ResponsiveSelect
          value={value}
          onValueChange={(v) => onChange(v)}
          placeholder={t('settings.teaching.defaultLanguage')}
          title={t('settings.teaching.defaultLanguage')}
          options={LANGUAGE_OPTIONS}
        />
        <p className="text-xs text-muted-foreground">
          {t('settings.teaching.defaultLanguageHint')}
        </p>
      </div>
    </div>
  );
}
