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
    <h1 className="ui-card-title">{title}</h1>
    <p className="ui-meta text-center">{subtitle}</p>
    {children}
  </div>
);
