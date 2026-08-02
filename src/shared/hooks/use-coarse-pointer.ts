'use client';

import * as React from 'react';

export function useIsCoarsePointer() {
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
