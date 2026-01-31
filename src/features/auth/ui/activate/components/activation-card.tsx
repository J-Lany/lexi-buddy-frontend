import React from 'react';

type Props = {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  children?: React.ReactNode;
};

export const ActivationCard = ({ title, icon, subtitle, children }: Props) => (
  <div className="space-y-4" aria-live="polite">
    {icon}
    <h1 className="text-[22px] leading-tight font-semibold tracking-tight">{title}</h1>
    <p className="text-[13px] leading-snug text-muted-foreground">{subtitle}</p>
    {children}
  </div>
);
