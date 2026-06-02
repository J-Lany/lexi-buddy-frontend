'use client';

import { useI18n } from '@/shared/i18n';
import { cn } from '@/shared/lib/cn';
import { Textarea } from '@/shared/ui/textarea';

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export function MessageTemplates({ value, onChange }: Props) {
  const { t } = useI18n();
  const templates = [t('students.invite.tpl1'), t('students.invite.tpl2')];

  return (
    <div>
      <p className="mb-2 text-[14px] font-semibold text-foreground">
        {t('students.invite.messageLabel')}{' '}
        <span className="font-normal text-muted-foreground">
          {t('students.invite.messageLabelOptional')}
        </span>
      </p>

      <div className="mb-2 flex flex-wrap gap-2">
        {templates.map((tpl) => {
          const isActive = value === tpl;
          return (
            <button
              key={tpl}
              type="button"
              onClick={() => onChange(isActive ? '' : tpl)}
              className={cn(
                'rounded-full border px-3.5 py-2 text-[13px] font-medium transition-colors',
                'text-left leading-snug max-w-[220px] truncate',
                isActive
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-border/60 bg-background text-muted-foreground hover:border-border hover:text-foreground',
              )}
            >
              {tpl}
            </button>
          );
        })}
      </div>

      <Textarea
        placeholder={t('students.invite.messagePlaceholderExample')}
        minRows={3}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="text-[14px]"
      />
    </div>
  );
}
