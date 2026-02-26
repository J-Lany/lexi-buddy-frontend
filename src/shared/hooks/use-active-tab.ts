import { useEffect, useState } from 'react';

export function useActiveTab<T extends string | number>(keys: readonly T[]) {
  const [active, setActive] = useState<T | null>(keys[0] ?? null);

  useEffect(() => {
    if (keys.length === 0) {
      if (active !== null) setActive(null);
      return;
    }

    if (active === null || !keys.includes(active)) {
      setActive(keys[0]);
    }
  }, [keys, active]);

  return { active, setActive };
}
