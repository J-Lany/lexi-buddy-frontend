import * as React from 'react';
import TextareaAutosize, { TextareaAutosizeProps } from 'react-textarea-autosize';

import { cn } from '@/shared/lib/cn';

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaAutosizeProps>(
  ({ className, ...props }, ref) => {
    return (
      <TextareaAutosize
        ref={ref}
        data-slot="textarea"
        className={cn(
          'w-full rounded-xl px-3 py-2 text-[15px] md:text-[14px]',
          'bg-background',
          'border border-border/60',
          'placeholder:text-muted-foreground',
          'outline-none transition-[border-color,box-shadow,background-color] duration-150',
          'focus-visible:border-(--focus-border) focus-visible:shadow-(--focus-halo)',
          'disabled:pointer-events-none disabled:opacity-50',
          'aria-invalid:border-destructive aria-invalid:shadow-[0_0_0_4px_color-mix(in_oklch,var(--destructive)_22%,white_78%)]',
          'resize-none',
          className,
        )}
        {...props}
      />
    );
  },
);

Textarea.displayName = 'Textarea';

export { Textarea };
