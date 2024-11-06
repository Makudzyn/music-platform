import LoginForm from '@/app/features/auth/LoginForm';
import AuthRedirect from '@/app/features/auth/AuthRedirect';

export default function Page() {
  return (
    <>
      <h2 className="mb-6 text-center text-2xl font-extrabold">Login</h2>
      <LoginForm />
      <AuthRedirect
        href="/auth/registration"
        text="Don't have an account?"
        linkText="Sign up here"
      />
    </>
  );
}
