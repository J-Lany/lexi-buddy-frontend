'use client';

import { usePathname } from 'next/navigation';
import { LuBookOpen } from 'react-icons/lu';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLogin = pathname.includes('login');

  return (
    <main className="grid min-h-screen grid-cols-1 md:grid-cols-2 bg-background">
      {/* Left panel */}
      <div className="hidden md:flex flex-col items-center justify-center bg-muted p-10 text-center">
        <div className="max-w-md space-y-6">
          <LuBookOpen className="mx-auto h-24 w-24" />
          <div>
            <h1 className="text-3xl font-semibold mb-3 text-foreground">
              {isLogin ? 'Welcome back, teacher!' : 'Join the LexiBuddy platform'}
            </h1>
            <p className="text-muted-foreground leading-relaxed">
              {isLogin
                ? 'Access your teaching dashboard, manage lessons, and track student progress — all in one place.'
                : 'Create and manage interactive lessons, assignments, and monitor your students’ learning in real time.'}
            </p>
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm">{children}</div>
      </div>
    </main>
  );
}
