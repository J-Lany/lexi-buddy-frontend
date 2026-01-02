'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';

function canGoBack() {
  if (typeof window === 'undefined') return false;
  return window.history.length > 1;
}

export function NavBack({ href, label }: { href: string; label: string }) {
  const router = useRouter();

  const onClick = React.useCallback(() => {
    if (canGoBack()) router.back();
    else router.push(href);
  }, [router, href]);

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
