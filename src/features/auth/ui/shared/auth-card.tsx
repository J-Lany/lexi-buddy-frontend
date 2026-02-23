import React from 'react';

import { Card } from '@/shared/ui/card';

type Props = {
  title: string;
  subtitle: string;
  children: React.ReactNode;
};
export const AuthCard = ({ children, title, subtitle }: Props) => (
  <Card className="w-full p-0 md:ui-auth-sheet md:p-10 border-0 shadow-none bg-transparent">
    <div className="flex w-full flex-col gap-6 px-1">
      <header className="space-y-2 text-center">
        <h1 className="text-[28px] leading-tight font-semibold tracking-tight">{title}</h1>
        <p className="text-[15px] leading-snug text-muted-foreground">{subtitle}</p>
      </header>
    </div>
    {children}
  </Card>
);
