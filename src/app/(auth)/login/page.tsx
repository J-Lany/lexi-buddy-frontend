import SignInForm from '@/features/auth/ui/sign-in/sign-in-form';

export default function LoginPage() {
  return (
    <div className="ui-auth-shell back-gradient">
      <div className="ui-auth-scroll">
        <div className="ui-auth-center">
          <SignInForm />
        </div>
      </div>
    </div>
  );
}
