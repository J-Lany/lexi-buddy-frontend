import type { Metadata } from 'next';
import Link from 'next/link';
import { LogOut } from 'lucide-react';
import { EAppRoutes } from '@/lib/routes';
import { Sidebar } from '@/components/ui/sidebar';

export const metadata: Metadata = {
  title: 'Private room',
  description: 'Generated lessons',
};

export default async function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen min-w-screen flex-col overflow-hidden fixed">
      <header className="flex justify-between py-4 px-8 border-b">
        <div className="flex items-center gap-2 ">
          <img src="../icon.png" className="w-10" />
          <Link href={EAppRoutes.STUDENTS} className="text-3xl font-extrabold">
            Lexi buddy
          </Link>
        </div>
        <div className="flex items-center gap-2 text-primary">
          <LogOut />
          <button className="">Log out</button>
        </div>
      </header>
      <div className="flex gap-4">
        <aside className="border-r">
          <Sidebar />
        </aside>
        <main className="p-6 back-gradient w-full h-screen pr-48 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
