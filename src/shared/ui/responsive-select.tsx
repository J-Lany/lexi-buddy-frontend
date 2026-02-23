'use client';

import { ChevronDown } from 'lucide-react';
import * as React from 'react';

import { cn } from '@/shared/lib/cn';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/shared/ui/drawer';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select';

function useIsCoarsePointer() {
  const [isCoarse, setIsCoarse] = React.useState(false);

  React.useEffect(() => {
    const mq = window.matchMedia('(hover: none) and (pointer: coarse)');
    const update = () => setIsCoarse(mq.matches);
    update();
    mq.addEventListener?.('change', update);
    return () => mq.removeEventListener?.('change', update);
  }, []);

  return isCoarse;
}

type Option<T extends string> = { value: T; label: string };

type Props<T extends string> = {
  value: T | '';
  onValueChange: (v: T) => void;
  placeholder: string;
  title?: string;
  options: readonly Option<T>[];
  triggerClassName?: string;
};

export function ResponsiveSelect<T extends string>({
  value,
  onValueChange,
  placeholder,
  title = 'Choose',
  options,
  triggerClassName,
}: Props<T>) {
  const isMobile = useIsCoarsePointer();
  const selectedLabel = options.find((o) => o.value === value)?.label;

  const optionByValue = React.useMemo(() => {
    const map = new Map<string, T>();
    for (const o of options) map.set(o.value, o.value);
    return map;
  }, [options]);

  const handleValueChange = (v: string) => {
    const typed = optionByValue.get(v);
    if (typed) onValueChange(typed);
  };

  if (!isMobile) {
    return (
      <Select value={value} onValueChange={handleValueChange}>
        <SelectTrigger className={triggerClassName}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((o) => (
            <SelectItem key={o.value} value={o.value}>
              {o.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <button
          type="button"
          className={cn(
            'flex w-full items-center gap-2 h-11 rounded-xl px-3 bg-background border border-border/60 text-[15px] outline-none',
            'focus-visible:border-[var(--focus-border)] focus-visible:shadow-[var(--focus-halo)]',
            triggerClassName,
          )}
        >
          <span className={cn('flex-1 text-left min-w-0', !value && 'text-muted-foreground')}>
            {selectedLabel ?? placeholder}
          </span>
          <ChevronDown className="ml-auto size-4 opacity-50 shrink-0" aria-hidden="true" />
        </button>
      </DrawerTrigger>

      <DrawerContent className="px-4 pb-4">
        <DrawerHeader className="px-0">
          <DrawerTitle className="text-center">{title}</DrawerTitle>
        </DrawerHeader>

        <div className="mt-2 grid gap-2">
          {options.map((o) => {
            const active = o.value === value;
            return (
              <DrawerClose asChild key={o.value}>
                <button
                  type="button"
                  onClick={() => onValueChange(o.value)}
                  className={cn(
                    'h-12 rounded-xl border px-4 text-left',
                    active ? 'bg-muted/40 border-border' : 'bg-background border-border/60',
                  )}
                >
                  {o.label}
                </button>
              </DrawerClose>
            );
          })}
        </div>

        <div className="mt-3">
          <DrawerClose asChild>
            <button
              type="button"
              className="h-11 w-full rounded-xl border border-border/60 bg-background"
            >
              Cancel
            </button>
          </DrawerClose>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
