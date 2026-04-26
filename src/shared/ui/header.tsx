'use client';

import { LogOut } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { useLogoutMutation } from '@/features/auth/model/use-logout';
import { routes } from '@/shared/router/routes';

export function Header() {
  const { mutate: logout } = useLogoutMutation();

  return (
    <header className="h-full flex items-center justify-between ui-content-pad">
      <Link href={routes.main} className="nav-logo flex items-center gap-2">
        <Image src="/icon.webp" alt="Lexi Buddy" width={38} height={38} priority unoptimized />

        <div className="ui-brand">Lexi buddy</div>
      </Link>

      <button onClick={() => logout()} className="ui-topbar-action group">
        <span className="hidden sm:block text-sm font-medium">Log out</span>
        <LogOut className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity" />
      </button>
    </header>
  );
}
