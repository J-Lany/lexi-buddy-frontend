'use client';

import { Button } from '@/shared/ui/button';

export default function PrivateError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 p-8 text-center">
      <div className="ui-card-static ui-radius-card p-8 max-w-sm w-full space-y-3">
        <p className="ui-title">Something went wrong</p>
        <p className="ui-meta">
          An unexpected error occurred. Please try again or refresh the page.
        </p>
        <Button onClick={reset} className="mt-2">
          Try again
        </Button>
      </div>
    </div>
  );
}
