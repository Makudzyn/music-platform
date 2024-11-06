'use client';

import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface ErrorComponentProps {
  error: Error;
  reset: () => void;
  children: ReactNode;
}

export default function RouteError({
  error,
  reset,
  children,
}: ErrorComponentProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  const router = useRouter();

  return (
    <div className="flex h-full items-center justify-center bg-background">
      <div className="max-w-xl p-8 text-center space-y-6">
        <AlertCircle className="mx-auto h-16 w-16 text-destructive" />
        <h1 className="text-2xl font-bold text-foreground">
          Oops! Something went wrong
        </h1>
        <div className="flex flex-col items-center justify-center text-muted-foreground gap-y-1">
          <p className="font-medium text-base">{children}</p>
          <p className="text-sm text-destructive">Details: {error.message}</p>
        </div>
        <div className="flex flex-col items-center justify-center space-y-2 w-full">
          <Button onClick={reset} variant="default" className="w-full">
            Try again
          </Button>
          <Button
            onClick={() => router.push('/')}
            variant="outline"
            className="w-full"
          >
            Go to homepage
          </Button>
        </div>
      </div>
    </div>
  );
}
