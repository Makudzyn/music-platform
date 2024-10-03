'use client';

import { useEffect, useState } from "react";
import { Check, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { emailConfirmation } from "@/app/services/authService";

interface EmailConfirmationProps {
  token: string;
}
type Status = 'loading' | 'success' | 'error';

export default function EmailConfirmation({token}: EmailConfirmationProps) {
  const router = useRouter();
  const [status, setStatus] = useState<Status>('loading');

  useEffect( () => {
    const confirmEmail = async () => {
      try {
        const response = await emailConfirmation(token);
        if (response.status === 200) {
          setStatus('success');
        } else {
          setStatus('error');
        }
      } catch (error) {
        setStatus('error');
      }

      setTimeout(() => {
        router.push('/');
      }, 5000);
    }
    if (token) {
      confirmEmail().then(() => console.log("confirmed"))
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center h-full">
      {status === 'loading' && (
        <>
            <div className="flex flex-row mb-4 gap-x-2">
              <div className="size-3.5 rounded-full bg-accent animate-bounce [animation-delay:-0.75s]"></div>
              <div className="size-3.5 rounded-full bg-accent animate-bounce [animation-delay:-0.5s]"></div>
              <div className="size-3.5 rounded-full bg-accent animate-bounce [animation-delay:-0.25s]"></div>
            </div>
          <p>The confirmation request is being processed...</p>
        </>
      )}
      {status === 'success' && (
        <>
          <Check className="text-green-500 size-12 mb-4"/>
          <p>Confirmation was successful!</p>
        </>
      )}
      {status === 'error' && (
        <>
          <X className="text-destructive size-12 mb-4"/>
          <p>Confirmation failed.</p>
        </>
      )}
      {status !== 'loading' && <p className="text-sm text-muted-foreground mt-2">Redirecting to the home page in 5 seconds...</p>}
    </div>
  );
};