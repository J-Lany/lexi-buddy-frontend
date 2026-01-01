import type { Metadata } from 'next';
import { Sidebar } from '@/components/ui/sidebar';
import { Header } from '@/components/ui/header';
import { MobileFooter } from '@/components/ui/mobile-footer';

export const metadata: Metadata = {
  title: 'Lexi room',
  description: 'Generated lessons',
};

export default async function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-dvh flex-col overflow-hidden">
      <Header />
      <div className="flex flex-1 min-h-0 overflow-hidden">
        <aside className="border-r hidden sm:block">
          <Sidebar />
        </aside>
        <main className="p-6 min-h-0 back-gradient flex-1 overflow-y-auto">{children}</main>
      </div>
      <MobileFooter />
    </div>
  );
}
