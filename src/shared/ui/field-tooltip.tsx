'use client';

import { CircleHelp } from 'lucide-react';
import * as React from 'react';

import { useIsCoarsePointer } from '@/shared/hooks/use-coarse-pointer';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/shared/ui/tooltip';

type Props = {
  content: string;
  contentClassName?: string;
  ariaLabel?: string;
};

export function FieldTooltip({ content, contentClassName, ariaLabel }: Props) {
  const isCoarse = useIsCoarsePointer();

  const trigger = (
    <button
      type="button"
      aria-label={ariaLabel ?? content}
      className="relative inline-flex items-center justify-center text-muted-foreground/60 hover:text-muted-foreground transition-colors outline-none focus-visible:text-muted-foreground touch-manipulation before:absolute before:-inset-[15px] before:content-['']"
    >
      <CircleHelp className="h-3.5 w-3.5" />
    </button>
  );

  if (isCoarse) {
    return (
      <Popover>
        <PopoverTrigger asChild>{trigger}</PopoverTrigger>
        <PopoverContent side="top" className={contentClassName}>
          {content}
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>{trigger}</TooltipTrigger>
      <TooltipContent side="top" className={contentClassName}>
        {content}
      </TooltipContent>
    </Tooltip>
  );
}
