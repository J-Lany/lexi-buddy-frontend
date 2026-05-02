import React from 'react';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="ui-auth-shell back-gradient">
      <div className="ui-auth-scroll">
        <div className="ui-auth-center">{children}</div>
      </div>
    </div>
  );
}
