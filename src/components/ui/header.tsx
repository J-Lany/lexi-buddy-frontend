'use client';

import { useLogoutMutation } from '@/features/auth/hooks/use-logout';
import { EAppRoutes } from '@/lib/routes';
import Link from 'next/link';
import { LogOut } from 'lucide-react';

export function Header() {
  const { mutate: logout } = useLogoutMutation();

  return (
    <header className="flex justify-between py-4 px-8 border-b">
      <div className="flex items-center gap-2 ">
        <img src="../icon.png" className="w-6 sm:w-10" alt="lexi buddy" />
        <Link href={EAppRoutes.STUDENTS} className="text-xl sm:text-3xl font-extrabold">
          Lexi buddy
        </Link>
      </div>
      <div className="flex items-center gap-2 text-primary cursor-pointer" onClick={() => logout()}>
        <LogOut />
        <button className="hidden sm:block">Log out</button>
      </div>
    </header>
  );
}
