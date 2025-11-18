import { Card } from '@/components/ui/card';

import React from 'react';
import FormContent from '@/features/auth/form-content';
export function SignupForm(props: React.ComponentProps<typeof Card>) {
  return (
    <div className="w-full max-w-sm">
      <Card
        {...props}
        className="hidden md:block border-none rounded-2xl inset-shadow-2xs inset-shadow-sidebar-accent bg-white/95 backdrop-blur p-8"
      >
        <FormContent />
      </Card>
      <div className="md:hidden">
        <FormContent />
      </div>
    </div>
  );
}
