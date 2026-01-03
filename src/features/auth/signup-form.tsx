import React from 'react';
import { Card } from '@/components/ui/card';
import FormContent from '@/features/auth/form-content';

export function SignupForm() {
  return (
    <Card className="w-full p-0 md:ui-auth-sheet md:p-10 border-0 shadow-none bg-transparent">
      <FormContent />
    </Card>
  );
}
