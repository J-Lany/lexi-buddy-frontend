'use client';

import * as PopoverPrimitive from '@radix-ui/react-popover';
import * as React from 'react';

import { cn } from '@/shared/lib/cn';

const popupContentClassName = cn(
  'z-50 max-w-[240px] rounded-xl border border-border/60 bg-popover px-3 py-2 text-[13px] leading-snug text-popover-foreground shadow-md whitespace-pre-line',
  'animate-in fade-in-0 zoom-in-95',
  'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
  'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
);

function Popover({ ...props }: React.ComponentProps<typeof PopoverPrimitive.Root>) {
  return <PopoverPrimitive.Root data-slot="popover" {...props} />;
}

function PopoverTrigger({ ...props }: React.ComponentProps<typeof PopoverPrimitive.Trigger>) {
  return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />;
}

function PopoverContent({
  className,
  sideOffset = 6,
  collisionPadding = 12,
  children,
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Content>) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        data-slot="popover-content"
        sideOffset={sideOffset}
        collisionPadding={collisionPadding}
        className={cn(popupContentClassName, className)}
        {...props}
      >
        {children}
        <PopoverPrimitive.Arrow className="fill-popover" />
      </PopoverPrimitive.Content>
    </PopoverPrimitive.Portal>
  );
}

export { Popover, PopoverContent, PopoverTrigger };
