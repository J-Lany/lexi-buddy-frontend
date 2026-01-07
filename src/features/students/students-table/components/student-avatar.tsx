import { cn } from '@/lib/utils';
import React from 'react';

function getInitialsFromUsername(username?: string | null) {
  if (!username) return null;
  const clean = username.trim();
  if (!clean) return null;
  return clean.slice(0, 2).toUpperCase();
}

export function StudentAvatar({
  username,
  avatarUrl,
  FallbackIcon,
  size = 36,
}: {
  username: string | null;
  avatarUrl: string | null;
  FallbackIcon: React.ComponentType<{ className?: string }>;
  size?: number;
}) {
  const [failed, setFailed] = React.useState(false);
  const initials = getInitialsFromUsername(username);
  const showImg = !!avatarUrl && !failed;

  return (
    <div
      className={cn('shrink-0 overflow-hidden rounded-full', 'bg-primary')}
      style={{ width: size, height: size }}
    >
      {showImg ? (
        <img
          src={avatarUrl!}
          alt={username ? `@${username}` : 'Student avatar'}
          className="h-full w-full object-cover"
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={() => setFailed(true)}
        />
      ) : (
        <div className="grid h-full w-full place-items-center bg-ring">
          {initials ? (
            <span className="text-[13px] font-semibold text-white">{initials}</span>
          ) : (
            <FallbackIcon className="h-4 w-4 text-primary" />
          )}
          <span className="sr-only">No avatar</span>
        </div>
      )}
    </div>
  );
}
