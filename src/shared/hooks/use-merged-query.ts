'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

type QueryValue = string | number | boolean | null | undefined;

type Update = Record<string, QueryValue> | ((prev: URLSearchParams) => Record<string, QueryValue>);

type Options = {
  /** replace (по умолчанию) не плодит history entries */
  mode?: 'replace' | 'push';
  /** по умолчанию false — приятнее для тулбара/фильтров */
  scroll?: boolean;
  /** если true — параметр удалится при пустой строке */
  dropEmptyString?: boolean;
};

function applyPatch(
  base: URLSearchParams,
  patch: Record<string, QueryValue>,
  dropEmptyString: boolean,
) {
  const next = new URLSearchParams(base.toString());

  for (const [key, value] of Object.entries(patch)) {
    if (value === null || value === undefined) {
      next.delete(key);
      continue;
    }

    const str = String(value);

    if (dropEmptyString && str === '') {
      next.delete(key);
      continue;
    }

    next.set(key, str);
  }

  return next;
}

export function useMergedQuery() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const get = useCallback((key: string) => searchParams.get(key) as string, [searchParams]);

  const getOr = useCallback(
    (key: string, fallback: string) => (searchParams.get(key) as string) ?? fallback,
    [searchParams],
  );

  const hrefWith = useCallback(
    (patch: Update, opts?: Omit<Options, 'mode'>) => {
      const dropEmptyString = opts?.dropEmptyString ?? true;
      const obj = typeof patch === 'function' ? patch(searchParams) : patch;

      const merged = applyPatch(searchParams, obj, dropEmptyString);
      const qs = merged.toString();
      return qs ? `${pathname}?${qs}` : pathname;
    },
    [pathname, searchParams],
  );

  const navigateWith = useCallback(
    (patch: Update, opts?: Options) => {
      const mode = opts?.mode ?? 'replace';
      const scroll = opts?.scroll ?? false;
      const dropEmptyString = opts?.dropEmptyString ?? true;

      const obj = typeof patch === 'function' ? patch(searchParams) : patch;
      const merged = applyPatch(searchParams, obj, dropEmptyString);
      const qs = merged.toString();
      const url = qs ? `${pathname}?${qs}` : pathname;

      if (mode === 'push') router.push(url, { scroll });
      else router.replace(url, { scroll });
    },
    [pathname, router, searchParams],
  );

  return {
    pathname,
    searchParams,

    // чтение
    get,
    getOr,

    // построение ссылок и навигация
    hrefWith, // для <Link href={...}/>
    navigateWith, // для onChange / фильтров
  };
}
