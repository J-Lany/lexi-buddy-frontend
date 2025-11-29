import React from 'react';
import { Card } from '@/components/ui/card';
import LoginFormContent from '@/features/auth/login-form-content';

export function SigninForm(props: React.ComponentProps<typeof Card>) {
  return (
    <div className="w-full max-w-sm">
      <Card
        {...props}
        className="hidden md:block border-none rounded-2xl inset-shadow-2xs inset-shadow-sidebar-accent bg-white/95 backdrop-blur p-8"
      >
        <LoginFormContent />
      </Card>
      <div className="md:hidden">
        <LoginFormContent />
      </div>
    </div>
  );
}
