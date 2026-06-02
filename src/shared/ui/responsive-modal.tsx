'use client';

import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { XIcon } from 'lucide-react';
import * as React from 'react';

import { cn } from '@/shared/lib/cn';
import { Dialog, DialogClose, DialogContent, DialogTitle, DialogTrigger } from '@/shared/ui/dialog';

type ResponsiveModalProps = {
  trigger: React.ReactNode;
  children: React.ReactNode;

  title: string;
  header?: React.ReactNode;
  headerLeft?: React.ReactNode;
  right?: React.ReactNode;
  footer?: React.ReactNode;
  hideFooterOnMobile?: boolean;
  mobileCloseLabel?: string;

  maxWidthClassName?: string;
  className?: string;
  bodyClassName?: string;
  scrollKey?: React.Key;

  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export function ResponsiveModal({
  trigger,
  title,
  header,
  headerLeft,
  right,
  children,
  footer,
  hideFooterOnMobile,
  mobileCloseLabel,
  maxWidthClassName,
  className,
  bodyClassName,
  scrollKey,
  open,
  onOpenChange,
}: ResponsiveModalProps) {
  const isControlled = typeof open === 'boolean';

  return (
    <Dialog {...(isControlled ? { open, onOpenChange } : {})}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent
        onOpenAutoFocus={(e) => {
          // Mobile: prevent keyboard popup over form
          // Desktop: allow native focus on first input
          if (typeof window !== 'undefined' && !window.matchMedia('(min-width: 640px)').matches) {
            e.preventDefault();
          }
        }}
        showCloseButton={false}
        className={cn(
          // Desktop modal (macOS-like sheet)
          'sm:max-h-[90dvh] sm:flex sm:flex-col sm:overflow-hidden sm:p-0',
          'sm:rounded-3xl sm:border sm:shadow-xl',
          maxWidthClassName ?? 'sm:max-w-lg',

          // Mobile fullscreen
          'max-sm:inset-0 max-sm:left-0 max-sm:top-0 max-sm:h-dvh',
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
          <div className="pt-[env(safe-area-inset-top)]" />

          {/* Desktop header when headerLeft is provided — flex layout так subtitle не сжимается */}
          {headerLeft && (
            <div className="hidden sm:flex sm:items-start sm:justify-between sm:gap-4 sm:px-5 sm:pt-6 sm:pb-3">
              <div className="min-w-0 flex-1">{headerLeft}</div>
              <DialogClose
                className={cn(
                  'flex size-9 shrink-0 items-center justify-center rounded-full',
                  'text-muted-foreground transition-colors hover:bg-accent hover:text-foreground',
                )}
              >
                <XIcon className="size-5" />
                <span className="sr-only">Close</span>
              </DialogClose>
            </div>
          )}

          {/* Standard 3-col grid — mobile always, desktop only without headerLeft */}
          <div
            className={cn(
              'grid grid-cols-[1fr_auto_1fr] items-center px-4 py-4 sm:px-6',
              headerLeft && 'sm:hidden',
            )}
          >
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
                {mobileCloseLabel ?? 'Close'}
              </DialogClose>

              {/* Desktop: right (steps) on the left — headerLeft handled in its own flex row above */}
              {!headerLeft && right ? <div className="hidden sm:block ui-meta">{right}</div> : null}
            </div>

            {/* Center — hidden on desktop when headerLeft, hidden on mobile too when headerLeft */}
            <div className="justify-self-center">
              <div
                className={cn('text-[17px] font-semibold leading-tight', headerLeft && 'hidden')}
              >
                {title}
              </div>
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
                )}
              >
                <XIcon className="size-5" />
                <span className="sr-only">Close</span>
              </DialogClose>
            </div>
          </div>

          {/* Thin divider — always on mobile; on desktop only when headerLeft is used */}
          <div className={cn('h-px bg-border/40', !headerLeft && 'sm:hidden')} />

          {header ? <div className="px-4 pb-3 sm:px-6">{header}</div> : null}
        </div>

        {/* BODY */}
        <div
          key={scrollKey}
          className={cn(
            'min-h-0 flex-1 overflow-y-auto overscroll-contain ui-scroll',
            'px-4 py-2 sm:px-6 sm:pt-2 sm:pb-6',
            'sm:bg-(--surface)',
            bodyClassName,
          )}
        >
          {children}
        </div>

        {/* FOOTER */}
        {footer ? (
          <div
            className={cn(
              'bg-background/90 backdrop-blur',
              'px-4 py-3 pb-[calc(12px+env(safe-area-inset-bottom))] sm:px-6 sm:py-4',
              'max-sm:sticky max-sm:bottom-0',
              hideFooterOnMobile && 'max-sm:hidden',
            )}
          >
            {footer}
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
