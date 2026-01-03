'use client';

import Link from 'next/link';
import { useLogoutMutation } from '@/features/auth/hooks/use-logout';
import { EAppRoutes } from '@/lib/routes';
import { LogOut } from 'lucide-react';

export function Header() {
  const { mutate: logout } = useLogoutMutation();

  return (
    <header className="h-full flex items-center justify-between ui-content-pad">
      <div className="flex items-center gap-3">
        <img src="../icon.png" alt="Lexi buddy" className="w-8 h-8 sm:w-9 sm:h-9 rounded-full" />
        <Link href={EAppRoutes.STUDENTS} className="ui-brand">
          Lexi buddy
        </Link>
      </div>

      <button onClick={() => logout()} className="ui-topbar-action group">
        <span className="hidden sm:block text-sm font-medium">Log out</span>
        <LogOut className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity" />
      </button>
    </header>
  );
}
