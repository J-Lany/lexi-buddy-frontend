'use client';

import { CircleHelp } from 'lucide-react';

import { useI18n } from '@/shared/i18n';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover';

type Props = {
  content: string;
  contentClassName?: string;
};

export function FieldTooltip({ content, contentClassName }: Props) {
  const { t } = useI18n();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          aria-label={t('common.moreInfo')}
          className="-my-3.5 inline-flex h-11 w-8 items-center justify-center text-muted-foreground/60 outline-none transition-colors hover:text-muted-foreground focus-visible:text-muted-foreground touch-manipulation"
        >
          <CircleHelp className="h-3.5 w-3.5" />
        </button>
      </PopoverTrigger>
      <PopoverContent side="top" className={contentClassName}>
        {content}
      </PopoverContent>
    </Popover>
  );
}
