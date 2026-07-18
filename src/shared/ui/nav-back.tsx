'use client';

import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import * as React from 'react';

import { useMergedQuery } from '@/shared/hooks/use-merged-query';

function canGoBack() {
  if (typeof window === 'undefined') return false;
  return window.history.length > 1;
}

type Props = {
  href: string;
  label: string;
  preserveQuery?: boolean;
};

export function NavBack({ href, label, preserveQuery = true }: Props) {
  const router = useRouter();
  const { searchParams } = useMergedQuery();

  const finalHref = React.useMemo(() => {
    if (!preserveQuery) return href;

    const qs = searchParams.toString();
    if (!qs) return href;

    return `${href}?${qs}`;
  }, [href, preserveQuery, searchParams]);

  const onClick = React.useCallback(() => {
    if (canGoBack()) {
      router.back();
    } else {
      router.push(finalHref);
    }
  }, [router, finalHref]);

  return (
    <button
      type="button"
      onClick={onClick}
      className="
        inline-flex items-center gap-1.5
        rounded-full px-2.5 py-2
        text-sm font-medium
        text-muted-foreground
        hover:text-foreground
        transition-colors
        ui-focus
      "
      aria-label={`Back to ${label}`}
    >
      <ChevronLeft className="h-4 w-4 shrink-0" strokeWidth={2.25} aria-hidden />
      <span className="leading-none">{label}</span>
    </button>
  );
}
