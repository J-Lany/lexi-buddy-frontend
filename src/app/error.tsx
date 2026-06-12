'use client';

import { Button } from '@/shared/ui/button';

export default function RootError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-6 p-8 text-center">
      <div className="space-y-2">
        <p className="ui-card-title">Something went wrong</p>
        <p className="ui-meta">An unexpected error occurred. Please try again.</p>
      </div>
      <Button onClick={reset}>Try again</Button>
    </div>
  );
}
