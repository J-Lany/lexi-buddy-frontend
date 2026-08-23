'use client';

import { Loader } from 'lucide-react';

import { useI18n } from '@/shared/i18n';
import { cn } from '@/shared/lib/cn';
import { Button } from '@/shared/ui/button';
import { FieldTooltip } from '@/shared/ui/field-tooltip';
import { Textarea } from '@/shared/ui/textarea';

type Props = {
  value: string;
  maxTerms: number;
  count: number;
  onChange: (value: string) => void;
  onBlurNormalize?: () => void;

  onTranslate: () => void;
  translateDisabled: boolean;

  isPending: boolean;
  errorMessage?: string | null;
};

export function VocabTermsInput({
  value,
  maxTerms,
  count,
  onChange,
  onBlurNormalize,
  onTranslate,
  translateDisabled,
  isPending,
  errorMessage,
}: Props) {
  const { t } = useI18n();

  const labelTooltip = t('lessons.vocab.labelTooltip').replace('{max}', String(maxTerms));

  return (
    <div className="grid gap-5">
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-1.5">
          <span className="text-xs text-muted-foreground">{t('lessons.vocab.label')}</span>
          <FieldTooltip content={labelTooltip} />
        </div>
        <span
          className={cn(
            'text-xs tabular-nums',
            count > maxTerms ? 'text-destructive' : 'text-muted-foreground',
          )}
        >
          {count} / {maxTerms}
        </span>
      </div>
      <Textarea
        name="vocab"
        className="rounded-3xl"
        minRows={5}
        placeholder={t('lessons.vocab.inputHint').replace('{max}', String(maxTerms))}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlurNormalize}
      />

      <Button type="button" onClick={onTranslate} disabled={translateDisabled}>
        {isPending ? t('lessons.vocab.translating') : t('lessons.vocab.translateBtn')}
      </Button>

      {errorMessage ? <div className="text-red-500 mt-1">{errorMessage}</div> : null}

      {isPending ? (
        <div className="flex justify-center mt-2">
          <Loader className="animate-spin text-xl" />
        </div>
      ) : null}
    </div>
  );
}
