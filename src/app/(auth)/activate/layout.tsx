import type { ReactNode } from 'react';

export default function ActivateLayout({ children }: { children: ReactNode }) {
  return (
    <main className="flex items-center justify-center bg-gradient-to-br from-background via-background  px-4 py-10">
      <div className="w-full max-w-md">{children}</div>
    </main>
  );
}
