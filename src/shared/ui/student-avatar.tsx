'use client';

import { User } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

import { cn } from '@/shared/lib/cn';

function getInitialsFromUsername(username?: string | null) {
  if (!username) return null;
  const clean = username.trim();
  if (!clean) return null;
  return clean.slice(0, 2).toUpperCase();
}

type Props = {
  username: string | null;
  avatarUrl: string | null;
  size?: number;
};

export function StudentAvatar({ username, avatarUrl, size = 36 }: Props) {
  const [failed, setFailed] = React.useState(false);

  const initials = getInitialsFromUsername(username);
  const showImg = Boolean(avatarUrl) && !failed;

  return (
    <div
      className={cn('relative shrink-0 overflow-hidden rounded-full bg-primary')}
      style={{ width: size, height: size }}
    >
      {showImg ? (
        <Image
          src={avatarUrl as string}
          alt={username ? `@${username}` : 'Student avatar'}
          fill
          sizes={`${size}px`}
          className="object-cover"
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={() => setFailed(true)}
        />
      ) : (
        <div className="grid h-full w-full place-items-center bg-ring">
          {initials ? (
            <span className="text-[13px] font-semibold text-white">{initials}</span>
          ) : (
            <User className="h-4 w-4 text-primary" />
          )}
          <span className="sr-only">No avatar</span>
        </div>
      )}
    </div>
  );
}
