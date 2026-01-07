'use client';

import * as React from 'react';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { XIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

type ResponsiveModalProps = {
  trigger: React.ReactNode;
  children: React.ReactNode;

  title: string;
  header?: React.ReactNode;
  right?: React.ReactNode;
  footer?: React.ReactNode;

  maxWidthClassName?: string;
  className?: string;

  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export function ResponsiveModal({
  trigger,
  title,
  header,
  right,
  children,
  footer,
  maxWidthClassName,
  className,
  open,
  onOpenChange,
}: ResponsiveModalProps) {
  const isControlled = typeof open === 'boolean';

  return (
    <Dialog {...(isControlled ? { open, onOpenChange } : {})}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        showCloseButton={false}
        className={cn(
          // Desktop modal (macOS-like sheet)
          'sm:max-h-[90dvh] sm:flex sm:flex-col sm:overflow-hidden sm:p-0',
          'sm:rounded-3xl sm:border sm:shadow-xl',
          maxWidthClassName ?? 'sm:max-w-lg',

          // Mobile fullscreen
          'max-sm:inset-0 max-sm:left-0 max-sm:top-0 max-sm:h-[100dvh] max-sm:w-screen max-sm:max-w-none',
          'max-sm:translate-x-0 max-sm:translate-y-0 max-sm:rounded-none max-sm:border-0 max-sm:p-0',

          'flex flex-col overflow-hidden bg-background',
          className,
        )}
      >
        <VisuallyHidden>
          <DialogTitle>{title}</DialogTitle>
        </VisuallyHidden>

        {/* HEADER */}
        <div className="bg-background/95 backdrop-blur sm:border-b sm:border-border/60">
          <div className="pt-[env(safe-area-inset-top)]" />

          <div className="grid h-11 grid-cols-[1fr_auto_1fr] items-center px-4 sm:px-6">
            {/* Left */}
            <div className="justify-self-start">
              <DialogClose
                className={cn(
                  'max-sm:inline-flex sm:hidden',
                  'text-[15px] font-medium',
                  'text-muted-foreground hover:text-foreground',
                  '-ml-1 rounded-md px-1 py-1',
                )}
              >
                Close
              </DialogClose>

              {/* Desktop: steps on the left */}
              {right ? <div className="hidden sm:block ui-meta">{right}</div> : null}
            </div>

            {/* Center */}
            <div className="justify-self-center">
              <div className="text-[17px] font-semibold leading-tight">{title}</div>
            </div>

            {/* Right */}
            <div className="justify-self-end">
              {/* Mobile: steps on the right */}
              {right ? (
                <div className="max-sm:block sm:hidden text-[13px] text-muted-foreground">
                  {right}
                </div>
              ) : null}

              {/* Desktop: X */}
              <DialogClose
                className={cn(
                  'hidden sm:inline-flex',
                  'size-9 items-center justify-center rounded-full',
                  'opacity-70 hover:opacity-100',
                  'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
                )}
              >
                <XIcon className="size-5" />
                <span className="sr-only">Close</span>
              </DialogClose>
            </div>
          </div>

          {header ? <div className="px-4 pb-3 sm:px-6">{header}</div> : null}
        </div>

        {/* BODY */}
        <div
          className={cn(
            'min-h-0 flex-1 overflow-y-auto overscroll-contain ui-scroll',
            'px-4 py-4 sm:px-10 sm:py-8',
            'sm:bg-[var(--surface)]',
            'pb-[calc(16px+env(safe-area-inset-bottom))] sm:pb-8',
          )}
        >
          {children}
        </div>

        {/* FOOTER */}
        {footer ? (
          <div
            className={cn(
              'bg-background/90 backdrop-blur sm:border-t sm:border-border/60',
              'px-4 py-3 pb-[calc(12px+env(safe-area-inset-bottom))] sm:px-6 sm:py-4 sm:pb-4',
              'max-sm:sticky max-sm:bottom-0',
            )}
          >
            {footer}
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
