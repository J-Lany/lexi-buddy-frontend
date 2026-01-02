import React from 'react';

export function EmptyStateCard({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="ui-card ui-radius-card px-6 py-8 text-center max-w-[560px] mx-auto">
      <div className="ui-title">{title}</div>

      {description && <div className="mt-1 ui-meta max-w-[46ch] mx-auto">{description}</div>}

      {action && <div className="mt-5 flex justify-center">{action}</div>}
    </div>
  );
}
