import type { Metadata } from 'next';
import { Sidebar } from '@/components/ui/sidebar';
import { Header } from '@/components/ui/header';

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
      <Header />
      <div className="flex gap-4">
        <aside className="border-r">
          <Sidebar />
        </aside>
        <main className="p-6 back-gradient w-full h-screen pr-48 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
