'use client';

import { useEffect, useRef } from 'react';

type NavigateWith = (patch: Record<string, null>) => void;

type Params = {
  queryKey: string;
  query: string;
  sourceCount: number;
  isLoading: boolean;
  isError: boolean;
  navigateWith: NavigateWith;
};

export function useClearStaleQuery({
  queryKey,
  query,
  sourceCount,
  isLoading,
  isError,
  navigateWith,
}: Params) {
  const lastClearedQuery = useRef<string | null>(null);

  useEffect(() => {
    const normalizedQuery = query.trim();
    const shouldClear = !isLoading && !isError && sourceCount === 0 && normalizedQuery.length > 0;

    if (!shouldClear) {
      if (!normalizedQuery || sourceCount > 0) lastClearedQuery.current = null;
      return;
    }

    if (lastClearedQuery.current === normalizedQuery) return;

    lastClearedQuery.current = normalizedQuery;
    navigateWith({ [queryKey]: null });
  }, [isError, isLoading, navigateWith, query, queryKey, sourceCount]);
}
