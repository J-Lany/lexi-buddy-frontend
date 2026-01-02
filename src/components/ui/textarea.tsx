import * as React from 'react';
import { cn } from '@/lib/utils';

function Textarea({ className, ...props }: React.ComponentProps<'textarea'>) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        [
          'w-full rounded-xl px-3 py-2 text-[15px] md:text-[14px]',
          'min-h-24',
          'bg-background',
          'border border-border/60',
          'placeholder:text-muted-foreground',
          'outline-none transition-[border-color,box-shadow,background-color] duration-150',
          'focus-visible:border-[var(--focus-border)] focus-visible:shadow-[var(--focus-halo)]',
          'disabled:pointer-events-none disabled:opacity-50',
          'aria-invalid:border-destructive aria-invalid:shadow-[0_0_0_4px_color-mix(in_oklch,var(--destructive)_22%,white_78%)]',
        ].join(' '),
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
