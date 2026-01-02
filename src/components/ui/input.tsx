import * as React from 'react';
import { cn } from '@/lib/utils';

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        [
          // size / shape
          'h-11 w-full min-w-0 rounded-xl px-3 text-[15px] md:text-[14px]',
          // surface
          'bg-background',
          // border
          'border border-border/60',
          // placeholder + selection
          'placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground',
          // motion
          'transition-[border-color,box-shadow,background-color] duration-150',
          // focus (Apple halo)
          'outline-none focus-visible:border-[var(--focus-border)] focus-visible:shadow-[var(--focus-halo)]',
          // disabled
          'disabled:pointer-events-none disabled:opacity-50',
          // invalid
          'aria-invalid:border-destructive aria-invalid:shadow-[0_0_0_4px_color-mix(in_oklch,var(--destructive)_22%,white_78%)]',
        ].join(' '),
        className,
      )}
      {...props}
    />
  );
}

export { Input };
