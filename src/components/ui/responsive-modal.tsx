'use client';

import * as React from 'react';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';

function useMediaQuery(query: string) {
  const [matches, setMatches] = React.useState(false);

  React.useEffect(() => {
    const m = window.matchMedia(query);
    const onChange = () => setMatches(m.matches);
    onChange();
    m.addEventListener?.('change', onChange);
    return () => m.removeEventListener?.('change', onChange);
  }, [query]);

  return matches;
}

type ResponsiveModalProps = {
  trigger: React.ReactNode;
  children: React.ReactNode;

  title?: string;
  subtitle?: string;
  header?: React.ReactNode;

  className?: string;
  desktopMaxWidthClassName?: string;

  open?: boolean;
  onOpenChange?: (open: boolean) => void;

  // mobile
  mobileHeightClassName?: string;
  mobileContentClassName?: string;
  mobileStickyFooter?: React.ReactNode;

  // desktop
  desktopFooter?: React.ReactNode;
  desktopContentClassName?: string;
  desktopFooterClassName?: string;
};

export function ResponsiveModal({
  trigger,
  title,
  subtitle,
  header,
  children,
  className,
  desktopMaxWidthClassName,
  open,
  onOpenChange,

  mobileHeightClassName,
  mobileContentClassName,
  mobileStickyFooter,

  desktopFooter,
  desktopContentClassName,
  desktopFooterClassName,
}: ResponsiveModalProps) {
  const isDesktop = useMediaQuery('(min-width: 640px)');
  const isControlled = typeof open === 'boolean';

  const DesktopHeader = header ? (
    <div>{header}</div>
  ) : title ? (
    <DialogHeader>
      <DialogTitle>{title}</DialogTitle>
      {subtitle ? <div className="ui-meta">{subtitle}</div> : null}
    </DialogHeader>
  ) : null;

  const MobileHeader = header ? (
    <div className="border-b px-4 pt-3 pb-3">{header}</div>
  ) : title ? (
    <DrawerHeader className="border-b">
      <DrawerTitle className="text-[17px] font-semibold leading-tight">{title}</DrawerTitle>
      {subtitle ? <div className="ui-meta mt-1">{subtitle}</div> : null}
    </DrawerHeader>
  ) : (
    <DrawerHeader className="border-b">
      <div className="mx-auto mb-1 h-1.5 w-10 rounded-full bg-muted" />
    </DrawerHeader>
  );

  // ===================== DESKTOP (Dialog) =====================
  if (isDesktop) {
    return (
      <Dialog {...(isControlled ? { open, onOpenChange } : {})}>
        <DialogTrigger asChild>{trigger}</DialogTrigger>

        <DialogContent
          className={cn(
            desktopMaxWidthClassName,
            // ключевое: фиксируем высоту модалки и делаем внутренний layout скроллящимся
            'flex max-h-[90dvh] flex-col overflow-hidden',
            desktopFooter ? 'p-0' : '', // если есть футер — паддинги берём на себя
            className,
          )}
        >
          <VisuallyHidden>
            <DialogTitle>{title ?? 'Dialog'}</DialogTitle>
          </VisuallyHidden>

          {/* Header */}
          {DesktopHeader ? (
            <div className={cn(desktopFooter ? 'px-6 pt-6' : '')}>{DesktopHeader}</div>
          ) : null}

          {/* Content (scroll area) */}
          <div
            className={cn(
              desktopFooter ? 'px-6' : DesktopHeader ? 'mt-4' : '',
              desktopFooter ? 'py-4' : '',
              'min-h-0 flex-1 overflow-y-auto ui-scroll',
              desktopContentClassName,
            )}
          >
            {children}
          </div>

          {/* Footer */}
          {desktopFooter ? (
            <div
              className={cn(
                'border-t bg-background/80 backdrop-blur px-6 py-4',
                desktopFooterClassName,
              )}
            >
              {desktopFooter}
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    );
  }

  // ===================== MOBILE (Drawer) =====================
  return (
    <Drawer {...(isControlled ? { open, onOpenChange } : {})}>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>

      <DrawerContent
        className={cn(
          'rounded-t-[28px] pb-[env(safe-area-inset-bottom)]',
          mobileHeightClassName,
          mobileStickyFooter && 'flex flex-col',
          className,
        )}
      >
        <VisuallyHidden>
          <DrawerTitle>{title ?? 'Dialog'}</DrawerTitle>
        </VisuallyHidden>

        {MobileHeader}

        <div
          className={cn(
            'px-4 pt-4 pb-[calc(16px+env(safe-area-inset-bottom))]',
            mobileStickyFooter
              ? 'flex-1 min-h-0 overflow-y-auto overscroll-contain ui-scroll'
              : 'overflow-y-auto overscroll-contain ui-scroll',
            mobileContentClassName,
          )}
        >
          {children}
        </div>

        {mobileStickyFooter ? (
          <div className="border-t bg-background/90 backdrop-blur px-4 py-3 pb-[calc(12px+env(safe-area-inset-bottom))]">
            {mobileStickyFooter}
          </div>
        ) : null}

        <DrawerClose className="sr-only">Close</DrawerClose>
      </DrawerContent>
    </Drawer>
  );
}
