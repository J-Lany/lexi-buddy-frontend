import { Card } from '@/components/ui/card';
import LoginFormContent from '@/features/auth/login-form-content';

export function SigninForm() {
  return (
    <Card className="w-full p-0 md:ui-auth-sheet md:p-10 border-0 shadow-none bg-transparent">
      <LoginFormContent />
    </Card>
  );
}
