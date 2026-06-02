'use client';

import Image from 'next/image';
import * as React from 'react';

type Size = 'sm' | 'md' | 'lg';

const SIZE_CLASS: Record<Size, string> = {
  sm: 'h-8 w-8 text-[12px]',
  md: 'h-10 w-10 text-[14px]',
  lg: 'h-12 w-12 text-[16px]',
};

const SIZE_PX: Record<Size, number> = { sm: 32, md: 40, lg: 48 };

type Props = {
  name: string;
  avatarUrl?: string | null;
  size?: Size;
};

export function NameAvatar({ name, avatarUrl, size = 'md' }: Props) {
  const [failed, setFailed] = React.useState(false);
  const showImg = Boolean(avatarUrl) && !failed;
  const letter = (name?.[0] ?? '?').toUpperCase();
  const px = SIZE_PX[size];

  return (
    <div className={`relative shrink-0 overflow-hidden rounded-full ${SIZE_CLASS[size]}`}>
      {showImg ? (
        <Image
          src={avatarUrl as string}
          alt={name}
          fill
          sizes={`${px}px`}
          className="object-cover"
          onError={() => setFailed(true)}
          referrerPolicy="no-referrer"
          unoptimized
        />
      ) : (
        <div
          className="grid h-full w-full place-items-center font-semibold text-white"
          style={{
            background:
              'linear-gradient(135deg, var(--primary), color-mix(in oklch, var(--primary) 60%, white 40%))',
          }}
        >
          {letter}
        </div>
      )}
    </div>
  );
}
