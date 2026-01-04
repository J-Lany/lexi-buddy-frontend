import React from 'react';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="ui-auth-shell">
      <div className="ui-auth-scroll">{children}</div>
    </div>
  );
}
