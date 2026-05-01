import SignUpForm from '@/features/auth/ui/sign-up/sign-up-form';

export default function RegisterPage() {
  return (
    <div className="ui-auth-shell back-gradient">
      <div className="ui-auth-scroll">
        <div className="ui-auth-center">
          <SignUpForm />
        </div>
      </div>
    </div>
  );
}
