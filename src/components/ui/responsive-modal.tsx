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

  /** Optional второй ряд под navbar (например мелкий текст/подсказка) */
  header?: React.ReactNode;

  /** Right slot в navbar (на мобилке): например "1 / 2" */
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
        onOpenAutoFocus={(e) => {
          e.preventDefault();
        }}
        showCloseButton={false}
        className={cn(
          // Desktop modal
          'sm:max-h-[90dvh] sm:flex sm:flex-col sm:overflow-hidden sm:rounded-lg sm:p-0',
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
        <div className="bg-background/95 backdrop-blur">
          {/* safe-area */}
          <div className="pt-[env(safe-area-inset-top)]" />

          {/* NAV BAR ROW */}
          <div className="grid h-11 grid-cols-[1fr_auto_1fr] items-center px-4 sm:px-6">
            {/* Left: Close (mobile) */}
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
            </div>

            {/* Center: Title */}
            <div className="justify-self-center">
              <div className="text-[17px] font-semibold leading-tight">{title}</div>
            </div>

            {/* Right */}
            <div className="justify-self-end">
              {/* Mobile: right slot (например 1/2) */}
              {right ? (
                <div className="max-sm:block sm:hidden text-[13px] text-muted-foreground">
                  {right}
                </div>
              ) : null}

              {/* Desktop: X button */}
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

          {/* Optional второй ряд под navbar */}
          {header ? <div className="px-4 pb-3 sm:px-6">{header}</div> : null}
        </div>

        {/* BODY (scroll) */}
        <div
          className={cn(
            'min-h-0 flex-1 overflow-y-auto overscroll-contain ui-scroll',
            'px-4 py-4 sm:px-6 sm:py-4',
            'pb-[calc(16px+env(safe-area-inset-bottom))] sm:pb-4',
          )}
        >
          {children}
        </div>

        {/* FOOTER (sticky bottom on mobile) */}
        {footer ? (
          <div
            className={cn(
              'bg-background/90 backdrop-blur',
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
