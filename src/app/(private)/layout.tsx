import React from 'react';

import { Header } from '@/shared/ui/header';
import { MobileFooter } from '@/shared/ui/mobile-footer';
import { Sidebar } from '@/shared/ui/sidebar';

export default function PrivateLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-dvh flex-col">
      <div className="sticky top-0 z-50 ui-topbar ui-topbar-surface max-sm:backdrop-blur-xl max-sm:bg-background/80">
        <Header />
      </div>

      <div className="flex flex-1 min-h-0">
        <aside className="hidden md:block ui-sidebar ui-sidebar-surface">
          <Sidebar />
        </aside>

        <main className="flex-1 min-h-0 overflow-y-auto back-gradient ui-scroll">
          <div className="ui-content ui-content-pad py-6 sm:py-8 ui-safe-bottom">
            <div className="ui-content-inner">{children}</div>
          </div>
        </main>
      </div>

      <MobileFooter />
    </div>
  );
}
