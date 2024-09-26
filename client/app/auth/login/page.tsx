import CookieLogo from "@/app/features/logo/CookieLogo";
import LoginForm from "@/app/features/auth/LoginForm";

export default function Page() {
  return (
    <div className="flex h-full flex-col items-center justify-center px-4 py-12 bg-background sm:px-6 lg:px-8">
      <div className="mb-4 flex w-48 items-center justify-center md:w-56">
        <CookieLogo/>
      </div>
      <div className="w-full max-w-md rounded-lg p-8 shadow-md bg-accent-foreground">
        <h2 className="mb-6 text-center text-2xl font-extrabold">Login</h2>
        <LoginForm/>
      </div>
    </div>
  );
};