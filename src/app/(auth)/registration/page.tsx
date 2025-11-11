import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AuthForm } from '@/components/auth/auth-form';
import { EAuthFormType } from '@/lib/constants/auth';

export default function RegistrationPage() {
  return (
    <Card className="border-border/50 shadow-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
        <CardDescription>Enter your email below to create your account</CardDescription>
      </CardHeader>

      <CardContent className="grid gap-4">
        <AuthForm type={EAuthFormType.REGISTER} />
      </CardContent>
    </Card>
  );
}
