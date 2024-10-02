import RegistrationForm from "@/app/features/auth/RegistrationForm";
import AuthRedirect from "@/app/features/auth/AuthRedirect";

export default function Page() {
  return (
    <>
      <h2 className="mb-6 text-center text-2xl font-extrabold">Registration</h2>
      <RegistrationForm/>
      <AuthRedirect href="/auth/login" text="Already have an account?" linkText="Sign in here"/>
    </>
  );
}