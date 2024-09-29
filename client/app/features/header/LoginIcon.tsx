'use client';

import { LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function LoginIcon() {
  const router = useRouter();
  const handleLoginRedirect = () => {
    router.push("/auth/login");
  };

  return (
    <Button variant="ghost" size="icon" onClick={handleLoginRedirect}>
      <LogIn className="h-6 w-6" />
      <span className="sr-only">Log in</span>
    </Button>
  );
};