'use client';

import { CircleHelp } from 'lucide-react';
import * as React from 'react';

import { Tooltip, TooltipContent, TooltipTrigger } from '@/shared/ui/tooltip';

type Props = {
  content: string;
};

export function FieldTooltip({ content }: Props) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          aria-label={content}
          className="inline-flex items-center justify-center text-muted-foreground/60 hover:text-muted-foreground transition-colors outline-none focus-visible:text-muted-foreground"
        >
          <CircleHelp className="h-3.5 w-3.5" />
        </button>
      </TooltipTrigger>
      <TooltipContent side="top">{content}</TooltipContent>
    </Tooltip>
  );
}
