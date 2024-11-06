'use client';

import * as Toast from '@radix-ui/react-toast';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';
import { useEffect, useState } from 'react';

interface ToastProps {
  title: string;
  description: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  duration?: number; // Optional duration in milliseconds
  redirectMessage?: string; // Optional redirect message
}

export default function Toaster({
  title,
  description,
  open,
  onOpenChange,
  duration = 5000, // Default duration of 5 seconds
  redirectMessage = '',
}: ToastProps) {
  const [timeLeft, setTimeLeft] = useState(duration / 1000); // Time in seconds

  useEffect(() => {
    if (open) {
      setTimeLeft(duration / 1000);
      const intervalId = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(intervalId);
            onOpenChange(false); // Close Toast when timer ends
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [open, duration, onOpenChange]);

  return (
    <Toast.Provider swipeDirection="right">
      <Toast.Root
        className={cn(
          'fixed bottom-20 right-4 z-50 w-full max-w-sm overflow-hidden rounded-lg border border-border bg-background shadow-lg',
          'data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-bottom-full data-[state=open]:sm:slide-in-from-bottom-full',
          'transition-all duration-800 ease-in-out',
        )}
        open={open}
        onOpenChange={onOpenChange}
        duration={duration}
      >
        <div className="flex items-start p-4">
          <div className="flex-1">
            <Toast.Title className="text-sm font-semibold text-foreground">
              {title}
            </Toast.Title>
            <Toast.Description className="mt-1 text-sm text-muted-foreground">
              {description} <br />
              {redirectMessage &&
                `You will be redirected in ${timeLeft} seconds.`}
            </Toast.Description>
          </div>
          <Toast.Close asChild>
            <button
              className="ml-4 inline-flex h-8 w-8 items-center justify-center rounded-md border border-transparent text-muted-foreground hover:bg-secondary hover:text-secondary-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </Toast.Close>
        </div>
        {/* Progress Bar */}
        <div className="h-1 w-full bg-gray-200">
          <div
            className="h-full bg-accent transition-all"
            style={{ width: `${(timeLeft / (duration / 1000)) * 100}%` }}
          />
        </div>
      </Toast.Root>
      <Toast.Viewport className="fixed bottom-0 right-0 z-[100] flex flex-col p-4 gap-2 w-full max-w-[420px] m-0 list-none outline-none" />
    </Toast.Provider>
  );
}
