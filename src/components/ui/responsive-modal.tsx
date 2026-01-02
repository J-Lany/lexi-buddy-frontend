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
      <div className="mx-auto mb-1 h-1.5 w-10 rounded-full bg-[color-mix(in_oklch,var(--foreground)_12%,white_88%)]" />
    </DrawerHeader>
  );

  if (isDesktop) {
    return (
      <Dialog {...(isControlled ? { open, onOpenChange } : {})}>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent className={cn(desktopMaxWidthClassName, className)}>
          <VisuallyHidden>
            <DrawerTitle>{title ?? 'Dialog'}</DrawerTitle>
          </VisuallyHidden>
          {DesktopHeader}
          <div className={cn(DesktopHeader ? 'mt-4' : '')}>{children}</div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer {...(isControlled ? { open, onOpenChange } : {})}>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>

      <DrawerContent className={cn('rounded-t-[28px]', className)}>
        <VisuallyHidden>
          <DrawerTitle>{title ?? 'Dialog'}</DrawerTitle>
        </VisuallyHidden>
        {MobileHeader}

        <div className="px-4 pt-4 pb-[calc(16px+env(safe-area-inset-bottom))] max-h-[78dvh] overflow-y-auto">
          {children}
        </div>

        <DrawerClose className="sr-only">Close</DrawerClose>
      </DrawerContent>
    </Drawer>
  );
}
