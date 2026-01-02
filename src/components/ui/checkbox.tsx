'use client';

import * as React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

function Checkbox({ className, ...props }: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        [
          // size & shape (iOS-like)
          'size-5 shrink-0 rounded-full',

          // base surface
          'bg-background',

          // border (quiet)
          'border border-border/60',

          // transitions
          'transition-[background-color,border-color,box-shadow] duration-150',

          // checked state
          'data-[state=checked]:bg-primary',
          'data-[state=checked]:border-primary',
          'data-[state=checked]:text-primary-foreground',

          // focus halo (same as inputs)
          'outline-none focus-visible:border-[var(--focus-border)]',
          'focus-visible:shadow-[var(--focus-halo)]',

          // disabled
          'disabled:pointer-events-none disabled:opacity-40',

          // invalid
          'aria-invalid:border-destructive',
          'aria-invalid:shadow-[0_0_0_4px_color-mix(in_oklch,var(--destructive)_22%,white_78%)]',
        ].join(' '),
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="grid place-items-center text-current"
      >
        <Check className="size-3.5 stroke-[2.5]" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };
