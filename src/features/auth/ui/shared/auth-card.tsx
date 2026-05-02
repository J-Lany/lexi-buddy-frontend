import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { routes } from '@/shared/router/routes';
import { Card } from '@/shared/ui/card';

type Props = {
  title: string;
  subtitle: string;
  children: React.ReactNode;
};

export const AuthCard = ({ children, title, subtitle }: Props) => (
  <Card className="w-full p-0 md:ui-auth-sheet md:p-10 border-0 shadow-none bg-transparent">
    <div className="flex w-full flex-col gap-8 px-1">
      <div className="flex flex-col items-center gap-5">
        <Link href={routes.main} aria-label="Lexi Buddy home">
          <Image
            src="/icon.webp"
            alt="Lexi Buddy"
            width={64}
            height={64}
            priority
            className="select-none"
          />
        </Link>
        <header className="space-y-1.5 text-center">
          <h1 className="ui-page-title">{title}</h1>
          <p className="ui-meta">{subtitle}</p>
        </header>
      </div>
      {children}
    </div>
  </Card>
);
