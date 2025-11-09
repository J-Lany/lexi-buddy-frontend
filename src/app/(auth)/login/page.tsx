import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AuthForm } from '@/components/auth/auth-form';
import { EAuthFormType } from '@/lib/constants/auth';

export default function LoginPage() {
  return (
    <Card className="border-border/50 shadow-md">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Login to your account</CardTitle>
        <CardDescription>Enter your email below to login to your account</CardDescription>
      </CardHeader>
      <CardContent>
        <AuthForm type={EAuthFormType.LOGIN} />
      </CardContent>
    </Card>
  );
}
